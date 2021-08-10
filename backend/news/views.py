from rest_framework import viewsets

from news.models import News
from core.permissions import IsEditor
from news.serializers import NewsSerializer
from news.filters import NewsFilter
# Create your views here.


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [IsEditor]
    filter_class = NewsFilter
