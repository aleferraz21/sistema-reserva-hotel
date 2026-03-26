import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Verificação de credenciais conforme requisito do PDF
    if (email === 'carlos@ads.com' && senha === 'carlos123') {
      alert(`Bem-vindo, Administrador Carlos!`);
      navigate('/admin');
    } else if (email === 'alex@teste.com' && senha === '123') {
      alert(`Bem-vindo, ${email}!`);
      navigate('/home');
    } else {
      alert("Credenciais inválidas! Tente carlos@ads.com ou alex@teste.com");
    }
  };

  // Objetos de estilo (CSS-in-JS) para um visual moderno
  const styles = {
    pageBackground: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#121212', // Fundo escuro da página
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      margin: 0,
      padding: 0
    },
    loginCard: {
      backgroundColor: '#1e1e1e', // Fundo do card ligeiramente mais claro
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.5)', // Sombra para dar profundidade
      width: '100%',
      maxWidth: '400px', // Largura máxima do card
      textAlign: 'center',
      border: '1px solid #333' // Borda sutil
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
      outline: 'none' // Remove o contorno padrão
    },
    inputFocus: {
      borderColor: '#4caf50' // Cor da borda ao focar (verde)
    },
    button: {
      backgroundColor: '#4caf50', // Verde vibrante para o botão principal
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
        <p style={styles.subtitle}>Gestão de Reservas - ADS Unifor</p>
        
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
            onMouseOver={(e) => e.target.style.backgroundColor = '#388e3c'} // Verde mais escuro no hover
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