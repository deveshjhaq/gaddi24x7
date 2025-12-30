from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional
import os

router = APIRouter()

def get_db():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

class SocialMediaLinks(BaseModel):
    facebook: Optional[str] = "https://facebook.com/gaddi24x7"
    twitter: Optional[str] = "https://twitter.com/gaddi24x7"
    instagram: Optional[str] = "https://instagram.com/gaddi24x7"
    linkedin: Optional[str] = "https://linkedin.com/company/gaddi24x7"
    youtube: Optional[str] = "https://youtube.com/@gaddi24x7"

class ContactInfo(BaseModel):
    email: EmailStr = "support@gaddi24x7.com"
    phone: str = "+91 9876543210"
    address: str = "Connaught Place, New Delhi - 110001, India"
    office_hours: Optional[str] = "24/7 Available"

class SiteSettings(BaseModel):
    id: str = "site_settings"
    contact_info: ContactInfo = ContactInfo()
    social_media: SocialMediaLinks = SocialMediaLinks()
    updated_at: datetime = None
    updated_by: Optional[str] = None

@router.get("/settings")
async def get_site_settings():
    """Get current site settings"""
    
    db = get_db()
    settings = await db.site_settings.find_one({"id": "site_settings"})
    
    if not settings:
        # Return default settings if none exist
        default_settings = SiteSettings()
        return {"success": True, "settings": default_settings.dict()}
    
    return {"success": True, "settings": settings}

@router.post("/settings")
async def update_site_settings(settings_data: dict, admin_id: str):
    """Update site settings"""
    
    db = get_db()
    
    # Validate and structure the data
    try:
        settings = SiteSettings(**settings_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid settings data: {str(e)}")
    
    settings.id = "site_settings"
    settings.updated_at = datetime.utcnow()
    settings.updated_by = admin_id
    
    # Update or insert
    await db.site_settings.update_one(
        {"id": "site_settings"},
        {"$set": settings.dict()},
        upsert=True
    )
    
    return {
        "success": True,
        "message": "Site settings updated successfully",
        "settings": settings.dict()
    }

@router.get("/settings/contact")
async def get_contact_info():
    """Get contact information (public endpoint)"""
    
    db = get_db()
    settings = await db.site_settings.find_one({"id": "site_settings"})
    
    if not settings:
        default_settings = SiteSettings()
        return {"success": True, "contact_info": default_settings.contact_info.dict()}
    
    return {"success": True, "contact_info": settings.get("contact_info", ContactInfo().dict())}

@router.get("/settings/social")
async def get_social_media():
    """Get social media links (public endpoint)"""
    
    db = get_db()
    settings = await db.site_settings.find_one({"id": "site_settings"})
    
    if not settings:
        default_settings = SiteSettings()
        return {"success": True, "social_media": default_settings.social_media.dict()}
    
    return {"success": True, "social_media": settings.get("social_media", SocialMediaLinks().dict())}
