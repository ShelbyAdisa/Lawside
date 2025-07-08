from django.urls import path
from .views import ClientRegisterView, LawyerRegisterView

urlpatterns = [
    path("register/client/", ClientRegisterView.as_view(), name="register-client"),
    path("register/lawyer/", LawyerRegisterView.as_view(), name="register-lawyer"),
]