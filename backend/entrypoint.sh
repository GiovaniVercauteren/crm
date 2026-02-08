#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

echo "Waiting for Postgres to be reachable..."
# This is a simple way to wait for the DB port to be open
until nc -z $DB_HOST $DB_PORT; do
  echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "Postgres is up - executing migrations"
npx drizzle-kit migrate

echo "Starting NestJS application"
# 'exec' makes the node process PID 1, which is better for handling Linux signals (like shutdown)
exec node dist/main.js