#!/bin/bash

set -euo pipefail
echo "Waiting for Postgres..."

while ! pg_isready -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -d ${POSTGRES_DB} -u ${POSTGRES_USER} > /dev/null 2> /dev/null; do
  echo "Connecting to ${POSTGRES_HOST} Failed"
  sleep 1
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
