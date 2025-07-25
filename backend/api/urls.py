from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views 
from lawyers.api_views import get_lawyers

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('registration/', views.RegisterView.as_view(), name='register'),  
    path('lawyers/', get_lawyers, name='get_lawyers'),
]