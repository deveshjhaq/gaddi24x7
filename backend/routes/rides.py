from fastapi import APIRouter, HTTPException, BackgroundTasks
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from models import (
    Ride, RideCreate, RideStatus, Location, ActivityLog, ActivityType,
    Transaction, TransactionCreate, TransactionType, Bill
)
from services.bill_service import BillGenerator
from services.n8n_service import N8NIntegrationService
import os

router = APIRouter()
n8n_service = N8NIntegrationService()

def get_db():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.post("/create")
async def create_ride(ride_data: RideCreate, background_tasks: BackgroundTasks):
    """Create new ride request"""
    
    db = get_db()
    
    ride = Ride(**ride_data.dict())
    await db.rides.insert_one(ride.dict())
    
    # Log activity
    activity = ActivityLog(
        user_id=ride.customer_id,
        activity_type=ActivityType.RIDE_BOOKED,
        description=f"Ride {ride.id} booked",
        metadata={"ride_id": ride.id, "fare": ride.estimated_fare}
    )
    await db.activity_logs.insert_one(activity.dict())
    
    # Get customer details for notification
    customer = await db.users.find_one({"id": ride.customer_id})
    
    # Send notification via n8n (background task)
    if customer:
        background_tasks.add_task(
            n8n_service.send_booking_notification,
            phone=customer["phone"],
            customer_name=customer["name"],
            ride_id=ride.id,
            pickup=ride.pickup_location.address,
            drop=ride.drop_location.address,
            fare=ride.estimated_fare,
            otp=ride.otp
        )
    
    return {
        "success": True,
        "ride": ride.dict(),
        "message": "Ride created successfully"
    }

@router.post("/{ride_id}/accept")
async def accept_ride(ride_id: str, driver_id: str, background_tasks: BackgroundTasks):
    """Driver accepts ride"""
    
    db = get_db()
    
    ride = await db.rides.find_one({"id": ride_id})
    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found")
    
    # Update ride
    await db.rides.update_one(
        {"id": ride_id},
        {"$set": {
            "driver_id": driver_id,
            "status": RideStatus.ACCEPTED,
            "started_at": datetime.utcnow()
        }}
    )
    
    # Get driver and customer details
    driver = await db.users.find_one({"id": driver_id})
    customer = await db.users.find_one({"id": ride["customer_id"]})
    
    # Send notification to customer
    if customer and driver:
        # In real app, send push notification
        pass
    
    return {
        "success": True,
        "message": "Ride accepted successfully"
    }

@router.post("/{ride_id}/start")
async def start_ride(ride_id: str):
    """Start the ride"""
    
    db = get_db()
    
    await db.rides.update_one(
        {"id": ride_id},
        {"$set": {
            "status": RideStatus.ONGOING,
            "started_at": datetime.utcnow()
        }}
    )
    
    return {"success": True, "message": "Ride started"}

@router.post("/{ride_id}/complete")
async def complete_ride(
    ride_id: str,
    actual_distance: float,
    actual_duration: int,
    payment_method: str,
    background_tasks: BackgroundTasks
):
    """Complete ride and generate bill"""
    
    db = get_db()
    
    ride_doc = await db.rides.find_one({"id": ride_id})
    if not ride_doc:
        raise HTTPException(status_code=404, detail="Ride not found")
    
    ride = Ride(**ride_doc)
    
    # Get vehicle pricing
    pricing_config = await db.pricing_config.find_one({"id": "pricing_config"})
    vehicle_pricing = next(
        (v for v in pricing_config["vehicles"] if v["vehicle_type"] == ride.vehicle_type),
        None
    )
    
    if not vehicle_pricing:
        raise HTTPException(status_code=400, detail="Pricing not found")
    
    # Generate bill
    bill = BillGenerator.generate_bill(
        ride=ride,
        vehicle_pricing=vehicle_pricing,
        distance=actual_distance,
        duration=actual_duration
    )
    
    # Save bill
    await db.bills.insert_one(bill.dict())
    
    # Update ride
    await db.rides.update_one(
        {"id": ride_id},
        {"$set": {
            "status": RideStatus.COMPLETED,
            "completed_at": datetime.utcnow(),
            "actual_fare": bill.total,
            "payment_method": payment_method
        }}
    )
    
    # Process payment
    customer = await db.users.find_one({"id": ride.customer_id})
    if payment_method == "wallet" and customer:
        # Deduct from wallet
        new_balance = customer["wallet_balance"] - bill.total
        await db.users.update_one(
            {"id": ride.customer_id},
            {"$set": {"wallet_balance": new_balance}}
        )
        
        # Create transaction
        transaction = Transaction(
            user_id=ride.customer_id,
            amount=bill.total,
            transaction_type=TransactionType.RIDE_PAYMENT,
            description=f"Ride payment for {ride_id}",
            ride_id=ride_id,
            balance_before=customer["wallet_balance"],
            balance_after=new_balance
        )
        await db.transactions.insert_one(transaction.dict())
    
    # Credit driver earnings
    if ride.driver_id:
        driver = await db.users.find_one({"id": ride.driver_id})
        if driver:
            commission = bill.total * 0.20  # 20% platform fee
            driver_earning = bill.total - commission
            
            new_driver_balance = driver.get("wallet_balance", 0) + driver_earning
            await db.users.update_one(
                {"id": ride.driver_id},
                {"$set": {"wallet_balance": new_driver_balance}}
            )
            
            # Create transaction
            transaction = Transaction(
                user_id=ride.driver_id,
                amount=driver_earning,
                transaction_type=TransactionType.DRIVER_EARNING,
                description=f"Earning from ride {ride_id}",
                ride_id=ride_id,
                balance_before=driver.get("wallet_balance", 0),
                balance_after=new_driver_balance
            )
            await db.transactions.insert_one(transaction.dict())
    
    # Log activity
    activity = ActivityLog(
        user_id=ride.customer_id,
        activity_type=ActivityType.RIDE_COMPLETED,
        description=f"Ride {ride_id} completed",
        metadata={"ride_id": ride_id, "fare": bill.total}
    )
    await db.activity_logs.insert_one(activity.dict())
    
    # Send bill via WhatsApp (background)
    if customer:
        bill_text = BillGenerator.format_bill_text(bill)
        background_tasks.add_task(
            n8n_service.send_bill,
            phone=customer["phone"],
            bill_text=bill_text,
            bill_id=bill.id
        )
    
    return {
        "success": True,
        "bill": bill.dict(),
        "message": "Ride completed successfully"
    }

@router.get("/customer/{customer_id}")
async def get_customer_rides(customer_id: str):
    """Get all rides for a customer"""
    
    db = get_db()
    rides = await db.rides.find({"customer_id": customer_id}).sort("created_at", -1).to_list(100)
    
    return {"success": True, "rides": rides}

@router.get("/driver/{driver_id}")
async def get_driver_rides(driver_id: str):
    """Get all rides for a driver"""
    
    db = get_db()
    rides = await db.rides.find({"driver_id": driver_id}).sort("created_at", -1).to_list(100)
    
    return {"success": True, "rides": rides}

@router.get("/{ride_id}")
async def get_ride(ride_id: str):
    """Get ride details"""
    
    db = get_db()
    ride = await db.rides.find_one({"id": ride_id})
    
    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found")
    
    return {"success": True, "ride": ride}

@router.get("/{ride_id}/bill")
async def get_ride_bill(ride_id: str):
    """Get bill for a ride"""
    
    db = get_db()
    bill = await db.bills.find_one({"ride_id": ride_id})
    
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    
    return {"success": True, "bill": bill}
