# Use uma imagem Node.js como base
FROM node:14

# Defina o diretório de trabalho no container
WORKDIR /usr/share/nginx/html

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie os arquivos de build diretamente para a pasta html do NGINX
COPY build/ .

# Use uma imagem nginx para servir a aplicação
FROM nginx:alpine

# Exponha a porta 80
EXPOSE 80