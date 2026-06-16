id="settings-view"
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import SiteSettings
from .utils import check_missed_payments
from django.shortcuts import get_object_or_404
from datetime import date


from .models import Stand, Client, Allocation, Payment, Alert
from .serializers import StandSerializer, ClientSerializer, AllocationSerializer, PaymentSerializer, AlertSerializer 

# PROPERTY_DETAILS API
@api_view(["GET"])
def property_details(request, stand_id):

    stand = get_object_or_404(
        Stand,
        id=stand_id
    )

    allocation = Allocation.objects.filter(
        stand=stand
    ).first()

    client = allocation.client if allocation else None

    payments = Payment.objects.filter(
        stand=stand
    )

    payment_history = [
        {
            "id": p.id,
            "amount": p.amount,
            "due_date": p.due_date,
            "payment_date": p.payment_date,
            "paid": p.paid
        }
        for p in payments
    ]

    overdue_count = payments.filter(
        paid=False,
        due_date__lt=date.today()
    ).count()

    alerts = Alert.objects.filter(
        stand=stand
    )

    total_paid = sum(
        p.amount
        for p in payments
        if p.paid
    )

    balance = float(stand.price) - float(total_paid)

    return Response({

        "stand": {
            "id": stand.id,
            "stand_number": stand.stand,
            "name": stand.name,
            "size_sqm": stand.size_sqm,
            "price": stand.price,
            "deposit_required": stand.deposit_required,
            "description": stand.description,
            "latitude": stand.latitude,
            "longitude": stand.longitude,
            "image": stand.image.url if stand.image else None
        },

        "client": {
            "name": client.name if client else None,
            "phone_number": client.phone_number if client else None,
            "national_id": client.national_id if client else None
        },

        "payments": {
            "total_price": stand.price,
            "amount_paid": total_paid,
            "balance": balance,
            "payment_count": payments.count()
        },

        "payment_history": payment_history,

        "alerts": {
            "count": alerts.count(),
            "overdue_count": overdue_count
        }
    })

# ✅ SIMPLE API (used by your frontend fetch)
@api_view(['GET'])
def stand_list(request):
    stands = Stand.objects.all()
    serializer = StandSerializer(stands, many=True)
    return Response(serializer.data)

# ✅ SIMPLE PAYMENTS API (for frontend display only)
@api_view(['GET'])
def payment_list(request):
    payments = Payment.objects.all()
    serializer = PaymentSerializer(payments, many=True)
    return Response(serializer.data)

# Missed payment
@api_view(['GET'])
def missed_payments_view(request):
    missed = check_missed_payments()
    data = [
        {
            "client": str(p.client),
            "amount": p.amount,
            "due_date": p.due_date
        }
        for p in missed
    ]
    return Response(data)

@api_view(['GET'])
def get_alerts(request):
    alerts = Alert.objects.all()
    serializer = AlertSerializer(alerts, many=True)
    return Response(serializer.data)

def get_settings(request):
    settings = SiteSettings.objects.first()

    if not settings:
        return JsonResponse({"error": "No settings found"}, status=404)
    
    data = {
    "site_name": settings.site_name,
    "company_name": settings.company_name,
    "company_logo": settings.company_logo.url if settings.company_logo else None,
    "contact_email": settings.contact_email,
    "contact_phone": settings.contact_phone,
    "address": settings.address,
    "background_color": settings.background_color,
    "background_image": settings.background_image.url if settings.background_image else None,
}
    
    return JsonResponse(data)

# ✅ FULL CRUD APIs (for future use / admin dashboards)
class StandViewSet(viewsets.ModelViewSet):
    queryset = Stand.objects.all()
    serializer_class = StandSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer 

class AllocationViewSet(viewsets.ModelViewSet):
    queryset = Allocation.objects.all()
    serializer_class = AllocationSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer




