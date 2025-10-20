import React, { useState, useEffect, useRef } from 'react';
import {
  FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle,
  FaFilePdf, FaArrowLeft, FaChevronLeft, FaChevronRight, FaTimes, FaArrowUp, FaCheck
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const mesesLista = [
  { id: 'todos', label: 'Todos os meses' },
  { id: 'jan', label: 'JAN' }, { id: 'fev', label: 'FEV' }, { id: 'mar', label: 'MAR' },
  { id: 'abr', label: 'ABR' }, { id: 'mai', label: 'MAI' }, { id: 'jun', label: 'JUN' },
  { id: 'jul', label: 'JUL' }, { id: 'ago', label: 'AGO' }, { id: 'set', label: 'SET' },
  { id: 'out', label: 'OUT' }, { id: 'nov', label: 'NOV' }, { id: 'dez', label: 'DEZ' }
];

const mesIdParaIndex = {
  jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
  jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11
};

const Consultas = () => {
  // ===== ESTADOS DO COMPONENTE =====
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      paciente: "João Silva",
      idade: 72,
      sexo: "Masculino",
      prontuario: "2023001",
      data: new Date(),
      horario: "08:30",
      medico: "Dr. Carlos Mendes",
      motivo: "Check-up regular",
      historico: "Hipertensão controlada com medicamentos",
      tratamento: "Manter uso de Losartana 50mg",
      exames: "Hemograma completo, Eletrocardiograma",
      receitas: "Losartana 50mg - 30 comprimidos",
      anexos: [],
      local: "Consultório 1",
      status: "pendente",
      periodo: "manha"
    },
    {
      id: 2,
      paciente: "Maria Oliveira",
      idade: 68,
      sexo: "Feminino",
      prontuario: "2023002",
      data: new Date(),
      horario: "09:15",
      medico: "Dra. Ana Santos",
      motivo: "Dor articular no joelho direito",
      historico: "Artrose diagnosticada há 5 anos",
      tratamento: "Fisioterapia 2x por semana, Paracetamol 500mg se necessário",
      exames: "Radiografia do joelho direito",
      receitas: "Paracetamol 500mg - 20 comprimidos",
      anexos: [],
      local: "Consultório 2",
      status: "pendente",
      periodo: "manha"
    },
    {
      id: 3,
      paciente: "Carlos Santos",
      idade: 75,
      sexo: "Masculino",
      prontuario: "2023003",
      data: new Date(),
      horario: "14:00",
      medico: "Dr. Roberto Lima",
      motivo: "Acompanhamento diabetes",
      historico: "Diabetes tipo 2, em uso de Metformina",
      tratamento: "Manter dieta e exercícios",
      exames: "Glicemia em jejum, Hemoglobina glicada",
      receitas: "Metformina 850mg - 60 comprimidos",
      anexos: [],
      local: "Consultório 1",
      status: "pendente",
      periodo: "tarde"
    },
    {
      id: 4,
      paciente: "Ana Costa",
      idade: 71,
      sexo: "Feminino",
      prontuario: "2023004",
      data: new Date(),
      horario: "15:30",
      medico: "Dra. Patricia Oliveira",
      motivo: "Avaliação cardiológica",
      historico: "Histórico de arritmia cardíaca",
      tratamento: "Manter acompanhamento trimestral",
      exames: "Eletrocardiograma, Ecocardiograma",
      receitas: "",
      anexos: [],
      local: "Consultório 3",
      status: "pendente",
      periodo: "tarde"
    },
    {
      id: 5,
      paciente: "Pedro Almeida",
      idade: 69,
      sexo: "Masculino",
      prontuario: "2023005",
      data: new Date(),
      horario: "18:00",
      medico: "Dr. Carlos Mendes",
      motivo: "Urgência - Febre alta",
      historico: "Histórico de infecções urinárias",
      tratamento: "Antibioticoterapia se necessário",
      exames: "Urina tipo I, Hemograma",
      receitas: "",
      anexos: [],
      local: "Consultório 2",
      status: "pendente",
      periodo: "noite"
    }
  ]);

  // Estados para filtros
  const [filtroMes, setFiltroMes] = useState('todos');
  const [filtroPaciente, setFiltroPaciente] = useState('todos');
  const [filtroData, setFiltroData] = useState(new Date());
  const [filtroPeriodo, setFiltroPeriodo] = useState('todos');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  // Estados para controle de interface
  const [modalAberto, setModalAberto] = useState(false);
  const [consultaEditando, setConsultaEditando] = useState(null);
  const [calendarioAberto, setCalendarioAberto] = useState(false);
  const [filtroPacienteAberto, setFiltroPacienteAberto] = useState(false);
  const [filtroMesAberto, setFiltroMesAberto] = useState(false);
  const [filtroPeriodoAberto, setFiltroPeriodoAberto] = useState(false);
  const [filtroStatusAberto, setFiltroStatusAberto] = useState(false);
  const [mostrarScrollTop, setMostrarScrollTop] = useState(false);
  const [infoVisivel, setInfoVisivel] = useState(false);

  // Refs para os dropdowns
  const pacienteRef = useRef(null);
  const dataRef = useRef(null);
  const mesRef = useRef(null);
  const periodoRef = useRef(null);
  const statusRef = useRef(null);

  // ===== CONSTANTES E CONFIGURAÇÕES =====
  const STATUS = {
    TODOS: 'todos',
    PENDENTE: 'pendente',
    ATRASADO: 'atrasado',
    CONCLUIDO: 'concluido'
  };

  const PERIODOS = {
    TODOS: 'todos',
    MANHA: 'manha',
    TARDE: 'tarde',
    NOITE: 'noite'
  };

  const ROTULOS_STATUS = {
    [STATUS.TODOS]: "Todas as Consultas",
    [STATUS.PENDENTE]: "Consultas Pendentes",
    [STATUS.ATRASADO]: "Consultas em Atraso",
    [STATUS.CONCLUIDO]: "Consultas Concluídas"
  };

  const ROTULOS_FILTRO_STATUS = {
    [STATUS.TODOS]: "Todos",
    [STATUS.PENDENTE]: "Pendentes",
    [STATUS.ATRASADO]: "Atrasadas",
    [STATUS.CONCLUIDO]: "Concluídas"
  };

  const ROTULOS_PERIODOS = {
    [PERIODOS.TODOS]: "Todos",
    [PERIODOS.MANHA]: "Manhã",
    [PERIODOS.TARDE]: "Tarde",
    [PERIODOS.NOITE]: "Noite"
  };

  // ===== FUNÇÕES AUXILIARES =====
  const pacientes = Array.from(new Set(consultas.map(c => c.paciente).filter(Boolean)));

  const formatarData = (data) => {
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const obterPeriodoDoHorario = (horario) => {
    const hora = parseInt(horario.split(':')[0]);
    if (hora >= 6 && hora < 12) return PERIODOS.MANHA;
    if (hora >= 12 && hora < 18) return PERIODOS.TARDE;
    return PERIODOS.NOITE;
  };

  const verificarHorarioPassou = (horario, dataConsulta) => {
    const agora = new Date();
    const [hora, minuto] = horario.split(':').map(Number);

    const horarioConsulta = new Date(dataConsulta);
    horarioConsulta.setHours(hora, minuto, 0, 0);

    const horarioComTolerancia = new Date(horarioConsulta.getTime() + 10 * 60 * 1000);
    return agora > horarioComTolerancia;
  };

  const ehParaDataSelecionada = (dataConsulta) => {
    const dataSelecionada = new Date(filtroData);
    dataSelecionada.setHours(0, 0, 0, 0);

    const dataCons = new Date(dataConsulta);
    dataCons.setHours(0, 0, 0, 0);

    return dataCons.getTime() === dataSelecionada.getTime();
  };

  const obterStatusDinamico = (consulta) => {
    if (consulta.status === 'concluido') {
      return 'concluido';
    }

    if (ehParaDataSelecionada(consulta.data)) {
      if (verificarHorarioPassou(consulta.horario, consulta.data)) {
        return 'atrasado';
      }
      return 'pendente';
    }

    const dataSelecionada = new Date(filtroData);
    dataSelecionada.setHours(0, 0, 0, 0);

    const dataCons = new Date(consulta.data);
    dataCons.setHours(0, 0, 0, 0);

    if (dataCons < dataSelecionada) {
      return 'atrasado';
    }

    return 'pendente';
  };

  // ===== FUNÇÕES DE FILTRAGEM E ORDENAÇÃO =====
  const obterConsultasFiltradas = () => {
    return consultas
      .filter(consulta => {
        const passaData = ehParaDataSelecionada(consulta.data);
        if (!passaData) return false;

        const statusFinal = obterStatusDinamico(consulta);
        const passaStatus = filtroStatus === STATUS.TODOS || statusFinal === filtroStatus;
        const passaPaciente = filtroPaciente === 'todos' || consulta.paciente === filtroPaciente;
        const passaMes = filtroMes === 'todos' || (mesIdParaIndex[filtroMes] === consulta.data.getMonth());

        let passaPeriodo = true;
        if (filtroPeriodo !== PERIODOS.TODOS) {
          const periodoConsulta = obterPeriodoDoHorario(consulta.horario);
          passaPeriodo = periodoConsulta === filtroPeriodo;
        }

        return passaStatus && passaPaciente && passaMes && passaPeriodo;
      })
      .map(consulta => {
        const statusFinal = obterStatusDinamico(consulta);
        return {
          ...consulta,
          statusFinal: statusFinal,
          periodo: obterPeriodoDoHorario(consulta.horario)
        };
      })
      .sort((a, b) => {
        const horaA = a.horario.localeCompare(b.horario);
        if (horaA !== 0) return horaA;
        return a.paciente.localeCompare(b.paciente);
      });
  };

  const agruparPorPeriodo = (consultas) => {
    const grupos = {
      [PERIODOS.MANHA]: [],
      [PERIODOS.TARDE]: [],
      [PERIODOS.NOITE]: []
    };

    consultas.forEach(consulta => {
      const periodo = obterPeriodoDoHorario(consulta.horario);
      grupos[periodo].push(consulta);
    });

    return grupos;
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

  // ===== FUNÇÕES DE CONSULTA =====
  const abrirModalAdicionar = () => {
    setConsultaEditando(null);
    setModalAberto(true);
  };

  const abrirModalEditar = (consulta) => {
    const copia = {
      ...consulta,
      data: consulta.data instanceof Date ? consulta.data.toISOString().split('T')[0] : consulta.data
    };
    setConsultaEditando(copia);
    setModalAberto(true);
  };

  const salvarConsulta = (novaConsulta) => {
    const form = { ...novaConsulta };
    if (typeof form.data === 'string' && form.data.includes('-')) {
      const [y, m, d] = form.data.split('-').map(Number);
      form.data = new Date(y, m - 1, d);
    }
    if (consultaEditando) {
      setConsultas(prev => prev.map(c => c.id === consultaEditando.id ? { ...form, id: consultaEditando.id } : c));
    } else {
      setConsultas(prev => [...prev, { ...form, id: Date.now(), status: 'pendente' }]);
    }
    setModalAberto(false);
  };

  const excluirConsulta = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta consulta?')) {
      setConsultas(prev => prev.filter(c => c.id !== id));
    }
  };

  const toggleStatusConsulta = (id) => {
    setConsultas(prev => prev.map(consulta => {
      if (consulta.id === id) {
        const novoStatus = consulta.status === 'concluido' ? 'pendente' : 'concluido';
        return { ...consulta, status: novoStatus };
      }
      return consulta;
    }));
  };

  // ===== RENDERIZAÇÃO DOS COMPONENTES =====
  const renderizarHeaderCard = (consulta) => {
    const status = consulta.statusFinal;

    const configs = {
      [STATUS.CONCLUIDO]: {
        corBolinha: 'bg-green-500',
        corCheckbox: 'text-green-500 border-green-500',
        corTarja: 'bg-green-500 text-white',
        corFundo: 'bg-green-50',
        texto: 'Concluída',
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
        texto: 'Atrasada',
        icone: <FaTimes size={10} />
      }
    };

    const config = configs[status];

    return (
      <div className={`flex items-center justify-between p-3 rounded-t-lg ${config.corFundo}`}>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${config.corBolinha} mr-3`}></div>
          <span className="font-semibold">{consulta.horario}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleStatusConsulta(consulta.id)}
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
    const handleClickOutside = (event) => {
      if (pacienteRef.current && !pacienteRef.current.contains(event.target)) {
        setFiltroPacienteAberto(false);
      }
      if (dataRef.current && !dataRef.current.contains(event.target)) {
        setCalendarioAberto(false);
      }
      if (mesRef.current && !mesRef.current.contains(event.target)) {
        setFiltroMesAberto(false);
      }
      if (periodoRef.current && !periodoRef.current.contains(event.target)) {
        setFiltroPeriodoAberto(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setFiltroStatusAberto(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setConsultas(prev => [...prev]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // ===== DADOS COMPUTADOS =====
  const consultasFiltradas = obterConsultasFiltradas();
  const consultasAgrupadas = agruparPorPeriodo(consultasFiltradas);
  const totalConsultas = consultasFiltradas.length;

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
              <h1 className="text-2xl lg:text-3xl font-bold text-odara-dark mr-2">
                Checklist de Consultas Médicas
              </h1>
              <div className="relative">
                <button 
                  onMouseEnter={() => setInfoVisivel(true)} 
                  onMouseLeave={() => setInfoVisivel(false)} 
                  className="text-odara-accent"
                >
                  <FaInfoCircle size={20} />
                </button>
                {infoVisivel && (
                  <div className="absolute z-10 left-0 top-full mt-2 w-72 p-3 bg-odara-dropdown text-odara-name text-sm rounded-lg shadow-lg">
                    <h3 className="font-bold mb-2">Checklist de Consultas</h3>
                    <p>
                      Marque as consultas como concluídas após a realização. 
                      O sistema atualiza automaticamente o status baseado no horário.
                    </p>
                  </div>
                )}
              </div>
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
                setFiltroPacienteAberto(false);
                setFiltroMesAberto(false);
                setFiltroPeriodoAberto(false);
                setCalendarioAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Status
            </button>
            {filtroStatusAberto && (
              <div className="absolute mt-2 w-32 bg-white rounded-lg shadow-lg !border-2 !border-odara-primary z-10">
                {Object.entries(ROTULOS_FILTRO_STATUS).map(([valor, rotulo]) => (
                  <button
                    key={valor}
                    onClick={() => {
                      setFiltroStatus(valor);
                      setFiltroStatusAberto(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:!bg-odara-primary/20 
                      ${filtroStatus === valor ? '!bg-odara-accent/20 font-semibold' : '!border-1 !border-odara-contorno !rounded'}`}
                  >
                    {rotulo}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtro de Paciente */}
          <div className="relative" ref={pacienteRef}>
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 
                ${filtroPacienteAberto ? 'border-odara-primary text-gray-700' : 'border-odara-primary/40 text-gray-700'} 
                font-medium hover:border-odara-primary transition text-sm`}
              onClick={() => {
                setFiltroPacienteAberto(!filtroPacienteAberto);
                setFiltroStatusAberto(false);
                setFiltroMesAberto(false);
                setFiltroPeriodoAberto(false);
                setCalendarioAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Paciente
            </button>
            {filtroPacienteAberto && (
              <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg !border-2 !border-odara-primary z-10 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setFiltroPaciente('todos');
                    setFiltroPacienteAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:!bg-odara-primary/20 
                    ${filtroPaciente === 'todos' ? '!bg-odara-accent/20 font-semibold' : '!border-1 !border-odara-contorno !rounded'}`}
                >
                  Todos os Pacientes
                </button>
                {pacientes.map(paciente => (
                  <button
                    key={paciente}
                    onClick={() => {
                      setFiltroPaciente(paciente);
                      setFiltroPacienteAberto(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:!bg-odara-primary/20 
                      ${filtroPaciente === paciente ? '!bg-odara-accent/20 font-semibold' : '!border-1 !border-odara-contorno !rounded'}`}
                  >
                    {paciente}
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
                setFiltroPacienteAberto(false);
                setFiltroMesAberto(false);
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

          {/* Filtro de Período */}
          <div className="relative" ref={periodoRef}>
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 font-medium hover:border-odara-primary transition text-sm
                ${filtroPeriodoAberto ? 'border-odara-primary text-gray-700' : 'border-odara-primary/40 text-gray-700'}`}
              onClick={() => {
                setFiltroPeriodoAberto(!filtroPeriodoAberto);
                setFiltroStatusAberto(false);
                setFiltroPacienteAberto(false);
                setFiltroMesAberto(false);
                setCalendarioAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Período
            </button>
            {filtroPeriodoAberto && (
              <div className="absolute mt-2 w-32 bg-white rounded-lg shadow-lg !border-2 !border-odara-primary z-10">
                {Object.entries(ROTULOS_PERIODOS).map(([valor, rotulo]) => (
                  <button
                    key={valor}
                    onClick={() => {
                      setFiltroPeriodo(valor);
                      setFiltroPeriodoAberto(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:!bg-odara-primary/20 
                      ${filtroPeriodo === valor ? '!bg-odara-accent/20 font-semibold' : '!border-1 !border-odara-contorno !rounded'}`}
                  >
                    {rotulo}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtro de Mês */}
          <div className="relative" ref={mesRef}>
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 font-medium hover:border-odara-primary transition text-sm
                ${filtroMesAberto ? 'border-odara-primary text-gray-700' : 'border-odara-primary/40 text-gray-700'}`}
              onClick={() => {
                setFiltroMesAberto(!filtroMesAberto);
                setFiltroStatusAberto(false);
                setFiltroPacienteAberto(false);
                setFiltroPeriodoAberto(false);
                setCalendarioAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Mês
            </button>
            {filtroMesAberto && (
              <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg !border-2 !border-odara-primary z-10 max-h-60 overflow-y-auto">
                {mesesLista.map(mes => (
                  <button
                    key={mes.id}
                    onClick={() => {
                      setFiltroMes(mes.id);
                      setFiltroMesAberto(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:!bg-odara-primary/20 
                      ${filtroMes === mes.id ? '!bg-odara-accent/20 font-semibold' : '!border-1 !border-odara-contorno !rounded'}`}
                  >
                    {mes.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Botão Adicionar Consulta */}
          <button
            onClick={abrirModalAdicionar}
            className="flex items-center bg-odara-accent hover:bg-odara-secondary/90 text-odara-contorno font-medium py-2 px-4 rounded-lg transition duration-200 border-2 border-odara-contorno"
          >
            <FaPlus className="mr-2" /> Nova Consulta
          </button>

          {/* Botão Limpar Filtros */}
          {(filtroData.toDateString() !== new Date().toDateString() || filtroPaciente !== 'todos' || filtroMes !== 'todos' || filtroPeriodo !== 'todos' || filtroStatus !== 'todos') && (
            <button
              onClick={() => {
                setFiltroData(new Date());
                setFiltroPaciente('todos');
                setFiltroMes('todos');
                setFiltroPeriodo('todos');
                setFiltroStatus('todos');
              }}
              className="flex items-center bg-odara-accent text-odara-white rounded-full px-3 py-2 shadow-sm font-medium hover:bg-odara-secondary transition text-sm"
            >
              <FaTimes className="mr-1" /> Limpar Filtros
            </button>
          )}
        </div>

        {/* ===== CONTAINER PRINCIPAL DO CHECKLIST ===== */}
        <div className="w-full max-w-6xl bg-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-4 lg:p-6 relative">

          {/* ===== CONTROLES DE DATA E TÍTULO ===== */}
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={irParaOntem} className="p-2 text-odara-accent hover:text-odara-secondary transition-colors" title="Dia anterior">
                <FaChevronLeft />
              </button>
              <button onClick={irParaHoje} className="bg-odara-accent hover:bg-odara-secondary text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm lg:text-base">
                Ir para Hoje
              </button>
              <button onClick={irParaAmanha} className="p-2 text-odara-accent hover:text-odara-secondary transition-colors" title="Próximo dia">
                <FaChevronRight />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-center sm:text-left">
              <h2 className="text-xl lg:text-2xl font-bold text-odara-dark">
                {ROTULOS_STATUS[filtroStatus]}
              </h2>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                Total: {totalConsultas}
              </span>
            </div>

            {/* ===== TARJAS DE FILTROS ATIVOS ===== */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {filtroStatus !== STATUS.TODOS && (
                <span className="bg-odara-dropdown-accent/20 text-odara-dropdown-accent font-bold px-3 py-1 rounded-full text-sm">
                  Status: {ROTULOS_FILTRO_STATUS[filtroStatus]}
                </span>
              )}
              {filtroPaciente !== 'todos' && (
                <span className="bg-odara-primary/20 text-odara-primary font-bold px-3 py-1 rounded-full text-sm">
                  Paciente: {filtroPaciente}
                </span>
              )}
              <span className="bg-odara-accent/20 text-odara-accent font-bold px-3 py-1 rounded-full text-sm">
                Data: {formatarData(filtroData)}
              </span>
              {filtroPeriodo !== PERIODOS.TODOS && (
                <span className="bg-odara-secondary/20 text-odara-secondary font-bold px-3 py-1 rounded-full text-sm">
                  Período: {ROTULOS_PERIODOS[filtroPeriodo]}
                </span>
              )}
              {filtroMes !== 'todos' && (
                <span className="bg-odara-primary/20 text-odara-primary font-bold px-3 py-1 rounded-full text-sm">
                  Mês: {mesesLista.find(m => m.id === filtroMes)?.label}
                </span>
              )}
            </div>
          </div>

          {/* ===== LISTA DE CONSULTAS ===== */}
          <div
            id="checklist-container"
            className="max-h-[500px] lg:max-h-[600px] overflow-y-auto"
            onScroll={verificarScroll}
          >
            <button
              onClick={scrollParaTopo}
              className={`fixed bottom-6 bg-odara-accent text-white p-3 rounded-full shadow-lg hover:bg-odara-secondary transition-all duration-300 z-50 ${mostrarScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
              title="Voltar ao topo"
            >
              <FaArrowUp />
            </button>

            {/* Renderização por períodos */}
            {filtroPeriodo === PERIODOS.TODOS ? (
              <div>
                {/* Manhã */}
                {consultasAgrupadas[PERIODOS.MANHA].length > 0 && (
                  <>
                    {renderizarDivisorPeriodo(PERIODOS.MANHA)}
                    <div className="space-y-4">
                      {consultasAgrupadas[PERIODOS.MANHA].map(consulta => (
                        <div key={consulta.id} className="bg-white rounded-lg shadow-md border border-gray-200">
                          {renderizarHeaderCard(consulta)}
                          <div className="p-4">
                            <h3 className="text-xl font-semibold text-odara-dark mb-3">{consulta.paciente}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-odara-dark/70 mb-1"><span className="font-medium">Idade:</span> {consulta.idade} anos</p>
                                <p className="text-odara-dark/70 mb-1"><span className="font-medium">Sexo:</span> {consulta.sexo}</p>
                                <p className="text-odara-dark/70"><span className="font-medium">Prontuário:</span> {consulta.prontuario}</p>
                              </div>
                              <div>
                                <p className="text-odara-dark/70 mb-1"><span className="font-medium">Médico:</span> {consulta.medico}</p>
                                <p className="text-odara-dark/70 mb-1"><span className="font-medium">Local:</span> {consulta.local}</p>
                                <p className="text-odara-dark/70"><span className="font-medium">Motivo:</span> {consulta.motivo}</p>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 bg-gray-50 rounded-b-lg flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="bg-odara-accent text-white px-3 py-1 rounded-full text-sm">
                                {consulta.paciente}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => abrirModalEditar(consulta)}
                                className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 p-2 rounded-full hover:bg-odara-accent/10"
                              >
                                <FaEdit />
                              </button>
                              <button 
                                onClick={() => excluirConsulta(consulta.id)}
                                className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Tarde */}
                {consultasAgrupadas[PERIODOS.TARDE].length > 0 && (
                  <>
                    {renderizarDivisorPeriodo(PERIODOS.TARDE)}
                    <div className="space-y-4">
                      {consultasAgrupadas[PERIODOS.TARDE].map(consulta => (
                        <div key={consulta.id} className="bg-white rounded-lg shadow-md border border-gray-200">
                          {renderizarHeaderCard(consulta)}
                          <div className="p-4">
                            <h3 className="text-xl font-semibold text-odara-dark mb-3">{consulta.paciente}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-odara-dark/70 mb-1"><span className="font-medium">Idade:</span> {consulta.idade} anos</p>
                                <p className="text-odara-dark/70 mb-1"><span className="font-medium">Sexo:</span> {consulta.sexo}</p>
                                <p className="text-odara-dark/70"><span className="font-medium">Prontuário:</span> {consulta.prontuario}</p>
                              </div>
                              <div>
                                <p className="text-odara-dark/70 mb-1"><span className="font-medium">Médico:</span> {consulta.medico}</p>
                                <p className="text-odara-dark/70 mb-1"><span className="font-medium">Local:</span> {consulta.local}</p>
                                <p className="text-odara-dark/70"><span className="font-medium">Motivo:</span> {consulta.motivo}</p>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 bg-gray-50 rounded-b-lg flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="bg-odara-accent text-white px-3 py-1 rounded-full text-sm">
                                {consulta.paciente}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => abrirModalEditar(consulta)}
                                className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 p-2 rounded-full hover:bg-odara-accent/10"
                              >
                                <FaEdit />
                              </button>
                              <button 
                                onClick={() => excluirConsulta(consulta.id)}
                                className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Noite */}
                {consultasAgrupadas[PERIODOS.NOITE].length > 0 && (
                  <>
                    {renderizarDivisorPeriodo(PERIODOS.NOITE)}
                    <div className="space-y-4">
                      {consultasAgrupadas[PERIODOS.NOITE].map(consulta => (
                        <div key={consulta.id} className="bg-white rounded-lg shadow-md border border-gray-200">
                          {renderizarHeaderCard(consulta)}
                          <div className="p-4">
                            <h3 className="text-xl font-semibold text-odara-dark mb-3">{consulta.paciente}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-odara-dark/70 mb-1"><span className="font-medium">Idade:</span> {consulta.idade} anos</p>
                                <p className="text-odara-dark/70 mb-1"><span className="font-medium">Sexo:</span> {consulta.sexo}</p>
                                <p className="text-odara-dark/70"><span className="font-medium">Prontuário:</span> {consulta.prontuario}</p>
                              </div>
                              <div>
                                <p className="text-odara-dark/70 mb-1"><span className="font-medium">Médico:</span> {consulta.medico}</p>
                                <p className="text-odara-dark/70 mb-1"><span className="font-medium">Local:</span> {consulta.local}</p>
                                <p className="text-odara-dark/70"><span className="font-medium">Motivo:</span> {consulta.motivo}</p>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 bg-gray-50 rounded-b-lg flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="bg-odara-accent text-white px-3 py-1 rounded-full text-sm">
                                {consulta.paciente}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => abrirModalEditar(consulta)}
                                className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 p-2 rounded-full hover:bg-odara-accent/10"
                              >
                                <FaEdit />
                              </button>
                              <button 
                                onClick={() => excluirConsulta(consulta.id)}
                                className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {consultasFiltradas.map(consulta => (
                  <div key={consulta.id} className="bg-white rounded-lg shadow-md border border-gray-200">
                    {renderizarHeaderCard(consulta)}
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-odara-dark mb-3">{consulta.paciente}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-odara-dark/70 mb-1"><span className="font-medium">Idade:</span> {consulta.idade} anos</p>
                          <p className="text-odara-dark/70 mb-1"><span className="font-medium">Sexo:</span> {consulta.sexo}</p>
                          <p className="text-odara-dark/70"><span className="font-medium">Prontuário:</span> {consulta.prontuario}</p>
                        </div>
                        <div>
                          <p className="text-odara-dark/70 mb-1"><span className="font-medium">Médico:</span> {consulta.medico}</p>
                          <p className="text-odara-dark/70 mb-1"><span className="font-medium">Local:</span> {consulta.local}</p>
                          <p className="text-odara-dark/70"><span className="font-medium">Motivo:</span> {consulta.motivo}</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 rounded-b-lg flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="bg-odara-accent text-white px-3 py-1 rounded-full text-sm">
                          {consulta.paciente}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => abrirModalEditar(consulta)}
                          className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 p-2 rounded-full hover:bg-odara-accent/10"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => excluirConsulta(consulta.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {consultasFiltradas.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhuma consulta encontrada para os filtros selecionados.</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal de Consulta */}
        {modalAberto && (
          <ModalConsulta
            consulta={consultaEditando}
            onClose={() => { setModalAberto(false); setConsultaEditando(null); }}
            onSave={salvarConsulta}
          />
        )}
      </div>
    </div>
  );
};

// Modal (mantido igual)
const ModalConsulta = ({ consulta, onClose, onSave }) => {
  const initial = consulta ? {
    ...consulta,
    data: consulta.data instanceof Date ? consulta.data.toISOString().split('T')[0] : (consulta.data || '')
  } : {
    paciente: '',
    idade: '',
    sexo: 'Masculino',
    prontuario: '',
    data: '',
    horario: '',
    medico: '',
    motivo: '',
    historico: '',
    tratamento: '',
    exames: '',
    receitas: '',
    anexos: [],
    local: ''
  };

  const [formData, setFormData] = useState(initial);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'anexos' && files) {
      setFormData(prev => ({ ...prev, anexos: Array.from(files) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-odara-offwhite/80 flex items-center justify-center p-4 z-50">
      <div className="bg-odara-offwhite rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 border-l-4 border-odara-primary">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-odara-dark">{consulta ? 'Editar' : 'Nova'} Consulta Médica</h2>
          <button onClick={onClose} className="text-odara-dark hover:text-odara-accent transition-colors duration-200">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-odara-dark font-medium mb-2">Paciente *</label>
              <input name="paciente" value={formData.paciente} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required />
            </div>
            <div>
              <label className="block text-odara-dark font-medium mb-2">Idade *</label>
              <input name="idade" type="number" value={formData.idade} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required />
            </div>
            <div>
              <label className="block text-odara-dark font-medium mb-2">Sexo *</label>
              <select name="sexo" value={formData.sexo} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required>
                <option>Masculino</option><option>Feminino</option><option>Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-odara-dark font-medium mb-2">Nº Prontuário *</label>
              <input name="prontuario" value={formData.prontuario} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required />
            </div>

            <div>
              <label className="block text-odara-dark font-medium mb-2">Data *</label>
              <input name="data" type="date" value={formData.data} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required />
            </div>
            <div>
              <label className="block text-odara-dark font-medium mb-2">Horário *</label>
              <input name="horario" type="time" value={formData.horario} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required />
            </div>

            <div>
              <label className="block text-odara-dark font-medium mb-2">Médico *</label>
              <input name="medico" value={formData.medico} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required />
            </div>
            <div>
              <label className="block text-odara-dark font-medium mb-2">Local *</label>
              <input name="local" value={formData.local} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required />
            </div>
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Motivo da Consulta *</label>
            <textarea name="motivo" value={formData.motivo} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" rows="3" required />
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Histórico e Evolução Clínica</label>
            <textarea name="historico" value={formData.historico} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" rows="3" />
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Tratamento Indicado</label>
            <textarea name="tratamento" value={formData.tratamento} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" rows="2" />
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Exames Solicitados</label>
            <textarea name="exames" value={formData.exames} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" rows="2" />
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Receitas Médicas</label>
            <textarea name="receitas" value={formData.receitas} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" rows="2" />
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Anexos (PDF)</label>
            <input name="anexos" type="file" onChange={handleChange} accept="application/pdf" multiple />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-odara-primary/30 text-odara-dark rounded-lg hover:bg-white">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-odara-accent text-odara-contorno rounded-lg hover:bg-odara-secondary/90 border-2 border-odara-contorno">{consulta ? 'Atualizar' : 'Salvar'} Consulta</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Consultas;