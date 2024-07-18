from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate
from knox.models import AuthToken
from rest_framework.generics import RetrieveUpdateAPIView
from django.shortcuts import get_object_or_404
from rest_framework import status




User = get_user_model()

class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('email') or serializer.validated_data.get('username')
            password = serializer.validated_data['password']

            user = None
            if username:
                try:
                    validate_email(username)
                    user = User.objects.filter(email=username).first()
                except ValidationError:
                    user = User.objects.filter(username=username).first()

            if user is None:
                return Response({"error": "User with this username/email does not exist."}, status=404)

            user = authenticate(request, username=user.username, password=password)
            if user and user.is_authenticated:
                _, token = AuthToken.objects.create(user)
                return Response(
                    {
                        'user': {
                            'email': user.email,
                            'username': user.username
                        },
                        'token': token,
                        'userId': user.id
                    }
                )
            else:
                return Response({"error": "Incorrect password."}, status=401)
        else:
            return Response(serializer.errors, status=400)



class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self,request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else: 
            return Response(serializer.errors,status=400)

class UserProfileView(RetrieveUpdateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserProfileSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH']:
            return [IsAuthenticated()]
        return [AllowAny()]  

    def get_object(self):
        user_id = self.kwargs['user_id']
        # Ensure the UserProfile object exists
        user_profile = get_object_or_404(UserProfile, user__id=user_id)
        return user_profile
    
    def put(self, request, *args, **kwargs):
        user_profile = request.user.userprofile
        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
            if 'image' not in request.data:
                request.data._mutable = True
                request.data['image'] = user_profile.image
                request.data._mutable = False
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


