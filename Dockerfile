FROM node:18-alpine AS builder
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install 
COPY . .
RUN yarn run build 

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist .
ENTRYPOINT ["node", "index.js"]
