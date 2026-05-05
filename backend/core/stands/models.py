from django.db import models
from datetime import date

class Client(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Stand(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    image = models.ImageField(upload_to='stands/', null=True, blank=True)

    def __str__(self):
        return self.name

class Payment(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    stand = models.ForeignKey(Stand, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateField()
    paid = models.BooleanField(default=False)
    payment_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.client.name} - {self.stand.name}"
    @property
    def is_overdue(self):
        return not self.paid and self.due_date < date.today()

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
    site_name = models.CharField(max_length=100, default="Property App")
    background_color = models.CharField(max_length=20, default="#ffffff")
    background_image = models.ImageField(upload_to='backgrounds/', null=True, blank=True)

    def __str__(self):
        return self.site_name    

