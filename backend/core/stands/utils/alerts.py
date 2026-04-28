from django.utils import timezone
from django.core.mail import send_mail
from twilio.rest import Client as TwilioClient
from ..models import Payment, Alert
import os


# =========================
# 📩 SEND ALERT (EMAIL + SMS + SAVE)
# =========================
def send_alert(client, payment):
    message = f"Dear {client.name}, your payment is overdue."

    email_sent = False
    sms_sent = False

    # 📧 EMAIL ALERT
    try:
        send_mail(
            "Missed Payment Alert",
            message,
            "admin@property.com",
            [client.email],
            fail_silently=False,
        )
        email_sent = True
    except Exception as e:
        print(f"Email failed: {e}")

    # 📱 SMS ALERT (Twilio)
    try:
        twilio_client = TwilioClient(
            os.getenv("TWILIO_ACCOUNT_SID"),
            os.getenv("TWILIO_AUTH_TOKEN")
        )

        twilio_client.messages.create(
            body=message,
            from_=os.getenv("TWILIO_PHONE"),
            to=client.phone
        )

        sms_sent = True
    except Exception as e:
        print(f"SMS failed: {e}")

    # 🧾 SAVE ALERT TO DATABASE
    Alert.objects.create(
        client=client,
        payment=payment,
        message=message,
        sent_email=email_sent,
        sent_sms=sms_sent
    )


# =========================
# ⏰ CHECK MISSED PAYMENTS
# =========================
def check_missed_payments():
    today = timezone.now().date()

    missed = Payment.objects.filter(
        due_date__lt=today,
        paid=False
    )

    for payment in missed:
        send_alert(payment.client, payment)