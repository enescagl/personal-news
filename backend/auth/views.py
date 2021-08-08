from django.contrib.auth.models import Group, User

from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from auth.serializers import UserSerializer, GroupSerializer


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsAdminUser]
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    permission_classes = [IsAdminUser]
    serializer_class = GroupSerializer
