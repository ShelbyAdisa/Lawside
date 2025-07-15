# payments/urls.py
from django.urls import path
from .views import create_checkout_session, stripe_webhook, verify_session  

urlpatterns = [
    path('create-checkout-session/', create_checkout_session, name='create_checkout_session'),
    path('stripe-webhook/', stripe_webhook, name='stripe_webhook'),
    path('verify-session/<str:session_id>/', verify_session, name='verify_session'), 
]
