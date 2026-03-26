import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Admin from './Admin';

function App() {
  return (
    <Router>
      <Routes>
        {/* A rota principal "/" agora é o Login conforme requisito de autenticação */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;