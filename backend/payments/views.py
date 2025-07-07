# import stripe
# from django.conf import settings
# from django.views.decorators.csrf import csrf_exempt
# from django.http import HttpResponse
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# from accounts.models import CustomUser
# from appointments.models import Appointment

# stripe.api_key = settings.STRIPE_SECRET_KEY


# @api_view(['POST'])
# def create_checkout_session(request):
#     try:
#         data = request.data
#         lawyer_id = data["lawyer_id"]
#         client_id = data["client_id"]
#         date = data["date"]
#         message = data.get("message", "")

#         lawyer = CustomUser.objects.get(id=lawyer_id)
#         client = CustomUser.objects.get(id=client_id)

#         fee_kes = float(data["amount"])
#         amount = int(fee_kes * 100)

#         session = stripe.checkout.Session.create(
#             payment_method_types=['card'],
#             line_items=[{
#                 'price_data': {
#                     'currency': 'kes',
#                     'unit_amount': amount,
#                     'product_data': {
#                         'name': f"Consultation with {lawyer.get_full_name()}",
#                     },
#                 },
#                 'quantity': 1,
#             }],
#             mode='payment',
#             success_url=settings.DOMAIN + '/payment-success',
#             cancel_url=settings.DOMAIN + '/payment-cancelled',
#             metadata={
#                 "lawyer_id": lawyer.id,
#                 "client_id": client.id,
#                 "date": date,
#                 "message": message,
#             },
#         )

#         return Response({"checkout_url": session.url})
#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# @csrf_exempt
# @api_view(["POST"])
# def stripe_webhook(request):
#     payload = request.body
#     sig_header = request.META.get("HTTP_STRIPE_SIGNATURE")
#     endpoint_secret = "your_webhook_secret"  # find this in Stripe CLI or Dashboard

#     try:
#         event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)

#         if event['type'] == 'checkout.session.completed':
#             session = event['data']['object']
#             metadata = session.get('metadata', {})

#             lawyer = CustomUser.objects.get(id=metadata['lawyer_id'])
#             client = CustomUser.objects.get(id=metadata['client_id'])

#             Appointment.objects.create(
#                 lawyer=lawyer,
#                 client=client,
#                 date=metadata['date'],
#                 message=metadata.get('message', ''),
#                 status='pending',
#             )

#             print("✅ Appointment created")

#     except Exception as e:
#         print("❌ Webhook error:", e)
#         return HttpResponse(status=400)

#     return HttpResponse(status=200)


import os
import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from appointments.models import Appointment   # <-- your appointment model
from accounts.models import CustomUser
from django.utils import timezone

# Initialize Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", settings.STRIPE_SECRET_KEY)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_checkout_session(request):
    """
    Create a Stripe Checkout Session for a one‐time appointment fee.
    Expects JSON body: { "appointment_id": 123 }
    """
    user = request.user
    appt_id = request.data.get("appointment_id")
    if not appt_id:
        return Response({'error': 'appointment_id is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        appointment = Appointment.objects.get(id=appt_id, client=user)
    except Appointment.DoesNotExist:
        return Response({'error': 'Appointment not found'}, status=status.HTTP_404_NOT_FOUND)

    # You could also store a Stripe Price ID on your Appointment or Lawyer model
    amount_cents = int(appointment.fee * 100)  

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': settings.STRIPE_CURRENCY,         # e.g. "usd"
                    'product_data': {
                        'name': f"Legal consultation with {appointment.lawyer.get_full_name()}",
                        'description': f"Appointment on {appointment.scheduled_for}",
                    },
                    'unit_amount': amount_cents,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f"{settings.FRONTEND_DOMAIN}/appointment-success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{settings.FRONTEND_DOMAIN}/appointment-cancel",
            metadata={
                'user_id': user.id,
                'appointment_id': appointment.id,
                'lawyer_id': appointment.lawyer.id,
            }
        )
        return Response({'url': session.url})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['POST'])
def stripe_webhook(request):
    """
    Handle Stripe webhook events. We only care about checkout.session.completed here.
    """
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET", settings.STRIPE_WEBHOOK_SECRET)

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
    except (ValueError, stripe.error.SignatureVerificationError) as e:
        return Response(status=400)

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        _handle_checkout_session(session)

    return Response({'status': 'success'})


def _handle_checkout_session(session):
    """
    Mark the appointment paid and kick off your legal workflow.
    """
    meta = session.get('metadata', {})
    appt_id = meta.get('appointment_id')
    try:
        appt = Appointment.objects.get(id=appt_id)
        appt.is_paid = True
        appt.paid_at = timezone.now()
        appt.stripe_session_id = session.id
        appt.save()

        # e.g. notify lawyer, create case file, send emails…
        appt.start_legal_process()

    except Appointment.DoesNotExist:
        # log this
        pass
    except Exception as e:
        # log errors
        pass
        1       12