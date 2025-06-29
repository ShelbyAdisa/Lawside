from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    user = request.user
    return Response({
        "message": f"Hello, {user.username}! You are authenticated.",
        "user_id": user.id,
        "email": user.email,
        "is_staff": user.is_staff
    })

class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, min_length=6)
    password2 = serializers.CharField(write_only=True, min_length=6)
    user_type = serializers.CharField(max_length=50)
    
    class Meta:
        model = User
        fields = ('email', 'password1', 'password2', 'user_type')
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    
    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        
        # Validate user_type
        valid_user_types = ['lawyer', 'client', 'admin']
        if data['user_type'] not in valid_user_types:
            raise serializers.ValidationError(f"Invalid user_type. Must be one of: {', '.join(valid_user_types)}")
        
        return data
    
    def create(self, validated_data):
        # Remove password2 and user_type as they're not User model fields
        password = validated_data.pop('password1')
        validated_data.pop('password2')
        user_type = validated_data.pop('user_type')
        
        # Create user with email as username
        user = User.objects.create_user(
            username=validated_data['email'],  # Use email as username
            email=validated_data['email'],
            password=password
        )
        
        # Store user_type in user's profile or as a separate field
        # You can create a UserProfile model for this or add to User model
        # For now, we'll store it in first_name field as a workaround
        user.first_name = user_type
        user.save()
        
        return user

class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                user = serializer.save()
                
                # Generate JWT tokens for immediate login
                refresh = RefreshToken.for_user(user)
                access_token = refresh.access_token
                
                return Response({
                    'message': 'User registered successfully',
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'username': user.username,
                        'user_type': user.first_name  # Retrieved from first_name field
                    },
                    'tokens': {
                        'refresh': str(refresh),
                        'access': str(access_token)
                    }
                }, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                return Response(
                    {'error': f'Registration failed: {str(e)}'}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    """
    Custom login view that works with email as username
    """
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response(
            {'error': 'Email and password are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Authenticate using email as username
    user = authenticate(username=email, password=password)
    
    if user:
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        
        return Response({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'user_type': user.first_name  # Retrieved from first_name field
            },
            'tokens': {
                'refresh': str(refresh),
                'access': str(access_token)
            }
        })
    else:
        return Response(
            {'error': 'Invalid email or password'}, 
            status=status.HTTP_401_UNAUTHORIZED
        )