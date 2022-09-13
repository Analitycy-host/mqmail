FROM node:16-alpine as builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:16-alpine as runner

WORKDIR /app
COPY package*.json .
COPY --from=builder /app/build ./build
RUN npm install --only=production
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]