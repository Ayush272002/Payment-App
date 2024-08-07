FROM node:20.16.0-slim

WORKDIR /app/frontend

COPY package* .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]