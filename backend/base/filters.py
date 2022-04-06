from typing import Type

from django.db.models import Model, Prefetch, QuerySet


class FilterPrefetch:

    # prefetch_fields = { 'field': ('field_prefix', Model), ... }

    # TODO: Create dynamic prefetching for deeply nested queries
    def filter_with_prefetch(self, qs: QuerySet, field_prefix: str, model: Type[Model]):
        prefetch_with = model.objects.filter(**self.get_prefetch_field_filters(field_prefix))
        if field_prefix.endswith('__'):
            stripped_prefix = field_prefix[:-2]
        else:
            stripped_prefix = field_prefix
        return qs.prefetch_related(Prefetch(stripped_prefix, prefetch_with))

    def get_prefetch_field_filters(self, prefetch_field_prefix: str):
        content_filters = {}
        for key, value in self.filters.items():
            if prefetch_field_prefix in value.field_name:
                filter_name = value.field_name.replace(prefetch_field_prefix, '')
                content_filters[filter_name] = self.form.cleaned_data.get(key, None)

        return {key: value for key, value in content_filters.items() if value}

    @property
    def qs(self):
        already_prefetched = hasattr(self, '_qs')
        qs = super().qs

        if self.is_bound and not already_prefetched:
            for key, (field_prefix, model) in self.prefetch_fields.items():
                self._qs = self.filter_with_prefetch(qs, field_prefix, model)

        return self._qs
