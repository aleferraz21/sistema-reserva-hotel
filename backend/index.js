const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 🟢 REQUISITO: Registro de Logs de Acesso
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} em ${req.url}`);
    next();
});

// Remova a lógica complexa de path e tente o require direto:
const serviceAccount = require('./firebase-key.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

// 🟢 REQUISITO: CRUD - CREATE com Validação no Back-end
app.post('/reservas', async (req, res) => {
    try {
        const { usuario, checkIn, checkOut, tipoQuarto } = req.body;

        // Validação de Campos Obrigatórios
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
        console.error("[ERRO NO FIREBASE]:", error);
        res.status(500).send({ error: "Erro interno ao salvar reserva." });
    }
});

// 🟢 REQUISITO: CRUD - READ (Lista completa para Admin)
app.get('/reservas', async (req, res) => {
    try {
        const snapshot = await db.collection('reservas').orderBy('createdAt', 'desc').get();
        const reservas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).send({ error: "Erro ao listar reservas." });
    }
});

// 🟢 REQUISITO: API RESTful (Busca por Hóspede)
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

// 🟢 REQUISITO: CRUD - UPDATE (Aprovação)
app.patch('/reservas/:id', async (req, res) => {
    try {
        const { status } = req.body;
        await db.collection('reservas').doc(req.params.id).update({ status });
        res.status(200).send({ message: "Reserva atualizada." });
    } catch (error) {
        res.status(500).send({ error: "Erro ao atualizar." });
    }
});

// 🟢 REQUISITO: CRUD - DELETE
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