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
        file = validated_data.pop('file', None)

        profile = self.context['request'].user.userprofile
        validated_data['profile'] = profile
        post = Post.objects.create(**validated_data)

        if file:
            post.file = file  
            post.save()

        return post


#Comment section

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='userprofile.user.username', read_only=True)
    user_image = serializers.ImageField(source='userprofile.image', read_only=True)
    post_id = serializers.IntegerField(source='posts.id', read_only=True)
    user_id = serializers.IntegerField(source='userprofile.user.id', read_only=True)
    comment_id = serializers.IntegerField(source='id', read_only=True)
    content = serializers.CharField(required=True)

    class Meta:
        model = Comment
        fields = ['username', 'user_image', 'user_id', 'post_id', 'comment_id', 'content', 'date_created']
        read_only_fields = ['date_created']

    def create(self, validated_data):
        post = self.context['post']
        userprofile = self.context['request'].user.userprofile
        return Comment.objects.create(posts=post, userprofile=userprofile, **validated_data)

