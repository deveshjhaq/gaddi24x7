from fastapi import APIRouter, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta
from typing import Optional, List
import os

router = APIRouter()

def get_db():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.get("/stats")
async def get_dashboard_stats():
    """Get dashboard statistics"""
    
    db = get_db()
    
    # Total users
    total_customers = await db.users.count_documents({"role": "customer"})
    total_drivers = await db.users.count_documents({"role": "driver"})
    
    # Active drivers
    active_drivers = await db.drivers.count_documents({"is_online": True})
    
    # Total rides
    total_rides = await db.rides.count_documents({})
    completed_rides = await db.rides.count_documents({"status": "completed"})
    
    # Revenue calculation
    revenue_pipeline = [
        {"$match": {"status": "completed"}},
        {"$group": {"_id": None, "total": {"$sum": "$actual_fare"}}}
    ]
    revenue_result = await db.rides.aggregate(revenue_pipeline).to_list(1)
    total_revenue = revenue_result[0]["total"] if revenue_result else 0
    
    # Today's stats
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    today_rides = await db.rides.count_documents({
        "created_at": {"$gte": today_start}
    })
    
    today_revenue_pipeline = [
        {"$match": {
            "status": "completed",
            "created_at": {"$gte": today_start}
        }},
        {"$group": {"_id": None, "total": {"$sum": "$actual_fare"}}}
    ]
    today_revenue_result = await db.rides.aggregate(today_revenue_pipeline).to_list(1)
    today_revenue = today_revenue_result[0]["total"] if today_revenue_result else 0
    
    return {
        "success": True,
        "stats": {
            "total_customers": total_customers,
            "total_drivers": total_drivers,
            "active_drivers": active_drivers,
            "total_rides": total_rides,
            "completed_rides": completed_rides,
            "total_revenue": total_revenue,
            "today_rides": today_rides,
            "today_revenue": today_revenue
        }
    }

@router.get("/users")
async def get_all_users(
    role: Optional[str] = None,
    page: int = 1,
    limit: int = 50
):
    """Get all users with pagination"""
    
    db = get_db()
    
    query = {}
    if role:
        query["role"] = role
    
    skip = (page - 1) * limit
    
    users = await db.users.find(query).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    total = await db.users.count_documents(query)
    
    return {
        "success": True,
        "users": users,
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit
    }

@router.get("/users/{user_id}/activity")
async def get_user_activity(user_id: str, limit: int = 100):
    """Get complete activity log for a user"""
    
    db = get_db()
    
    # Get user details
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get activity logs
    activities = await db.activity_logs.find(
        {"user_id": user_id}
    ).sort("created_at", -1).limit(limit).to_list(limit)
    
    # Get rides
    rides = await db.rides.find(
        {"$or": [{"customer_id": user_id}, {"driver_id": user_id}]}
    ).sort("created_at", -1).to_list(100)
    
    # Get transactions
    transactions = await db.transactions.find(
        {"user_id": user_id}
    ).sort("created_at", -1).to_list(100)
    
    return {
        "success": True,
        "user": user,
        "activities": activities,
        "rides": rides,
        "transactions": transactions,
        "summary": {
            "total_activities": len(activities),
            "total_rides": len(rides),
            "total_transactions": len(transactions),
            "last_login": user.get("last_login"),
            "registration_date": user.get("created_at")
        }
    }

@router.get("/drivers/pending-kyc")
async def get_pending_kyc_drivers():
    """Get all drivers with pending KYC verification"""
    
    db = get_db()
    
    drivers = await db.drivers.find(
        {"kyc_documents.status": "pending"}
    ).sort("created_at", -1).to_list(100)
    
    # Enrich with user details
    for driver in drivers:
        user = await db.users.find_one({"id": driver["user_id"]})
        if user:
            driver["user_details"] = {
                "name": user["name"],
                "phone": user["phone"],
                "email": user.get("email")
            }
    
    return {
        "success": True,
        "drivers": drivers,
        "total": len(drivers)
    }

@router.get("/rides")
async def get_all_rides(
    status: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    page: int = 1,
    limit: int = 50
):
    """Get all rides with filters"""
    
    db = get_db()
    
    query = {}
    if status:
        query["status"] = status
    if start_date:
        query.setdefault("created_at", {})["$gte"] = start_date
    if end_date:
        query.setdefault("created_at", {})["$lte"] = end_date
    
    skip = (page - 1) * limit
    
    rides = await db.rides.find(query).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    total = await db.rides.count_documents(query)
    
    # Enrich with user and driver details
    for ride in rides:
        customer = await db.users.find_one({"id": ride["customer_id"]})
        if customer:
            ride["customer_name"] = customer["name"]
        
        if ride.get("driver_id"):
            driver = await db.users.find_one({"id": ride["driver_id"]})
            if driver:
                ride["driver_name"] = driver["name"]
    
    return {
        "success": True,
        "rides": rides,
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit
    }

@router.get("/pricing")
async def get_pricing_config():
    """Get current pricing configuration"""
    
    db = get_db()
    
    config = await db.pricing_config.find_one({"id": "pricing_config"})
    
    if not config:
        raise HTTPException(status_code=404, detail="Pricing config not found")
    
    return {"success": True, "config": config}

@router.post("/pricing")
async def update_pricing_config(config: dict, admin_id: str):
    """Update pricing configuration"""
    
    db = get_db()
    
    config["updated_at"] = datetime.utcnow()
    config["updated_by"] = admin_id
    
    await db.pricing_config.update_one(
        {"id": "pricing_config"},
        {"$set": config},
        upsert=True
    )
    
    return {"success": True, "message": "Pricing updated successfully"}

@router.get("/api-keys")
async def get_api_keys():
    """Get API keys configuration (masked)"""
    
    db = get_db()
    
    config = await db.api_keys_config.find_one({"id": "api_keys_config"})
    
    if not config:
        return {"success": True, "config": {}}
    
    # Mask sensitive keys
    for key in config:
        if key not in ["id", "_id", "updated_at"] and config[key]:
            if len(config[key]) > 8:
                config[key] = config[key][:4] + "*" * (len(config[key]) - 8) + config[key][-4:]
    
    return {"success": True, "config": config}

@router.post("/api-keys")
async def update_api_keys(config: dict):
    """Update API keys configuration"""
    
    db = get_db()
    
    config["id"] = "api_keys_config"
    config["updated_at"] = datetime.utcnow()
    
    await db.api_keys_config.update_one(
        {"id": "api_keys_config"},
        {"$set": config},
        upsert=True
    )
    
    return {"success": True, "message": "API keys updated successfully"}

@router.get("/analytics/revenue")
async def get_revenue_analytics(days: int = 30):
    """Get revenue analytics for last N days"""
    
    db = get_db()
    
    start_date = datetime.utcnow() - timedelta(days=days)
    
    pipeline = [
        {"$match": {
            "status": "completed",
            "created_at": {"$gte": start_date}
        }},
        {"$group": {
            "_id": {
                "$dateToString": {"format": "%Y-%m-%d", "date": "$created_at"}
            },
            "total_revenue": {"$sum": "$actual_fare"},
            "ride_count": {"$sum": 1}
        }},
        {"$sort": {"_id": 1}}
    ]
    
    results = await db.rides.aggregate(pipeline).to_list(days)
    
    return {
        "success": True,
        "analytics": results,
        "period_days": days
    }
