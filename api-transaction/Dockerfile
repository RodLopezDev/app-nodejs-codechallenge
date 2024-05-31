FROM --platform=linux/amd64 node:18-alpine as deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM --platform=linux/amd64 node:18-alpine as builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .
RUN npm run build

FROM --platform=linux/amd64 node:18-alpine as runner
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist
COPY nest-cli.json ./
COPY tsconfig*.json ./

CMD ["npm", "run", "start:prod"]
