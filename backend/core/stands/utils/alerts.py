from django.core.mail import send_mail
from twilio.rest import Client as TwilioClient
from ..models import Alert
import os


def send_alert(client, payment):
    message = f"Dear {client.name}, your payment is overdue."

    email_sent = False
    sms_sent = False

    # 📧 EMAIL
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

    # 📱 SMS
    try:
        twilio_client = TwilioClient(
            os.getenv("TWILIO_ACCOUNT_SID"),
            os.getenv("TWILIO_AUTH_TOKEN")
        )

        sms = twilio_client.messages.create(
            body=message,
            from_=os.getenv("TWILIO_PHONE"),
            to=client.phone
        )

        sms_sent = True
    except Exception as e:
        print(f"SMS failed: {e}")

    # 🧾 SAVE ALERT
    Alert.objects.create(
        client=client,
        payment=payment,
        message=message,
        sent_email=email_sent,
        sent_sms=sms_sent
    )