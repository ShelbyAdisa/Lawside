from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AppointmentCreateView, AppointmentListView, PublicAppointmentListView

router = DefaultRouter()
# router.register(r'availability', basename='availability')

urlpatterns = [
    path('', include(router.urls)),
    # ('appointments/', AppointmentListCreateView.as_view(), name='appointments'),
    path('', AppointmentListView.as_view(), name='appointment-list'),
    path('public/', PublicAppointmentListView.as_view(), name='public-appointments'),
]
