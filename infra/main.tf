resource "google_project_service" "gcp_services" {
  for_each = toset(var.gcp_service_list)
  service  = each.key
}

module "artifact_registry" {
  source = "./modules/artifact-registry"

  docker_repository_name = "docker-repository"
}

module "network" {
  source = "./modules/network"
}

module "database" {
  source = "./modules/database"

  vpc_network_id = module.network.vpc_network_id
}

module "cloud_run" {
  source = "./modules/cloud-run"

  docker_repository_path       = "${var.gcp_project.region}-docker.pkg.dev/${var.gcp_project.project}/${module.artifact_registry.docker_repository_name}"
  docker_service_account_email = module.artifact_registry.docker_service_account_email
  vpc_connector_id             = module.network.vpc_access_connector_id
  database_connection_details = {
    password = module.database.database_password
    user     = module.database.database_user
    url      = "jdbc:postgresql://${module.database.database_host}:5432/${module.database.database_name}"
  }
  region = var.gcp_project.region
}

module "functions" {
  source = "./modules/functions"

  database_config = {
    host     = module.database.database_host
    port     = "5432"
    database = module.database.database_name
    user     = module.database.database_user
    password = module.database.database_password_secret_manager_id
  }
  oauth2_config = {
    client_id     = var.oauth2_config.client_id
    client_secret = var.oauth2_config.client_secret
  }
  vpc_connector = module.network.vpc_access_connector_id
  region        = var.gcp_project.region
}

module "load_balancer" {
  source = "./modules/load-balancer"

  domain = var.domain
  cloud_function_negs = {
    exercise_checker = module.functions.exercise_checker_neg
    exercise_creator = module.functions.exercise_creator_neg
    user             = module.functions.user_neg
    token_creator    = module.functions.token_creator_neg
    token_refresher  = module.functions.token_refresher_neg
  }
  cloud_run_service_neg = module.cloud_run.network_endpoint_group
}