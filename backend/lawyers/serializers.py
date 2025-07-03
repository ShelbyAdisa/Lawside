from rest_framework import serializers
from lawyers.models import Lawyer

class LawyerSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    practice_areas = serializers.StringRelatedField(many=True)

    class Meta:
        model = Lawyer
        fields = [
            'name', 'biography', 'consultation_fee', 'average_rating',
            'practice_areas'
        ]

    def get_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
