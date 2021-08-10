from django.core.management.base import BaseCommand, CommandError
from news.models import News
import random
import requests
import os
from pathlib import Path


class Command(BaseCommand):
    help = 'Adds 100 dummy news to database.'

    def handle(self, *args, **options):

        dir_name = str(Path(__file__).parent.parent.parent.parent
                       ) + '\\media\\img\\cover_images\\'
        if os.path.exists(dir_name) and os.path.isdir(dir_name):
            if not os.listdir(dir_name):
                url = 'http://placeimg.com/640/480/arch'
                for index in range(100):
                    with open(f'media/img/cover_images/{index}.jpg',
                              'wb') as f:
                        r = requests.get(url, allow_redirects=True)
                        f.write(r.content)
            else:
                print('Directory is not empty')
        else:
            print('Given directory doesn\'t exist')

        random_length = random.randint(3, 10)

        list_of_news = [
            News(
                heading=f'{index} - News About Something',
                body=requests.get(
                    f'https://loripsum.net/api/{random_length}/plaintext').
                text,
                short_description=requests.get(
                    'https://loripsum.net/api/1/short/plaintext').text[:250],
                cover_image=f'img/cover_images/{index}.jpg',
            ) for index in range(100)
        ]
        News.objects.bulk_create(list(list_of_news))
