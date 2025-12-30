from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Dict
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    CUSTOMER = "customer"
    DRIVER = "driver"
    ADMIN = "admin"

class LoginMethod(str, Enum):
    PHONE = "phone"
    GOOGLE = "google"
    FACEBOOK = "facebook"

class KYCStatus(str, Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    REJECTED = "rejected"

class RideStatus(str, Enum):
    REQUESTED = "requested"
    ACCEPTED = "accepted"
    ONGOING = "ongoing"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class TripType(str, Enum):
    ONE_WAY = "one-way"
    ROUND_TRIP = "round-trip"
    RENTAL_4HR = "rental-4hr"
    RENTAL_8HR = "rental-8hr"
    RENTAL_12HR = "rental-12hr"

# User Models
class UserBase(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    role: UserRole
    login_method: LoginMethod = LoginMethod.PHONE
    profile_picture: Optional[str] = None

class UserCreate(UserBase):
    otp: Optional[str] = None

class User(UserBase):
    id: str = Field(default_factory=lambda: str(datetime.utcnow().timestamp()))
    wallet_balance: float = 0.0
    total_rides: int = 0
    rating: float = 0.0
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None
    login_history: List[Dict] = []
    
    class Config:
        from_attributes = True

# Driver Models
class KYCDocument(BaseModel):
    license_number: str
    license_photo_url: Optional[str] = None
    vehicle_registration: str
    vehicle_registration_photo_url: Optional[str] = None
    insurance_number: str
    insurance_photo_url: Optional[str] = None
    aadhaar_number: Optional[str] = None
    aadhaar_photo_url: Optional[str] = None
    pan_number: Optional[str] = None
    pan_photo_url: Optional[str] = None
    status: KYCStatus = KYCStatus.PENDING
    verified_by: Optional[str] = None
    verified_at: Optional[datetime] = None
    rejection_reason: Optional[str] = None

class DriverBase(BaseModel):
    user_id: str
    vehicle_type: str
    vehicle_number: str
    vehicle_model: str
    vehicle_color: Optional[str] = None
    kyc_documents: KYCDocument

class DriverCreate(DriverBase):
    pass

class Driver(DriverBase):
    id: str = Field(default_factory=lambda: str(datetime.utcnow().timestamp()))
    is_online: bool = False
    current_location: Optional[Dict[str, float]] = None
    total_earnings: float = 0.0
    total_rides: int = 0
    rating: float = 0.0
    is_verified: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        from_attributes = True

# Ride Models
class Location(BaseModel):
    address: str
    latitude: float
    longitude: float

class RideBase(BaseModel):
    customer_id: str
    pickup_location: Location
    drop_location: Location
    vehicle_type: str
    trip_type: TripType = TripType.ONE_WAY
    distance: float
    estimated_duration: int
    estimated_fare: float

class RideCreate(RideBase):
    pass

class Ride(RideBase):
    id: str = Field(default_factory=lambda: f"R{int(datetime.utcnow().timestamp())}")
    driver_id: Optional[str] = None
    status: RideStatus = RideStatus.REQUESTED
    otp: str = Field(default_factory=lambda: str(datetime.utcnow().microsecond)[-4:])
    actual_fare: Optional[float] = None
    payment_method: Optional[str] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    rating: Optional[float] = None
    feedback: Optional[str] = None
    
    class Config:
        from_attributes = True

# Transaction Models
class TransactionType(str, Enum):
    RIDE_PAYMENT = "ride_payment"
    WALLET_RECHARGE = "wallet_recharge"
    REFUND = "refund"
    DRIVER_EARNING = "driver_earning"
    WITHDRAWAL = "withdrawal"

class TransactionBase(BaseModel):
    user_id: str
    amount: float
    transaction_type: TransactionType
    description: str
    ride_id: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: str = Field(default_factory=lambda: f"TXN{int(datetime.utcnow().timestamp())}")
    balance_before: float
    balance_after: float
    status: str = "completed"
    payment_gateway: Optional[str] = None
    gateway_transaction_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        from_attributes = True

# Bill Model
class BillItem(BaseModel):
    description: str
    amount: float

class Bill(BaseModel):
    id: str = Field(default_factory=lambda: f"BILL{int(datetime.utcnow().timestamp())}")
    ride_id: str
    customer_id: str
    driver_id: str
    items: List[BillItem]
    subtotal: float
    tax: float
    discount: float
    total: float
    generated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        from_attributes = True

# Activity Log Model
class ActivityType(str, Enum):
    REGISTRATION = "registration"
    LOGIN = "login"
    LOGOUT = "logout"
    RIDE_BOOKED = "ride_booked"
    RIDE_COMPLETED = "ride_completed"
    WALLET_RECHARGED = "wallet_recharged"
    KYC_SUBMITTED = "kyc_submitted"
    KYC_VERIFIED = "kyc_verified"
    KYC_REJECTED = "kyc_rejected"
    PROFILE_UPDATED = "profile_updated"

class ActivityLog(BaseModel):
    id: str = Field(default_factory=lambda: str(datetime.utcnow().timestamp()))
    user_id: str
    activity_type: ActivityType
    description: str
    ip_address: Optional[str] = None
    device_info: Optional[str] = None
    metadata: Optional[Dict] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        from_attributes = True

# Pricing Config Model
class VehiclePricing(BaseModel):
    vehicle_type: str
    base_price: float
    price_per_km: float
    price_per_min: float
    minimum_fare: float
    trip_multipliers: Dict[str, float] = {
        "one-way": 1.0,
        "round-trip": 1.8,
        "rental-4hr": 1.5,
        "rental-8hr": 2.5,
        "rental-12hr": 3.5
    }

class PricingConfig(BaseModel):
    id: str = "pricing_config"
    vehicles: List[VehiclePricing]
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    updated_by: Optional[str] = None
    
    class Config:
        from_attributes = True

# API Keys Config Model
class APIKeysConfig(BaseModel):
    id: str = "api_keys_config"
    fast2sms_key: Optional[str] = None
    google_maps_key: Optional[str] = None
    geoapify_key: Optional[str] = None
    cashfree_app_id: Optional[str] = None
    cashfree_secret_key: Optional[str] = None
    razorpay_key_id: Optional[str] = None
    razorpay_key_secret: Optional[str] = None
    payu_merchant_key: Optional[str] = None
    payu_merchant_salt: Optional[str] = None
    google_oauth_client_id: Optional[str] = None
    google_oauth_client_secret: Optional[str] = None
    facebook_app_id: Optional[str] = None
    facebook_app_secret: Optional[str] = None
    n8n_webhook_url: Optional[str] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        from_attributes = True

# Review Model
class Review(BaseModel):
    id: str = Field(default_factory=lambda: f"REV{int(datetime.utcnow().timestamp())}")
    ride_id: str
    reviewer_id: str
    reviewee_id: str
    rating: float
    feedback: Optional[str] = None
    tags: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        from_attributes = True
