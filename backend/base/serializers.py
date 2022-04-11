from rest_framework import serializers
from rest_framework.serializers import ModelSerializer


class TimestampedSerializer(ModelSerializer):
    class Meta:
        fields = ('id', 'created_at')
        extra_kwargs = {
            'created_by':
                {'default': serializers.CurrentUserDefault(), 'read_only': True}
        }
