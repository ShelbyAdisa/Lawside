from rest_framework import generics, permissions
from .models import Appointment
from .serializers import AppointmentCreateSerializer, AppointmentReadSerializer


class AppointmentCreateView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentCreateSerializer
    permission_classes = [] #need to add permissions.IsAuthenticated once this works 

class AppointmentListView(generics.ListAPIView):
    serializer_class = AppointmentCreateSerializer 
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Appointment.objects.filter(client=user).select_related('lawyer').order_by('date', 'time')
    
class PublicAppointmentListView(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentReadSerializer
    permission_classes = []

    def get(self, request, *args, **kwargs):
        print(">>> HIT PUBLIC APPOINTMENTS VIEW <<<")  # DEBUG
        return super().get(request, *args, **kwargs)