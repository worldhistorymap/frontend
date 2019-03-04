#base image
FROM node:11.1.0

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production
COPY src ./src
COPY public ./public
RUN npm run build
RUN npm install -g serve
CMD serve -s build -l tcp://0.0.0.0:8000



