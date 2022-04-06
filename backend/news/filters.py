import django_filters
from django_filters.rest_framework import FilterSet
from news.models import Article


class ArticleFilter(FilterSet):
    heading = django_filters.CharFilter(field_name='heading', lookup_expr='icontains')

    class Meta:
        model = Article
        fields = ['heading']
