from django.db import models
from accounts.models import CustomUser

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    client = models.ForeignKey(CustomUser, related_name='appointments', on_delete=models.CASCADE)
    lawyer = models.ForeignKey(CustomUser, related_name='lawyer_appointments', on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.client.email} → {self.lawyer.email} on {self.date} at {self.time}"
