from dj_rest_auth.serializers import UserDetailsSerializer, LoginSerializer, UserDetailsSerializer
from rest_framework import serializers
from .models import CustomUser

print(" CustomUserSerializer file loaded")

class CustomLoginSerializer(LoginSerializer):
    username = None  # remove username field
    email = serializers.EmailField(required=True)

    def validate(self, attrs):
        # Move email into 'username' because dj-rest-auth expects it
        attrs['username'] = attrs.get('email')
        return super().validate(attrs)
    
class CustomUserDetailsSerializer(UserDetailsSerializer):
    user_type = serializers.CharField(source='user_type', read_only=True)
    pk = serializers.IntegerField(source='id', read_only=True)

    def __init__(self, *args, **kwargs):
        print("🔥 CUSTOM SERIALIZER __init__ CALLED")
        super().__init__(*args, **kwargs)

    class Meta(UserDetailsSerializer.Meta):
        model = CustomUser
        fields = ('pk', 'email', 'first_name', 'last_name', 'user_type')

    def to_representation(self, instance):
        print("🔥 USING CUSTOM SERIALIZER: user_type =", instance.user_type)
        return super().to_representation(instance)

