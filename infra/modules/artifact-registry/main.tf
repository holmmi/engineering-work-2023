resource "google_artifact_registry_repository" "docker_repository" {
  repository_id = "docker-repository"
  format        = "DOCKER"
}

resource "google_service_account" "docker_service_accout" {
  account_id   = "docker-service-account"
  display_name = "Docker Service Account"
}

resource "google_service_account_key" "docker_service_account_key" {
  service_account_id = google_service_account.docker_service_accout.name
}

data "google_iam_policy" "artifact_registry_writer" {
  binding {
    role    = "roles/artifactregistry.writer"
    members = [google_service_account.docker_service_accout.member]
  }
}

resource "google_artifact_registry_repository_iam_policy" "policy" {
  repository  = google_artifact_registry_repository.docker_repository.name
  location    = google_artifact_registry_repository.docker_repository.location
  policy_data = data.google_iam_policy.artifact_registry_writer.policy_data
}

data "google_project" "project" {}

resource "google_project_iam_member" "secret_accessor" {
  project = data.google_project.project.id
  role    = "roles/secretmanager.secretAccessor"
  member  = google_service_account.docker_service_accout.member
}