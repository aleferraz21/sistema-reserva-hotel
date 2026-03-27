FROM node:18

WORKDIR /usr/src/app

# Copia os arquivos de pacotes
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código da pasta backend para dentro do container
COPY . .

# 🟢 GARANTIA: Força a permissão de leitura no arquivo da chave
RUN chmod 644 firebase-key.json

EXPOSE 3000

CMD ["node", "index.js"]