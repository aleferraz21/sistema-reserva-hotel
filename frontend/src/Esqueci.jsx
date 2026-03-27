import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Esqueci() {
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/users/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || 'Erro ao gerar link');
      // mostra o link para testes / envio manual
      setLink(data.link);
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#071022', color: '#e6eef8'}}>
      <div style={{width: 420, background: '#081226', padding: 24, borderRadius: 10}}>
        <h2>Recuperar Senha</h2>
        <p style={{color:'#9fb0d3'}}>Insira o e-mail cadastrado. Um link de redefinição será gerado.</p>
        <form onSubmit={handleForgot}>
          <label style={{display:'block', marginTop:8}}>E-mail</label>
          <input value={email} onChange={e => setEmail(e.target.value)} required style={{width:'100%', padding:10, borderRadius:8, marginTop:6, border:'1px solid #203', background:'#061220', color:'#fff'}}/>
          <div style={{display:'flex', gap:10, marginTop:12}}>
            <button type="submit" style={{padding:10, borderRadius:8, background:'#4caf50', color:'#fff', border:'none'}}>Gerar Link</button>
            <button type="button" onClick={() => navigate('/')} style={{padding:10, borderRadius:8, background:'transparent', color:'#93c5fd', border:'1px solid rgba(147,197,253,0.15)'}}>Voltar</button>
          </div>
        </form>

        {link && (
          <div style={{marginTop:16, background:'#0b1220', padding:10, borderRadius:8}}>
            <p style={{color:'#cbd5e1', margin:0}}>Link de redefinição (copie e envie ao usuário):</p>
            <textarea readOnly value={link} style={{width:'100%', height:80, marginTop:8, borderRadius:6, padding:8}} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Esqueci;
