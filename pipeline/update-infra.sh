#!/bin/bash

set -eu

# Run terraform
cd terraform
terraform init
terraform apply -auto-approve
