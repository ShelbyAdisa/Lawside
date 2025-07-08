from rest_framework import serializers

class CheckoutSessionSerializer(serializers.Serializer):
    amount = serializers.FloatField()
    client_id = serializers.IntegerField()
    lawyer_id = serializers.IntegerField()
    date = serializers.DateTimeField()
    message = serializers.CharField(required=False, allow_blank=True)
