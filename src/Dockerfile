FROM node:14
WORKDIR /usr/src/app
COPY ./root/private.key ./cert/
COPY ./root/certificate.crt ./cert/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 1000
CMD ["node", "server.js"]