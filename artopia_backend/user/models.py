# Import necessary modules from Django
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin  # Allows for customization of the user model
from django.contrib.auth.base_user import BaseUserManager  # Manages creation of user instances
from django.core.exceptions import ValidationError  # Used to raise errors if certain conditions aren't met
from django.core.validators import validate_email  # Validator for email addresses
from django.utils import timezone  # Utility functions related to time
from django.db.models.signals import post_save


# Define a custom manager for the user model
class CustomUserManager(BaseUserManager):
    """
    Custom manager for the CustomUser model.
    Inherits from BaseUserManager to handle user creation and management.
    """

    def create_user(self, email, password=None, **extra_fields):
        """
        Creates a new user instance.
        Raises ValueError if email or password is missing.
        """
        if not email:
            raise ValueError('Email is a required field.')
        if not password:
            raise ValueError('Password is a required field.')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Creates a superuser instance.
        Sets is_staff and is_superuser flags to True.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

# Define the custom user model
class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model extending AbstractBaseUser and PermissionsMixin.
    Allows for customization of the user model beyond Django's default User model.
    """
    username = models.CharField(max_length=15, unique=True)  
    email = models.EmailField(validators=[validate_email], unique=True)  
    date_joined = models.DateTimeField(default=timezone.now)  


    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    REQUIRED_FIELDS = ['email']  
    USERNAME_FIELD = 'username'  

    objects = CustomUserManager()  

    

class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='userprofile')
    bio = models.CharField(max_length=200, blank=True, default='🎨 Passionate artist exploring the beauty of colors and forms. Join me on my creative journey! 🖌️✨')  # Optional bio field with a maximum length of 200 characters
    image = models.ImageField(upload_to="media", default="default.png")
    
    def validate_bio_length(self):
        """
        Validates the length of the bio field.
        Raises ValidationError if the bio is longer than 200 characters.
        """
        if len(self.bio) > 200:
            raise ValidationError("Bio should be less than 200 characters")
    
    def __str__(self):
        return self.user.username
