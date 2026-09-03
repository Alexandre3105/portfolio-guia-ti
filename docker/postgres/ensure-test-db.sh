#!/bin/sh
set -eu

database_exists="$(psql -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = 'mansk_test'")"

if [ "$database_exists" != "1" ]; then
  createdb mansk_test
fi
