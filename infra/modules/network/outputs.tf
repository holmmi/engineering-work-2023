output "vpc_network_id" {
  value       = google_compute_network.vpc_network.id
  description = "VPC network"
}

output "vpc_access_connector_id" {
  value       = google_vpc_access_connector.vpc_connector.id
  description = "Cloud Run VPC access connector ID"
}