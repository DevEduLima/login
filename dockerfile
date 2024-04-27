# Use uma imagem Node.js como base para construir a aplicação React
FROM node:14 AS build

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Faça o build da aplicação
RUN npm run build

# Use uma imagem nginx para servir a aplicação
FROM nginx:alpine

# Copie os arquivos estáticos gerados para a pasta de arquivos estáticos do nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copie o arquivo de configuração personalizado para o contêiner
COPY nginx.conf /etc/nginx/nginx.conf

# Exponha a porta 80
EXPOSE 80
