import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();
  const API_URL = 'https://sistema-reserva-hotel.onrender.com/admin';

  // 1. Função para buscar todas as reservas
  const buscarReservas = useCallback(async () => {
    try {
      const res = await axios.get(API_URL);
      setReservas(res.data);
    } catch (err) {
      console.error("Erro ao buscar reservas:", err);
    }
  }, []);

  useEffect(() => {
    buscarReservas();
  }, [buscarReservas]);

  // 2. Função para Confirmar/Aprovar
  const atualizarStatus = async (id, novoStatus) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { status: novoStatus });
      alert("✅ Status atualizado com sucesso!");
      buscarReservas();
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  // 3. Função para Excluir
  const excluirReserva = async (id) => {
    if (window.confirm("Deseja cancelar e excluir esta reserva permanentemente?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("🗑️ Reserva removida!");
        buscarReservas();
      } catch (err) {
        console.error("Erro ao excluir reserva:", err);
        alert("Erro ao tentar excluir.");
      }
    }
  };

  const styles = {
    container: { padding: '40px', backgroundColor: '#121212', minHeight: '100vh', color: 'white', fontFamily: 'Arial' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #d4af37', paddingBottom: '15px' },
    title: { color: '#d4af37', margin: 0 },
    btnSair: { backgroundColor: 'transparent', color: '#ff4444', border: '1px solid #ff4444', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
    table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#1e1e1e', borderRadius: '8px', overflow: 'hidden' },
    th: { textAlign: 'left', padding: '15px', backgroundColor: '#252525', color: '#d4af37' },
    td: { padding: '15px', borderBottom: '1px solid #333' },
    statusBadge: (s) => ({
      padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold',
      color: s === 'aprovada' ? '#81c784' : '#ffb74d',
      border: `1px solid ${s === 'aprovada' ? '#4caf50' : '#ff9800'}`
    }),
    btnConfirmar: { backgroundColor: '#d4af37', color: 'black', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' },
    btnExcluir: { backgroundColor: 'transparent', color: '#ef5350', border: '1px solid #ef5350', padding: '7px 11px', borderRadius: '4px', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Painel de Gestão - Grand Hotel</h1>
        <button onClick={() => navigate('/')} style={styles.btnSair}>Sair</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Hóspede</th>
            <th style={styles.th}>Acomodação</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(r => (
            <tr key={r.id}>
              <td style={styles.td}>{r.usuario}</td>
              <td style={styles.td}>{r.tipoQuarto}</td>
              <td style={styles.td}><span style={styles.statusBadge(r.status)}>{r.status.toUpperCase()}</span></td>
              <td style={styles.td}>
                {r.status === 'pendente' && (
                  <button onClick={() => atualizarStatus(r.id, 'aprovada')} style={styles.btnConfirmar}>Aprovar</button>
                )}
                <button onClick={() => excluirReserva(r.id)} style={styles.btnExcluir}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;