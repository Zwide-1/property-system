id="settings-model"
from django.db import models
from datetime import date

class Stand(models.Model):
    stand = models.CharField(max_length=50)
    name = models.CharField(max_length=255)
    size_sqm = models.DecimalField(
        max_digits=10,
        decimal_places=2)
    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00)
    deposit_required = models.DecimalField(
        max_digits=12,
        decimal_places=2)
    description = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    image = models.ImageField(
        upload_to="stands/")

    def __str__(self):
        return f"{self.stand} - {self.name}"

class Client(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20, default="0000000000")
    email = models.EmailField()
    national_id = models.CharField(
        max_length=50,
        blank=True,
        null=True)

    def __str__(self):
        return self.name

class Allocation(models.Model):
    stand = models.ForeignKey(
        Stand,
        on_delete=models.CASCADE)
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE)
    allocation_date = models.DateField()

    def __str__(self):
        return f"{self.client.name} - {self.stand.stand}"

class Payment(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    stand = models.ForeignKey(Stand, on_delete=models.CASCADE)
    allocation = models.ForeignKey(Allocation, on_delete=models.CASCADE, related_name='payments',
                                   null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    due_date = models.DateField()
    paid = models.BooleanField(default=False)
    payment_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.client.name} - ${self.amount}"
    
    @property
    def is_overdue(self):
        return (not self.paid and self.due_date < date.today())
    def needs_alerts(self):
        return self.is_overdue

class Alert(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, null=True, blank=True)
    stand = models.ForeignKey(Stand, on_delete=models.CASCADE, null=True, blank=True)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, null=True, blank=True)
    message = models.TextField()
    sent_email = models.BooleanField(default=False)
    sent_sms = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Alert for {self.client.name}"
    
class SiteSettings(models.Model):
    site_name = models.CharField(
        max_length=255,
        default="Property System")
    company_name = models.CharField(
        max_length=255,
        default="Property Development Company")
    company_logo = models.ImageField(
        upload_to="logos/",
        null=True,
        blank=True)
    contact_email = models.EmailField(
        blank=True,
        null=True)
    contact_phone = models.CharField(
        max_length=50,
        blank=True,
        null=True)
    address = models.TextField(
        blank=True,
        null=True)
    background_color = models.CharField(
        max_length=50,
        default="#ffffff")
    background_image = models.ImageField(
        upload_to="backgrounds/",
        null=True,
        blank=True)

    def __str__(self):
        return self.site_name  

