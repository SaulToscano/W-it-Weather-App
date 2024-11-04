# Usa una imagen de Node como base
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto de la aplicación (ajusta según sea necesario)
EXPOSE 5002

# Comando para iniciar el servidor
CMD ["npm", "run", "start:prod"]
