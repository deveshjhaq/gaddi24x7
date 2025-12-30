import os
import requests
from typing import Optional, Dict
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class N8NIntegrationService:
    """Service to integrate with n8n for WhatsApp and other automation"""
    
    def __init__(self, webhook_url: Optional[str] = None):
        self.webhook_url = webhook_url or os.getenv('N8N_WEBHOOK_URL')
    
    async def send_booking_notification(
        self,
        phone: str,
        customer_name: str,
        ride_id: str,
        pickup: str,
        drop: str,
        fare: float,
        otp: str
    ) -> Dict:
        """Send booking confirmation via WhatsApp through n8n"""
        
        if not self.webhook_url:
            logger.warning("n8n webhook URL not configured")
            return {"status": "skipped", "message": "n8n not configured"}
        
        message = f"""🚗 *Gaddi24x7 - Booking Confirmed*

Hello {customer_name}!

Your ride has been booked successfully.

📍 Pickup: {pickup}
📍 Drop: {drop}
💰 Fare: ₹{fare}
🔢 OTP: *{otp}*

Ride ID: {ride_id}

Track your ride in the app.
Thank you for choosing Gaddi24x7!
"""
        
        payload = {
            "type": "booking_confirmation",
            "phone": phone,
            "message": message,
            "ride_id": ride_id,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        try:
            response = requests.post(
                self.webhook_url,
                json=payload,
                timeout=10
            )
            response.raise_for_status()
            return {"status": "success", "data": response.json()}
        except Exception as e:
            logger.error(f"n8n webhook error: {str(e)}")
            return {"status": "error", "message": str(e)}
    
    async def send_bill(
        self,
        phone: str,
        bill_text: str,
        bill_id: str
    ) -> Dict:
        """Send bill via WhatsApp through n8n"""
        
        if not self.webhook_url:
            logger.warning("n8n webhook URL not configured")
            return {"status": "skipped", "message": "n8n not configured"}
        
        payload = {
            "type": "bill",
            "phone": phone,
            "message": bill_text,
            "bill_id": bill_id,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        try:
            response = requests.post(
                self.webhook_url,
                json=payload,
                timeout=10
            )
            response.raise_for_status()
            return {"status": "success", "data": response.json()}
        except Exception as e:
            logger.error(f"n8n webhook error: {str(e)}")
            return {"status": "error", "message": str(e)}
    
    async def send_driver_notification(
        self,
        phone: str,
        driver_name: str,
        ride_id: str,
        customer_name: str,
        pickup: str,
        fare: float
    ) -> Dict:
        """Send new ride notification to driver via WhatsApp"""
        
        if not self.webhook_url:
            return {"status": "skipped", "message": "n8n not configured"}
        
        message = f"""🚕 *New Ride Request!*

Hello {driver_name}!

Customer: {customer_name}
📍 Pickup: {pickup}
💰 Fare: ₹{fare}

Ride ID: {ride_id}

Accept this ride in the app now!
"""
        
        payload = {
            "type": "driver_notification",
            "phone": phone,
            "message": message,
            "ride_id": ride_id,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        try:
            response = requests.post(
                self.webhook_url,
                json=payload,
                timeout=10
            )
            response.raise_for_status()
            return {"status": "success", "data": response.json()}
        except Exception as e:
            logger.error(f"n8n webhook error: {str(e)}")
            return {"status": "error", "message": str(e)}
    
    async def process_whatsapp_booking(
        self,
        phone: str,
        message: str
    ) -> Dict:
        """Process booking request from WhatsApp via n8n webhook"""
        
        # This endpoint will receive webhooks from n8n
        # Parse the message and extract booking details
        # Format: "Book ride from [pickup] to [drop]"
        
        # Simple parser (can be enhanced with NLP)
        try:
            if "book" in message.lower() and "from" in message.lower() and "to" in message.lower():
                parts = message.lower().split("from")
                if len(parts) > 1:
                    location_parts = parts[1].split("to")
                    if len(location_parts) > 1:
                        pickup = location_parts[0].strip()
                        drop = location_parts[1].strip()
                        
                        return {
                            "status": "parsed",
                            "phone": phone,
                            "pickup": pickup,
                            "drop": drop,
                            "needs_confirmation": True
                        }
            
            return {
                "status": "invalid_format",
                "message": "Please use format: Book ride from [pickup] to [drop]"
            }
        except Exception as e:
            logger.error(f"WhatsApp booking parse error: {str(e)}")
            return {"status": "error", "message": str(e)}
