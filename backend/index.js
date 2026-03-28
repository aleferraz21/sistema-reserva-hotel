const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// REGISTRO DE LOGS
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} em ${req.url}`);
    next();
});

//CONFIGURAÇÃO DO FIREBASE
let serviceAccount;
try {
    if (process.env.FIREBASE_KEY) {
        serviceAccount = JSON.parse(process.env.FIREBASE_KEY);
        console.log("✅ Usando chave do Firebase via Environment Variable");
    } else {
        serviceAccount = require('./firebase-key.json');
        console.log("⚠️ Usando chave do Firebase via arquivo local");
    }

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
} catch (error) {
    console.error("❌ ERRO AO INICIALIZAR FIREBASE:", error.message);
}

const db = admin.firestore();

// ROTA DE BOAS-VINDAS
app.get('/', (req, res) => {
    res.send('<h1>API do Grand Hotel Tá funcionando! 🚀</h1>');
});

// ROTA DE LOGIN SEGURA
app.post('/admin-login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        // O Admin SDK verifica se o e-mail existe no Firebase Auth
        const userRecord = await admin.auth().getUserByEmail(email);
        if (userRecord) {
            return res.status(200).json({ message: "Acesso autorizado!" });
        }
    } catch (error) {
        // Resposta genérica
        console.error("Falha no login:", error.code);
        return res.status(401).json({ error: "Usuário ou senha incorretos." });
    }
});

app.post('/reservas', async (req, res) => {
    try {
        const { usuario, checkIn, checkOut, tipoQuarto, hospedes } = req.body;
        const docRef = await db.collection('reservas').add({
            usuario: usuario.trim(),
            checkIn,
            checkOut,
            tipoQuarto,
            hospedes,
            status: 'pendente',
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(201).send({ id: docRef.id });
    } catch (error) {
        res.status(500).send({ error: "Erro ao salvar reserva." });
    }
});

app.get('/reservas', async (req, res) => {
    try {
        const snapshot = await db.collection('reservas').orderBy('createdAt', 'desc').get();
        const reservas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).send({ error: "Erro ao listar reservas." });
    }
});

app.patch('/reservas/:id', async (req, res) => {
    try {
        const { status } = req.body;
        await db.collection('reservas').doc(req.params.id).update({ status });
        res.status(200).send({ message: "Status atualizado." });
    } catch (error) {
        res.status(500).send({ error: "Erro ao atualizar." });
    }
});

app.delete('/reservas/:id', async (req, res) => {
    try {
        await db.collection('reservas').doc(req.params.id).delete();
        res.status(200).send({ message: "Removida." });
    } catch (error) {
        res.status(500).send({ error: "Erro ao deletar." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
