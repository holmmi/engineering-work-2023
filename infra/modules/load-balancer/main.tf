# Backends
resource "google_compute_backend_service" "frontend_backend" {
  name = "frontend-backend-service"
  backend {
    group = var.cloud_run_service_neg
  }
}

resource "google_compute_backend_service" "exercise_creator_backend" {
  name = "exercise-creator-backend"
  backend {
    group = var.cloud_function_negs.exercise_creator
  }
}

resource "google_compute_backend_service" "exercise_checker_backend" {
  name = "exercise-checker-backend"
  backend {
    group = var.cloud_function_negs.exercise_checker
  }
}

resource "google_compute_backend_service" "user_backend" {
  name = "user-backend"
  backend {
    group = var.cloud_function_negs.user
  }
}

resource "google_compute_backend_service" "token_creator_backend" {
  name = "token-creator-backend"
  backend {
    group = var.cloud_function_negs.token_creator
  }
}

resource "google_compute_backend_service" "token_refresher_backend" {
  name = "token-refresher-backend"
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

resource "google_compute_url_map" "url_map" {
  name            = "url-map"
  default_service = google_compute_backend_service.frontend_backend.id

  host_rule {
    hosts        = ["*"]
    path_matcher = "allpaths"
  }

  path_matcher {
    name            = "allpaths"
    default_service = google_compute_backend_service.frontend_backend.self_link

    path_rule {
      paths   = ["/api/create-exercise"]
      service = google_compute_backend_service.exercise_creator_backend.id
    }

    path_rule {
      paths   = ["/api/check-exercise"]
      service = google_compute_backend_service.exercise_checker_backend.id
    }

    path_rule {
      paths   = ["/api/user"]
      service = google_compute_backend_service.user_backend.id
    }

    path_rule {
      paths   = ["/api/token"]
      service = google_compute_backend_service.token_creator_backend.id
    }

    path_rule {
      paths   = ["/api/refresh"]
      service = google_compute_backend_service.token_refresher_backend.id
    }
  }
}

resource "google_compute_target_https_proxy" "https_proxy" {
  name             = "https-proxy"
  url_map          = google_compute_url_map.url_map.id
  ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
}

resource "google_compute_global_address" "lb_address" {
  name = "lb-address"
}

resource "google_compute_global_forwarding_rule" "https_forwarding_rule" {
  name                  = "lb-https"
  load_balancing_scheme = "EXTERNAL"
  ip_address            = google_compute_global_address.lb_address.id
  port_range            = "443"
  target                = google_compute_target_https_proxy.https_proxy.id
}

# HTTPS redirect
resource "google_compute_url_map" "https_redirect" {
  name = "https-redirect"

  default_url_redirect {
    https_redirect         = true
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
    strip_query            = false
  }
}

resource "google_compute_target_http_proxy" "http_proxy" {
  name    = "http-proxy"
  url_map = google_compute_url_map.https_redirect.id
}

resource "google_compute_global_forwarding_rule" "http_forwarding_rule" {
  name                  = "lb-http"
  load_balancing_scheme = "EXTERNAL"
  ip_address            = google_compute_global_address.lb_address.id
  port_range            = "80"
  target                = google_compute_target_http_proxy.http_proxy.id
}