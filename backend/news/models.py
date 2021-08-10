from django.db import models
from core.models import TimestampedModel


# Create your models here.
class News(TimestampedModel):
    heading = models.CharField(max_length=128)
    body = models.TextField()
    short_description = models.CharField(max_length=256)
    cover_image = models.ImageField(upload_to="img/cover_images")
