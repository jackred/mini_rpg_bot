FROM node:latest
WORKDIR /usr/src/mini_rpg_bot
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
RUN apt update
COPY . .
CMD ["pm2-docker", "start", "process.json"]
