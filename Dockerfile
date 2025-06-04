FROM node:24-slim AS builder

ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile

# 앱 소스 복사
COPY . .

RUN yarn build

FROM node:24-slim AS runner

ENV NODE_ENV=production
WORKDIR /app


COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# 포트 설정
EXPOSE 3000

# 앱 실행
CMD ["yarn", "start"]
