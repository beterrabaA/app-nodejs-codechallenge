FROM node:22.13

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 4000

ENTRYPOINT ["node", ".dist/index.js"]