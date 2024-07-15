from django.db import models
from user.models import *
# Create your models here.

class Product(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='product')
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    price = models.IntegerField()
    image = models.ImageField(upload_to='products/')
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name
