import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

 
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const API_URL = 'https://backend-grand-hotel.onrender.com';
      const res = await axios.post(`${API_URL}/admin-login`, { 
        email: email.trim(), 
        senha: senha.trim() 
      });
      
      alert("✅ " + res.data.message);
      navigate('/admin');
      
    } catch (error) {
      console.error("Erro no login:", error.response?.data);
      alert("Usuário ou senha incorretos.");
    }
  };

  // Objetos de estilo
  const styles = {
    pageBackground: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#121212',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      margin: 0,
      padding: 0
    },
    loginCard: {
      backgroundColor: '#1e1e1e',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
      width: '100%',
      maxWidth: '400px', 
      textAlign: 'center',
      border: '1px solid #333' 
    },
    title: {
      margin: '0 0 10px 0',
      fontSize: '28px',
      fontWeight: '600',
      color: '#fff'
    },
    subtitle: {
      margin: '0 0 30px 0',
      fontSize: '16px',
      color: '#aaa',
      fontWeight: '400'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left'
    },
    label: {
      fontSize: '14px',
      color: '#ccc',
      marginBottom: '8px',
      fontWeight: '500'
    },
    input: {
      padding: '12px 15px',
      marginBottom: '20px',
      backgroundColor: '#2b2b2b',
      border: '1px solid #444',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '16px',
      transition: 'border-color 0.3s',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#4caf50' 
    },
    button: {
      backgroundColor: '#4caf50', 
      color: 'white',
      border: 'none',
      padding: '12px',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.loginCard}>
        <h2 style={styles.title}>Acessar Sistema</h2>
        <p style={styles.subtitle}>Gestão de Reservas ADM</p>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <label style={styles.label}>E-mail:</label>
          <input 
            type="email" 
            placeholder="seu@email.com"
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
          />
          
          <label style={styles.label}>Senha:</label>
          <input 
            type="password" 
            placeholder="Sua senha segura"
            onChange={(e) => setSenha(e.target.value)} 
            required 
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
          />
          
          <button 
            type="submit" 
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = '#388e3c'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4caf50'}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;


