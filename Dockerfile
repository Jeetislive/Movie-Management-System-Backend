# ===== Stage 1: Build =====
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# ===== Stage 2: Production =====
FROM node:18-alpine AS production

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy compiled output
COPY --from=builder /app/dist ./dist

# Copy Prisma schema and deps
COPY --from=builder /app/src/prisma ./src/prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000

# Push DB schema, generate client, start server
CMD [ "sh", "-c", "npx prisma generate --schema=./src/prisma/schema.prisma && npx prisma db push --schema=./src/prisma/schema.prisma && node dist/server.js" ]


