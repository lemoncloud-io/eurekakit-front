FROM node:20.11.1-alpine

# Install AWS CLI
RUN apk add --no-cache \
    python3 \
    py3-pip \
    bash

RUN rm /usr/lib/python*/EXTERNALLY-MANAGED && \
    python3 -m ensurepip && \
    pip3 install awscli && \
    rm -rf /var/cache/apk/*

WORKDIR /app

# Cache dependencies
COPY package.json yarn.lock nx.json tsconfig.base.json ./
COPY apps/web/package.json ./apps/web/

RUN yarn install --frozen-lockfile

# Copy code
COPY . .

# set Vite env
ARG VITE_ENV
ARG VITE_PROJECT
ARG VITE_HOST
ARG VITE_OAUTH_ENDPOINT
ARG VITE_SOCIAL_OAUTH_ENDPOINT
ARG VITE_IMAGE_API_ENDPOINT
ARG VITE_PET_API_ENDPOINT
ARG VITE_KAKAO_CALLBACK_URL

# .env 파일 생성
RUN echo "VITE_ENV=$VITE_ENV" > apps/web/.env.prod \
    && echo "VITE_PROJECT=$VITE_PROJECT" >> apps/web/.env.prod \
    && echo "VITE_HOST=$VITE_HOST" >> apps/web/.env.prod \
    && echo "VITE_OAUTH_ENDPOINT=$VITE_OAUTH_ENDPOINT" >> apps/web/.env.prod \
    && echo "VITE_SOCIAL_OAUTH_ENDPOINT=$VITE_SOCIAL_OAUTH_ENDPOINT" >> apps/web/.env.prod \
    && echo "VITE_IMAGE_API_ENDPOINT=$VITE_IMAGE_API_ENDPOINT" >> apps/web/.env.prod \
    && echo "VITE_PET_API_ENDPOINT=$VITE_PET_API_ENDPOINT" >> apps/web/.env.prod \
    && echo "VITE_KAKAO_CALLBACK_URL=$VITE_KAKAO_CALLBACK_URL" >> apps/web/.env.prod

# nx 빌드 명령어 실행 (env 파일 교체 후)
RUN cp apps/web/.env.prod apps/web/.env.prod.temp \
    && yarn web:build:prod

# 배포 스크립트 권한 설정
RUN chmod +x scripts/deploy-in-docker.sh

CMD ["/bin/bash"]
