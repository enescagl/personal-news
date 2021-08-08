from core.models import TimestampedModel
from rest_framework.serializers import ModelSerializer


class TimestampedSerializer(ModelSerializer):
    class Meta:
        fields = ('id', 'created_at')
        abstract = True
