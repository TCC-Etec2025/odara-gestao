import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaCheck, FaTimes, FaArrowUp, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Atividades = () => {
  // ===== ESTADOS DO COMPONENTE =====

  // Estado para dados de exemplo (simulando dados do backend)
  const [medicamentos, setMedicamentos] = useState([
    // Medicamentos para hoje (data atual)
    {
      id: 1,
      residente: "João Santos",
      nomeMedicamento: "Losartana",
      dosagem: "50mg",
      dose: "1 comprimido",
      horario: "08:00",
      observacoes: "Tomar antes das refeições",
      local: "Quarto 1A-2",
      periodo: "manha",
      status: "pendente",
      dataAdministracao: new Date() // Hoje
    },

    {
      id: 2,
      residente: "Maria Oliveira",
      nomeMedicamento: "Sinvastatina",
      dosagem: "20mg",
      dose: "1 comprimido",
      horario: "22:00",
      observacoes: "Tomar à noite",
      local: "Quarto 2B-1",
      periodo: "noite",
      status: "pendente",
      dataAdministracao: new Date() // Hoje
    },

    {
      id: 3,
      residente: "Ana Fagundes",
      nomeMedicamento: "Pristiq",
      dosagem: "100mg",
      dose: "2 comprimidos",
      horario: "07:30",
      observacoes: "Tomar com água",
      local: "Quarto 3A-1",
      periodo: "manha",
      status: "concluido",
      dataAdministracao: new Date() // Hoje
    },

    {
      id: 4,
      residente: "Felipe Silva",
      nomeMedicamento: "Omeprazol",
      dosagem: "40mg",
      dose: "1 cápsula",
      horario: "07:30",
      observacoes: "Em jejum",
      local: "Quarto 1B-3",
      periodo: "manha",
      status: "pendente",
      dataAdministracao: new Date() // Hoje
    },

    {
      id: 5,
      residente: "Roberta Costa",
      nomeMedicamento: "Vitamina D",
      dosagem: "1000UI",
      dose: "1 comprimido",
      horario: "15:00",
      observacoes: "Após o almoço",
      local: "Quarto 2A-1",
      periodo: "tarde",
      status: "pendente",
      dataAdministracao: new Date() // Hoje
    },

    // Medicamento para 3 dias atrás (exemplo de data passada)
    {
      id: 6,
      residente: "Carlos Mendes",
      nomeMedicamento: "Metformina",
      dosagem: "850mg",
      dose: "1 comprimido",
      horario: "09:00",
      observacoes: "Após o café da manhã",
      local: "Quarto 4C-2",
      periodo: "manha",
      status: "pendente",
      dataAdministracao: new Date(new Date().setDate(new Date().getDate() - 3)) // 3 dias atrás
    },

    // Medicamento para 1 mês depois (exemplo de data futura)
    {
      id: 7,
      residente: "Beatriz Hishimoto",
      nomeMedicamento: "Levotiroxina",
      dosagem: "50mcg",
      dose: "1 comprimido",
      horario: "07:00",
      observacoes: "Em jejum, 30min antes do café",
      local: "Quarto 3B-1",
      periodo: "manha",
      status: "pendente",
      dataAdministracao: new Date(new Date().setMonth(new Date().getMonth() + 1)) // 1 mês depois
    },

    // Medicamento para 5 dias depois (exemplo de data futura próxima)
    {
      id: 8,
      residente: "Ricardo Almeida",
      nomeMedicamento: "AAS",
      dosagem: "100mg",
      dose: "1 comprimido",
      horario: "20:00",
      observacoes: "Após o jantar",
      local: "Quarto 2C-3",
      periodo: "noite",
      status: "pendente",
      dataAdministracao: new Date(new Date().setDate(new Date().getDate() + 5)) // 5 dias depois
    }
  ]);

  // Estados para filtros
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroResidente, setFiltroResidente] = useState('todos');
  const [filtroData, setFiltroData] = useState(new Date());
  const [filtroPeriodo, setFiltroPeriodo] = useState('todos');

  // Estados para controle de interface
  const [calendarioAberto, setCalendarioAberto] = useState(false);
  const [filtroResidenteAberto, setFiltroResidenteAberto] = useState(false);
  const [filtroStatusAberto, setFiltroStatusAberto] = useState(false);
  const [filtroPeriodoAberto, setFiltroPeriodoAberto] = useState(false);
  const [mostrarScrollTop, setMostrarScrollTop] = useState(false);

  // ===== CONSTANTES E CONFIGURAÇÕES =====

  // Refs para os dropdowns
  const statusRef = useRef(null);
  const residenteRef = useRef(null);
  const dataRef = useRef(null);
  const periodoRef = useRef(null);

  // Opções de status
  const STATUS = {
    TODOS: 'todos',
    PENDENTE: 'pendente',
    ATRASADO: 'atrasado',
    ADMINISTRADO: 'concluido'
  };

  // Rótulos para exibição do Título de acordo com o status
  const ROTULOS_STATUS = {
    [STATUS.TODOS]: "Todas as Administrações",
    [STATUS.PENDENTE]: "Administrações Pendentes",
    [STATUS.ATRASADO]: "Administrações em Atraso",
    [STATUS.ADMINISTRADO]: "Administrações Concluídas"
  };

  // Rótulos simplificados para as opções de filtros
  const ROTULOS_FILTRO_STATUS = {
    [STATUS.TODOS]: "Todos",
    [STATUS.PENDENTE]: "Pendentes",
    [STATUS.ATRASADO]: "Atrasados",
    [STATUS.ADMINISTRADO]: "Concluídos"
  };

  // Opções de período
  const PERIODOS = {
    TODOS: 'todos',
    MANHA: 'manha',
    TARDE: 'tarde',
    NOITE: 'noite'
  };

  // Rótulos para exibição dos períodos
  const ROTULOS_PERIODOS = {
    [PERIODOS.TODOS]: "Todos",
    [PERIODOS.MANHA]: "Manhã",
    [PERIODOS.TARDE]: "Tarde",
    [PERIODOS.NOITE]: "Noite"
  };

  // ===== FUNÇÕES AUXILIARES =====

  // Função para obter lista única de residentes
  const obterResidentes = () => {
    return [...new Set(medicamentos.map(med => med.residente))];
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
    return hora * 60 + minuto; // Converter para minutos totais para facilitar ordenação
  };

  // Função para determinar o período baseado no horário
  const obterPeriodoDoHorario = (horario) => {
    const hora = parseInt(horario.split(':')[0]);
    if (hora >= 6 && hora < 12) return PERIODOS.MANHA;
    if (hora >= 12 && hora < 18) return PERIODOS.TARDE;
    return PERIODOS.NOITE;
  };

  // Função para verificar se o horário já passou (considerando 10 minutos de tolerância)
  const verificarHorarioPassou = (horario, dataMedicamento) => {
    const agora = new Date();
    const [hora, minuto] = horario.split(':').map(Number);

    // Criar objeto de data para o horário do medicamento na data específica
    const horarioMedicamento = new Date(dataMedicamento);
    horarioMedicamento.setHours(hora, minuto, 0, 0);

    // Adicionar 10 minutos de tolerância
    const horarioComTolerancia = new Date(horarioMedicamento.getTime() + 10 * 60 * 1000);

    return agora > horarioComTolerancia;
  };

  // Função para verificar se o medicamento é para a data selecionada
  const ehParaDataSelecionada = (dataMedicamento) => {
    const dataSelecionada = new Date(filtroData);
    dataSelecionada.setHours(0, 0, 0, 0);

    const dataMed = new Date(dataMedicamento);
    dataMed.setHours(0, 0, 0, 0);

    return dataMed.getTime() === dataSelecionada.getTime();
  };

  // Função para determinar o status dinâmico do medicamento
  const obterStatusDinamico = (medicamento) => {
    // Se já foi administrado manualmente, mantém o status
    if (medicamento.status === 'concluido') {
      return 'concluido';
    }

    // Verificar se o medicamento é para a data selecionada
    if (ehParaDataSelecionada(medicamento.dataAdministracao)) {
      // Se é para hoje e o horário já passou, marca como atrasado
      if (verificarHorarioPassou(medicamento.horario, medicamento.dataAdministracao)) {
        return 'atrasado';
      }
      // Se é para hoje mas o horário ainda não passou, mantém como pendente
      return 'pendente';
    }

    // Se não é para a data selecionada, verifica se é uma data passada
    const dataSelecionada = new Date(filtroData);
    dataSelecionada.setHours(0, 0, 0, 0);

    const dataMed = new Date(medicamento.dataAdministracao);
    dataMed.setHours(0, 0, 0, 0);

    if (dataMed < dataSelecionada) {
      // Se é para uma data passada e não foi administrado, marca como atrasado
      return 'atrasado';
    }

    // Se é para uma data futura, mantém como pendente
    return 'pendente';
  };

  // ===== FUNÇÕES DE FILTRAGEM E ORDENAÇÃO =====

  // Função principal para filtrar medicamentos
  const obterMedicamentosFiltrados = () => {
    return medicamentos
      .filter(medicamento => {
        // Verificar se o medicamento é para a data selecionada
        const passaData = ehParaDataSelecionada(medicamento.dataAdministracao);
        if (!passaData) return false;

        // Aplicar status dinâmico para medicamentos não administrados
        const statusFinal = obterStatusDinamico(medicamento);

        // Filtro por status (agora usando statusFinal)
        const passaStatus = filtroStatus === STATUS.TODOS || statusFinal === filtroStatus;

        // Filtro por residente
        const passaResidente = filtroResidente === 'todos' || medicamento.residente === filtroResidente;

        // Filtro por período
        let passaPeriodo = true;
        if (filtroPeriodo !== PERIODOS.TODOS) {
          const periodoMedicamento = obterPeriodoDoHorario(medicamento.horario);
          passaPeriodo = periodoMedicamento === filtroPeriodo;
        }

        return passaStatus && passaResidente && passaPeriodo;
      })
      .map(medicamento => {
        // Adicionar statusFinal ao medicamento para uso na renderização
        const statusFinal = obterStatusDinamico(medicamento);
        return {
          ...medicamento,
          statusFinal: statusFinal
        };
      })
      .sort((a, b) => {
        // Ordenar primariamente por horário (mais cedo primeiro)
        const horaA = extrairHora(a.horario);
        const horaB = extrairHora(b.horario);
        if (horaA !== horaB) return horaA - horaB;

        // Secundariamente por nome do residente (ordem alfabética)
        return a.residente.localeCompare(b.residente);
      });
  };

  // Função para agrupar medicamentos por período
  const agruparPorPeriodo = (medicamentos) => {
    const grupos = {
      [PERIODOS.MANHA]: [],
      [PERIODOS.TARDE]: [],
      [PERIODOS.NOITE]: []
    };

    medicamentos.forEach(medicamento => {
      const periodo = obterPeriodoDoHorario(medicamento.horario);
      grupos[periodo].push(medicamento);
    });

    return grupos;
  };

  // ===== FUNÇÕES DE CONTROLE DE DATA =====

  // Ir para o dia anterior
  const irParaOntem = () => {
    const ontem = new Date(filtroData);
    ontem.setDate(ontem.getDate() - 1);
    setFiltroData(ontem);
  };

  // Ir para o dia seguinte
  const irParaAmanha = () => {
    const amanha = new Date(filtroData);
    amanha.setDate(amanha.getDate() + 1);
    setFiltroData(amanha);
  };

  // Voltar para hoje
  const irParaHoje = () => {
    setFiltroData(new Date());
  };

  // ===== FUNÇÕES DE CONTROLE DE SCROLL =====

  // Verificar se deve mostrar botão de scroll para topo
  const verificarScroll = () => {
    const container = document.getElementById('checklist-container');

    // Verificar scroll da página OU do container
    const scrollPagina = window.scrollY > 100;
    const scrollContainer = container ? container.scrollTop > 100 : false;

    setMostrarScrollTop(scrollPagina || scrollContainer);
  };

  // Scroll para o topo da página e do container
  const scrollParaTopo = () => {
    // Rolar a página inteira para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Rolar o container para o topo
    const container = document.getElementById('checklist-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ===== FUNÇÕES DE CONTROLE DE ADMINISTRAÇÃO =====

  // Alternar status de administração do medicamento
  const toggleAdministracao = (id) => {
    setMedicamentos(anterior => anterior.map(med => {
      if (med.id === id) {
        // Se está como administrado, volta para pendente
        // Se não está como administrado, marca como administrado
        const novoStatus = med.status === 'concluido' ? 'pendente' : 'concluido';
        return { ...med, status: novoStatus };
      }
      return med;
    }));
  };

  // ===== RENDERIZAÇÃO DOS COMPONENTES =====

  // Renderizar header do card baseado no status
  const renderizarHeaderCard = (medicamento) => {
    // Usar statusFinal que combina status manual e dinâmico
    const status = medicamento.statusFinal;

    const configs = {
      [STATUS.ADMINISTRADO]: {
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
        {/* Lado esquerdo: bolinha e horário */}
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${config.corBolinha} mr-3`}></div>
          <span className="font-semibold">{medicamento.horario}</span>
        </div>

        {/* Lado direito: checkbox e tarja de status */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleAdministracao(medicamento.id)}
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

  // Renderizar linha divisória entre períodos
  const renderizarDivisorPeriodo = (periodo) => {
    const rotulos = {
      [PERIODOS.MANHA]: "Período da Manhã",
      [PERIODOS.TARDE]: "Período da Tarde",
      [PERIODOS.NOITE]: "Período da Noite"
    };

    return (
      <div className="flex items-center my-4">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="mx-4 text-sm font-medium text-gray-600">
          {rotulos[periodo]}
        </span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
    );
  };

  // ===== EFEITOS ===== 

  // Configurar listeners de scroll
  useEffect(() => {
    const container = document.getElementById('checklist-container');

    // Listener para scroll da página
    window.addEventListener('scroll', verificarScroll);

    // Listener para scroll do container
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

  // Efeito para atualizar status dinamicamente a cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      // Forçar re-render para atualizar status dinâmicos
      setMedicamentos(anterior => [...anterior]);
    }, 60000); // Atualizar a cada minuto

    return () => clearInterval(interval);
  }, []);

  // Efeito para fechar dropdowns ao clicar fora
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
      if (periodoRef.current && !periodoRef.current.contains(event.target)) {
        setFiltroPeriodoAberto(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ===== DADOS COMPUTADOS =====

  const medicamentosFiltrados = obterMedicamentosFiltrados();
  const medicamentosAgrupados = agruparPorPeriodo(medicamentosFiltrados);
  const residentes = obterResidentes();
  const totalAdministracoes = medicamentosFiltrados.length;

  // Verificar se há filtros ativos (agora SEMPRE inclui a tarja de data)
  const temFiltrosAtivos = filtroStatus !== STATUS.TODOS ||
    filtroResidente !== 'todos' ||
    filtroPeriodo !== PERIODOS.TODOS ||
    true; // Sempre true para garantir que a tarja de data apareça

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 flex flex-col items-center px-4 py-6 lg:px-10 lg:py-10">

        {/* ===== CABEÇALHO DA PÁGINA ===== */}
        <div className="w-full max-w-6xl mb-6">
          <div className="flex items-center justify-center">
            {/* Título da página - Sempre centralizado */}
            <div className="flex items-center">
              {/* Botão voltar */}
              <Link
                to="/funcionario/Checklist"
                className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 mr-3"
              >
                <FaArrowLeft size={20} />
              </Link>
              {/* Título da página */}
              <h1 className="text-2xl lg:text-3xl font-bold text-odara-dark">
                Checklist de Medicamentos
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
                ${filtroStatusAberto
                  ? 'border-odara-primary text-gray-700'
                  : 'border-odara-primary/40 text-gray-700'} 
              font-medium hover:border-odara-primary transition text-sm`}

              onClick={() => {
                setFiltroStatusAberto(!filtroStatusAberto);
                setFiltroResidenteAberto(false);
                setFiltroPeriodoAberto(false);
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
                      ${filtroStatus === valor
                        ? '!bg-odara-accent/20 font-semibold'
                        : '!border-1 !border-odara-contorno !rounded'
                      }
                    `}
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
                ${filtroResidenteAberto
                  ? 'border-odara-primary text-gray-700'
                  : 'border-odara-primary/40 text-gray-700'
                } 
              `}

              onClick={() => {
                setFiltroResidenteAberto(!filtroResidenteAberto);
                setFiltroStatusAberto(false);
                setFiltroPeriodoAberto(false);
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
                    ${filtroResidente === 'todos'
                      ? '!bg-odara-accent/20 font-semibold'
                      : '!border-1 !border-odara-contorno !rounded'
                    }
                  `}
                >
                  Todos
                </button>

                <button
                  onClick={() => {
                    setFiltroResidente('meus');
                    setFiltroResidenteAberto(false);
                  }}

                  className={`block w-full text-left px-2 py-2 text-sm hover:!bg-odara-primary/20 
                    ${filtroResidente === 'meus'
                      ? '!bg-odara-accent/20 font-semibold'
                      : '!border-1 !border-odara-contorno'
                    }
                  `}
                >
                  Meus
                </button>

                {residentes.map(residente => (
                  <button
                    key={residente}
                    onClick={() => {
                      setFiltroResidente(residente);
                      setFiltroResidenteAberto(false);
                    }}

                    className={`block w-full text-left px-2 py-2 text-sm hover:!bg-odara-primary/20 
                      ${filtroResidente === residente
                        ? '!bg-odara-accent/20 font-semibold'
                        : '!border-1 !border-odara-contorno !rounded'
                      }
                    `}
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
                ${calendarioAberto
                  ? 'border-odara-primary text-gray-700'
                  : 'border-odara-primary/40 text-gray-700'
                }
              `}

              onClick={() => {
                setCalendarioAberto(!calendarioAberto);
                setFiltroStatusAberto(false);
                setFiltroResidenteAberto(false);
                setFiltroPeriodoAberto(false);
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
                      // Criar datas normalizadas (apenas ano, mês, dia)
                      const hoje = new Date();
                      const hojeNormalizado = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
                      const dataSelecionadaNormalizada = new Date(filtroData.getFullYear(), filtroData.getMonth(), filtroData.getDate());
                      const dataTileNormalizada = new Date(date.getFullYear(), date.getMonth(), date.getDate());

                      // Verificar se é a data selecionada (filtrada)
                      if (dataTileNormalizada.getTime() === dataSelecionadaNormalizada.getTime()) {
                        return '!rounded !bg-odara-accent/20 !text-odara-accent !font-bold';
                      }

                      // Verificar se é hoje
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

          {/* Filtro de Período */}
          <div className="relative" ref={periodoRef}>
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 font-medium hover:border-odara-primary transition text-sm
                ${filtroPeriodoAberto
                  ? 'border-odara-primary text-gray-700'
                  : 'border-odara-primary/40 text-gray-700'}
                `}
              onClick={() => {
                setFiltroPeriodoAberto(!filtroPeriodoAberto);
                setFiltroStatusAberto(false);
                setFiltroResidenteAberto(false);
                setCalendarioAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Período
            </button>
            {filtroPeriodoAberto && (
              <div className="absolute mt-2 w-25 bg-white rounded-lg shadow-lg !border-2 !border-odara-primary z-10">
                {Object.entries(ROTULOS_PERIODOS).map(([valor, rotulo]) => (
                  <button
                    key={valor}
                    onClick={() => {
                      setFiltroPeriodo(valor);
                      setFiltroPeriodoAberto(false);
                    }}

                    className={`block w-full text-left px-2 py-2 text-sm hover:!bg-odara-primary/20 
                      ${filtroPeriodo === valor
                        ? '!bg-odara-accent/20 font-semibold'
                        : '!border-1 !border-odara-contorno !rounded'
                      }
                    `}
                  >
                    {rotulo}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Botão Limpar Todos os Filtros */}
          {(filtroData.toDateString() !== new Date().toDateString() || filtroResidente !== 'todos' || filtroStatus !== 'todos' || filtroPeriodo !== 'todos') && (
            <button
              onClick={() => {
                setFiltroData(new Date());
                setFiltroPeriodo('todos');
                setFiltroResidente('todos');
                setFiltroStatus('todos');
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
            {/* Controles de navegação de data - Centralizado */}
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

            {/* Título e contador - Centralizado */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-center sm:text-left">
              <h2 className="text-xl lg:text-2xl font-bold text-odara-dark">
                {ROTULOS_STATUS[filtroStatus]}
              </h2>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                Total: {totalAdministracoes}
              </span>
            </div>

            {/* ===== TARJAS DE FILTROS ATIVOS ===== */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {/* Tarja de Status (apenas quando filtrado) */}
              {filtroStatus !== STATUS.TODOS && (
                <span className="bg-odara-dropdown-accent/20 text-odara-dropdown-accent font-bold px-3 py-1 rounded-full text-sm">
                  Status: {ROTULOS_FILTRO_STATUS[filtroStatus]}
                </span>
              )}

              {/* Tarja de Residentes (apenas quando filtrado) */}
              {filtroResidente !== 'todos' && (
                <span className="bg-odara-primary/20 text-odara-primary font-bold px-3 py-1 rounded-full text-sm">
                  Residente: {filtroResidente === 'meus' ? 'Meus' : filtroResidente}
                </span>
              )}

              {/* Tarja de Data (SEMPRE visível) */}
              <span className="bg-odara-accent/20 text-odara-accent font-bold px-3 py-1 rounded-full text-sm">
                Data: {formatarData(filtroData)}
              </span>

              {/* Tarja de Período (apenas quando filtrado) */}
              {filtroPeriodo !== PERIODOS.TODOS && (
                <span className="bg-odara-secondary/20 text-odara-secondary font-bold px-3 py-1 rounded-full text-sm">
                  Período: {ROTULOS_PERIODOS[filtroPeriodo]}
                </span>
              )}
            </div>
          </div>

          {/* ===== LISTA DE MEDICAMENTOS ===== */}
          <div
            id="checklist-container"
            className="max-h-[500px] lg:max-h-[600px] overflow-y-auto"
            onScroll={verificarScroll}
          >
            {/* Botão para voltar ao topo (fixo na tela mas alinhado com o container) */}
            <button
              onClick={scrollParaTopo}
              className={`fixed bottom-6 bg-odara-accent text-white p-3 rounded-full shadow-lg hover:bg-odara-secondary transition-all duration-300 z-50 ${mostrarScrollTop
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              title="Voltar ao topo"
              style={{
                right: `calc(50% - ${document.querySelector('.w-full.max-w-4xl') ? document.querySelector('.w-full.max-w-4xl').offsetWidth / 2 : 0}px)`
              }}
            >
              <FaArrowUp />
            </button>

            {/* Renderização condicional baseada no filtro de período */}
            {filtroPeriodo === PERIODOS.TODOS ? (
              // ===== MODO TODOS OS PERÍODOS =====
              <div>
                {/* Período da Manhã */}
                {medicamentosAgrupados[PERIODOS.MANHA].length > 0 && (
                  <>
                    {renderizarDivisorPeriodo(PERIODOS.MANHA)}
                    <div className="space-y-4">
                      {medicamentosAgrupados[PERIODOS.MANHA].map(medicamento => (
                        <div key={medicamento.id} className="bg-white rounded-lg shadow-md border border-gray-200">
                          {renderizarHeaderCard(medicamento)}
                          <div className="p-4">
                            <p className="mb-2">
                              <strong>Medicamento:</strong> {medicamento.nomeMedicamento} {medicamento.dosagem}
                            </p>
                            <p className="mb-2">
                              <strong>Dose:</strong> {medicamento.dose}
                            </p>
                            {medicamento.observacoes && (
                              <p>
                                <strong>Obs:</strong> {medicamento.observacoes}
                              </p>
                            )}
                          </div>
                          <div className="px-4 py-3 bg-gray-50 rounded-b-lg text-odara-dark text-sm">
                            <span className="bg-odara-accent text-white px-3 py-1 rounded-full">
                              {medicamento.residente}
                            </span>
                            <span className="mx-2">•</span>
                            <span className="text-odara-name">{medicamento.local}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Período da Tarde */}
                {medicamentosAgrupados[PERIODOS.TARDE].length > 0 && (
                  <>
                    {renderizarDivisorPeriodo(PERIODOS.TARDE)}
                    <div className="space-y-4">
                      {medicamentosAgrupados[PERIODOS.TARDE].map(medicamento => (
                        <div key={medicamento.id} className="bg-white rounded-lg shadow-md border border-gray-200">
                          {renderizarHeaderCard(medicamento)}
                          <div className="p-4">
                            <p className="mb-2">
                              <strong>Medicamento:</strong> {medicamento.nomeMedicamento} {medicamento.dosagem}
                            </p>
                            <p className="mb-2">
                              <strong>Dose:</strong> {medicamento.dose}
                            </p>
                            {medicamento.observacoes && (
                              <p>
                                <strong>Obs:</strong> {medicamento.observacoes}
                              </p>
                            )}
                          </div>
                          <div className="px-4 py-3 bg-gray-50 rounded-b-lg text-odara-dark text-sm">
                            <span className="bg-odara-accent text-white px-3 py-1 rounded-full">
                              {medicamento.residente}
                            </span>
                            <span className="mx-2">•</span>
                            <span className="text-odara-name">{medicamento.local}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Período da Noite */}
                {medicamentosAgrupados[PERIODOS.NOITE].length > 0 && (
                  <>
                    {renderizarDivisorPeriodo(PERIODOS.NOITE)}
                    <div className="space-y-4">
                      {medicamentosAgrupados[PERIODOS.NOITE].map(medicamento => (
                        <div key={medicamento.id} className="bg-white rounded-lg shadow-md border border-gray-200">
                          {renderizarHeaderCard(medicamento)}
                          <div className="p-4">
                            <p className="mb-2">
                              <strong>Medicamento:</strong> {medicamento.nomeMedicamento} {medicamento.dosagem}
                            </p>
                            <p className="mb-2">
                              <strong>Dose:</strong> {medicamento.dose}
                            </p>
                            {medicamento.observacoes && (
                              <p>
                                <strong>Obs:</strong> {medicamento.observacoes}
                              </p>
                            )}
                          </div>
                          <div className="px-4 py-3 bg-gray-50 rounded-b-lg text-odara-dark text-sm">
                            <span className="bg-odara-accent text-white px-3 py-1 rounded-full">
                              {medicamento.residente}
                            </span>
                            <span className="mx-2">•</span>
                            <span className="text-odara-name">{medicamento.local}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              // ===== MODO PERÍODO ESPECÍFICO =====
              <div className="space-y-4">
                {medicamentosFiltrados.map(medicamento => (
                  <div key={medicamento.id} className="bg-white rounded-lg shadow-md border border-gray-200">
                    {renderizarHeaderCard(medicamento)}
                    <div className="p-4">
                      <p className="mb-2">
                        <strong>Medicamento:</strong> {medicamento.nomeMedicamento} {medicamento.dosagem}
                      </p>
                      <p className="mb-2">
                        <strong>Dose:</strong> {medicamento.dose}
                      </p>
                      {medicamento.observacoes && (
                        <p>
                          <strong>Obs:</strong> {medicamento.observacoes}
                        </p>
                      )}
                    </div>
                    <div className="px-4 py-3 bg-gray-50 rounded-b-lg text-odara-dark text-sm">
                      <span className="bg-odara-accent text-white px-3 py-1 rounded-full">
                        {medicamento.residente}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="text-odara-name">{medicamento.local}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Mensagem quando não há medicamentos */}
            {medicamentosFiltrados.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhuma administração encontrada para os filtros selecionados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Atividades;