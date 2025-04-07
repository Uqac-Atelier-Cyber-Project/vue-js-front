FROM node:14-alpine

# Dossier de travail
WORKDIR /app

# Copier les fichiers et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste de l'app
COPY . .

# Construire l'application Vue.js (mode prod)
RUN npm run build

# Installer http-server pour servir /dist
RUN npm install -g http-server

# Exposer le port 8080
EXPOSE 8080

# Commande de lancement
CMD ["http-server", "dist", "-p", "8080"]
