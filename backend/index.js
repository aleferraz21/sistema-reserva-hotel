const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 🟢 REGISTRO DE LOGS (Para você ver no Render)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} em ${req.url}`);
    next();
});

// 🔐 CONFIGURAÇÃO DO FIREBASE (Segura para Nuvem)
let serviceAccount;

try {
    if (process.env.FIREBASE_KEY) {
        // Se a chave estiver no Environment do Render (Recomendado)
        serviceAccount = JSON.parse(process.env.FIREBASE_KEY);
        console.log("✅ Usando chave do Firebase via Environment Variable");
    } else {
        // Se a chave estiver no arquivo local
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

// 🏠 ROTA DE BOAS-VINDAS (Para não dar Cannot GET /)
app.get('/', (req, res) => {
    res.send('<h1>API do Grand Hotel Tá funcionando! 🚀</h1>');
});

// 🟢 CRUD - CREATE (Salvar Reserva)
app.post('/reservas', async (req, res) => {
    try {
        const { usuario, checkIn, checkOut, tipoQuarto } = req.body;

        if (!usuario || !checkIn || !checkOut || !tipoQuarto) {
            return res.status(400).send({ error: "Todos os campos são obrigatórios." });
        }

        const docRef = await db.collection('reservas').add({
            usuario: usuario.trim(),
            checkIn,
            checkOut,
            tipoQuarto,
            status: 'pendente',
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(201).send({ id: docRef.id });
    } catch (error) {
        console.error("ERRO AO SALVAR:", error.message);
        res.status(500).send({ error: "Erro interno", detalhes: error.message });
    }
});

// 🔵 CRUD - READ (Listar todas)
app.get('/reservas', async (req, res) => {
    try {
        const snapshot = await db.collection('reservas').get();
        if (snapshot.empty) return res.status(200).json([]);
        
        const reservas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).send({ error: "Erro ao listar reservas.", detalhes: error.message });
    }
});

// 🔍 BUSCA POR USUÁRIO
app.get('/reservas/meu-status/:usuario', async (req, res) => {
    try {
        const nomeBusca = req.params.usuario.toLowerCase();
        const snapshot = await db.collection('reservas').get();
        const filtrados = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(r => r.usuario.toLowerCase().includes(nomeBusca));
        res.status(200).json(filtrados);
    } catch (error) {
        res.status(500).send({ error: "Erro na pesquisa." });
    }
});

// 🟡 CRUD - UPDATE (Aprovar)
app.patch('/reservas/:id', async (req, res) => {
    try {
        const { status } = req.body;
        await db.collection('reservas').doc(req.params.id).update({ status });
        res.status(200).send({ message: "Reserva atualizada." });
    } catch (error) {
        res.status(500).send({ error: "Erro ao atualizar." });
    }
});

// 🔴 CRUD - DELETE (Excluir)
app.delete('/reservas/:id', async (req, res) => {
    try {
        await db.collection('reservas').doc(req.params.id).delete();
        res.status(200).send({ message: "Reserva removida." });
    } catch (error) {
        res.status(500).send({ error: "Erro ao deletar." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
