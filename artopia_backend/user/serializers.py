from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    userId = serializers.IntegerField(source='user.id', read_only=True)

    def validate(self, data):
        username = data.get('username')
        if not username:
            raise serializers.ValidationError("Either email or username is required.")

        return data

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('password', None)
        return ret

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        """
        Check if the provided username or email already exists in the database.
        """
        username = data.get('username')
        email = data.get('email')

        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({'username': 'This username is already in use.'})

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': 'This email address is already in use.'})

        return data  # Ensure the validated data is returned

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    user_id = serializers.CharField(source='user.id', read_only=True)


    class Meta:
        model = UserProfile
        fields = ['user_id', 'username', 'bio', 'image']
    def update(self, instance, validated_data):
        # Optionally, you can add extra validation logic here
        instance.bio = validated_data.get('bio', instance.bio)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance
