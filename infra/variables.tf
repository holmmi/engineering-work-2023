variable "gcp_project" {
  type = object({
    project = string
    region  = string
  })
  description = "GCP project details"
}

variable "oauth2_config" {
  type = object({
    client_id     = string
    client_secret = string
  })
  sensitive   = true
  description = "OAuth2 configuration"
}

variable "domain" {
  type        = string
  description = "A domain where SSL certificate will be issued"
}

variable "gcp_service_list" {
  description = "List of APIs necessary for the project"
  type        = list(string)
  default = [
    "cloudresourcemanager.googleapis.com",
    "artifactregistry.googleapis.com",
    "iam.googleapis.com",
    "secretmanager.googleapis.com",
    "compute.googleapis.com",
    "vpcaccess.googleapis.com",
    "servicenetworking.googleapis.com",
    "sqladmin.googleapis.com",
    "run.googleapis.com",
    "cloudfunctions.googleapis.com",
    "cloudbuild.googleapis.com"
  ]
}