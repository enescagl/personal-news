FROM node:16-alpine as build-stage
ARG VUE_APP_BASE_URL
ENV VUE_APP_BASE_URL=${VUE_APP_BASE_URL}
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
