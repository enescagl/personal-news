from base.serializer_fields import UUIDSlugRelatedField
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer


class TimestampedSerializer(ModelSerializer):
    serializer_related_field = UUIDSlugRelatedField

    class Meta:
        abstract = True
        fields = ('id', 'created_at', 'updated_at')
        extra_kwargs = {
            'created_by':
                {'default': serializers.CurrentUserDefault(), 'read_only': True}
        }
        read_only_fields = ('created_at', 'updated_at')
