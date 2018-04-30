#!/usr/bin/env bash

set -e

cat >/etc/nginx/sites-enabled/default <<EOL
server {
    listen 8080;

    location / {
        proxy_pass              http://localhost:3000;
        proxy_buffering         on;
    }
}
EOL

nginx

exec node --harmony --use-strict /app/src/backend/index.js
