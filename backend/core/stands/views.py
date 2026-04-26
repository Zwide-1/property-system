from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Stand, Client, Payment
from .serializers import StandSerializer, ClientSerializer, PaymentSerializer


# ✅ SIMPLE API (used by your frontend fetch)
@api_view(['GET'])
def stand_list(request):
    stands = Stand.objects.all()
    serializer = StandSerializer(stands, many=True)
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