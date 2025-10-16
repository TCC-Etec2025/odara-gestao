import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFilter, FaSearch } from "react-icons/fa";

const PaginaRegistros = () => {
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const registrosItems = [
    {
      path: "/gestao/registros/medicamentos",
      label: "Registro de Medicamentos",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zM12 7v10m-5-5h10" />
        </svg>
      ),
      descricao: "Controle de administração e estoque de medicamentos",
    },
    {
      path: "/gestao/registros/consultas",
      label: "Registro de Consultas",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      descricao: "Agendamento e histórico de consultas médicas",
    },
    {
      path: "/gestao/registros/saudeInicial",
      label: "Registro de Saúde Corporal",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      descricao: "Acompanhamento de condições de saúde e sinais vitais",
    },
    {
      path: "/gestao/registros/exames",
      label: "Registro de Exames",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      descricao: "Controle de exames médicos e resultados",
    },
    {
      path: "/gestao/registros/preferencias",
      label: "Registro de Preferências",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      descricao: "Preferências pessoais e hábitos dos residentes",
    },
    {
      path: "/gestao/registros/atividades",
      label: "Registro de Atividades",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      descricao: "Programação e acompanhamento de atividades",
    },
    {
      path: "/gestao/registros/alimentar",
      label: "Registro Alimentar",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      descricao: "Controle de dieta e alimentação dos residentes",
    },
    {
      path: "/gestao/registros/ocorrencias",
      label: "Registro de Ocorrências",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      descricao: "Registro de incidentes e situações especiais",
    },
    {
      path: "/gestao/registros/comportamento",
      label: "Registro de Comportamento",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      descricao: "Avaliação comportamental e acompanhamento psicológico",
    },
  ];

  // Filtrar registros por busca
  const registrosFiltrados = registrosItems.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-odara-offwhite p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-odara-dark mb-2">Registros do Sistema</h1>
        <p className="text-odara-dark/60 text-sm">
          Central de gerenciamento de todos os registros da instituição
        </p>
      </div>

      {/* Barra de busca e filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar registros..."
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-odara-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-gray-200 text-odara-dark font-medium hover:bg-odara-primary/10 transition min-w-48 justify-between"
            onClick={() => setFiltroAberto(!filtroAberto)}
          >
            <span>Ordenar por</span>
            <FaFilter className="text-odara-accent" />
          </button>

          {filtroAberto && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 overflow-hidden min-w-48">
              <button
                onClick={() => setFiltroAberto(false)}
                className="block w-full text-left px-4 py-3 text-sm hover:bg-odara-primary/10 transition text-gray-700 border-b border-gray-100"
              >
                Nome (A-Z)
              </button>
              <button
                onClick={() => setFiltroAberto(false)}
                className="block w-full text-left px-4 py-3 text-sm hover:bg-odara-primary/10 transition text-gray-700"
              >
                Mais recentes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="mb-6">
        <p className="text-sm text-odara-dark/60">
          {registrosFiltrados.length} de {registrosItems.length} registros encontrados
          {searchTerm && (
            <span> para "{searchTerm}"</span>
          )}
        </p>
      </div>

      {/* Grid de registros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registrosFiltrados.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-6 flex flex-col group hover:border-odara-primary/30"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-xl text-odara-primary group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-odara-dark group-hover:text-odara-primary transition">
                  {item.label}
                </h3>
                <p className="text-sm text-odara-dark/60 mt-1">
                  {item.descricao}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end mt-auto pt-4 border-t border-gray-100">
              <span className="text-odara-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Acessar
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Mensagem quando não há registros quando mexer no filtro */}
      {registrosFiltrados.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
          <div className="p-4 bg-odara-offwhite rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FaSearch className="text-odara-dark/40 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-odara-dark mb-2">
            Nenhum registro encontrado
          </h3>
          <p className="text-odara-dark/60">
            {searchTerm 
              ? "Tente ajustar os termos da busca" 
              : "Não há registros disponíveis no momento"
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default PaginaRegistros;