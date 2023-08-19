# Backends
resource "google_compute_region_backend_service" "cloud_run_backend" {
  name        = "cloud-run-backend-service"
  port_name   = "https"
  protocol    = "HTTPS"
  timeout_sec = 60
  backend {
    group = var.cloud_run_service_neg
  }
}

resource "google_compute_region_backend_service" "exercise_creator_backend" {
  name        = "exercise-creator-backend"
  port_name   = "https"
  protocol    = "HTTPS"
  timeout_sec = 60
  backend {
    group = var.cloud_function_negs.exercise_creator
  }
}

resource "google_compute_region_backend_service" "exercise_checker_backend" {
  name        = "exercise-checker-backend"
  port_name   = "https"
  protocol    = "HTTPS"
  timeout_sec = 60
  backend {
    group = var.cloud_function_negs.exercise_checker
  }
}

resource "google_compute_region_backend_service" "user_backend" {
  name        = "user-backend"
  port_name   = "https"
  protocol    = "HTTPS"
  timeout_sec = 60
  backend {
    group = var.cloud_function_negs.user
  }
}

resource "google_compute_region_backend_service" "token_creator_backend" {
  name        = "token-creator-backend"
  port_name   = "https"
  protocol    = "HTTPS"
  timeout_sec = 60
  backend {
    group = var.cloud_function_negs.token_creator
  }
}

resource "google_compute_region_backend_service" "token_refresher_backend" {
  name        = "token-refresher-backend"
  port_name   = "https"
  protocol    = "HTTPS"
  timeout_sec = 60
  backend {
    group = var.cloud_function_negs.token_refresher
  }
}
# End of backends

resource "google_compute_managed_ssl_certificate" "default" {
  name = "default-ssl-certificate"
  managed {
    domains = [var.domain]
  }
}

resource "google_compute_region_url_map" "url_map" {
  name            = "url-map"
  default_service = google_compute_region_backend_service.cloud_run_backend.id

  host_rule {
    hosts        = ["*"]
    path_matcher = "allpaths"
  }

  path_matcher {
    name            = "allpaths"
    default_service = google_compute_region_backend_service.cloud_run_backend.self_link

    path_rule {
      paths   = ["/api/create-exercise"]
      service = google_compute_region_backend_service.exercise_creator_backend.id
    }

    path_rule {
      paths   = ["/api/check-exercise"]
      service = google_compute_region_backend_service.exercise_checker_backend.id
    }

    path_rule {
      paths   = ["/api/user"]
      service = google_compute_region_backend_service.user_backend.id
    }

    path_rule {
      paths   = ["/api/token"]
      service = google_compute_region_backend_service.token_creator_backend.id
    }

    path_rule {
      paths   = ["/api/refresh"]
      service = google_compute_region_backend_service.token_refresher_backend.id
    }
  }
}

resource "google_compute_region_target_https_proxy" "https_proxy" {
  name             = "https-proxy"
  url_map          = google_compute_region_url_map.url_map.id
  ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
}

resource "google_compute_address" "lb_address" {
  name = "lb-address"
}

resource "google_compute_forwarding_rule" "service_forwarding_rule" {
  name                  = "service-forwarding-rule"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  ip_address            = google_compute_address.lb_address.id
  network               = var.vpc_network
  port_range            = 443
  network_tier          = "PREMIUM"
  target                = google_compute_region_target_https_proxy.https_proxy.id
}

# HTTPS redirect
resource "google_compute_region_url_map" "https_url_map" {
  name            = "https-url-map"
  default_service = google_compute_region_backend_service.cloud_run_backend.self_link

  host_rule {
    hosts        = ["*"]
    path_matcher = "allpaths"
  }

  path_matcher {
    name            = "allpaths"
    default_service = google_compute_region_backend_service.cloud_run_backend.self_link
  }
}

resource "google_compute_region_target_http_proxy" "http_proxy" {
  name    = "http-proxy"
  url_map = google_compute_region_url_map.https_url_map.id
}

resource "google_compute_forwarding_rule" "http_forwarding_rule" {
  name                  = "http-forwarding-rule"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  ip_address            = google_compute_address.lb_address.id
  network               = var.vpc_network
  port_range            = 80
  network_tier          = "PREMIUM"
  target                = google_compute_region_target_http_proxy.http_proxy.id
}