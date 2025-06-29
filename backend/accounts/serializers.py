from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers
from .models import CustomUser

class CustomUserDetailsSerializer(UserDetailsSerializer):
    is_lawyer = serializers.BooleanField(read_only=True)
    is_client = serializers.BooleanField(read_only=True)

    class Meta(UserDetailsSerializer.Meta):
        model = CustomUser
        fields = UserDetailsSerializer.Meta.fields + ('is_lawyer', 'is_client')
