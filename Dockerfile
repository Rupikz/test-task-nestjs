FROM node:15-alpine as test_task
RUN npm install -g pnpm reflect-metadata

RUN mkdir /monolit

WORKDIR /mono
COPY ./pnpm-lock.lock ./nest-cli.json ./package.json ./pnpm-workspace.yaml ./

RUN pnpm i -s

COPY ./ /monolit

RUN pnpm i -s
