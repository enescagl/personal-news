from pathlib import Path
from urllib.parse import urlparse

import requests
from authentication.permissions import EIsAuth
from django.core.files.temp import NamedTemporaryFile
from news.models import Article, ImageContent
from news.permissions import IsEditor
from news.serializers import (ArticleDetailSerializer, ArticleSerializer,
                              ImageSerializer)
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response


class ImageViewSet(viewsets.ModelViewSet):
    queryset = ImageContent.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [IsEditor]
    parser_classes = [FormParser, MultiPartParser]
    lookup_field = 'id'

    @action(detail=False, methods=['POST'],
            permission_classes=[EIsAuth],
            name='Image From URL',
            url_name='image_from_url',
            parser_classes=[JSONParser])
    def from_url(self, request):
        image_url = request.data.get('url', None)
        if not image_url:
            return Response('Missing image url in request body. (url)')
        parsed_url = urlparse(image_url).path
        image_name = Path(parsed_url).name
        image_data = requests.get(image_url, allow_redirects=True).content

        instance = ImageContent()

        tmp_image_file = NamedTemporaryFile(delete=True)
        tmp_image_file.write(image_data)
        tmp_image_file.flush()
        instance.image.save(image_name, tmp_image_file.file)

        instance.url = image_url
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


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
