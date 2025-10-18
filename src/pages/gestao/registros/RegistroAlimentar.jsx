import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaTimes,
  FaInfoCircle,
  FaFilter,
  FaCheck,
  FaClock,
} from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";

const RegistroAlimentar = () => {
  const [registros, setRegistros] = useState([
    { id: 1, data: new Date(), horario: "07:30", refeicao: "Café da Manhã", alimento: "Pão, leite, fruta", residentes: "João Santos", status: "ativos", concluido: true },
    { id: 2, data: new Date(), horario: "12:00", refeicao: "Almoço", alimento: "Arroz, feijão, frango", residentes: "Maria Oliveira", status: "suspensos", concluido: false },
    { id: 3, data: new Date(), horario: "15:30", refeicao: "Lanche", alimento: "Bolo e suco", residentes: "João Santos", status: "finalizados", concluido: false },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [novoRegistro, setNovoRegistro] = useState({
    data: new Date().toISOString().split("T")[0],
    horario: "",
    refeicao: "Café da Manhã",
    alimento: "",
    residentes: "",
    status: "ativos",
  });
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [dataAtual, setDataAtual] = useState(new Date());
  const [filtroDia, setFiltroDia] = useState(null);
  const [filtroDiaAtivo, setFiltroDiaAtivo] = useState(false);
  const [filtroResidente, setFiltroResidente] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [infoVisivel, setInfoVisivel] = useState(false);

  // Novos estados para controle ativo
  const [controleAtivo, setControleAtivo] = useState(false);
  const [filtroControle, setFiltroControle] = useState('todos');

  // Dropdown aberto
  const [filtroResidenteAberto, setFiltroResidenteAberto] = useState(false);
  const [filtroStatusAberto, setFiltroStatusAberto] = useState(false);
  const [filtroControleAberto, setFiltroControleAberto] = useState(false);

  const REFEICOES = ["Café da Manhã", "Almoço", "Lanche", "Jantar"];
  const residentesUnicos = [...new Set(registros.map(r => r.residentes))];

  // Constantes para controle
  const CONTROLES = {
    TODOS: 'todos',
    CONCLUIDO: 'concluido',
    PENDENTE: 'pendente',
    ATRASADO: 'atrasado'
  };

  const ROTULOS_CONTROLES = {
    [CONTROLES.TODOS]: "Todos",
    [CONTROLES.CONCLUIDO]: "Concluído",
    [CONTROLES.PENDENTE]: "Pendente",
    [CONTROLES.ATRASADO]: "Atrasado"
  };

  // Estatísticas
  const obterRegistrosDoDia = (dia) => registros.filter(r => r.data.toDateString() === dia.toDateString());
  const obterRefeicoesDoDia = (dia) => obterRegistrosDoDia(dia);
  const obterResidentesDoDia = (dia) => [...new Set(obterRegistrosDoDia(dia).map(r => r.residentes))];
  
  const getEstatisticasDia = (dia) => {
    const registrosDoDia = obterRegistrosDoDia(dia);
    const concluidas = registrosDoDia.filter(r => r.concluido).length;
    const pendentes = registrosDoDia.filter(r => !r.concluido && new Date(r.data) >= new Date()).length;
    const atrasadas = registrosDoDia.filter(r => !r.concluido && new Date(r.data) < new Date()).length;
    return { total: registrosDoDia.length, concluidas, pendentes, atrasadas };
  };

  // Função para verificar se está atrasado
  const estaAtrasado = (registro) => {
    if (registro.concluido) return false;
    
    const agora = new Date();
    const dataRegistro = new Date(registro.data);
    const [hora, minuto] = registro.horario.split(':').map(Number);
    
    dataRegistro.setHours(hora, minuto, 0, 0);
    
    return agora > dataRegistro;
  };

  // Função para obter status de controle
  const getStatusControle = (registro) => {
    if (registro.concluido) return CONTROLES.CONCLUIDO;
    if (estaAtrasado(registro)) return CONTROLES.ATRASADO;
    return CONTROLES.PENDENTE;
  };

  // Toggle controle ativo
  const toggleControleAtivo = () => {
    const novoEstado = !controleAtivo;
    setControleAtivo(novoEstado);
    
    if (novoEstado) {
      // Quando ativar o controle, seleciona o dia atual se nenhum estiver selecionado
      if (!filtroDia) {
        setFiltroDia(new Date());
        setFiltroDiaAtivo(true);
      }
    } else {
      setFiltroControle('todos');
    }
  };

  // Funções básicas
  const abrirModalAdicionar = () => {
    setNovoRegistro({ data: new Date().toISOString().split("T")[0], horario: "", refeicao: "Café da Manhã", alimento: "", residentes: "", status: "ativos" });
    setEditando(false);
    setIdEditando(null);
    setModalAberto(true);
  };

  const abrirModalEditar = (id) => {
    const registro = registros.find(r => r.id === id);
    if (registro) {
      setNovoRegistro({ data: registro.data.toISOString().split("T")[0], horario: registro.horario, refeicao: registro.refeicao, alimento: registro.alimento, residentes: registro.residentes, status: registro.status || "ativos" });
      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  const salvarRegistro = () => {
    const dataObj = new Date(novoRegistro.data);
    if (editando && idEditando) {
      setRegistros(prev => prev.map(r => r.id === idEditando ? { ...r, ...novoRegistro, data: dataObj } : r));
    } else {
      const novo = { id: Date.now(), ...novoRegistro, data: dataObj, concluido: false };
      setRegistros(prev => [...prev, novo]);
    }
    setModalAberto(false);
  };

  const excluirRegistro = (id) => {
    if (window.confirm("Deseja excluir este registro?")) {
      setRegistros(prev => prev.filter(r => r.id !== id));
    }
  };

  const alternarConclusao = (id) => {
    setRegistros(prev => prev.map(r => r.id === id ? { ...r, concluido: !r.concluido } : r));
  };

  // Filtragem atualizada com controle ativo
  const registrosFiltrados = registros
    .filter(r => {
      // Filtro por dia
      const passaFiltroDia = !filtroDiaAtivo || (filtroDia && r.data.toDateString() === filtroDia.toDateString());
      
      // Filtro por residente
      const passaFiltroResidente = !filtroResidente || r.residentes === filtroResidente;
      
      // Filtro por status
      const passaFiltroStatus = filtroStatus === "todos" || r.status === filtroStatus;
      
      // Filtro por controle (apenas quando controle ativo)
      let passaFiltroControle = true;
      if (controleAtivo && filtroControle !== 'todos') {
        const statusControle = getStatusControle(r);
        passaFiltroControle = statusControle === filtroControle;
      }

      return passaFiltroDia && passaFiltroResidente && passaFiltroStatus && passaFiltroControle;
    })
    .sort((a, b) => a.data - b.data || a.horario.localeCompare(b.horario));

  const handleDayClick = (value) => {
    if (filtroDiaAtivo && filtroDia && value.toDateString() === filtroDia.toDateString()) {
      setFiltroDiaAtivo(false);
      setFiltroDia(null);
    } else {
      setFiltroDia(value);
      setFiltroDiaAtivo(true);
    }
  };

  const irParaHoje = () => { const hoje = new Date(); setDataAtual(hoje); setFiltroDia(hoje); setFiltroDiaAtivo(true); };
  
  const getTileClassName = ({ date, view }) => {
    const classes = ["relative"];
    const hoje = new Date();

    // Destacar o dia atual
    if (date.toDateString() === hoje.toDateString()) {
      classes.push("!bg-odara-primary/20 font-bold rounded-full");
    }

    // Destacar o dia filtrado
    if (filtroDiaAtivo && filtroDia && date.toDateString() === filtroDia.toDateString()) {
      classes.push("outline-2 outline outline-odara-accent outline-offset-[-1px] rounded-full");
    }

    return classes.join(" ");
  };

  const getTileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const registrosDoDia = registros.filter(r => r.data.toDateString() === date.toDateString());
    if (registrosDoDia.length === 0) return null;

    return (
      <div className="flex justify-center mt-1">
        <div className="bg-odara-accent text-white text-xs w-5 h-5 rounded-full flex justify-center items-center">
          {registrosDoDia.length}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 p-6 lg:p-10">
        {/* Cabeçalho */}
        <div className="flex justify-start items-center mb-6">
          <Link to="/gestao/PaginaRegistros" className="flex items-center text-odara-accent mr-4">
            <FaArrowLeft className="mr-1" />
          </Link>
          <h1 className="text-3xl font-bold text-odara-dark">Registro Alimentar</h1>
          <div className="relative ml-4">
            <button onMouseEnter={() => setInfoVisivel(true)} onMouseLeave={() => setInfoVisivel(false)} className="text-odara-accent hover:text-odara-secondary transition-colors duration-200">
              <FaInfoCircle size={20} />
            </button>
            {infoVisivel && (
              <div className="absolute z-10 left-0 top-full mt-2 w-72 p-3 bg-odara-dropdown text-odara-name text-sm rounded-lg shadow-lg">
                <h3 className="font-bold mb-2">Registro Alimentar</h3>
                <p>O Registro de Quadro Alimentar registra as refeições oferecidas aos residentes, com horário, tipo de refeição, alimentos e residentes.</p>
              </div>
            )}
          </div>
        </div>

        {/* Barra de filtros ATUALIZADA */}
        <div className="relative flex items-center gap-4 mb-6">
          {/* Botão Novo e Filtros */}
          <div className="relative flex items-center gap-4 mb-6">
            <button onClick={abrirModalAdicionar} className="bg-odara-accent hover:bg-odara-secondary text-white px-4 py-2 rounded-lg flex items-center">
              <FaPlus className="mr-2" /> Novo Registro
            </button>

            {/* Filtro residentes */}
            <div className="relative">
              <button
                className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition duration-200 w-full justify-center"
                onClick={() => {
                  setFiltroResidenteAberto(!filtroResidenteAberto);
                  setFiltroStatusAberto(false);
                  setFiltroControleAberto(false);
                }}
              >
                <FaFilter className="text-odara-accent mr-2" />
                {filtroResidente ? filtroResidente : "Residentes"}
              </button>

              {filtroResidenteAberto && (
                <div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-60 overflow-auto">
                  <button
                    onClick={() => {
                      setFiltroResidente('');
                      setFiltroResidenteAberto(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${!filtroResidente ? 'bg-indigo-100 font-semibold' : ''}`}
                  >
                    Todos
                  </button>
                  {[...new Set(registros.map(r => r.residentes).filter(Boolean))].map(residente => (
                    <button
                      key={residente}
                      onClick={() => {
                        setFiltroResidente(residente);
                        setFiltroResidenteAberto(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${filtroResidente === residente ? 'bg-indigo-100 font-semibold' : ''}`}
                    >
                      {residente}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filtro de Status */}
            <div className="relative">
              <button
                className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition w-full justify-center"
                onClick={() => {
                  setFiltroStatusAberto(!filtroStatusAberto);
                  setFiltroResidenteAberto(false);
                  setFiltroControleAberto(false);
                }}
              >
                <FaFilter className="text-odara-accent mr-2" />
                {filtroStatus === "todos" ? "Status" : filtroStatus.charAt(0).toUpperCase() + filtroStatus.slice(1)}
              </button>
              {filtroStatusAberto && (
                <div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  {["todos", "ativos", "suspensos", "finalizados"].map(status => (
                    <button
                      key={status}
                      onClick={() => { setFiltroStatus(status); setFiltroStatusAberto(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${filtroStatus === status ? 'bg-indigo-100 font-semibold' : ''}`}
                    >
                      {status === "todos" ? "Todos" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* NOVO: Botão Controle Ativo */}
            <button
              onClick={toggleControleAtivo}
              className={`flex items-center rounded-full px-4 py-2 shadow-sm border font-medium transition w-50 justify-center ${
                controleAtivo 
                  ? 'bg-odara-primary text-white border-odara-primary' 
                  : 'bg-gray-400 text-white border-gray-400 hover:bg-gray-500'
              }`}
            >
              {controleAtivo ? <FaCheck className="mr-2" /> : <FaClock className="mr-2" />}
              Controle {controleAtivo ? 'Ativo' : 'Inativo'}
            </button>

            {/* NOVO: Filtro de Controle (apenas quando controle está ativo) */}
            {controleAtivo && (
              <div className="relative">
                <button
                  className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition w-40 justify-center"
                  onClick={() => {
                    setFiltroControleAberto(!filtroControleAberto);
                    setFiltroResidenteAberto(false);
                    setFiltroStatusAberto(false);
                  }}
                >
                  <FaFilter className="text-odara-accent mr-2" />
                  Controle
                </button>

                {filtroControleAberto && (
                  <div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    {Object.entries(ROTULOS_CONTROLES).map(([valor, rotulo]) => (
                      <button
                        key={valor}
                        onClick={() => {
                          setFiltroControle(valor);
                          setFiltroControleAberto(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${filtroControle === valor ? 'bg-indigo-100 font-semibold' : ''}`}
                      >
                        {rotulo}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Botão Limpar Filtros quando algum filtro está ativo */}
            {(filtroDiaAtivo || filtroResidente || filtroStatus !== "todos" || (controleAtivo && filtroControle !== 'todos')) && (
              <button
                onClick={() => {
                  setFiltroDiaAtivo(false);
                  setFiltroDia(null);
                  setFiltroResidente('');
                  setFiltroStatus('todos');
                  if (controleAtivo) {
                    setFiltroControle('todos');
                  }
                }}
                className="flex items-center bg-odara-accent text-odara-white rounded-full px-4 py-2 shadow-sm font-medium hover:bg-odara-secondary transition"
              >
                <FaTimes className="mr-1" /> Limpar Filtros
              </button>
            )}
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Lista de registros */}
          <div className="bg-white rounded-xl shadow p-4 max-h-[600px] overflow-y-auto">
            {/* Indicadores de filtros ativos */}
            <div className="flex flex-wrap gap-2 mb-4">
              {filtroDiaAtivo && (
                <span className="text-sm bg-odara-accent text-odara-white px-2 py-1 rounded-full">
                  Dia: {filtroDia.getDate().toString().padStart(2, '0')}/{(filtroDia.getMonth() + 1).toString().padStart(2, '0')}
                </span>
              )}

              {filtroResidente && (
                <span className="text-sm bg-odara-secondary text-odara-white px-2 py-1 rounded-full">
                  Residente: {filtroResidente}
                </span>
              )}

              {filtroStatus !== "todos" && (
                <span className="text-sm bg-odara-dropdown-accent text-odara-white px-2 py-1 rounded-full">
                  Status: {filtroStatus.charAt(0).toUpperCase() + filtroStatus.slice(1)}
                </span>
              )}

              {controleAtivo && filtroControle !== 'todos' && (
                <span className="text-sm bg-odara-primary text-odara-white px-2 py-1 rounded-full">
                  Controle: {ROTULOS_CONTROLES[filtroControle]}
                </span>
              )}

              {controleAtivo && (
                <span className="text-sm bg-green-500 text-white px-2 py-1 rounded-full">
                  Modo Controle Ativo
                </span>
              )}
            </div>

            {registrosFiltrados.length === 0 ? (
              <p className="text-gray-500 text-center">
                {controleAtivo && !filtroDia 
                  ? 'Selecione um dia para ver os registros'
                  : controleAtivo && filtroControle !== 'todos'
                  ? `Nenhum registro ${ROTULOS_CONTROLES[filtroControle].toLowerCase()} encontrado`
                  : 'Nenhum registro encontrado'
                }
              </p>
            ) : (
              registrosFiltrados.map(r => {
                const statusControle = getStatusControle(r);
                return (
                  <div key={r.id} className="p-4 mb-4 rounded-xl border-l-4 border-odara-primary bg-odara-offwhite">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold">{r.refeicao} - {r.horario}</p>
                      <div className="flex gap-2">
                        <button onClick={() => abrirModalEditar(r.id)} className="p-1 text-white bg-blue-500 rounded"><FaEdit /></button>
                        <button onClick={() => excluirRegistro(r.id)} className="p-1 text-white bg-red-500 rounded"><FaTrash /></button>
                      </div>
                    </div>
                    <p><strong>Alimento:</strong> {r.alimento}</p>
                    <p><strong>Residente(s):</strong> {r.residentes}</p>
                    <p><strong>Status:</strong> {r.status}</p>
                    
                    {/* Controle de conclusão com indicador de status */}
                    <div className="flex items-center justify-between mt-2">
                      <label className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={r.concluido} 
                          onChange={() => alternarConclusao(r.id)} 
                        />
                        {r.concluido ? "Concluído" : "Pendente"}
                      </label>
                      
                      {controleAtivo && (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          statusControle === CONTROLES.CONCLUIDO 
                            ? 'bg-green-500 text-white' 
                            : statusControle === CONTROLES.ATRASADO 
                            ? 'bg-red-500 text-white'
                            : 'bg-yellow-500 text-white'
                        }`}>
                          {ROTULOS_CONTROLES[statusControle]}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Calendário e Estatísticas (mantido igual) */}
          <div className="bg-white rounded-2xl shadow-lg p-6 relative">
            <div className="flex justify-center mb-4">
              <button onClick={irParaHoje} className="bg-odara-accent hover:bg-odara-secondary text-white px-4 py-2 rounded-lg transition">Hoje</button>
            </div>
            <div className="flex justify-center border-2 border-odara-primary rounded-xl shadow-sm overflow-hidden max-w-md mx-auto">
              <Calendar
                onChange={handleDayClick}
                value={dataAtual}
                tileClassName={getTileClassName}
                tileContent={getTileContent}
                className="border-0 mx-auto max-w-[350px] rounded-xl shadow-sm p-2"
              />
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 mt-4 p-3 bg-odara-offwhite rounded-lg max-w-md mx-auto text-center">
              <h6 className="font-semibold text-odara-dark mb-2">Estatísticas do Dia:</h6>
              {filtroDia ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Refeição</span><span className="font-semibold">{obterRefeicoesDoDia(filtroDia).length}</span></div>
                  <div className="flex justify-between"><span>Residentes</span><span className="font-semibold">{obterResidentesDoDia(filtroDia).length}</span></div>
                  <div className="flex justify-between"><span>Administração</span><span className="font-semibold">{getEstatisticasDia(filtroDia).total}</span></div>

                  {/* Barras coloridas */}
                  <div className="flex justify-between gap-1 text-xs mt-2">
                    <div className="flex-1 bg-green-500 text-white px-1 py-0.5 rounded">{getEstatisticasDia(filtroDia).concluidas} ✓</div>
                    <div className="flex-1 bg-yellow-500 text-white px-1 py-0.5 rounded">{getEstatisticasDia(filtroDia).pendentes} ?</div>
                    <div className="flex-1 bg-red-500 text-white px-1 py-0.5 rounded">{getEstatisticasDia(filtroDia).atrasadas} !</div>
                  </div>

                  {/* Legenda */}
                  <div className="flex justify-between text-xs mt-1">
                    <span> Todos Administrados </span>
                    <span>Pendentes</span>
                    <span>Atrasados</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-odara-name/60">Selecione um dia no calendário para ver as estatísticas</p>
              )}
            </div>
          </div>

          {/* Modal (mantido igual) */}
          {modalAberto && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
              <div className="bg-white border-odara-primary border-l-4 rounded-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl text-odara-dark font-bold">{editando ? "Editar" : "Adicionar"} Registro</h2>
                  <button onClick={() => setModalAberto(false)}><FaTimes /></button>
                </div>
                <div className="space-y-4">
                  <div><label className="text-odara-dark font-medium">Data</label><input type="date" className="w-full border-odara-primary border p-2 rounded-lg" value={novoRegistro.data} onChange={e => setNovoRegistro({ ...novoRegistro, data: e.target.value })} /></div>
                  <div><label className="text-odara-dark font-medium">Horário</label><input type="time" className="w-full border-odara-primary border p-2 rounded-lg" value={novoRegistro.horario} onChange={e => setNovoRegistro({ ...novoRegistro, horario: e.target.value })} /></div>
                  <div><label className="text-odara-dark font-medium">Refeição</label><select className="w-full border-odara-primary border p-2 rounded-lg" value={novoRegistro.refeicao} onChange={e => setNovoRegistro({ ...novoRegistro, refeicao: e.target.value })}>{REFEICOES.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
                  <div><label className="text-odara-dark font-medium">Alimento *</label><input type="text" className="w-full border-odara-primary border p-2 rounded-lg" value={novoRegistro.alimento} onChange={e => setNovoRegistro({ ...novoRegistro, alimento: e.target.value })} /></div>
                  <div><label className="text-odara-dark font-medium">Residente(s)</label><input type="text" className="w-full border-odara-primary border p-2 rounded-lg" value={novoRegistro.residentes} onChange={e => setNovoRegistro({ ...novoRegistro, residentes: e.target.value })} /></div>
                  <div><label className="text-odara-dark font-medium">Status</label><select className="w-full border-odara-primary border p-2 rounded-lg" value={novoRegistro.status} onChange={e => setNovoRegistro({ ...novoRegistro, status: e.target.value })}><option value="ativos">Ativos</option><option value="suspensos">Suspensos</option><option value="finalizados">Finalizados</option></select></div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button className="px-4 py-2 text-odara-primary hover:text-odara-white hover:bg-odara-primary border-odara-primary border rounded-lg" onClick={() => setModalAberto(false)}>Cancelar</button>
                  <button className="px-4 py-2 bg-odara-accent hover:bg-odara-secondary text-white rounded-lg" onClick={salvarRegistro}>Salvar</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistroAlimentar;