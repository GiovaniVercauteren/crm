#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e



echo "Waiting for Postgres to be reachable..."
# This is a simple way to wait for the DB port to be open
# If DB_HOST/DB_PORT are not provided, try to parse them from DB_URL
if [ -z "$DB_HOST" ] || [ -z "$DB_PORT" ]; then
  if [ -n "$DB_URL" ]; then
    # Remove scheme (e.g. postgresql://)
    url_no_proto=${DB_URL#*://}
    # Drop optional userinfo (user:pass@)
    hostport_and_path=${url_no_proto#*@}
    # Extract host[:port] before first '/'
    hostport=${hostport_and_path%%/*}
    # If there is a colon, split host and port, otherwise default port 5432
    if echo "$hostport" | grep -q ']:'; then
      # IPv6 with brackets and port: [::1]:5432
      DB_HOST=$(printf '%s' "$hostport" | sed -E 's/^\[([^]]+)\]:.*$/\1/')
      DB_PORT=$(printf '%s' "$hostport" | sed -E 's/^\[[^]]+\]:(.*)$/\1/')
    else
      DB_HOST=${hostport%%:*}
      DB_PORT=${hostport#*:}
      if [ "$DB_HOST" = "$DB_PORT" ]; then
        DB_PORT=5432
      fi
    fi
    # Strip possible surrounding brackets from host (IPv6 without port)
    DB_HOST=$(printf '%s' "$DB_HOST" | sed -e 's/^\[//' -e 's/\]$//')
    export DB_HOST DB_PORT
    echo "Parsed DB_HOST=$DB_HOST DB_PORT=$DB_PORT from DB_URL"
  else
    echo "DB_HOST and/or DB_PORT not set and DB_URL is empty. Waiting will likely fail."
  fi
fi
until nc -z $DB_HOST $DB_PORT; do
  echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "Postgres is up - executing migrations"
npx drizzle-kit migrate

echo "Starting NestJS application"
# 'exec' makes the node process PID 1, which is better for handling Linux signals (like shutdown)
exec node dist/src/main.js