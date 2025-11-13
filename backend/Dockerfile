FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* tsconfig.json vitest.config.ts .eslintrc.cjs ./
COPY src ./src
RUN npm install --production=false && npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=base /app/dist ./dist
COPY package.json package-lock.json* ./
RUN npm install --omit=dev
EXPOSE 4000
CMD ["node", "dist/server.js"]
