# Docker Deployment Guide

This guide explains how to use Docker for building and deploying your web application to AWS S3/CloudFront within an NX monorepo.

## Usage

1. Copy the example configuration file:

```shell
cp .env.docker.example .env.docker
```

2. Edit the `.env.docker` file with your specific values:

```shell
# Application configuration
APP_NAME=web

# Required AWS credentials
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=ap-northeast-2

# Deployment configuration
AWS_BUCKET_NAME=your-bucket-name
AWS_DISTRIBUTION_ID=your-cloudfront-id
AWS_DEPLOY_TARGET=prod  # or dev, feature-xyz, etc.

# Vite environment variables
VITE_PROJECT=EUREKAKIT_WEB
VITE_ENV=PROD
VITE_HOST=https://your-uuid.eureka.codes
VITE_OAUTH_ENDPOINT=https://api.eureka.codes/v1
VITE_SOCIAL_OAUTH_ENDPOINT=https://oauth2.eureka.codes
VITE_IMAGE_API_ENDPOINT=https://image.lemoncloud.io
VITE_CONTENT_API_ENDPOINT=https://api.eureka.codes/soc-v1
VITE_KAKAO_CALLBACK_URL=https://your-uuid.eureka.codes/auth/kakao/callback
```

3. Run deploy command

```shell
chmod +x scripts/deploy-web-docker.sh
yarn web:docker:deploy
```
