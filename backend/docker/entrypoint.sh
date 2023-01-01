#!/bin/bash

set -euo pipefail
echo "Waiting for Postgres..."

while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  sleep 0.1
done

echo "Postgres started"

#python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py creategroups
python manage.py createcustomusers

if [[ "${GENERATE_DUMMY}" == "True" ]]; then
  python manage.py createdummydata
fi

exec "$@"
