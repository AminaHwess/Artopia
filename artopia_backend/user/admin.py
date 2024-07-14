from django.contrib import admin
from .models import *
# Register your models here.
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'date_joined', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email')  # Fields to be searchable in the admin interface
    ordering = ('-date_joined',)  # Order users by date_joined in descending order
admin.site.register(CustomUser, CustomUserAdmin)

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'image')  # Fields to display in the list view
    search_fields = ('user__username', 'bio')  # Search fields in the admin list view
    readonly_fields = ('user',)  # Make the 'user' field read-only as it's auto-filled
    
    # Exclude the 'user' field from being edited
    def get_readonly_fields(self, request, obj=None):
        if obj:  # If editing an existing UserProfile, 'user' is read-only
            return self.readonly_fields
        return self.readonly_fields
    
    # To validate the length of the bio field during save
    def save_model(self, request, obj, form, change):
        if change:  # If editing an existing UserProfile, validate the bio length
            obj.validate_bio_length()
        super().save_model(request, obj, form, change)
admin.site.register(UserProfile, UserProfileAdmin)  # Register the UserProfile model with the custom admin interface

