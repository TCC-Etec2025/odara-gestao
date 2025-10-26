import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaTimes, FaArrowLeft, FaCamera, FaCheck, FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

/**
 * COMPONENTE PRINCIPAL: REGISTRO DE MEDICAMENTOS
 * 
 * Este componente gerencia o cadastro, visualização e controle de administração
 * de medicamentos para residentes, com diferentes tipos de recorrência e
 * sistema completo de acompanhamento.
*/
const RegistroMedicamentos = () => {
  // ===== CONSTANTES E CONFIGURAÇÕES DO SISTEMA =====

  /**
   * Array com configurações dos dias da semana para seleção na interface
   * Cada objeto contém id numérico (0-6) e label abreviado
  */
  const DIAS_SEMANA = [
    { id: 0, label: 'Dom' },
    { id: 1, label: 'Seg' },
    { id: 2, label: 'Ter' },
    { id: 3, label: 'Qua' },
    { id: 4, label: 'Qui' },
    { id: 5, label: 'Sex' },
    { id: 6, label: 'Sáb' }
  ];

  /**
   * ENUM: Tipos de recorrência disponíveis para medicamentos
   * - DIARIO: Administração todos os dias
   * - SEMANAL: Administração em dias específicos da semana
   * - MENSAL: Administração em dias específicos do mês (mesmos horários)
   * - UNICO: Administração em dias específicos (horários podem variar)
  */
  const RECORRENCIAS = {
    DIARIO: 'diario',
    SEMANAL: 'semanal',
    MENSAL: 'mensal',
    UNICO: 'unico'
  };

  /**
   * Mapeamento de recorrências para labels amigáveis exibidos na interface
  */
  const ROTULOS_RECORRENCIAS = {
    [RECORRENCIAS.DIARIO]: "Diário",
    [RECORRENCIAS.SEMANAL]: "Semanal",
    [RECORRENCIAS.MENSAL]: "Mensal",
    [RECORRENCIAS.UNICO]: "Único"
  };

  /**
   * ENUM: Status possíveis para um medicamento
   * - ATIVO: Em uso atualmente
   * - SUSPENSO: Não está sendo administrado temporariamente
   * - FINALIZADO: Tratamento concluído
  */
  const STATUS = {
    ATIVO: 'ativo',
    SUSPENSO: 'suspenso',
    FINALIZADO: 'finalizado'
  };

  /**
   * Mapeamento de status para labels no plural (usado em filtros)
  */
  const ROTULOS_STATUS = {
    [STATUS.ATIVO]: "Ativos",
    [STATUS.SUSPENSO]: "Suspensos",
    [STATUS.FINALIZADO]: "Finalizados"
  };

  /**
   * Mapeamento de status para labels no singular (usado em dropdowns)
  */
  const ROTULOS_STATUS_SINGULAR = {
    [STATUS.ATIVO]: "Ativo",
    [STATUS.SUSPENSO]: "Suspenso",
    [STATUS.FINALIZADO]: "Finalizado"
  };

  /**
   * ENUM: Status de controle de administração
   * - TODOS: Sem filtro específico
   * - ADMINISTRADO: Dose já foi administrada
   * - ATRASADO: Dose não foi administrada no horário previsto
   * - PENDENTE: Dose ainda não foi administrada
  */
  const CONTROLES = {
    TODOS: 'todos',
    ADMINISTRADO: 'concluido',
    ATRASADO: 'atrasado',
    PENDENTE: 'pendente'
  };

  /**
   * Mapeamento de controles para labels amigáveis
  */
  const ROTULOS_CONTROLES = {
    [CONTROLES.TODOS]: "Todos",
    [CONTROLES.ADMINISTRADO]: "Concluídos",
    [CONTROLES.ATRASADO]: "Atrasados",
    [CONTROLES.PENDENTE]: "Pendentes"
  };

  /**
   * Configurações visuais completas para cada status de administração
   * Inclui cores, ícones e textos para diferentes estados
  */
  const CONFIGS_ADMINISTRACAO = {
    [CONTROLES.ADMINISTRADO]: {
      corBolinha: 'bg-green-500',
      corCheckbox: 'text-green-500 border-green-500',
      corTarja: 'bg-green-500 text-white',
      corFundo: 'bg-green-50',
      texto: 'Concluído',
      icone: <FaCheck size={10} />
    },

    [CONTROLES.PENDENTE]: {
      corBolinha: 'bg-yellow-500',
      corCheckbox: 'text-yellow-500 border-yellow-500',
      corTarja: 'bg-yellow-500 text-white',
      corFundo: 'bg-yellow-50',
      texto: 'Pendente',
      icone: <FaTimes size={10} />
    },

    [CONTROLES.ATRASADO]: {
      corBolinha: 'bg-red-500',
      corCheckbox: 'text-red-500 border-red-500',
      corTarja: 'bg-red-500 text-white',
      corFundo: 'bg-red-50',
      texto: 'Atrasado',
      icone: <FaTimes size={10} />
    }
  };

  // ===== ESTADOS PRINCIPAIS DA APLICAÇÃO =====

  /**
   * Estado que armazena todos os medicamentos cadastrados
   * Cobre todas as possibilidades de recorrências, agrupamentos, status e administrações
  */
  const [medicamentos, setMedicamentos] = useState([
    // 1. DIÁRIO - Todos os dias, múltiplos horários
    {
      id: 1,
      dataInicio: new Date(2024, 10, 20), // 20/11/2024
      residente: "João Silva",
      nomeMedicamento: "Losartana",
      dosagem: "50mg",
      dose: "1 comprimido",
      horarios: ["08:00", "20:00"],
      diasAdministracao: [0, 1, 2, 3, 4, 5, 6], // Todos os dias
      recorrencia: RECORRENCIAS.DIARIO,
      efeitosColaterais: "Tontura leve",
      observacoes: "Tomar com água",
      saudeRelacionada: "Hipertensão",
      foto: null,
      status: STATUS.ATIVO,
      administracoes: {
        "25/11/2024": { "08:00": CONTROLES.ADMINISTRADO, "20:00": CONTROLES.PENDENTE },
        "26/11/2024": { "08:00": CONTROLES.ATRASADO, "20:00": CONTROLES.PENDENTE }
      }
    },

    // 2. SEMANAL - Dias específicos da semana
    {
      id: 2,
      dataInicio: new Date(2024, 10, 15),
      dataFim: new Date(2024, 11, 15), // 15/12/2024
      residente: "Maria Santos",
      nomeMedicamento: "Sinvastatina",
      dosagem: "20mg",
      dose: "1 comprimido",
      horarios: ["22:00"],
      diasAdministracao: [1, 3, 5], // Seg, Qua, Sex
      recorrencia: RECORRENCIAS.SEMANAL,
      efeitosColaterais: "Dores musculares",
      observacoes: "Tomar à noite",
      saudeRelacionada: "Colesterol alto",
      foto: null,
      status: STATUS.ATIVO,
      administracoes: {
        "25/11/2024": { "22:00": CONTROLES.ADMINISTRADO },
        "27/11/2024": { "22:00": CONTROLES.PENDENTE }
      }
    },

    // 3. MENSAL - Mesmos horários em dias do mês
    {
      id: 3,
      dataInicio: new Date(2024, 10, 1),
      residente: "Carlos Oliveira",
      nomeMedicamento: "Omeprazol",
      dosagem: "20mg",
      dose: "1 cápsula",
      horarios: ["07:00", "19:00"],
      diasAdministracao: [],
      recorrencia: RECORRENCIAS.MENSAL,
      diasHorarios: [
        { data: new Date(2024, 10, 5), horarios: ["07:00", "19:00"] },
        { data: new Date(2024, 10, 15), horarios: ["07:00", "19:00"] },
        { data: new Date(2024, 10, 25), horarios: ["07:00", "19:00"] }
      ],
      efeitosColaterais: "Dor de cabeça",
      observacoes: "Tomar em jejum",
      saudeRelacionada: "Gastrite",
      foto: null,
      status: STATUS.ATIVO,
      administracoes: {
        "05/11/2024": { "07:00": CONTROLES.ADMINISTRADO, "19:00": CONTROLES.ADMINISTRADO },
        "15/11/2024": { "07:00": CONTROLES.ATRASADO, "19:00": CONTROLES.PENDENTE }
      }
    },

    // 4. ÚNICO - Horários diferentes por data (agrupamento complexo)
    {
      id: 4,
      dataInicio: new Date(2024, 10, 25),
      residente: "Ana Costa",
      nomeMedicamento: "Vitamina D",
      dosagem: "1000UI",
      dose: "1 cápsula",
      horarios: [],
      diasAdministracao: [],
      recorrencia: RECORRENCIAS.UNICO,
      diasHorarios: [
        { data: new Date(2024, 10, 25), horarios: ["12:00"] },
        { data: new Date(2024, 10, 26), horarios: ["12:00"] },
        { data: new Date(2024, 10, 27), horarios: ["12:00"] },
        { data: new Date(2024, 10, 28), horarios: ["14:00", "18:00"] },
        { data: new Date(2024, 10, 29), horarios: ["14:00", "18:00"] },
        { data: new Date(2024, 10, 30), horarios: ["09:00"] }
      ],
      efeitosColaterais: "Nenhum",
      observacoes: "Suplemento vitamínico",
      saudeRelacionada: "Deficiência vitamínica",
      foto: null,
      status: STATUS.ATIVO,
      administracoes: {
        "25/11/2024": { "12:00": CONTROLES.ADMINISTRADO },
        "26/11/2024": { "12:00": CONTROLES.ADMINISTRADO },
        "28/11/2024": { "14:00": CONTROLES.PENDENTE, "18:00": CONTROLES.PENDENTE }
      }
    },

    // 5. ÚNICO - Mesmos horários em todas as datas
    {
      id: 5,
      dataInicio: new Date(2024, 11, 1), // Data futura
      residente: "Pedro Almeida",
      nomeMedicamento: "Antibiótico",
      dosagem: "500mg",
      dose: "1 comprimido",
      horarios: ["08:00", "20:00"],
      diasAdministracao: [],
      recorrencia: RECORRENCIAS.UNICO,
      diasHorarios: [
        { data: new Date(2024, 11, 1), horarios: ["08:00", "20:00"] },
        { data: new Date(2024, 11, 2), horarios: ["08:00", "20:00"] },
        { data: new Date(2024, 11, 3), horarios: ["08:00", "20:00"] }
      ],
      efeitosColaterais: "Náusea",
      observacoes: "Completar tratamento",
      saudeRelacionada: "Infecção bacteriana",
      foto: null,
      status: STATUS.SUSPENSO, // Suspenso por data futura
      administracoes: {}
    },

    // 6. FINALIZADO - Tratamento concluído
    {
      id: 6,
      dataInicio: new Date(2024, 9, 1), // 01/10/2024
      dataFim: new Date(2024, 10, 15), // 15/11/2024
      residente: "Beatriz Lima",
      nomeMedicamento: "Amoxicilina",
      dosagem: "500mg",
      dose: "1 comprimido",
      horarios: ["08:00", "20:00"],
      diasAdministracao: [0, 1, 2, 3, 4, 5, 6],
      recorrencia: RECORRENCIAS.DIARIO,
      efeitosColaterais: "Diarreia leve",
      observacoes: "Tomar com alimentos",
      saudeRelacionada: "Infecção respiratória",
      foto: null,
      status: STATUS.FINALIZADO, // Finalizado automaticamente
      administracoes: {
        "01/10/2024": { "08:00": CONTROLES.ADMINISTRADO, "20:00": CONTROLES.ADMINISTRADO },
        "15/11/2024": { "08:00": CONTROLES.ADMINISTRADO, "20:00": CONTROLES.ADMINISTRADO }
      }
    },

    // 7. MENSAL - Dias esparsos do mês
    {
      id: 7,
      dataInicio: new Date(2024, 10, 10),
      residente: "Roberto Santos",
      nomeMedicamento: "AAS",
      dosagem: "100mg",
      dose: "1 comprimido",
      horarios: ["09:00"],
      diasAdministracao: [],
      recorrencia: RECORRENCIAS.MENSAL,
      diasHorarios: [
        { data: new Date(2024, 10, 5), horarios: ["09:00"] },
        { data: new Date(2024, 10, 10), horarios: ["09:00"] },
        { data: new Date(2024, 11, 15), horarios: ["09:00"] },
        { data: new Date(2024, 11, 20), horarios: ["09:00"] }
      ],
      efeitosColaterais: "Sangramento",
      observacoes: "Prevenção cardiovascular",
      saudeRelacionada: "Problemas cardíacos",
      foto: null,
      status: STATUS.ATIVO,
      administracoes: {
        "10/11/2024": { "09:00": CONTROLES.ADMINISTRADO },
        "20/11/2024": { "09:00": CONTROLES.ATRASADO }
      }
    },

    // 8. ÚNICO - Agrupamento complexo (teste do algoritmo)
    {
      id: 8,
      dataInicio: new Date(2024, 10, 20),
      residente: "Fernanda Costa",
      nomeMedicamento: "Analgésico",
      dosagem: "500mg",
      dose: "1 comprimido",
      horarios: [],
      diasAdministracao: [],
      recorrencia: RECORRENCIAS.UNICO,
      diasHorarios: [
        { data: new Date(2024, 10, 20), horarios: ["08:00", "12:00", "18:00"] },
        { data: new Date(2024, 10, 21), horarios: ["08:00", "12:00", "18:00"] },
        { data: new Date(2024, 10, 22), horarios: ["08:00", "18:00"] },
        { data: new Date(2024, 10, 23), horarios: ["12:00"] },
        { data: new Date(2024, 10, 24), horarios: ["08:00", "20:00"] }
      ],
      efeitosColaterais: "Sonolência",
      observacoes: "Uso sob demanda",
      saudeRelacionada: "Dor crônica",
      foto: null,
      status: STATUS.ATIVO,
      administracoes: {
        "20/11/2024": {
          "08:00": CONTROLES.ADMINISTRADO,
          "12:00": CONTROLES.ADMINISTRADO,
          "18:00": CONTROLES.PENDENTE
        },        
        "21/11/2024": {
          "08:00": CONTROLES.ATRASADO,
          "12:00": CONTROLES.PENDENTE,
          "18:00": CONTROLES.PENDENTE
        }
      }
    }
  ]);

  // ===== ESTADOS DE CONTROLE DA INTERFACE =====

  /**
   * Estado que controla a data atual sendo visualizada no calendário
  */
  const [dataAtual, setDataAtual] = useState(new Date());

  /**
   * Estado que controla se o modal de adicionar/editar está aberto
  */
  const [modalAberto, setModalAberto] = useState(false);

  /**
   * Estado que indica se está editando um medicamento existente
  */
  const [editando, setEditando] = useState(false);

  /**
   * Estado que armazena o ID do medicamento sendo editado
  */
  const [idEditando, setIdEditando] = useState(null);

  /**
   * Estado que controla se o modo de controle de administração está ativo
  */
  const [controleAtivo, setControleAtivo] = useState(false);

  /**
   * Estado que controla a visibilidade do tooltip informativo
  */
  const [infoVisivel, setInfoVisivel] = useState(false);

  /**
   * Estado que controla qual dropdown de status está aberto (por medicamento ID)
  */
  const [dropdownStatusAberto, setDropdownStatusAberto] = useState(null);

  /**
   * Estado que controla o modo de horários para recorrências mensal/única
   * - 'diferentes': Cada dia pode ter horários diferentes (apenas para ÚNICO)
   * - 'mesmos': Todos os dias usam os mesmos horários
  */
  const [modoHorarios, setModoHorarios] = useState('mesmos');

  /**
   * Estado que armazena os conjuntos de dia+horários para recorrências mensal/única
   * Cada objeto tem { data: string, horarios: string[] }
  */
  const [diasHorarios, setDiasHorarios] = useState([{ data: '', horarios: [''] }]);

  /**
   * Estado que armazena os dados do novo medicamento sendo criado/editado
  */
  const [novoMedicamento, setNovoMedicamento] = useState({
    residente: '',
    nomeMedicamento: '',
    dosagem: '',
    dose: '',
    horarios: [''],
    diasAdministracao: [],
    diasEspecificos: [],
    recorrencia: RECORRENCIAS.DIARIO,
    efeitosColaterais: '',
    observacoes: '',
    saudeRelacionada: '',
    foto: null,
    dataInicio: formatarChaveData(new Date()),
    dataFim: '',
    status: STATUS.ATIVO,
    administracoes: {}
  });

  // ===== ESTADOS PARA FILTROS =====

  /**
   * Estado do filtro por residente ('todos' ou nome específico)
  */
  const [filtroResidente, setFiltroResidente] = useState('todos');

  /**
   * Estado que controla se o dropdown de filtro por residente está aberto
  */
  const [filtroResidenteAberto, setFiltroResidenteAberto] = useState(false);

  /**
   * Estado do filtro por status ('todos' ou status específico)
  */
  const [filtroStatus, setFiltroStatus] = useState('todos');

  /**
   * Estado que controla se o dropdown de filtro por status está aberto
  */
  const [filtroStatusAberto, setFiltroStatusAberto] = useState(false);

  /**
   * Estado do filtro por controle de administração
  */
  const [filtroControle, setFiltroControle] = useState('todos');

  /**
   * Estado que controla se o dropdown de filtro por controle está aberto
  */
  const [filtroControleAberto, setFiltroControleAberto] = useState(false);

  /**
   * Estado que armazena a data selecionada para filtro
  */
  const [filtroDia, setFiltroDia] = useState(null);

  /**
   * Estado que indica se o filtro por dia está ativo
  */
  const [filtroDiaAtivo, setFiltroDiaAtivo] = useState(false);

  // ===== FUNÇÕES AUXILIARES =====

  /**
   * Formata uma data para string no formato DD/MM/AAAA
   * Usada como chave para o objeto de administracoes
   * 
   * @param {Date} data - Data a ser formatada
   * @returns {string} Data formatada como "DD/MM/AAAA"
  */
  function formatarChaveData(data) {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  /**
   * Verifica se uma administração está atrasada baseada na data e horário
   * Considera tolerância de 10 minutos para administrações do dia atual
   * 
   * @param {Date} data - Data da administração
   * @param {string} horario - Horário no formato "HH:MM"
   * @returns {boolean} True se estiver atrasado, False caso contrário
  */
  const estaAtrasado = (data, horario) => {
    // Retorna false se não há horário definido
    if (!horario) return false;

    const agora = new Date();
    const dataAtual = new Date();
    // Remove horas, minutos, segundos e milissegundos para comparar apenas a data
    dataAtual.setHours(0, 0, 0, 0);

    const dataMedicamento = new Date(data);
    // Remove horas, minutos, segundos e milissegundos
    dataMedicamento.setHours(0, 0, 0, 0);

    // Se a data do medicamento for futura, não está atrasado
    if (dataMedicamento > dataAtual) {
      return false;
    }

    // Se for hoje, verifica se passou mais de 10 minutos do horário
    if (dataMedicamento.getTime() === dataAtual.getTime()) {
      // Divide o horário em horas e minutos
      const [hora, minuto] = horario.split(':').map(Number);
      const horarioMedicamento = new Date();
      // Configura o horário específico do medicamento
      horarioMedicamento.setHours(hora, minuto, 0, 0);

      // Verifica se passou mais de 10 minutos do horário previsto
      return (agora - horarioMedicamento) > 10 * 60 * 1000; // 10 minutos de tolerância
    }

    // Se a data for passada (e não é hoje), está atrasado
    return dataMedicamento < dataAtual;
  };

  /**
   * Obtém o status atual de uma administração específica
   * Considera registros de administração e verificação de atraso
   * 
   * @param {Object} medicamento - Objeto completo do medicamento
   * @param {Date} data - Data da administração
   * @param {string} horario - Horário da administração
   * @returns {string} Status da administração (concluido/atrasado/pendente)
  */
  const getStatusAdministracao = (medicamento, data, horario) => {
    // Formata a data para usar como chave
    const chaveData = formatarChaveData(data);

    // Verifica se existe registro de administração para esta data e horário
    const administracao = medicamento.administracoes?.[chaveData]?.[horario];

    // Se foi marcado como concluído, retorna esse status
    if (administracao === CONTROLES.ADMINISTRADO) return CONTROLES.ADMINISTRADO;

    // Se não foi concluído, verifica se está atrasado
    if (estaAtrasado(data, horario)) return CONTROLES.ATRASADO;

    // Caso contrário, está pendente
    return CONTROLES.PENDENTE;
  };

  /**
   * Obtém as classes CSS apropriadas baseadas no status do medicamento
   * Usado para estilizar badges e elementos visuais
   * 
   * @param {string} status - Status do medicamento (ativo/suspenso/finalizado)
   * @returns {Object} Objeto com classes CSS para diferentes elementos
  */
  const getClassesStatus = (status) => {
    // Define as classes para cada status possível
    const classes = {
      'ativo': {
        bg: 'bg-green-500',
        text: 'text-white',
        hover: 'hover:bg-green-600',
        border: 'border-green-500'
      },

      'suspenso': {
        bg: 'bg-yellow-500',
        text: 'text-white',
        hover: 'hover:bg-yellow-600',
        border: 'border-yellow-500'
      },

      'finalizado': {
        bg: 'bg-gray-500',
        text: 'text-white',
        hover: 'hover:bg-gray-600',
        border: 'border-gray-500'
      }
    };

    // Retorna as classes para o status especificado ou default (finalizado)
    return classes[status] || classes.finalizado;
  };

  /**
   * Calcula qual deveria ser o status do medicamento baseado nas datas
   * Esta função é usada para sincronização automática, mas não altera o estado
   * 
   * @param {Object} medicamento - Objeto completo do medicamento
   * @returns {string} Status calculado (ativo/suspenso/finalizado)
  */
  const getStatusCalculado = (medicamento) => {
    const hoje = new Date();
    // Remove horas para comparar apenas datas
    hoje.setHours(0, 0, 0, 0);

    const dataInicio = new Date(medicamento.dataInicio);
    // Remove horas para comparar apenas datas
    dataInicio.setHours(0, 0, 0, 0);

    // Se a data atual é anterior à data de início, status é suspenso
    if (hoje < dataInicio) {
      return STATUS.SUSPENSO;
    }

    // Se existe data de fim e a data atual é posterior, status é finalizado
    if (medicamento.dataFim) {
      const dataFim = new Date(medicamento.dataFim);
      // Remove horas para comparar apenas datas
      dataFim.setHours(0, 0, 0, 0);

      if (hoje > dataFim) {
        return STATUS.FINALIZADO;
      }
    }

    // Caso contrário, status é ativo
    return STATUS.ATIVO;
  };

  /**
   * Formata um array de datas para exibição compacta e inteligente
   * Agrupa datas do mesmo mês/ano e formata de forma otimizada
   * 
   * @param {Array} datas - Array de strings de datas no formato "DD/MM/AAAA"
   * @returns {string} String formatada com datas agrupadas de forma inteligente
  */
  const formatarDatasAgrupadas = (datas) => {
    if (datas.length === 0) return '';

    // Converte para objetos Date e ordena
    const datasObj = datas.map(dataStr => {
      const [dia, mes, ano] = dataStr.split('/').map(Number);
      return new Date(ano, mes - 1, dia);
    }).sort((a, b) => a - b);

    // Agrupa por mês/ano
    const gruposPorMesAno = {};

    datasObj.forEach(data => {
      const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`;
      if (!gruposPorMesAno[mesAno]) {
        gruposPorMesAno[mesAno] = [];
      }
      gruposPorMesAno[mesAno].push(data.getDate());
    });

    // Formata cada grupo
    const gruposFormatados = Object.entries(gruposPorMesAno).map(([mesAno, dias]) => {
      const [mes, ano] = mesAno.split('/');
      const anoCurto = ano.slice(-2); // Pega apenas os últimos 2 dígitos do ano

      // Ordena os dias
      dias.sort((a, b) => a - b);

      // Agrupa dias consecutivos
      const sequencias = [];
      let sequenciaAtual = [dias[0]];

      for (let i = 1; i < dias.length; i++) {
        if (dias[i] === dias[i - 1] + 1) {
          // Dia consecutivo
          sequenciaAtual.push(dias[i]);
        } else {
          // Quebra de sequência
          sequencias.push([...sequenciaAtual]);
          sequenciaAtual = [dias[i]];
        }
      }
      sequencias.push(sequenciaAtual);

      // Formata as sequências
      const sequenciasFormatadas = sequencias.map(sequencia => {
        if (sequencia.length === 1) {
          return sequencia[0].toString().padStart(2, '0');
        } else if (sequencia.length === 2) {
          return `${sequencia[0].toString().padStart(2, '0')} e ${sequencia[1].toString().padStart(2, '0')}`;
        } else {
          return `${sequencia[0].toString().padStart(2, '0')} a ${sequencia[sequencia.length - 1].toString().padStart(2, '0')}`;
        }
      });

      const diasFormatados = sequenciasFormatadas.join(', ');
      return `${diasFormatados}/${mes.padStart(2, '0')}/${anoCurto}`;
    });

    return gruposFormatados.join(', ');
  };

  /**
   * Agrupa datas e horários de forma híbrida, usando ambas as estratégias
   * Retorna a representação mais compacta possível combinando os dois métodos
  */
  const agruparDatasHorariosHibrido = (diasHorarios) => {
    // Agrupa por horário primeiro
    const gruposPorHorario = {};
    diasHorarios.forEach(conjunto => {
      const dataObj = new Date(conjunto.data);
      const dataFormatada = `${dataObj.getDate().toString().padStart(2, '0')}/${(dataObj.getMonth() + 1).toString().padStart(2, '0')}/${dataObj.getFullYear()}`;

      conjunto.horarios.forEach(horario => {
        const horarioFormatado = horario.replace(':', 'h');
        if (!gruposPorHorario[horarioFormatado]) {
          gruposPorHorario[horarioFormatado] = [];
        }
        gruposPorHorario[horarioFormatado].push(dataFormatada);
      });
    });

    // Para cada horário, verifica se pode agrupar suas datas
    const resultado = [];

    Object.entries(gruposPorHorario).forEach(([horario, datas]) => {
      const datasFormatadas = formatarDatasAgrupadas(datas);

      // Verifica se este horário aparece sozinho em todas as suas datas
      const isHorarioUnicoNasDatas = datas.every(data => {
        const dataObj = diasHorarios.find(d => {
          const dData = `${new Date(d.data).getDate().toString().padStart(2, '0')}/${(new Date(d.data).getMonth() + 1).toString().padStart(2, '0')}/${new Date(d.data).getFullYear()}`;
          return dData === data;
        });
        return dataObj && dataObj.horarios.length === 1;
      });

      if (isHorarioUnicoNasDatas) {
        // Horário único em todas as suas datas - agrupa por horário
        resultado.push(`${horario} (${datasFormatadas})`);
      } else {
        // Horário compartilhado com outros em algumas datas - precisa agrupar por data
        const datasComEsteHorario = datas;

        // Para cada data deste horário, pega todos os horários daquela data
        const gruposPorData = {};
        datasComEsteHorario.forEach(data => {
          const conjuntoData = diasHorarios.find(d => {
            const dData = `${new Date(d.data).getDate().toString().padStart(2, '0')}/${(new Date(d.data).getMonth() + 1).toString().padStart(2, '0')}/${new Date(d.data).getFullYear()}`;
            return dData === data;
          });

          if (conjuntoData) {
            const horariosDaData = conjuntoData.horarios.map(h => h.replace(':', 'h'));
            const chaveHorarios = horariosDaData.sort().join(', ');

            if (!gruposPorData[chaveHorarios]) {
              gruposPorData[chaveHorarios] = [];
            }
            gruposPorData[chaveHorarios].push(data);
          }
        });

        // Adiciona os grupos por data para este horário
        Object.entries(gruposPorData).forEach(([horariosStr, datasGrupo]) => {
          const datasFormatadasGrupo = formatarDatasAgrupadas(datasGrupo);
          resultado.push(`${horariosStr} (${datasFormatadasGrupo})`);
        });
      }
    });

    // Remove duplicatas (pode acontecer devido ao processamento)
    const resultadoUnico = [...new Set(resultado)];
    return resultadoUnico.join('; ');
  };

  // ===== FUNÇÕES PARA CALENDÁRIO E FILTROS =====

  /**
   * Verifica se um medicamento deve ser administrado em uma data específica
   * Considera status, datas de início/fim e regras de recorrência
   * 
   * @param {Object} medicamento - Objeto completo do medicamento
   * @param {Date} data - Data a ser verificada
   * @returns {boolean} True se deve ser administrado na data
  */
  const medicamentoNoDia = (medicamento, data) => {
    // Medicamentos suspensos ou finalizados NUNCA aparecem no calendário
    if (medicamento.status === STATUS.SUSPENSO || medicamento.status === STATUS.FINALIZADO) {
      return false;
    }

    // Para medicamentos ativos, usa o status calculado como verificação adicional
    const statusCalculado = getStatusCalculado(medicamento);

    // Se o status calculado não for ativo, não aparece
    if (statusCalculado !== STATUS.ATIVO) {
      return false;
    }

    const dataVerificar = new Date(data);
    // Remove horas para comparar apenas datas
    dataVerificar.setHours(0, 0, 0, 0);

    const dataInicio = new Date(medicamento.dataInicio);
    // Remove horas para comparar apenas datas
    dataInicio.setHours(0, 0, 0, 0);

    // Verifica se a data está após a data de início
    if (dataVerificar < dataInicio) {
      return false;
    }

    // Verifica se a data está antes da data de fim (se existir)
    if (medicamento.dataFim) {
      const dataFim = new Date(medicamento.dataFim);
      // Remove horas para comparar apenas datas
      dataFim.setHours(0, 0, 0, 0);

      if (dataVerificar > dataFim) {
        return false;
      }
    }

    // Lógica de recorrência baseada no tipo
    switch (medicamento.recorrencia) {
      case RECORRENCIAS.DIARIO:
        // Diário: administra todos os dias
        return true;

      case RECORRENCIAS.SEMANAL:
        // Semanal: administra apenas nos dias da semana selecionados
        return medicamento.diasAdministracao.includes(dataVerificar.getDay());

      case RECORRENCIAS.MENSAL:
      case RECORRENCIAS.UNICO:
        // Mensal e Único: administra apenas nas datas específicas de diasHorarios
        if (!medicamento.diasHorarios || medicamento.diasHorarios.length === 0) return false;

        return medicamento.diasHorarios.some(conjunto => {
          const dataConjunto = new Date(conjunto.data);
          // Remove horas para comparar apenas datas
          dataConjunto.setHours(0, 0, 0, 0);

          // Verifica se a data do conjunto é igual à data sendo verificada
          return dataConjunto.getTime() === dataVerificar.getTime();
        });

      default:
        return false;
    }
  };

  /**
   * Obtém todos os medicamentos que devem ser administrados em uma data específica
   * Aplica filtros de status e controle se estiverem ativos
   * 
   * @param {Date} data - Data para verificação
   * @returns {Array} Array de medicamentos do dia
  */
  const obterMedicamentosDoDia = (data) => {
    // Filtra medicamentos ativos que devem ser administrados na data
    let medicamentosDoDia = medicamentos.filter(medicamento =>
      medicamento.status === STATUS.ATIVO && medicamentoNoDia(medicamento, data)
    );

    // Aplica filtro de controle se estiver ativo e não for "todos"
    if (controleAtivo && filtroControle !== CONTROLES.TODOS) {
      medicamentosDoDia = medicamentosDoDia.filter(medicamento =>
        // Verifica se o medicamento tem alguma administração com o status do filtro
        medicamento.horarios.some(horario =>
          getStatusAdministracao(medicamento, data, horario) === filtroControle
        )
      );
    }

    return medicamentosDoDia;
  };

  /**
   * Obtém os residentes únicos que têm medicamentos para administrar em uma data
   * 
   * @param {Date} data - Data para verificação
   * @returns {Array} Array de nomes de residentes únicos
  */
  const obterResidentesDoDia = (data) => {
    const medicamentosDoDia = obterMedicamentosDoDia(data);
    // Usa Set para garantir residentes únicos
    return [...new Set(medicamentosDoDia.map(med => med.residente))];
  };

  /**
   * Obtém os horários que um medicamento deve ter em uma data específica
   * Considera o tipo de recorrência e a estrutura de diasHorarios
   * 
   * @param {Object} medicamento - Objeto completo do medicamento
   * @param {Date} data - Data para obter os horários
   * @returns {Array} Array de horários para a data
  */
  const obterHorariosParaData = (medicamento, data) => {
    // Para recorrências mensal e único, verifica diasHorarios
    if ((medicamento.recorrencia === RECORRENCIAS.MENSAL || medicamento.recorrencia === RECORRENCIAS.UNICO) &&
      medicamento.diasHorarios) {

      // Procura o conjunto específico para esta data
      const conjuntoParaData = medicamento.diasHorarios.find(conjunto => {
        const dataConjunto = new Date(conjunto.data);
        dataConjunto.setHours(0, 0, 0, 0);
        const dataVerificar = new Date(data);
        dataVerificar.setHours(0, 0, 0, 0);

        return dataConjunto.getTime() === dataVerificar.getTime();
      });

      // Se encontrou o conjunto, retorna os horários específicos
      if (conjuntoParaData) {
        return conjuntoParaData.horarios;
      }

      // Se não encontrou, retorna array vazio
      return [];
    }

    // Para diário e semanal, usa os horários padrão
    return medicamento.horarios;
  };

  /**
   * Calcula estatísticas de administração para uma data específica
   * 
   * @param {Date} data - Data para cálculo
   * @returns {Object} Estatísticas com totais por status
  */
  const getEstatisticasDia = (data) => {
    const medicamentosDoDia = obterMedicamentosDoDia(data);

    // Inicializa contadores
    let administradas = 0;
    let atrasadas = 0;
    let pendentes = 0;
    let total = 0;

    // Para cada medicamento do dia
    medicamentosDoDia.forEach(medicamento => {
      // Obtém os horários específicos para esta data
      const horariosParaData = obterHorariosParaData(medicamento, data);

      // Para cada horário, verifica o status e incrementa os contadores
      horariosParaData.forEach(horario => {
        const status = getStatusAdministracao(medicamento, data, horario);
        total++;

        if (status === CONTROLES.ADMINISTRADO) administradas++;
        else if (status === CONTROLES.ATRASADO) atrasadas++;
        else pendentes++;
      });
    });

    return { administradas, atrasadas, pendentes, total };
  };

  /**
   * Determina a cor do calendário baseado nas estatísticas do dia
   * 
   * @param {Date} data - Data para verificação
   * @returns {string|null} Classe CSS da cor ou null se não há medicamentos
  */
  const getCorCalendario = (data) => {
    const estatisticas = getEstatisticasDia(data);

    // Se não há administrações, não mostra cor
    if (estatisticas.total === 0) return null;

    // Verifica se há medicamentos após aplicar filtros
    if (controleAtivo && filtroControle !== CONTROLES.TODOS) {
      const medicamentosDoDia = obterMedicamentosDoDia(data);
      if (medicamentosDoDia.length === 0) return null;
    }

    // Lógica de cores baseada no status das administrações
    if (!controleAtivo || filtroControle === CONTROLES.TODOS) {
      // Se há atrasados, mostra vermelho
      if (estatisticas.atrasadas > 0) return 'bg-red-500';
      // Se há pendentes, mostra amarelo
      if (estatisticas.pendentes > 0) return 'bg-yellow-500';
      // Se tudo está concluído, mostra verde
      return 'bg-green-500';
    }

    // Cores específicas para cada tipo de filtro de controle
    switch (filtroControle) {
      case CONTROLES.ADMINISTRADO: return 'bg-green-500';
      case CONTROLES.ATRASADO: return 'bg-red-500';
      case CONTROLES.PENDENTE: return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  /**
   * Conteúdo customizado para cada dia do calendário
   * Mostra bolinha colorida com contagem de administrações
   * 
   * @param {Object} param0 - Objeto com date e view do calendário
   * @returns {JSX.Element|null} Elemento JSX ou null se não há conteúdo
  */
  const getTileContent = ({ date, view }) => {
    // Só mostra conteúdo para visualização mensal
    if (view !== 'month') return null;

    const estatisticasDia = getEstatisticasDia(date);
    const count = estatisticasDia.total; // Total de administrações no dia

    // Se há administrações, mostra a bolinha com contagem
    if (count > 0) {
      const cor = getCorCalendario(date);
      return (
        <div className="mt-1 flex justify-center">
          <div className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full text-white text-xs font-bold flex items-center justify-center ${cor}`}>
            {count}
          </div>
        </div>
      );
    }

    return null;
  };

  /**
   * Aplica classes CSS customizadas aos dias do calendário
   * 
   * @param {Object} param0 - Objeto com date e view do calendário
   * @returns {string} Classes CSS para o tile
  */
  const getTileClassName = ({ date, view }) => {
    // Só aplica classes para visualização mensal
    if (view !== 'month') return '';

    // Normaliza datas para comparação (apenas ano, mês, dia)
    const hoje = new Date();
    const hojeNormalizado = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const dataTileNormalizada = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // Destaca a data selecionada no filtro
    if (filtroDiaAtivo && filtroDia) {
      const dataSelecionadaNormalizada = new Date(filtroDia.getFullYear(), filtroDia.getMonth(), filtroDia.getDate());
      if (dataTileNormalizada.getTime() === dataSelecionadaNormalizada.getTime()) {
        return '!rounded !bg-odara-accent/20 !text-odara-accent !font-bold';
      }
    }

    // Destaca o dia atual
    if (dataTileNormalizada.getTime() === hojeNormalizado.getTime()) {
      return '!rounded !bg-odara-primary/20 !text-odara-primary !font-bold';
    }

    // Estilo padrão para os demais dias
    return '!border-1 !border-odara-contorno hover:!bg-odara-white hover:!border-odara-primary !rounded hover:!border-1';
  };

  /**
   * Manipula o clique em um dia do calendário
   * Ativa/desativa o filtro por dia
   * 
   * @param {Date} value - Data clicada
  */
  const handleDayClick = (value) => {
    const dataNormalizada = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    const filtroDiaNormalizado = filtroDia ? new Date(filtroDia.getFullYear(), filtroDia.getMonth(), filtroDia.getDate()) : null;

    // Toggle do filtro: clica no mesmo dia para desativar
    if (filtroDiaAtivo && filtroDiaNormalizado && dataNormalizada.getTime() === filtroDiaNormalizado.getTime()) {
      setFiltroDiaAtivo(false);
      setFiltroDia(null);
    } else {
      // Ativa o filtro para a nova data
      setFiltroDia(value);
      setFiltroDiaAtivo(true);
    }
  };

  /**
   * Navega para a data atual no calendário
   * Ativa também o filtro para o dia atual
  */
  const irParaHoje = () => {
    const hoje = new Date();
    setDataAtual(hoje);
    setFiltroDia(hoje);
    setFiltroDiaAtivo(true);
  };

  // ===== FUNÇÕES PARA ESTATÍSTICAS MENSAIS =====

  /**
   * Calcula estatísticas completas para o mês atual do calendário
   * 
   * @param {Date} data - Data de referência para o mês
   * @returns {Object} Estatísticas do mês
  */
  const getEstatisticasMes = (data) => {
    const ano = data.getFullYear();
    const mes = data.getMonth();

    // Define primeiro e último dia do mês
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);

    // Usa Sets para contar itens únicos
    let totalMedicamentos = new Set();
    let totalResidentes = new Set();
    let totalAdministracoes = 0;
    let administradas = 0;
    let atrasadas = 0;
    let pendentes = 0;

    // Itera por todos os dias do mês
    for (let dia = new Date(primeiroDia); dia <= ultimoDia; dia.setDate(dia.getDate() + 1)) {
      const medicamentosDoDia = obterMedicamentosDoDia(new Date(dia));
      const estatisticasDia = getEstatisticasDia(new Date(dia));

      // Adiciona medicamentos únicos (por ID)
      medicamentosDoDia.forEach(med => totalMedicamentos.add(med.id));

      // Adiciona residentes únicos
      medicamentosDoDia.forEach(med => totalResidentes.add(med.residente));

      // Soma as estatísticas do dia
      totalAdministracoes += estatisticasDia.total;
      administradas += estatisticasDia.administradas;
      atrasadas += estatisticasDia.atrasadas;
      pendentes += estatisticasDia.pendentes;
    }

    return {
      totalMedicamentos: totalMedicamentos.size,
      totalResidentes: totalResidentes.size,
      totalAdministracoes,
      administradas,
      atrasadas,
      pendentes
    };
  };

  /**
   * Formata data para exibição amigável na legenda
   * 
   * @param {Date} data - Data a ser formatada
   * @returns {string} Data formatada (ex: "25 de novembro de 2024")
  */
  const formatarDataLegenda = (data) => {
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // ===== FUNÇÕES DE CONTROLE DE ADMINISTRAÇÃO =====

  /**
   * Ativa/desativa o modo de controle de administração
   * Quando ativado, seleciona automaticamente o dia atual se não houver seleção
  */
  const toggleControleAtivo = () => {
    const novoEstado = !controleAtivo;
    setControleAtivo(novoEstado);

    if (novoEstado) {
      // Se ativou o controle, seleciona o dia atual se não houver dia selecionado
      if (!filtroDia) {
        setFiltroDia(new Date());
        setFiltroDiaAtivo(true);
      }
    } else {
      // Se desativou, reseta o filtro de controle
      setFiltroControle(CONTROLES.TODOS);
    }
  };

  /**
   * Atualiza o status de uma administração específica
   * 
   * @param {number} medicamentoId - ID do medicamento
   * @param {Date} data - Data da administração
   * @param {string} horario - Horário da administração
   * @param {string} status - Novo status (concluido/pendente)
  */
  const atualizarAdministracao = (medicamentoId, data, horario, status) => {
    setMedicamentos(anterior => anterior.map(med => {
      if (med.id === medicamentoId) {
        const chaveData = formatarChaveData(data);
        const novasAdministracoes = {
          ...med.administracoes,
          [chaveData]: {
            ...med.administracoes[chaveData],
            [horario]: status
          }
        };

        return {
          ...med,
          administracoes: novasAdministracoes
        };
      }
      return med;
    }));
  };

  /**
   * Calcula estatísticas de um medicamento específico em um dia
   * 
   * @param {Object} medicamento - Objeto do medicamento
   * @param {Date} data - Data para cálculo
   * @returns {Object} Estatísticas do medicamento no dia
  */
  const getEstatisticasMedicamentoDia = (medicamento, data) => {
    let administradas = 0;
    let atrasadas = 0;
    let pendentes = 0;
    let total = 0;

    // Obtém horários corretos baseados no tipo de recorrência
    const horariosParaData = obterHorariosParaData(medicamento, data);

    // Contabiliza cada horário
    horariosParaData.forEach(horario => {
      const status = getStatusAdministracao(medicamento, data, horario);
      total++;
      if (status === CONTROLES.ADMINISTRADO) administradas++;
      else if (status === CONTROLES.ATRASADO) atrasadas++;
      else pendentes++;
    });

    return { administradas, atrasadas, pendentes, total };
  };

  // ===== FUNÇÕES DE GERENCIAMENTO DE MEDICAMENTOS =====

  /**
   * Abre o modal para adicionar novo medicamento
   * Reseta todos os estados do formulário
  */
  const abrirModalAdicionar = () => {
    setNovoMedicamento({
      residente: '',
      nomeMedicamento: '',
      dosagem: '',
      dose: '',
      horarios: [''],
      diasAdministracao: [],
      diasEspecificos: [],
      recorrencia: RECORRENCIAS.DIARIO,
      efeitosColaterais: '',
      observacoes: '',
      saudeRelacionada: '',
      foto: null,
      dataInicio: formatarChaveData(new Date()),
      dataFim: '',
      status: STATUS.ATIVO,
      administracoes: {}
    });

    // Reseta os diasHorarios e modo
    setDiasHorarios([{ data: '', horarios: [''] }]);
    setModoHorarios('mesmos'); // Padrão: mesmos horários para todos os dias
    setEditando(false);
    setIdEditando(null);
    setModalAberto(true);
  };

  /**
   * Abre o modal para editar medicamento existente
   * Preenche o formulário com os dados do medicamento
   * 
   * @param {number} id - ID do medicamento a editar
  */
  const abrirModalEditar = (id) => {
    const medicamentoParaEditar = medicamentos.find(med => med.id === id);
    if (medicamentoParaEditar) {
      setNovoMedicamento({
        ...medicamentoParaEditar,
        dataInicio: medicamentoParaEditar.dataInicio.toISOString().split('T')[0],
        dataFim: medicamentoParaEditar.dataFim ? medicamentoParaEditar.dataFim.toISOString().split('T')[0] : '',
        horarios: [...medicamentoParaEditar.horarios],
        diasEspecificos: medicamentoParaEditar.diasEspecificos ?
          medicamentoParaEditar.diasEspecificos.map(d => new Date(d).toISOString().split('T')[0]) : []
      });

      // Carrega diasHorarios existentes para edição
      if (medicamentoParaEditar.diasHorarios && medicamentoParaEditar.diasHorarios.length > 0) {
        const diasHorariosParaEditar = medicamentoParaEditar.diasHorarios.map(conjunto => ({
          data: new Date(conjunto.data).toISOString().split('T')[0],
          horarios: [...conjunto.horarios]
        }));
        setDiasHorarios(diasHorariosParaEditar);

        // Define o modo baseado na recorrência
        if (medicamentoParaEditar.recorrencia === RECORRENCIAS.MENSAL) {
          // Mensal sempre usa mesmos horários
          setModoHorarios('mesmos');
        } else {
          // Único pode ter horários diferentes
          const temHorariosDiferentes = diasHorariosParaEditar.some((conjunto, i, arr) =>
            i > 0 && JSON.stringify(conjunto.horarios) !== JSON.stringify(arr[0].horarios)
          );
          setModoHorarios(temHorariosDiferentes ? 'diferentes' : 'mesmos');
        }
      } else {
        setDiasHorarios([{ data: '', horarios: [''] }]);
        setModoHorarios('mesmos');
      }

      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  // ===== FUNÇÕES AUXILIARES DO FORMULÁRIO =====

  /**
   * Adiciona um novo campo de horário ao array de horários
  */
  const adicionarHorario = () => {
    setNovoMedicamento({
      ...novoMedicamento,
      horarios: [...novoMedicamento.horarios, '']
    });
  };

  /**
   * Remove um campo de horário específico
   * 
   * @param {number} index - Índice do horário a remover
  */
  const removerHorario = (index) => {
    const novosHorarios = novoMedicamento.horarios.filter((_, i) => i !== index);
    setNovoMedicamento({
      ...novoMedicamento,
      horarios: novosHorarios
    });
  };

  /**
   * Atualiza um horário específico no array de horários
   * 
   * @param {number} index - Índice do horário
   * @param {string} valor - Novo valor do horário
  */
  const atualizarHorario = (index, valor) => {
    const novosHorarios = [...novoMedicamento.horarios];
    novosHorarios[index] = valor;
    setNovoMedicamento({
      ...novoMedicamento,
      horarios: novosHorarios
    });
  };

  /**
   * Alterna a seleção de um dia da semana
   * Adiciona ou remove o dia do array de diasAdministracao
   * 
   * @param {number} diaId - ID do dia (0-6)
  */
  const toggleDiaAdministracao = (diaId) => {
    const novosDias = novoMedicamento.diasAdministracao.includes(diaId)
      ? novoMedicamento.diasAdministracao.filter(d => d !== diaId)
      : [...novoMedicamento.diasAdministracao, diaId];

    setNovoMedicamento({
      ...novoMedicamento,
      diasAdministracao: novosDias
    });
  };

  // ===== FUNÇÕES PARA DIAS E HORÁRIOS COMBINADOS =====

  /**
   * Adiciona um novo conjunto de dia + horários
  */
  const adicionarDiaHorario = () => {
    setDiasHorarios([...diasHorarios, { data: '', horarios: [''] }]);
  };

  /**
   * Remove um conjunto de dia + horários
   * Mantém pelo menos um conjunto
   * 
   * @param {number} index - Índice do conjunto a remover
  */
  const removerDiaHorario = (index) => {
    if (diasHorarios.length > 1) {
      const novosDiasHorarios = diasHorarios.filter((_, i) => i !== index);
      setDiasHorarios(novosDiasHorarios);
    }
  };

  /**
   * Atualiza a data de um conjunto específico
   * 
   * @param {number} index - Índice do conjunto
   * @param {string} data - Nova data no formato YYYY-MM-DD
  */
  const atualizarDataDiaHorario = (index, data) => {
    const novosDiasHorarios = [...diasHorarios];
    novosDiasHorarios[index].data = data;
    setDiasHorarios(novosDiasHorarios);
  };

  /**
   * Adiciona um horário a um conjunto específico
   * 
   * @param {number} indexConjunto - Índice do conjunto
  */
  const adicionarHorarioAoConjunto = (indexConjunto) => {
    const novosDiasHorarios = [...diasHorarios];
    novosDiasHorarios[indexConjunto].horarios.push('');
    setDiasHorarios(novosDiasHorarios);
  };

  /**
   * Remove um horário de um conjunto específico
   * Mantém pelo menos um horário no conjunto
   * 
   * @param {number} indexConjunto - Índice do conjunto
   * @param {number} indexHorario - Índice do horário
  */
  const removerHorarioDoConjunto = (indexConjunto, indexHorario) => {
    const novosDiasHorarios = [...diasHorarios];
    if (novosDiasHorarios[indexConjunto].horarios.length > 1) {
      novosDiasHorarios[indexConjunto].horarios = novosDiasHorarios[indexConjunto].horarios.filter((_, i) => i !== indexHorario);
      setDiasHorarios(novosDiasHorarios);
    }
  };

  /**
   * Atualiza um horário específico em um conjunto
   * 
   * @param {number} indexConjunto - Índice do conjunto
   * @param {number} indexHorario - Índice do horário
   * @param {string} horario - Novo horário no formato HH:MM
  */
  const atualizarHorarioNoConjunto = (indexConjunto, indexHorario, horario) => {
    const novosDiasHorarios = [...diasHorarios];
    novosDiasHorarios[indexConjunto].horarios[indexHorario] = horario;
    setDiasHorarios(novosDiasHorarios);
  };

  /**
   * Manipula o upload de arquivo de imagem
   * Converte a imagem para base64 e armazena no estado
   * 
   * @param {Event} event - Evento de change do input file
  */
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNovoMedicamento({
          ...novoMedicamento,
          foto: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Salva o medicamento (novo ou editado)
   * Aplica validações e processa os dados antes de salvar
  */
  const salvarMedicamento = () => {
    // Validação básica - campos obrigatórios
    if (!novoMedicamento.residente || !novoMedicamento.nomeMedicamento) return;

    // Converte datas do formato DD-MM-AAAA para objetos Date
    const partesDataInicio = novoMedicamento.dataInicio.split('-');
    const dataInicio = new Date(partesDataInicio[2], partesDataInicio[1] - 1, partesDataInicio[0]);

    const dataFim = novoMedicamento.dataFim ? (() => {
      const partes = novoMedicamento.dataFim.split('-');
      return new Date(partes[2], partes[1] - 1, partes[0]);
    })() : null;

    // Processa dias e horários baseado no tipo de recorrência
    let diasHorariosProcessados = [];

    if (novoMedicamento.recorrencia === RECORRENCIAS.MENSAL || novoMedicamento.recorrencia === RECORRENCIAS.UNICO) {
      if (modoHorarios === 'diferentes') {
        // Modo diferentes: cada dia tem seus próprios horários (apenas para ÚNICO)
        diasHorariosProcessados = diasHorarios
          .filter(conjunto => conjunto.data !== '') // Filtra conjuntos com data vazia
          .map(conjunto => ({
            data: new Date(conjunto.data),
            horarios: conjunto.horarios.filter(horario => horario !== '') // Filtra horários vazios
          }));
      } else {
        // Modo mesmos: todos os dias usam os horários do array principal
        const horariosComuns = novoMedicamento.horarios.filter(h => h !== '');
        diasHorariosProcessados = diasHorarios
          .filter(conjunto => conjunto.data !== '') // Filtra conjuntos com data vazia
          .map(conjunto => ({
            data: new Date(conjunto.data),
            horarios: [...horariosComuns] // Usa os horários comuns para todos os dias
          }));
      }
    }

    // Determina status automaticamente baseado nas datas
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataInicioNormalizada = new Date(dataInicio);
    dataInicioNormalizada.setHours(0, 0, 0, 0);

    let statusAutomatico = STATUS.ATIVO;

    // Se a data atual é anterior à data de início, status é suspenso
    if (hoje < dataInicioNormalizada) {
      statusAutomatico = STATUS.SUSPENSO;
    } else if (dataFim) {
      // Se existe data de fim e a data atual é posterior, status é finalizado
      const dataFimNormalizada = new Date(dataFim);
      dataFimNormalizada.setHours(0, 0, 0, 0);

      if (hoje > dataFimNormalizada) {
        statusAutomatico = STATUS.FINALIZADO;
      }
    }

    // Cria objeto final do medicamento
    const medicamentoObj = {
      ...novoMedicamento,
      dataInicio,
      dataFim,
      diasEspecificos: [], // Campo não utilizado - mantido para compatibilidade
      diasHorarios: diasHorariosProcessados,

      // Para mensal e único, o array de horários fica vazio se usar diasHorarios
      // Para diário e semanal, usa os horários normais
      horarios: (novoMedicamento.recorrencia === RECORRENCIAS.MENSAL || novoMedicamento.recorrencia === RECORRENCIAS.UNICO)
        ? [] // Vazio pois os horários estão em diasHorarios
        : novoMedicamento.horarios.filter(h => h !== ''), // Filtra horários vazios

      administracoes: novoMedicamento.administracoes || {},
      status: statusAutomatico // Status definido automaticamente pelas datas
    };

    // Atualiza o estado com o novo medicamento
    if (editando && idEditando) {
      // Modo edição: substitui o medicamento existente
      setMedicamentos(anterior => anterior.map(med =>
        med.id === idEditando ? medicamentoObj : med
      ));
    } else {
      // Modo adição: adiciona novo medicamento com ID único
      setMedicamentos(anterior => [...anterior, {
        ...medicamentoObj,
        id: Date.now() // Gera ID único baseado no timestamp
      }]);
    }

    // Reseta o estado do formulário
    setDiasHorarios([{ data: '', horarios: [''] }]);
    setModalAberto(false);
  };

  /**
   * Exclui um medicamento após confirmação do usuário
   * 
   * @param {number} id - ID do medicamento a excluir
  */
  const excluirMedicamento = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este medicamento?')) {
      setMedicamentos(anterior => anterior.filter(med => med.id !== id));
    }
  };

  /**
   * Abre/fecha o dropdown de status de um medicamento específico
   * 
   * @param {number} medicamentoId - ID do medicamento
  */
  const toggleDropdownStatus = (medicamentoId) => {
    setDropdownStatusAberto(dropdownStatusAberto === medicamentoId ? null : medicamentoId);
  };

  /**
   * Altera o status de um medicamento manualmente
   * Aplica lógica adicional baseada no tipo de alteração
   * 
   * @param {number} id - ID do medicamento
   * @param {string} novoStatus - Novo status (ativo/suspenso/finalizado)
  */
  const alterarStatus = (id, novoStatus) => {
    setMedicamentos(anterior => anterior.map(med => {
      if (med.id === id) {
        const hoje = new Date();

        let atualizacao = { ...med, status: novoStatus };

        // Lógica adicional para cada tipo de alteração manual
        if (novoStatus === STATUS.FINALIZADO) {
          // Finalização manual: define data de fim como hoje
          atualizacao.dataFim = hoje;
        } else if (novoStatus === STATUS.SUSPENSO) {
          // Suspensão manual: remove data de fim para "congelar" o status
          atualizacao.dataFim = null;
        } else if (novoStatus === STATUS.ATIVO) {
          // Reativação manual: atualiza data de início para hoje e remove data de fim
          atualizacao.dataInicio = hoje;
          atualizacao.dataFim = null;
        }

        return atualizacao;
      }
      return med;
    }));
    setDropdownStatusAberto(null);
  };

  // ===== EFEITOS (HOOKS) ===== 

  /**
   * Efeito para sincronização automática contínua dos status
   * Verifica a cada 30 segundos se algum medicamento precisa ter seu status atualizado
   * baseado nas datas de início e fim
  */
  useEffect(() => {
    const interval = setInterval(() => {
      setMedicamentos(anterior => anterior.map(medicamento => {
        const statusCalculado = getStatusCalculado(medicamento);

        // Só atualiza se o status calculado for diferente do atual
        // Isso mantém as alterações manuais do usuário
        if (statusCalculado !== medicamento.status) {
          let atualizacao = { ...medicamento, status: statusCalculado };

          // Se está finalizando automaticamente por data, define data de fim se não existir
          if (statusCalculado === STATUS.FINALIZADO && !medicamento.dataFim) {
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            atualizacao.dataFim = hoje;
          }

          return atualizacao;
        }

        return medicamento;
      }));
    }, 30000); // Verifica a cada 30 segundos

    // Cleanup: remove o interval quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  /**
   * Efeito para sincronizar calendário com mudanças na lista de medicamentos
   * Atualiza a data atual quando há mudanças nos medicamentos
  */
  useEffect(() => {
    const hoje = new Date();
    setDataAtual(new Date(hoje));
  }, [medicamentos]);

  /**
   * Efeito para fechar dropdowns ao clicar fora deles
   * Adiciona event listener global para detectar cliques fora dos dropdowns
  */
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verifica se o clique foi fora de qualquer container de dropdown
      if (!event.target.closest('.dropdown-container') && !event.target.closest('.status-dropdown-container')) {
        setFiltroResidenteAberto(false);
        setFiltroStatusAberto(false);
        setFiltroControleAberto(false);
        setDropdownStatusAberto(null);
      }
    };

    // Adiciona o event listener quando o componente monta
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup: remove o event listener quando o componente desmonta
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ===== FILTROS E SELEÇÃO DE DADOS =====

  /**
   * Aplica todos os filtros ativos aos medicamentos e ordena o resultado
   * Filtra por residente, status, dia específico e controle de administração
   * Ordena por data de início (crescente) e depois por residente (alfabética)
  */
  const medicamentosFiltrados = medicamentos
    .filter(medicamento => {
      // Filtro por residente: 'todos' ou residente específico
      const passaFiltroResidente = filtroResidente === 'todos' || medicamento.residente === filtroResidente;

      // Filtro por status: 'todos' ou status específico
      const passaFiltroStatus = filtroStatus === 'todos' || medicamento.status === filtroStatus;

      // Filtro por dia específico
      let passaFiltroDia = true;
      if (filtroDiaAtivo) {
        passaFiltroDia = medicamentoNoDia(medicamento, filtroDia);
      }

      // Filtro por status de controle (apenas quando controle ativo)
      let passaFiltroControle = true;
      if (controleAtivo && filtroControle !== CONTROLES.TODOS && filtroDia) {
        if (medicamentoNoDia(medicamento, filtroDia)) {
          // Verifica se o medicamento tem alguma administração com o status do filtro
          const temAdministracaoNoDia = medicamento.horarios.some(horario => {
            const status = getStatusAdministracao(medicamento, filtroDia, horario);
            return status === filtroControle;
          });

          passaFiltroControle = temAdministracaoNoDia;
        } else {
          passaFiltroControle = false;
        }
      }

      // Combina todos os filtros - todos devem ser true para incluir o medicamento
      return passaFiltroResidente && passaFiltroStatus && passaFiltroDia && passaFiltroControle;
    })

    // Ordenação: por data de início (crescente) e depois por residente (alfabética)
    .sort((a, b) => {
      // Ordena por data de início
      const dataA = new Date(a.dataInicio);
      const dataB = new Date(b.dataInicio);

      if (dataA.getTime() !== dataB.getTime()) {
        return dataA.getTime() - dataB.getTime(); // Ordem crescente (mais antigo primeiro)
      }

      // Se as datas forem iguais, ordena por residente (ordem alfabética)
      return a.residente.localeCompare(b.residente);
    });

  // ===== RENDERIZAÇÃO DO COMPONENTE =====

  /**
   * Estrutura principal do componente
   * Dividida em seções: cabeçalho, filtros, grid principal (lista + calendário) e modal
  */
  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      {/* Container principal do conteúdo */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* ===== SEÇÃO 1: CABEÇALHO DA PÁGINA ===== */}
        <div className="flex flex-col sm:flex-row justify-center xl:justify-start items-start sm:items-center gap-4 mb-6">
          {/* Container do título e ícone de informações */}
          <div className="flex items-center">
            {/* Botão de voltar com ícone */}
            <div className="flex items-center mb-1">
              <Link
                to="/gestao/PaginaRegistros"
                className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 flex items-center"
              >
                <FaArrowLeft className="mr-1" />
              </Link>
            </div>

            {/* Título principal da página */}
            <h1 className="text-2xl sm:text-3xl font-bold text-odara-dark mr-2">
              Registro de Medicamentos
            </h1>

            {/* Ícone de informações com tooltip */}
            <div className="relative">
              <button
                onMouseEnter={() => setInfoVisivel(true)}
                onMouseLeave={() => setInfoVisivel(false)}
                className="text-odara-dark hover:text-odara-secondary transition-colors duration-200"
              >
                <FaInfoCircle size={20} className='text-odara-accent hover:text-odara-secondary' />
              </button>

              {/* Tooltip que aparece ao passar o mouse */}
              {infoVisivel && (
                <div className="absolute z-10 left-0 top-full mt-2 w-72 p-3 bg-odara-dropdown text-odara-name text-sm rounded-lg shadow-lg">
                  <h3 className="font-bold mb-2">Registro de Medicamentos</h3>
                  <p>
                    O Registro de Medicamentos é um documento essencial para o controle e administração segura de medicamentos aos residentes. Ele permite o acompanhamento de dosagens, horários, efeitos colaterais e observações importantes sobre cada tratamento medicamentoso.
                  </p>

                  <div className="absolute bottom-full left-4 border-4 border-transparent border-b-gray-800"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== SEÇÃO 2: BOTÃO ADICIONAR ===== */}
        <div className="relative flex items-center justify-center xl:justify-start gap-4 mb-6">
          <button
            onClick={abrirModalAdicionar}
            className="bg-odara-accent hover:bg-odara-secondary text-odara-white font-semibold py-2 px-4 rounded-lg flex items-center transition duration-200 text-sm sm:text-base"
          >
            <FaPlus className="mr-2 text-odara-white" /> Novo Medicamento
          </button>
        </div>

        {/* ===== SEÇÃO 3: BARRA DE FILTROS ===== */}
        <div className="relative flex flex-wrap items-center justify-center xl:justify-start gap-2 sm:gap-4 mb-6">
          {/* Botão Controle de Administração */}
          <button
            onClick={toggleControleAtivo}
            className={`flex items-center bg-white rounded-lg px-3 py-2 shadow-sm border-2 font-medium hover:border-2 transition text-sm
              ${controleAtivo
                ? 'border-odara-primary text-odara-primary'
                : 'border-gray-500 text-gray-500 hover:bg-gray-100'
              }
            `}

            title={`${controleAtivo ? 'Desativar controle' : 'Ativar controle'}`}
          >
            {controleAtivo ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
            <span className="hidden sm:inline">Controle {controleAtivo ? 'Ativo' : 'Inativo'}</span>
            <span className="sm:hidden">Controle</span>
          </button>

          {/* Filtro por Status */}
          <div className="relative dropdown-container">
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 font-medium hover:border-2 hover:border-odara-primary transition text-sm
                ${filtroStatusAberto
                  ? 'border-odara-primary text-gray-700'
                  : 'border-odara-primary/40 text-gray-700'
                } 
              `}

              onClick={() => {
                setFiltroStatusAberto(!filtroStatusAberto);
                setFiltroResidenteAberto(false);
                setFiltroControleAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Status
            </button>

            {/* Dropdown de status */}
            {filtroStatusAberto && (
              <div className="absolute mt-2 w-32 sm:w-36 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-10">
                <button
                  onClick={() => {
                    setFiltroStatus('todos');
                    setFiltroStatusAberto(false);
                  }}

                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                    ${filtroStatus === 'todos'
                      ? 'bg-odara-accent/20 font-semibold'
                      : '!border-1 !border-odara-contorno !rounded'
                    }
                  `}
                >
                  Todos
                </button>

                <button
                  onClick={() => {
                    setFiltroStatus(STATUS.ATIVO);
                    setFiltroStatusAberto(false);
                  }}

                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                    ${filtroStatus === STATUS.ATIVO
                      ? 'bg-odara-accent/20 font-semibold'
                      : '!border-1 !border-odara-contorno !rounded'
                    }
                  `}
                >
                  Ativos
                </button>

                <button
                  onClick={() => {
                    setFiltroStatus(STATUS.SUSPENSO);
                    setFiltroStatusAberto(false);
                  }}

                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                    ${filtroStatus === STATUS.SUSPENSO
                      ? 'bg-odara-accent/20 font-semibold'
                      : '!border-1 !border-odara-contorno !rounded'
                    }
                  `}
                >
                  Suspensos
                </button>

                <button
                  onClick={() => {
                    setFiltroStatus(STATUS.FINALIZADO);
                    setFiltroStatusAberto(false);
                  }}

                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                    ${filtroStatus === STATUS.FINALIZADO
                      ? 'bg-odara-accent/20 font-semibold'
                      : '!border-1 !border-odara-contorno !rounded'
                    }
                  `}
                >
                  Finalizados
                </button>
              </div>
            )}
          </div>

          {/* Filtro por Residente */}
          <div className="relative dropdown-container">
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 font-medium hover:border-2 hover:border-odara-primary transition text-sm
                ${filtroResidenteAberto
                  ? 'border-odara-primary text-gray-700'
                  : 'border-odara-primary/40 text-gray-700'
                } 
              `}

              onClick={() => {
                setFiltroResidenteAberto(!filtroResidenteAberto);
                setFiltroStatusAberto(false);
                setFiltroControleAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Residentes
            </button>

            {/* Dropdown de residentes */}
            {filtroResidenteAberto && (
              <div className="absolute mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-10 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setFiltroResidente('todos');
                    setFiltroResidenteAberto(false);
                  }}

                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                    ${filtroResidente === 'todos'
                      ? 'bg-odara-accent/20 font-semibold'
                      : '!border-1 !border-odara-contorno !rounded'
                    }
                  `}
                >
                  Todos
                </button>

                {/* Lista de residentes únicos */}
                {[...new Set(medicamentos.map(med => med.residente).filter(Boolean))].map(residente => (
                  <button
                    key={residente}
                    onClick={() => {
                      setFiltroResidente(residente);
                      setFiltroResidenteAberto(false);
                    }}

                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                      ${filtroResidente === residente
                        ? 'bg-odara-accent/20 font-semibold'
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

          {/* Filtro de Controle (apenas quando controle está ativo) */}
          {controleAtivo && (
            <div className="relative dropdown-container">
              <button
                className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 font-medium hover:border-2 hover:border-odara-primary transition text-sm
                  ${filtroControleAberto
                    ? 'border-odara-primary text-gray-700'
                    : 'border-odara-primary/40 text-gray-700'
                  } 
                `}

                onClick={() => {
                  setFiltroControleAberto(!filtroControleAberto);
                  setFiltroResidenteAberto(false);
                  setFiltroStatusAberto(false);
                }}
              >
                <FaFilter className="text-odara-accent mr-2" />
                Controle
              </button>

              {/* Dropdown de controles */}
              {filtroControleAberto && (
                <div className="absolute mt-2 w-32 sm:w-36 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-10 max-h-60 overflow-y-auto">
                  {Object.entries(ROTULOS_CONTROLES).map(([valor, rotulo]) => (
                    <button
                      key={valor}
                      onClick={() => {
                        setFiltroControle(valor);
                        setFiltroControleAberto(false);
                      }}

                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                      ${filtroControle === valor
                          ? 'bg-odara-accent/20 font-semibold'
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
          )}

          {/* Botão Limpar Todos os Filtros (apenas quando há filtros ativos) */}
          {(filtroDiaAtivo || filtroResidente !== 'todos' || filtroStatus !== 'todos' || (controleAtivo && filtroControle !== CONTROLES.TODOS)) && (
            <button
              onClick={() => {
                setFiltroDiaAtivo(false);
                setFiltroDia(null);
                setFiltroResidente('todos');
                setFiltroStatus('todos');
                if (controleAtivo) {
                  setFiltroControle(CONTROLES.TODOS);
                }
              }}

              className="flex items-center bg-odara-accent text-odara-white rounded-full px-3 py-2 shadow-sm font-medium hover:bg-odara-secondary transition text-sm"
            >
              <FaTimes className="mr-1" /> Limpar Filtros
            </button>
          )}
        </div>

        {/* ===== SEÇÃO 4: GRID PRINCIPAL (MEDICAMENTOS + CALENDÁRIO) ===== */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* ===== COLUNA DA ESQUERDA: LISTA DE MEDICAMENTOS ===== */}
          <div className="bg-odara-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-4 sm:p-6 order-2 xl:order-1">
            {/* Cabeçalho da lista com título e contador */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-center justify-center xl:justify-start sm:text-left">
              <h2 className="text-2xl lg:text-4xl md:text-4xl font-bold text-odara-dark">
                {filtroStatus === 'todos' ? 'Todos os Medicamentos' : `Medicamentos ${ROTULOS_STATUS[filtroStatus]}`}
                {controleAtivo && filtroControle !== CONTROLES.TODOS && ` (${ROTULOS_CONTROLES[filtroControle]})`}
              </h2>

              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                Total: {medicamentosFiltrados.length}
              </span>
            </div>

            {/* Tarjas de Filtros Ativos */}
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Tarja de Controle Ativo */}
              {controleAtivo && (
                <span className="bg-odara-primary text-white font-bold px-3 py-1 rounded-full text-sm">
                  Modo Controle Ativo
                </span>
              )}

              {/* Tarja de Data */}
              {filtroDiaAtivo && (
                <span className="bg-odara-accent/20 text-odara-accent font-bold px-3 py-1 rounded-full text-sm">
                  Dia: {filtroDia.getDate().toString().padStart(2, '0')}/{(filtroDia.getMonth() + 1).toString().padStart(2, '0')}
                </span>
              )}

              {/* Tarja de Status */}
              {filtroStatus !== 'todos' && (
                <span className="bg-odara-dropdown-accent/20 text-odara-dropdown-accent font-bold px-3 py-1 rounded-full text-sm">
                  Status: {ROTULOS_STATUS[filtroStatus]}
                </span>
              )}

              {/* Tarja de Residentes */}
              {filtroResidente !== 'todos' && (
                <span className="bg-odara-secondary/20 text-odara-secondary font-bold px-3 py-1 rounded-full text-sm">
                  Residente: {filtroResidente}
                </span>
              )}

              {/* Tarja de Controle */}
              {controleAtivo && filtroControle !== CONTROLES.TODOS && (
                <span className="bg-odara-primary/20 text-odara-primary font-bold px-3 py-1 rounded-full text-sm">
                  Controle: {ROTULOS_CONTROLES[filtroControle]}
                </span>
              )}
            </div>

            {/* Mensagem quando controle ativo mas sem dia selecionado */}
            {controleAtivo && !filtroDia && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                <FaInfoCircle className="inline text-yellow-500 mr-2" />
                <span className="text-yellow-700">
                  Selecione um dia no calendário para realizar o controle de administração.
                </span>
              </div>
            )}

            {/* Lista de Medicamentos */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {/* Mensagem quando não há medicamentos */}
              {medicamentosFiltrados.length === 0 ? (
                <div className="p-6 rounded-xl bg-odara-name/10 text-center">
                  <p className="text-odara-dark/60">
                    {controleAtivo && !filtroDia
                      ? 'Selecione um dia para ver os medicamentos'
                      : controleAtivo && filtroControle !== CONTROLES.TODOS
                        ? `Nenhum medicamento ${ROTULOS_CONTROLES[filtroControle].toLowerCase()} encontrado`
                        : 'Nenhum medicamento encontrado'
                    }
                  </p>
                </div>
              ) : (
                // Renderiza cada medicamento filtrado
                medicamentosFiltrados.map(medicamento => (
                  <div
                    key={medicamento.id}
                    className="bg-white rounded-lg shadow-md border border-gray-200"
                  >
                    {/* HEADER - Data de início e status */}
                    <div 
                      className={`flex items-center justify-between p-3 rounded-t-lg 
                        ${medicamento.status === STATUS.ATIVO
                          ? 'bg-green-50 border-b border-green-200'
                          : medicamento.status === STATUS.SUSPENSO
                            ? 'bg-yellow-50 border-b border-yellow-200'
                            : 'bg-gray-50 border-b border-gray-200'
                        }
                      `}
                    >
                      {/* Lado esquerdo: data de início e informações */}
                      <div className="flex items-center">
                        {/* Bolinha indicadora de status */}
                        <div 
                          className={`w-3 h-3 rounded-full mr-3 
                            ${medicamento.status === STATUS.ATIVO
                              ? 'bg-green-500'
                              : medicamento.status === STATUS.SUSPENSO
                                ? 'bg-yellow-500'
                                : 'bg-gray-500'
                            }
                          `}
                        ></div>

                        {/* Texto com datas */}
                        <p className="text-sm sm:text-base text-odara-dark">
                          <span className='font-semibold'>
                            Início: {medicamento.dataInicio.getDate().toString().padStart(2, '0')}/
                            {(medicamento.dataInicio.getMonth() + 1).toString().padStart(2, '0')}/
                            {medicamento.dataInicio.getFullYear()}
                          </span>

                          {/* Data de fim se existir */}
                          {medicamento.dataFim ? (
                            <>
                              {' • '}
                              Fim: {medicamento.dataFim.getDate().toString().padStart(2, '0')}/
                              {(medicamento.dataFim.getMonth() + 1).toString().padStart(2, '0')}/
                              {medicamento.dataFim.getFullYear()}
                            </>
                          ) : (
                            <span className="text-odara-accent ml-2">• Uso contínuo</span>
                          )}

                          {/* Indicador de ajuste manual */}
                          {getStatusCalculado(medicamento) !== medicamento.status && (
                            <span className="text-yellow-600 ml-2 text-xs">(Ajustado manualmente)</span>
                          )}
                        </p>
                      </div>

                      {/* Lado direito: dropdown de status */}
                      <div className="flex items-center gap-3 status-dropdown-container">
                        <div className="relative">
                          {/* Botão do dropdown */}
                          <button
                            onClick={() => toggleDropdownStatus(medicamento.id)}
                            className={`flex items-center rounded-lg px-3 py-1 border-2 font-medium transition-colors duration-200 text-sm min-w-[100px] justify-center 
                              ${medicamento.status === STATUS.ATIVO
                                ? 'bg-green-500 text-white border-green-500 hover:bg-green-600'
                                : medicamento.status === STATUS.SUSPENSO
                                  ? 'bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600'
                                  : 'bg-gray-500 text-white border-gray-500 hover:bg-gray-600'
                              }
                            `}
                          >
                            <FaAngleDown className="mr-2 text-white" />
                            {ROTULOS_STATUS_SINGULAR[medicamento.status]}
                          </button>

                          {/* Dropdown menu */}
                          {dropdownStatusAberto === medicamento.id && (
                            <div className="absolute mt-1 w-32 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-20 right-0">
                              {Object.entries(ROTULOS_STATUS_SINGULAR).map(([valor, rotulo]) => (
                                <button
                                  key={valor}
                                  onClick={() => alterarStatus(medicamento.id, valor)}
                                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 transition-colors duration-200 ${medicamento.status === valor
                                    ? 'bg-odara-accent/20 font-semibold text-odara-accent'
                                    : 'text-odara-dark'
                                    } first:rounded-t-lg last:rounded-b-lg`
                                  }
                                >
                                  {rotulo}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* CORPO - Conteúdo principal do medicamento */}
                    <div className="p-4">
                      {/* Nome do medicamento */}
                      <h6 className="text-lg sm:text-xl font-bold mb-3 text-odara-dark">
                        {medicamento.nomeMedicamento}
                      </h6>

                      {/* Grid com informações do medicamento */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-sm">
                        {/* Coluna da esquerda */}
                        <div className="space-y-2">
                          <div>
                            <strong className="text-odara-dark">Dosagem:</strong>
                            <span className="text-odara-name ml-1">{medicamento.dosagem}</span>
                          </div>

                          <div>
                            <strong className="text-odara-dark">Dose:</strong>
                            <span className="text-odara-name ml-1">{medicamento.dose}</span>
                          </div>

                          {/* Efeitos colaterais se existirem */}
                          {medicamento.efeitosColaterais && (
                            <div>
                              <strong className="text-odara-dark">Efeitos colaterais:</strong>
                              <span className="text-odara-name ml-1">{medicamento.efeitosColaterais}</span>
                            </div>
                          )}

                          {/* Saúde relacionada se existir */}
                          {medicamento.saudeRelacionada && (
                            <div>
                              <strong className="text-odara-dark">Saúde relacionada:</strong>
                              <span className="text-odara-name ml-1">{medicamento.saudeRelacionada}</span>
                            </div>
                          )}
                        </div>

                        {/* Coluna da direita */}
                        <div className="space-y-2">
                          <div>
                            <strong className="text-odara-dark">Horários:</strong>
                            <span className="text-odara-name ml-1">
                              {(medicamento.recorrencia === RECORRENCIAS.MENSAL || medicamento.recorrencia === RECORRENCIAS.UNICO) && medicamento.diasHorarios
                                ?
                                (() => {
                                  if (medicamento.recorrencia === RECORRENCIAS.MENSAL) {
                                    // Mensal: sempre mesmos horários, mostra apenas os horários formatados
                                    return medicamento.diasHorarios[0]?.horarios
                                      .map(horario => horario.replace(':', 'h'))
                                      .join(', ') || '';
                                  } else {
                                    // Único: agrupa por horários e datas em comum
                                    return agruparDatasHorariosHibrido(medicamento.diasHorarios);
                                  }
                                })()
                                :
                                // Para diário e semanal, usa os horários padrão formatados
                                medicamento.horarios.map(horario => horario.replace(':', 'h')).join(', ')
                              }
                            </span>
                          </div>

                          <div>
                            <strong className="text-odara-dark">Recorrência:</strong>
                            <span className="text-odara-name ml-1">
                              {ROTULOS_RECORRENCIAS[medicamento.recorrencia]}
                            </span>
                          </div>

                          {/* Observações se existirem */}
                          {medicamento.observacoes && (
                            <div>
                              <strong className="text-odara-dark">Observações:</strong>
                              <span className="text-odara-name ml-1">{medicamento.observacoes}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Controle de administração (apenas quando ativo e para o dia selecionado) */}
                      {controleAtivo && filtroDia && medicamentoNoDia(medicamento, filtroDia) && (
                        <div className="mt-6 mb-3 p-4 bg-odara-white rounded-lg border border-odara-primary mx-auto w-full md:w-2/5 lg:w-2/5 xl:w-3/5">
                          {/* Cabeçalho do controle */}
                          <div className="flex items-center justify-center mb-3">
                            <h4 className="text-odara-primary text-center text-sm sm:text-base">
                              <span className='font-semibold'>Controle para: </span>
                              {formatarChaveData(filtroDia)}
                            </h4>
                          </div>

                          {/* Lista de horários para controle */}
                          <div className="space-y-3">
                            {/* Obtém os horários corretos baseados no tipo de recorrência */}
                            {obterHorariosParaData(medicamento, filtroDia).map(horario => {
                              const status = getStatusAdministracao(medicamento, filtroDia, horario);
                              const config = CONFIGS_ADMINISTRACAO[status];
                              const isAdministrado = status === CONTROLES.ADMINISTRADO;

                              return (
                                <div key={horario} className={`flex items-center justify-between rounded-lg p-3 border ${config.corFundo} border-gray-200`}>
                                  {/* Horário */}
                                  <div className="flex-1">
                                    <span className="font-medium text-odara-dark">{horario}</span>
                                  </div>

                                  {/* Checkbox e tarja de status */}
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => atualizarAdministracao(
                                        medicamento.id,
                                        filtroDia,
                                        horario,
                                        isAdministrado ? CONTROLES.PENDENTE : CONTROLES.ADMINISTRADO
                                      )}

                                      className={`w-6 h-6 border-2 rounded flex items-center justify-center ${config.corCheckbox} hover:opacity-80 transition-opacity`}
                                      title={isAdministrado ? "Marcar como pendente" : "Marcar como concluído"}
                                    >
                                      {config.icone}
                                    </button>

                                    <span className={`text-xs px-2 py-1 rounded-full ${config.corTarja}`}>
                                      {config.texto}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Resumo do status */}
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Total: {obterHorariosParaData(medicamento, filtroDia).length}</span>
                              <span 
                                className={`
                                  ${getEstatisticasMedicamentoDia(medicamento, filtroDia).administradas === obterHorariosParaData(medicamento, filtroDia).length 
                                    ? 'text-green-500' 
                                    : 'text-gray-500'
                                  }
                                `}
                              >
                                {getEstatisticasMedicamentoDia(medicamento, filtroDia).administradas} concluídas
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* FOOTER - Residente, dias da semana e ações */}
                    <div className="px-4 py-3 bg-gray-50 rounded-b-lg border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        {/* Informações do residente e dias */}
                        <div className="flex items-center text-sm flex-wrap gap-1">
                          {/* Badge do residente */}
                          <span className="bg-odara-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                            {medicamento.residente}
                          </span>

                          {/* Todos os dias (apenas para diário) */}
                          {medicamento.recorrencia === RECORRENCIAS.DIARIO && medicamento.diasAdministracao.length > 0 && (
                            <span className="text-odara-name text-xs sm:text-sm">
                              {' • '}
                              Dias: Todos
                            </span>
                          )}

                          {/* Dias da semana (apenas para semanal) */}
                          {medicamento.recorrencia === RECORRENCIAS.SEMANAL && medicamento.diasAdministracao.length > 0 && (
                            <span className="text-odara-name text-xs sm:text-sm">
                              {' • '}
                              Dias: {medicamento.diasAdministracao.map(dia => DIAS_SEMANA.find(d => d.id === dia)?.label).join(', ')}
                            </span>
                          )}

                          {/* Dias específicos (apenas para único com horários iguais) */}
                          {medicamento.recorrencia === RECORRENCIAS.UNICO && medicamento.diasHorarios && medicamento.diasHorarios.length > 0 && (() => {
                            // Verifica se tem apenas um horário em todas as datas
                            const todosHorarios = medicamento.diasHorarios.flatMap(conjunto => conjunto.horarios);
                            const horariosUnicos = [...new Set(todosHorarios)];
                            const temApenasUmHorario = horariosUnicos.length === 1;

                            if (temApenasUmHorario) {
                              // Pega todas as datas e formata
                              const todasDatas = medicamento.diasHorarios.map(conjunto => {
                                const dataObj = new Date(conjunto.data);
                                return `${dataObj.getDate().toString().padStart(2, '0')}/${(dataObj.getMonth() + 1).toString().padStart(2, '0')}/${dataObj.getFullYear()}`;
                              });
                              const datasFormatadas = formatarDatasAgrupadas(todasDatas);

                              return (
                                <span className="text-odara-name">
                                  {' • '}
                                  Dias: {datasFormatadas}
                                </span>
                              );
                            }

                            // Não mostra no footer se tem horários diferentes
                            return null;
                          })()}

                          {/* Dias do mês (apenas para mensal) */}
                          {medicamento.recorrencia === RECORRENCIAS.MENSAL && medicamento.diasHorarios && medicamento.diasHorarios.length > 0 && (
                            <>
                              <span className="text-odara-name">
                                {' • '}
                                Dias: {medicamento.diasHorarios.map(conjunto =>
                                  new Date(conjunto.data).getDate()
                                ).join(', ')}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Ações: editar e excluir */}
                        <div className="flex space-x-2 self-end sm:self-auto">
                          <button
                            onClick={() => abrirModalEditar(medicamento.id)}
                            className="text-odara-dropdown-accent hover:text-odara-white transition-colors duration-200 p-2 rounded-full hover:bg-odara-dropdown-accent"
                            title="Editar medicamento"
                          >
                            <FaEdit size={14} />
                          </button>

                          <button
                            onClick={() => excluirMedicamento(medicamento.id)}
                            className="text-odara-alerta hover:text-odara-white transition-colors duration-200 p-2 rounded-full hover:bg-odara-alerta"
                            title="Excluir medicamento"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ===== COLUNA DA DIREITA: CALENDÁRIO E ESTATÍSTICAS ===== */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 h-fit sticky top-6 order-1 xl:order-2">
            {/* Botão "Hoje" */}
            <div className="flex justify-center mb-5">
              <button
                onClick={irParaHoje}
                className="bg-odara-accent hover:bg-odara-secondary text-odara-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
              >
                Ir para Hoje
              </button>
            </div>

            {/* Calendário */}
            <div className="flex justify-center border-2 border-odara-primary rounded-xl shadow-sm overflow-hidden max-w-2/3 mx-auto">
              <Calendar
                onChange={handleDayClick}
                value={filtroDia}
                onActiveStartDateChange={({ activeStartDate }) => setDataAtual(activeStartDate)}
                activeStartDate={dataAtual}
                tileContent={getTileContent}
                tileClassName={getTileClassName}
                locale="pt-BR"
                className="border-0 !w-full"
              />
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 mt-6 p-3 bg-odara-offwhite rounded-lg max-w-full mx-auto">
              <h5 className='font-bold text-odara-dark text-center mb-4 text-sm sm:text-base'>
                {filtroDia
                  ? `Estatísticas para ${formatarDataLegenda(filtroDia)}`
                  : 'Selecione uma data para visualizar as estatísticas'
                }
              </h5>

              {filtroDia ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0">
                  {/* Coluna da Esquerda - Estatísticas do Dia */}
                  <div className="sm:border-r border-gray-200 px-3 sm:pr-6">
                    <h6 className="font-semibold text-odara-dark mb-2 text-sm">Dia</h6>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Registros ativos:</span>
                        <span className="font-semibold">{obterMedicamentosDoDia(filtroDia).length}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Residentes para medicar:</span>
                        <span className="font-semibold">{obterResidentesDoDia(filtroDia).length}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Administrações totais:</span>
                        <span className="font-semibold">{getEstatisticasDia(filtroDia).total}</span>
                      </div>

                      {/* Barras de progresso coloridas */}
                      <div className="flex justify-between gap-1 mt-2">
                        <div className="flex-1 border-1 border-green-500 text-green-500 font-semibold px-1 py-0.5 rounded text-center text-xs">
                          {getEstatisticasDia(filtroDia).administradas}
                        </div>

                        <div className="flex-1 border-1 border-yellow-500 text-yellow-500 font-semibold px-1 py-0.5 rounded text-center text-xs">
                          {getEstatisticasDia(filtroDia).pendentes}
                        </div>

                        <div className="flex-1 border-1 border-red-500 text-red-500 font-semibold px-1 py-0.5 rounded text-center text-xs">
                          {getEstatisticasDia(filtroDia).atrasadas}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coluna da Direita - Estatísticas do Mês */}
                  <div className='px-3 sm:pl-6'>
                    <h6 className="font-semibold text-odara-dark mb-2 text-sm">Mês</h6>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Registros ativos: </span>
                        <span className="font-semibold">{getEstatisticasMes(filtroDia).totalMedicamentos}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Residentes para medicar: </span>
                        <span className="font-semibold">{getEstatisticasMes(filtroDia).totalResidentes}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Administrações totais: </span>
                        <span className="font-semibold">{getEstatisticasMes(filtroDia).totalAdministracoes}</span>
                      </div>

                      {/* Barras de progresso coloridas */}
                      <div className="flex justify-between gap-1 mt-2">
                        <div className="flex-1 border-1 border-green-500 text-green-500 font-semibold px-1 py-0.5 rounded text-center text-xs">
                          {getEstatisticasMes(filtroDia).administradas}
                        </div>

                        <div className="flex-1 border-1 border-yellow-500 text-yellow-500 font-semibold px-1 py-0.5 rounded text-center text-xs">
                          {getEstatisticasMes(filtroDia).pendentes}
                        </div>

                        <div className="flex-1 border-1 border-red-500 text-red-500 font-semibold px-1 py-0.5 rounded text-center text-xs">
                          {getEstatisticasMes(filtroDia).atrasadas}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-odara-name/60 text-sm">Selecione um dia no calendário para ver as estatísticas</p>
                </div>
              )}
            </div>

            {/* Legenda de cores */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs">
                <div className="flex items-center gap-1 text-gray-500">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Concluídos</span>
                </div>

                <div className="flex items-center gap-1 text-gray-500">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Pendentes</span>
                </div>

                <div className="flex items-center gap-1 text-gray-500">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Atrasados</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== MODAL PARA ADICIONAR/EDITAR MEDICAMENTO ===== */}
        {modalAberto && (
          <div className="fixed inset-0 bg-odara-offwhite/80 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-4 sm:p-6 border-l-4 border-odara-primary max-h-[90vh] overflow-y-auto">
              {/* Cabeçalho do Modal */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-odara-accent">
                  {editando ? 'Editar' : 'Adicionar'} Medicamento
                </h2>

                {/* Botão fechar */}
                <button
                  onClick={() => setModalAberto(false)}
                  className="text-odara-primary hover:text-odara-secondary transition-colors duration-200"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Formulário */}
              <div className="space-y-4">
                {/* Linha 1: Residente e Nome do Medicamento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Residente *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                      value={novoMedicamento.residente}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, residente: e.target.value })}
                      placeholder="Nome do residente"
                    />
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Nome do Medicamento *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                      value={novoMedicamento.nomeMedicamento}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, nomeMedicamento: e.target.value })}
                      placeholder="Nome do medicamento"
                    />
                  </div>
                </div>

                {/* Linha 2: Dosagem e Dose */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Dosagem</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                      value={novoMedicamento.dosagem}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, dosagem: e.target.value })}
                      placeholder="Ex: 50mg, 100mg"
                    />
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Dose</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                      value={novoMedicamento.dose}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, dose: e.target.value })}
                      placeholder="Ex: 1 comprimido, 5ml"
                    />
                  </div>
                </div>

                {/* Linha 3: Datas de Início e Fim */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Data de Início</label>
                    {/* Data de Início */}
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                      value={novoMedicamento.dataInicio}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, dataInicio: e.target.value })}
                      placeholder="DD-MM-AAAA"
                    />
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Data de Término (opcional)</label>
                    {/* Data de Término */}
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                      value={novoMedicamento.dataFim}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, dataFim: e.target.value })}
                      placeholder="DD-MM-AAAA (opcional)"
                    />
                  </div>
                </div>

                {/* Recorrência */}
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Recorrência</label>
                  <select
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                    value={novoMedicamento.recorrencia}
                    onChange={(e) => {
                      const novaRecorrencia = e.target.value;
                      setNovoMedicamento({
                        ...novoMedicamento,
                        recorrencia: novaRecorrencia,
                        diasAdministracao: [], // Reseta dias da semana
                        diasEspecificos: [] // Reseta dias específicos
                      });

                      // Define modo padrão baseado na recorrência
                      if (novaRecorrencia === RECORRENCIAS.MENSAL) {
                        setModoHorarios('mesmos'); // Mensal sempre usa mesmos horários
                      }
                    }}
                  >
                    {Object.entries(ROTULOS_RECORRENCIAS).map(([chave, rotulo]) => (
                      <option key={chave} value={chave}>{rotulo}</option>
                    ))}
                  </select>
                </div>

                {/* Interface dinâmica baseada no tipo de recorrência */}
                {/* Diário: Apenas horários */}
                {novoMedicamento.recorrencia === RECORRENCIAS.DIARIO && (
                  <div className="p-3 mb-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-700">
                      <strong>Recorrência Diária:</strong> O medicamento será administrado todos os dias nos horários definidos abaixo.
                    </p>
                  </div>
                )}

                {/* Semanal: Dias da semana + horários */}
                {novoMedicamento.recorrencia === RECORRENCIAS.SEMANAL && (
                  <>
                    <div className="p-3 mb-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-700">
                        <strong>Recorrência Semanal:</strong> O medicamento será administrado nos dias da semana selecionados, nos horários definidos abaixo.
                      </p>
                    </div>

                    <div>
                      <label className="block text-odara-dark font-medium mb-2">Dias da Semana *</label>
                      <div className="flex flex-wrap gap-2">
                        {DIAS_SEMANA.map(dia => (
                          <button
                            key={dia.id}
                            type="button"
                            onClick={() => toggleDiaAdministracao(dia.id)}
                            className={`px-3 py-2 rounded-lg border transition-colors duration-200 text-sm ${novoMedicamento.diasAdministracao.includes(dia.id)
                              ? 'bg-odara-primary text-white border-odara-primary'
                              : 'bg-white text-odara-dark border-odara-primary hover:bg-odara-primary/10'
                              }
                            `}
                          >
                            {dia.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Mensal: Sempre mesmos horários para todos os dias */}
                {novoMedicamento.recorrencia === RECORRENCIAS.MENSAL && (
                  <div>
                    <div className="p-3 mb-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-700">
                        <strong>Recorrência Mensal:</strong> O medicamento será administrado nos dias específicos do mês. Todos os dias usarão os mesmos horários.
                      </p>
                    </div>

                    {/* Horários comuns (sempre visível para mensal) */}
                    <div className="mb-4">
                      <label className="block text-odara-dark font-medium mb-2">Horários *</label>
                      {novoMedicamento.horarios.map((horario, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="time"
                            className="flex-1 px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm"
                            value={horario}
                            onChange={(e) => atualizarHorario(index, e.target.value)}
                          />

                          {novoMedicamento.horarios.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removerHorario(index)}
                              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                            >
                              <FaTimes />
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={adicionarHorario}
                        className="px-4 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors duration-200 flex items-center text-sm"
                      >
                        <FaPlus className="mr-2" /> Adicionar Horário
                      </button>
                    </div>

                    {/* Datas mensais */}
                    <div>
                      <label className="block text-odara-dark font-medium mb-2">Datas Mensais *</label>
                      <p className="text-sm text-odara-name mb-3">Adicione os dias específicos do mês (todos usarão os mesmos horários)</p>

                      {diasHorarios.map((conjunto, indexConjunto) => (
                        <div key={indexConjunto} className="mb-4 p-4 border border-odara-primary rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <label className="block text-odara-dark font-medium flex-1">Data do Mês:</label>

                            {diasHorarios.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removerDiaHorario(indexConjunto)}
                                className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                              >
                                <FaTimes />
                              </button>
                            )}
                          </div>

                          <input
                            type="date"
                            className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm"
                            value={conjunto.data}
                            onChange={(e) => atualizarDataDiaHorario(indexConjunto, e.target.value)}
                          />
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={adicionarDiaHorario}
                        className="px-4 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors duration-200 flex items-center text-sm"
                      >
                        <FaPlus className="mr-2" /> Adicionar Nova Data
                      </button>
                    </div>
                  </div>
                )}

                {/* Único: Pode ter horários diferentes ou mesmos */}
                {novoMedicamento.recorrencia === RECORRENCIAS.UNICO && (
                  <div>
                    <div className="p-3 mb-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-700">
                        <strong>Recorrência Única:</strong> O medicamento será administrado apenas nos dias específicos definidos abaixo.
                      </p>
                    </div>

                    {/* Seleção do modo de horários */}
                    <div className="mb-4">
                      <label className="block text-odara-dark font-medium mb-2">Configuração de Horários</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="diferentes"
                            checked={modoHorarios === 'diferentes'}
                            onChange={(e) => setModoHorarios(e.target.value)}
                            className="mr-2"
                          />

                          <span className="text-sm">Dias com horários diferentes</span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="radio"
                            value="mesmos"
                            checked={modoHorarios === 'mesmos'}
                            onChange={(e) => setModoHorarios(e.target.value)}
                            className="mr-2"
                          />

                          <span className="text-sm">Todos os dias com mesmos horários</span>
                        </label>
                      </div>
                    </div>

                    {modoHorarios === 'diferentes' ? (
                      /* Modo: Dias com horários diferentes */
                      <div>
                        <label className="block text-odara-dark font-medium mb-2">Dias e Horários Únicos *</label>
                        <p className="text-sm text-odara-name mb-3">Adicione os dias específicos e seus horários correspondentes</p>

                        {diasHorarios.map((conjunto, indexConjunto) => (
                          <div key={indexConjunto} className="mb-4 p-4 border border-odara-primary rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                              <label className="block text-odara-dark font-medium flex-1">Data Específica:</label>
                              {diasHorarios.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removerDiaHorario(indexConjunto)}
                                  className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                                >
                                  <FaTimes />
                                </button>
                              )}
                            </div>

                            <input
                              type="date"
                              className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm mb-3"
                              value={conjunto.data}
                              onChange={(e) => atualizarDataDiaHorario(indexConjunto, e.target.value)}
                            />

                            <label className="block text-odara-dark font-medium mb-2">Horários para esta data:</label>
                            {conjunto.horarios.map((horario, indexHorario) => (
                              <div key={indexHorario} className="flex gap-2 mb-2">
                                <input
                                  type="time"
                                  className="flex-1 px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm"
                                  value={horario}
                                  onChange={(e) => atualizarHorarioNoConjunto(indexConjunto, indexHorario, e.target.value)}
                                />

                                {conjunto.horarios.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removerHorarioDoConjunto(indexConjunto, indexHorario)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                                  >
                                    <FaTimes />
                                  </button>
                                )}
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={() => adicionarHorarioAoConjunto(indexConjunto)}
                              className="px-3 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors duration-200 flex items-center text-sm"
                            >
                              <FaPlus className="mr-1" /> Adicionar Horário
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={adicionarDiaHorario}
                          className="px-4 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors duration-200 flex items-center text-sm"
                        >
                          <FaPlus className="mr-2" /> Adicionar Nova Data
                        </button>
                      </div>
                    ) : (
                      /* Modo: Todos os dias com mesmos horários */
                      <div>
                        <label className="block text-odara-dark font-medium mb-2">Datas Únicas *</label>
                        <p className="text-sm text-odara-name mb-3">Adicione os dias específicos (todos usarão os mesmos horários)</p>

                        {diasHorarios.map((conjunto, indexConjunto) => (
                          <div key={indexConjunto} className="mb-4 p-4 border border-odara-primary rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                              <label className="block text-odara-dark font-medium flex-1">Data Específica:</label>
                              {diasHorarios.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removerDiaHorario(indexConjunto)}
                                  className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                                >
                                  <FaTimes />
                                </button>
                              )}
                            </div>

                            <input
                              type="date"
                              className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm"
                              value={conjunto.data}
                              onChange={(e) => atualizarDataDiaHorario(indexConjunto, e.target.value)}
                            />
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={adicionarDiaHorario}
                          className="px-4 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors duration-200 flex items-center text-sm mb-4"
                        >
                          <FaPlus className="mr-2" /> Adicionar Nova Data
                        </button>

                        <div>
                          <label className="block text-odara-dark font-medium mb-2">Horários (aplicados a todas as datas) *</label>
                          {novoMedicamento.horarios.map((horario, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                              <input
                                type="time"
                                className="flex-1 px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm"
                                value={horario}
                                onChange={(e) => atualizarHorario(index, e.target.value)}
                              />

                              {novoMedicamento.horarios.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removerHorario(index)}
                                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                                >
                                  <FaTimes />
                                </button>
                              )}
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={adicionarHorario}
                            className="px-4 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors duration-200 flex items-center text-sm"
                          >
                            <FaPlus className="mr-2" /> Adicionar Horário
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Horários (apenas para diário e semanal) */}
                {(novoMedicamento.recorrencia === RECORRENCIAS.DIARIO || novoMedicamento.recorrencia === RECORRENCIAS.SEMANAL) && (
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Horários de Administração *</label>

                    {novoMedicamento.horarios.map((horario, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="time"
                          className="flex-1 px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                          value={horario}
                          onChange={(e) => atualizarHorario(index, e.target.value)}
                        />

                        {novoMedicamento.horarios.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removerHorario(index)}
                            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={adicionarHorario}
                      className="px-4 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors duration-200 flex items-center text-sm sm:text-base"
                    >
                      <FaPlus className="mr-2" /> Adicionar Horário
                    </button>
                  </div>
                )}

                {/* Efeitos Colaterais */}
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Efeitos Colaterais Possíveis</label>
                  <textarea
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                    rows="2"
                    value={novoMedicamento.efeitosColaterais}
                    onChange={(e) => setNovoMedicamento({ ...novoMedicamento, efeitosColaterais: e.target.value })}
                    placeholder="Liste os possíveis efeitos colaterais"
                  />
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Observações</label>
                  <textarea
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                    rows="2"
                    value={novoMedicamento.observacoes}
                    onChange={(e) => setNovoMedicamento({ ...novoMedicamento, observacoes: e.target.value })}
                    placeholder="Observações importantes (laboratório, contraindicações, etc.)"
                  />
                </div>

                {/* Saúde Relacionada */}
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Saúde/Consulta Relacionada</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                    value={novoMedicamento.saudeRelacionada}
                    onChange={(e) => setNovoMedicamento({ ...novoMedicamento, saudeRelacionada: e.target.value })}
                    placeholder="Ex: Hipertensão, Diabetes, etc."
                  />
                </div>

                {/* Foto do Medicamento */}
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Foto do Medicamento</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors duration-200 cursor-pointer text-sm sm:text-base">
                      <FaCamera />
                      <span>Selecionar Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    {novoMedicamento.foto && (
                      <div className="relative">
                        <img
                          src={novoMedicamento.foto}
                          alt="Medicamento"
                          className="w-16 h-16 object-cover rounded-lg border border-odara-primary"
                        />

                        <button
                          type="button"
                          onClick={() => setNovoMedicamento({ ...novoMedicamento, foto: null })}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Botões de ação */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setModalAberto(false)}
                    className="px-6 py-2 border border-odara-primary text-odara-primary rounded-lg hover:bg-odara-primary/10 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={salvarMedicamento}
                    disabled={!novoMedicamento.residente || !novoMedicamento.nomeMedicamento}
                    className="px-6 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {editando ? 'Salvar Alterações' : 'Adicionar Medicamento'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroMedicamentos;