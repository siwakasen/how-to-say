# ---------- STAGE 1: BUILD ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ARG BUILD_VAR_VITE_API_URL
RUN mv .env.example .env.production
RUN echo "VITE_API_URL=${BUILD_VAR_VITE_API_URL}" > .env.production

RUN npm run build


# ---------- STAGE 2: RUNTIME ----------
FROM node:22-alpine

WORKDIR /app

# hanya copy hasil build
COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

