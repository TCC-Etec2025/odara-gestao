import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaTimes, FaArrowLeft, FaCheck, FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

/**
 * COMPONENTE PRINCIPAL: REGISTRO DE ATIVIDADES
 * 
 * Este componente gerencia o cadastro, visualização, edição e controle de status
 * de atividades para residentes, incluindo diferentes categorias de atividades,
 * locais, durações e sistema completo de acompanhamento com calendário integrado.
*/
const RegistroAtividades = () => {
  // ===== CONSTANTES E CONFIGURAÇÕES DO SISTEMA =====

  /**
   * ENUM: Categorias de atividades disponíveis
   * Define as categorias principais de atividades que podem ser cadastradas
  */
  const CATEGORIAS_ATIVIDADE = {
    FISICA: 'fisica',
    COGNITIVA: 'cognitiva',
    SOCIAL: 'social',
    CRIATIVA: 'criativa',
    LAZER: 'lazer',
    TERAPEUTICA: 'terapeutica',
    OUTRA: 'outra'
  };

  /**
   * Mapeamento de categorias para labels amigáveis exibidos na interface
   * Cada categoria de atividade tem uma descrição em português
  */
  const ROTULOS_CATEGORIAS = {
    [CATEGORIAS_ATIVIDADE.FISICA]: "Física",
    [CATEGORIAS_ATIVIDADE.COGNITIVA]: "Cognitiva",
    [CATEGORIAS_ATIVIDADE.SOCIAL]: "Social",
    [CATEGORIAS_ATIVIDADE.CRIATIVA]: "Criativa",
    [CATEGORIAS_ATIVIDADE.LAZER]: "Lazer",
    [CATEGORIAS_ATIVIDADE.TERAPEUTICA]: "Terapêutica",
    [CATEGORIAS_ATIVIDADE.OUTRA]: "Outra"
  };

  /**
   * ENUM: Períodos do dia disponíveis para agendamento
   * Permite organizar as atividades por turno do dia
  */
  const PERIODOS = {
    MANHA: 'manha',
    TARDE: 'tarde',
    NOITE: 'noite',
    INTEGRAL: 'integral'
  };

  /**
   * Mapeamento de períodos para labels amigáveis
  */
  const ROTULOS_PERIODOS = {
    [PERIODOS.MANHA]: "Manhã",
    [PERIODOS.TARDE]: "Tarde",
    [PERIODOS.NOITE]: "Noite",
    [PERIODOS.INTEGRAL]: "Integral"
  };

  /**
   * ENUM: Status possíveis para uma atividade
   * Controla o estado atual de cada atividade no sistema
  */
  const STATUS = {
    PENDENTE: 'pendente',
    EM_ANDAMENTO: 'em_andamento',
    CONCLUIDA: 'concluida',
    CANCELADA: 'cancelada',
    ATRASADA: 'atrasada'
  };

  /**
   * Mapeamento de status para labels no plural (usado em filtros)
  */
  const ROTULOS_STATUS = {
    [STATUS.PENDENTE]: "Pendentes",
    [STATUS.EM_ANDAMENTO]: "Em Andamento",
    [STATUS.CONCLUIDA]: "Concluídas",
    [STATUS.CANCELADA]: "Canceladas",
    [STATUS.ATRASADA]: "Atrasadas"
  };

  /**
   * Mapeamento de status para labels no singular (usado em dropdowns)
  */
  const ROTULOS_STATUS_SINGULAR = {
    [STATUS.PENDENTE]: "Pendente",
    [STATUS.EM_ANDAMENTO]: "Em Andamento",
    [STATUS.CONCLUIDA]: "Concluída",
    [STATUS.CANCELADA]: "Cancelada",
    [STATUS.ATRASADA]: "Atrasada"
  };

  /**
   * Configurações visuais completas para cada status de atividade
   * Define cores, estilos e textos para diferentes estados visuais
  */
  const CONFIGS_STATUS = {
    [STATUS.PENDENTE]: {
      corBolinha: 'bg-yellow-500',
      corBadge: 'bg-yellow-500 text-white',
      corFundo: 'bg-yellow-50',
      corBorda: 'border-b border-yellow-200',
      texto: 'Pendente'
    },

    [STATUS.EM_ANDAMENTO]: {
      corBolinha: 'bg-blue-500',
      corBadge: 'bg-blue-500 text-white',
      corFundo: 'bg-blue-50',
      corBorda: 'border-b border-blue-200',
      texto: 'Em Andamento'
    },

    [STATUS.CONCLUIDA]: {
      corBolinha: 'bg-green-500',
      corBadge: 'bg-green-500 text-white',
      corFundo: 'bg-green-50',
      corBorda: 'border-b border-green-200',
      texto: 'Concluída'
    },

    [STATUS.CANCELADA]: {
      corBolinha: 'bg-gray-500',
      corBadge: 'bg-gray-500 text-white',
      corFundo: 'bg-gray-50',
      corBorda: 'border-b border-gray-200',
      texto: 'Cancelada'
    },

    [STATUS.ATRASADA]: {
      corBolinha: 'bg-red-500',
      corBadge: 'bg-red-500 text-white',
      corFundo: 'bg-red-50',
      corBorda: 'border-b border-red-200',
      texto: 'Atrasada'
    }
  };

  /**
 * Lista de residentes disponíveis para seleção
 * Pode ser expandida conforme necessário
 */
  const RESIDENTES_DISPONIVEIS = [
    "João Santos",
    "Maria Oliveira",
    "Carlos Silva",
    "Ana Costa",
    "Beatriz Lima",
    "Pedro Almeida",
    "Fernanda Costa",
    "Roberto Lima",
    "Sofia Martins",
    "Lucas Oliveira"
  ];

  // ===== ESTADOS PRINCIPAIS DA APLICAÇÃO =====

  /**
   * Estado que armazena todas as atividades cadastradas no sistema
   * Cada atividade possui dados completos incluindo residente, local, duração, etc.
  */
  const [atividades, setAtividades] = useState([
    // ===== ATIVIDADES PARA HOJE =====
    {
      id: 1,
      residentes: ["João Santos", "Maria Oliveira"],
      nomeAtividade: "Fisioterapia Matinal",
      categoria: CATEGORIAS_ATIVIDADE.FISICA,
      horario: "08:00",
      duracao: "45 minutos",
      observacoes: "Exercícios de fortalecimento muscular",
      local: "Sala de Fisioterapia",
      periodo: PERIODOS.MANHA,
      status: STATUS.PENDENTE,
      dataAtividade: new Date() // Hoje
    },

    {
      id: 2,
      residentes: ["Maria Oliveira"],
      nomeAtividade: "Terapia Ocupacional",
      categoria: CATEGORIAS_ATIVIDADE.TERAPEUTICA,
      horario: "09:30",
      duracao: "1 hora",
      observacoes: "Atividades de vida diária",
      local: "Sala de Terapia",
      periodo: PERIODOS.MANHA,
      status: STATUS.EM_ANDAMENTO,
      dataAtividade: new Date()
    },

    {
      id: 3,
      residentes: ["Carlos Silva", "Ana Costa", "Beatriz Lima"],
      nomeAtividade: "Oficina de Artesanato",
      categoria: CATEGORIAS_ATIVIDADE.CRIATIVA,
      horario: "14:00",
      duracao: "2 horas",
      observacoes: "Trabalho com argila",
      local: "Sala de Artes",
      periodo: PERIODOS.TARDE,
      status: STATUS.CONCLUIDA,
      dataAtividade: new Date()
    },

    {
      id: 4,
      residentes: ["Ana Costa", "Beatriz Lima"],
      nomeAtividade: "Jogo de Cartas",
      categoria: CATEGORIAS_ATIVIDADE.COGNITIVA,
      horario: "16:00",
      duracao: "1 hora",
      observacoes: "Jogo de memória e raciocínio",
      local: "Sala de Jogos",
      periodo: PERIODOS.TARDE,
      status: STATUS.ATRASADA,
      dataAtividade: new Date()
    },

    {
      id: 5,
      residentes: ["Beatriz Lima", "João Santos", "Ana Costa"],
      nomeAtividade: "Cinema Noturno",
      categoria: CATEGORIAS_ATIVIDADE.LAZER,
      horario: "20:00",
      duracao: "2 horas",
      observacoes: "Sessão de filme clássico",
      local: "Auditório",
      periodo: PERIODOS.NOITE,
      status: STATUS.CANCELADA,
      dataAtividade: new Date()
    },

    // ===== ATIVIDADES PARA ONTEM =====
    {
      id: 6,
      residentes: ["João Santos"],
      nomeAtividade: "Hidroginástica",
      categoria: CATEGORIAS_ATIVIDADE.FISICA,
      horario: "09:00",
      duracao: "1 hora",
      observacoes: "Aula na piscina aquecida",
      local: "Piscina Terapêutica",
      periodo: PERIODOS.MANHA,
      status: STATUS.CONCLUIDA,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() - 1))
    },

    {
      id: 7,
      residentes: ["Maria Oliveira", "Carlos Silva", "Beatriz Lima"],
      nomeAtividade: "Roda de Conversa",
      categoria: CATEGORIAS_ATIVIDADE.SOCIAL,
      horario: "15:00",
      duracao: "1 hora",
      observacoes: "Discussão sobre temas atuais",
      local: "Sala de Convivência",
      periodo: PERIODOS.TARDE,
      status: STATUS.ATRASADA,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() - 1))
    },

    {
      id: 8,
      residentes: ["Carlos Silva"],
      nomeAtividade: "Aula de Música",
      categoria: CATEGORIAS_ATIVIDADE.CRIATIVA,
      horario: "19:30",
      duracao: "1 hora",
      observacoes: "Prática de violão",
      local: "Sala de Música",
      periodo: PERIODOS.NOITE,
      status: STATUS.CANCELADA,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() - 1))
    },

    // ===== ATIVIDADES PARA 2 DIAS ATRÁS =====
    {
      id: 9,
      residentes: ["Ana Costa"],
      nomeAtividade: "Yoga",
      categoria: CATEGORIAS_ATIVIDADE.FISICA,
      horario: "07:30",
      duracao: "45 minutos",
      observacoes: "Alongamento e relaxamento",
      local: "Sala de Yoga",
      periodo: PERIODOS.MANHA,
      status: STATUS.CONCLUIDA,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() - 2))
    },

    {
      id: 10,
      residentes: ["Beatriz Lima"],
      nomeAtividade: "Oficina de Culinária",
      categoria: CATEGORIAS_ATIVIDADE.CRIATIVA,
      horario: "10:00",
      duracao: "2 horas",
      observacoes: "Preparo de receitas saudáveis",
      local: "Cozinha Experimental",
      periodo: PERIODOS.MANHA,
      status: STATUS.ATRASADA,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() - 2))
    },

    // ===== ATIVIDADES PARA AMANHÃ =====
    {
      id: 11,
      residentes: ["João Santos"],
      nomeAtividade: "Fisioterapia Avançada",
      categoria: CATEGORIAS_ATIVIDADE.FISICA,
      horario: "08:30",
      duracao: "1 hora",
      observacoes: "Exercícios com pesos leves",
      local: "Sala de Fisioterapia",
      periodo: PERIODOS.MANHA,
      status: STATUS.PENDENTE,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() + 1))
    },

    {
      id: 12,
      residentes: ["Maria Oliveira", "Carlos Silva"],
      nomeAtividade: "Jogo de Xadrez",
      categoria: CATEGORIAS_ATIVIDADE.COGNITIVA,
      horario: "14:30",
      duracao: "1 hora",
      observacoes: "Torneio interno",
      local: "Sala de Jogos",
      periodo: PERIODOS.TARDE,
      status: STATUS.PENDENTE,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() + 1))
    },

    {
      id: 13,
      residentes: ["Carlos Silva"],
      nomeAtividade: "Atividade Integral - Passeio",
      categoria: CATEGORIAS_ATIVIDADE.LAZER,
      horario: "09:00",
      duracao: "8 horas",
      observacoes: "Passeio ao parque municipal",
      local: "Parque Municipal",
      periodo: PERIODOS.INTEGRAL,
      status: STATUS.PENDENTE,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() + 1))
    },

    // ===== ATIVIDADES PARA 3 DIAS DEPOIS =====
    {
      id: 14,
      residentes: ["Ana Costa", "Beatriz Lima", "Maria Oliveira"],
      nomeAtividade: "Terapia em Grupo",
      categoria: CATEGORIAS_ATIVIDADE.TERAPEUTICA,
      horario: "10:00",
      duracao: "1 hora",
      observacoes: "Sessão coletiva",
      local: "Sala de Terapia",
      periodo: PERIODOS.MANHA,
      status: STATUS.PENDENTE,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() + 3))
    },

    {
      id: 15,
      residentes: ["Beatriz Lima", "Maria Oliveira"],
      nomeAtividade: "Oficina de Pintura",
      categoria: CATEGORIAS_ATIVIDADE.CRIATIVA,
      horario: "15:00",
      duracao: "2 horas",
      observacoes: "Pintura em tela com orientação",
      local: "Sala de Artes",
      periodo: PERIODOS.TARDE,
      status: STATUS.PENDENTE,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() + 3))
    },

    // ===== ATIVIDADES PARA 1 MÊS DEPOIS =====
    {
      id: 16,
      residentes: ["João Santos"],
      nomeAtividade: "Avaliação Física Mensal",
      categoria: CATEGORIAS_ATIVIDADE.FISICA,
      horario: "09:00",
      duracao: "1 hora",
      observacoes: "Avaliação de progresso",
      local: "Consultório Médico",
      periodo: PERIODOS.MANHA,
      status: STATUS.PENDENTE,
      dataAtividade: new Date(new Date().setMonth(new Date().getMonth() + 1))
    },

    {
      id: 17,
      residentes: ["Maria Oliveira", "Beatriz Lima", "João Santos", "Carlos Silva"],
      nomeAtividade: "Festividade Noturna",
      categoria: CATEGORIAS_ATIVIDADE.SOCIAL,
      horario: "19:00",
      duracao: "3 horas",
      observacoes: "Festa de confraternização",
      local: "Salão de Eventos",
      periodo: PERIODOS.NOITE,
      status: STATUS.PENDENTE,
      dataAtividade: new Date(new Date().setMonth(new Date().getMonth() + 1))
    },

    {
      id: 18,
      residentes: ["Maria Oliveira", "Beatriz Lima", "Carlos Silva"],
      nomeAtividade: "Atividade Integral - Excursão",
      categoria: CATEGORIAS_ATIVIDADE.LAZER,
      horario: "08:00",
      duracao: "10 horas",
      observacoes: "Excursão para museu",
      local: "Museu da Cidade",
      periodo: PERIODOS.INTEGRAL,
      status: STATUS.PENDENTE,
      dataAtividade: new Date(new Date().setMonth(new Date().getMonth() + 1))
    },

    // ===== ATIVIDADES COM COINCIDÊNCIAS DE HORÁRIO =====
    {
      id: 19,
      residentes: ["Ana Costa"],
      nomeAtividade: "Alongamento",
      categoria: CATEGORIAS_ATIVIDADE.FISICA,
      horario: "09:00",
      duracao: "30 minutos",
      observacoes: "Alongamento matinal",
      local: "Sala de Alongamento",
      periodo: PERIODOS.MANHA,
      status: STATUS.PENDENTE,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() + 2))
    },

    {
      id: 20,
      residentes: ["Beatriz Lima"],
      nomeAtividade: "Leitura Guiada",
      categoria: CATEGORIAS_ATIVIDADE.COGNITIVA,
      horario: "09:00",
      duracao: "45 minutos",
      observacoes: "Leitura em grupo",
      local: "Biblioteca",
      periodo: PERIODOS.MANHA,
      status: STATUS.PENDENTE,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() + 2))
    },

    // ===== ATIVIDADES COM OUTRA CATEGORIA =====
    {
      id: 21,
      residentes: ["João Santos"],
      nomeAtividade: "Atividade Livre",
      categoria: CATEGORIAS_ATIVIDADE.OUTRA,
      horario: "16:30",
      duracao: "1 hora",
      observacoes: "Atividade de escolha do residente",
      local: "Área de Lazer",
      periodo: PERIODOS.TARDE,
      status: STATUS.PENDENTE,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() + 4))
    },

    {
      id: 22,
      residentes: ["Maria Oliveira"],
      nomeAtividade: "Sessão de Cinema",
      categoria: CATEGORIAS_ATIVIDADE.LAZER,
      horario: "15:00",
      duracao: "2 horas",
      observacoes: "Filme da semana",
      local: "Auditório",
      periodo: PERIODOS.TARDE,
      status: STATUS.EM_ANDAMENTO,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() - 1))
    },

    // ===== MAIS ATIVIDADES PARA TESTAR FILTROS =====
    {
      id: 23,
      residentes: ["Carlos Silva"],
      nomeAtividade: "Terapia Ocupacional Noturna",
      categoria: CATEGORIAS_ATIVIDADE.TERAPEUTICA,
      horario: "20:30",
      duracao: "1 hora",
      observacoes: "Atividades noturnas",
      local: "Sala de Terapia",
      periodo: PERIODOS.NOITE,
      status: STATUS.CONCLUIDA,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() - 3))
    },

    {
      id: 24,
      residentes: ["Ana Costa", "Carlos Silva"],
      nomeAtividade: "Jogo de Bingo",
      categoria: CATEGORIAS_ATIVIDADE.SOCIAL,
      horario: "18:00",
      duracao: "1 hora",
      observacoes: "Bingo semanal",
      local: "Salão de Jogos",
      periodo: PERIODOS.NOITE,
      status: STATUS.ATRASADA,
      dataAtividade: new Date(new Date().setDate(new Date().getDate() - 2))
    }
  ]);

  // ===== ESTADOS DE CONTROLE DA INTERFACE =====

  /**
   * Estado que controla a data atual sendo visualizada no calendário
   * Usado para navegação entre meses no componente Calendar
  */
  const [dataAtual, setDataAtual] = useState(new Date());

  /**
   * Estado que controla se o modal de adicionar/editar está aberto
   * Modal é o popup que aparece para criar ou editar atividades
  */
  const [modalAberto, setModalAberto] = useState(false);

  /**
   * Estado que indica se está editando uma atividade existente
   * Determina se o modal está no modo edição ou criação
  */
  const [editando, setEditando] = useState(false);

  /**
   * Estado que armazena o ID da atividade sendo editada
   * Usado para identificar qual registro está sendo modificado
  */
  const [idEditando, setIdEditando] = useState(null);

  /**
   * Estado que controla a visibilidade do tooltip informativo
   * Tooltip aparece ao passar o mouse sobre o ícone de informações
  */
  const [infoVisivel, setInfoVisivel] = useState(false);

  /**
   * Estado que controla qual dropdown de status está aberto (por atividade ID)
   * Permite que apenas um dropdown de status esteja aberto por vez
  */
  const [dropdownStatusAberto, setDropdownStatusAberto] = useState(null);

  /**
   * Estado que armazena os dados da nova atividade sendo criada/editada
   * Contém todos os campos do formulário antes do salvamento
  */
  const [novaAtividade, setNovaAtividade] = useState({
    residentes: [],
    nomeAtividade: '',
    categoria: CATEGORIAS_ATIVIDADE.FISICA,
    horario: '',
    duracao: '',
    observacoes: '',
    local: '',
    periodo: PERIODOS.MANHA,
    status: STATUS.PENDENTE,
    dataAtividade: formatarChaveData(new Date())
  });

  // ===== ESTADOS PARA FILTROS =====

  /**
   * Estado do filtro por status ('todos' ou status específico)
   * Filtra atividades por estado atual (pendente, atrasada, etc)
  */
  const [filtroStatus, setFiltroStatus] = useState('todos');

  /**
   * Estado que controla se o dropdown de filtro por status está aberto
  */
  const [filtroStatusAberto, setFiltroStatusAberto] = useState(false);

  /**
   * Estado do filtro por residente ('todos' ou nome específico)
   * Filtra atividades por residente específico
  */
  const [filtroResidente, setFiltroResidente] = useState('todos');

  /**
   * Estado que controla se o dropdown de filtro por residente está aberto
   * Dropdown é a lista suspensa que aparece ao clicar no filtro
  */
  const [filtroResidenteAberto, setFiltroResidenteAberto] = useState(false);

  /**
   * Estado do filtro por período ('todos' ou período específico)
   * Filtra atividades por período do dia
  */
  const [filtroPeriodo, setFiltroPeriodo] = useState('todos');

  /**
   * Estado que controla se o dropdown de filtro por período está aberto
  */
  const [filtroPeriodoAberto, setFiltroPeriodoAberto] = useState(false);

  /**
   * Estado do filtro por categoria de atividade ('todos' ou categoria específico)
   * Filtra atividades por categoria/categoria
  */
  const [filtroCategoria, setFiltroCategoria] = useState('todos');

  /**
   * Estado que controla se o dropdown de filtro por categoria está aberto
  */
  const [filtroCategoriaAberto, setFiltroCategoriaAberto] = useState(false);

  /**
   * Estado que armazena a data selecionada para filtro
   * Usado para filtrar atividades por data específica
  */
  const [filtroDia, setFiltroDia] = useState(null);

  /**
   * Estado que indica se o filtro por dia está ativo
   * Controla se o filtro de data está sendo aplicado
  */
  const [filtroDiaAtivo, setFiltroDiaAtivo] = useState(false);

  // ===== FUNÇÕES AUXILIARES =====

  /**
   * Formata uma data para string no formato DD/MM/AAAA
   * Usada como chave para datas no formulário e exibição
   * 
   * @param {Date} data - Data a ser formatada
   * @returns {string} Data formatada como "DD/MM/AAAA"
  */
  function formatarChaveData(data) {
    // Extrai dia, mês e ano da data
    const dia = data.getDate().toString().padStart(2, '0'); // Garante 2 dígitos com zero à esquerda
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // +1 porque meses são 0-indexed
    const ano = data.getFullYear(); // Ano com 4 dígitos

    // Retorna string formatada no padrão brasileiro
    return `${dia}/${mes}/${ano}`;
  }

  /**
   * Converte string de data no formato DD/MM/AAAA para objeto Date
   * Usada para processar datas do formulário
   * 
   * @param {string} dataString - String de data no formato "DD/MM/AAAA"
   * @returns {Date} Objeto Date correspondente
  */
  function parseDataString(dataString) {
    // Divide a string pelos separadores "/"
    const [dia, mes, ano] = dataString.split('/').map(Number); // Converte cada parte para número

    // Cria novo objeto Date (mês é 0-indexed, por isso mes - 1)
    return new Date(ano, mes - 1, dia);
  }

  /**
   * Verifica se uma atividade está atrasada baseada na data e horário
   * Considera a data da atividade e horário para determinar atraso
   * 
   * @param {Object} atividade - Objeto completo da atividade
   * @returns {boolean} True se estiver atrasada, False caso contrário
  */
  const estaAtrasada = (atividade) => {
    const agora = new Date(); // Data e hora atuais
    const dataAtividade = new Date(atividade.dataAtividade); // Data da atividade

    // Remove horas para comparar apenas as datas (sem horário)
    const dataAtividadeSemHora = new Date(dataAtividade.getFullYear(), dataAtividade.getMonth(), dataAtividade.getDate());
    const hojeSemHora = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());

    // Se a data da atividade já passou (é anterior a hoje), está atrasada
    if (dataAtividadeSemHora < hojeSemHora) {
      return true;
    }

    // Se for hoje e tiver horário definido, verifica se passou do horário
    if (atividade.horario && dataAtividadeSemHora.getTime() === hojeSemHora.getTime()) {
      // Divide o horário em horas e minutos
      const [hora, minuto] = atividade.horario.split(':').map(Number); // Converte para números

      // Cria objeto Date com o horário específico da atividade
      const horarioAtividade = new Date();
      horarioAtividade.setHours(hora, minuto, 0, 0); // Define horas, minutos, zera segundos e ms

      // Verifica se o horário atual já passou do horário da atividade
      return agora > horarioAtividade;
    }

    // Se não se enquadra nos casos acima, não está atrasada
    return false;
  };

  /**
   * Obtém o status atual de uma atividade considerando verificações automáticas
   * Aplica lógica de atraso automaticamente para atividades pendentes
   * 
   * @param {Object} atividade - Objeto completo da atividade
   * @returns {string} Status atual da atividade
  */
  const getStatusAtividade = (atividade) => {
    // Se a atividade já está concluída, cancelada ou em andamento, mantém o status
    // Esses status não mudam automaticamente por atraso
    if ([STATUS.CONCLUIDA, STATUS.CANCELADA, STATUS.EM_ANDAMENTO].includes(atividade.status)) {
      return atividade.status;
    }

    // Se está atrasada e é pendente, muda para atrasada
    // Atraso automático só aplica para atividades não finalizadas
    if (estaAtrasada(atividade) && [STATUS.PENDENTE].includes(atividade.status)) {
      return STATUS.ATRASADA;
    }

    // Caso contrário, mantém o status original
    return atividade.status;
  };

  /**
   * Calcula o status que a atividade teria baseado apenas na data/horário
   * (sem considerar alterações manuais)
   * 
   * @param {Object} atividade - Objeto completo da atividade
   * @returns {string} Status calculado automaticamente
  */
  const getStatusCalculado = (atividade) => {
    // Se a atividade já está concluída, cancelada ou em andamento, mantém o status
    // Esses status não mudam automaticamente por atraso
    if ([STATUS.CONCLUIDA, STATUS.CANCELADA, STATUS.EM_ANDAMENTO].includes(atividade.status)) {
      return atividade.status;
    }

    // Se está atrasada e é pendente, muda para atrasada
    // Atraso automático só aplica para atividades não finalizadas
    if (estaAtrasada(atividade) && [STATUS.PENDENTE].includes(atividade.status)) {
      return STATUS.ATRASADA;
    }

    // Caso contrário, mantém o status original
    return atividade.status;
  };

  /**
   * Formata data para exibição amigável na legenda
   * 
   * @param {Date} data - Data a ser formatada
   * @returns {string} Data formatada (ex: "25 de novembro de 2024")
  */
  const formatarDataLegenda = (data) => {
    // Usa API de internacionalização para formato em português
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',    // Dia com 2 dígitos
      month: 'long',     // Nome completo do mês
      year: 'numeric'    // Ano com 4 dígitos
    });
  };

  // ===== FUNÇÕES PARA CALENDÁRIO E FILTROS =====

  /**
   * Verifica se uma atividade deve ser exibida em uma data específica
   * Considera a data da atividade para determinar se aparece no calendário
   * 
   * @param {Object} atividade - Objeto completo da atividade
   * @param {Date} data - Data a ser verificada
   * @returns {boolean} True se deve ser exibida na data
  */
  const atividadeNoDia = (atividade, data) => {
    const dataVerificar = new Date(data);
    // Remove horas para comparar apenas datas
    dataVerificar.setHours(0, 0, 0, 0);

    const dataAtividade = new Date(atividade.dataAtividade);
    // Remove horas para comparar apenas datas
    dataAtividade.setHours(0, 0, 0, 0);

    // Retorna true se as datas forem iguais
    return dataAtividade.getTime() === dataVerificar.getTime();
  };

  /**
   * Obtém todas as atividades que ocorrem em uma data específica
   * Aplica filtros de status se estiverem ativos
   * E EXCLUI ATIVIDADES CANCELADAS dos cálculos
   * 
   * @param {Date} data - Data para verificação
   * @returns {Array} Array de atividades do dia
  */
  const obterAtividadesDoDia = (data) => {
    // Filtra atividades que ocorrem na data especificada e NÃO são canceladas
    let atividadesDoDia = atividades.filter(atividade =>
      atividadeNoDia(atividade, data) && getStatusCalculado(atividade) !== STATUS.CANCELADA // Usar getStatusCalculado aqui
    );

    // Aplica filtro de status se não for 'todos'
    if (filtroStatus !== 'todos') {
      atividadesDoDia = atividadesDoDia.filter(atividade =>
        getStatusCalculado(atividade) === filtroStatus // Usar getStatusCalculado aqui
      );
    }

    return atividadesDoDia;
  };

  /**
   * Obtém os residentes únicos que têm atividades em uma data
   * 
   * @param {Date} data - Data para verificação
   * @returns {Array} Array de nomes de residentes únicos
  */
  const obterResidentesDoDia = (data) => {
    const atividadesDoDia = obterAtividadesDoDia(data);

    // Usa Set para garantir residentes únicos, depois converte para Array
    const todosResidentes = atividadesDoDia.flatMap(atividade => atividade.residentes || []);

    return [...new Set(todosResidentes)];
  };

  /**
   * Calcula estatísticas de atividades para uma data específica
   * EXCLUINDO ATIVIDADES CANCELADAS
   * 
   * @param {Date} data - Data para cálculo
   * @returns {Object} Estatísticas com totais por status
  */
  const getEstatisticasDia = (data) => {
    const atividadesDoDia = obterAtividadesDoDia(data);

    // Inicializa contadores para cada categoria de status
    let pendentes = 0;
    let em_andamento = 0;
    let concluidas = 0;
    let canceladas = 0;
    let atrasadas = 0;
    let total = atividadesDoDia.length;

    // Para cada atividade do dia, incrementa o contador correspondente
    atividadesDoDia.forEach(atividade => {
      const status = getStatusCalculado(atividade); // Usar getStatusCalculado aqui

      // Usa switch para melhor performance com múltiplos casos
      switch (status) {
        case STATUS.PENDENTE:
          pendentes++;
          break;
        case STATUS.EM_ANDAMENTO:
          em_andamento++;
          break;
        case STATUS.CONCLUIDA:
          concluidas++;
          break;
        case STATUS.CANCELADA:
          canceladas++;
          break;
        case STATUS.ATRASADA:
          atrasadas++;
          break;
      }
    });

    return { pendentes, em_andamento, concluidas, canceladas, atrasadas, total };
  };

  /**
   * Determina a cor do calendário baseado nas estatísticas do dia
   * Prioridade: Atrasadas > Pendentes > Em Andamento > Concluídas
   * EXCLUI ATIVIDADES CANCELADAS do cálculo
   * 
   * @param {Date} data - Data para verificação
   * @returns {string|null} Classe CSS da cor ou null se não há atividades
  */
  const getCorCalendario = (data) => {
    const estatisticas = getEstatisticasDia(data);

    // Se não há atividades, não mostra cor
    if (estatisticas.total === 0) return null;

    // Lógica de cores baseada no status das atividades
    // Ordem de prioridade: problemas primeiro, depois andamento, depois sucesso
    if (estatisticas.atrasadas > 0) return 'bg-red-500';
    if (estatisticas.pendentes > 0) return 'bg-yellow-500';
    if (estatisticas.em_andamento > 0) return 'bg-blue-500';
    return 'bg-green-500';
  };

  /**
   * Conteúdo customizado para cada dia do calendário
   * Mostra bolinha colorida com contagem de atividades
   * 
   * @param {Object} param0 - Objeto com date e view do calendário
   * @returns {JSX.Element|null} Elemento JSX ou null se não há conteúdo
  */
  const getTileContent = ({ date, view }) => {
    // Só mostra conteúdo para visualização mensal
    if (view !== 'month') return null;

    const estatisticasDia = getEstatisticasDia(date);
    const count = estatisticasDia.total; // Total de atividades no dia

    // Se há atividades, mostra a bolinha com contagem
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
   * Destaca dia atual e dia selecionado pelo filtro
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
   * Ativa/desativa o filtro por dia (toggle)
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
   * EXCLUINDO ATIVIDADES CANCELADAS
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
    let totalAtividades = new Set();
    let totalResidentes = new Set();
    let total = 0;
    let pendentes = 0;
    let em_andamento = 0;
    let concluidas = 0;
    let canceladas = 0;
    let atrasadas = 0;

    // Itera por todos os dias do mês
    for (let dia = new Date(primeiroDia); dia <= ultimoDia; dia.setDate(dia.getDate() + 1)) {
      const atividadesDoDia = obterAtividadesDoDia(new Date(dia));
      const estatisticasDia = getEstatisticasDia(new Date(dia));

      // Adiciona atividades únicas (por ID) - APENAS NÃO CANCELADAS
      atividadesDoDia.forEach(atividade => totalAtividades.add(atividade.id));

      // Adiciona residentes únicos - APENAS DE ATIVIDADES NÃO CANCELADAS
      atividadesDoDia.forEach(atividade => {
        (atividade.residentes || []).forEach(residente => totalResidentes.add(residente));
      });

      // Soma as estatísticas do dia
      total += estatisticasDia.total;
      pendentes += estatisticasDia.pendentes;
      em_andamento += estatisticasDia.em_andamento;
      concluidas += estatisticasDia.concluidas;
      canceladas += estatisticasDia.canceladas;
      atrasadas += estatisticasDia.atrasadas;
    }

    return {
      totalAtividades: totalAtividades.size,
      totalResidentes: totalResidentes.size,
      total,
      pendentes,
      em_andamento,
      concluidas,
      canceladas,
      atrasadas
    };
  };

  // ===== FUNÇÕES DE GERENCIAMENTO DE ATIVIDADES =====

  /**
   * Abre o modal para adicionar nova atividade
   * Reseta todos os estados do formulário para valores padrão
  */
  const abrirModalAdicionar = () => {
    setNovaAtividade({
      residentes: [],
      nomeAtividade: '',
      categoria: CATEGORIAS_ATIVIDADE.FISICA,
      horario: '',
      duracao: '',
      observacoes: '',
      local: '',
      periodo: PERIODOS.MANHA,
      status: STATUS.PENDENTE,
      dataAtividade: formatarChaveData(new Date())
    });
    setEditando(false);
    setIdEditando(null);
    setModalAberto(true);
  };

  /**
   * Abre o modal para editar atividade existente
   * Preenche o formulário com os dados da atividade
   * 
   * @param {number} id - ID da atividade a editar
  */
  const abrirModalEditar = (id) => {
    const atividadeParaEditar = atividades.find(atividade => atividade.id === id);
    if (atividadeParaEditar) {
      setNovaAtividade({
        residentes: atividadeParaEditar.residentes,
        nomeAtividade: atividadeParaEditar.nomeAtividade,
        categoria: atividadeParaEditar.categoria,
        horario: atividadeParaEditar.horario,
        duracao: atividadeParaEditar.duracao,
        observacoes: atividadeParaEditar.observacoes,
        local: atividadeParaEditar.local,
        periodo: atividadeParaEditar.periodo,
        status: atividadeParaEditar.status,
        dataAtividade: formatarChaveData(atividadeParaEditar.dataAtividade)
      });
      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  /**
   * Salva a atividade (nova ou editada)
   * Aplica validações e processa os dados antes de salvar
  */
  const salvarAtividade = () => {
    // Validação básica - campos obrigatórios
    if (!novaAtividade.residentes.length || !novaAtividade.nomeAtividade || !novaAtividade.dataAtividade) return;

    // Converte data do formato DD/MM/AAAA para objeto Date
    const dataAtividade = parseDataString(novaAtividade.dataAtividade);

    // Cria objeto final da atividade
    const atividadeObj = {
      ...novaAtividade,
      dataAtividade: dataAtividade,
      // Garante que o status seja calculado corretamente
      status: novaAtividade.status
    };

    // Remove a propriedade dataAtividade string do objeto final
    delete atividadeObj.dataAtividadeString;

    // Atualiza o estado com a nova atividade
    if (editando && idEditando) {
      // Modo edição: substitui a atividade existente
      setAtividades(anterior => anterior.map(atividade =>
        atividade.id === idEditando ? { ...atividadeObj, id: idEditando } : atividade
      ));
    } else {
      // Modo adição: adiciona nova atividade com ID único
      setAtividades(anterior => [...anterior, {
        ...atividadeObj,
        id: Date.now() // Gera ID único baseado no timestamp
      }]);
    }

    // Fecha o modal após salvar
    setModalAberto(false);
  };

  /**
   * Exclui uma atividade após confirmação do usuário
   * 
   * @param {number} id - ID da atividade a excluir
  */
  const excluirAtividade = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta atividade?')) {
      setAtividades(anterior => anterior.filter(atividade => atividade.id !== id));
    }
  };

  /**
   * Abre/fecha o dropdown de status de uma atividade específica
   * 
   * @param {number} atividadeId - ID da atividade
  */
  const toggleDropdownStatus = (atividadeId) => {
    setDropdownStatusAberto(dropdownStatusAberto === atividadeId ? null : atividadeId);
  };

  /**
   * Altera o status de uma atividade manualmente
   * 
   * @param {number} id - ID da atividade
   * @param {string} novoStatus - Novo status
  */
  const alterarStatus = (id, novoStatus) => {
    setAtividades(anterior => anterior.map(atividade => {
      if (atividade.id === id) {
        return { ...atividade, status: novoStatus };
      }
      return atividade;
    }));
    setDropdownStatusAberto(null);
  };

  // ===== FUNÇÕES PARA GERENCIAMENTO DE RESIDENTES =====

  /**
   * Adiciona um residente à lista de residentes da atividade
   * 
   * @param {string} residente - Nome do residente a adicionar
  */
  const adicionarResidente = (residente) => {
    if (residente && !novaAtividade.residentes.includes(residente)) {
      setNovaAtividade({
        ...novaAtividade,
        residentes: [...novaAtividade.residentes, residente]
      });
    }
  };

  /**
   * Remove um residente da lista de residentes da atividade
   * 
   * @param {string} residente - Nome do residente a remover
  */
  const removerResidente = (residente) => {
    setNovaAtividade({
      ...novaAtividade,
      residentes: novaAtividade.residentes.filter(r => r !== residente)
    });
  };

  /**
   * Adiciona múltiplos residentes à atividade
   * 
   * @param {Array} residentes - Array de residentes a adicionar
  */
  const adicionarMultiplosResidentes = (residentes) => {
    const residentesUnicos = [...new Set([...novaAtividade.residentes, ...residentes])];
    setNovaAtividade({
      ...novaAtividade,
      residentes: residentesUnicos
    });
  };

  // ===== EFEITOS (HOOKS) ===== 

  /**
   * Efeito para sincronização automática contínua dos status
   * Verifica a cada 30 segundos se alguma atividade precisa ter seu status atualizado
   * para "atrasada" baseado na data e horário atual
   * RESPEITA AJUSTES MANUAIS - não altera status que foram manualmente modificados
  */
  useEffect(() => {
    const interval = setInterval(() => {
      setAtividades(anterior => anterior.map(atividade => {
        const statusCalculado = getStatusCalculado(atividade);
        const statusAtual = atividade.status;

        // Só atualiza automaticamente se:
        // 1. O status calculado é diferente do atual
        // 2. O status atual NÃO foi ajustado manualmente (ou seja, é igual ao que seria calculado)
        // 3. O status calculado é "atrasada"
        if (statusCalculado !== statusAtual &&
          getStatusCalculado({ ...atividade, status: statusCalculado }) === statusCalculado &&
          statusCalculado === STATUS.ATRASADA) {
          return { ...atividade, status: STATUS.ATRASADA };
        }

        return atividade;
      }));
    }, 30000); // Verifica a cada 30 segundos

    // Cleanup: remove o interval quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  /**
   * Efeito para fechar dropdowns ao clicar fora deles
   * Adiciona event listener global para detectar cliques fora dos dropdowns
  */
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verifica se o clique foi fora de qualquer container de dropdown
      if (!event.target.closest('.dropdown-container') && !event.target.closest('.status-dropdown-container')) {
        setFiltroResidenteAberto(false);
        setFiltroCategoriaAberto(false);
        setFiltroStatusAberto(false);
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
   * Aplica todos os filtros ativos às atividades e ordena o resultado
   * Filtra por residente, categoria, status, período e dia específico
   * EXCLUI ATIVIDADES CANCELADAS dos cálculos quando aplicável
   * Ordena por data (crescente) e depois por horário (crescente)
  */
  const atividadesFiltradas = atividades
    .filter(atividade => {
      // Filtro por status: 'todos' ou status específico
      const passaFiltroStatus = filtroStatus === 'todos' || getStatusAtividade(atividade) === filtroStatus;

      // Filtro por residente: 'todos' ou residente específico
      const passaFiltroResidente = filtroResidente === 'todos' ||
        (atividade.residentes && atividade.residentes.includes(filtroResidente));

      // Filtro por período: 'todos' ou período específico
      const passaFiltroPeriodo = filtroPeriodo === 'todos' || atividade.periodo === filtroPeriodo;

      // Filtro por categoria: 'todos' ou categoria específico
      const passaFiltroCategoria = filtroCategoria === 'todos' || atividade.categoria === filtroCategoria;

      // Filtro por dia específico
      let passaFiltroDia = true;
      if (filtroDiaAtivo) {
        passaFiltroDia = atividadeNoDia(atividade, filtroDia);
      }

      // Combina todos os filtros - todos devem ser true para incluir a atividade
      return passaFiltroStatus && passaFiltroResidente && passaFiltroPeriodo && passaFiltroCategoria && passaFiltroDia;
    })

    // Ordenação: por data (crescente) e depois por horário (crescente)
    .sort((a, b) => {
      // Ordena por data
      const dataA = new Date(a.dataAtividade);
      const dataB = new Date(b.dataAtividade);

      if (dataA.getTime() !== dataB.getTime()) {
        return dataA.getTime() - dataB.getTime(); // Ordem crescente (mais antigo primeiro)
      }

      // Se as datas forem iguais, ordena por horário
      const horarioA = a.horario || '00:00';
      const horarioB = b.horario || '00:00';
      return horarioA.localeCompare(horarioB);
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
              Registro de Atividades
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
                  <h3 className="font-bold mb-2">Registro de Atividades</h3>
                  <p>
                    O Registro de Atividades é um documento fundamental para o controle e planejamento das atividades para os residentes. Ele reune as práticas do dia a dia na instituição, além de servir para garantir a organização, transparência e qualidade do atendimento aos residentes.
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
            <FaPlus className="mr-2 text-odara-white" /> Nova Atividade
          </button>
        </div>

        {/* ===== SEÇÃO 3: BARRA DE FILTROS ===== */}
        <div className="relative flex flex-wrap items-center justify-center xl:justify-start gap-2 sm:gap-4 mb-6">
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
                setFiltroPeriodoAberto(false);
                setFiltroCategoriaAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Status
            </button>

            {/* Dropdown de status */}
            {filtroStatusAberto && (
              <div className="absolute mt-2 w-34 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-10 max-h-60 overflow-y-auto">
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

                {Object.entries(ROTULOS_STATUS).map(([valor, rotulo]) => (
                  <button
                    key={valor}
                    onClick={() => {
                      setFiltroStatus(valor);
                      setFiltroStatusAberto(false);
                    }}

                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                      ${filtroStatus === valor
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
                setFiltroStatusAberto(false);
                setFiltroResidenteAberto(!filtroResidenteAberto);
                setFiltroPeriodoAberto(false);
                setFiltroCategoriaAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Residentes
            </button>

            {/* Dropdown de residentes */}
            {filtroResidenteAberto && (
              <div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-10 max-h-60 overflow-y-auto">
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
                {[...new Set(atividades.flatMap(atividade => atividade.residentes).filter(Boolean))].map(residente => (
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

          {/* Filtro por Período */}
          <div className="relative dropdown-container">
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 font-medium hover:border-2 hover:border-odara-primary transition text-sm
                ${filtroPeriodoAberto
                  ? 'border-odara-primary text-gray-700'
                  : 'border-odara-primary/40 text-gray-700'
                } 
              `}

              onClick={() => {
                setFiltroStatusAberto(false);
                setFiltroResidenteAberto(false);
                setFiltroPeriodoAberto(!filtroPeriodoAberto);
                setFiltroCategoriaAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Período
            </button>

            {/* Dropdown de períodos */}
            {filtroPeriodoAberto && (
              <div className="absolute mt-2 w-25 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-10">
                <button
                  onClick={() => {
                    setFiltroPeriodo('todos');
                    setFiltroPeriodoAberto(false);
                  }}

                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                    ${filtroPeriodo === 'todos'
                      ? 'bg-odara-accent/20 font-semibold'
                      : '!border-1 !border-odara-contorno !rounded'
                    }
                  `}
                >
                  Todos
                </button>

                {Object.entries(ROTULOS_PERIODOS).map(([valor, rotulo]) => (
                  <button
                    key={valor}
                    onClick={() => {
                      setFiltroPeriodo(valor);
                      setFiltroPeriodoAberto(false);
                    }}

                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                      ${filtroPeriodo === valor
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

          {/* Filtro por Categoria */}
          <div className="relative dropdown-container">
            <button
              className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 font-medium hover:border-2 hover:border-odara-primary transition text-sm
                ${filtroCategoriaAberto
                  ? 'border-odara-primary text-gray-700'
                  : 'border-odara-primary/40 text-gray-700'
                } 
              `}

              onClick={() => {
                setFiltroStatusAberto(false);
                setFiltroResidenteAberto(false);
                setFiltroPeriodoAberto(false);
                setFiltroCategoriaAberto(!filtroCategoriaAberto);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Categoria
            </button>

            {/* Dropdown de categorias */}
            {filtroCategoriaAberto && (
              <div className="absolute mt-2 w-28 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-10">
                <button
                  onClick={() => {
                    setFiltroCategoria('todos');
                    setFiltroCategoriaAberto(false);
                  }}

                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                    ${filtroCategoria === 'todos'
                      ? 'bg-odara-accent/20 font-semibold'
                      : '!border-1 !border-odara-contorno !rounded'
                    }
                  `}
                >
                  Todos
                </button>

                {Object.entries(ROTULOS_CATEGORIAS).map(([valor, rotulo]) => (
                  <button
                    key={valor}
                    onClick={() => {
                      setFiltroCategoria(valor);
                      setFiltroCategoriaAberto(false);
                    }}

                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                      ${filtroCategoria === valor
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

          {/* Botão Limpar Todos os Filtros (apenas quando há filtros ativos) */}
          {(filtroDiaAtivo || filtroResidente !== 'todos' || filtroCategoria !== 'todos' || filtroStatus !== 'todos' || filtroPeriodo !== 'todos') && (
            <button
              onClick={() => {
                setFiltroDiaAtivo(false);
                setFiltroDia(null);
                setFiltroStatus('todos');
                setFiltroResidente('todos');
                setFiltroPeriodo('todos');
                setFiltroCategoria('todos');
              }}
              className="flex items-center bg-odara-accent text-odara-white rounded-full px-3 py-2 shadow-sm font-medium hover:bg-odara-secondary transition text-sm"
            >
              <FaTimes className="mr-1" /> Limpar Filtros
            </button>
          )}
        </div>

        {/* ===== SEÇÃO 4: GRID PRINCIPAL (ATIVIDADES + CALENDÁRIO) ===== */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">

          {/* ===== COLUNA DA ESQUERDA: LISTA DE ATIVIDADES ===== */}
          <div className="bg-odara-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-4 sm:p-6 order-2 xl:order-1">
            {/* Cabeçalho da lista com título e contador */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-center xl:justify-start gap-2 sm:gap-4 mb-4 text-center sm:text-left">
              {/* Título */}
              <h2 className="text-2xl lg:text-4xl md:text-4xl font-bold text-odara-dark">
                {filtroStatus === 'todos' ? 'Todas as Atividades' : `Atividades ${ROTULOS_STATUS[filtroStatus]}`}
              </h2>

              {/* Contador */}
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                Total: {atividadesFiltradas.length}
              </span>
            </div>

            {/* Tarjas de Filtros Ativos */}
            <div className="flex flex-wrap gap-2 mb-4 justify-center xl:justify-start">
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

              {/* Tarja de Período */}
              {filtroPeriodo !== 'todos' && (
                <span className="bg-odara-accent/20 text-odara-accent font-bold px-3 py-1 rounded-full text-sm">
                  Período: {ROTULOS_PERIODOS[filtroPeriodo]}
                </span>
              )}

              {/* Tarja de Categoria */}
              {filtroCategoria !== 'todos' && (
                <span className="bg-odara-primary/20 text-odara-primary font-bold px-3 py-1 rounded-full text-sm">
                  Categoria: {ROTULOS_CATEGORIAS[filtroCategoria]}
                </span>
              )}
            </div>

            {/* Lista de Atividades */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {/* Mensagem quando não há atividades */}
              {atividadesFiltradas.length === 0 ? (
                <div className="p-6 rounded-xl bg-odara-name/10 text-center">
                  <p className="text-odara-dark/60">
                    Nenhuma atividade encontrada
                  </p>
                </div>
              ) : (
                // Renderiza cada atividade filtrada
                atividadesFiltradas.map(atividade => {
                  const statusAtual = getStatusAtividade(atividade);
                  const configStatus = CONFIGS_STATUS[statusAtual];

                  return (
                    <div
                      key={atividade.id}
                      className="bg-white rounded-lg shadow-md border border-gray-200"
                    >

                      {/* HEADER - Data e status */}
                      <div className={`flex items-center justify-between p-3 rounded-t-lg ${configStatus.corFundo} ${configStatus.corBorda}`}>
                        {/* Lado esquerdo: data e informações */}
                        <div className="flex items-center">
                          {/* Bolinha indicadora de status */}
                          <div className={`w-3 h-3 rounded-full mr-3 ${configStatus.corBolinha}`}></div>

                          {/* Texto com data e horário */}
                          <div className="flex items-center">
                            <p className="text-sm sm:text-base text-odara-dark">
                              <span className='font-semibold'>
                                {atividade.dataAtividade.getDate().toString().padStart(2, '0')}/
                                {(atividade.dataAtividade.getMonth() + 1).toString().padStart(2, '0')}/
                                {atividade.dataAtividade.getFullYear()}
                              </span>

                              {atividade.horario && (
                                <span className="text-odara-accent ml-2">• {atividade.horario}</span>
                              )}
                            </p>

                            {/* Indicador de ajuste manual */}
                            {getStatusCalculado(atividade) !== atividade.status && (
                              <span className="text-yellow-600 ml-2 text-xs">(Ajustado manualmente)</span>
                            )}
                          </div>
                        </div>

                        {/* Lado direito: dropdown de status */}
                        <div className="flex items-center gap-3 status-dropdown-container">
                          <div className="relative">
                            {/* Botão do dropdown */}
                            <button
                              onClick={() => toggleDropdownStatus(atividade.id)}
                              className={`flex items-center rounded-lg px-3 py-1 border-2 font-medium transition-colors duration-200 text-sm min-w-[120px] justify-center ${configStatus.corBadge} hover:opacity-90`}
                            >
                              <FaAngleDown className="mr-2 text-white" />
                              {ROTULOS_STATUS_SINGULAR[statusAtual]}
                            </button>

                            {/* Dropdown menu */}
                            {dropdownStatusAberto === atividade.id && (
                              <div className="absolute mt-1 w-40 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-20 right-0">
                                {Object.entries(ROTULOS_STATUS_SINGULAR).map(([valor, rotulo]) => (
                                  <button
                                    key={valor}
                                    onClick={() => alterarStatus(atividade.id, valor)}
                                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg 
                                      ${statusAtual === valor
                                        ? 'bg-odara-accent/20 font-semibold text-odara-accent'
                                        : 'text-odara-dark'
                                      }
                                    `}
                                  >
                                    {rotulo}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* CORPO - Conteúdo principal da atividade */}
                      <div className="p-4">
                        {/* Nome da atividade */}
                        <h6 className="text-lg sm:text-xl font-bold mb-3 text-odara-dark">
                          {atividade.nomeAtividade}
                        </h6>

                        {/* Grid com informações da atividade */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-sm">
                          {/* Coluna da esquerda */}
                          <div className="space-y-2">
                            <div>
                              <strong className="text-odara-dark">Categoria:</strong>
                              <span className="text-odara-name ml-1">{ROTULOS_CATEGORIAS[atividade.categoria]}</span>
                            </div>

                            <div>
                              <strong className="text-odara-dark">Período:</strong>
                              <span className="text-odara-name ml-1">{ROTULOS_PERIODOS[atividade.periodo]}</span>
                            </div>

                            {/* Local se existir */}
                            {atividade.local && (
                              <div>
                                <strong className="text-odara-dark">Local:</strong>
                                <span className="text-odara-name ml-1">{atividade.local}</span>
                              </div>
                            )}
                          </div>

                          {/* Coluna da direita */}
                          <div className="space-y-2">
                            {/* Duração se existir */}
                            {atividade.duracao && (
                              <div>
                                <strong className="text-odara-dark">Duração:</strong>
                                <span className="text-odara-name ml-1">{atividade.duracao}</span>
                              </div>
                            )}

                            {/* Observações se existirem */}
                            {atividade.observacoes && (
                              <div>
                                <strong className="text-odara-dark">Observações:</strong>
                                <span className="text-odara-name ml-1">{atividade.observacoes}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* FOOTER - Residentes e ações */}
                      <div className="px-4 py-3 bg-gray-50 rounded-b-lg border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          {/* Informações dos residentes */}
                          <div className="flex items-center text-sm flex-wrap gap-1">
                            {/* Badges dos residentes */}
                            {atividade.residentes
                              .sort((a, b) => a.localeCompare(b)) // Ordenação alfabética crescente

                              .map(residente => (
                                <span
                                  key={residente}
                                  className="bg-odara-accent text-white px-3 py-1 rounded-full text-xs font-medium"
                                >
                                  {residente}
                                </span>
                              ))
                            }
                          </div>

                          {/* Ações: editar e excluir */}
                          <div className="flex space-x-2 self-end sm:self-auto">
                            <button
                              onClick={() => abrirModalEditar(atividade.id)}
                              className="text-odara-dropdown-accent hover:text-odara-white transition-colors duration-200 p-2 rounded-full hover:bg-odara-dropdown-accent"
                              title="Editar atividade"
                            >
                              <FaEdit size={14} />
                            </button>

                            <button
                              onClick={() => excluirAtividade(atividade.id)}
                              className="text-odara-alerta hover:text-odara-white transition-colors duration-200 p-2 rounded-full hover:bg-odara-alerta"
                              title="Excluir atividade"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
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
                        <span>Atividades agendadas:</span>
                        <span className="font-semibold">{obterAtividadesDoDia(filtroDia).length}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Residentes com atividades:</span>
                        <span className="font-semibold">{obterResidentesDoDia(filtroDia).length}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Total de atividades:</span>
                        <span className="font-semibold">{getEstatisticasDia(filtroDia).total}</span>
                      </div>

                      {/* Barras de progresso coloridas */}
                      <div className="flex justify-between gap-1 mt-2">
                        <div className="flex-1 border-1 border-green-500 text-green-500 font-semibold px-1 py-0.5 rounded text-center text-xs">
                          {getEstatisticasDia(filtroDia).concluidas}
                        </div>

                        <div className="flex-1 border-1 border-blue-500 text-blue-500 font-semibold px-1 py-0.5 rounded text-center text-xs">
                          {getEstatisticasDia(filtroDia).em_andamento}
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
                        <span>Atividades agendadas: </span>
                        <span className="font-semibold">{getEstatisticasMes(filtroDia).totalAtividades}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Residentes com atividades: </span>
                        <span className="font-semibold">{getEstatisticasMes(filtroDia).totalResidentes}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Total de atividades: </span>
                        <span className="font-semibold">{getEstatisticasMes(filtroDia).total}</span>
                      </div>

                      {/* Barras de progresso coloridas */}
                      <div className="flex justify-between gap-1 mt-2">
                        <div className="flex-1 border-1 border-green-500 text-green-500 font-semibold px-1 py-0.5 rounded text-center text-xs">
                          {getEstatisticasMes(filtroDia).concluidas}
                        </div>

                        <div className="flex-1 border-1 border-blue-500 text-blue-500 font-semibold px-1 py-0.5 rounded text-center text-xs">
                          {getEstatisticasMes(filtroDia).em_andamento}
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
                  <span>Concluídas</span>
                </div>

                <div className="flex items-center gap-1 text-gray-500">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Em Andamento</span>
                </div>

                <div className="flex items-center gap-1 text-gray-500">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Pendentes</span>
                </div>

                <div className="flex items-center gap-1 text-gray-500">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Atrasadas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== MODAL PARA ADICIONAR/EDITAR ATIVIDADE ===== */}
        {modalAberto && (
          <div className="fixed inset-0 bg-odara-offwhite/80 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-4 sm:p-6 border-l-4 border-odara-primary max-h-[90vh] overflow-y-auto">
              {/* Cabeçalho do Modal */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-odara-accent">
                  {editando ? 'Editar' : 'Adicionar'} Atividade
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
                {/* Linha 1: Residentes e Nome da Atividade */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Residentes *</label>

                    {/* Campo de seleção de residentes */}
                    <select
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base mb-2"
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          adicionarResidente(e.target.value);
                          e.target.value = ''; // Reset do select
                        }
                      }}
                    >
                      <option value="">Selecione um residente...</option>
                      {RESIDENTES_DISPONIVEIS.filter(residente => !novaAtividade.residentes.includes(residente)).map(residente => (
                        <option key={residente} value={residente}>{residente}</option>
                      ))}
                    </select>

                    {/* Lista de residentes selecionados */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {novaAtividade.residentes.map(residente => (
                        <span
                          key={residente}
                          className="bg-odara-accent text-white px-3 py-1 rounded-full text-xs font-medium flex items-center"
                        >
                          {residente}
                          <button
                            type="button"
                            onClick={() => removerResidente(residente)}
                            className="ml-2 text-white hover:text-red-200"
                          >
                            <FaTimes size={12} />
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Mensagem de validação */}
                    {novaAtividade.residentes.length === 0 && (
                      <p className="text-red-500 text-xs mt-1">Pelo menos um residente é obrigatório</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Nome da Atividade *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                      value={novaAtividade.nomeAtividade}
                      onChange={(e) => setNovaAtividade({ ...novaAtividade, nomeAtividade: e.target.value })}
                      placeholder="Nome da atividade"
                    />
                  </div>
                </div>

                {/* Linha 2: Categoria e Período */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Categoria de Atividade</label>
                    <select
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                      value={novaAtividade.categoria}
                      onChange={(e) => setNovaAtividade({ ...novaAtividade, categoria: e.target.value })}
                    >
                      {Object.entries(ROTULOS_CATEGORIAS).map(([chave, rotulo]) => (
                        <option key={chave} value={chave}>{rotulo}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Período</label>
                    <select
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                      value={novaAtividade.periodo}
                      onChange={(e) => setNovaAtividade({ ...novaAtividade, periodo: e.target.value })}
                    >
                      {Object.entries(ROTULOS_PERIODOS).map(([chave, rotulo]) => (
                        <option key={chave} value={chave}>{rotulo}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Linha 3: Data e Horário */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Data da Atividade *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                      value={novaAtividade.dataAtividade}
                      onChange={(e) => setNovaAtividade({ ...novaAtividade, dataAtividade: e.target.value })}
                      placeholder="DD/MM/AAAA"
                    />
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Horário</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                      value={novaAtividade.horario}
                      onChange={(e) => setNovaAtividade({ ...novaAtividade, horario: e.target.value })}
                    />
                  </div>
                </div>

                {/* Linha 4: Duração e Local */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Duração</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                      value={novaAtividade.duracao}
                      onChange={(e) => setNovaAtividade({ ...novaAtividade, duracao: e.target.value })}
                      placeholder="Ex: 45 minutos, 1 hora"
                    />
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Local</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                      value={novaAtividade.local}
                      onChange={(e) => setNovaAtividade({ ...novaAtividade, local: e.target.value })}
                      placeholder="Local onde ocorrerá a atividade"
                    />
                  </div>
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Observações</label>
                  <textarea
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                    rows="3"
                    value={novaAtividade.observacoes}
                    onChange={(e) => setNovaAtividade({ ...novaAtividade, observacoes: e.target.value })}
                    placeholder="Observações importantes sobre a atividade"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Status</label>
                  <select
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                    value={novaAtividade.status}
                    onChange={(e) => setNovaAtividade({ ...novaAtividade, status: e.target.value })}
                  >
                    {Object.entries(ROTULOS_STATUS_SINGULAR).map(([chave, rotulo]) => (
                      <option key={chave} value={chave}>{rotulo}</option>
                    ))}
                  </select>
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
                    onClick={salvarAtividade}
                    disabled={!novaAtividade.residentes.length || !novaAtividade.nomeAtividade || !novaAtividade.dataAtividade}
                    className="px-6 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {editando ? 'Salvar Alterações' : 'Adicionar Atividade'}
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

export default RegistroAtividades;