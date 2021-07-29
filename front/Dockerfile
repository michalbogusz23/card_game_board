FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN yarn install
RUN yarn add react-router-dom

COPY ./ /app

CMD ["yarn", "run", "start"]