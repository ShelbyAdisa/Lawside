from rest_framework import generics, permissions
from .models import Appointment
from .serializers import AppointmentCreateSerializer

class AppointmentCreateView(generics.CreateAPIView):
    serializer_class = AppointmentCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
