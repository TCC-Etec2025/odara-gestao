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
import Familiares from './pages/gestao/Familiares';

import PaginaRegistros from './pages/gestao/registros/PaginaRegistros';

import RegistroMedicamentos from './pages/gestao/registros/RegistroMedicamentos';
import RegistroSaudeInicial from './pages/gestao/registros/RegistroSaudeInicial';
import RegistroAtividades from './pages/gestao/registros/RegistroAtividades';
import RegistroOcorrencias from './pages/gestao/registros/RegistroOcorrencias';
import RegistroAlimentar from './pages/gestao/registros/RegistroAlimentar';
import RegistroComportamento from './pages/gestao/registros/RegistroComportamento';
import RegistroPreferencias from './pages/gestao/registros/RegistroPreferencias';
import RegistroConsultas from './pages/gestao/registros/RegistroConsultas';
import RegistroExames from './pages/gestao/registros/RegistroExames';

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
        <Route path="gestao" element={<LayoutGestao />}>
          <Route index element={<Dashboard />} />
          <Route path="funcionarios" element={<Funcionarios />} />
          <Route path="residentes" element={<Residentes />} />
          <Route path="familiares" element={<Familiares />} />

          {/* Novas rotas de registros */}
          <Route path="paginaRegistros" element={<PaginaRegistros/>} />

          {/* Leticia */}
          <Route path="registros/medicamentos" element={<RegistroMedicamentos />} />
          <Route path="registros/saudeInicial" element={<RegistroSaudeInicial />} />
          <Route path="registros/atividades" element={<RegistroAtividades />} />

          {/* Jamilly */}
          <Route path="registros/ocorrencias" element={<RegistroOcorrencias />} />
          <Route path="registros/alimentar" element={<RegistroAlimentar />} />
          <Route path="registros/comportamento" element={<RegistroComportamento />} />

          {/* Nicole */}
          <Route path="registros/preferencias" element={<RegistroPreferencias />} />
          <Route path="registros/consultas" element={<RegistroConsultas />} />

          {/* Lucas */}
          <Route path="registros/exames" element={<RegistroExames />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;