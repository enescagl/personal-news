#!/usr/bin/env sh

#set -euo pipefail
echo "Waiting for postgres..."

while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  sleep 0.1
done

echo "PostgreSQL started"

#python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py creategroups
python manage.py createcustomusers

if [ -z "$GENERATE_DUMMY" ]; then
  python manage.py createdummydata
fi

exec "$@"
