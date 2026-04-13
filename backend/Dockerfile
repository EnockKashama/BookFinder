# Stage 1: base image (Choose your kitchen)
FROM node:20-alpine

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 3000

CMD ["./entrypoint.sh"]