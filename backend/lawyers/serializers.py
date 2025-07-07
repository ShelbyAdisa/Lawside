from rest_framework import serializers
from lawyers.models import Lawyer

class LawyerSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    practice_areas = serializers.StringRelatedField(many=True)
    user_id = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Lawyer
        fields = [
            'user_id', 'name', 'biography', 'consultation_fee', 'average_rating',
            'practice_areas', 'years_of_experience', 'education', 'office_address', 'languages_spoken',
            'certifications', 'hourly_rate', 'is_available', 'total_reviews', 'license_number', 'bar_admission_date',
        ]

    def get_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
