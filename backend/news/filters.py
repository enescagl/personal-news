import django
from news.models import News

from django_filters.rest_framework import FilterSet
import django_filters.rest_framework.filters as django_filters


class NewsFilter(FilterSet):
    heading = django_filters.CharFilter(field_name='heading',
                                        lookup_expr='icontains')

    class Meta:
        model = News
        fields = ['heading']
