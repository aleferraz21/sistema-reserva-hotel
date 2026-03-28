import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Admin from './Admin';

function App() {
  return (
    <Router>
     <Routes>
      {/* 1. Agora o site do Hotel abre direto no link principal */}
      <Route path="/" element={<Home />} /> 
      
      {/* 2. O usuário comum também pode acessar via /home se quiser */}
      <Route path="/home" element={<Home />} /> 

      {/* 3. Você entra no login por este caminho específico */}
      <Route path="/login" element={<Login />} /> 

      {/* 4. O painel de gestão continua protegido */}
      <Route path="/admin" element={<Admin />} />
    </Routes>
    </Router>
  );
}

export default App;
