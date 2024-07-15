# posts/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('product/', ProductCreateView.as_view(), name='product-create'),
    path('products/', GetAllProductsDetailView.as_view(), name='allproducts-view'),
    path('product/<int:post_id>/', ProductDetailView.as_view(), name='product-detail'),
]
