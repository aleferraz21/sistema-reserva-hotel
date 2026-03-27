import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chama API backend para criar usuário no Firebase Auth
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, role: 'cliente' })
    }).then(async res => {
      const data = await res.json();
      if (!res.ok) return alert(data.error || 'Erro ao cadastrar');
      // fallback localStorage para compatibilidade imediata (não recomendado em produção)
      try {
        const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
        users.push({ nome, email, senha, role: 'cliente' });
        localStorage.setItem('usuarios', JSON.stringify(users));
      } catch { /* silent */ }

      alert('Cadastro realizado! Verifique seu e-mail ou faça login.');
      navigate('/', { state: { prefillEmail: email } });
    }).catch(err => {
      console.error('Erro no cadastro:', err);
      alert('Erro ao conectar com o servidor.');
    });
  };

  const styles = {
    page: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#071022', color: '#e6eef8' },
    card: { background: '#081226', padding: '28px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.7)', width: '100%', maxWidth: '420px' },
    title: { color: '#ffd700' },
    label: { color: '#bfc7d6', fontSize: '13px' },
    input: { width: '100%', padding: '10px', marginTop: '8px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #203', background: '#061220', color: '#fff' },
    submit: { width: '100%', padding: '12px', background: 'linear-gradient(90deg,#4caf50,#2e7d32)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700' }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Criar Conta</h2>
        <p style={{color:'#9fb0d3'}}>Preencha os dados para criar sua conta de cliente.</p>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Nome</label>
          <input style={styles.input} value={nome} onChange={e => setNome(e.target.value)} required />
          <label style={styles.label}>E-mail</label>
          <input style={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label style={styles.label}>Senha</label>
          <input style={styles.input} type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
          <button type="submit" style={styles.submit}>Cadastrar</button>
        </form>
        <div style={{textAlign: 'center', marginTop: '12px'}}>
          <span onClick={() => navigate('/')} style={{color: '#93c5fd', cursor: 'pointer', textDecoration: 'underline'}}>Já tenho cadastro — Voltar</span>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
