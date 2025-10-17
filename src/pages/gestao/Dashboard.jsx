import React, { useState } from "react";
import { 
  FaUsers, 
  FaUserTie, 
  FaExclamationTriangle, 
  FaClipboardList, 
  FaBell,
  FaArrowUp,
  FaArrowDown,
  FaPlus,
  FaFileAlt,
  FaUserCheck,
  FaChartLine,
  FaEye,
  FaTimes,
  FaInfoCircle
} from "react-icons/fa";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [modalAberto, setModalAberto] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const stats = {
    residentes: { valor: 45, tendencia: "+2", cor: "blue" },
    funcionarios: { valor: 18, tendencia: "+1", cor: "green" },
    alertas: { valor: 3, tendencia: "-1", cor: "red" },
  };

  // Simulação de Gráfico de Coluna
  const dadosMensais = [
    { mes: "Jan", residentes: 40, funcionarios: 15 },
    { mes: "Fev", residentes: 42, funcionarios: 16 },
    { mes: "Mar", residentes: 44, funcionarios: 18 },
    { mes: "Abr", residentes: 45, funcionarios: 18 },
  ];

  // Simulação de Gráfico de Pizza - Informações sobre os residentes da casa
  const dadosDistribuicao = [
    { name: "Ativos", value: 38 },
    { name: "Em tratamento", value: 5 },
    { name: "Alta recente", value: 2 },
  ];

  const CORES = ["#2D5B78", "#D8A4AA", "#FFEFDF"];

const alertas = [
  {
    id: 1,
    texto: "Checklists pendentes para 12 funcionários",
    tipo: "alerta",
    hora: "09:30",
    icon: <FaExclamationTriangle size={20} />,
    detalhes: {
      titulo: "Checklists Pendentes - Equipe",
      descricao: "Existem 12 funcionários com checklists pendentes para hoje:",
      lista: [
        "João Silva - Checklist de segurança",
        "Maria Santos - Checklist de equipamentos",
        "Pedro Oliveira - Checklist de limpeza",
        "Ana Costa - Checklist de alimentação",
        "Lucas Almeida - Checklist de medicamentos",
        "Fernanda Rocha - Checklist de atividades recreativas",
        "Carlos Lima - Checklist de manutenção",
        "Juliana Souza - Checklist de qualidade",
        "Marcos Pereira - Checklist de higiene pessoal",
        "Renata Martins - Checklist de enfermagem",
        "Ricardo Fernandes - Checklist de segurança",
        "Camila Ribeiro - Checklist de estoque"
      ],
      acaoRecomendada: "Distribuir tarefas para a equipe e garantir que todos os checklists sejam concluídos até o final do expediente."
    }
  },
  {
    id: 2,
    texto: "Alertas de atraso de checklists críticos",
    tipo: "alerta",
    hora: "11:00",
    icon: <FaExclamationTriangle size={20} />,
    detalhes: {
      titulo: "Checklists Atrasados",
      descricao: "Checklists críticos ainda não finalizados:",
      lista: [
        "João Silva - Checklist de segurança (Área A)",
        "Lucas Almeida - Checklist de medicamentos (Enfermaria 1)",
        "Juliana Souza - Checklist de qualidade (Cozinha)",
        "Carlos Lima - Checklist de manutenção (Prédio B)"
      ],
      acaoRecomendada: "Contactar os responsáveis imediatamente e priorizar finalização."
    }
  },
  {
    id: 3,
    texto: "Novos checklists atribuídos à equipe",
    tipo: "alerta",
    hora: "07:45",
    icon: <FaExclamationTriangle size={20} />,
    detalhes: {
      titulo: "Novos Checklists Atribuídos",
      descricao: "Foram atribuídos 15 novos checklists para os funcionários:",
      lista: [
        "Checklist de segurança - Área A",
        "Checklist de alimentação - Turno manhã",
        "Checklist de qualidade - Produto X",
        "Checklist de limpeza - Cozinha",
        "Checklist de manutenção - Equipamento Y",
        "Checklist de higiene pessoal - Enfermaria 2",
        "Checklist de enfermagem - Sala 3",
        "Checklist de estoque - Armazém 1",
        "Checklist de atividades recreativas - Sala comum",
        "Checklist de medicação - Sala 1",
        "Checklist de equipamentos - Oficina",
        "Checklist de segurança - Área B",
        "Checklist de alimentação - Turno tarde",
        "Checklist de limpeza - Banheiros",
        "Checklist de manutenção - Equipamento Z"
      ],
      acaoRecomendada: "Distribuir os checklists entre os funcionários disponíveis."
    }
  }
];

