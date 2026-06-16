from rest_framework import serializers
from .models import Stand, Client, Allocation, Payment, Alert

class StandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stand
        fields = '__all__'

class AllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allocation
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class AlertSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(
        source="client.name",
        read_only=True
    )

    stand_number = serializers.CharField(
        source="stand.stand",
        read_only=True
    )

    class Meta:
        model = Alert
        fields = [
            "id",
            "client",
            "stand",
            "client_name",
            "stand_number",
            "message",
            "sent_email",
            "sent_sms",
            "created_at",
        ]

class PropertyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stand
        fields = "__all__"


            
