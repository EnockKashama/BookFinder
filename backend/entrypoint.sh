#!/bin/sh
set -e

echo "Running database migrations..."
npx knex migrate:latest --knexfile src/db/knexfiles.js

echo "Statring BookFinder API..."
exec node src/server.js
