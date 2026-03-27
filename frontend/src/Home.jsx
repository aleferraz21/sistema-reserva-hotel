import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function Home() {
  const [usuario, setUsuario] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [tipoQuarto, setTipoQuarto] = useState('Standard');
  const [buscaNome, setBuscaNome] = useState('');
  const [minhasReservas, setMinhasReservas] = useState([]);

  const API_URL = 'https://backend-grand-hotel.onrender.com/reservas';

  const buscarStatus = useCallback(async () => {
    if (!buscaNome || buscaNome.length < 3) return;
    try {
      // Busca específica por usuário no Render
      const res = await axios.get(`${API_URL}/meu-status/${buscaNome}`);
      setMinhasReservas(res.data);
    } catch (err) { console.error(err); }
  }, [buscaNome]);

  useEffect(() => {
    const timer = setTimeout(() => buscarStatus(), 500);
    return () => clearTimeout(timer);
  }, [buscaNome, buscarStatus]);

  const fazerReserva = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { usuario, checkIn, checkOut, tipoQuarto });
      alert("✅ Reserva solicitada!");
      setBuscaNome(usuario);
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao conectar.");
    }
  };

  // ... (Mantenha os estilos e o return que já usamos anteriormente)
  return (
    <div style={{ padding: '40px', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
       {/* O conteúdo do HTML permanece o mesmo, focado no formulário e na tabela */}
       <h1 style={{color: '#d4af37'}}>Grand Hotel - Reservas</h1>
       <form onSubmit={fazerReserva}>
          <input placeholder="Seu Nome" value={usuario} onChange={e => setUsuario(e.target.value)} required />
          <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required />
          <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required />
          <select value={tipoQuarto} onChange={e => setTipoQuarto(e.target.value)}>
            <option value="Standard">Standard</option>
            <option value="Luxo">Luxo</option>
          </select>
          <button type="submit" style={{backgroundColor: '#d4af37', padding: '10px', marginTop: '10px'}}>Reservar Agora</button>
       </form>

       <div style={{marginTop: '40px'}}>
          <h3>Ver Minhas Reservas</h3>
          <input placeholder="Digite seu nome para buscar..." value={buscaNome} onChange={e => setBuscaNome(e.target.value)} />
          <ul>
            {minhasReservas.map(r => (
              <li key={r.id}>{r.tipoQuarto} - Status: {r.status}</li>
            ))}
          </ul>
       </div>
    </div>
  );
}

export default Home;