# Temel imaj
FROM node:20-alpine AS base

# Bağımlılıklar (native modüller için gerekli)
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Bağımlılıkları yükle (Deps Aşaması)
FROM base AS deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Bağımlılıkları yükle
RUN npm ci

# Builder Aşaması
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma istemcisini oluştur
RUN npx prisma generate

# Next.js build
RUN npm run build

# Runner Aşaması (Production)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Next.js telemetrisini kapat (kaynak tasarrufu)
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Public klasörünü kopyala
COPY --from=builder /app/public ./public

# Standalone çıktı ve static dosyalar
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Permissions
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Server.js ile başlat
CMD ["node", "server.js"]
