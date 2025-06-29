from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AppointmentCreateView

router = DefaultRouter()
# router.register(r'availability', basename='availability')

urlpatterns = [
    path('', include(router.urls)),
    # ('appointments/', AppointmentListCreateView.as_view(), name='appointments'),
]
