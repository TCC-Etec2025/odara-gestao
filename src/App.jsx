import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LayoutGestao from './components/Private/LayoutGestao';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Documentacao from './pages/Documentacao';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Dashboard from './pages/gestao/Dashboard';
import Usuarios from './pages/gestao/Usuarios';
import Residentes from './pages/gestao/Residentes';
import Configuracoes from './pages/gestao/Configuracoes';

import RegistroPreferencias from './pages/gestao/RegistroPreferencias';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas com Layout Antes do Login */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="documentacao" element={<Documentacao />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Rotas de gestão com Layout Gestão */}
        <Route path="/gestao" element={<LayoutGestao />}>
          <Route index element={<Dashboard />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="residentes" element={<Residentes />} />
          <Route path="configuracoes" element={<Configuracoes />} />

          {/* Novas rotas de registros */}
          <Route path="registroPreferencias" element={<RegistroPreferencias />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;