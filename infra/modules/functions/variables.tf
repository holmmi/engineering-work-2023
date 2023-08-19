variable "database_config" {
  type = object({
    host     = string
    port     = string
    database = string
    user     = string
    password = string
  })
  sensitive   = true
  description = "Database connection configuration"
}

variable "oauth2_config" {
  type = object({
    client_id     = string
    client_secret = string
  })
  sensitive   = true
  description = "OAuth2 configuration"
}

variable "vpc_connector" {
  type        = string
  description = "VPC connector that is used by Functions"
}

variable "region" {
  type        = string
  description = "GCP reagion"
}