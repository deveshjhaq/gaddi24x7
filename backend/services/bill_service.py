from datetime import datetime
from typing import Optional, List
from models import (
    Bill, BillItem, Ride, VehiclePricing, TripType
)

class BillGenerator:
    """Automatic bill generation service"""
    
    @staticmethod
    def calculate_fare(
        vehicle_pricing: VehiclePricing,
        distance: float,
        duration: int,
        trip_type: TripType
    ) -> float:
        """Calculate fare based on pricing config"""
        base_fare = vehicle_pricing.base_price
        distance_fare = distance * vehicle_pricing.price_per_km
        time_fare = duration * vehicle_pricing.price_per_min
        
        subtotal = base_fare + distance_fare + time_fare
        
        # Apply trip type multiplier
        multiplier = vehicle_pricing.trip_multipliers.get(trip_type, 1.0)
        total_fare = subtotal * multiplier
        
        # Ensure minimum fare
        return max(total_fare, vehicle_pricing.minimum_fare)
    
    @staticmethod
    def generate_bill(
        ride: Ride,
        vehicle_pricing: VehiclePricing,
        distance: float,
        duration: int
    ) -> Bill:
        """Generate detailed bill for a ride"""
        
        # Calculate components
        base_fare = vehicle_pricing.base_price
        distance_fare = distance * vehicle_pricing.price_per_km
        time_fare = duration * vehicle_pricing.price_per_min
        
        items = [
            BillItem(description="Base Fare", amount=base_fare),
            BillItem(description=f"Distance Charge ({distance} km)", amount=distance_fare),
            BillItem(description=f"Time Charge ({duration} min)", amount=time_fare)
        ]
        
        subtotal = base_fare + distance_fare + time_fare
        
        # Apply trip type multiplier
        multiplier = vehicle_pricing.trip_multipliers.get(ride.trip_type, 1.0)
        if multiplier != 1.0:
            trip_charge = subtotal * (multiplier - 1)
            items.append(
                BillItem(
                    description=f"{ride.trip_type.replace('-', ' ').title()} Charge",
                    amount=trip_charge
                )
            )
            subtotal += trip_charge
        
        # Tax calculation (5% GST)
        tax = round(subtotal * 0.05, 2)
        items.append(BillItem(description="GST (5%)", amount=tax))
        
        # Discount (if any)
        discount = 0.0
        
        # Total
        total = subtotal + tax - discount
        total = max(total, vehicle_pricing.minimum_fare)
        
        return Bill(
            ride_id=ride.id,
            customer_id=ride.customer_id,
            driver_id=ride.driver_id or "Unknown",
            items=items,
            subtotal=round(subtotal, 2),
            tax=tax,
            discount=discount,
            total=round(total, 2),
            generated_at=datetime.utcnow()
        )
    
    @staticmethod
    def format_bill_text(bill: Bill) -> str:
        """Format bill as text for WhatsApp/SMS"""
        text = f"""╔══════════════════════════════════╗
║      GADDI24x7 - RIDE BILL      ║
╚══════════════════════════════════╝

Bill ID: {bill.id}
Ride ID: {bill.ride_id}
Date: {bill.generated_at.strftime('%d-%m-%Y %H:%M')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ITEMS:
"""
        
        for item in bill.items:
            text += f"{item.description:.<25} ₹{item.amount:.2f}\n"
        
        text += f"""━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subtotal: ₹{bill.subtotal:.2f}
Tax: ₹{bill.tax:.2f}
Discount: -₹{bill.discount:.2f}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL: ₹{bill.total:.2f}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thank you for riding with Gaddi24x7!
For support: support@gaddi24x7.com
"""
        return text
