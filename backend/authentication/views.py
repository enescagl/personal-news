from authentication.permissions import EIsAuth
from authentication.serializers import GroupSerializer, UserSerializer
from base.permissions import EIsAdminUser
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class UserViewSet(ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [EIsAdminUser]

    @action(detail=False, methods=['GET'], permission_classes=[EIsAuth], name='Me', url_name='me')
    def me(self, request):
        serializer = self.get_serializer(self.request.user, many=False)
        return Response(serializer.data)


class GroupViewSet(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [EIsAdminUser]
