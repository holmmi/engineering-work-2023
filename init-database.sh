#!/usr/bin/env sh

POSTGRES_NETWORK=postgres_network
POSTGRES_NETWORK_ID=$(docker network ls --quiet --filter name=$POSTGRES_NETWORK)
[ -z "$POSTGRES_NETWORK_ID" ] && docker network create -d bridge $POSTGRES_NETWORK

sleep 2

POSTGRES_DOCKER_IMAGE=postgres:15.3
POSTGRES_IMAGE_ID=$(docker images --quiet --filter=reference='postgres:*')
[ -z "$POSTGRES_IMAGE_ID" ] && docker pull $POSTGRES_DOCKER_IMAGE

CONTAINER_NAME=postgres
CONTAINER_ID=$(docker ps -a --quiet --filter "name=$CONTAINER_NAME")
[ ! -z "$CONTAINER_ID" ] && docker stop $CONTAINER_ID && docker rm $CONTAINER_ID

PGUSER=math
PGPASSWORD=Passw0rd!
PGDATABASE=math

docker run --network $POSTGRES_NETWORK --name $CONTAINER_NAME -p 5432:5432 -e POSTGRES_USER=$PGUSER -e POSTGRES_PASSWORD=$PGPASSWORD -e POSTGRES_DB=$PGDATABASE -d $POSTGRES_DOCKER_IMAGE

sleep 5

FLYWAY_DOCKER_IMAGE=flyway/flyway
FLYWAY_IMAGE_ID=$(docker images --quiet --filter=reference='flyway/flyway:*')
[ -z "$FLYWAY_IMAGE_ID" ] && docker pull $FLYWAY_DOCKER_IMAGE
docker run --network $POSTGRES_NETWORK --rm -v $(pwd)/flyway/sql:/flyway/sql -v $(pwd)/flyway/conf:/flyway/conf $FLYWAY_DOCKER_IMAGE migrate

echo 'Done!'