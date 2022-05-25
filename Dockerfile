FROM node:lts-alpine AS client

WORKDIR /app

COPY ./client /app

RUN npm install --production && \
    npm run build


FROM node:lts-alpine 

WORKDIR /app

COPY . /app
RUN rm -rf /app/client && \
    npm install --production 

COPY --from=client /app/build /app/public


CMD ["npm", "start"]
