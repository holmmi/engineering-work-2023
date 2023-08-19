output "exercise_creator_neg" {
  value       = google_compute_region_network_endpoint_group.exercise_creator_neg.id
  description = "Exercise creator NEG"
}

output "exercise_checker_neg" {
  value       = google_compute_region_network_endpoint_group.exercise_checker_neg.id
  description = "Exercise checker NEG"
}

output "user_neg" {
  value       = google_compute_region_network_endpoint_group.user_neg.id
  description = "User NEG"
}

output "token_creator_neg" {
  value       = google_compute_region_network_endpoint_group.token_creator_neg.id
  description = "Token creator NEG"
}

output "token_refresher_neg" {
  value       = google_compute_region_network_endpoint_group.token_refresher_neg.id
  description = "Token refresher NEG"
}