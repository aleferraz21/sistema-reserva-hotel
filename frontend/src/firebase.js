import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 1. Adicione esta linha no topo

const firebaseConfig = {
  // ... (suas chaves que já estão lá)
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // 2. Adicione esta linha aqui

export { auth, db }; // 3. Exportação nomeada para o Admin e Login funcionarem
export default app;