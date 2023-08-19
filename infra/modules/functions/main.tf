resource "random_id" "bucket_id" {
  byte_length = 4
}

resource "google_storage_bucket" "functions_bucket" {
  name                     = "functions-bucket-${random_id.bucket_id.id}"
  location                 = "EUROPE-NORTH1"
  force_destroy            = true
  public_access_prevention = "enforced"
}

data "archive_file" "functions" {
  output_path      = "./"
  output_file_mode = "0666"
  type             = "zip"
  source_dir       = "../../../functions/exercise-functions"
}

resource "google_storage_bucket_object" "functions_object" {
  bucket         = google_storage_bucket.functions_bucket.name
  name           = "functions/exercise-functions.zip"
  source         = data.archive_file.functions.source_file
  detect_md5hash = data.archive_file.functions.output_md5
}

resource "random_id" "functions_id" {
  byte_length = 4
}

data "google_project" "project" {
}

resource "google_cloudfunctions2_function" "exercise_creator" {
  name = "exercise-creator-${random_id.functions_id.id}"

  build_config {
    runtime     = "nodejs20"
    entry_point = "create-exercise"
    source {
      storage_source {
        bucket = google_storage_bucket.functions_bucket.name
        object = google_storage_bucket_object.functions_object.name
      }
    }
  }

  service_config {
    environment_variables = {
      PGHOST        = var.database_config.host
      PGPORT        = var.database_config.port
      PGUSER        = var.database_config.user
      PGDATABASE    = var.database_config.database
      CLIENT_ID     = var.oauth2_config.client_id
      CLIENT_SECRET = var.oauth2_config.client_secret
    }

    secret_environment_variables {
      project_id = data.google_project.project.number
      key        = "PGPASSWORD"
      version    = "latest"
      secret     = var.database_config.password
    }

    vpc_connector                 = var.vpc_connector
    vpc_connector_egress_settings = "PRIVATE_RANGES_ONLY"
    ingress_settings              = "ALLOW_INTERNAL_ONLY"
  }
}

resource "google_compute_region_network_endpoint_group" "exercise_creator_neg" {
  name                  = "exercise-creator-neg"
  region                = var.region
  network_endpoint_type = "SERVERLESS"
  cloud_function {
    function = google_cloudfunctions2_function.exercise_creator.name
  }
}

resource "google_cloudfunctions2_function" "exercise_checker" {
  name = "exercise-checker-${random_id.functions_id.id}"

  build_config {
    runtime     = "nodejs20"
    entry_point = "check-exercise"
    source {
      storage_source {
        bucket = google_storage_bucket.functions_bucket.name
        object = google_storage_bucket_object.functions_object.name
      }
    }
  }

  service_config {
    environment_variables = {
      PGHOST        = var.database_config.host
      PGPORT        = var.database_config.port
      PGUSER        = var.database_config.user
      PGDATABASE    = var.database_config.database
      CLIENT_ID     = var.oauth2_config.client_id
      CLIENT_SECRET = var.oauth2_config.client_secret
    }

    secret_environment_variables {
      project_id = data.google_project.project.number
      key        = "PGPASSWORD"
      version    = "latest"
      secret     = var.database_config.password
    }

    vpc_connector                 = var.vpc_connector
    vpc_connector_egress_settings = "PRIVATE_RANGES_ONLY"
    ingress_settings              = "ALLOW_INTERNAL_ONLY"
  }
}

resource "google_compute_region_network_endpoint_group" "exercise_checker_neg" {
  name                  = "exercise-checker-neg"
  region                = var.region
  network_endpoint_type = "SERVERLESS"
  cloud_function {
    function = google_cloudfunctions2_function.exercise_checker.name
  }
}

