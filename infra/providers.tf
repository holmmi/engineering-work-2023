terraform {
  required_providers {
    google = {
      version = "4.78.0"
    }
  }
  # Backend configuration is given during initilization, see https://developer.hashicorp.com/terraform/language/settings/backends/configuration
  backend "gcs" {}
}

provider "google" {
  region      = var.gcp_project.region
  zone        = var.gcp_project.zone
  credentials = "service_account.json"
}