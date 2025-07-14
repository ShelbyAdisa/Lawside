from dj_rest_auth.serializers import UserDetailsSerializer, LoginSerializer, UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
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

class CustomRegisterSerializer(RegisterSerializer):
    username = None  # remove username field
    user_type = serializers.ChoiceField(choices=[('client', 'Client'), ('lawyer', 'Lawyer')])

    def get_cleaned_data(self):
        print("🔥 CustomRegisterSerializer get_cleaned_data() called")
        data = super().get_cleaned_data()
        data['user_type'] = self.validated_data.get('user_type', 'client')
        return data

    def save(self, request):
        print("🔥 CustomRegisterSerializer save() called")
        user = super().save(request)
        user.user_type = self.cleaned_data.get('user_type', 'client')
        user.save()
        return user