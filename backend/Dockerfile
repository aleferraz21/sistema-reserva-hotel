# Usa a imagem oficial do Node.js
FROM node:18

# Cria a pasta do app dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o resto do código (incluindo sua firebase-key.json)
COPY . .

# Abre a porta 3000 que seu servidor usa
EXPOSE 3000

# Comando para ligar o servidor
CMD ["node", "index.js"]