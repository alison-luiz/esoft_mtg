FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --legacy-peer-deps

COPY . .

RUN cp .env.prod .env

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]
