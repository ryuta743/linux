FROM node:lts-alpine

ENV HOME="/app"

WORKDIR ${HOME}

RUN apk update && \
  apk upgrade && \
  npm update -g &&\
  npm install -g yarn &&\
  yarn install &&\
  yarn add global mysql &&\
  yarn upgrade

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["/bin/sh"]