from django.urls import path
from django.urls.conf import include

from rest_framework import routers

from authentication.views import UserViewSet, GroupViewSet, MeAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)

urlpatterns = router.urls + [
    path('authentication/login/',
         TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('authentication/refresh-token/',
         TokenRefreshView.as_view(),
         name='token_refresh'),
    path('authentication/me/', MeAPIView.as_view(), name='me'),
]
