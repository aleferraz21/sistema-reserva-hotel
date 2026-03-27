FROM node:20-alpine
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro
COPY package*.json ./

# 🟢 O SEGREDO: Usar o --legacy-peer-deps para evitar conflitos de versão
RUN npm install --legacy-peer-deps

# Copia o restante do código
COPY . .

# Faz o build do Vite/React
RUN CI=false npm run build
# Usa um servidor leve para servir o site
RUN npm install -g serve

EXPOSE 8080

# Comando para rodar o site na porta do Render
CMD ["serve", "-s", "dist", "-l", "8080"]