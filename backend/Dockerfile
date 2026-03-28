FROM node:18

WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . .


RUN chmod 644 firebase-key.json

EXPOSE 3000

CMD ["node", "index.js"]
