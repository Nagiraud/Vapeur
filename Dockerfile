FROM node:18

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier seulement package.json + lock pour optimiser le cache
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Exposer le port (le même que Express)
EXPOSE 3008

# Commande de lancement
CMD ["npm", "start"]