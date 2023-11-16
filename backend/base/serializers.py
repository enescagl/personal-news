from base.serializer_fields import SanitizedCharField, UUIDSlugRelatedField
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.db import models


class TimestampedSerializer(ModelSerializer):
    serializer_related_field = UUIDSlugRelatedField

    serializer_field_mapping = {
        **ModelSerializer.serializer_field_mapping,
        models.CharField: SanitizedCharField,
        models.CommaSeparatedIntegerField: SanitizedCharField,
        models.TextField: SanitizedCharField,
    }

    class Meta:
        abstract = True
        fields = ("id", "created_at", "updated_at")
        extra_kwargs = {
            "created_by": {
                "default": serializers.CurrentUserDefault(),
                "read_only": True,
            }
        }
        read_only_fields = ("created_at", "updated_at")
