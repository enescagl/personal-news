from django.db import models
from core import models as core_models


# Create your models here.
class News(core_models.TimestampedModel):
    heading = models.CharField(max_length=128)
    body = models.TextField()
    short_description = models.CharField(max_length=256)
    cover_image = models.ImageField(upload_to="static/img/cover_images")
