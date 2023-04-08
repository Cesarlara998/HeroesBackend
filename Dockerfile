FROM node:18-alpine3.17
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
RUN npm run build
CMD [ "node", "dist/app.js" ]
