FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build:frontend

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage ./app/dist/apps/frontend /app
COPY docker/nginx.conf /etc/nginx/nginx.conf
