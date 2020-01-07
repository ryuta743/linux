FROM node:lts-alpine

WORKDIR /usr/src/app

# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにします。
# 可能であれば (npm@5+)
#COPY src/package*.json ./
COPY ./app .

RUN npm install

EXPOSE 5000
CMD [ "node", "./bin/www"]
