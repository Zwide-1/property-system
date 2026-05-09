from datetime import date
from .models import Payment

def check_missed_payments():
    today = date.today()
    
    missed = Payment.objects.filter(
        due_date__lt=today,
        paid=False
    )
    
    return missed
