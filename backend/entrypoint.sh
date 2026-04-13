#!/bin/sh
set -e

echo "Running database migrations..."
node_modules/.bin/knex migrate:latest --knexfile src/db/knexfile.js

echo "Starting BookFinder API..."
exec node src/server.js