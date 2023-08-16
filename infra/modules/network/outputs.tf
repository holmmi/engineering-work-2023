output "vpc_network_id" {
  value = google_compute_network.vpc_network.id
  description = "VPC network"
}

output "cloud_run_vpc_access_connector_id" {
  value = google_vpc_access_connector.cloud_run_vpc_connector.id
  description = "Cloud Run VPC access connector ID"
}