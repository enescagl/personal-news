import uuid

from django.db import models
from django.utils.timezone import now

from core import settings


# https://github.com/drneox/django-paranoid/blob/master/django_paranoid/models.py#L12
class TimestampedModelManager(models.Manager):
    def get_querset(self):
        return super().get_querset().filter(deleted_at__isnull=True)


class TimestampedModel(models.Model):
    """
    An abstract model to use for timestamped models.
    (e.g. When record created or updated)
    """
    pk_id = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='%(class)s_created_by'
    )
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='%(class)s_updated_by'
    )

    # https://github.com/drneox/django-paranoid/blob/master/django_paranoid/models.py#L20
    deleted_at = models.DateTimeField(null=True)
    objects = TimestampedModelManager()
    objects_with_deleted = models.Manager()

    # https://github.com/drneox/django-paranoid/blob/master/django_paranoid/models.py#L27
    def delete(self, hard=False, using=None, keep_parents=False):
        if hard:
            super().delete(using=using, keep_parents=keep_parents)
        else:
            self.deleted_at = now()
            self.save()

    # https://github.com/drneox/django-paranoid/blob/master/django_paranoid/models.py#L34
    def restore(self):
        self.deleted_at = None
        self.save()

    class Meta:
        # By default, any model that inherits from `TimestampedModel` should
        # be ordered in reverse-chronological order. We can override this on a
        # per-model basis as needed, but reverse-chronological is a good
        # default ordering for most models.
        abstract = True
        ordering = ['-created_at', '-updated_at']
