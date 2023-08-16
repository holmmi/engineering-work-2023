terraform {
  required_providers {
    google = {
        version = "4.74.0"
    }
  }
  # Backend configuration is given during initilization, see https://developer.hashicorp.com/terraform/language/settings/backends/configuration
  backend "gcs" {}
}

provider "google" {
    # Project ID and service account credentials are given as environment variables
    region = var.gcp_project.region
    zone = var.gcp_project.zone
}