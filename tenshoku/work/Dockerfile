FROM node:lts-alpine

ENV HOME="/app"

WORKDIR ${HOME}

RUN apk update && \
  apk upgrade && \
  npm update -g &&\
  npm install -g yarn &&\
  yarn add global @vue/cli &&\
  yarn add global @nuxtjs/vuetify &&\
  yarn add global firebase &&\
  yarn add global vue-croppa &&\
  yarn upgrade &&\
  yarn install

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["/bin/sh"]