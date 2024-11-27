FROM oven/bun:1.1.37-alpine AS base
WORKDIR /usr/src/app

COPY . .

RUN bun install && bun build ./src/server.ts --target=bun --minify --outdir=dist 

USER bun

ENTRYPOINT [ "bun", "run", "dist/server.js" ]
