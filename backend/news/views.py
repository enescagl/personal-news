from news.models import Article, ImageContent
from news.permissions import IsEditor
from news.serializers import (ArticleDetailSerializer, ArticleSerializer,
                              ImageSerializer)
from rest_framework import viewsets
from rest_framework.parsers import FormParser, MultiPartParser


class ImageViewSet(viewsets.ModelViewSet):
    queryset = ImageContent.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [IsEditor]
    parser_classes = [FormParser, MultiPartParser]
    lookup_field = 'id'


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    read_serializer_class = ArticleDetailSerializer
    permission_classes = [IsEditor]
    lookup_field = 'id'
    search_fields = ['heading', 'short_description']

    def get_serializer_class(self):
        read_serializer_class = getattr(self, 'read_serializer_class', None)
        if read_serializer_class and self.action in ['list', 'retrieve']:
            return read_serializer_class
        else:
            return self.serializer_class
