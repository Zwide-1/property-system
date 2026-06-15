from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    StandViewSet,
    ClientViewSet,
    AllocationViewSet,
    PaymentViewSet,
    AlertViewSet
)

router = DefaultRouter()

router.register("stands", StandViewSet)
router.register("clients", ClientViewSet)
router.register("allocations", AllocationViewSet)
router.register("payments", PaymentViewSet)
router.register("alerts", AlertViewSet)

urlpatterns = [
    path("", include(router.urls)),
]