# # appointments/serializers.py
# from rest_framework import serializers
# from .models import Appointment

# class AppointmentCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Appointment
#         fields = ['lawyer', 'date_time', 'notes']

#     def create(self, validated_data):
#         # Attach the client from the request
#         request = self.context['request']
#         validated_data['client'] = request.user
#         return super().create(validated_data)
from rest_framework import serializers
from .models import Appointment

class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ["id", "lawyer", "client", "scheduled_for", "message"]
        read_only_fields = ["id", "client"]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["client"] = user
        return super().create(validated_data)