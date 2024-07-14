# posts/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('artcafepost/', PostCreateView.as_view(), name='post-create'),
    path('artcafeposts/', GetAllPostsDetailView.as_view(), name='allposts-view'),
    path('artcafepost/<int:post_id>/', PostDetailView.as_view(), name='post-detail'),
]
