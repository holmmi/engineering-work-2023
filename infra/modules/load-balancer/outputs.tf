output "load_balancer_public_ip_address" {
  value       = google_compute_global_address.lb_address.address
  description = "Public IP address of load balancer"
}