FROM node:15-alpine as test_task
RUN npm install -g pnpm reflect-metadata

RUN mkdir /monolit

WORKDIR /monolit
COPY ./pnpm-lock.yaml ./nest-cli.json ./package.json ./pnpm-workspace.yaml ./
ADD .example.env .env

RUN pnpm i -s

COPY ./ /monolit

RUN pnpm i -s
RUN pnpm build
CMD [ "node","./dist/src/main.js" ]
