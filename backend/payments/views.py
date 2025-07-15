# payments/views.py
import stripe
import json
from datetime import datetime
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from appointments.models import Appointment

stripe.api_key = settings.STRIPE_SECRET_KEY


@csrf_exempt
@api_view(['POST'])
def create_checkout_session(request):
    try:
        data = json.loads(request.body)

        # Create Stripe checkout session with metadata
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': data.get('service_name', 'Legal Service'),
                        },
                        'unit_amount': int(data.get('amount', 0) * 100),  # amount in cents
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=f"{data.get('success_url')}?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=data.get('cancel_url', 'http://localhost:8000/cancel'),
            metadata={
                'appointment_id': data.get('appointment_id'),
                'lawyer_id': data.get('lawyer_id'),
                'client_id': data.get('client_id'),
                'date': data.get('date'),  # ISO format
                'notes': data.get('message', '')
            }
        )
        return JsonResponse({'checkout_url': checkout_session.url})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def verify_session(request, session_id):
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        metadata = session.get("metadata", {})

        # Parse date and time from ISO string
        dt = datetime.fromisoformat(metadata['date'].replace('Z', ''))
        appointment_date = dt.date()
        appointment_time = dt.time()

        # Prevent duplicate creation
        appointment, created = Appointment.objects.get_or_create(
            stripe_session_id=session_id,
            defaults={
                "lawyer_id": metadata["lawyer_id"],
                "client_id": metadata.get("client_id"),
                "date": appointment_date,
                "time": appointment_time,
                "notes": metadata.get("notes", ""),
                "fee": session.amount_total,
                "is_paid": True,
                "status": "Confirmed",
            }
        )

        return Response({
            "appointment_id": appointment.id,
            "amount": session.amount_total,
            "lawyer": {
                "id": appointment.lawyer.id,
                "name": f"{appointment.lawyer.first_name} {appointment.lawyer.last_name}",
                "email": appointment.lawyer.email
            },
            "client": {
                "id": appointment.client.id,
                "name": f"{appointment.client.first_name} {appointment.client.last_name}",
                "email": appointment.client.email,
            },
            "date": str(appointment.date),
            "time": str(appointment.time)
        })

    except Exception as e:
        return Response({"error": str(e)}, status=400)


@csrf_exempt
@require_POST
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError:
        return HttpResponse(status=400)

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        print(f"Payment successful: {session}")

    return HttpResponse(status=200)
