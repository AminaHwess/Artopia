
from django.contrib import admin
from .models import *  # Import the Post model

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'profile', 'name', 'date_created')  # Fields to display in the list view
    list_filter = ('date_created', 'profile')  # Filters for the admin list view
    search_fields = ('name', 'profile__user__username')  # Search fields in the admin list view
    ordering = ('-date_created',)  # Default ordering of posts by date created (newest first)
    readonly_fields = ('profile',)  # Make the likes_count and dislikes_count fields read-only


admin.site.register(Product, ProductAdmin)  # Register the Post model with the custom admin interface
