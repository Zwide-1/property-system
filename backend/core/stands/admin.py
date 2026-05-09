id="settings-admin"
from django.contrib import admin
from .models import SiteSettings
from .models import Client, Stand, Payment, Alert

admin.site.register(Client)
admin.site.register(Stand)
admin.site.register(Payment)
admin.site.register(Alert)
admin.site.register(SiteSettings)
# Register your models here.
