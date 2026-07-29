FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["sh", "-c", "npm install && exec node_modules/.bin/vite --host 0.0.0.0"]
