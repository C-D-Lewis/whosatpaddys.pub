#!/bin/bash

set -eu

BUCKET=s3://whosatpaddys.pub
COMMIT=$(git rev-parse --short HEAD)

# Cancelling mid-push may cause template to not be replaced
if [ ! "$(cat index.html | grep COMMIT)" ]; then
  echo "COMMIT not found in index.html"
  exit 1
fi

# Update version to fix cached script issues
sed -i.bak "s/COMMIT/$COMMIT/g" index.html

# Push
aws s3 cp index.html $BUCKET
# aws s3 cp favicon.ico $BUCKET
aws s3 sync dist $BUCKET/dist
aws s3 sync styles $BUCKET/styles
aws s3 sync assets $BUCKET/assets

# Restore
mv index.html.bak index.html

echo "Asset upload complete"
