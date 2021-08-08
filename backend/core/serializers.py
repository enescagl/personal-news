from core.models import TimestampedModel
from rest_framework import serializers


class TimestampedSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'created_at')
        abstract = True