resource "google_cloudfunctions2_function" "user" {
  name = "user-funtion-${random_id.functions_id.id}"

  build_config {
    runtime     = "nodejs20"
    entry_point = "user"
    source {
      storage_source {
        bucket = google_storage_bucket.functions_bucket.name
        object = google_storage_bucket_object.functions_object.name
      }
    }
  }

  service_config {
    environment_variables = {
      PGHOST        = var.database_config.host
      PGPORT        = var.database_config.port
      PGUSER        = var.database_config.user
      PGDATABASE    = var.database_config.database
      CLIENT_ID     = var.oauth2_config.client_id
      CLIENT_SECRET = var.oauth2_config.client_secret
    }

    secret_environment_variables {
      project_id = data.google_project.project.number
      key        = "PGPASSWORD"
      version    = "latest"
      secret     = var.database_config.password
    }

    vpc_connector                 = var.vpc_connector
    vpc_connector_egress_settings = "PRIVATE_RANGES_ONLY"
    ingress_settings              = "ALLOW_INTERNAL_ONLY"
  }
}

resource "google_compute_region_network_endpoint_group" "user_neg" {
  name                  = "user-neg"
  region                = var.region
  network_endpoint_type = "SERVERLESS"
  cloud_function {
    function = google_cloudfunctions2_function.user.name
  }
}

resource "google_cloudfunctions2_function" "token_creator" {
  name = "token-creator-funtion-${random_id.functions_id.id}"

  build_config {
    runtime     = "nodejs20"
    entry_point = "token"
    source {
      storage_source {
        bucket = google_storage_bucket.functions_bucket.name
        object = google_storage_bucket_object.functions_object.name
      }
    }
  }

  service_config {
    environment_variables = {
      PGHOST        = var.database_config.host
      PGPORT        = var.database_config.port
      PGUSER        = var.database_config.user
      PGDATABASE    = var.database_config.database
      CLIENT_ID     = var.oauth2_config.client_id
      CLIENT_SECRET = var.oauth2_config.client_secret
    }

    secret_environment_variables {
      project_id = data.google_project.project.number
      key        = "PGPASSWORD"
      version    = "latest"
      secret     = var.database_config.password
    }

    vpc_connector                 = var.vpc_connector
    vpc_connector_egress_settings = "PRIVATE_RANGES_ONLY"
    ingress_settings              = "ALLOW_INTERNAL_ONLY"
  }
}

resource "google_compute_region_network_endpoint_group" "token_creator_neg" {
  name                  = "token-creator-neg"
  region                = var.region
  network_endpoint_type = "SERVERLESS"
  cloud_function {
    function = google_cloudfunctions2_function.token_creator.name
  }
}

resource "google_cloudfunctions2_function" "token_refresher" {
  name = "token-refresher-funtion-${random_id.functions_id.id}"

  build_config {
    runtime     = "nodejs20"
    entry_point = "refresh"
    source {
      storage_source {
        bucket = google_storage_bucket.functions_bucket.name
        object = google_storage_bucket_object.functions_object.name
      }
    }
  }

  service_config {
    environment_variables = {
      PGHOST        = var.database_config.host
      PGPORT        = var.database_config.port
      PGUSER        = var.database_config.user
      PGDATABASE    = var.database_config.database
      CLIENT_ID     = var.oauth2_config.client_id
      CLIENT_SECRET = var.oauth2_config.client_secret
    }

    secret_environment_variables {
      project_id = data.google_project.project.number
      key        = "PGPASSWORD"
      version    = "latest"
      secret     = var.database_config.password
    }

    vpc_connector                 = var.vpc_connector
    vpc_connector_egress_settings = "PRIVATE_RANGES_ONLY"
    ingress_settings              = "ALLOW_INTERNAL_ONLY"
  }
}

resource "google_compute_region_network_endpoint_group" "token_refresher_neg" {
  name                  = "token-refresher-neg"
  region                = var.region
  network_endpoint_type = "SERVERLESS"
  cloud_function {
    function = google_cloudfunctions2_function.token_refresher.name
  }
}