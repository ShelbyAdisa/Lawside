from django.contrib import admin
from .models import Appointment

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("client", "lawyer", "date", "time", "status", "is_paid")
    list_filter = ("status", "is_paid", "date")
    search_fields = ("client__email", "lawyer__email")
