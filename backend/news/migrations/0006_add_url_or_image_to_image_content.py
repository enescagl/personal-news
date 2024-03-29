# Generated by Django 3.2.12 on 2022-12-11 13:28

import base.validators
from django.db import migrations, models
import news.models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0005_alter_article_and_image_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='imagecontent',
            name='url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='imagecontent',
            name='image',
            field=models.ImageField(blank=True, upload_to=news.models.image_directory_path, validators=[base.validators.validate_image_extension]),
        ),
    ]
