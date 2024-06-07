provider "aws" {
  region = var.region
}

terraform {
  required_version = "= 1.2.9"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 4.31.0"
    }
  }

  backend "s3" {
    bucket = "chrislewis-tfstate"
    key    = "whosatpaddys"
    region = "us-east-1"
  }
}

module "main" {
  source = "github.com/c-d-lewis/terraform-modules//s3-cloudfront-website?ref=master"

  region          = "us-east-1"
  project_name    = "whosatpaddys.pub"
  zone_id         = "Z0366509V094HMD6CEGE"
  domain_name     = "whosatpaddys.pub"
  alt_domain_name = "www.whosatpaddys.pub"
  certificate_arn = "arn:aws:acm:us-east-1:617929423658:certificate/72e3a39b-e701-4269-b429-af2a6a312db9"
}
