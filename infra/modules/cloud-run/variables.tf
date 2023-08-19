variable "docker_repository_path" {
  type        = string
  description = "Artifact Registry Docker repository path"
}

variable "docker_service_account_email" {
  type        = string
  description = "Docker service account email address"
}

variable "vpc_connector_id" {
  type        = string
  description = "VPC connector ID"
}

variable "database_connection_details" {
  type = object({
    url      = string
    user     = string
    password = string
  })
  sensitive   = true
  description = "Database connection details. Password is given as a Secret Manager ID."
}

variable "region" {
  type        = string
  description = "Current GCP project region"
}