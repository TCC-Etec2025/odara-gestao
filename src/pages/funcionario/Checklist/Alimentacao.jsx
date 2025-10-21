import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaCheck, FaTimes, FaArrowUp, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Alimentacao = () => {
  // ===== ESTADOS DO COMPONENTE =====

  // Estado para dados de exemplo (refeições)
  const [refeicoes, setRefeicoes] = useState([
    // Refeições para hoje (data atual)
    {
      id: 1,
      residente: "João Santos",
      tipoRefeicao: "Café da Manhã",
      cardapio: "Pão integral, queijo branco, suco de laranja, mamão",
      horario: "07:30",
      observacoes: "Dieta sem glúten - usar pão sem glúten",
      local: "Refeitório Principal",
      status: "pendente",
      dataRefeicao: new Date()
    },
    {
      id: 2,
      residente: "Maria Oliveira",
      tipoRefeicao: "Almoço",
      cardapio: "Arroz integral, feijão, frango grelhado, salada de alface e tomate",
      horario: "12:00",
      observacoes: "Dieta hipossódica - sem adição de sal",
      local: "Quarto 2B-1",
      status: "pendente",
      dataRefeicao: new Date()
    },
    {
      id: 3,
      residente: "Ana Fagundes",
      tipoRefeicao: "Café da Manhã",
      cardapio: "Aveia, banana, leite desnatado, torradas",
      horario: "08:00",
      observacoes: "Intolerante à lactose - usar leite de amêndoas",
      local: "Refeitório Principal",
      status: "concluido",
      dataRefeicao: new Date()
    },
    {
      id: 4,
      residente: "Felipe Silva",
      tipoRefeicao: "Jantar",
      cardapio: "Sopa de legumes, pão integral, fruta",
      horario: "18:30",
      observacoes: "Dificuldade de mastigação - sopa bem batida",
      local: "Quarto 1B-3",
      status: "pendente",
      dataRefeicao: new Date()
    },
    {
      id: 5,
      residente: "Roberta Costa",
      tipoRefeicao: "Lanche da Tarde",
      cardapio: "Iogurte natural, granola, melão",
      horario: "15:30",
      observacoes: "Dieta diabética - sem adição de açúcar",
      local: "Sala de Convivência",
      status: "pendente",
      dataRefeicao: new Date()
    },
    // Refeições para outros dias
    {
      id: 6,
      residente: "Carlos Mendes",
      tipoRefeicao: "Café da Manhã",
      cardapio: "Omelete, pão francês, café, fruta",
      horario: "07:00",
      observacoes: "Dieta rica em proteínas",
      local: "Refeitório Principal",
      status: "pendente",
      dataRefeicao: new Date(new Date().setDate(new Date().getDate() - 2))
    },
    {
      id: 7,
      residente: "Beatriz Hishimoto",
      tipoRefeicao: "Almoço",
      cardapio: "Peixe assado, purê de batata, brócolis cozido",
      horario: "12:30",
      observacoes: "Dieta ovolactovegetariana",
      local: "Refeitório Principal",
      status: "pendente",
      dataRefeicao: new Date(new Date().setDate(new Date().getDate() + 1))
    },
  ]);

  // Estados para filtros
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroResidente, setFiltroResidente] = useState('todos');
  const [filtroData, setFiltroData] = useState(new Date());
  const [filtroTipoRefeicao, setFiltroTipoRefeicao] = useState('todos');

  // Estados para controle de interface
  const [calendarioAberto, setCalendarioAberto] = useState(false);
  const [filtroResidenteAberto, setFiltroResidenteAberto] = useState(false);
  const [filtroStatusAberto, setFiltroStatusAberto] = useState(false);
  const [filtroTipoRefeicaoAberto, setFiltroTipoRefeicaoAberto] = useState(false);
  const [mostrarScrollTop, setMostrarScrollTop] = useState(false);

  // ===== CONSTANTES E CONFIGURAÇÕES =====

  // Refs para os dropdowns
  const statusRef = useRef(null);
  const residenteRef = useRef(null);
  const dataRef = useRef(null);
  const tipoRefeicaoRef = useRef(null);

  // Opções de status
  const STATUS = {
    TODOS: 'todos',
    PENDENTE: 'pendente',
    ATRASADO: 'atrasado',
    CONCLUIDO: 'concluido'
  };

  // Rótulos para exibição do Título de acordo com o status
  const ROTULOS_STATUS = {
    [STATUS.TODOS]: "Todas as Refeições",
    [STATUS.PENDENTE]: "Refeições Pendentes",
    [STATUS.ATRASADO]: "Refeições em Atraso",
    [STATUS.CONCLUIDO]: "Refeições Concluídas"
  };

  // Rótulos simplificados para as opções de filtros
  const ROTULOS_FILTRO_STATUS = {
    [STATUS.TODOS]: "Todos",
    [STATUS.PENDENTE]: "Pendentes",
    [STATUS.ATRASADO]: "Atrasados",
    [STATUS.CONCLUIDO]: "Concluídos"
  };

  // ===== FUNÇÕES AUXILIARES =====

  // Função para obter lista única de residentes
  const obterResidentes = () => {
    return [...new Set(refeicoes.map(ref => ref.residente))];
  };

  // Função para obter lista única de tipos de refeição
  const obterTiposRefeicao = () => {
    return [...new Set(refeicoes.map(ref => ref.tipoRefeicao))];
  };

  // Função para formatar data para exibição
  const formatarData = (data) => {
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Função para extrair hora do horário (para ordenação)
  const extrairHora = (horario) => {
    const [hora, minuto] = horario.split(':').map(Number);
    return hora * 60 + minuto;
  };

  // Função para verificar se o horário já passou (considerando 15 minutos de tolerância)
  const verificarHorarioPassou = (horario, dataRefeicao) => {
    const agora = new Date();
    const [hora, minuto] = horario.split(':').map(Number);

    const horarioRefeicao = new Date(dataRefeicao);
    horarioRefeicao.setHours(hora, minuto, 0, 0);

    const horarioComTolerancia = new Date(horarioRefeicao.getTime() + 15 * 60 * 1000);

    return agora > horarioComTolerancia;
  };

  // Função para verificar se a refeição é para a data selecionada
  const ehParaDataSelecionada = (dataRefeicao) => {
    const dataSelecionada = new Date(filtroData);
    dataSelecionada.setHours(0, 0, 0, 0);

    const dataRef = new Date(dataRefeicao);
    dataRef.setHours(0, 0, 0, 0);

    return dataRef.getTime() === dataSelecionada.getTime();
  };

  // Função para determinar o status dinâmico da refeição
  const obterStatusDinamico = (refeicao) => {
    if (refeicao.status === 'concluido') {
      return 'concluido';
    }

    if (ehParaDataSelecionada(refeicao.dataRefeicao)) {
      if (verificarHorarioPassou(refeicao.horario, refeicao.dataRefeicao)) {
        return 'atrasado';
      }
      return 'pendente';
    }

    const dataSelecionada = new Date(filtroData);
    dataSelecionada.setHours(0, 0, 0, 0);

    const dataRef = new Date(refeicao.dataRefeicao);
    dataRef.setHours(0, 0, 0, 0);

    if (dataRef < dataSelecionada) {
      return 'atrasado';
    }

    return 'pendente';
  };

  // ===== FUNÇÕES DE FILTRAGEM E ORDENAÇÃO =====

  // Função principal para filtrar refeições
  const obterRefeicoesFiltradas = () => {
    return refeicoes
      .filter(refeicao => {
        const passaData = ehParaDataSelecionada(refeicao.dataRefeicao);
        if (!passaData) return false;

        const statusFinal = obterStatusDinamico(refeicao);
        const passaStatus = filtroStatus === STATUS.TODOS || statusFinal === filtroStatus;
        const passaResidente = filtroResidente === 'todos' || refeicao.residente === filtroResidente;
        const passaTipoRefeicao = filtroTipoRefeicao === 'todos' || refeicao.tipoRefeicao === filtroTipoRefeicao;

        return passaStatus && passaResidente && passaTipoRefeicao;
      })
      .map(refeicao => {
        const statusFinal = obterStatusDinamico(refeicao);
        return {
          ...refeicao,
          statusFinal: statusFinal
        };
      })
      .sort((a, b) => {
        const horaA = extrairHora(a.horario);
        const horaB = extrairHora(b.horario);
        if (horaA !== horaB) return horaA - horaB;
        return a.residente.localeCompare(b.residente);
      });
  };

  // ===== FUNÇÕES DE CONTROLE DE DATA =====

  const irParaOntem = () => {
    const ontem = new Date(filtroData);
    ontem.setDate(ontem.getDate() - 1);
    setFiltroData(ontem);
  };

  const irParaAmanha = () => {
    const amanha = new Date(filtroData);
    amanha.setDate(amanha.getDate() + 1);
    setFiltroData(amanha);
  };

  const irParaHoje = () => {
    setFiltroData(new Date());
  };

  // ===== FUNÇÕES DE CONTROLE DE SCROLL =====

  const verificarScroll = () => {
    const container = document.getElementById('checklist-container');
    const scrollPagina = window.scrollY > 100;
    const scrollContainer = container ? container.scrollTop > 100 : false;
    setMostrarScrollTop(scrollPagina || scrollContainer);
  };

  const scrollParaTopo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const container = document.getElementById('checklist-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ===== FUNÇÕES DE CONTROLE DE REFEIÇÃO =====

  const toggleRefeicao = (id) => {
    setRefeicoes(anterior => anterior.map(ref => {
      if (ref.id === id) {
        const novoStatus = ref.status === 'concluido' ? 'pendente' : 'concluido';
        return { ...ref, status: novoStatus };
      }
      return ref;
    }));
  };

  // ===== RENDERIZAÇÃO DOS COMPONENTES =====

  // Renderizar header do card baseado no status
  const renderizarHeaderCard = (refeicao) => {
    const status = refeicao.statusFinal;

    const configs = {
      [STATUS.CONCLUIDO]: {
        corBolinha: 'bg-green-500',
        corCheckbox: 'text-green-500 border-green-500',
        corTarja: 'bg-green-500 text-white',
        corFundo: 'bg-green-50',
        texto: 'Concluído',
        icone: <FaCheck size={10} />
      },
      [STATUS.PENDENTE]: {
        corBolinha: 'bg-yellow-500',
        corCheckbox: 'text-yellow-500 border-yellow-500',
        corTarja: 'bg-yellow-500 text-white',
        corFundo: 'bg-yellow-50',
        texto: 'Pendente',
        icone: <FaTimes size={10} />
      },
      [STATUS.ATRASADO]: {
        corBolinha: 'bg-red-500',
        corCheckbox: 'text-red-500 border-red-500',
        corTarja: 'bg-red-500 text-white',
        corFundo: 'bg-red-50',
        texto: 'Atrasado',
        icone: <FaTimes size={10} />
      }
    };

    const config = configs[status];

    return (
      <div className={`flex items-center justify-between p-3 rounded-t-lg ${config.corFundo}`}>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${config.corBolinha} mr-3`}></div>
          <span className="font-semibold">{refeicao.horario}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleRefeicao(refeicao.id)}
            className={`w-6 h-6 border-2 rounded flex items-center justify-center ${config.corCheckbox} hover:opacity-80 transition-opacity`}
          >
            {config.icone}
          </button>
          <span className={`text-xs px-2 py-1 rounded-full ${config.corTarja}`}>
            {config.texto}
          </span>
        </div>
      </div>
    );
  };

  // ===== EFEITOS ===== 

  useEffect(() => {
    const container = document.getElementById('checklist-container');
    window.addEventListener('scroll', verificarScroll);
    if (container) {
      container.addEventListener('scroll', verificarScroll);
    }
    return () => {
      window.removeEventListener('scroll', verificarScroll);
      if (container) {
        container.removeEventListener('scroll', verificarScroll);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefeicoes(anterior => [...anterior]);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setFiltroStatusAberto(false);
      }
      if (residenteRef.current && !residenteRef.current.contains(event.target)) {
        setFiltroResidenteAberto(false);
      }
      if (dataRef.current && !dataRef.current.contains(event.target)) {
        setCalendarioAberto(false);
      }
      if (tipoRefeicaoRef.current && !tipoRefeicaoRef.current.contains(event.target)) {
        setFiltroTipoRefeicaoAberto(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ===== DADOS COMPUTADOS =====

  const refeicoesFiltradas = obterRefeicoesFiltradas();
  const residentes = obterResidentes();
  const tiposRefeicao = obterTiposRefeicao();
  const totalRefeicoes = refeicoesFiltradas.length;

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 flex flex-col items-center px-4 py-6 lg:px-10 lg:py-10">

        {/* ===== CABEÇALHO DA PÁGINA ===== */}
        <div className="w-full max-w-6xl mb-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <Link
                to="/funcionario/Checklist"
                className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 mr-3"
              >
                <FaArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl lg:text-3xl font-bold text-odara-dark">
                Checklist de Alimentação
              </h1>
            </div>
          </div>
        </div>

        {/* ===== BARRA DE FILTROS ===== */}
        <div className="w-full max-w-6xl flex flex-wrap justify-center gap-2 mb-6">
          {/* Filtro de Status */}
          <div className="relative" ref={statusRef}>
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 
                ${filtroStatusAberto ? 'border-odara-primary text-gray-700' : 'border-odara-primary/40 text-gray-700'} 
                font-medium hover:border-odara-primary transition text-sm`}
              onClick={() => {
                setFiltroStatusAberto(!filtroStatusAberto);
                setFiltroResidenteAberto(false);
                setFiltroTipoRefeicaoAberto(false);
                setCalendarioAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Status
            </button>
            {filtroStatusAberto && (
              <div className="absolute mt-2 w-23 bg-white rounded-lg shadow-lg !border-2 !border-odara-primary z-10">
                {Object.entries(ROTULOS_FILTRO_STATUS).map(([valor, rotulo]) => (
                  <button
                    key={valor}
                    onClick={() => {
                      setFiltroStatus(valor);
                      setFiltroStatusAberto(false);
                    }}
                    className={`block w-full text-left px-2 py-2 text-sm hover:!bg-odara-primary/20 
                      ${filtroStatus === valor ? '!bg-odara-accent/20 font-semibold' : '!border-1 !border-odara-contorno !rounded'}`}
                  >
                    {rotulo}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtro de Residentes */}
          <div className="relative" ref={residenteRef}>
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 font-medium hover:border-odara-primary transition text-sm
                ${filtroResidenteAberto ? 'border-odara-primary text-gray-700' : 'border-odara-primary/40 text-gray-700'}`}
              onClick={() => {
                setFiltroResidenteAberto(!filtroResidenteAberto);
                setFiltroStatusAberto(false);
                setFiltroTipoRefeicaoAberto(false);
                setCalendarioAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Residentes
            </button>
            {filtroResidenteAberto && (
              <div className="absolute mt-2 w-33 bg-white rounded-lg shadow-lg !border-2 !border-odara-primary z-10 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setFiltroResidente('todos');
                    setFiltroResidenteAberto(false);
                  }}
                  className={`block w-full text-left px-2 py-2 text-sm hover:!bg-odara-primary/20 
                    ${filtroResidente === 'todos' ? '!bg-odara-accent/20 font-semibold' : '!border-1 !border-odara-contorno !rounded'}`}
                >
                  Todos
                </button>
                {residentes.map(residente => (
                  <button
                    key={residente}
                    onClick={() => {
                      setFiltroResidente(residente);
                      setFiltroResidenteAberto(false);
                    }}
                    className={`block w-full text-left px-2 py-2 text-sm hover:!bg-odara-primary/20 
                      ${filtroResidente === residente ? '!bg-odara-accent/20 font-semibold' : '!border-1 !border-odara-contorno !rounded'}`}
                  >
                    {residente}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtro de Data */}
          <div className="relative" ref={dataRef}>
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 font-medium hover:border-odara-primary transition text-sm 
                ${calendarioAberto ? 'border-odara-primary text-gray-700' : 'border-odara-primary/40 text-gray-700'}`}
              onClick={() => {
                setCalendarioAberto(!calendarioAberto);
                setFiltroStatusAberto(false);
                setFiltroResidenteAberto(false);
                setFiltroTipoRefeicaoAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Data
            </button>
            {calendarioAberto && (
              <div className="absolute mt-2 bg-white !rounded-lg shadow-lg border-2 p-2 !border-odara-primary z-10">
                <Calendar
                  value={filtroData}
                  onChange={(data) => {
                    setFiltroData(data);
                    setCalendarioAberto(false);
                  }}
                  locale="pt-BR"
                  tileClassName={({ date, view }) => {
                    if (view === 'month') {
                      const hoje = new Date();
                      const hojeNormalizado = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
                      const dataSelecionadaNormalizada = new Date(filtroData.getFullYear(), filtroData.getMonth(), filtroData.getDate());
                      const dataTileNormalizada = new Date(date.getFullYear(), date.getMonth(), date.getDate());

                      if (dataTileNormalizada.getTime() === dataSelecionadaNormalizada.getTime()) {
                        return '!rounded !bg-odara-accent/20 !text-odara-accent !font-bold';
                      }
                      if (dataTileNormalizada.getTime() === hojeNormalizado.getTime()) {
                        return '!rounded !bg-odara-primary/20 !text-odara-primary !font-bold';
                      }
                    }
                    return '!border-1 !border-odara-contorno hover:!bg-odara-white hover:!border-odara-primary !rounded hover:!border-1';
                  }}
                />
              </div>
            )}
          </div>

          {/* Filtro de Tipo de Refeição */}
          <div className="relative" ref={tipoRefeicaoRef}>
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 font-medium hover:border-odara-primary transition text-sm
                ${filtroTipoRefeicaoAberto ? 'border-odara-primary text-gray-700' : 'border-odara-primary/40 text-gray-700'}`}
              onClick={() => {
                setFiltroTipoRefeicaoAberto(!filtroTipoRefeicaoAberto);
                setFiltroStatusAberto(false);
                setFiltroResidenteAberto(false);
                setCalendarioAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Refeição
            </button>
            {filtroTipoRefeicaoAberto && (
              <div className="absolute mt-2 w-30 bg-white rounded-lg shadow-lg !border-2 !border-odara-primary z-10 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setFiltroTipoRefeicao('todos');
                    setFiltroTipoRefeicaoAberto(false);
                  }}
                  className={`block w-full text-left px-2 py-2 text-sm hover:!bg-odara-primary/20 
                    ${filtroTipoRefeicao === 'todos' ? '!bg-odara-accent/20 font-semibold' : '!border-1 !border-odara-contorno !rounded'}`}
                >
                  Todos
                </button>
                {tiposRefeicao.map(tipo => (
                  <button
                    key={tipo}
                    onClick={() => {
                      setFiltroTipoRefeicao(tipo);
                      setFiltroTipoRefeicaoAberto(false);
                    }}
                    className={`block w-full text-left px-2 py-2 text-sm hover:!bg-odara-primary/20 
                      ${filtroTipoRefeicao === tipo ? '!bg-odara-accent/20 font-semibold' : '!border-1 !border-odara-contorno !rounded'}`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Botão Limpar Todos os Filtros */}
          {(filtroData.toDateString() !== new Date().toDateString() || filtroResidente !== 'todos' || filtroStatus !== 'todos' || filtroTipoRefeicao !== 'todos') && (
            <button
              onClick={() => {
                setFiltroData(new Date());
                setFiltroResidente('todos');
                setFiltroStatus('todos');
                setFiltroTipoRefeicao('todos');
              }}
              className="flex items-center bg-odara-accent text-odara-white rounded-full px-3 py-2 shadow-sm font-medium hover:bg-odara-secondary transition text-sm"
            >
              <FaTimes className="mr-1" /> Limpar Filtros
            </button>
          )}
        </div>

        {/* ===== CONTAINER PRINCIPAL DO CHECKLIST ===== */}
        <div className="w-full max-w-4xl bg-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-4 lg:p-6 relative">

          {/* ===== CONTROLES DE DATA E TÍTULO ===== */}
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={irParaOntem}
                className="p-2 text-odara-accent hover:text-odara-secondary transition-colors"
                title="Dia anterior"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={irParaHoje}
                className="bg-odara-accent hover:bg-odara-secondary text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm lg:text-base"
              >
                Ir para Hoje
              </button>
              <button
                onClick={irParaAmanha}
                className="p-2 text-odara-accent hover:text-odara-secondary transition-colors"
                title="Próximo dia"
              >
                <FaChevronRight />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-center sm:text-left">
              <h2 className="text-xl lg:text-2xl font-bold text-odara-dark">
                {ROTULOS_STATUS[filtroStatus]}
              </h2>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                Total: {totalRefeicoes}
              </span>
            </div>

            {/* ===== TARJAS DE FILTROS ATIVOS ===== */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {filtroStatus !== STATUS.TODOS && (
                <span className="bg-odara-dropdown-accent/20 text-odara-dropdown-accent font-bold px-3 py-1 rounded-full text-sm">
                  Status: {ROTULOS_FILTRO_STATUS[filtroStatus]}
                </span>
              )}
              {filtroResidente !== 'todos' && (
                <span className="bg-odara-primary/20 text-odara-primary font-bold px-3 py-1 rounded-full text-sm">
                  Residente: {filtroResidente}
                </span>
              )}
              <span className="bg-odara-accent/20 text-odara-accent font-bold px-3 py-1 rounded-full text-sm">
                Data: {formatarData(filtroData)}
              </span>
              {filtroTipoRefeicao !== 'todos' && (
                <span className="bg-odara-primary/20 text-odara-primary font-bold px-3 py-1 rounded-full text-sm">
                  Refeição: {filtroTipoRefeicao}
                </span>
              )}
            </div>
          </div>

          {/* ===== LISTA DE REFEIÇÕES ===== */}
          <div
            id="checklist-container"
            className="max-h-[500px] lg:max-h-[600px] overflow-y-auto"
            onScroll={verificarScroll}
          >
            <button
              onClick={scrollParaTopo}
              className={`fixed bottom-6 bg-odara-accent text-white p-3 rounded-full shadow-lg hover:bg-odara-secondary transition-all duration-300 z-50 ${
                mostrarScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
              title="Voltar ao topo"
              style={{
                right: `calc(50% - ${document.querySelector('.w-full.max-w-4xl') ? document.querySelector('.w-full.max-w-4xl').offsetWidth / 2 : 0}px)`
              }}
            >
              <FaArrowUp />
            </button>

            {/* Lista simples de refeições sem agrupamento por período */}
            <div className="space-y-4">
              {refeicoesFiltradas.map(refeicao => (
                <div key={refeicao.id} className="bg-white rounded-lg shadow-md border border-gray-200">
                  {renderizarHeaderCard(refeicao)}
                  <div className="p-4">
                    <p className="mb-2">
                      <strong>Refeição:</strong> {refeicao.tipoRefeicao}
                    </p>
                    <p className="mb-2">
                      <strong>Cardápio:</strong> {refeicao.cardapio}
                    </p>
                    {refeicao.observacoes && (
                      <p>
                        <strong>Observações:</strong> {refeicao.observacoes}
                      </p>
                    )}
                  </div>
                  <div className="px-4 py-3 bg-gray-50 rounded-b-lg text-odara-dark text-sm">
                    <span className="bg-odara-accent text-white px-3 py-1 rounded-full">
                      {refeicao.residente}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="text-odara-name">{refeicao.local}</span>
                  </div>
                </div>
              ))}
            </div>

            {refeicoesFiltradas.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhuma refeição encontrada para os filtros selecionados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alimentacao;