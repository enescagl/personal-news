FROM python:3.12-slim

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV IS_DOCKER True

RUN apt-get update; \
  apt-get install -y --no-install-recommends wget build-essential libpq-dev postgresql-client; \
  rm -rf /var/lib/apt/lists/*;

COPY requirements.txt /tmp/

RUN pip install --no-cache-dir -r /tmp/requirements.txt; \
  rm -rf /tmp/requirements.txt; \
  adduser news_user --disabled-password

WORKDIR /app
COPY . .

RUN chown -R news_user:news_user /app
USER news_user:news_user

ENTRYPOINT [ "docker/entrypoint.sh" ]

EXPOSE 8000

CMD [ "daphne", "-b", "0.0.0.0", "-p", "8000", "core.asgi:application" ]
