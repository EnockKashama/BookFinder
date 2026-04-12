# Stage 1: base image (Choose your kitchen)
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (Docker caching trick) (bring ingredients)
COPY package*.json ./

# Install dependencies (cook the food)
RUN npm ci --omit=dev

# Copy the rest of the source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Use entrypoint script instead of direct node command
CMD ["./entrypoint.sh"]