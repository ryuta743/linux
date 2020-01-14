FROM node:lts-alpine as builder

WORKDIR /app

COPY ./app .

RUN apk update && \
  apk upgrade && \
  npm install -g npm && \
  npm update -g && \
  npm cache clean --force

RUN yarn install && \
  yarn cache clean
RUN yarn build

FROM node:lts-alpine as runner

WORKDIR /app

COPY --from=builder ./app/package.json .
COPY --from=builder ./app/nuxt.config.js .
COPY --from=builder ./app/server ./server
COPY --from=builder ./app/node_modules ./node_modules
COPY --from=builder ./app/.nuxt ./.nuxt

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "npm", "start"]