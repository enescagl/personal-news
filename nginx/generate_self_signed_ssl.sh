#!/usr/bin/env sh

set -o errexit
set -o pipefail
set -o nounset

CERT_NAME="Raptiye"
COUNTRY_CODE="TR"
LOCATION="Ankara"
DOMAIN_NAME="www.raptiye-dev.com"

openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -out "${CERT_NAME}.crt" \
            -keyout "${CERT_NAME}.key" \
            -subj "/C=${COUNTRY_CODE}/ST=${LOCATION}/L=${LOCATION}/O=${CERT_NAME}/OU=Software Development Department/CN=${DOMAIN_NAME}"
