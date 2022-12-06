FROM node:19.2-alpine

WORKDIR usr/src

COPY package*.json ./

COPY . .

RUN  npm i

EXPOSE 1234

CMD ["node","index.js"]