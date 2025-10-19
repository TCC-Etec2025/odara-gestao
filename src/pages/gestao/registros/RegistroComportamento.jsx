import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaInfoCircle, FaTimes, FaArrowLeft, FaFilter, FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const RegistroComportamento = () => {
  const [comportamentos, setComportamentos] = useState([
    {
      id: 1,
      data: new Date(),
      horario: "10:00",
      titulo: "Calmo e colaborativo",
      descricao: "Residente apresentou comportamento calmo durante a atividade em grupo, participou ativamente e colaborou com os demais.",
      categoria: "positivo",
      residentes: "João Santos",
      foto: "../images/foto-idoso-joao.jpg",
      concluido: true
    },
    {
      id: 2,
      data: new Date(),
      horario: "11:00",
      titulo: "Agitado durante refeição",
      descricao: "Residente demonstrou agitação durante o almoço, necessitando de intervenção da equipe.",
      categoria: "negativo",
      residentes: "Maria Oliveira",
      foto: "../images/foto-idosa-maria.jpg",
      concluido: false
    },
    {
      id: 3,
      data: new Date(),
      horario: "14:30",
      titulo: "Participação em terapia",
      descricao: "Residente participou normalmente da sessão de terapia ocupacional.",
      categoria: "neutro",
      residentes: "Carlos Silva",
      foto: "../images/foto-idoso-carlos.jpg",
      concluido: true
    }
  ]);
  const FOTOS_RESIDENTES = {
    "João Santos": "../public/images/foto-idoso-joao.jpg",
    "Maria Oliveira": "../public/images/foto-idosa-maria.png",
  };

  const [residenteSelecionado, setResidenteSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [novaEntrada, setNovaEntrada] = useState({
    titulo: "",
    descricao: "",
    data: new Date().toISOString().split("T")[0],
    horario: "",
    residentes: "",
    categoria: "positivo",
    foto: ""
  });
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [infoVisivel, setInfoVisivel] = useState(false);

  const [mostrarConcluidos, setMostrarConcluidos] = useState(false);
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtroResidenteAberto, setFiltroResidenteAberto] = useState(false);
  const [filtroStatusAberto, setFiltroStatusAberto] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState("todos");

  // ===== CONSTANTES DE ESTILO =====
  const CATEGORIAS = {
    positivo: "bg-odara-primary/60 text-odara-dark",
    negativo: "bg-odara-dropdown-accent/80 text-odara-dark",
    neutro: "bg-odara-secondary/60 text-odara-dark"
  };

  const CORES_CATEGORIAS = {
    positivo: "bg-odara-primary",
    negativo: "bg-odara-dropdown-accent",
    neutro: "bg-odara-secondary"
  };

  const ROTULOS_CATEGORIAS = {
    positivo: "Positivo",
    negativo: "Negativo",
    neutro: "Neutro"
  };

  const FILTROS = [
    { id: "todos", label: "Todos" },
    { id: "positivo", label: "Positivo" },
    { id: "negativo", label: "Negativo" },
    { id: "neutro", label: "Neutro" },
  ];

  const STATUS_OPCOES = [
    { id: "todos", label: "Todos" },
    { id: "concluido", label: "Concluídos" },
    { id: "pendente", label: "Pendentes" },
  ];

  // ===== FUNÇÕES =====
  const salvarEntrada = () => {
    if (!novaEntrada.titulo || !novaEntrada.data) return;

    const partesData = novaEntrada.data.split("-");
    const dataObj = new Date(partesData[0], partesData[1] - 1, partesData[2]);

    if (editando && idEditando) {
      setComportamentos(prev =>
        prev.map(c => (c.id === idEditando ? { ...c, ...novaEntrada, data: dataObj } : c))
      );
    } else {
      setComportamentos(prev => [
        ...prev,
        { id: Date.now(), ...novaEntrada, data: dataObj, concluido: false }
      ]);
    }

    setModalAberto(false);
  };

  const excluirEntrada = id => {
    if (window.confirm("Tem certeza que deseja excluir este registro de comportamento?")) {
      setComportamentos(prev => prev.filter(c => c.id !== id));
      if (residenteSelecionado?.id === id) setResidenteSelecionado(null);
    }
  };

  const abrirModalEditar = id => {
    const c = comportamentos.find(c => c.id === id);
    if (c) {
      setNovaEntrada({ ...c, data: c.data.toISOString().split("T")[0] });
      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  const alternarConclusao = id => {
    setComportamentos(prev =>
      prev.map(c => (c.id === id ? { ...c, concluido: !c.concluido } : c))
    );
  };

  const abrirDetalhes = c => setResidenteSelecionado(c);

  // Calcular residentes únicos
  const residentesUnicos = [...new Set(comportamentos.map(c => c.residentes))].filter(Boolean);

  // Aplicando filtros
  const comportamentosFiltrados = comportamentos.filter(c => {
    const passaFiltroCategoria = filtroAtivo === "todos" || c.categoria === filtroAtivo;
    const passaFiltroStatus =
      (mostrarConcluidos && c.concluido) ||
      (!mostrarConcluidos && !c.concluido) ||
      residenteSelecionado;

    return passaFiltroCategoria && passaFiltroStatus;
  });

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 p-6 lg:p-10">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="flex items-center mb-1">
              <Link
                to="/gestao/PaginaRegistros"
                className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 flex items-center"
              >
                <FaArrowLeft className="mr-1" />
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-odara-dark mr-2">Registro de Comportamento</h1>
            <div className="relative">
              <button
                onMouseEnter={() => setInfoVisivel(true)}
                onMouseLeave={() => setInfoVisivel(false)}
                className="text-odara-dark hover:text-odara-secondary transition-colors duration-200"
              >
                <FaInfoCircle size={20} className='text-odara-accent hover:text-odara-secondary' />
              </button>
              {infoVisivel && (
                <div className="absolute z-10 left-0 top-full mt-2 w-72 p-3 bg-odara-dropdown text-odara-name text-sm rounded-lg shadow-lg">
                  <h3 className="font-bold mb-2">Registro de Comportamento</h3>
                  <p>
                    O registro de comportamento serve para documentar e acompanhar
                    os comportamentos dos residentes, identificando padrões positivos,
                    negativos e neutros para melhor atendimento e cuidado.
                  </p>
                  <div className="absolute bottom-full left-4 border-4 border-transparent border-b-gray-800"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botão novo registro */}
        <div className="relative flex items-center gap-4 mb-6">
          <button
            onClick={() => {
              setModalAberto(true);
              setEditando(false);
              setNovaEntrada({
                titulo: "",
                descricao: "",
                data: new Date().toISOString().split("T")[0],
                horario: "",
                residentes: "",
                categoria: "positivo",
                foto: ""
              });
            }}
            className="bg-odara-accent hover:bg-odara-secondary text-odara-white font-semibold py-2 px-4 rounded-lg flex items-center transition duration-200 text-sm sm:text-base"
          >
            <FaPlus className="mr-2 text-odara-white" /> Novo Registro
          </button>
        </div>

        {/* Barra de Filtros - Estilo igual ao Registro de Ocorrências */}
        <div className="relative flex flex-wrap items-center gap-2 sm:gap-4 mb-6">

          {/* Filtro por Residente */}
          <div className="relative dropdown-container">
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 font-medium hover:border-2 hover:border-odara-primary transition text-sm
                ${filtroResidenteAberto
                  ? 'border-odara-primary text-gray-700'
                  : 'border-odara-primary/40 text-gray-700'} 
                `}
              onClick={() => {
                setFiltroResidenteAberto(!filtroResidenteAberto);
                setFiltroStatusAberto(false);
                setFiltroAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Residentes
            </button>
            {filtroResidenteAberto && (
              <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-10 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setResidenteSelecionado(null);
                    setFiltroResidenteAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-odara-primary/20 transition-colors duration-200 ${!residenteSelecionado
                    ? 'bg-odara-accent/20 font-semibold text-odara-accent'
                    : 'text-odara-dark'
                    }`}
                >
                  Todos
                </button>
                {residentesUnicos.map(residente => (
                  <button
                    key={residente}
                    onClick={() => {
                      setResidenteSelecionado(residente);
                      setFiltroResidenteAberto(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-odara-primary/20 transition-colors duration-200 ${residenteSelecionado === residente
                      ? 'bg-odara-accent/20 font-semibold text-odara-accent'
                      : 'text-odara-dark'
                      }`}
                  >
                    {residente}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtro Categoria */}
          <div className="relative dropdown-container">
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 font-medium hover:border-2 hover:border-odara-primary transition text-sm
                ${filtroAberto
                  ? 'border-odara-primary text-gray-700'
                  : 'border-odara-primary/40 text-gray-700'} 
                `}
              onClick={() => {
                setFiltroAberto(!filtroAberto);
                setFiltroResidenteAberto(false);
                setFiltroStatusAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Categoria
            </button>
            {filtroAberto && (
              <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-10">
                {FILTROS.map((filtro) => (
                  <button
                    key={filtro.id}
                    onClick={() => {
                      setFiltroAtivo(filtro.id);
                      setFiltroAberto(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-odara-primary/20 transition-colors duration-200 ${filtroAtivo === filtro.id
                      ? 'bg-odara-accent/20 font-semibold text-odara-accent'
                      : 'text-odara-dark'
                      }`}
                  >
                    {filtro.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtro por Status */}
          <div className="relative dropdown-container">
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 
                ${filtroStatusAberto
                  ? 'border-odara-primary text-gray-700'
                  : 'border-odara-primary/40 text-gray-700'} 
                font-medium hover:border-2 hover:border-odara-primary transition text-sm`}
              onClick={() => {
                setFiltroStatusAberto(!filtroStatusAberto);
                setFiltroResidenteAberto(false);
                setFiltroAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Status
            </button>
            {filtroStatusAberto && (
              <div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-10">
                <button
                  onClick={() => {
                    setMostrarConcluidos(false);
                    setFiltroStatusAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-odara-primary/20 transition-colors duration-200 ${!mostrarConcluidos
                    ? 'bg-odara-accent/20 font-semibold text-odara-accent'
                    : 'text-odara-dark'
                    }`}
                >
                  Pendentes
                </button>
                <button
                  onClick={() => {
                    setMostrarConcluidos(true);
                    setFiltroStatusAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-odara-primary/20 transition-colors duration-200 ${mostrarConcluidos
                    ? 'bg-odara-accent/20 font-semibold text-odara-accent'
                    : 'text-odara-dark'
                    }`}
                >
                  Concluídos
                </button>
              </div>
            )}
          </div>

          {/* Botão Limpar Filtros */}
          {(filtroAtivo !== 'todos' || residenteSelecionado || mostrarConcluidos) && (
            <button
              onClick={() => {
                setFiltroAtivo('todos');
                setResidenteSelecionado(null);
                setMostrarConcluidos(false);
              }}
              className="flex items-center bg-odara-accent text-odara-white rounded-full px-4 py-2 shadow-sm font-medium hover:bg-odara-secondary transition"
            >
              <FaTimes className="mr-1" /> Limpar Filtros
            </button>
          )}
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* COLUNA ESQUERDA - LISTA DE COMPORTAMENTOS */}
          <div className="bg-odara-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-odara-dark flex items-center mb-2">
              {mostrarConcluidos ? 'Comportamentos Concluídos' : 'Comportamentos Pendentes'}
            </h2>

            {/* Filtros ativos */}
            <div className="flex flex-wrap gap-2 mb-4">
              {filtroAtivo !== 'todos' && (
                <span className="text-sm bg-odara-primary text-odara-white px-2 py-1 rounded-full">
                  Categoria: {ROTULOS_CATEGORIAS[filtroAtivo]}
                </span>
              )}
              {residenteSelecionado && (
                <span className="text-sm bg-odara-secondary text-odara-white px-2 py-1 rounded-full">
                  Residente: {residenteSelecionado}
                </span>
              )}
              {mostrarConcluidos && (
                <span className="text-sm bg-odara-dropdown-accent text-odara-white px-2 py-1 rounded-full">
                  Status: Concluído
                </span>
              )}
            </div>

            <p className="text-odara-name/60 mb-6">
              {mostrarConcluidos
                ? 'Registros de comportamento que foram concluídos e arquivados'
                : 'Registros de comportamento que precisam de atenção e acompanhamento'
              }
            </p>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {comportamentosFiltrados.length === 0 ? (
                <div className="p-6 rounded-xl bg-odara-name/10 text-center">
                  <p className="text-odara-dark/60">
                    {mostrarConcluidos
                      ? 'Nenhum comportamento concluído encontrado'
                      : 'Nenhum comportamento pendente encontrado'
                    }
                  </p>
                </div>
              ) : (
                comportamentosFiltrados.map((comportamento) => (
                  <div
                    key={comportamento.id}
                    className={`p-4 rounded-xl hover:shadow-md transition-shadow duration-200 ${CATEGORIAS[comportamento.categoria]}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${CORES_CATEGORIAS[comportamento.categoria]}`}></span>
                        <p className="text-base font-semibold">
                          {comportamento.data.getDate().toString().padStart(2, '0')}/
                          {(comportamento.data.getMonth() + 1).toString().padStart(2, '0')}/
                          {comportamento.data.getFullYear()}
                          {comportamento.horario && ` - ${comportamento.horario}`}
                        </p>
                      </div>

                      {/* Checkbox de Conclusão */}
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={comportamento.concluido}
                            onChange={() => alternarConclusao(comportamento.id)}
                            className="rounded border-odara-primary text-odara-accent focus:ring-odara-accent"
                          />
                          <span className={comportamento.concluido ? 'text-green-600 font-semibold' : 'text-odara-dark'}>
                            {comportamento.concluido ? 'Concluído' : 'Pendente'}
                          </span>
                        </label>
                      </div>
                    </div>

                    <h6 className="text-xl font-bold mb-1 flex items-center">
                      {comportamento.concluido && (
                        <span className="text-green-500 mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                      {comportamento.titulo}
                    </h6>

                    <p className="text-base mb-2">{comportamento.descricao}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <span className="bg-odara-dropdown text-odara-dropdown-name/60 px-2 py-1 rounded-md text-xs">
                          {ROTULOS_CATEGORIAS[comportamento.categoria]}
                        </span>

                        {comportamento.residentes && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="text-odara-name">{comportamento.residentes}</span>
                          </>
                        )}
                      </div>

                      {/* Botões de editar e excluir */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => abrirModalEditar(comportamento.id)}
                          className="text-odara-secondary hover:text-odara-dropdown-accent transition-colors duration-200 p-2 rounded-full hover:bg-odara-dropdown"
                          title="Editar comportamento"
                        >
                          <FaEdit size={14} />
                        </button>

                        <button
                          onClick={() => excluirEntrada(comportamento.id)}
                          className="text-odara-alerta hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-odara-alerta/50"
                          title="Excluir comportamento"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUNA DIREITA - DETALHES DO RESIDENTE */}
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
            <div className="flex flex-col items-center justify-center text-center">
              {residenteSelecionado ? (
                <>
                  <h2 className="text-2xl font-bold text-odara-dark mb-4">Detalhes do Residente</h2>

                  {/* Sistema de fotos por residente */}
                  {(() => {
                    // Mapeamento de fotos por nome do residente
                    const fotosResidentes = {
                      "João Santos": "../images/foto-idoso-joao.jpg",
                      "Maria Oliveira": "../images/foto-idosa-maria.jpg",
                      "Carlos Silva": "../images/foto-idoso-carlos.jpg",
                      "Ana Costa": "../images/foto-idosa-ana.jpg",
                      "Pedro Almeida": "../images/foto-idoso-pedro.jpg",
                      // Adicione mais residentes conforme necessário
                    };

                    const fotoResidente = fotosResidentes[residenteSelecionado.residentes] || "../images/avatar-default.jpg";

                    return (
                      <img
                        src={fotoResidente}
                        alt={residenteSelecionado.residentes}
                        className="w-32 h-32 rounded-full object-cover mb-4 shadow-md border-4 border-odara-primary"
                        onError={(e) => {
                          // Fallback caso a imagem não carregue
                          e.target.src = "../images/avatar-default.jpg";
                        }}
                      />
                    );
                  })()}

                  <h3 className="text-xl font-bold text-odara-dark mb-2">{residenteSelecionado.residentes}</h3>

                  {/* Informações do comportamento atual */}
                  <div className="w-full bg-odara-offwhite rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-odara-dark mb-2">Comportamento Registrado</h4>
                    <p className="text-odara-name font-medium mb-1">{residenteSelecionado.titulo}</p>
                    <p className="text-sm text-odara-name/70">{residenteSelecionado.descricao}</p>
                    <div className="flex justify-center mt-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${CATEGORIAS[residenteSelecionado.categoria]}`}>
                        {ROTULOS_CATEGORIAS[residenteSelecionado.categoria]}
                      </span>
                    </div>
                  </div>

                  {/* Histórico de comportamentos do residente */}
                  <div className="w-full mt-6">
                    <h4 className="font-semibold text-odara-dark mb-3 text-left">Histórico Recente</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {comportamentos
                        .filter(c => c.residentes === residenteSelecionado.residentes && c.id !== residenteSelecionado.id)
                        .slice(0, 3) // Mostra apenas os 3 mais recentes
                        .map(comportamento => (
                          <div
                            key={comportamento.id}
                            className="bg-white border border-odara-primary/20 rounded-lg p-3 text-left hover:bg-odara-offwhite cursor-pointer"
                            onClick={() => setResidenteSelecionado(comportamento)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm font-medium text-odara-dark">{comportamento.titulo}</p>
                                <p className="text-xs text-odara-name/60">
                                  {comportamento.data.getDate().toString().padStart(2, '0')}/
                                  {(comportamento.data.getMonth() + 1).toString().padStart(2, '0')}
                                </p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs ${CATEGORIAS[comportamento.categoria]}`}>
                                {ROTULOS_CATEGORIAS[comportamento.categoria].charAt(0)}
                              </span>
                            </div>
                          </div>
                        ))
                      }
                      {comportamentos.filter(c => c.residentes === residenteSelecionado.residentes && c.id !== residenteSelecionado.id).length === 0 && (
                        <p className="text-odara-name/60 text-sm text-center py-2">Nenhum outro registro</p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-odara-offwhite rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaInfoCircle className="text-odara-primary text-3xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-odara-dark mb-2">Nenhum residente selecionado</h3>
                  <p className="text-odara-name/60 text-sm">
                    Clique em um registro da lista para visualizar os detalhes do residente
                  </p>
                </div>
              )}
            </div>

            {/* Legenda das Categorias */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h6 className="font-semibold text-odara-dark mb-3 text-center">Legenda das Categorias</h6>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {Object.entries(ROTULOS_CATEGORIAS).map(([categoria, rotulo]) => (
                  <div key={categoria} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${CORES_CATEGORIAS[categoria]}`}></div>
                    <span className="text-odara-name">{rotulo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>



          {/* Modal para adicionar/editar comportamento */}
          {modalAberto && (
            <div className="fixed inset-0 bg-odara-offwhite/80 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border-l-4 border-odara-primary">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-odara-accent">
                    {editando ? 'Editar' : 'Adicionar'} Comportamento
                  </h2>
                  <button
                    onClick={() => setModalAberto(false)}
                    className="text-odara-primary hover:text-odara-secondary transition-colors duration-200"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Título do Comportamento *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      value={novaEntrada.titulo}
                      onChange={e => setNovaEntrada({ ...novaEntrada, titulo: e.target.value })}
                      placeholder="Descreva o comportamento observado"
                    />
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Descrição Detalhada</label>
                    <textarea
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      rows="3"
                      value={novaEntrada.descricao}
                      onChange={e => setNovaEntrada({ ...novaEntrada, descricao: e.target.value })}
                      placeholder="Descreva o comportamento em detalhes, contexto e observações"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-odara-dark font-medium mb-2">Data *</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                        value={novaEntrada.data}
                        onChange={e => setNovaEntrada({ ...novaEntrada, data: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-odara-dark font-medium mb-2">Horário</label>
                      <input
                        type="time"
                        className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                        value={novaEntrada.horario}
                        onChange={e => setNovaEntrada({ ...novaEntrada, horario: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Residente(s)</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      value={novaEntrada.residentes}
                      onChange={e => setNovaEntrada({ ...novaEntrada, residentes: e.target.value })}
                      placeholder="Nome do(s) residente(s) envolvido(s)"
                    />
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Categoria</label>
                    <select
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      value={novaEntrada.categoria}
                      onChange={e => setNovaEntrada({ ...novaEntrada, categoria: e.target.value })}
                    >
                      <option value="positivo">Positivo</option>
                      <option value="negativo">Negativo</option>
                      <option value="neutro">Neutro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Foto (URL)</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      value={novaEntrada.foto}
                      onChange={e => setNovaEntrada({ ...novaEntrada, foto: e.target.value })}
                      placeholder="URL da foto do residente"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setModalAberto(false)}
                    className="px-4 py-2 border-2 border-odara-primary text-odara-primary rounded-lg hover:bg-odara-primary hover:text-odara-white transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={salvarEntrada}
                    className="px-4 py-2 bg-odara-accent text-odara-white rounded-lg hover:bg-odara-secondary transition-colors duration-200"
                    disabled={!novaEntrada.titulo || !novaEntrada.data}
                  >
                    {editando ? 'Atualizar' : 'Salvar'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistroComportamento;