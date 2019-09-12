FROM node:10-alpine

ENV BIDU_VERSION 0.0.1

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", “run”, "start:prod"  ]