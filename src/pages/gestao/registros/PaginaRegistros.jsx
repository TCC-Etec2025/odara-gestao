import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";


const PaginaRegistros = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [filtroAberto, setFiltroAberto] = useState(false);

  const registrosItems = [
    {
      category: "Registros de Saúde",
      items: [
        {
          path: "/gestao/registros/medicamentos",
          label: "Registro de Medicamentos",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zM12 7v10m-5-5h10" />
            </svg>
          ),
        },
        {
          path: "/gestao/registros/consultas",
          label: "Registro de Consultas",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          path: "/gestao/registros/saudeInicial",
          label: "Registro de Saúde Corporal",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          ),
        },
        {
          path: "/gestao/registros/exames",
          label: "Registro de Exames",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
        }
      ]
    },
    {
      category: "Rotina e Preferências",
      items: [
        {
          path: "/gestao/registros/preferencias",
          label: "Registro de Preferências",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          ),
        },
        {
          path: "/gestao/registros/atividades",
          label: "Registro de Atividades",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
        {
          path: "/gestao/registros/alimentar",
          label: "Registro Alimentar",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
        },
      ]
    },
    {
      category: "Incidentes e Comportamento",
      items: [
        {
          path: "/gestao/registros/ocorrencias",
          label: "Registro de Ocorrências",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
        },
        {
          path: "/gestao/registros/comportamento",
          label: "Registro de Comportamento",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
        },
      ]
    },
  ];

  // Filtros
  const opcoesFiltro = [
    { id: "Todas", label: "Todas as Categorias" },
    ...registrosItems.map(categoria => ({ id: categoria.category, label: categoria.category }))
  ];

  const itensFiltrados = categoriaAtiva === "Todas"
    ? registrosItems.flatMap(categoria => categoria.items)
    : registrosItems.find(cat => cat.category === categoriaAtiva)?.items || [];

  return (
    <div className="flex min-h-screen from-odara-offwhite to-odara-primary/30">
      <div className="flex-1 p-6 lg:p-10">
        <div>
          <h1 className="text-3xl font-bold text-odara-dark mb-1">Registros do Sistema</h1>
          <p className="text-odara-dark/60 text-sm">
            Central de gerenciamento de todos os registros da instituição
          </p>
        </div>

        {/* Mensagem filtro ativo */}
        {categoriaAtiva !== "Todas" && (
          <div className="bg-odara-primary/10 text-odara-primary px-4 py-2 rounded-lg inline-flex items-center w-fit">
            <span>Filtro ativo: {categoriaAtiva}</span>
            <button
              onClick={() => setCategoriaAtiva("Todas")}
              className="ml-2 text-odara-primary hover:text-odara-accent"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Grid de categorias */}
        {categoriaAtiva === "Todas" ? (
          registrosItems.map((categoria) => (
            <div key={categoria.category}>
              <h2 className="mt-6 text-xl text-odara-primary/70 mb-3">{categoria.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoria.items.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6 flex flex-col"
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-lg bg-odara-primary/10 text-odara-primary">
                        {item.icon}
                      </div>
                      <h3 className="ml-4 text-xl font-semibold text-odara-dark">{item.label}</h3>
                    </div>
                    <div className="flex justify-end mt-auto">
                      <span className="text-odara-primary font-medium flex items-center">
                        Acessar
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>
            <h2 className="mt-6 text-xl text-odara-primary/70 mb-3">{categoriaAtiva}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itensFiltrados.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6 flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-odara-primary/10 text-odara-primary">
                      {item.icon}
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-odara-dark">{item.label}</h3>
                  </div>
                  <div className="flex justify-end mt-auto">
                    <span className="text-odara-primary font-medium flex items-center">
                      Acessar
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mensagem quando não há itens */}
        {itensFiltrados.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-700">Nenhum registro encontrado</h3>
            <p className="mt-2 text-gray-500">Tente selecionar outra categoria ou verificar os filtros aplicados.</p>
          </div>
        )}
      </div>

      {/* Filtro */}
      <div className="mt-10 w-48 sticky top-10 ml-auto">
        <button
          className="flex items-center justify-between w-full bg-white rounded-full px-2 py-2 shadow-md border border-gray-200 text-odara-dark font-medium hover:bg-odara-primary/10 transition"
          onClick={() => setFiltroAberto(!filtroAberto)}
        >
          <span>{categoriaAtiva === "Todas" ? "Todas as Categorias" : categoriaAtiva}</span>
          <FaFilter className="text-odara-accent ml-2" />
        </button>

        {filtroAberto && (
          <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-hidden">
            {opcoesFiltro.map(filtro => (
              <button
                key={filtro.id}
                onClick={() => {
                  setCategoriaAtiva(filtro.id);
                  setFiltroAberto(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/10 transition ${categoriaAtiva === filtro.id
                  ? 'bg-odara-primary/20 text-odara-primary font-semibold'
                  : 'text-gray-700'
                  }`}
              >
                {filtro.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginaRegistros;