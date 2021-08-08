from django.core.management.base import BaseCommand, CommandError
from news.models import News
import random
import requests


class Command(BaseCommand):
    help = 'Adds 100 dummy news to database.'

    # def add_arguments(self, parser):
    # url = 'http://placeimg.com/640/480/arch'
    # for index in range(100):
    #     with open(f"static/img/cover_images/{index}.jpg", 'wb') as f:
    #         r = requests.get(url, allow_redirects=True)
    #         f.write(r.content)

    def handle(self, *args, **options):
        random_length = random.randint(3, 10)

        list_of_news = [
            News(
                heading=f"{index} - News About Something",
                body=requests.get(
                    f"https://loripsum.net/api/{random_length}/plaintext").
                text,
                short_description=requests.get(
                    "https://loripsum.net/api/1/short/plaintext").text,
                cover_image=
                f"http://localhost:8000/static/img/cover_images/{index}.jpg",
            ) for index in range(100)
        ]
        new_news = News.objects.bulk_create(list(list_of_news))
