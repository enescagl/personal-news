from authentication.views import GroupViewSet, UserViewSet
from django.urls import path
from rest_framework import routers
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)

urlpatterns = router.urls + [
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
