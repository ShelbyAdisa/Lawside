import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from accounts.models import CustomUser
from appointments.models import Appointment

stripe.api_key = settings.STRIPE_SECRET_KEY


@api_view(['POST'])
def create_checkout_session(request):
    try:
        data = request.data
        lawyer_id = data["lawyer_id"]
        client_id = data["client_id"]
        date = data["date"]
        message = data.get("message", "")

        lawyer = CustomUser.objects.get(id=lawyer_id)
        client = CustomUser.objects.get(id=client_id)

        fee_kes = float(data["amount"])
        amount = int(fee_kes * 100)

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'kes',
                    'unit_amount': amount,
                    'product_data': {
                        'name': f"Consultation with {lawyer.get_full_name()}",
                    },
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=settings.DOMAIN + '/payment-success',
            cancel_url=settings.DOMAIN + '/payment-cancelled',
            metadata={
                "lawyer_id": lawyer.id,
                "client_id": client.id,
                "date": date,
                "message": message,
            },
        )

        return Response({"checkout_url": session.url})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@api_view(["POST"])
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get("HTTP_STRIPE_SIGNATURE")
    endpoint_secret = "your_webhook_secret"  # find this in Stripe CLI or Dashboard

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)

        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            metadata = session.get('metadata', {})

            lawyer = CustomUser.objects.get(id=metadata['lawyer_id'])
            client = CustomUser.objects.get(id=metadata['client_id'])

            Appointment.objects.create(
                lawyer=lawyer,
                client=client,
                date=metadata['date'],
                message=metadata.get('message', ''),
                status='pending',
            )

            print("✅ Appointment created")

    except Exception as e:
        print("❌ Webhook error:", e)
        return HttpResponse(status=400)

    return HttpResponse(status=200)