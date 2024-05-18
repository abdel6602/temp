# Base image
FROM node:18-alpine

# Working directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD [ "node", "server.js" ]
