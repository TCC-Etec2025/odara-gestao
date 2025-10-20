import { BrowserRouter, Routes, Route } from 'react-router-dom';

{/* Importando layouts dos usuários do sistema */}
import Layout from './components/Layout';
import LayoutGestao from './components/Private/LayoutGestao';
import LayoutFuncionario from './components/Private/LayoutFuncionario';
import LayoutFamiliar from './components/Private/LayoutFamiliar';

{/* Importando paginas antes do login */}
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Documentacao from './pages/Documentacao';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';

{/* Importando paginas do usuário administrativo */}
import DashboardGestao from './pages/gestao/Dashboard';
import Funcionarios from './pages/gestao/Funcionarios';
import ResidentesGestao from './pages/gestao/Residentes'; 
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

{/* Importando paginas do usuário funcionário*/}
import DashboardFuncionario from './pages/funcionario/Dashboard';
import Relatorios from './pages/funcionario/PaginaRelatorios';
import ResidentesFuncionario from './pages/funcionario/PaginaResidentes'; 
import Checklist from './pages/funcionario/Checklist/PaginaChecklist';

{/* Checklist funcionário*/}
import Alimentacao from './pages/funcionario/Checklist/Alimentacao';
import MedicamentosCheck from './pages/funcionario/Checklist/Medicamentos';
import Atividades from './pages/funcionario/Checklist/Atividades';
import ExamesMedicos from './pages/funcionario/Checklist/ExamesMedicos';
import ConsultasMedicas from './pages/funcionario/Checklist/ConsultasMedicas';

{/* Registros funcionário*/}
import Ocorrencias from './pages/funcionario/Registros/Ocorrencias';
import Comportamento from './pages/funcionario/Registros/Comportamento';
import Preferencias from './pages/funcionario/Registros/Preferencias';
import SaudeCorporal from './pages/funcionario/Registros/SaudeCorporal';

{/* Importando paginas do usuário familiar*/}
import DashboardFamiliar from './pages/familiar/Dashboard';
import Documentos from './pages/familiar/PaginaDocumentos'; 

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

        {/* Rotas privadas de gestão com Layout Gestão */}
        <Route path="gestao" element={<LayoutGestao />}>
          <Route index element={<DashboardGestao />} />
          <Route path="funcionarios" element={<Funcionarios />} />
          <Route path="residentes" element={<ResidentesGestao />} />
          <Route path="familiares" element={<Familiares />} />
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

        {/* Rotas privadas de funcionario com Layout funcionario */}
        <Route path="funcionario" element={<LayoutFuncionario />}>
          <Route index element={<DashboardFuncionario />} />
          <Route path="residentes/funcionario" element={<ResidentesFuncionario />} />
          <Route path="relatorios" element={<Relatorios />} />
          
          <Route path="checklist" element={<Checklist />} />
          
          {/* Leticia */}
          <Route path="checklist/medicamentos/check" element={<MedicamentosCheck />} />
          <Route path="checklist/atividades" element={<Atividades />} />
          <Route path="registros/saude/corporal" element={<SaudeCorporal />} />
          {/* Jamilly */}
          <Route path="registros/ocorrencias" element={<Ocorrencias />} />
          <Route path="checklist/alimentacao" element={<Alimentacao />} />
          <Route path="registros/comportamento" element={<Comportamento />} />
          {/* Nicole */}
          <Route path="registros/preferencias" element={<Preferencias />} />
          <Route path="checklist/consultas/medicas" element={<ConsultasMedicas />} />
          {/* Lucas */}
          <Route path="checklist/exames/medicos" element={<ExamesMedicos />} />
        </Route>

        {/* Rotas privadas de familiar com Layout familiar */}
        <Route path="familiar" element={<LayoutFamiliar />}>
          <Route index element={<DashboardFamiliar />} />
          <Route path="documentos" element={<Documentos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;