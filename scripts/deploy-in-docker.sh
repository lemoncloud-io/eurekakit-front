#!/bin/bash

echo "Deploying to $AWS_DEPLOY_TARGET environment"
echo "Bucket: $AWS_BUCKET_NAME"
echo "Distribution: $AWS_DISTRIBUTION_ID"

if [ -z "$AWS_DEPLOY_TARGET" ]; then
    echo 'ERROR: AWS_DEPLOY_TARGET environment variable not set in container'
    exit 1
fi

echo "Starting deployment to $AWS_DEPLOY_TARGET"
echo "Syncing to S3: s3://$AWS_BUCKET_NAME/$AWS_DEPLOY_TARGET"

aws s3 sync dist/apps/${APP_NAME} s3://${AWS_BUCKET_NAME}/${AWS_DEPLOY_TARGET} \
    --metadata-directive REPLACE \
    --acl public-read \
    --exclude "index.html" \
    --exclude "*.css" \
    --exclude "*.js" || { echo 'ERROR: s3 sync failed' ; exit 1; }

# CSS/JS
aws s3 sync dist/apps/${APP_NAME} s3://${AWS_BUCKET_NAME}/${AWS_DEPLOY_TARGET} \
    --metadata-directive REPLACE \
    --acl public-read \
    --exclude "*" \
    --include "*.css" \
    --include "*.js" \
    --exclude 'assets/*' || { echo 'ERROR: s3 js/css sync failed' ; exit 1; }

# assets
aws s3 sync dist/apps/${APP_NAME} s3://${AWS_BUCKET_NAME}/${AWS_DEPLOY_TARGET} \
    --metadata-directive REPLACE \
    --acl public-read \
    --exclude "*" \
    --include "assets/*" || { echo 'ERROR: s3 assets sync failed' ; exit 1; }

# index.html
aws s3 cp dist/apps/${APP_NAME}/index.html s3://${AWS_BUCKET_NAME}/${AWS_DEPLOY_TARGET}/index.html \
    --metadata-directive REPLACE \
    --cache-control max-age=0,no-cache,no-store,must-revalidate \
    --content-type text/html \
    --acl public-read || { echo 'ERROR: s3 cp index failed' ; exit 1; }

# CloudFront
echo "Invalidating CloudFront distribution: $AWS_DISTRIBUTION_ID"
aws cloudfront create-invalidation --distribution-id ${AWS_DISTRIBUTION_ID} --paths '/*'

echo "Deployment to $AWS_DEPLOY_TARGET completed successfully"
