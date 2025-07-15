# # appointments/serializers.py
from rest_framework import serializers
from .models import Appointment

class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ["id", "lawyer", "client", "date", "time", "status", "notes", "fee", "is_paid"]
        read_only_fields = ["id", "client"]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["client"] = user
        return super().create(validated_data)
    
class AppointmentReadSerializer(serializers.ModelSerializer):
    lawyer_name = serializers.SerializerMethodField()
    lawyer_email = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField()
    client_email = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = [
            "id",
            "lawyer_name",
            "lawyer_email",
            "client_name",
            "client_email",
            "date",
            "time",
            "status",
            "notes",
            "fee",
            "is_paid",
            "paid_at",
            "created_at",
        ]

    def get_lawyer_name(self, obj):
        return f"{obj.lawyer.first_name} {obj.lawyer.last_name}"

    def get_lawyer_email(self, obj):
        return obj.lawyer.email

    def get_client_name(self, obj):
        if obj.client:
            return f"{obj.client.first_name} {obj.client.last_name}"
        return "Unknown Client"

    def get_client_email(self, obj):
        return obj.client.email