output "docker_service_account_key" {
  value       = module.artifact_registry.docker_service_account_private_key
  sensitive   = true
  description = "Private key of Docker service account"
}

output "load_balancer_public_ip_address" {
  value       = module.load_balancer.load_balancer_public_ip_address
  description = "Public IP address of load balancer"
}