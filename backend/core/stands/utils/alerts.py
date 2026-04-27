from django.core.mail import send_mail
from ..models import Alert

def send_email_alert(client, payment):
    message = f"Dear {client.name}, your payment is overdue."

    send_mail(
        "Missed Payment Alert",
        message,
        "admin@property.com",
        [client.email],
        fail_silently=False,
    )

    Alert.objects.create(
        client=client,
        payment=payment,
        message=message,
        sent_email=True
    )