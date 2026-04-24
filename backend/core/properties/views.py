#from django.shortcuts import render

from rest_framework import viewsets
from .models import Stand, Client, Payment
from .serializers import StandSerializer, ClientSerializer, PaymentSerializer

class StandViewSet(viewsets.ModelViewSet):
    queryset = Stand.objects.all()
    serializer_class = StandSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
