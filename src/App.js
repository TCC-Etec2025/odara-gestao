import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Documentacao from './pages/Documentacao';
import Cadastro from './pages/Cadastro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="documentacao" element={<Documentacao />} />
          <Route path="cadastro" element={<Cadastro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;