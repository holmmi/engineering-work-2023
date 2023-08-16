output "docker_repository_name" {
  value = google_artifact_registry_repository.docker_repository.name
  description = "Docker repository name"
}

output "docker_service_account_private_key" {
  value = google_service_account_key.docker_service_account_key.private_key
  sensitive = true
  description = "Docker service account private key"
}

output "docker_service_account_email" {
  value = google_service_account.docker_service_accout.email
  description = "Docker service account's email"
}