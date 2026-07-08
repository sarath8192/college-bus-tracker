#!/bin/bash

set -e

echo "Updating server..."
apt-get update -y

echo "Installing Docker..."
apt-get install -y docker.io

echo "Starting Docker..."
systemctl start docker
systemctl enable docker

echo "Pulling backend image..."
docker pull ${backend_image}

echo "Pulling frontend image..."
docker pull ${frontend_image}

echo "Stopping old containers if any..."
docker rm -f college-bus-backend || true
docker rm -f college-bus-frontend || true

echo "Running backend container..."
docker run -d \
  --name college-bus-backend \
  --restart always \
  -p 5000:5000 \
  ${backend_image}

echo "Running frontend container..."
docker run -d \
  --name college-bus-frontend \
  --restart always \
  -p 80:80 \
  ${frontend_image}

echo "Deployment completed."