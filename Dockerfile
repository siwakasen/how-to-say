FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM deps AS build
COPY . .

ARG BUILD_VAR_VITE_API_URL
RUN mv .env.example .env.production
RUN echo "VITE_API_URL=${BUILD_VAR_VITE_API_URL}" > .env.production
RUN bun run build

FROM oven/bun:1 AS release
WORKDIR /app
ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
ENV PORT=3000
COPY --from=build --chown=bun:bun /app/.output ./.output
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", ".output/server/index.mjs" ]

