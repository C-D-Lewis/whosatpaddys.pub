variable "region" {
  type        = string
  description = "AWS region"
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  description = "Project name for all resources"
  default     = "whosatpaddys.pub"
}

variable "vpc_id" {
  type        = string
  description = "VPC to deploy into"
  default     = "vpc-c3b70bb9"
}

variable "zone_id" {
  type        = string
  description = "Route53 zone ID"
  default     = "Z0366509V094HMD6CEGE"
}

variable "domain_name" {
  type        = string
  description = "Site domain name, matching client_bucket"
  default     = "whosatpaddys.pub"
}

variable "alt_domain_name" {
  type        = string
  description = "Alternate CNAME domain name, if any"
  default     = "www.whosatpaddys.pub"
}

variable "certificate_arn" {
  type        = string
  description = "Certificate ARN in ACM"
  default     = "arn:aws:acm:us-east-1:617929423658:certificate/72e3a39b-e701-4269-b429-af2a6a312db9"
}
