# Utiliser une image de base Node.js
FROM node:14

# Définir le répertoire de travail
WORKDIR /app

# Copier le package.json et le package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application Vue.js
RUN npm run build

# Exposer le port 8080
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["npm", "run", "serve"]