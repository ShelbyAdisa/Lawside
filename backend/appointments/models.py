from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Appointment(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
    ]
    
    #client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')
    #lawyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lawyer_appointments')
    appointment_date = models.DateTimeField()
    fee = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    
    # Payment fields
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    payment_id = models.CharField(max_length=255, blank=True, null=True)
    stripe_session_id = models.CharField(max_length=255, blank=True, null=True)
    paid_at = models.DateTimeField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Appointment with {self.lawyer.get_full_name()} - {self.appointment_date}"
    
    @property
    def is_paid(self):
        return self.payment_status == 'paid'
    
    @property
    def can_be_cancelled(self):
        # Allow cancellation if not paid or within 24 hours of payment
        if not self.is_paid:
            return True
        if self.paid_at:
            return timezone.now() < self.paid_at + timezone.timedelta(hours=24)
        return False