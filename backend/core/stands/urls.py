from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import property_details

from .views import (
    StandViewSet,
    ClientViewSet,
    AllocationViewSet,
    PaymentViewSet,
    AlertViewSet,
    property_details
)

router = DefaultRouter()

router.register("stands", StandViewSet)
router.register("clients", ClientViewSet)
router.register("allocations", AllocationViewSet)
router.register("payments", PaymentViewSet)
router.register("alerts", AlertViewSet)

urlpatterns = [
    path("property-details/<int:stand_id>/", property_details),
    path("", include(router.urls)),
    
]