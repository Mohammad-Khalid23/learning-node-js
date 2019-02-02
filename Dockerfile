FROM node:10-alpine
WORKDIR /usr/nodeapp
COPY . /usr/nodeapp
RUN npm install
CMD node server.js
EXPOSE 3000
