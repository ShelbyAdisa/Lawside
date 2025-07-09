# In payments/views.py
import stripe
import json
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view

# Set your Stripe secret key
stripe.api_key = settings.STRIPE_SECRET_KEY  

@csrf_exempt
@api_view(['POST'])
def create_checkout_session(request):
    try:
        data = json.loads(request.body)
        
        # Create Stripe checkout session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': data.get('service_name', 'Legal Service'),
                        },
                        'unit_amount': int(data.get('amount', 0) * 100),  # Amount in cents
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=data.get('success_url', 'http://localhost:8000/success'),
            cancel_url=data.get('cancel_url', 'http://localhost:8000/cancel'),
        )
        print(f"Using Stripe key: {stripe.api_key}")
        return JsonResponse({'checkout_url': checkout_session.url})
        
    except Exception as e:
        print(f"Using Stripe key: {stripe.api_key}")
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@require_POST
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET  # Add this to your settings.py
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError:
        return HttpResponse(status=400)
    
    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # Handle successful payment here
        print(f"Payment successful: {session}")
    
    return HttpResponse(status=200)