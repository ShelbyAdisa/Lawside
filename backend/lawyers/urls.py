from django.urls import path
from .api_views import get_lawyers

urlpatterns = [
    path('api/lawyers/', get_lawyers, name='get_lawyers'),
]
