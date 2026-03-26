import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [usuario, setUsuario] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [tipoQuarto, setTipoQuarto] = useState('Standard');

  const [buscaNome, setBuscaNome] = useState('');
  const [minhasReservas, setMinhasReservas] = useState([]);
  const navigate = useNavigate();

  // Função para buscar status das reservas
  const buscarStatus = useCallback(async () => {
    if (!buscaNome || buscaNome.length < 3) {
      setMinhasReservas([]);
      return;
    }
    try {
      const res = await axios.get(`http://localhost:3000/reservas/meu-status/${buscaNome}`);
      setMinhasReservas(res.data);
    } catch (err) {
      console.error("Erro ao carregar reservas", err);
    }
  }, [buscaNome]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => buscarStatus(), 500);
    return () => clearTimeout(delayDebounceFn);
  }, [buscaNome, buscarStatus]);

  // --- FUNÇÃO COM TRATAMENTO DE ERRO DO BACK-END ---
  const fazerReserva = async (e) => {
    e.preventDefault();
    try {
      // Tenta enviar para o Back-end
      await axios.post('http://axios.post:3000/reservas', { 
        usuario, checkIn, checkOut, tipoQuarto 
      });
      
      alert("✅ Solicitação de reserva enviada com sucesso!");
      setBuscaNome(usuario); // Atualiza a busca automaticamente
      
    } catch (err) {
      // 🟢 CAPTURA DO ERRO DO BACK-END:
      // Se o back-end enviou um erro (ex: 400 Bad Request), pegamos a mensagem
      const mensagemErro = err.response?.data?.error || "Erro inesperado ao conectar com o hotel.";
      
      console.error("Erro detectado:", mensagemErro);
      alert(`⚠️ Atenção: ${mensagemErro}`);
    }
  };

  const styles = {
    container: { padding: '40px', backgroundColor: '#121212', minHeight: '100vh', color: 'white', textAlign: 'center', fontFamily: 'Arial' },
    card: { backgroundColor: '#1e1e1e', padding: '25px', borderRadius: '12px', marginBottom: '40px', display: 'inline-block', width: '100%', maxWidth: '450px', border: '1px solid #333', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
    inputGroup: { textAlign: 'left', marginBottom: '15px' },
    label: { fontSize: '14px', color: '#aaa', display: 'block', marginBottom: '5px' },
    input: { width: '95%', padding: '12px', borderRadius: '6px', border: '1px solid #444', backgroundColor: '#2b2b2b', color: 'white' },
    button: { padding: '14px', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%', fontSize: '16px' },
    tabela: { width: '100%', maxWidth: '800px', margin: '0 auto', borderCollapse: 'collapse', backgroundColor: '#1e1e1e' },
    th: { backgroundColor: '#252525', padding: '15px', color: '#d4af37', borderBottom: '2px solid #333' },
    td: { padding: '15px', borderBottom: '1px solid #333', fontSize: '14px' },
    statusBadge: (s) => ({ color: s === 'aprovada' ? '#4caf50' : '#ff9800', fontWeight: 'bold', border: `1px solid ${s === 'aprovada' ? '#4caf50' : '#ff9800'}`, padding: '4px 8px', borderRadius: '4px', fontSize: '12px' })
  };

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '900px', margin: '0 auto 30px auto' }}>
        <h1 style={{ color: '#d4af37' }}>Grand Hotel - Reserva Online</h1>
        <button onClick={() => navigate('/')} style={{ backgroundColor: 'transparent', color: '#ff4444', border: '1px solid #ff4444', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>Sair</button>
      </div>

      <div style={styles.card}>
        <h3 style={{ marginTop: 0 }}>Solicitar Nova Hospedagem</h3>
        <form onSubmit={fazerReserva}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nome e Sobrenome do Hóspede Principal:</label>
            <input placeholder="Digite aqui " value={usuario} onChange={e => setUsuario(e.target.value)} style={styles.input} />
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Check-in:</label>
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Check-out:</label>
              <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} style={styles.input} />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Tipo de Acomodação:</label>
            <select value={tipoQuarto} onChange={e => setTipoQuarto(e.target.value)} style={{...styles.input, width: '100%'}}>
              <option value="Standard">Standard (Simples)</option>
              <option value="Luxo">Luxo (Vista Mar)</option>
              <option value="Suíte Master">Suíte Master (Hidro)</option>
            </select>
          </div>

          <button type="submit" style={styles.button}>Confirmar Solicitação</button>
        </form>
      </div>

      <div style={{ marginTop: '50px' }}>
        <h2 style={{ color: '#d4af37' }}>Consultar Minhas Reservas</h2>
        <input 
          placeholder="🔎 Digite seu nome..." 
          value={buscaNome} 
          onChange={e => setBuscaNome(e.target.value)} 
          style={{ width: '100%', maxWidth: '350px', padding: '12px', borderRadius: '25px', border: '1px solid #d4af37', backgroundColor: '#1a1a1a', color: 'white', marginBottom: '25px', textAlign: 'center' }} 
        />
        
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>Quarto</th>
              <th style={styles.th}>Entrada</th>
              <th style={styles.th}>Saída</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {minhasReservas.length > 0 ? (
              minhasReservas.map(h => (
                <tr key={h.id}>
                  <td style={styles.td}>{h.tipoQuarto}</td>
                  <td style={styles.td}>{h.checkIn}</td>
                  <td style={styles.td}>{h.checkOut}</td>
                  <td style={styles.td}>
                    <span style={styles.statusBadge(h.status)}>{h.status.toUpperCase()}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" style={{ padding: '30px', color: '#666' }}>Pesquise seu nome para ver o andamento.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;