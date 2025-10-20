import React, { useState } from "react";
import { 
  Home, 
  FileText, 
  Pill, 
  Utensils, 
  Activity,
  Bell,
  AlertCircle,
  Info,
  ChevronLeft,
  ChevronRight,
  User,
  Calendar as CalendarIcon, 
  Clock,
  Download,
  Eye,
  X,
  Plus
} from "lucide-react";
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';

const IconWrapper = ({ icon: Icon, size = 24, ...props }) => (
  <Icon size={size} {...props} />
);

const DashboardFamiliar = () => {
  const [visualizacao, setVisualizacao] = useState("casa");
  const [familiarSelecionado, setFamiliarSelecionado] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [modalMedicamentosAberto, setModalMedicamentosAberto] = useState(false);
  const [modalConsultasAberto, setModalConsultasAberto] = useState(false);
  const [modalAtividadesAberto, setModalAtividadesAberto] = useState(false);
  const [modalCardapioAberto, setModalCardapioAberto] = useState(false);

  const [dataConsulta, setDataConsulta] = useState(new Date());
  const [dataAtividade, setDataAtividade] = useState(new Date());

  const familiares = [
    {
      id: 1,
      nome: "João Silva",
      idade: 78,
      quarto: "101",
      foto: "../images/foto-idoso-joao.jpg",
      parentesco: "Pai",
      status: "Estável",
      ultimaVisita: "15/09/2024",
      informacoes: {
        alergias: "Penicilina, Dipirona",
        contatoEmergencia: "(11) 99999-9999",
        planoSaude: "Unimed",
        numeroCarteira: "123456789",
        observacoes: "Controlar pressão arterial diariamente"
      }
    },
    {
      id: 2,
      nome: "Maria Santos",
      idade: 82,
      quarto: "205",
      foto: "../images/foto-idosa-maria.png",
      parentesco: "Mãe",
      status: "Cuidados especiais",
      ultimaVisita: "14/09/2024",
      informacoes: {
        alergias: "Frutos do mar",
        contatoEmergencia: "(11) 98888-8888",
        planoSaude: "Amil",
        numeroCarteira: "987654321",
        observacoes: "Necessita auxílio para locomoção"
      }
    }
  ];

  const alertas = [
    { 
      id: 1, 
      texto: "Medicamento de João precisa ser renovado", 
      tipo: "alerta", 
      hora: "09:30",
      detalhes: {
        titulo: "Renovação de Medicamento - João Silva",
        descricao: "O medicamento Losartana 50mg precisa ser renovado até sexta-feira:",
        lista: [
          "Medicamento: Losartana 50mg",
          "Prazo para renovação: Sexta-feira", 
          "Quantidade restante: 3 dias",
          "Farmácia: Drogaria Central"
        ],
        acaoRecomendada: "Entrar em contato com a farmácia para renovação da receita."
      }
    },
    { 
      id: 2, 
      texto: "Consulta de Maria precisa de confirmação", 
      tipo: "alerta", 
      hora: "08:15",
      detalhes: {
        titulo: "Confirmação de Consulta - Maria Santos",
        descricao: "A consulta com o geriatra precisa ser confirmada até amanhã:",
        lista: [
          "Especialidade: Geriatra",
          "Data: 25/09/2024 - 10:30",
          "Médico: Dra. Ana Santos",
          "Local: Clínica Vida Nova"
        ],
        acaoRecomendada: "Ligar para a clínica e confirmar a presença."
      }
    },
  ];

  const notificacoes = [
    { 
      id: 3, 
      texto: "Relatório mensal de saúde disponível", 
      tipo: "info", 
      hora: "07:45",
      detalhes: {
        titulo: "Relatório Mensal de Saúde",
        descricao: "O relatório mensal de saúde dos residentes está disponível para download:",
        lista: [
          "Período: Setembro/2024",
          "Status geral: Estável",
          "Consultas realizadas: 5",
          "Medicamentos em uso: 8"
        ],
        acaoRecomendada: "Revisar o relatório e entrar em contato em caso de dúvidas."
      }
    },
    { 
      id: 4, 
      texto: "Visita familiar agendada para sábado", 
      tipo: "info", 
      hora: "Ontem",
      detalhes: {
        titulo: "Visita Familiar Agendada",
        descricao: "Sua visita está agendada para este sábado:",
        lista: [
          "Data: Sábado, 21/09/2024",
          "Horário: 14:00 - 16:00",
          "Local: Sala de Visitas", 
          "Residentes: João e Maria"
        ],
        acaoRecomendada: "Confirmar presença até sexta-feira."
      }
    },
  ];

  // Medicamentos
  const medicamentos = [
    { 
      id: 1, 
      nome: "Losartana 50mg", 
      horario: "08:00", 
      status: "pendente", 
      familiar: "João Silva",
      dosagem: "1 comprimido",
      periodo: "Contínuo",
      ultimaRenovacao: "01/09/2024"
    },
    { 
      id: 2, 
      nome: "Sinvastatina 20mg", 
      horario: "20:00", 
      status: "tomado", 
      familiar: "João Silva",
      dosagem: "1 comprimido",
      periodo: "Contínuo",
      ultimaRenovacao: "01/09/2024"
    },
    { 
      id: 3, 
      nome: "Metformina 850mg", 
      horario: "12:00", 
      status: "pendente", 
      familiar: "Maria Santos",
      dosagem: "1 comprimido",
      periodo: "Contínuo",
      ultimaRenovacao: "01/09/2024"
    }
  ];

  // Consultas médicas
  const consultasMedicas = [
    {
      id: 1,
      tipo: "Cardiologista",
      medico: "Dr. Carlos Mendes",
      data: "2024-09-20",
      horario: "14:00",
      familiar: "João Silva",
      local: "Hospital São Lucas"
    },
    {
      id: 2,
      tipo: "Geriatra",
      medico: "Dra. Ana Santos",
      data: "2024-09-25",
      horario: "10:30",
      familiar: "Maria Santos",
      local: "Clínica Vida Nova"
    }
  ];

  // Atividades semanais - calendário semanal
  const atividadesSemana = [
    { 
      id: 1,
      dia: "Segunda", 
      data: "2024-09-16",
      atividade: "Fisioterapia", 
      horario: "09:00", 
      familiar: "João Silva",
      local: "Sala de Fisioterapia",
      duracao: "1 hora"
    },
    { 
      id: 2,
      dia: "Segunda", 
      data: "2024-09-16",
      atividade: "Hidroginástica", 
      horario: "14:00", 
      familiar: "Maria Santos",
      local: "Piscina",
      duracao: "45 minutos"
    },
    { 
      id: 3,
      dia: "Terça", 
      data: "2024-09-17",
      atividade: "Oficina de artes", 
      horario: "10:00", 
      familiar: "João Silva",
      local: "Sala de Artes",
      duracao: "1 hora"
    },
    { 
      id: 4,
      dia: "Quarta", 
      data: "2024-09-18",
      atividade: "Musicoterapia", 
      horario: "11:00", 
      familiar: "Maria Santos",
      local: "Sala de Música",
      duracao: "1 hora"
    },
    { 
      id: 5,
      dia: "Quinta", 
      data: "2024-09-19",
      atividade: "Fisioterapia", 
      horario: "09:00", 
      familiar: "João Silva",
      local: "Sala de Fisioterapia",
      duracao: "1 hora"
    },
    { 
      id: 6,
      dia: "Sexta", 
      data: "2024-09-20",
      atividade: "Alongamento", 
      horario: "15:00", 
      familiar: "ambos",
      local: "Sala de Atividades",
      duracao: "30 minutos"
    }
  ];

  // Cardápio semanal - calendário semanal
  const cardapioSemanal = [
    { 
      id: 1,
      dia: "Segunda", 
      data: "2024-09-16",
      refeicao: "Frango grelhado com legumes cozidos", 
      familiar: "ambos",
      tipo: "Almoço",
      observacoes: "Dieta hipossódica"
    },
    { 
      id: 2,
      dia: "Terça", 
      data: "2024-09-17",
      refeicao: "Peixe assado com arroz integral", 
      familiar: "ambos",
      tipo: "Almoço",
      observacoes: ""
    },
    { 
      id: 3,
      dia: "Quarta", 
      data: "2024-09-18",
      refeicao: "Sopa de legumes com frango", 
      familiar: "João Silva",
      tipo: "Jantar",
      observacoes: "Dieta pastosa"
    },
    { 
      id: 4,
      dia: "Quinta", 
      data: "2024-09-19",
      refeicao: "Lasanha de berinjela", 
      familiar: "ambos",
      tipo: "Almoço",
      observacoes: "Opção vegetariana"
    },
    { 
      id: 5,
      dia: "Sexta", 
      data: "2024-09-20",
      refeicao: "Filé de frango à parmegiana", 
      familiar: "ambos",
      tipo: "Almoço",
      observacoes: ""
    },
    { 
      id: 6,
      dia: "Sábado", 
      data: "2024-09-21",
      refeicao: "Feijoada light", 
      familiar: "ambos",
      tipo: "Almoço",
      observacoes: "Cardápio especial"
    }
  ];

  const familiarAtual = familiares[familiarSelecionado];

  const selecionarFamiliar = (index) => {
    setFamiliarSelecionado(index);
    setVisualizacao("familiar");
  };

  const voltarParaCasa = () => {
    setVisualizacao("casa");
  };

  const proximoFamiliar = () => {
    setFamiliarSelecionado((prev) => (prev + 1) % familiares.length);
  };

  const anteriorFamiliar = () => {
    setFamiliarSelecionado((prev) => (prev - 1 + familiares.length) % familiares.length);
  };

  const abrirModal = (item) => {
    setItemSelecionado(item);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setItemSelecionado(null);
  };

  // Filtrar dados baseado na visualização - para o idoso que o familiar estava filtrando
  const alertasFiltrados = visualizacao === "casa" 
    ? alertas
    : alertas.filter(alerta => 
        alerta.detalhes.titulo.includes(familiarAtual.nome.split(' ')[0])
      );

  const notificacoesFiltradas = visualizacao === "casa" 
    ? notificacoes
    : notificacoes;

  const medicamentosFiltrados = visualizacao === "casa"
    ? medicamentos
    : medicamentos.filter(med => med.familiar === familiarAtual.nome);

  const consultasFiltradas = visualizacao === "casa"
    ? consultasMedicas
    : consultasMedicas.filter(consulta => consulta.familiar === familiarAtual.nome);

  const atividadesFiltradas = visualizacao === "casa"
    ? atividadesSemana
    : atividadesSemana.filter(atv => atv.familiar === familiarAtual.nome || atv.familiar === "ambos");

  const cardapioFiltrado = visualizacao === "casa"
    ? cardapioSemanal
    : cardapioSemanal.filter(card => 
        card.familiar === familiarAtual.nome || card.familiar === "ambos"
      );

  // Funções para ter atividades e cardápio por data selecionada
  const obterAtividadesDoDia = (data) => {
    const dataString = data.toISOString().split('T')[0];
    return atividadesFiltradas.filter(atv => atv.data === dataString);
  };

  const obterCardapioDoDia = (data) => {
    const dataString = data.toISOString().split('T')[0];
    return cardapioFiltrado.filter(card => card.data === dataString);
  };

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 p-6 lg:p-2">
        <header className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-odara-dark">
                {visualizacao === "casa" ? "Área do Responsável" : `Acompanhamento - ${familiarAtual.nome}`}
              </h1>
              <p className="text-odara-dark/60 text-sm">
                {visualizacao === "casa" 
                  ? "Visão geral de todos os residentes" 
                  : `Parentesco: ${familiarAtual.parentesco}`}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={visualizacao === "casa" ? () => selecionarFamiliar(0) : voltarParaCasa}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  visualizacao === "casa" 
                    ? "bg-odara-primary text-white" 
                    : "bg-white text-odara-dark shadow hover:shadow-md"
                }`}
              >
                <Home size={20} />
                <span>{visualizacao === "casa" ? "Ver Familiar" : "Voltar para Casa"}</span>
              </button>

              {/* Contador de familiares */}
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
                <User className="text-odara-primary" size={20} />
                <span className="text-sm font-medium">
                  {familiares.length} residente{familiares.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Seletor de residentes*/}
          {visualizacao === "casa" && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {familiares.map((familiar, index) => (
                <div 
                  key={familiar.id}
                  className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition cursor-pointer"
                  onClick={() => selecionarFamiliar(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={familiar.foto}
                        alt={familiar.nome}
                        className="w-16 h-16 rounded-full object-cover border-4 border-odara-primary"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                        <User size={12} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-odara-dark text-lg">{familiar.nome}</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div>
                          <label className="text-gray-500">Idade/Quarto</label>
                          <p className="font-medium">{familiar.idade} anos • Quarto {familiar.quarto}</p>
                        </div>
                        <div>
                          <label className="text-gray-500">Parentesco/Status</label>
                          <p className="font-medium">{familiar.parentesco} • {familiar.status}</p>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-odara-dark/40" size={20} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {visualizacao === "familiar" && (
            <div className="mt-6 bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={familiarAtual.foto}
                      alt={familiarAtual.nome}
                      className="w-16 h-16 rounded-full object-cover border-4 border-odara-primary"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                      <User size={12} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-odara-dark text-xl">{familiarAtual.nome}</h3>
                    <p className="text-odara-dark/60">
                      {familiarAtual.idade} anos • Quarto {familiarAtual.quarto} • {familiarAtual.parentesco}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={anteriorFamiliar}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm font-medium px-4">
                    {familiarSelecionado + 1} de {familiares.length}
                  </span>
                  <button 
                    onClick={proximoFamiliar}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Informações pessoais sobre o residente selecionado */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t">
                <div className="text-center">
                  <label className="text-sm text-gray-500 block mb-1">Alergias</label>
                  <p className="font-medium text-sm">{familiarAtual.informacoes.alergias}</p>
                </div>
                <div className="text-center">
                  <label className="text-sm text-gray-500 block mb-1">Contato Emergência</label>
                  <p className="font-medium text-sm">{familiarAtual.informacoes.contatoEmergencia}</p>
                </div>
                <div className="text-center">
                  <label className="text-sm text-gray-500 block mb-1">Plano de Saúde</label>
                  <p className="font-medium text-sm">{familiarAtual.informacoes.planoSaude}</p>
                </div>
                <div className="text-center">
                  <label className="text-sm text-gray-500 block mb-1">Observações</label>
                  <p className="font-medium text-sm">{familiarAtual.informacoes.observacoes}</p>
                </div>
              </div>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {/* Solicitação de Documentos */}
            <Link 
              to="/familiar/documentos"
              className="block bg-white rounded-2xl shadow p-6 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-odara-dark">Solicitação de Documentos</h2>
                    <p className="text-odara-dark/60">Solicite relatórios, atestados e documentos médicos</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <span className="font-medium">Solicitar</span>
                  <ChevronRight size={20} />
                </div>
              </div>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Medicamentos */}
              <div 
                className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition cursor-pointer"
                onClick={() => setModalMedicamentosAberto(true)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-odara-dark flex items-center gap-2">
                    <Pill size={18} />
                    Medicamentos {visualizacao === "familiar" && `- ${familiarAtual.nome.split(' ')[0]}`}
                  </h3>
                  <Eye size={18} className="text-odara-dark/60" />
                </div>
                <div className="space-y-3">
                  {medicamentosFiltrados.slice(0, 3).map((medicamento) => (
                    <div key={medicamento.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{medicamento.nome}</p>
                        <p className="text-xs text-gray-500">{medicamento.horario} • {medicamento.dosagem}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        medicamento.status === 'tomado' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {medicamento.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cardápio Semanal - Agora com calendário */}
              <div 
                className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition cursor-pointer"
                onClick={() => setModalCardapioAberto(true)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-odara-dark flex items-center gap-2">
                    <Utensils size={18} />
                    Cardápio Semanal
                  </h3>
                  <Eye size={18} className="text-odara-dark/60" />
                </div>
                <Calendar 
                  value={dataAtividade}
                  onChange={setDataAtividade}
                  className="w-full border-0"
                />
                <div className="mt-4 space-y-2">
                  {obterCardapioDoDia(dataAtividade).slice(0, 2).map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                      <div className="bg-orange-100 p-2 rounded">
                        <Utensils size={16} className="text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.refeicao}</p>
                        <p className="text-xs text-gray-500">{item.tipo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Calendário de Consultas Médicas */}
              <div 
                className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition cursor-pointer"
                onClick={() => setModalConsultasAberto(true)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-odara-dark flex items-center gap-2">
                    <CalendarIcon size={18} />
                    Consultas Médicas
                  </h3>
                  <Eye size={18} className="text-odara-dark/60" />
                </div>
                <Calendar 
                  value={dataConsulta}
                  onChange={setDataConsulta}
                  className="w-full border-0"
                />
                <div className="mt-4 space-y-2">
                  {consultasFiltradas.slice(0, 2).map((consulta) => (
                    <div key={consulta.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                      <div className="bg-blue-100 p-2 rounded">
                        <Clock size={16} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{consulta.tipo}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(consulta.data).toLocaleDateString()} • {consulta.horario}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calendário de Atividades*/}
              <div 
                className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition cursor-pointer"
                onClick={() => setModalAtividadesAberto(true)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-odara-dark flex items-center gap-2">
                    <Activity size={18} />
                    Atividades da Semana
                  </h3>
                  <Eye size={18} className="text-odara-dark/60" />
                </div>
                <Calendar 
                  value={dataAtividade}
                  onChange={setDataAtividade}
                  className="w-full border-0"
                />
                <div className="mt-4 space-y-2">
                  {obterAtividadesDoDia(dataAtividade).slice(0, 2).map((atividade) => (
                    <div key={atividade.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                      <div className="bg-green-100 p-2 rounded">
                        <Activity size={16} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{atividade.atividade}</p>
                        <p className="text-xs text-gray-500">{atividade.horario}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Alertas e Notificações */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <IconWrapper icon={Bell} />
                <h2 className="text-xl font-semibold text-odara-dark">Alertas e Notificações</h2>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-odara-dark">Alertas</h3>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {alertasFiltrados.length}
                  </span>
                </div>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {alertasFiltrados.map((alerta) => (
                    <div key={alerta.id} className="p-3 rounded-lg border-l-4 border-red-500 bg-red-50">
                      <div className="flex items-start gap-2">
                        <IconWrapper icon={AlertCircle} size={20} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-odara-dark">{alerta.texto}</p>
                          <p className="text-xs text-gray-500 mt-1">{alerta.hora}</p>
                        </div>
                        <button
                          onClick={() => abrirModal(alerta)}
                          className="text-gray-400 hover:text-odara-dark transition-colors"
                          title="Ver detalhes"
                        >
                          <IconWrapper icon={Eye} size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-odara-dark">Notificações</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {notificacoesFiltradas.length}
                  </span>
                </div>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {notificacoesFiltradas.map((notificacao) => (
                    <div key={notificacao.id} className="p-3 rounded-lg border-l-4 border-blue-500 bg-blue-50">
                      <div className="flex items-start gap-2">
                        <IconWrapper icon={Info} size={20} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-odara-dark">{notificacao.texto}</p>
                          <p className="text-xs text-gray-500 mt-1">{notificacao.hora}</p>
                        </div>
                        <button
                          onClick={() => abrirModal(notificacao)}
                          className="text-gray-400 hover:text-odara-dark transition-colors"
                          title="Ver detalhes"
                        >
                          <IconWrapper icon={Eye} size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes das Notificações */}
      {modalAberto && itemSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-odara-dark">
                {itemSelecionado.detalhes.titulo}
              </h3>
              <button
                onClick={fecharModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IconWrapper icon={X} size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className={`p-2 rounded-full ${
                  itemSelecionado.tipo === 'alerta' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <IconWrapper 
                    icon={itemSelecionado.tipo === 'alerta' ? AlertCircle : Info} 
                    size={20} 
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{itemSelecionado.detalhes.descricao}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-odara-dark mb-2">Detalhes:</h4>
                <ul className="space-y-2">
                  {itemSelecionado.detalhes.lista.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 ${
                        itemSelecionado.tipo === 'alerta' ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-3 rounded-lg ${
                itemSelecionado.tipo === 'alerta' ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'
              }`}>
                <h4 className={`font-medium text-sm mb-1 ${
                  itemSelecionado.tipo === 'alerta' ? 'text-red-800' : 'text-blue-800'
                }`}>
                  Ação Recomendada:
                </h4>
                <p className={`text-sm ${
                  itemSelecionado.tipo === 'alerta' ? 'text-red-700' : 'text-blue-700'
                }`}>
                  {itemSelecionado.detalhes.acaoRecomendada}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t">
              <button
                onClick={fecharModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  console.log(`Ação tomada para: ${itemSelecionado.texto}`);
                  fecharModal();
                }}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                  itemSelecionado.tipo === 'alerta' 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                Marcar como Lida
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Medicamentos */}
      {modalMedicamentosAberto && (
        <Modal onClose={() => setModalMedicamentosAberto(false)} titulo="Gestão de Medicamentos">
          <div className="space-y-4">
            {medicamentosFiltrados.map((medicamento) => (
              <div key={medicamento.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-odara-dark">{medicamento.nome}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>Horário: {medicamento.horario}</span>
                      <span>•</span>
                      <span>Dosagem: {medicamento.dosagem}</span>
                      <span>•</span>
                      <span>Período: {medicamento.periodo}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Última renovação: {medicamento.ultimaRenovacao}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    medicamento.status === 'tomado' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {medicamento.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Modal de Atividades */}
      {modalAtividadesAberto && (
        <Modal onClose={() => setModalAtividadesAberto(false)} titulo="Calendário de Atividades">
          <div className="mb-4">
            <Calendar 
              value={dataAtividade}
              onChange={setDataAtividade}
              className="w-full border-0 mb-4"
            />
            <div className="space-y-3">
              <h4 className="font-semibold text-odara-dark">
                Atividades para {dataAtividade.toLocaleDateString('pt-BR')}
              </h4>
              {obterAtividadesDoDia(dataAtividade).length > 0 ? (
                obterAtividadesDoDia(dataAtividade).map((atividade) => (
                  <div key={atividade.id} className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-odara-dark">{atividade.atividade}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>Horário: {atividade.horario}</span>
                          <span>•</span>
                          <span>Duração: {atividade.duracao}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Local: {atividade.local}</p>
                        <p className="text-sm text-gray-600">Residente: {atividade.familiar}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Nenhuma atividade para esta data</p>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Modal de Consultas Médicas */}
      {modalConsultasAberto && (
        <Modal onClose={() => setModalConsultasAberto(false)} titulo="Consultas Médicas">
          <div className="space-y-4">
            {consultasFiltradas.map((consulta) => (
              <div key={consulta.id} className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-odara-dark">{consulta.tipo}</h3>
                    <p className="text-sm text-gray-600 mt-1">Médico: {consulta.medico}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>Data: {new Date(consulta.data).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Horário: {consulta.horario}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Local: {consulta.local}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Modal de Cardápio  */}
      {modalCardapioAberto && (
        <Modal onClose={() => setModalCardapioAberto(false)} titulo="Cardápio Semanal">
          <div className="mb-4">
            <Calendar 
              value={dataAtividade}
              onChange={setDataAtividade}
              className="w-full border-0 mb-4"
            />
            <div className="space-y-3">
              <h4 className="font-semibold text-odara-dark">
                Cardápio para {dataAtividade.toLocaleDateString('pt-BR')}
              </h4>
              {obterCardapioDoDia(dataAtividade).length > 0 ? (
                obterCardapioDoDia(dataAtividade).map((item) => (
                  <div key={item.id} className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <span className="font-semibold text-odara-dark">{item.tipo}</span>
                          <span className="text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded">
                            {item.dia}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{item.refeicao}</p>
                        {item.observacoes && (
                          <p className="text-xs text-gray-500 mt-1">Observações: {item.observacoes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Nenhum cardápio para esta data</p>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// Componente Modal Reutilizável
const Modal = ({ onClose, titulo, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-odara-dark">{titulo}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardFamiliar;