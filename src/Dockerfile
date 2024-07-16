FROM node:14
WORKDIR /usr/src/app
COPY private.key ./cert/
COPY certificate.crt ./cert/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 1000
CMD ["node", "server.js"]