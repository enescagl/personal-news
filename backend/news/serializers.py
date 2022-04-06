from base.serializers import TimestampedSerializer
from news.models import Article, ImageContent


class ImageSerializer(TimestampedSerializer):
    class Meta:
        model = ImageContent
        fields = (*TimestampedSerializer.Meta.fields, 'image', 'slug', 'name')


class ArticleSerializer(TimestampedSerializer):
    class Meta:
        model = Article
        fields = (*TimestampedSerializer.Meta.fields, 'heading', 'body', 'short_description', 'cover_image')


class ArticleDetailSerializer(TimestampedSerializer):
    cover_image = ImageSerializer(many=False)

    class Meta:
        model = Article
        fields = (*TimestampedSerializer.Meta.fields, 'heading', 'body', 'short_description', 'cover_image')
