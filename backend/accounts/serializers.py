from dj_rest_auth.serializers import UserDetailsSerializer, LoginSerializer, UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from .models import CustomUser
from lawyers.models import Lawyer
from practice_areas.models import PracticeArea

print(" CustomUserSerializer file loaded")

class CustomLoginSerializer(LoginSerializer):
    username = None  # remove username field
    email = serializers.EmailField(required=True)

    def validate(self, attrs):
        # Move email into 'username' because dj-rest-auth expects it
        attrs['username'] = attrs.get('email')
        return super().validate(attrs)
    
class CustomUserDetailsSerializer(UserDetailsSerializer):
    user_type = serializers.CharField(read_only=True)
    pk = serializers.IntegerField(source='id', read_only=True)

    def __init__(self, *args, **kwargs):
        print("🔥 CUSTOM SERIALIZER __init__ CALLED")
        super().__init__(*args, **kwargs)

    class Meta(UserDetailsSerializer.Meta):
        model = CustomUser
        fields = ('pk', 'email', 'first_name', 'last_name', 'user_type')

    def to_representation(self, instance):
        print("🔥 USING CUSTOM SERIALIZER: user_type =", instance.user_type)
        return super().to_representation(instance)

class CustomRegisterSerializer(RegisterSerializer):
    username = None  # remove username
    user_type = serializers.ChoiceField(choices=[('client', 'Client'), ('lawyer', 'Lawyer')])
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    # Lawyer-specific fields
    license_number = serializers.CharField(required=False)
    bar_admission_date = serializers.DateField(required=False)
    years_of_experience = serializers.IntegerField(required=False)
    practice_areas = serializers.ListField(child=serializers.IntegerField(), required=False)
    biography = serializers.CharField(required=False)
    education = serializers.CharField(required=False)
    certifications = serializers.CharField(required=False, allow_blank=True)
    hourly_rate = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    consultation_fee = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    office_address = serializers.CharField(required=False)
    languages_spoken = serializers.CharField(required=False, allow_blank=True)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['user_type'] = self.validated_data.get('user_type', 'client')
        data['first_name'] = self.validated_data.get('first_name', '')
        data['last_name'] = self.validated_data.get('last_name', '')
        return data

    def save(self, request):
        user = super().save(request)
        user.user_type = self.cleaned_data.get('user_type', 'client')
        user.first_name = self.cleaned_data.get('first_name', '')
        user.last_name = self.cleaned_data.get('last_name', '')
        user.save()

        if user.user_type == 'lawyer':
            # Prevent duplicate creation if user already has a Lawyer profile
            if not hasattr(user, 'lawyer'):
                lawyer = Lawyer.objects.create(
                    user=user,
                    license_number=self.validated_data.get('license_number', ''),
                    bar_admission_date=self.validated_data.get('bar_admission_date'),
                    years_of_experience=self.validated_data.get('years_of_experience', 0),
                    biography=self.validated_data.get('biography', ''),
                    education=self.validated_data.get('education', ''),
                    certifications=self.validated_data.get('certifications', ''),
                    hourly_rate=self.validated_data.get('hourly_rate', 0),
                    consultation_fee=self.validated_data.get('consultation_fee', 0),
                    office_address=self.validated_data.get('office_address', ''),
                    languages_spoken=self.validated_data.get('languages_spoken', ''),
                )

                # Safely assign practice areas if provided
                practice_area_ids = self.validated_data.get('practice_areas', [])
                if practice_area_ids:
                    lawyer.practice_areas.set(practice_area_ids)

        return user
