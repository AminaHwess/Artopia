from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterViewset, LoginViewset, UserProfileView

router = DefaultRouter()
router.register('signup', RegisterViewset, basename='signup')
router.register('login', LoginViewset, basename='login')

# Define custom URL patterns
custom_urlpatterns = [
    path('profile/<int:user_id>/', UserProfileView.as_view(), name='user_profile'),
]

# Combine router's URLs with custom URL patterns
urlpatterns = custom_urlpatterns + router.urls
