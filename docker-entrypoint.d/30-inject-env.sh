#!/bin/sh
set -eu

cat > /usr/share/nginx/html/env.js <<EOF
window.__APP_ENV__ = {
  APP_ENV: "${VITE_APP_ENV:-production}",
  UNLEASH_PROXY_URL: "${VITE_UNLEASH_PROXY_URL:-/unleash}"
};
EOF
