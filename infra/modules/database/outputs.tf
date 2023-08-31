output "database_user" {
  value       = google_sql_user.application_user.name
  description = "Application user's name"
}

output "database_password" {
  value       = google_secret_manager_secret.database_application_password.id
  sensitive   = true
  description = "Application user's password in Secret Manager"
}

output "database_password_secret_manager_id" {
  value       = google_secret_manager_secret.database_application_password.secret_id
  sensitive   = true
  description = "Application user's password Secret Manager ID"
}

output "database_host" {
  value       = google_sql_database_instance.database_instance.private_ip_address
  description = "Database host"
}

output "database_name" {
  value       = google_sql_database.database.name
  description = "Database name"
}