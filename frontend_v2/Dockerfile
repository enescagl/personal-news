FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock /app/
RUN pwd && ls && yarn

COPY . .
RUN yarn build

EXPOSE 9026

CMD [ "node", ".output/server/index.mjs" ]