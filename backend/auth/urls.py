from django.urls import path
from django.urls.conf import include

from rest_framework import routers

from auth import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('users/me/', views.MeAPIView)
]
