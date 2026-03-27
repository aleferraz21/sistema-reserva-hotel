import { initializeApp } from "firebase/app"; // Adicione essa linha no topo se não tiver
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-mC09HhR3p6G6Pz_p7p7p7p7p7p7p7p7",
  authDomain: "sistema-de-reservas-ads.firebaseapp.com",
  projectId: "sistema-de-reservas-ads",
  storageBucket: "sistema-de-reservas-ads.appspot.com",
  messagingSenderId: "117752569760",
  appId: "1:117752569760:web:96e94f06859560f6479b12"
};

// 🚨 ESSAS LINHAS SÃO OBRIGATÓRIAS:
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
// Atualização de interface 2.0