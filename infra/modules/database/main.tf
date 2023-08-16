resource "random_id" "database_instance_id" {
  byte_length = 4
}

resource "google_sql_database_instance" "database_instance" {
  name = "database-instance-${random_id.database_instance_id.result}"
  database_version = "POSTGRES_15"

  settings {
    tier = "db-f1-micro"

    ip_configuration {
      require_ssl = true
      private_network = var.vpc_network_id
    }

    maintenance_window {
      day = 7
      hour = 3
      update_track = "stable"
    }

    backup_configuration {
      enabled = true
      start_time = "04:00"
      point_in_time_recovery_enabled = true
      transaction_log_retention_days = 7
    }
  }

  deletion_protection = false
}

resource "google_sql_database" "database" {
  name = "math"
  instance = google_sql_database_instance.database_instance.name
}

resource "random_password" "application_user_password" {
  length = 16
}

resource "google_sql_user" "application_user" {
  name = "application"
  instance = google_sql_database_instance.database_instance.name
  password = random_password.application_user_password.result
  type = "BUILT_IN"
}

resource "google_secret_manager_secret" "database_root_password" {
  secret_id = "database-root-password"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "root_password" {
  secret = google_secret_manager_secret.database_root_password.id
  secret_data = google_sql_database_instance.database_instance.root_password
}

resource "google_secret_manager_secret" "database_application_password" {
  secret_id = "database-application-password"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "database_application_password" {
  secret = google_secret_manager_secret.database_application_password.id
  secret_data = random_password.application_user_password.result
}