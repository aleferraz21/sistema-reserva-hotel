import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [usuario, setUsuario] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [tipoQuarto, setTipoQuarto] = useState('');
  const [hospedes, setHospedes] = useState(1);
  const [buscaNome, setBuscaNome] = useState('');
  const [minhasReservas, setMinhasReservas] = useState([]);
  

  const API_URL = 'https://backend-grand-hotel.onrender.com';
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!buscaNome || buscaNome.length < 3) return;
      try {
        const res = await axios.get(`${API_URL}/meu-status/${buscaNome}`);
        setMinhasReservas(res.data);
      } catch (err) { console.error(err); }
    }, 500);
    return () => clearTimeout(timer);
  }, [buscaNome]);

  const fazerReserva = async (e) => {
    e.preventDefault();
    try {
   await axios.post(`${API_URL}/reservas`, { usuario, checkIn, checkOut, tipoQuarto, hospedes });
      alert("✅ Reserva solicitada!");
      setBuscaNome(usuario);
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao conectar.");
    }
  };

  const roomsData = [
    { nome: 'Standard', desc: 'Cama queen, Wi-Fi, TV', preco: 'R$120', tags: [], img: '/images/room-standard.jpg' },
    { nome: 'Luxo', desc: 'Cama king, amenidades premium, café da manhã', preco: 'R$220', tags: ['cafe'], img: '/images/room-luxo.jpg' },
    { nome: 'Hidromassagem', desc: 'Banheira com hidromassagem no quarto', preco: 'R$300', tags: ['hidro', 'cafe'], img: '/images/room-hidro.jpg' },
    { nome: 'VistaMar', desc: 'Varanda com vista para o mar', preco: 'R$350', tags: ['vista', 'cafe'], img: '/images/room-vistamar.jpg' },
    { nome: 'Suíte Presidencial', desc: 'Suíte espaçosa com lounge e serviços VIP', preco: 'R$800', tags: ['piscina', 'cafe'], img: '/images/room-presidencial.jpg' }
  ];


  const selectRoom = (name) => {
    setTipoQuarto(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const styles = {
    page: { padding: '40px', background: 'linear-gradient(180deg,#071017 0%, #0f1720 100%)', color: '#e6e6e6', minHeight: '100vh', fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    title: { color: '#ffd54a', fontSize: '36px', fontWeight: 700, margin: 0 },
    card: { background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', padding: '22px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(2,6,23,0.6)', border: '1px solid rgba(255,213,74,0.06)' },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', alignItems: 'end' },
    input: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: '#e6eef8' },
    select: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.25)', color: '#e6eef8' },
    btnPrimary: { background: 'linear-gradient(90deg,#d4af37,#f3d27a)', color: '#000', border: 'none', padding: '12px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700 },
    logout: { background: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' },
    roomList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginTop: '20px' },
    roomCard: { padding: '14px', borderRadius: '10px', background: 'linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.03)' },
    smallMuted: { color: '#9fb0d3', fontSize: '13px' }
  };

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const displayUser = currentUser?.nome || currentUser?.email?.split('@')[0] || usuario;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Grand Hotel - Reservas</h1>
        <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
          <div style={{color: '#cbd5e1', marginRight: '8px'}}>Olá, {displayUser}</div>
        </div>
      </div>

      <div style={styles.card}>
        <form onSubmit={fazerReserva}>
          <div style={styles.formGrid}>
            <div style={{gridColumn: 'span 1'}}>
              <label className="label">Seu Nome</label>
              <input placeholder="Seu Nome" value={usuario} onChange={e => setUsuario(e.target.value)} required style={styles.input} />
            </div>
            <div>
              <label className="label">Check-in</label>
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required style={styles.input} />
            </div>
            <div>
              <label className="label">Check-out</label>
              <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required style={styles.input} />
            </div>
            <div>
              <label className="label">Hóspedes</label>
              <select value={hospedes} onChange={e => setHospedes(Number(e.target.value))} style={styles.select}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n===1? 'hóspede' : 'hóspedes'}</option>)}
              </select>
            </div>

            <div style={{gridColumn: 'span 2'}}>
              <div style={{...styles.select, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span>{tipoQuarto}</span>
                <small style={{color: '#9fb0d3'}}>Clique em uma acomodação abaixo</small>
              </div>
            </div>

            <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
              <button type="submit" style={styles.btnPrimary}>Finalizar Reserva</button>
            </div>
          </div>
        </form>

        <div style={{marginTop: '22px'}}>
          <h3 style={{margin: 0}}>Explorar Acomodações</h3>
          <p style={styles.smallMuted}>Selecione o quarto de sua preferência.</p>

          <div style={styles.roomList}>
            {roomsData.map(r => (
              <div key={r.nome} style={styles.roomCard}>
                <div style={{height: '120px', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px'}}>
                  <img src={r.img} alt={r.nome} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src='https://picsum.photos/800/600?random=1'}} />
                </div>
                <h4 style={{margin: '4px 0 8px 0'}}>{r.nome}</h4>
                <div style={{color: '#9fb0d3', fontSize: '13px'}}>{r.desc}</div>
                <div style={{marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{fontWeight: 700}}>{r.preco} / Diária</div>
                  <div style={{display: 'flex', gap: '8px'}}>
                    <button onClick={() => selectRoom(r.nome)} style={{padding: '8px 12px', borderRadius: '8px', border: 'none', background: '#ffd54a', cursor: 'pointer'}}>Reservar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
       <div style={{marginTop: '26px'}}>
        <h3 style={{color: '#ffd54a'}}>Ver Minhas Reservas</h3>
        <input placeholder="Digite seu nome para buscar..." value={buscaNome} onChange={e => setBuscaNome(e.target.value)} style={{...styles.input, width: '320px'}} />
        <div style={{marginTop: '12px'}}>
          {minhasReservas.length === 0 && <div style={styles.smallMuted}>Nenhuma reserva encontrada.</div>}
          <ul style={{marginTop: '12px'}}>
            {minhasReservas.map(r => (
              <li key={r.id} style={{padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.03)'}}>
                <strong>{r.usuario}</strong> — {r.tipoQuarto} • {r.hospedes || '1'} hóspede(s) • Status: {r.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
<button 
  onClick={() => navigate('/login')} 
  style={{ marginTop: '20px', background: 'none', border: 'none', color: '#555', cursor: 'pointer' }}
>
  Acesso Administrativo
</button>

export default Home;
//coments
