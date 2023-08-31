variable "domain" {
  type        = string
  description = "A domain name where SSL certificates will be created"
}

variable "cloud_run_service_neg" {
  type        = string
  description = "Cloud Run service NEG"
}

variable "cloud_function_negs" {
  type = object({
    exercise_creator = string
    exercise_checker = string
    user             = string
    token_creator    = string
    token_refresher  = string
  })
  description = "Cloud Function NEGs"
}