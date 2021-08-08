from django.db import models


class TimestampedModel(models.Model):
    """
    An abstract model to use for timestamped models.
    (e.g. When record created or updated)
    """

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # is_deleted = models.BooleanField(default=False)
    # deleted_at = models.DateTimeField(auto_now=True)

    class Meta:
        # By default, any model that inherits from `TimestampedModel` should
        # be ordered in reverse-chronological order. We can override this on a
        # per-model basis as needed, but reverse-chronological is a good
        # default ordering for most models.
        abstract = True
        ordering = ['-created_at', '-updated_at']
