from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from base.serializer_fields import UUIDSlugRelatedField


class TimestampedSerializer(ModelSerializer):
    serializer_related_field = UUIDSlugRelatedField

    def update(self, instance, validated_data):
        if hasattr(instance, 'updated_by'):
            instance.updated_by = serializers.CurrentUserDefault()
        return super().update(instance, validated_data)

    class Meta:
        abstract = True
        fields = ('id', 'created_at', 'updated_at')
        extra_kwargs = {
            'created_by':
                {'default': serializers.CurrentUserDefault(), 'read_only': True}
        }
        read_only_fields = ('created_at', 'updated_at', 'updated_by')
