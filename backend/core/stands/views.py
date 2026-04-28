from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response


from .models import Stand, Client, Payment, Alert
from .serializers import StandSerializer, ClientSerializer, PaymentSerializer, AlertSerializer 


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

@api_view(['GET'])
def get_alerts(request):
    alerts = Alert.objects.all()
    serializer = AlertSerializer(alerts, many=True)
    return Response(serializer.data)

# ✅ FULL CRUD APIs (for future use / admin dashboards)
class StandViewSet(viewsets.ModelViewSet):
    queryset = Stand.objects.all()
    serializer_class = StandSerializer


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer