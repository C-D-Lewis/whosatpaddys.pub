#!/usr/bin/env bash

set -eu

SITE_URL=whosatpaddys.pub
COMMIT=$(git rev-parse --short HEAD)

echo "Checking deployment"
RES=""
while [[ ! "$RES" =~ "$COMMIT" ]]; do
  sleep 5
  URL="https://$SITE_URL?t=$(date +%s)"
  echo $URL
  RES=$(curl -s $URL)
done
echo "Commit $COMMIT found in live site"
