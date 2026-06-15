id="settings-view"
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import SiteSettings
from .utils import check_missed_payments


from .models import Stand, Client, Allocation, Payment, Alert
from .serializers import StandSerializer, ClientSerializer, AllocationSerializer, PaymentSerializer, AlertSerializer 


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
    "background_color": settings.background_color,
    "background_image": settings.background_image.url if settings.background_image else None
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




