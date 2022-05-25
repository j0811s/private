#!/bin/bash
cd `dirname $0`

env_str="
# ポート番号
NGINX_HOST=8008
NGINX_SSL=443
PHPMYADMIN_HOST=8888
SMTP_CONFIRM=1080
SMTP_PORT=1025
"

if [ -e ".env" ] ; then
    echo "'.env' already exists"
else
    touch .env
    echo "$env_str" >> .env
fi


if [ -e "resources/cert" ] ; then
    echo "'resources/cert' already exists"
else
    mkdir resources/cert
    cd resources/cert
    # brew install mkcert
    mkcert -install
    mkcert localhost 127.0.0.1
fi