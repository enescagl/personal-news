import os
import random
import shutil
from pathlib import Path
from typing import Type

import requests
from core import settings
from django.core.management.base import BaseCommand
from django.db import models, transaction
from news.models import Article, ImageContent


class Command(BaseCommand):
    help = 'Adds 10 dummy news to database.'

    def add_arguments(self, parser):
        parser.add_argument('--icount', type=int, help='Number of images to download', default=10)
        parser.add_argument('--acount', type=int, help='Number of articles to create', default=10)

    def _random_pick_from_model(self, model: Type[models.Model]):
        pks = model.objects.values_list('pk', flat=True)
        random_pk = random.choice(pks)
        return model.objects.get(pk=random_pk)

    def _download_new_images(self, count: int):

        cover_image_dir = Path(settings.BASE_DIR) / 'media' / 'img' / 'cover_images'
        if not (cover_image_dir.exists() and cover_image_dir.is_dir()):
            self.stdout.write(
                self.style.WARNING('[WARN]: Given directory doesn\'t exist.'))
            self.stdout.write(
                self.style.SUCCESS('[SUCCESS]: Creating %s.' % cover_image_dir))

            cover_image_dir.mkdir(parents=True)

        all_images = ImageContent.objects.all()
        if os.listdir(cover_image_dir) or all_images.count() > 0:
            self.stdout.write(self.style.WARNING('[WARN]: Directory is not empty.'))
            self.stdout.write(self.style.ERROR('[ERROR]: Deleting from both database and %s.' % cover_image_dir))
            all_deleted, _ = all_images.delete()
            shutil.rmtree(cover_image_dir)
            cover_image_dir.mkdir()

        self.stdout.write(self.style.SUCCESS('[SUCCESS]: Downloading %s images.' % count))
        for index in range(count):
            with open(cover_image_dir / f'{index}.jpg', 'wb') as f:
                r = requests.get('https://placeimg.com/640/480/arch', allow_redirects=True)
                f.write(r.content)

    def handle(self, *args, **options):
        image_count = options.get('icount')
        article_count = options.get('acount')
        self.stdout.write(
            self.style.SUCCESS(
                '[SUCCESS]: Will download %s image and create %s article.' % (image_count, article_count)
            )
        )
        self._download_new_images(image_count)

        with transaction.atomic():
            list_of_images = [
                ImageContent(
                    image=f'img/cover_images/{index}.jpg',
                    slug=requests.get('https://loripsum.net/api/1/short/plaintext').text[:25].strip(),
                    name=requests.get('https://loripsum.net/api/1/short/plaintext').text[:25].strip()
                ) for index in range(image_count)
            ]
            self.stdout.write(self.style.SUCCESS('[SUCCESS]: Creating images.'))
            ImageContent.objects.bulk_create(list_of_images)

            list_of_news = [
                Article(
                    heading=f'{index} - {requests.get("https://loripsum.net/api/1/short/plaintext").text[-50:]}',
                    body=requests.get(f'https://loripsum.net/api/{random.randint(3, 10)}/plaintext').text,
                    short_description=requests.get('https://loripsum.net/api/1/short/plaintext').text[:250],
                    cover_image=self._random_pick_from_model(ImageContent),
                ) for index in range(article_count)
            ]
            self.stdout.write(self.style.SUCCESS('[SUCCESS]: Creating articles.'))
            Article.objects.bulk_create(list_of_news)
