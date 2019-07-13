FROM nginx

COPY html /usr/share/nginx/html
COPY static /usr/share/nginx/static
