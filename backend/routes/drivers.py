from fastapi import APIRouter, HTTPException, UploadFile, File
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from models import (
    Driver, DriverCreate, KYCDocument, KYCStatus,
    ActivityLog, ActivityType
)
import os

router = APIRouter()

def get_db():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.post("/register")
async def register_driver(driver_data: DriverCreate):
    """Register new driver with KYC documents"""
    
    db = get_db()
    
    # Check if driver already exists
    existing = await db.drivers.find_one({"user_id": driver_data.user_id})
    if existing:
        raise HTTPException(status_code=400, detail="Driver already registered")
    
    driver = Driver(**driver_data.dict())
    await db.drivers.insert_one(driver.dict())
    
    # Log activity
    activity = ActivityLog(
        user_id=driver.user_id,
        activity_type=ActivityType.KYC_SUBMITTED,
        description="Driver KYC documents submitted for verification",
        metadata={"driver_id": driver.id}
    )
    await db.activity_logs.insert_one(activity.dict())
    
    return {
        "success": True,
        "driver": driver.dict(),
        "message": "Driver registered. KYC verification pending."
    }

@router.get("/{driver_id}")
async def get_driver(driver_id: str):
    """Get driver details"""
    
    db = get_db()
    driver = await db.drivers.find_one({"id": driver_id})
    
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    
    return {"success": True, "driver": driver}

@router.get("/user/{user_id}")
async def get_driver_by_user(user_id: str):
    """Get driver by user ID"""
    
    db = get_db()
    driver = await db.drivers.find_one({"user_id": user_id})
    
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    
    return {"success": True, "driver": driver}

@router.post("/{driver_id}/verify-kyc")
async def verify_kyc(driver_id: str, admin_id: str, approved: bool, rejection_reason: str = None):
    """Admin verifies or rejects driver KYC"""
    
    db = get_db()
    
    driver_doc = await db.drivers.find_one({"id": driver_id})
    if not driver_doc:
        raise HTTPException(status_code=404, detail="Driver not found")
    
    driver = Driver(**driver_doc)
    
    # Update KYC status
    driver.kyc_documents.status = KYCStatus.VERIFIED if approved else KYCStatus.REJECTED
    driver.kyc_documents.verified_by = admin_id
    driver.kyc_documents.verified_at = datetime.utcnow()
    
    if not approved and rejection_reason:
        driver.kyc_documents.rejection_reason = rejection_reason
    
    driver.is_verified = approved
    
    await db.drivers.update_one(
        {"id": driver_id},
        {"$set": {
            "kyc_documents": driver.kyc_documents.dict(),
            "is_verified": driver.is_verified
        }}
    )
    
    # Log activity
    activity = ActivityLog(
        user_id=driver.user_id,
        activity_type=ActivityType.KYC_VERIFIED if approved else ActivityType.KYC_REJECTED,
        description=f"KYC {'verified' if approved else 'rejected'} by admin",
        metadata={
            "driver_id": driver_id,
            "admin_id": admin_id,
            "rejection_reason": rejection_reason
        }
    )
    await db.activity_logs.insert_one(activity.dict())
    
    # Send notification to driver (via n8n)
    # ... implement notification
    
    return {
        "success": True,
        "message": f"KYC {'verified' if approved else 'rejected'} successfully",
        "driver": driver.dict()
    }

@router.post("/{driver_id}/toggle-online")
async def toggle_online_status(driver_id: str, is_online: bool):
    """Toggle driver online/offline status"""
    
    db = get_db()
    
    await db.drivers.update_one(
        {"id": driver_id},
        {"$set": {"is_online": is_online}}
    )
    
    return {
        "success": True,
        "message": f"Driver is now {'online' if is_online else 'offline'}"
    }

@router.post("/{driver_id}/update-location")
async def update_location(driver_id: str, latitude: float, longitude: float):
    """Update driver's current location"""
    
    db = get_db()
    
    await db.drivers.update_one(
        {"id": driver_id},
        {"$set": {
            "current_location": {
                "latitude": latitude,
                "longitude": longitude
            }
        }}
    )
    
    return {"success": True, "message": "Location updated"}

@router.get("/nearby/search")
async def find_nearby_drivers(
    latitude: float,
    longitude: float,
    vehicle_type: str = None,
    radius_km: float = 5.0
):
    """Find nearby available drivers"""
    
    db = get_db()
    
    # Simple proximity search (in production, use geospatial queries)
    query = {
        "is_online": True,
        "is_verified": True
    }
    
    if vehicle_type:
        query["vehicle_type"] = vehicle_type
    
    drivers = await db.drivers.find(query).to_list(50)
    
    # Calculate distance (simplified)
    nearby_drivers = []
    for driver in drivers:
        if driver.get("current_location"):
            # In production, use proper haversine distance calculation
            nearby_drivers.append(driver)
    
    return {
        "success": True,
        "drivers": nearby_drivers[:10]  # Return top 10
    }
