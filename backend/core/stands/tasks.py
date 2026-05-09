from celery import shared_task
from .utils.alerts import check_missed_payments

@shared_task
def run_payment_check():
    check_missed_payments()