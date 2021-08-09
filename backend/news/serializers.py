from news.models import News
from core.serializers import TimestampedSerializer


class NewsSerializer(TimestampedSerializer):
    class Meta:
        model = News
        fields = '__all__'
