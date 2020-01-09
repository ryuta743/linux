FROM node:lts-alpine as builder

ENV HOME="/app"

WORKDIR ${HOME}

RUN apk update && \
  apk upgrade && \
  npm install -g npm && \
  npm update -g && \
  npm cache clean --force && \
  apk add git && \
  apk add --no-cache curl && \
  curl -o- -L https://yarnpkg.com/install.sh | sh

ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH

ENV CHOKIDAR_USEPOLLING=true

RUN git clone https://github.com/RyutaTerada/HEW-2019.git && \
  cp HEW-2019/hew2020/package.json . && \
  cp HEW-2019/hew2020/yarn.lock . && \
  yarn install  && \
  cp -f -r HEW-2019/hew2020/* . && \
  yarn build

FROM node:lts-alpine

WORKDIR /app
#COPY --from=builder ./app .
COPY --from=builder ./app/package.json .
COPY --from=builder ./app/nuxt.config.js .
COPY --from=builder ./app/server ./server
COPY --from=builder ./app/node_modules ./node_modules
COPY --from=builder ./app/.nuxt ./.nuxt

# Add Tini
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]
#ENTRYPOINT ["/sbin/tini", "-e", "143", "--"]

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]