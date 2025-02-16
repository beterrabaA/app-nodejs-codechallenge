FROM node:22.14-alpine3.21

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENTRYPOINT ["node", ".dist/index.js"]
