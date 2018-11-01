FROM node:10-alpine
WORKDIR /usr/nodelearnapp
COPY . /usr/nodelearnapp
RUN npm install
CMD node server.js
EXPOSE 3000
