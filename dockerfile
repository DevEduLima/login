# Use uma imagem Node.js como base
FROM node:14

# Defina o diretório de trabalho no container
WORKDIR /app

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

# Copie os arquivos estáticos para a pasta de arquivos estáticos do nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80
