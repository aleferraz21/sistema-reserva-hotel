import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Admin from './Admin';

function App() {
  return (
    <Router>
     <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/home" element={<Home />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/admin" element={<Admin />} />
    </Routes>
    </Router>
  );
}

export default App;
