import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pill,
  Microscope,
  Stethoscope,
  Hospital,
  AlertTriangle,
  BarChart as BarChartIcon,
  ClipboardList,
  Utensils,
  Star,
  Edit,
  Search,
  FileText,
  Users,
  Bell,
  AlertCircle,
  Info,
  Eye,
  Plus,
  X
} from "lucide-react";

const DashboardFuncionario = () => {
  const navigate = useNavigate();
  const [funcionalidadeSelecionada, setFuncionalidadeSelecionada] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const dadosDashboard = {
    checklistDia: 15,
    funcionariosAtribuidos: 8,
  };

  const funcionalidadesRegistro = [
    { 
      id: 1, 
      nome: "Medicamentos", 
      icon: Pill,
      consultarUrl: "/funcionario/checklist/medicamentos/check",
      editarUrl: "/funcionario/checklist/medicamentos/check"
    },
    { 
      id: 2, 
      nome: "Exames médicos", 
      icon: Microscope,
      consultarUrl: "/funcionario/checklist/exames/medicos",
      editarUrl: "/funcionario/checklist/exames/medicos"
    },
    { 
      id: 3, 
      nome: "Consultas médicas", 
      icon: Stethoscope,
      consultarUrl: "/funcionario/checklist/consultas/medicas",
      editarUrl: "/funcionario/checklist/consultas/medicas"
    },
    { 
      id: 4, 
      nome: "Atividades", 
      icon: ClipboardList,
      consultarUrl: "/funcionario/checklist/atividades",
      editarUrl: "/funcionario/checklist/atividades"
    },
    { 
      id: 5, 
      nome: "Alimentação", 
      icon: Utensils,
      consultarUrl: "/funcionario/checklist/alimentacao",
      editarUrl: "/funcionario/checklist/alimentacao"
    },
  ];

  const funcionalidadesCheck = [
    { 
      id: 6, 
      nome: "Registro de ocorrências", 
      icon: AlertTriangle,
      consultarUrl: "/funcionario/checklist/ocorrencias",
      editarUrl: "/funcionario/checklist/ocorrencias",
      registrarUrl: "/funcionario/checklist/ocorrencias"
    },
    { 
      id: 7, 
      nome: "Registro de preferências", 
      icon: Star,
      consultarUrl: "/funcionario/checklist/preferencias",
      editarUrl: "/funcionario/checklist/preferencias",
      registrarUrl: "/funcionario/checklist/preferencias"
    },
    { 
      id: 8, 
      nome: "Registro de comportamento", 
      icon: BarChartIcon,
      consultarUrl: "/funcionario/checklist/comportamento",
      editarUrl: "/funcionario/checklist/comportamento",
      registrarUrl: "/funcionario/checklist/comportamento"
    },
    { 
      id: 9, 
      nome: "Registro da saúde corporal", 
      icon: Hospital,
      consultarUrl: "/funcionario/saude/corporal",
      editarUrl: "/funcionario/saude/corporal",
      registrarUrl: "/funcionario/saude/corporal"
    },
  ];

  const funcionalidades = [
    ...funcionalidadesRegistro,
    ...funcionalidadesCheck,
  ];

  const alertas = [
    { 
      id: 1, 
      texto: "Checklist pendente para 3 funcionários", 
      tipo: "alerta", 
      hora: "09:30",
      detalhes: {
        titulo: "Checklists Pendentes - Detalhes",
        descricao: "Existem 3 funcionários com checklists pendentes para hoje:",
        lista: [
          "João Silva - Checklist de segurança",
          "Maria Santos - Checklist de equipamentos", 
          "Pedro Oliveira - Checklist de limpeza"
        ],
        acaoRecomendada: "Verificar com a equipe a conclusão dos checklists até o final do expediente."
      }
    },
    { 
      id: 3, 
      texto: "5 novos checklists atribuídos", 
      tipo: "alerta", 
      hora: "07:45",
      detalhes: {
        titulo: "Novos Checklists Atribuídos",
        descricao: "Foram atribuídos 5 novos checklists para sua equipe:",
        lista: [
          "Checklist de segurança - Área A",
          "Checklist de equipamentos - Turno manhã",
          "Checklist de qualidade - Produto X",
          "Checklist de limpeza - Cozinha",
          "Checklist de manutenção - Equipamento Y"
        ],
        acaoRecomendada: "Distribuir os checklists entre os funcionários disponíveis."
      }
    },
  ];

  const notificacoes = [
    { 
      id: 2, 
      texto: "Reunião de equipe às 14:00", 
      tipo: "info", 
      hora: "08:15",
      detalhes: {
        titulo: "Reunião de Equipe",
        descricao: "Reunião agendada para hoje às 14:00 na sala de reuniões principal.",
        lista: [
          "Horário: 14:00 - 15:30",
          "Local: Sala de Reuniões Principal", 
          "Pauta: Revisão mensal de métricas",
          "Participantes: Equipe completa"
        ],
        acaoRecomendada: "Confirmar presença e preparar relatórios solicitados."
      }
    },
    { 
      id: 4, 
      texto: "Relatório mensal devido sexta-feira", 
      tipo: "info", 
      hora: "Ontem",
      detalhes: {
        titulo: "Relatório Mensal - Prazo",
        descricao: "O relatório mensal de atividades está com prazo para sexta-feira.",
        lista: [
          "Tipo: Relatório Mensal de Atividades",
          "Prazo: Sexta-feira, 17:00",
          "Formato: Planilha padrão",
          "Envio: Sistema interno"
        ],
        acaoRecomendada: "Iniciar a compilação dos dados com antecedência."
      }
    },
    { 
      id: 5, 
      texto: "Atualização no sistema de checklist", 
      tipo: "info", 
      hora: "10:00",
      detalhes: {
        titulo: "Atualização do Sistema",
        descricao: "O sistema de checklist foi atualizado com novas funcionalidades:",
        lista: [
          "Nova interface de usuário",
          "Relatórios em tempo real", 
          "Exportação em PDF",
          "Notificações push"
        ],
        acaoRecomendada: "Familiarizar-se com as novas funcionalidades."
      }
    },
  ];

  const ActionButton = ({ icon: Icon, label, onClick, url }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e) => {
      e.stopPropagation();
      if (url) {
        navigate(url);
      } else if (onClick) {
        onClick();
      }
    };

    return (
      <div className="relative">
        <button
          className="p-2 rounded-full bg-odara-primary text-white transition-all duration-200 transform hover:scale-110 hover:bg-odara-primary/90"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Icon size={16} />
        </button>
        
        {isHovered && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
            <div className="bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
              {label}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const IconWrapper = ({ icon: Icon, size = 24, className = "" }) => (
    <Icon size={size} className={`text-odara-primary ${className}`} />
  );

  const abrirModal = (item) => {
    setItemSelecionado(item);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setItemSelecionado(null);
  };

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-odara-dark">Dashboard do Funcionário</h1>
          <p className="text-odara-dark/60 text-sm">Controle e monitoramento de atividades</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Checklists do Dia</h3>
                    <p className="text-3xl font-bold text-odara-dark mt-2">
                      {dadosDashboard.checklistDia}
                    </p>

                      <p className="text-sm font-medium text-yellow-400">+5 Checklists Pendentes</p>
                  </div>
                  <div className="p-3 rounded-full">
                    <IconWrapper icon={FileText} size={32} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Residentes Atribuídos</h3>
                    <p className="text-3xl font-bold text-odara-dark mt-2">
                      {dadosDashboard.funcionariosAtribuidos}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Total: 12 residentes</p>
                  </div>
                  <div className="p-3 rounded-full">
                    <IconWrapper icon={Users} size={32} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="text-xl font-semibold text-odara-dark mb-4">CHECKLISTS</h2>

            {/* Checklists */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              {funcionalidadesRegistro.map((func) => (
                <div
                  key={func.id}
                  className={`border border-gray-200 rounded-md p-3 hover:shadow-sm transition-all duration-200 ${
                    funcionalidadeSelecionada?.id === func.id
                      ? "ring-2 ring-odara-primary shadow-sm"
                      : "hover:border-odara-primary/30"
                  }`}
                  onClick={() => setFuncionalidadeSelecionada(func)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-md bg-odara-primary/10">
                      <IconWrapper icon={func.icon} />
                    </div>
                    <span className="text-sm font-medium text-odara-dark flex-1 truncate">
                      {func.nome}
                    </span>
                  </div>

                  <div className="flex justify-center gap-2 pt-2 border-t border-gray-100">
                    <ActionButton
                      icon={Eye}
                      label="Consultar"
                      url={func.consultarUrl}
                    />
                    <ActionButton
                      icon={Edit}
                      label="Editar"
                      url={func.editarUrl}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Linha separadora */}
            <hr className="border-gray-200 my-4" />

            {/* Registros */}
            <h2 className="text-xl font-semibold text-odara-dark mb-4">REGISTROS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {funcionalidadesCheck.map((func) => (
                <div
                  key={func.id}
                  className={`border border-gray-200 rounded-md p-3 hover:shadow-sm transition-all duration-200 ${
                    funcionalidadeSelecionada?.id === func.id
                      ? "ring-2 ring-odara-primary shadow-sm"
                      : "hover:border-odara-primary/30"
                  }`}
                  onClick={() => setFuncionalidadeSelecionada(func)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-md bg-odara-primary/10">
                      <IconWrapper icon={func.icon} />
                    </div>
                    <span className="text-sm font-medium text-odara-dark flex-1 truncate">
                      {func.nome}
                    </span>
                  </div>

                  <div className="flex justify-center gap-2 pt-2 border-t border-gray-100">
                    <ActionButton
                      icon={Eye}
                      label="Consultar"
                      url={func.consultarUrl}
                    />
                    <ActionButton
                      icon={Edit}
                      label="Editar"
                      url={func.editarUrl}
                    />
                    <ActionButton
                      icon={Plus}
                      label="Registrar"
                      url={func.registrarUrl}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <IconWrapper icon={Bell} />
                <h2 className="text-xl font-semibold text-odara-dark">Alertas e Notificações</h2>
              </div>
              
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
                    {notificacoes.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {notificacoes.map((notificacao) => (
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
    </div>
  );
};

export default DashboardFuncionario;