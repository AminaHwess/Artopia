from rest_framework import serializers
from .models import *

class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='profile.user.username', read_only=True)
    user_image = serializers.ImageField(source='profile.image', read_only=True)
    post_id = serializers.IntegerField(source='id', read_only=True)
    user_id = serializers.IntegerField(source='profile.user.id', read_only=True)
    class Meta:
        model = Post
        fields = ['username', 'user_image','user_id', 'post_id', 'description', 'file', 'date_created', 'likes', 'dislikes']
        read_only_fields = ['date_created', 'likes', 'dislikes', 'user_id']

    def create(self, validated_data):
        profile = self.context['request'].user.userprofile
        validated_data['profile'] = profile
        return Post.objects.create(**validated_data)
