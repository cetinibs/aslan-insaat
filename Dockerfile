# Build aşaması
FROM node:20-alpine AS builder

WORKDIR /app

# Paket dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm ci --only=production=false

# Tüm dosyaları kopyala
COPY . .

# Production build oluştur
RUN npm run build

# Production aşaması
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Kullanıcı oluştur (güvenlik için)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Gerekli dosyaları kopyala
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Kullanıcıyı değiştir
USER nextjs

# Port'u expose et
EXPOSE 3000

# Uygulamayı başlat
CMD ["node", "server.js"]
