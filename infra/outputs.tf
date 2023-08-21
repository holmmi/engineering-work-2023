output "docker_service_account_key" {
  value     = module.artifact_registry.docker_service_account_private_key
  sensitive = true
}