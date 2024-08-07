FROM node:20.16.0-slim

WORKDIR /app/backend

COPY package* .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "index.js"]    