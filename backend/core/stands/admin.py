from django.contrib import admin
from .models import Client, Stand, Payment, Alert

admin.site.register(Client)
admin.site.register(Stand)
admin.site.register(Payment)
admin.site.register(Alert)
# Register your models here.
