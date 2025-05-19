#!/bin/bash

# check .env.docker
if [ ! -f ".env.docker" ]; then
    echo "ERROR: .env.docker not found. Copy from .env.docker.example"
    exit 1
fi

# set env from .env.docker
export $(cat .env.docker | grep -v '^#' | xargs)

if [ -z "$AWS_DEPLOY_TARGET" ]; then
    echo "ERROR: AWS_DEPLOY_TARGET environment variable is required."
    exit 1
fi

if [ -z "$AWS_DISTRIBUTION_ID" ] || [ -z "$AWS_BUCKET_NAME" ]; then
    echo "ERROR: Missing AWS_DISTRIBUTION_ID or AWS_BUCKET_NAME"
    exit 1
fi

echo "Building for environment: $AWS_DEPLOY_TARGET"
echo "Target: s3://$AWS_BUCKET_NAME/$AWS_DEPLOY_TARGET"
echo "CloudFront Distribution: $AWS_DISTRIBUTION_ID"

# clean dist
rm -rf ./node_modules/.vite ./node_modules/.cache
rm -rf ./.nx
rm -rf ./dist/apps/web

# build docker image
docker build \
    --build-arg VITE_ENV="$VITE_ENV" \
    --build-arg VITE_PROJECT="$VITE_PROJECT" \
    --build-arg VITE_HOST="$VITE_HOST" \
    --build-arg VITE_OAUTH_ENDPOINT="$VITE_OAUTH_ENDPOINT" \
    --build-arg VITE_SOCIAL_OAUTH_ENDPOINT="$VITE_SOCIAL_OAUTH_ENDPOINT" \
    --build-arg VITE_IMAGE_API_ENDPOINT="$VITE_IMAGE_API_ENDPOINT" \
    --build-arg VITE_CONTENT_API_ENDPOINT="$VITE_CONTENT_API_ENDPOINT" \
    --build-arg VITE_KAKAO_CALLBACK_URL="$VITE_KAKAO_CALLBACK_URL" \
    -t eurekakit-web:prod \
    -f docker/web/Dockerfile .

# run deploy in docker
docker run --rm \
    -e AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
    -e AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
    -e AWS_REGION="$AWS_REGION" \
    -e AWS_BUCKET_NAME="$AWS_BUCKET_NAME" \
    -e AWS_DISTRIBUTION_ID="$AWS_DISTRIBUTION_ID" \
    -e AWS_DEPLOY_TARGET="$AWS_DEPLOY_TARGET" \
    -e APP_NAME="$APP_NAME" \
    eurekakit-web:prod \
    /app/scripts/deploy-in-docker.sh
