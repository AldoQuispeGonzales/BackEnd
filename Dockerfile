# Dockerfile (reemplaza si quieres conservar el actual)
FROM node:18-alpine

WORKDIR /app

# copy only package files first for build cache
COPY package*.json ./

# install only production deps
RUN npm ci --only=production --silent

# copy rest of the source
COPY --chown=node:node . .

# run as non-root user
USER node

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]
