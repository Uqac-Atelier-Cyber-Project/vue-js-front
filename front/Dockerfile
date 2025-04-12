# Dockerfile (frontend/Dockerfile)

# 1. Build Vue.js
FROM node:22 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Runtime avec Nginx + runtime config
FROM nginx:stable-alpine AS production-stage

# Copie les fichiers buildés
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copie la config Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copie le script d'entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose le port
EXPOSE 80

# Lance le script au démarrage
CMD ["/entrypoint.sh"]
