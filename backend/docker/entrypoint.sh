#!/usr/bin/env sh

#set -euo pipefail

#python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic
python manage.py creategroups
python manage.py createcustomusers

if [ -z "$GENERATE_DUMMY" ]
then
  python manage.py createdummydata
fi

exec "$@"
