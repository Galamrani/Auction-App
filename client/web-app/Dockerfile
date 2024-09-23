# Install dependencies only when needed
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./
RUN npm install --omit-dev

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./

ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js app
RUN npm run build

# Production image, copy all the necessary files
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Add a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the build output and necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Use the non-root user
USER nextjs

# Expose the port and set the default port in the environment
EXPOSE 3000
ENV PORT 3000

# Start the Next.js app
CMD ["node", "server.js"]
