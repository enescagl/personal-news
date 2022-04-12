from rest_framework.relations import SlugRelatedField


class UUIDSlugRelatedField(SlugRelatedField):
    def __init__(self, slug_field=None, **kwargs):
        slug_field = 'id'
        super().__init__(slug_field=slug_field, **kwargs)
