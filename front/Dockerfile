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

# Construye la aplicación para producción
RUN npm run build

# Instala una imagen de Nginx para servir la aplicación
FROM nginx:alpine

# Copia el build de React a Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Expone el puerto 80 para acceder a Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
