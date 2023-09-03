#!/usr/bin/env bash

BUCKET=$1
PREFIX="terraform/state"

if [ -z "$BUCKET" ]; then
    echo "Please provide a bucket name as an argument"
    exit 1
fi

terraform init \
    -backend-config="bucket=$BUCKET" \
    -backend-config="prefix=$PREFIX"