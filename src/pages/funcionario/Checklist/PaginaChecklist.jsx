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
      id: 4,
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
      id: 5,
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
  ];

  const opcoesFiltro = [
    { id: "todos", label: "Todos os Checklists", icone: <FaFilter /> },
    { id: "pendente", label: "Pendentes", icone: <FaClock /> },
    { id: "concluido", label: "Concluídos", icone: <FaCheckCircle /> },
    { id: "atrasado", label: "Atrasados", icone: <FaExclamationTriangle /> },
  ];

  const checklistsFiltrados = filtroStatus === "todos" 
    ? checklistsItems 
    : checklistsItems.filter(item => item.status === filtroStatus);

  const estatisticas = {
    total: checklistsItems.length,
    pendentes: checklistsItems.filter(item => item.status === "pendente").length,
    concluidos: checklistsItems.filter(item => item.status === "concluido").length,
    atrasados: checklistsItems.filter(item => item.status === "atrasado").length,
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "concluido": return <FaCheckCircle className="text-green-500 w-4 h-4" />;
      case "pendente": return <FaClock className="text-yellow-500 w-4 h-4" />;
      case "atrasado": return <FaExclamationTriangle className="text-red-500 w-4 h-4" />;
      default: return <FaClock className="text-gray-400 w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "concluido": return "bg-green-100 text-green-700";
      case "pendente": return "bg-yellow-100 text-yellow-700";
      case "atrasado": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "concluido": return "Concluído";
      case "pendente": return "Pendente";
      case "atrasado": return "Atrasado";
      default: return "Pendente";
    }
  };

  return (
    <div className="min-h-screen bg-odara-offwhite p-6 lg:p-8">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
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
            <span>{opcoesFiltro.find(filtro => filtro.id === filtroStatus)?.label}</span>
          </button>

          {filtroAberto && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 overflow-hidden min-w-48">
              {opcoesFiltro.map(filtro => (
                <button
                  key={filtro.id}
                  onClick={() => { setFiltroStatus(filtro.id); setFiltroAberto(false); }}
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

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: estatisticas.total, icon: <FaFilter className="text-blue-600" /> },
          { label: "Pendentes", value: estatisticas.pendentes, icon: <FaClock className="text-yellow-600" /> },
          { label: "Concluídos", value: estatisticas.concluidos, icon: <FaCheckCircle className="text-green-600" /> },
          { label: "Atrasados", value: estatisticas.atrasados, icon: <FaExclamationTriangle className="text-red-600" /> },
        ].map((estat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-odara-dark/60">{estat.label}</p>
              <h3 className="text-2xl font-bold text-odara-dark">{estat.value}</h3>
            </div>
            <div className="p-3 bg-gray-100 rounded-xl">{estat.icon}</div>
          </div>
        ))}
      </div>

      {/* Grid de checklists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checklistsFiltrados.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-6 flex flex-col group hover:border-odara-primary/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-odara-primary/10 text-odara-primary group-hover:bg-odara-primary/20 transition">
                {item.icon}
              </div>
              <div className="flex-1">
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

            <p className="text-sm text-odara-dark/70 mb-4">{item.descricao}</p>

            <div className="flex justify-between text-sm text-odara-dark/60 mb-4">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{item.residentes} residente(s)</span>
              </div>
              <div className={`flex items-center gap-1 ${item.status === "atrasado" ? "text-red-600 font-medium" : ""}`}>
                <FaClock className="w-3 h-3" />
                <span>{item.prazo}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
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

      {checklistsFiltrados.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
          <div className="p-4 bg-odara-offwhite rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FaFilter className="text-odara-dark/40 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-odara-dark mb-2">Nenhum checklist encontrado</h3>
          <p className="text-odara-dark/60">
            {filtroStatus !== "todos" ? "Tente ajustar o filtro de status" : "Todos os checklists estão em dia!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaginaChecklist;
