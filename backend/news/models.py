from pathlib import Path

from base.model_fields import SanitizedCharField, SanitizedTextField
from base.models import TimestampedModel
from base.validators import validate_image_extension
from django.db import models
from django.template.defaultfilters import slugify


def image_directory_path(content, filename):
    return f'img/{filename}'


class ImageContent(TimestampedModel):
    image = models.ImageField(blank=True, upload_to=image_directory_path, validators=[validate_image_extension])
    url = models.URLField(blank=True, null=True)
    slug = SanitizedCharField(max_length=255, blank=True)
    name = SanitizedCharField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        image_attr = getattr(self, 'image')
        slug_attr = getattr(self, 'slug')
        name_attr = getattr(self, 'name')
        image_name = Path(image_attr.name).name

        if not slug_attr and image_attr is not None:
            setattr(self, 'slug', slugify(image_name))
        if not name_attr and image_attr is not None:
            setattr(self, 'name', slugify(image_name))

        super().save(*args, **kwargs)

    class Meta(TimestampedModel.Meta):
        db_table = 'images'
        verbose_name_plural = 'Images'
        verbose_name = 'Image'


class Article(TimestampedModel):
    heading = SanitizedCharField(max_length=128)
    body = SanitizedTextField()
    short_description = SanitizedCharField(max_length=256)
    cover_image = models.ForeignKey(ImageContent, on_delete=models.CASCADE, related_name='news')

    class Meta(TimestampedModel.Meta):
        db_table = 'articles'
        verbose_name_plural = 'Articles'
        verbose_name = 'Article'
