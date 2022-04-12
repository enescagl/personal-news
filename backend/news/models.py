import os

from base.model_fields import SanitizedCharField, SanitizedTextField
from base.models import TimestampedModel
from base.validators import validate_image_extension
from django.db import models
from django.utils.text import slugify


def image_directory_path(content, filename):
    _, file_ext = os.path.splitext(filename)
    storage_file_name = f'{content.slug}{file_ext}'
    return f'media/img/cover_images/{storage_file_name}'


def video_directory_path(content, filename):
    _, file_ext = os.path.splitext(filename)
    storage_file_name = f'{content.slug}{file_ext}'
    return f'videos/{storage_file_name}'


def file_directory_path(content, filename):
    _, file_ext = os.path.splitext(filename)
    storage_file_name = f'{content.slug}{file_ext}'
    return f'files/{storage_file_name}'


class ImageContent(TimestampedModel):
    image = models.ImageField(upload_to=image_directory_path, validators=[validate_image_extension])
    slug = SanitizedCharField(max_length=255, blank=True)
    name = SanitizedCharField(max_length=255, blank=True)

    def save(self, *args, **kwargs):
        filename_attr = getattr(self, 'image')
        slug_attr = getattr(self, 'slug')
        if (slug_attr == '' or slug_attr is None) and filename_attr is not None:
            setattr(self, 'slug', slugify(self.filename_attr.name))
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
