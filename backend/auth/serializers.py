from django.contrib.auth.models import User, Group
from rest_framework import serializers


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'is_superuser',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_active',
            'groups',
        )
