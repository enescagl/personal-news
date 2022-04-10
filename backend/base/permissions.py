from django.contrib.auth.models import Group
from rest_framework.permissions import IsAdminUser


class EIsAdminUser(IsAdminUser):

    def has_permission(self, request, view):
        is_user_admin = Group.objects.get(name='Admin').user_set.filter(id=request.user.id).exists()
        return request.user and is_user_admin and request.user.is_superuser
