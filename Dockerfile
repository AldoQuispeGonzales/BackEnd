# Use Node LTS
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
# Install both dependencies and devDependencies are not necessary in production,
# but nodemon not needed. We install production deps only for smaller image.
RUN npm ci --only=production

# Copy source
COPY . .

# Expose port
EXPOSE 3000

# Environment default
ENV NODE_ENV=production

CMD [ "node", "src/server.js" ]
