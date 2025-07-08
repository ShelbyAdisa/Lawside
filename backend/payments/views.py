import stripe
import json
import logging
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.utils.decorators import method_decorator
from appointments.models import Appointment
from django.utils import timezone

logger = logging.getLogger(__name__)

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
        logger.error("Invalid payload")
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError:
        logger.error("Invalid signature")
        return HttpResponse(status=400)

    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        handle_checkout_session_completed(session)
    
    elif event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        handle_payment_succeeded(payment_intent)
    
    elif event['type'] == 'payment_intent.payment_failed':
        payment_intent = event['data']['object']
        handle_payment_failed(payment_intent)
    
    else:
        logger.info(f'Unhandled event type: {event["type"]}')

    return HttpResponse(status=200)

def handle_checkout_session_completed(session):
    """Handle successful checkout session completion"""
    try:
        appointment_id = session['metadata']['appointment_id']
        appointment = Appointment.objects.get(id=appointment_id)
        
        # Update appointment status
        appointment.payment_status = 'paid'
        appointment.payment_id = session['payment_intent']
        appointment.paid_at = timezone.now()
        appointment.save()
        
        # You might want to send confirmation email here
        # send_payment_confirmation_email(appointment)
        
        logger.info(f"Payment completed for appointment {appointment_id}")
        
    except Appointment.DoesNotExist:
        logger.error(f"Appointment not found: {appointment_id}")
    except Exception as e:
        logger.error(f"Error handling checkout session: {str(e)}")

def handle_payment_succeeded(payment_intent):
    """Handle successful payment"""
    logger.info(f"Payment succeeded: {payment_intent['id']}")

def handle_payment_failed(payment_intent):
    """Handle failed payment"""
    logger.error(f"Payment failed: {payment_intent['id']}")
    # You might want to notify the user or update appointment status