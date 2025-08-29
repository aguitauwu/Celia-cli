# Base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy rest of the source code
COPY . .

# Expose port 8080 for dashboard
EXPOSE 8080

# Run the bot
CMD ["node", "bot.js"]
