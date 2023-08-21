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
  credentials = "service_account.json"
  project     = var.gcp_project.project
  region      = var.gcp_project.region
}