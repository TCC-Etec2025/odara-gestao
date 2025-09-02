import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LayoutGestao from './components/Private/LayoutGestao';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Documentacao from './pages/Documentacao';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Dashboard from './pages/gestao/Dashboard';
import Funcionarios from './pages/gestao/Funcionarios';
import Residentes from './pages/gestao/Residentes';

import PaginaRegistros from './pages/gestao/PaginaRegistros';

import RegistroMedicamentos from './pages/gestao/RegistroMedicamentos';
import RegistroSaudeInicial from './pages/gestao/RegistroSaudeInicial';
import RegistroAtividades from './pages/gestao/RegistroAtividades';
import RegistroOcorrencias from './pages/gestao/RegistroOcorrencias';
import RegistroAlimentar from './pages/gestao/RegistroAlimentar';
import RegistroComportamento from './pages/gestao/RegistroComportamento';
import RegistroPreferencias from './pages/gestao/RegistroPreferencias';
import RegistroConsultas from './pages/gestao/RegistroConsultas';
import RegistroExames from './pages/gestao/RegistroExames';

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
          <Route path="funcionarios" element={<Funcionarios />} />
          <Route path="residentes" element={<Residentes />} />

          {/* Novas rotas de registros */}
          <Route path="paginaRegistros" element={<PaginaRegistros/>} />

          {/* Leticia */}
          <Route path="registroMedicamentos" element={<RegistroMedicamentos />} />
          <Route path="registroSaudeInicial" element={<RegistroSaudeInicial />} />
          <Route path="registroAtividades" element={<RegistroAtividades />} />

          {/* Jamilly */}
          <Route path="registroOcorrencias" element={<RegistroOcorrencias />} />
          <Route path="registroAlimentar" element={<RegistroAlimentar />} />
          <Route path="registroComportamento" element={<RegistroComportamento />} />

          {/* Nicole */}
          <Route path="registroPreferencias" element={<RegistroPreferencias />} />
          <Route path="registroConsultas" element={<RegistroConsultas />} />

          {/* Lucas */}
          <Route path="registroExames" element={<RegistroExames />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;