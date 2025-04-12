# 1. Build Vue.js
FROM node:22 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Runtime Nginx avec config dynamique
FROM nginx:stable-alpine AS production-stage

# Nettoie la conf par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copie les fichiers générés par Vue
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copie la conf nginx et l’entrypoint
COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Port exposé
EXPOSE 80

# Lancement via script
CMD ["/entrypoint.sh"]
