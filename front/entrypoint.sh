#!/bin/sh

echo "Injecting runtime config..."

cat <<EOF > /usr/share/nginx/html/config.js
window.__ENV__ = {
  API_URL: "${API_URL:-http://localhost:8090/api}"
};
EOF

echo "Starting Nginx..."
exec nginx -g "daemon off;"
