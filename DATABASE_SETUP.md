# Aslan İnşaat Website - Coolify + PostgreSQL Kurulumu

## 📦 Gereksinimler

- Coolify kurulu bir VPS/sunucu
- Node.js 18+

---

## 🚀 Coolify Kurulum Adımları

### Adım 1: PostgreSQL Veritabanı Oluşturma

1. **Coolify Dashboard'a girin**
2. **Resources** → **+ New** tıklayın
3. **Database** seçin → **PostgreSQL** seçin
4. Aşağıdaki ayarları yapın:
   - **Name**: `aslan-insaat-db`
   - **PostgreSQL Version**: `16` veya `17` (en güncel)
   - **Database Name**: `aslan_insaat`
   - **Username**: `aslan_user`
   - **Password**: Güçlü bir şifre oluşturun
5. **Deploy** tıklayın

### Adım 2: Veritabanı Bağlantı URL'sini Alın

1. Veritabanı deploy edildikten sonra **Configuration** sekmesine gidin
2. **Internal URL** kısmını kopyalayın:
   ```
   postgresql://aslan_user:PASSWORD@aslan-insaat-db:5432/aslan_insaat
   ```
   
   > ⚠️ **Internal URL** kullanın (aynı Coolify ağında olduğu için daha güvenli ve hızlı)

### Adım 3: Next.js Uygulamasını Deploy Edin

1. **Resources** → **+ New** → **Application**
2. **Git Repository** seçin ve repo URL'nizi girin
3. **Build Pack**: `Nixpacks` (otomatik algılama) veya `Dockerfile`
4. **Environment Variables** sekmesine gidin:

   ```env
   DATABASE_URL=postgresql://aslan_user:PASSWORD@aslan-insaat-db:5432/aslan_insaat
   NODE_ENV=production
   ```

5. **Build Command** olarak şunu kullanın (otomatik algılanmazsa):
   ```bash
   npm run build
   ```

6. **Start Command**:
   ```bash
   npm run start
   ```

### Adım 4: Build Sırasında Prisma Migration

Coolify'da build sırasında veritabanı migration'ı çalıştırmak için **Pre-build Command** ekleyin:

```bash
npx prisma db push
```

VEYA daha kontrollü bir yaklaşım için:

```bash
npx prisma migrate deploy
```

### Adım 5: Seed Verilerini Ekleyin (İlk Kez)

Deploy tamamlandıktan sonra **Terminal** sekmesinden:

```bash
npm run db:seed
```

---

## 📋 Coolify Ortam Değişkenleri (Environment Variables)

Coolify Dashboard → Uygulamanız → **Environment Variables**:

| Değişken | Değer | Açıklama |
|----------|-------|----------|
| `DATABASE_URL` | `postgresql://user:pass@db-host:5432/dbname` | PostgreSQL bağlantı URL'si |
| `NODE_ENV` | `production` | Ortam türü |
| `NEXTAUTH_SECRET` | `rastgele-guclu-sifre` | (Varsa) Auth için |
| `NEXTAUTH_URL` | `https://aslaninsaat.com` | (Varsa) Site URL |

---

## 🔧 Coolify Dockerfile (Opsiyonel)

Daha fazla kontrol için özel Dockerfile:

```dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma generate
RUN npx prisma generate

# Build
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

Bu Dockerfile'ı kullanmak için `next.config.mjs`'ye ekleyin:

```javascript
output: 'standalone'
```

---

## 🗃️ Veritabanı Tabloları

| Tablo | Açıklama |
|-------|----------|
| `services` | Hizmetler |
| `projects` | Projeler (konut/ticari) |
| `blog_posts` | Blog yazıları |
| `site_settings` | Site ayarları (key-value) |
| `faqs` | Sıkça Sorulan Sorular |
| `contact_messages` | İletişim mesajları |
| `quote_requests` | Teklif talepleri |
| `about_info` | Hakkımızda bilgileri |
| `team_members` | Ekip üyeleri |
| `media` | Medya/dosyalar |
| `admin_users` | Admin kullanıcıları |

---

## 📋 NPM Script'leri

| Script | Açıklama |
|--------|----------|
| `npm run build` | Production build (Prisma generate dahil) |
| `npm run db:generate` | Prisma client oluşturur |
| `npm run db:push` | Şemayı veritabanına push eder |
| `npm run db:migrate` | Migration oluşturur ve uygular |
| `npm run db:migrate:prod` | Production'da migration uygular |
| `npm run db:seed` | Başlangıç verilerini ekler |
| `npm run db:studio` | Prisma Studio açar (lokal) |
| `npm run db:reset` | Veritabanını sıfırlar |

---

## 🔧 Sorun Giderme

### "Can't reach database server"
- Internal URL'nin doğru olduğundan emin olun
- PostgreSQL container'ının çalıştığından emin olun
- Aynı Coolify network'ünde olduklarından emin olun

### "Prisma migration failed during build"
- Build öncesi veritabanının hazır olduğundan emin olun
- Pre-build command'a `sleep 10 && npx prisma db push` ekleyin

### "Module not found: @prisma/client"
- Build command'ın `prisma generate` içerdiğinden emin olun
- `npm run build` script'i zaten bunu içeriyor

---

## 🔄 Güncelleme Akışı

1. Kod değişikliklerini push edin
2. Coolify otomatik olarak yeniden deploy eder (webhook aktifse)
3. Veya manuel: Dashboard → **Redeploy**
4. Yeni migration varsa: `npx prisma migrate deploy`
