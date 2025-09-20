# --- FRONTEND REACT CONTAINER ---
FROM node:23.11-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy source code
COPY . .

# Install all dependencies within the container rather than inheriting from host
RUN rm -rf node_modules/

# --- BUILD ---
RUN npm ci

EXPOSE 8080
