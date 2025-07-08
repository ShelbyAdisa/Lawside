from django.db import models
from django.utils import timezone
from accounts.models import CustomUser

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    client = models.ForeignKey(CustomUser, related_name='appointments', on_delete=models.CASCADE, null=True)
    lawyer = models.ForeignKey(CustomUser, related_name='lawyer_appointments', on_delete=models.CASCADE, null=True)
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True)

    # Stripe-related fields
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)
    stripe_session_id = models.CharField(max_length=255, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.client.email} → {self.lawyer.email} on {self.date} at {self.time}"

    def start_legal_process(self):
        # Placeholder for post-payment actions
        pass
