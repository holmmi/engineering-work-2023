resource "google_compute_network" "vpc_network" {
  name = "vpc-network"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "primary_subnet" {
  name = "primary-subnet"
  ip_cidr_range = "10.0.0.0/24"
  network = google_compute_network.vpc_network.id
}

resource "google_vpc_access_connector" "vpc_connector" {
  name = "vpc-connector"
  subnet {
    name = google_compute_subnetwork.primary_subnet.name
  }
}

resource "google_compute_global_address" "private_address" {
  name = "private-address"
  ip_version = "IPV4"
  prefix_length = 24
  address_type = "INTERNAL"
  purpose = "VPC_PEERING"
  network = google_compute_network.vpc_network.id
}