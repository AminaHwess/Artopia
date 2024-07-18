from django.contrib.auth import get_user_model

User = get_user_model()

class EmailAuthBackend:
    def authenticate(self, request, email=None, username=None, password=None):
        user = None
        try:
            # Check if the email is provided; if so, try to authenticate using email
            if email:
                user = User.objects.get(email=email)
            elif username:
                user = User.objects.get(username=username)
            
            # If a user is found, check the password
            if user and user.check_password(password):
                return user
        except User.DoesNotExist:
            # Return None if the user does not exist
            return None
        
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id) 
        except User.DoesNotExist:
            return None

