FROM node:20-alpine

WORKDIR /usr/src/consumer

COPY package*.json ./

RUN yarn install --legacy-peer-deps

COPY . .

RUN yarn run build

RUN cp .env.prod .env

CMD ["node", "dist/main"]
