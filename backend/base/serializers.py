from rest_framework.serializers import ModelSerializer


class TimestampedSerializer(ModelSerializer):
    class Meta:
        fields = ('id', 'created_at')
