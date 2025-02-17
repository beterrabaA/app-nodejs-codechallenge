FROM node:22.14-alpine3.21

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

ENV NODE_ENV='production'

RUN npm ci

COPY . .

CMD ["sh", "-c", "npm run build && npm start"]
