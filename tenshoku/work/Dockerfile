FROM node:lts-alpine

ENV HOME="/app"

WORKDIR ${HOME}

RUN apk update && \
  apk upgrade && \
  npm update -g &&\
  apk add git && \
  apk add --no-cache curl && \
  curl -o- -L https://yarnpkg.com/install.sh | sh

ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH

# ホットリロード
ENV CHOKIDAR_USEPOLLING=true

RUN yarn add global yarn &&\
  yarn install &&\
  yarn add global mysql &&\
  yarn upgrade

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["/bin/sh"]