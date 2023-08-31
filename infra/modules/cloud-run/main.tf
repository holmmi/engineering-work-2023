resource "google_cloud_run_v2_service" "frontend_service" {
  name     = "frontend-service"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER"

  template {
    containers {
      image = "${var.docker_repository_path}/math-platform-frontend"

      ports {
        container_port = 8080
      }

      startup_probe {
        initial_delay_seconds = 0
        timeout_seconds       = 1
        period_seconds        = 10
        failure_threshold     = 3
        http_get {
          path = "/"
        }
      }

      liveness_probe {
        initial_delay_seconds = 0
        timeout_seconds       = 1
        period_seconds        = 10
        failure_threshold     = 3
        http_get {
          path = "/"
        }
      }
    }
    scaling {
      max_instance_count = 1
    }
    vpc_access {
      connector = var.vpc_connector_id
      egress    = "PRIVATE_RANGES_ONLY"
    }
    service_account = var.docker_service_account_email
  }
}

resource "google_cloud_run_v2_service_iam_member" "invoker" {
  location = google_cloud_run_v2_service.frontend_service.location
  name     = google_cloud_run_v2_service.frontend_service.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_compute_region_network_endpoint_group" "frontend_service_neg" {
  name                  = "frontend-service-neg"
  region                = var.region
  network_endpoint_type = "SERVERLESS"
  cloud_run {
    service = google_cloud_run_v2_service.frontend_service.name
  }
}

resource "google_cloud_run_v2_job" "flyway_migrations" {
  name     = "flyway-migrations"
  location = var.region

  template {
    template {
      containers {
        image = "${var.docker_repository_path}/flyway"

        env {
          name  = "FLYWAY_USER"
          value = var.database_connection_details.user
        }
        env {
          name = "FLYWAY_PASSWORD"
          value_source {
            secret_key_ref {
              secret  = var.database_connection_details.password
              version = "latest"
            }
          }
        }
        env {
          name  = "FLYWAY_URL"
          value = var.database_connection_details.url
        }
      }

      service_account = var.docker_service_account_email

      vpc_access {
        connector = var.vpc_connector_id
        egress    = "PRIVATE_RANGES_ONLY"
      }
      max_retries = 1
    }
    task_count = 1
  }

  lifecycle {
    ignore_changes = [
      launch_stage,
    ]
  }
}