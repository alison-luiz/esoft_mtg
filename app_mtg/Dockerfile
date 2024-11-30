FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --legacy-peer-deps

COPY . .

RUN yarn run build

RUN cp .env.prod .env

EXPOSE 3000

CMD ["node", "dist/main"]
