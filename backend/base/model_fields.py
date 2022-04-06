import bleach
from base import bleach_defaults
from django.db import models


class SanitizedCharField(models.CharField):
    def pre_save(self, model_instance, add):
        current_value = getattr(model_instance, self.attname)
        if current_value and type(current_value) == str:
            cleaned = bleach.clean(current_value,
                                   tags=bleach_defaults.BLEACH_ALLOWED_TAGS,
                                   attributes=bleach_defaults.BLEACH_ALLOWED_ATTRIBUTES,
                                   styles=bleach_defaults.BLEACH_ALLOWED_STYLES,
                                   strip=False, strip_comments=True)
            setattr(model_instance, self.attname, cleaned)
        return getattr(model_instance, self.attname)


class SanitizedTextField(models.TextField):
    def pre_save(self, model_instance, add):
        current_value = getattr(model_instance, self.attname)
        if current_value and type(current_value) == str:
            cleaned = bleach.clean(current_value,
                                   tags=bleach_defaults.BLEACH_ALLOWED_TAGS,
                                   attributes=bleach_defaults.BLEACH_ALLOWED_ATTRIBUTES,
                                   styles=bleach_defaults.BLEACH_ALLOWED_STYLES,
                                   strip=False, strip_comments=True)
            setattr(model_instance, self.attname, cleaned)
        return getattr(model_instance, self.attname)
