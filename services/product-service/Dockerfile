# Étape 1 : Build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Étape 2 : Runtime minimal
FROM node:18-slim AS runtime

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

CMD ["npm", "start"]
