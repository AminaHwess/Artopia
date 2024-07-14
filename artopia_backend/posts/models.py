from django.db import models
from user.models import *

# Create your models here.

class Post(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='post')
    description = models.CharField(max_length=100)
    file = models.FileField(upload_to='documents/')
    date_created = models.DateTimeField(default=timezone.now)
    likes = models.ManyToManyField(CustomUser, related_name='liked_post', blank=True)
    dislikes = models.ManyToManyField(CustomUser, related_name='disliked_post', blank=True)
    def __str__(self):
        return self.description

    def likes_count(self):
        return self.likes.count()

    def dislikes_count(self):
        return self.dislikes.count()
    
