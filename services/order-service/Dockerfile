FROM node:18-alpine

WORKDIR /app 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["node", "src/app.js"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
CMD curl -f http://localhost:3002/api/health || exit 1
