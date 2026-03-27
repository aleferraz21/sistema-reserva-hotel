// Inicialização do Firebase client (cole as credenciais do seu app web)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Substitua pelos valores do seu projeto Firebase (console Firebase -> Configuração do app web)
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_AUTH_DOMAIN",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  // opcional: storageBucket, messagingSenderId, appId
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
