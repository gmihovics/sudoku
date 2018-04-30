FROM node:6.14.1-stretch

ENV PORT=3000

EXPOSE 8080

RUN apt-get update && apt-get install -y \
    nginx \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package.json

RUN npm install --only=production

COPY src/backend src/backend

COPY public public

COPY .scripts/entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
