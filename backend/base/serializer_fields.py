import nh3
from rest_framework.relations import SlugRelatedField
from rest_framework.serializers import CharField

from base import sanitization_defaults


class UUIDSlugRelatedField(SlugRelatedField):
    def __init__(self, slug_field=None, **kwargs):
        slug_field = "id"
        super().__init__(slug_field=slug_field, **kwargs)


class SanitizedCharField(CharField):
    enable_sanitization = None

    # TODO: Find a way to make this serializers choice.
    def __init__(self, enable_sanitization=True, **kwargs):
        self.enable_sanitization = enable_sanitization
        super().__init__(**kwargs)

    def to_representation(self, value):
        if not self.enable_sanitization:
            return super().to_representation(value)

        sanitized_val = nh3.clean(
            html=value,
            tags=sanitization_defaults.ALLOWED_TAGS,
            strip_comments=True,
        )
        return super().to_representation(sanitized_val)
