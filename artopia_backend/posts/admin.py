
from django.contrib import admin
from .models import Post  # Import the Post model

class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'profile', 'description', 'file', 'date_created', 'likes_count', 'dislikes_count')  # Fields to display in the list view
    list_filter = ('date_created', 'profile')  # Filters for the admin list view
    search_fields = ('description', 'profile__user__username')  # Search fields in the admin list view
    ordering = ('-date_created',)  # Default ordering of posts by date created (newest first)
    readonly_fields = ('likes_count', 'dislikes_count', 'profile')  # Make the likes_count and dislikes_count fields read-only

    def likes_count(self, obj):
        return obj.likes.count()
    likes_count.short_description = 'Likes Count'

    def dislikes_count(self, obj):
        return obj.dislikes.count()
    dislikes_count.short_description = 'Dislikes Count'

admin.site.register(Post, PostAdmin)  # Register the Post model with the custom admin interface
