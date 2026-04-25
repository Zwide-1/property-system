#from django.shortcuts import render

from rest_framework import viewsets
from .models import Stand, Client, Payment
from .serializers import StandSerializer, ClientSerializer, PaymentSerializer

from django.http import JsonResponse

def stand_list(request):
    data = [
        {
            "id": 1,
            "name": "Stand A1",
            "gps": "-17.8292, 31.0522",
            "image": "land.jpg"
        }
    ]
    return JsonResponse(data, safe=False)

class StandViewSet(viewsets.ModelViewSet):
    queryset = Stand.objects.all()
    serializer_class = StandSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
