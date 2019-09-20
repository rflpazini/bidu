FROM node:10

ENV BIDU_VERSION 1.0.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", “run”, "start:prod" ]