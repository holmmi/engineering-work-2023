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