from base.serializers import TimestampedSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from rest_framework import serializers


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = '__all__'


class UserSerializer(TimestampedSerializer):
    groups = GroupSerializer(many=True, read_only=True)

    class Meta(TimestampedSerializer.Meta):
        model = get_user_model()
        fields = ('id', 'groups', 'first_name', 'last_name', 'email', 'is_active')