const notificacoes = [
  {
    id: 1,
    texto: "Reunião de gestão às 16:00",
    tipo: "info",
    hora: "08:15",
    icon: <FaInfoCircle size={20} />,
    detalhes: {
      titulo: "Reunião de Gestão",
      descricao: "Reunião agendada para hoje às 16:00 na sala de reuniões principal.",
      lista: [
        "Horário: 16:00 - 17:30",
        "Local: Sala de Reuniões Principal",
        "Pauta: Revisão semanal de métricas, checklists e performance da equipe",
        "Participantes: Gestores e supervisores"
      ],
      acaoRecomendada: "Preparar relatórios e acompanhar pendências antes da reunião."
    }
  },
  {
    id: 2,
    texto: "Relatórios semanais pendentes",
    tipo: "info",
    hora: "Ontem",
    icon: <FaInfoCircle size={20} />,
    detalhes: {
      titulo: "Relatórios Semanais",
      descricao: "Alguns relatórios de setores ainda não foram enviados:",
      lista: [
        "Setor de Enfermagem - Relatório de medicação",
        "Setor de Limpeza - Relatório de manutenção",
        "Setor de Alimentação - Relatório de refeições",
        "Setor de Atividades - Relatório de recreação"
      ],
      acaoRecomendada: "Solicitar envio dos relatórios antes do fechamento semanal."
    }
  },
  {
    id: 3,
    texto: "Atualização no sistema de checklist",
    tipo: "info",
    hora: "10:00",
    icon: <FaInfoCircle size={20} />,
    detalhes: {
      titulo: "Atualização do Sistema",
      descricao: "O sistema de checklist foi atualizado com novas funcionalidades:",
      lista: [
        "Dashboard para gestores com visão completa da equipe",
        "Notificações de atrasos em tempo real",
        "Exportação de relatórios detalhados",
        "Alertas de checklists críticos"
      ],
      acaoRecomendada: "Familiarizar-se com o dashboard do gestor e monitorar pendências."
    }
  }
];


  // Ações rápidas
  const acoesRapidas = [
    { id: 1, nome: "Novo Residente", icone: <FaPlus />, cor: "blue", acao: () => console.log("Novo residente") },
    { id: 2, nome: "Gerar Relatório", icone: <FaFileAlt />, cor: "green", acao: () => console.log("Gerar relatório") },
    { id: 3, nome: "Novo Funcionário", icone: <FaPlus />, cor: "purple", acao: () => console.log("Agendar atividade") },
    { id: 4, nome: "Ver Métricas", icone: <FaChartLine />, cor: "orange", acao: () => console.log("Ver métricas") },
  ];

  // Funções do modais
  const abrirModal = (item) => {
    setItemSelecionado(item);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setItemSelecionado(null);
  };

  return (
    <div className="min-h-screen bg-odara-offwhite p-6 lg:p-8">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-odara-dark">Dashboard Administrativo</h1>
            <p className="text-odara-dark/60 text-sm">Visão geral da gestão do sistema</p>
          </div>
          <select 
            className="bg-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-odara-primary shadow-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">Esta Semana</option>
            <option value="month">Este Mês</option>
            <option value="quarter">Este Trimestre</option>
            <option value="year">Este Ano</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
          
          {/* Cards de estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(stats).map(([key, stat]) => (
              <Card 
                key={key}
                titulo={key.charAt(0).toUpperCase() + key.slice(1)}
                valor={stat.valor}
                tendencia={stat.tendencia}
                icone={getIcone(key)}
                cor={stat.cor}
              />
            ))}
          </div>

          {/* Gráfico de Barra */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-odara-dark">
                  Estatísticas Mensais
                </h2>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-odara-primary rounded"></div>
                    <span className="text-odara-dark/70">Residentes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-odara-name rounded"></div>
                    <span className="text-odara-dark/70">Funcionários</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={450}>
                <BarChart data={dadosMensais}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
                  <XAxis 
                    dataKey="mes" 
                    tick={{ fill: '#6B7280' }}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6B7280' }}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="residentes" 
                    fill="#D8A4AA" 
                    radius={[8, 8, 0, 0]}
                    className="hover:opacity-80 transition-opacity"
                  />
                  <Bar 
                    dataKey="funcionarios" 
                    fill="#2D5B78" 
                    radius={[8, 8, 0, 0]}
                    className="hover:opacity-80 transition-opacity"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico de Pizza e ações rápidas */}
            <div className="space-y-6">
              {/* Gráfico de Pizza */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-odara-dark mb-4">
                  Distribuição
                </h2>
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie
                      data={dadosDistribuicao}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {dadosDistribuicao.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2 mt-4 text-xs">
                  {dadosDistribuicao.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: CORES[index] }}
                        ></div>
                        <span className="text-odara-dark/70">{item.name}</span>
                      </div>
                      <span className="font-medium text-odara-dark">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ações rápidas */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-odara-dark mb-4">
                  Ações Rápidas - Atalhos
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {acoesRapidas.map((acao) => (
                    <button
                      key={acao.id}
                      onClick={acao.acao}
                      className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all hover:scale-105 ${
                        acao.cor === 'blue' ? 'bg-blue-50 hover:bg-blue-100 text-blue-600' :
                        acao.cor === 'green' ? 'bg-green-50 hover:bg-green-100 text-green-600' :
                        acao.cor === 'purple' ? 'bg-purple-50 hover:bg-purple-100 text-purple-600' :
                        'bg-orange-50 hover:bg-orange-100 text-orange-600'
                      }`}
                    >
                      <div className="text-lg">{acao.icone}</div>
                      <span className="text-xs font-medium text-center">{acao.nome}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna de notificações */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow p-6 h-full sticky top-6">
            <div className="flex items-center gap-2 mb-4">
              <FaBell className="text-odara-dark" size={24} />
              <h2 className="text-xl font-semibold text-odara-dark">Alertas e Notificações</h2>
            </div>
            
            {/* Seção de Alertas */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-odara-dark">Alertas</h3>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                  {alertas.length}
                </span>
              </div>
              <div className="space-y-3">
                {alertas.map((alerta) => (
                  <div key={alerta.id} className="p-3 rounded-lg border-l-4 border-red-500 bg-red-50">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 text-red-600">
                        {alerta.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-odara-dark">{alerta.texto}</p>
                        <p className="text-xs text-gray-500 mt-1">{alerta.hora}</p>
                      </div>
                      <button
                        onClick={() => abrirModal(alerta)}
                        className="text-gray-400 hover:text-odara-dark transition-colors"
                        title="Ver detalhes"
                      >
                        <FaEye size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Linha divisória */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Seção de Notificações */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-odara-dark">Notificações</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {notificacoes.length}
                </span>
              </div>
              <div className="space-y-3">
                {notificacoes.map((notificacao) => (
                  <div key={notificacao.id} className="p-3 rounded-lg border-l-4 border-blue-500 bg-blue-50">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 text-blue-600">
                        {notificacao.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-odara-dark">{notificacao.texto}</p>
                        <p className="text-xs text-gray-500 mt-1">{notificacao.hora}</p>
                      </div>
                      <button
                        onClick={() => abrirModal(notificacao)}
                        className="text-gray-400 hover:text-odara-dark transition-colors"
                        title="Ver detalhes"
                      >
                        <FaEye size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes */}
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
                <FaTimes size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className={`p-2 rounded-full ${
                  itemSelecionado.tipo === 'alerta' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {itemSelecionado.icon}
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
    </div>
  );
};

// Card 
const Card = ({ titulo, valor, tendencia, icone, cor }) => {
  const estilos = {
    blue: { bg: "bg-blue-50", text: "text-blue-600", tendencia: "text-blue-600" },
    green: { bg: "bg-green-50", text: "text-green-600", tendencia: "text-green-600" },
    red: { bg: "bg-red-50", text: "text-red-600", tendencia: "text-red-600" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", tendencia: "text-purple-600" },
  };

  const estilo = estilos[cor];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-odara-dark/60 mb-1">{titulo}</p>
          <h3 className="text-2xl font-bold text-odara-dark mb-2">{valor}</h3>
          <div className={`flex items-center gap-1 text-xs ${estilo.tendencia}`}>
            {tendencia.startsWith('+') ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
            <span>{tendencia}</span>
          </div>
        </div>
        <div className={`${estilo.bg} p-3 rounded-xl`}>
          <div className={estilo.text}>
            {icone}
          </div>
        </div>
      </div>
    </div>
  );
};

// Funções auxiliares para os ícones
const getIcone = (tipo) => {
  switch (tipo) {
    case "residentes":
      return <FaUsers />;
    case "funcionarios":
      return <FaUserTie />;
    case "alertas":
      return <FaExclamationTriangle />;
    case "ocupacao":
      return <FaUserCheck />;
    default:
      return <FaClipboardList />;
  }
};

export default Dashboard;