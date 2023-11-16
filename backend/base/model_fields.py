import nh3
from base import sanitization_defaults
from django.db import models

"""
    These fields are for way in strategy.
    These shouldn't be the first choice of sanitization.
"""


class SanitizedCharField(models.CharField):
    enable_sanitization = False

    def __init__(self, *args, enable_sanitization=False, **kwargs):
        self.enable_sanitization = enable_sanitization
        super().__init__(*args, **kwargs)

    def pre_save(self, model_instance, add):
        if not self.enable_sanitization:
            return super().pre_save(model_instance, add)

        current_value = getattr(model_instance, self.attname)
        if current_value and type(current_value) is str:
            cleaned = nh3.clean(
                current_value,
                tags=sanitization_defaults.ALLOWED_TAGS,
                attributes=sanitization_defaults.ALLOWED_ATTRIBUTES,
                strip_comments=True,
            )
            setattr(model_instance, self.attname, cleaned)
        return getattr(model_instance, self.attname)


class SanitizedTextField(models.TextField):
    enable_sanitization = False

    def __init__(self, *args, enable_sanitization=False, **kwargs):
        self.enable_sanitization = enable_sanitization
        super().__init__(*args, **kwargs)

    def pre_save(self, model_instance, add):
        if not self.enable_sanitization:
            return super().pre_save(model_instance, add)

        current_value = getattr(model_instance, self.attname)
        if current_value and type(current_value) is str:
            cleaned = nh3.clean(
                current_value,
                tags=sanitization_defaults.ALLOWED_TAGS,
                attributes=sanitization_defaults.ALLOWED_ATTRIBUTES,
                strip_comments=True,
            )
            setattr(model_instance, self.attname, cleaned)
        return getattr(model_instance, self.attname)
