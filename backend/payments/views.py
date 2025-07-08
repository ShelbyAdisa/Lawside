import stripe
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from appointments.models import Appointment

stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_checkout_session(request):
    """
    Creates a Stripe Checkout Session for an Appointment payment.
    Expects JSON body: { "appointment_id": <id> }
    """
    appointment_id = request.data.get('appointment_id')
    if not appointment_id:
        return Response(
            {'detail': 'appointment_id is required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        appointment = Appointment.objects.get(id=appointment_id)
    except Appointment.DoesNotExist:
        return Response(
            {'detail': 'Appointment not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="payment",
            customer_email=request.user.email,
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": f"Appointment #{appointment.id}",
                        },
                        "unit_amount": int(appointment.fee * 100),
                    },
                    "quantity": 1,
                }
            ],
            metadata={"appointment_id": str(appointment.id)},
            success_url=settings.FRONTEND_URL + "/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=settings.FRONTEND_URL + "/cancel",
        )
        return Response({"sessionId": session.id})
    except Exception as e:
        logger.error(f"Stripe session creation failed: {e}")
        return Response(
            {"detail": "Could not create Stripe session"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
