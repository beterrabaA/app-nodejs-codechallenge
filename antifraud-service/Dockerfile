FROM node:22.13-slim

WORKDIR /app

COPY package.json /app

RUN npm install

RUN npm run build

COPY . /app

CMD [ "npm",'start' ]