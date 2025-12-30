from fastapi import APIRouter, HTTPException, Request
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from models import User, UserCreate, UserRole, LoginMethod, ActivityLog, ActivityType
from typing import Dict
import os

router = APIRouter()

# Get database
def get_db():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.post("/send-otp")
async def send_otp(phone: str, user_type: UserRole):
    """Send OTP to phone number (Mock for now, will integrate Fast2SMS)"""
    
    # Mock OTP generation
    otp = "1234"  # In production, generate random OTP and send via Fast2SMS
    
    # Store OTP in session/cache (for now, just return success)
    return {
        "success": True,
        "message": "OTP sent successfully (Mock)",
        "otp": otp  # Remove in production
    }

@router.post("/verify-otp")
async def verify_otp(
    phone: str,
    otp: str,
    user_type: UserRole,
    request: Request,
    name: str = None
):
    """Verify OTP and login/register user"""
    
    db = get_db()
    
    # Mock OTP verification (accept any 4-digit OTP)
    if len(otp) != 4:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    
    # Check if user exists
    user_doc = await db.users.find_one({"phone": phone, "role": user_type})
    
    if user_doc:
        # Existing user - login
        user = User(**user_doc)
        user.last_login = datetime.utcnow()
        
        # Add login to history
        login_entry = {
            "timestamp": datetime.utcnow(),
            "ip_address": request.client.host,
            "device_info": request.headers.get("user-agent", "Unknown")
        }
        user.login_history.append(login_entry)
        
        # Update user
        await db.users.update_one(
            {"phone": phone, "role": user_type},
            {"$set": {
                "last_login": user.last_login,
                "login_history": user.login_history
            }}
        )
        
        # Log activity
        activity = ActivityLog(
            user_id=user.id,
            activity_type=ActivityType.LOGIN,
            description=f"{user_type.value} logged in",
            ip_address=request.client.host,
            device_info=request.headers.get("user-agent")
        )
        await db.activity_logs.insert_one(activity.dict())
        
    else:
        # New user - register
        if not name:
            name = f"User {phone[-4:]}"
        
        user = User(
            name=name,
            phone=phone,
            role=user_type,
            login_method=LoginMethod.PHONE,
            last_login=datetime.utcnow()
        )
        
        await db.users.insert_one(user.dict())
        
        # Log activity
        activity = ActivityLog(
            user_id=user.id,
            activity_type=ActivityType.REGISTRATION,
            description=f"New {user_type.value} registered",
            ip_address=request.client.host,
            device_info=request.headers.get("user-agent")
        )
        await db.activity_logs.insert_one(activity.dict())
    
    return {
        "success": True,
        "user": user.dict(),
        "message": "Login successful"
    }

@router.post("/social-login")
async def social_login(
    provider: LoginMethod,
    access_token: str,
    user_type: UserRole,
    request: Request
):
    """Handle Google/Facebook login"""
    
    db = get_db()
    
    # Mock social login validation
    # In production, validate token with Google/Facebook API
    
    # Mock user data from social provider
    social_user_data = {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+91 9876543210",
        "profile_picture": "https://ui-avatars.com/api/?name=John+Doe"
    }
    
    # Check if user exists
    user_doc = await db.users.find_one({
        "email": social_user_data["email"],
        "role": user_type
    })
    
    if user_doc:
        user = User(**user_doc)
        user.last_login = datetime.utcnow()
        await db.users.update_one(
            {"email": social_user_data["email"], "role": user_type},
            {"$set": {"last_login": user.last_login}}
        )
    else:
        # Create new user
        user = User(
            name=social_user_data["name"],
            phone=social_user_data["phone"],
            email=social_user_data["email"],
            role=user_type,
            login_method=provider,
            profile_picture=social_user_data["profile_picture"],
            last_login=datetime.utcnow()
        )
        await db.users.insert_one(user.dict())
        
        # Log activity
        activity = ActivityLog(
            user_id=user.id,
            activity_type=ActivityType.REGISTRATION,
            description=f"New {user_type.value} registered via {provider.value}",
            ip_address=request.client.host
        )
        await db.activity_logs.insert_one(activity.dict())
    
    return {
        "success": True,
        "user": user.dict(),
        "message": "Login successful"
    }

@router.post("/logout")
async def logout(user_id: str, request: Request):
    """Log user logout activity"""
    
    db = get_db()
    
    # Log activity
    activity = ActivityLog(
        user_id=user_id,
        activity_type=ActivityType.LOGOUT,
        description="User logged out",
        ip_address=request.client.host
    )
    await db.activity_logs.insert_one(activity.dict())
    
    return {"success": True, "message": "Logged out successfully"}
