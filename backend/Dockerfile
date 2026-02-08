# --- STAGE 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the NestJS app (compiles TS to JS in /dist)
RUN npm run build

# --- STAGE 2: Run ---
FROM node:20-alpine AS runner

WORKDIR /app

# Set to production
ENV NODE_ENV=production

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# CRITICAL: Copy Drizzle files so migrations can run inside the container
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts

# Copy the entrypoint script and make it executable
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# The entrypoint handles the "Wait -> Migrate -> Start" logic
ENTRYPOINT ["./entrypoint.sh"]