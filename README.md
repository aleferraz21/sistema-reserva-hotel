# 🏨 Grand Hotel - Sistema de Reservas

Este é um sistema de gestão e de reservas de hotel, desenvolvido como projeto para o curso de **Análise e Desenvolvimento de Sistemas (ADS)**.

#Tecnologias Utilizadas
- Frontend: React (Vite), Axios, React Router.
- Backend: Node.js, Express.
- Banco de Dados:** Firebase Firestore (NoSQL).
- Segurança: Firebase Auth (Perfil Admin) e Variáveis de Ambiente.
- Infraestrutura:** Docker e Deploy Contínuo no Render.

#Perfis de Acesso
1. Hóspede: Acesso livre para consulta de quartos e realização de reservas.
2. Administrador: Acesso restrito via login para aprovação e exclusão de reservas.

#Como rodar o projeto localmente

 Pré-requisitos
- Node.js instalado
- Docker (opcional)

# Passo a passo
1. Clone o repositório: `git clone [https://github.com/aleferraz21/sistema-reserva-hotel.git]`
2. Frontend:
   - `cd frontend` -> `npm install` -> `npm run dev`
3. Backend:
   - `cd backend` -> `npm install` -> `node index.js`

# 🔗 Links do Projeto
- Site Oficial (Deploy): (https://sistema-reserva-hotel.onrender.com)
- Documentação da API: O backend segue o padrão RESTful com as rotas:
  - `POST /reservas` - Cria uma nova reserva.
  - `GET /meu-status/:nome` - Busca reservas por hóspede.
  - `DELETE /reservas/:id` - Remove uma reserva (Admin).
