from django.db import models

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

class Alert(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    stand = models.ForeignKey(Stand, on_delete=models.CASCADE, null=True, blank=True)
    message = models.TextField()
    date = models.DateField()

    def __str__(self):
        return f"Alert for {self.client.name}"

