from news.models import News
from core.serializers import TimestampedSerializer


class NewsSerializer(TimestampedSerializer):
    class Meta:
        model = News
        fields = TimestampedSerializer.Meta.fields + (
            'heading',
            'body',
            'short_description',
            'cover_image',
        )
