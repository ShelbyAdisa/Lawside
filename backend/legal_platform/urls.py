# legal_platform/urls.py

from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.views import UserDetailsView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth endpoints
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),

    
    #path('auth/user/', UserDetailsView.as_view(), name='user-detail'),

    # API routes
    path('api/', include('api.urls')),
    path('api/appointments/', include('appointments.urls')),
    # path("api/payments/", include("payments.urls")),

]
