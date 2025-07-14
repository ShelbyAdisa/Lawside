from django.shortcuts import render
from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer
from .serializers import CustomUserDetailsSerializer
from dj_rest_auth.views import UserDetailsView

class CustomUserDetailsView(UserDetailsView):
    serializer_class = CustomUserDetailsSerializer

class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer