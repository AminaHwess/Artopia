from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='profile.user.username', read_only=True)
    user_image = serializers.ImageField(source='profile.image', read_only=True)
    product_id = serializers.IntegerField(source='id', read_only=True)
    user_id = serializers.IntegerField(source='profile.user.id', read_only=True)
    class Meta:
        model = Product
        fields = ['username', 'user_image','user_id', 'product_id', 'name', 'description','price', 'date_created', 'image']
        read_only_fields = ['date_created']

    def create(self, validated_data):
        profile = self.context['request'].user.userprofile
        validated_data['profile'] = profile
        return Product.objects.create(**validated_data)
