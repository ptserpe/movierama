#build stage

FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#production

FROM nginx:1.19.1-alpine

COPY --from=build-stage /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

CMD [ "nginx", "-g", "daemon off;" ]