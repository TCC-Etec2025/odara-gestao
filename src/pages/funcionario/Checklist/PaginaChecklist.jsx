import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFilter, FaCheckCircle, FaClock, FaExclamationTriangle } from "react-icons/fa";

const PaginaChecklist = () => {
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroAberto, setFiltroAberto] = useState(false);

  const checklistsItems = [
    {
      id: 1,
      path: "consultas/medicas",
      label: "Consultas Médicas",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      status: "pendente",
      residentes: 3,
      prazo: "Hoje",
      descricao: "Registro de consultas e acompanhamentos médicos"
    },
    {
      id: 2,
      path: "alimentacao",
      label: "Alimentação",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
        </svg>
      ),
      status: "concluido",
      residentes: 8,
      prazo: "Hoje",
      descricao: "Controle de refeições e dieta dos residentes"
    },
    {
      id: 3,
      path: "ocorrencias",
      label: "Ocorrências",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      status: "pendente",
      residentes: 1,
      prazo: "Imediato",
      descricao: "Registro de incidentes e situações especiais"
    },
    {
      id: 4,
      path: "comportamento",
      label: "Comportamento",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      status: "pendente",
      residentes: 5,
      prazo: "Hoje",
      descricao: "Avaliação comportamental e humor dos residentes"
    },
    {
      id: 5,
      path: "exames/medicos",
      label: "Exames Médicos",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      status: "atrasado",
      residentes: 2,
      prazo: "Ontem",
      descricao: "Controle de exames e resultados médicos"
    },
    {
      id: 6,
      path: "medicamentos/check",
      label: "Medicamentos",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zM12 7v10m-5-5h10" />
        </svg>
      ),
      status: "pendente",
      residentes: 6,
      prazo: "Hoje",
      descricao: "Administração e controle de medicamentos"
    },
    {
      id: 7,
      path: "atividades",
      label: "Atividades",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      status: "concluido",
      residentes: 8,
      prazo: "Hoje",
      descricao: "Registro de atividades recreativas e terapêuticas"
    },
    {
      id: 8,
      path: "preferencias",
      label: "Preferencias",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      status: "concluido",
      residentes: 8,
      prazo: "Hoje",
      descricao: "Registro de atividades recreativas e terapêuticas"
    },
  ];

  // Filtros de status
  const opcoesFiltro = [
    { id: "todos", label: "Todos os Checklists", icone: <FaFilter /> },
    { id: "pendente", label: "Pendentes", icone: <FaClock /> },
    { id: "concluido", label: "Concluídos", icone: <FaCheckCircle /> },
    { id: "atrasado", label: "Atrasados", icone: <FaExclamationTriangle /> },
  ];

  const checklistsFiltrados = filtroStatus === "todos" 
    ? checklistsItems 
    : checklistsItems.filter(item => item.status === filtroStatus);

  // Estatísticas
  const estatisticas = {
    total: checklistsItems.length,
    pendentes: checklistsItems.filter(item => item.status === "pendente").length,
    concluidos: checklistsItems.filter(item => item.status === "concluido").length,
    atrasados: checklistsItems.filter(item => item.status === "atrasado").length,
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "concluido":
        return <FaCheckCircle className="text-green-500" />;
      case "pendente":
        return <FaClock className="text-yellow-500" />;
      case "atrasado":
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "concluido":
        return "bg-green-100 text-green-700";
      case "pendente":
        return "bg-yellow-100 text-yellow-700";
      case "atrasado":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "concluido":
        return "Concluído";
      case "pendente":
        return "Pendente";
      case "atrasado":
        return "Atrasado";
      default:
        return "Pendente";
    }
  };

  return (
    <div className="min-h-screen bg-odara-offwhite p-6 lg:p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-odara-dark">Meus Checklists</h1>
          <p className="text-odara-dark/60 text-sm">
            Checklist diários dos residentes sob sua responsabilidade
          </p>
        </div>

        {/* Filtro */}
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200 text-odara-dark font-medium hover:bg-odara-primary/10 transition"
            onClick={() => setFiltroAberto(!filtroAberto)}
          >
            <FaFilter className="text-odara-accent" />
            <span>
              {opcoesFiltro.find(filtro => filtro.id === filtroStatus)?.label}
            </span>
          </button>

          {filtroAberto && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 overflow-hidden min-w-48">
              {opcoesFiltro.map(filtro => (
                <button
                  key={filtro.id}
                  onClick={() => {
                    setFiltroStatus(filtro.id);
                    setFiltroAberto(false);
                  }}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm hover:bg-odara-primary/10 transition ${
                    filtroStatus === filtro.id
                      ? 'bg-odara-primary/20 text-odara-primary font-semibold'
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-odara-accent">{filtro.icone}</span>
                  <span>{filtro.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-odara-dark/60">Total</p>
              <h3 className="text-2xl font-bold text-odara-dark">{estatisticas.total}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <FaFilter className="text-blue-600 text-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-odara-dark/60">Pendentes</p>
              <h3 className="text-2xl font-bold text-odara-dark">{estatisticas.pendentes}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <FaClock className="text-yellow-600 text-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-odara-dark/60">Concluídos</p>
              <h3 className="text-2xl font-bold text-odara-dark">{estatisticas.concluidos}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <FaCheckCircle className="text-green-600 text-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-odara-dark/60">Atrasados</p>
              <h3 className="text-2xl font-bold text-odara-dark">{estatisticas.atrasados}</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-xl">
              <FaExclamationTriangle className="text-red-600 text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid de checklists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checklistsFiltrados.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-6 flex flex-col group hover:border-odara-primary/30"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-odara-primary/10 text-odara-primary group-hover:bg-odara-primary/20 transition">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-odara-dark group-hover:text-odara-primary transition">
                    {item.label}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(item.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações */}
            <div className="space-y-2 mb-4">
              <p className="text-sm text-odara-dark/70">{item.descricao}</p>
              
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1 text-odara-dark/60">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{item.residentes} residente(s)</span>
                </div>
                
                <div className={`flex items-center gap-1 ${
                  item.status === "atrasado" ? "text-red-600 font-medium" : "text-odara-dark/60"
                }`}>
                  <FaClock className="w-3 h-3" />
                  <span>{item.prazo}</span>
                </div>
              </div>
            </div>

            {/* Botão de ação */}
            <div className="flex justify-end mt-auto pt-4 border-t border-gray-100">
              <span className="text-odara-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                {item.status === "concluido" ? "Ver Checklist" : "Preencher Checklist"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Mensagem quando não tiver checklists */}
      {checklistsFiltrados.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
          <div className="p-4 bg-odara-offwhite rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FaFilter className="text-odara-dark/40 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-odara-dark mb-2">
            Nenhum checklist encontrado
          </h3>
          <p className="text-odara-dark/60">
            {filtroStatus !== "todos" 
              ? "Tente ajustar o filtro de status" 
              : "Todos os checklists estão em dia!"
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default PaginaChecklist;