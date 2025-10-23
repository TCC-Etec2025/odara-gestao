import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaTimes, FaArrowLeft, FaCamera, FaCheck, FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const RegistroMedicamentos = () => {
  // ===== ESTADOS PRINCIPAIS =====

  // Estado que armazena todos os medicamentos cadastrados
  // ATUALIZADO: Compatível com o novo sistema de diasHorarios para mensal e única
  const [medicamentos, setMedicamentos] = useState([
    {
      id: 1,
      dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 5),
      residente: "João Santos",
      nomeMedicamento: "Losartana",
      dosagem: "50mg",
      dose: "1 comprimido",
      horarios: ["08:00", "20:00"],
      diasAdministracao: [1, 3, 5], // Dias da semana (0=Dom, 1=Seg, etc)
      recorrencia: "semanal",
      efeitosColaterais: "Tontura, hipotensão",
      observacoes: "Tomar antes das refeições",
      saudeRelacionada: "Hipertensão arterial",
      foto: null,
      status: "ativo",
      administracoes: {}
    },

    {
      id: 2,
      dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 10),
      dataFim: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5),
      residente: "Maria Oliveira",
      nomeMedicamento: "Sinvastatina",
      dosagem: "20mg",
      dose: "1 comprimido",
      horarios: ["22:00"],
      diasAdministracao: [0, 1, 2, 3, 4, 5, 6], // Todos os dias
      recorrencia: "diario",
      efeitosColaterais: "Dores musculares",
      observacoes: "Tomar à noite",
      saudeRelacionada: "Colesterol alto",
      foto: null,
      status: "ativo",
      administracoes: {}
    },

    // Medicamento mensal com diasHorarios
    {
      id: 3,
      dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      residente: "Carlos Silva",
      nomeMedicamento: "Omeprazol",
      dosagem: "20mg",
      dose: "1 cápsula",
      horarios: [], // Vazio pois os horários estão em diasHorarios
      diasAdministracao: [],
      recorrencia: "mensal",
      diasHorarios: [
        {
          data: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          horarios: ["07:00"]
        },
        {
          data: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
          horarios: ["07:00"]
        }
      ],
      efeitosColaterais: "Dor de cabeça",
      observacoes: "Tomar em jejum",
      saudeRelacionada: "Gastrite",
      foto: null,
      status: "ativo",
      administracoes: {}
    },

    // Medicamento finalizado automaticamente (data fim no passado)
    {
      id: 4,
      dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 15),
      dataFim: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 2),
      residente: "Ana Costa",
      nomeMedicamento: "Amoxicilina",
      dosagem: "500mg",
      dose: "1 comprimido",
      horarios: ["08:00", "20:00"],
      diasAdministracao: [0, 1, 2, 3, 4, 5, 6],
      recorrencia: "diario",
      efeitosColaterais: "Náusea, diarreia",
      observacoes: "Tomar com alimentos",
      saudeRelacionada: "Infecção bacteriana",
      foto: null,
      status: "finalizado",
      administracoes: {}
    },

    // Medicamento único com diasHorarios (dias com horários diferentes)
    {
      id: 5,
      dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3),
      residente: "Pedro Almeida",
      nomeMedicamento: "Vitamina D",
      dosagem: "1000UI",
      dose: "1 cápsula",
      horarios: [], // Vazio pois os horários estão em diasHorarios
      diasAdministracao: [],
      recorrencia: "unico",
      diasHorarios: [
        {
          data: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3),
          horarios: ["12:00"]
        },
        {
          data: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 10),
          horarios: ["14:00", "18:00"] // Horários diferentes para este dia
        }
      ],
      efeitosColaterais: "Nenhum",
      observacoes: "Suplemento vitamínico",
      saudeRelacionada: "Deficiência de vitamina D",
      foto: null,
      status: "suspenso", // Suspenso porque data início é futura
      administracoes: {}
    },

    // Medicamento com controle de administração
    {
      id: 6,
      dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 20),
      residente: "Beatriz Lima",
      nomeMedicamento: "Metformina",
      dosagem: "850mg",
      dose: "1 comprimido",
      horarios: ["08:00", "13:00", "19:00"],
      diasAdministracao: [1, 2, 3, 4, 5],
      recorrencia: "semanal",
      efeitosColaterais: "Desconforto abdominal",
      observacoes: "Tomar após as refeições",
      saudeRelacionada: "Diabetes tipo 2",
      foto: null,
      status: "ativo",
      administracoes: {
        "25/11/2024": {
          "08:00": "concluido",
          "13:00": "concluido",
          "19:00": "pendente"
        }
      }
    },

    // Medicamento mensal com mesmos horários
    {
      id: 7,
      dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
      residente: "Roberto Santos",
      nomeMedicamento: "AAS",
      dosagem: "100mg",
      dose: "1 comprimido",
      horarios: ["09:00"], // Horários comuns usados em diasHorarios
      diasAdministracao: [],
      recorrencia: "mensal",
      diasHorarios: [
        {
          data: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
          horarios: ["09:00"]
        },
        {
          data: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
          horarios: ["09:00"]
        },
        {
          data: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5),
          horarios: ["09:00"]
        }
      ],
      efeitosColaterais: "Sangramento",
      observacoes: "Prevenção cardiovascular",
      saudeRelacionada: "Problemas cardíacos",
      foto: null,
      status: "ativo",
      administracoes: {}
    },

    // Medicamento único com múltiplos dias e horários
    {
      id: 8,
      dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
      dataFim: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7),
      residente: "Fernanda Costa",
      nomeMedicamento: "Antibiótico",
      dosagem: "500mg",
      dose: "1 comprimido",
      horarios: [], // Vazio pois os horários estão em diasHorarios
      diasAdministracao: [],
      recorrencia: "unico",
      diasHorarios: [
        {
          data: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
          horarios: ["08:00", "20:00"]
        },
        {
          data: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
          horarios: ["08:00", "20:00"]
        },
        {
          data: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3),
          horarios: ["08:00", "14:00", "20:00"] // Horário extra neste dia
        },
        {
          data: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5),
          horarios: ["08:00", "20:00"]
        }
      ],
      efeitosColaterais: "Náusea",
      observacoes: "Completar o tratamento",
      saudeRelacionada: "Infecção respiratória",
      foto: null,
      status: "ativo",
      administracoes: {
        [formatarChaveData(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1))]: {
          "08:00": "concluido",
          "20:00": "concluido"
        }
      }
    }
  ]);

  // ===== ESTADOS DE CONTROLE DA INTERFACE =====
  const [dataAtual, setDataAtual] = useState(new Date());
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [controleAtivo, setControleAtivo] = useState(false);

  const [novoMedicamento, setNovoMedicamento] = useState({
    residente: '',
    nomeMedicamento: '',
    dosagem: '',
    dose: '',
    horarios: [''],
    diasAdministracao: [],
    diasEspecificos: [],
    recorrencia: 'diario',
    efeitosColaterais: '',
    observacoes: '',
    saudeRelacionada: '',
    foto: null,
    dataInicio: new Date().toISOString().split('T')[0],
    dataFim: '',
    status: 'ativo',
    administracoes: {}
  });

  // ESTADOS PARA OS FILTROS
  const [filtroResidente, setFiltroResidente] = useState('todos');
  const [filtroResidenteAberto, setFiltroResidenteAberto] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroStatusAberto, setFiltroStatusAberto] = useState(false);
  const [filtroControle, setFiltroControle] = useState('todos');
  const [filtroControleAberto, setFiltroControleAberto] = useState(false);
  const [filtroDia, setFiltroDia] = useState(null);
  const [filtroDiaAtivo, setFiltroDiaAtivo] = useState(false);

  // OUTROS ESTADOS
  const [infoVisivel, setInfoVisivel] = useState(false);
  const [dropdownStatusAberto, setDropdownStatusAberto] = useState(null);
  const [modoHorarios, setModoHorarios] = useState('diferentes'); // 'diferentes' ou 'mesmos'

  // ===== CONSTANTES E CONFIGURAÇÕES =====
  const DIAS_SEMANA = [
    { id: 0, label: 'Dom' },
    { id: 1, label: 'Seg' },
    { id: 2, label: 'Ter' },
    { id: 3, label: 'Qua' },
    { id: 4, label: 'Qui' },
    { id: 5, label: 'Sex' },
    { id: 6, label: 'Sáb' }
  ];

  const RECORRENCIAS = {
    DIARIO: 'diario',
    SEMANAL: 'semanal',
    MENSAL: 'mensal',
    UNICO: 'unico'
  };

  const ROTULOS_RECORRENCIAS = {
    [RECORRENCIAS.DIARIO]: "Diário",
    [RECORRENCIAS.SEMANAL]: "Semanal",
    [RECORRENCIAS.MENSAL]: "Mensal",
    [RECORRENCIAS.UNICO]: "Único (Dias específicos)"
  };

  const STATUS = {
    ATIVO: 'ativo',
    SUSPENSO: 'suspenso',
    FINALIZADO: 'finalizado'
  };

  const ROTULOS_STATUS = {
    [STATUS.ATIVO]: "Ativos",
    [STATUS.SUSPENSO]: "Suspensos",
    [STATUS.FINALIZADO]: "Finalizados"
  };

  const ROTULOS_STATUS_SINGULAR = {
    [STATUS.ATIVO]: "Ativo",
    [STATUS.SUSPENSO]: "Suspenso",
    [STATUS.FINALIZADO]: "Finalizado"
  };

  const CONTROLES = {
    TODOS: 'todos',
    ADMINISTRADO: 'concluido',
    ATRASADO: 'atrasado',
    PENDENTE: 'pendente'
  };

  const ROTULOS_CONTROLES = {
    [CONTROLES.TODOS]: "Todos",
    [CONTROLES.ADMINISTRADO]: "Concluídos",
    [CONTROLES.ATRASADO]: "Atrasados",
    [CONTROLES.PENDENTE]: "Pendentes"
  };

  const CORES_STATUS = {
    [STATUS.ATIVO]: 'bg-green-500 text-white',
    [STATUS.SUSPENSO]: 'bg-yellow-500 text-white',
    [STATUS.FINALIZADO]: 'bg-gray-500 text-white'
  };

  // ===== FUNÇÕES AUXILIARES =====

  /**
 * Formata uma data para string no formato DD/MM/AAAA
 * @param {Date} data - Data a ser formatada
 * @returns {string} Data formatada
 */
  function formatarChaveData(data) {
    return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
  }

  /**
   * Verifica se uma administração está atrasada
   * @param {Date} data - Data da administração
   * @param {string} horario - Horário no formato HH:MM
   * @returns {boolean} True se estiver atrasado
   */
  const estaAtrasado = (data, horario) => {
    if (!horario) return false;

    const agora = new Date();
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    const dataMedicamento = new Date(data);
    dataMedicamento.setHours(0, 0, 0, 0);

    // Se a data do medicamento for futura, não está atrasado
    if (dataMedicamento > dataAtual) {
      return false;
    }

    // Se for hoje, verifica se passou mais de 10 minutos do horário
    if (dataMedicamento.getTime() === dataAtual.getTime()) {
      const [hora, minuto] = horario.split(':').map(Number);
      const horarioMedicamento = new Date();
      horarioMedicamento.setHours(hora, minuto, 0, 0);

      return (agora - horarioMedicamento) > 10 * 60 * 1000; // 10 minutos de tolerância
    }

    // Se a data for passada, está atrasado
    return dataMedicamento < dataAtual;
  };

  /**
 * Obtém o status de uma administração específica
 * ATUALIZADO: Compatível com todos os tipos de recorrência
 * @param {Object} medicamento - Objeto do medicamento
 * @param {Date} data - Data da administração
 * @param {string} horario - Horário da administração
 * @returns {string} Status da administração
 */
  const getStatusAdministracao = (medicamento, data, horario) => {
    const chaveData = formatarChaveData(data);
    const administracao = medicamento.administracoes?.[chaveData]?.[horario];

    if (administracao === 'concluido') return CONTROLES.ADMINISTRADO;
    if (estaAtrasado(data, horario)) return CONTROLES.ATRASADO;
    return CONTROLES.PENDENTE;
  };

  /**
   * Obtém as classes CSS baseadas no status do medicamento
   * @param {string} status - Status do medicamento
   * @returns {Object} Objeto com classes para background, texto e hover
   */
  const getClassesStatus = (status) => {
    switch (status) {
      case 'ativo':
        return {
          bg: 'bg-green-500',
          text: 'text-white',
          hover: 'hover:bg-green-600',
          border: 'border-green-500'
        };
      case 'suspenso':
        return {
          bg: 'bg-yellow-500',
          text: 'text-white',
          hover: 'hover:bg-yellow-600',
          border: 'border-yellow-500'
        };
      case 'finalizado':
        return {
          bg: 'bg-gray-500',
          text: 'text-white',
          hover: 'hover:bg-gray-600',
          border: 'border-gray-500'
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-white',
          hover: 'hover:bg-gray-600',
          border: 'border-gray-500'
        };
    }
  };

  /**
 * Verifica qual deveria ser o status baseado nas datas (apenas para exibição)
 * @param {Object} medicamento - Objeto do medicamento
 * @returns {string} Status calculado
 */
  const getStatusCalculado = (medicamento) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataInicio = new Date(medicamento.dataInicio);
    dataInicio.setHours(0, 0, 0, 0);

    // Se a data atual é anterior à data de início, status é suspenso
    if (hoje < dataInicio) {
      return 'suspenso';
    }

    // Se existe data de fim e a data atual é posterior, status é finalizado
    if (medicamento.dataFim) {
      const dataFim = new Date(medicamento.dataFim);
      dataFim.setHours(0, 0, 0, 0);
      if (hoje > dataFim) {
        return 'finalizado';
      }
    }

    // Caso contrário, status é ativo
    return 'ativo';
  };

  // ===== FUNÇÕES PARA CALENDÁRIO E FILTROS =====

  /**
 * Verifica se um medicamento deve ser administrado em uma data específica (Filtra por registros suspenso e finalizado)
 * @param {Object} medicamento - Objeto do medicamento
 * @param {Date} data - Data a ser verificada
 * @returns {boolean} True se deve ser administrado na data
 */
  const medicamentoNoDia = (medicamento, data) => {
    // Medicamentos suspensos ou finalizados NUNCA aparecem no calendário
    if (medicamento.status === 'suspenso' || medicamento.status === 'finalizado') {
      return false;
    }

    // Para medicamentos ativos, usa o status calculado como verificação adicional
    const statusCalculado = getStatusCalculado(medicamento);

    // Se o status calculado não for ativo, não aparece
    if (statusCalculado !== 'ativo') {
      return false;
    }

    const dataVerificar = new Date(data);
    dataVerificar.setHours(0, 0, 0, 0);

    const dataInicio = new Date(medicamento.dataInicio);
    dataInicio.setHours(0, 0, 0, 0);

    // Verifica se a data está após a data de início
    if (dataVerificar < dataInicio) {
      return false;
    }

    // Verifica se a data está antes da data de fim (se existir)
    if (medicamento.dataFim) {
      const dataFim = new Date(medicamento.dataFim);
      dataFim.setHours(0, 0, 0, 0);
      if (dataVerificar > dataFim) {
        return false;
      }
    }

    // Lógica de recorrência
    switch (medicamento.recorrencia) {
      case 'diario':
        return true;
      case 'semanal':
        return medicamento.diasAdministracao.includes(dataVerificar.getDay());
      case 'mensal':
      case 'unico':
        if (!medicamento.diasHorarios || medicamento.diasHorarios.length === 0) return false;
        return medicamento.diasHorarios.some(conjunto => {
          const dataConjunto = new Date(conjunto.data);
          dataConjunto.setHours(0, 0, 0, 0);
          return dataConjunto.getTime() === dataVerificar.getTime();
        });
      default:
        return false;
    }
  };

  /**
 * Obtém todos os medicamentos que devem ser administrados em uma data (Filtra por registros suspensos e finalizados)
 * @param {Date} data - Data para verificação
 * @returns {Array} Array de medicamentos do dia
 */
  const obterMedicamentosDoDia = (data) => {
    let medicamentosDoDia = medicamentos.filter(medicamento =>
      // Filtra primeiro por status
      medicamento.status === 'ativo' &&
      // Depois verifica se deve ser administrado na data
      medicamentoNoDia(medicamento, data)
    );

    // Aplica filtro de controle se estiver ativo
    if (controleAtivo && filtroControle !== 'todos') {
      medicamentosDoDia = medicamentosDoDia.filter(medicamento =>
        medicamento.horarios.some(horario =>
          getStatusAdministracao(medicamento, data, horario) === filtroControle
        )
      );
    }

    return medicamentosDoDia;
  };

  /**
 * Obtém os residentes únicos que têm medicamentos em uma data (Considera apenas registros ativos)
 * @param {Date} data - Data para verificação
 * @returns {Array} Array de residentes únicos
 */
  const obterResidentesDoDia = (data) => {
    const medicamentosDoDia = obterMedicamentosDoDia(data);
    return [...new Set(medicamentosDoDia.map(med => med.residente))];
  };

  /**
 * Calcula estatísticas de administração para uma data específica (Considera apenas registros ativos)
 * @param {Date} data - Data para cálculo
 * @returns {Object} Estatísticas do dia
 */
  const getEstatisticasDia = (data) => {
    const medicamentosDoDia = obterMedicamentosDoDia(data);
    let administradas = 0;
    let atrasadas = 0;
    let pendentes = 0;
    let total = 0;

    medicamentosDoDia.forEach(medicamento => {
      let horariosParaData = [];

      if (medicamento.recorrencia === 'mensal' || medicamento.recorrencia === 'unico') {
        // Para mensal e único, pega horários específicos da data
        if (medicamento.diasHorarios) {
          medicamento.diasHorarios.forEach(conjunto => {
            const dataConjunto = new Date(conjunto.data);
            dataConjunto.setHours(0, 0, 0, 0);
            const dataVerificar = new Date(data);
            dataVerificar.setHours(0, 0, 0, 0);

            if (dataConjunto.getTime() === dataVerificar.getTime()) {
              horariosParaData = [...horariosParaData, ...conjunto.horarios];
            }
          });
        }
      } else {
        // Para diário e semanal, usa os horários padrão
        horariosParaData = medicamento.horarios;
      }

      // Contabiliza cada horário
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
 * Determina a cor do calendário baseado nas estatísticas (Considera apenas registros ativos)
 * @param {Date} data - Data para verificação
 * @returns {string|null} Classe CSS da cor ou null
 */
  const getCorCalendario = (data) => {
    const estatisticas = getEstatisticasDia(data);

    if (estatisticas.total === 0) return null;

    // Verifica se há medicamentos após aplicar filtros
    if (controleAtivo && filtroControle !== 'todos') {
      const medicamentosDoDia = obterMedicamentosDoDia(data);
      if (medicamentosDoDia.length === 0) return null;
    }

    // Lógica de cores baseada no status das administrações
    if (!controleAtivo || filtroControle === 'todos') {
      if (estatisticas.atrasadas > 0) return 'bg-red-500';
      if (estatisticas.pendentes > 0) return 'bg-yellow-500';
      return 'bg-green-500';
    }

    // Cores específicas para cada tipo de filtro
    switch (filtroControle) {
      case 'concluido': return 'bg-green-500';
      case 'atrasado': return 'bg-red-500';
      case 'pendente': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  /**
   * Conteúdo customizado para cada dia do calendário
   * @param {Object} param0 - Objeto com date e view
   * @returns {JSX.Element|null} Elemento JSX ou null
   */
  const getTileContent = ({ date, view }) => {
    if (view !== 'month') return null;

    const estatisticasDia = getEstatisticasDia(date);
    const count = estatisticasDia.total; // Conta o total de administrações

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
   * @param {Object} param0 - Objeto com date e view
   * @returns {string} Classes CSS
   */
  const getTileClassName = ({ date, view }) => {
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

    return '!border-1 !border-odara-contorno hover:!bg-odara-white hover:!border-odara-primary !rounded hover:!border-1';
  };

  /**
   * Manipula o clique em um dia do calendário
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
      setFiltroDia(value);
      setFiltroDiaAtivo(true);
    }
  };

  /**
   * Navega para a data atual no calendário
   */
  const irParaHoje = () => {
    const hoje = new Date();
    setDataAtual(hoje);
    setFiltroDia(hoje);
    setFiltroDiaAtivo(true);
  };

  // ===== FUNÇÕES PARA ESTATÍSTICAS MENSAIS =====

  /**
 * Calcula estatísticas completas para o mês (Considera apenas registros ativos)
 * @param {Date} data - Data de referência para o mês
 * @returns {Object} Estatísticas do mês
 */
  const getEstatisticasMes = (data) => {
    const ano = data.getFullYear();
    const mes = data.getMonth();

    // Define primeiro e último dia do mês
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);

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

      // Adiciona medicamentos únicos (por ID) - apenas os ativos que aparecem no dia
      medicamentosDoDia.forEach(med => totalMedicamentos.add(med.id));

      // Adiciona residentes únicos - apenas os que têm medicamentos ativos no dia
      medicamentosDoDia.forEach(med => totalResidentes.add(med.residente));

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
   * Formata data para exibição na legenda
   * @param {Date} data - Data a ser formatada
   * @returns {string} Data formatada
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
      setFiltroControle('todos');
    }
  };

  /**
   * Atualiza o status de uma administração específica
   * @param {number} medicamentoId - ID do medicamento
   * @param {Date} data - Data da administração
   * @param {string} horario - Horário da administração
   * @param {string} status - Novo status
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

  // Configurações visuais para cada status de administração
  const configs = {
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

  /**
 * Calcula estatísticas de um medicamento específico em um dia
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
    const horariosParaData = (medicamento.recorrencia === 'mensal' || medicamento.recorrencia === 'unico') && medicamento.diasHorarios
      ? medicamento.diasHorarios
        .filter(conjunto => {
          const dataConjunto = new Date(conjunto.data);
          dataConjunto.setHours(0, 0, 0, 0);
          const dataVerificar = new Date(data);
          dataVerificar.setHours(0, 0, 0, 0);
          return dataConjunto.getTime() === dataVerificar.getTime();
        })
        .flatMap(conjunto => conjunto.horarios)
      : medicamento.horarios;

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
      recorrencia: 'diario',
      efeitosColaterais: '',
      observacoes: '',
      saudeRelacionada: '',
      foto: null,
      dataInicio: new Date().toISOString().split('T')[0],
      dataFim: '',
      status: 'ativo',
      administracoes: {}
    });
    // Reseta os diasHorarios e modo
    setDiasHorarios([{ data: '', horarios: [''] }]);
    setModoHorarios('diferentes');
    setEditando(false);
    setIdEditando(null);
    setModalAberto(true);
  };

  /**
 * Abre o modal para editar medicamento existente
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

      // NOVO: Carrega diasHorarios existentes para edição
      if (medicamentoParaEditar.diasHorarios && medicamentoParaEditar.diasHorarios.length > 0) {
        const diasHorariosParaEditar = medicamentoParaEditar.diasHorarios.map(conjunto => ({
          data: new Date(conjunto.data).toISOString().split('T')[0],
          horarios: [...conjunto.horarios]
        }));
        setDiasHorarios(diasHorariosParaEditar);
      } else {
        setDiasHorarios([{ data: '', horarios: [''] }]);
      }

      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  /**
   * Adiciona um novo campo de horário
   */
  const adicionarHorario = () => {
    setNovoMedicamento({
      ...novoMedicamento,
      horarios: [...novoMedicamento.horarios, '']
    });
  };

  /**
   * Remove um campo de horário
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
   * Atualiza um horário específico
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

  /**
   * Adiciona um novo campo de dia específico
   */
  const adicionarDiaEspecifico = () => {
    setNovoMedicamento({
      ...novoMedicamento,
      diasEspecificos: [...novoMedicamento.diasEspecificos, '']
    });
  };

  /**
   * Remove um campo de dia específico
   * @param {number} index - Índice do dia a remover
   */
  const removerDiaEspecifico = (index) => {
    const novosDias = novoMedicamento.diasEspecificos.filter((_, i) => i !== index);
    setNovoMedicamento({
      ...novoMedicamento,
      diasEspecificos: novosDias
    });
  };

  /**
   * Atualiza um dia específico
   * @param {number} index - Índice do dia
   * @param {string} valor - Novo valor do dia
   */
  const atualizarDiaEspecifico = (index, valor) => {
    const novosDias = [...novoMedicamento.diasEspecificos];
    novosDias[index] = valor;
    setNovoMedicamento({
      ...novoMedicamento,
      diasEspecificos: novosDias
    });
  };

  /**
   * Manipula o upload de arquivo de imagem
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
   * Estrutura para dias e horários combinados
   */
  const [diasHorarios, setDiasHorarios] = useState([{ data: '', horarios: [''] }]);

  /**
   * Adiciona um novo conjunto de dia + horários
   */
  const adicionarDiaHorario = () => {
    setDiasHorarios([...diasHorarios, { data: '', horarios: [''] }]);
  };

  /**
   * Remove um conjunto de dia + horários
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
   * @param {number} index - Índice do conjunto
   * @param {string} data - Nova data
   */
  const atualizarDataDiaHorario = (index, data) => {
    const novosDiasHorarios = [...diasHorarios];
    novosDiasHorarios[index].data = data;
    setDiasHorarios(novosDiasHorarios);
  };

  /**
   * Adiciona um horário a um conjunto específico
   * @param {number} indexConjunto - Índice do conjunto
   */
  const adicionarHorarioAoConjunto = (indexConjunto) => {
    const novosDiasHorarios = [...diasHorarios];
    novosDiasHorarios[indexConjunto].horarios.push('');
    setDiasHorarios(novosDiasHorarios);
  };

  /**
   * Remove um horário de um conjunto específico
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
   * @param {number} indexConjunto - Índice do conjunto
   * @param {number} indexHorario - Índice do horário
   * @param {string} horario - Novo horário
   */
  const atualizarHorarioNoConjunto = (indexConjunto, indexHorario, horario) => {
    const novosDiasHorarios = [...diasHorarios];
    novosDiasHorarios[indexConjunto].horarios[indexHorario] = horario;
    setDiasHorarios(novosDiasHorarios);
  };

  /**
 * Salva o medicamento (novo ou editado)
 * ATUALIZADO: Usa status automático baseado nas datas
 */
  const salvarMedicamento = () => {
    // Validação básica
    if (!novoMedicamento.residente || !novoMedicamento.nomeMedicamento) return;

    // Converte datas string para objetos Date
    const partesDataInicio = novoMedicamento.dataInicio.split('-');
    const dataInicio = new Date(partesDataInicio[0], partesDataInicio[1] - 1, partesDataInicio[2]);

    const dataFim = novoMedicamento.dataFim ? new Date(novoMedicamento.dataFim) : null;

    // Processa dias e horários para recorrencia 'mensal' e 'unico'
    let diasHorariosProcessados = [];
    if (novoMedicamento.recorrencia === 'mensal' || novoMedicamento.recorrencia === 'unico') {
      if (modoHorarios === 'diferentes') {
        diasHorariosProcessados = diasHorarios
          .filter(conjunto => conjunto.data !== '')
          .map(conjunto => ({
            data: new Date(conjunto.data),
            horarios: conjunto.horarios.filter(horario => horario !== '')
          }));
      } else {
        const horariosComuns = novoMedicamento.horarios.filter(h => h !== '');
        diasHorariosProcessados = diasHorarios
          .filter(conjunto => conjunto.data !== '')
          .map(conjunto => ({
            data: new Date(conjunto.data),
            horarios: [...horariosComuns]
          }));
      }
    }

    // Determina status automaticamente baseado nas datas
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataInicioNormalizada = new Date(dataInicio);
    dataInicioNormalizada.setHours(0, 0, 0, 0);

    let statusAutomatico = 'ativo';
    if (hoje < dataInicioNormalizada) {
      statusAutomatico = 'suspenso';
    } else if (dataFim) {
      const dataFimNormalizada = new Date(dataFim);
      dataFimNormalizada.setHours(0, 0, 0, 0);
      if (hoje > dataFimNormalizada) {
        statusAutomatico = 'finalizado';
      }
    }

    // Cria objeto final do medicamento
    const medicamentoObj = {
      ...novoMedicamento,
      dataInicio,
      dataFim,
      diasEspecificos: [],
      diasHorarios: diasHorariosProcessados,
      horarios: novoMedicamento.recorrencia === 'mensal' || novoMedicamento.recorrencia === 'unico'
        ? []
        : novoMedicamento.horarios.filter(h => h !== ''),
      administracoes: novoMedicamento.administracoes || {},
      status: statusAutomatico // Status definido automaticamente
    };

    // Atualiza estado
    if (editando && idEditando) {
      setMedicamentos(anterior => anterior.map(med =>
        med.id === idEditando ? medicamentoObj : med
      ));
    } else {
      setMedicamentos(anterior => [...anterior, {
        ...medicamentoObj,
        id: Date.now()
      }]);
    }

    setDiasHorarios([{ data: '', horarios: [''] }]);
    setModalAberto(false);
  };

  /**
   * Exclui um medicamento
   * @param {number} id - ID do medicamento a excluir
   */
  const excluirMedicamento = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este medicamento?')) {
      setMedicamentos(anterior => anterior.filter(med => med.id !== id));
    }
  };

  /**
   * Abre/fecha o dropdown de status de um medicamento específico
   * @param {number} medicamentoId - ID do medicamento
   */
  const toggleDropdownStatus = (medicamentoId) => {
    setDropdownStatusAberto(dropdownStatusAberto === medicamentoId ? null : medicamentoId);
  };

  /**
  * Altera o status de um medicamento manualmente com lógica automática
  * @param {number} id - ID do medicamento
  * @param {string} novoStatus - Novo status
  */
  const alterarStatus = (id, novoStatus) => {
    setMedicamentos(anterior => anterior.map(med => {
      if (med.id === id) {
        const hoje = new Date();

        let atualizacao = { ...med, status: novoStatus };

        // Lógica para cada tipo de alteração manual
        if (novoStatus === 'finalizado') {
          // Finalização manual: define data de fim como hoje
          atualizacao.dataFim = hoje;
        }
        else if (novoStatus === 'suspenso') {
          // Suspensão manual: remove data de fim para "congelar"
          atualizacao.dataFim = null;
        }
        else if (novoStatus === 'ativo') {
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

  // ===== EFEITOS ===== 

  // Efeito para sincronização automática contínua dos status
  useEffect(() => {
    const interval = setInterval(() => {
      setMedicamentos(anterior => anterior.map(medicamento => {
        const statusCalculado = getStatusCalculado(medicamento);

        // Só atualiza se o status calculado for diferente do atual
        // Isso mantém as alterações manuais do usuário
        if (statusCalculado !== medicamento.status) {
          let atualizacao = { ...medicamento, status: statusCalculado };

          // Se está finalizando automaticamente por data, define data de fim se não existir
          if (statusCalculado === 'finalizado' && !medicamento.dataFim) {
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            atualizacao.dataFim = hoje;
          }

          return atualizacao;
        }

        return medicamento;
      }));
    }, 30000); // Verifica a cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  // Efeito para sincronizar calendário com mudanças na lista de medicamentos
  useEffect(() => {
    const hoje = new Date();
    setDataAtual(new Date(hoje));
  }, [medicamentos]);

  // Fecha dropdowns ao clicar fora deles
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container') && !event.target.closest('.status-dropdown-container')) {
        setFiltroResidenteAberto(false);
        setFiltroStatusAberto(false);
        setFiltroControleAberto(false);
        setDropdownStatusAberto(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ===== FILTROS =====

  /**
   * Aplica todos os filtros ativos aos medicamentos
   * ATUALIZADO: Ordenação por data de início e depois por residente
   */
  const medicamentosFiltrados = medicamentos
    .filter(medicamento => {
      // Filtro por residente
      const passaFiltroResidente = filtroResidente === 'todos' || medicamento.residente === filtroResidente;

      // Filtro por status
      const passaFiltroStatus = filtroStatus === 'todos' || medicamento.status === filtroStatus;

      // Filtro por dia específico
      let passaFiltroDia = true;
      if (filtroDiaAtivo) {
        passaFiltroDia = medicamentoNoDia(medicamento, filtroDia);
      }

      // Filtro por status de controle
      let passaFiltroControle = true;
      if (controleAtivo && filtroControle !== 'todos' && filtroDia) {
        if (medicamentoNoDia(medicamento, filtroDia)) {
          const temAdministracaoNoDia = medicamento.horarios.some(horario => {
            const status = getStatusAdministracao(medicamento, filtroDia, horario);
            return status === filtroControle;
          });
          passaFiltroControle = temAdministracaoNoDia;
        } else {
          passaFiltroControle = false;
        }
      }

      // Combina todos os filtros
      return passaFiltroResidente && passaFiltroStatus && passaFiltroDia && passaFiltroControle;
    })
    // NOVO: Ordenação por data de início (crescente) e depois por residente (alfabética)
    .sort((a, b) => {
      // Ordena por data de início
      const dataA = new Date(a.dataInicio);
      const dataB = new Date(b.dataInicio);

      if (dataA.getTime() !== dataB.getTime()) {
        return dataA.getTime() - dataB.getTime(); // Ordem crescente
      }

      // Se as datas forem iguais, ordena por residente (ordem alfabética)
      return a.residente.localeCompare(b.residente);
    });

  // ===== RENDERIZAÇÃO =====
  // (MANTIDA EXATAMENTE COMO ESTAVA, APENAS ATUALIZANDO A PARTE DO MODAL)

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Cabeçalho da página */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center">
            <div className="flex items-center mb-1">
              <Link
                to="/gestao/PaginaRegistros"
                className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 flex items-center"
              >
                <FaArrowLeft className="mr-1" />
              </Link>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-odara-dark mr-2">Registro de Medicamentos</h1>

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

        {/* Botão Adicionar */}
        <div className="relative flex items-center gap-4 mb-6">
          <button
            onClick={abrirModalAdicionar}
            className="bg-odara-accent hover:bg-odara-secondary text-odara-white font-semibold py-2 px-4 rounded-lg flex items-center transition duration-200 text-sm sm:text-base"
          >
            <FaPlus className="mr-2 text-odara-white" /> Novo Medicamento
          </button>
        </div>

        {/* Barra de Filtros - Responsiva */}
        <div className="relative flex flex-wrap items-center gap-2 sm:gap-4 mb-6">
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
                setFiltroControleAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Residentes
            </button>

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
                      : '!border-1 !border-odara-contorno !rounded'}
                  `}
                >
                  Todos
                </button>

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
                        : '!border-1 !border-odara-contorno !rounded'}
                    `}
                  >
                    {residente}
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
                setFiltroControleAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Status
            </button>

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
                      : '!border-1 !border-odara-contorno !rounded'}
                  `}
                >
                  Todos
                </button>

                <button
                  onClick={() => {
                    setFiltroStatus('ativo');
                    setFiltroStatusAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                    ${filtroStatus === 'ativo'
                      ? 'bg-odara-accent/20 font-semibold'
                      : '!border-1 !border-odara-contorno !rounded'}
                  `}
                >
                  Ativos
                </button>

                <button
                  onClick={() => {
                    setFiltroStatus('suspenso');
                    setFiltroStatusAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                    ${filtroStatus === 'suspenso'
                      ? 'bg-odara-accent/20 font-semibold'
                      : '!border-1 !border-odara-contorno !rounded'}
                  `}
                >
                  Suspensos
                </button>

                <button
                  onClick={() => {
                    setFiltroStatus('finalizado');
                    setFiltroStatusAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 
                    ${filtroStatus === 'finalizado'
                      ? 'bg-odara-accent/20 font-semibold'
                      : '!border-1 !border-odara-contorno !rounded'}
                  `}
                >
                  Finalizados
                </button>
              </div>
            )}
          </div>

          {/* Filtro de Controle (apenas quando controle está ativo) */}
          {controleAtivo && (
            <div className="relative dropdown-container">
              <button
                className={`flex items-center bg-white rounded-full px-3 py-2 shadow-sm border-2 
                  ${filtroControleAberto
                    ? 'border-odara-primary text-gray-700'
                    : 'border-odara-primary/40 text-gray-700'} 
                font-medium hover:border-2 hover:border-odara-primary transition text-sm`}
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
                          : '!border-1 !border-odara-contorno !rounded'}
                    `}
                    >
                      {rotulo}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Botão Limpar Todos os Filtros */}
          {(filtroDiaAtivo || filtroResidente !== 'todos' || filtroStatus !== 'todos' || (controleAtivo && filtroControle !== 'todos')) && (
            <button
              onClick={() => {
                setFiltroDiaAtivo(false);
                setFiltroDia(null);
                setFiltroResidente('todos');
                setFiltroStatus('todos');
                if (controleAtivo) {
                  setFiltroControle('todos');
                }
              }}
              className="flex items-center bg-odara-accent text-odara-white rounded-full px-3 py-2 shadow-sm font-medium hover:bg-odara-secondary transition text-sm"
            >
              <FaTimes className="mr-1" /> Limpar Filtros
            </button>
          )}
        </div>

        {/* Grid principal com medicamentos e calendário - Responsivo */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Seção de Medicamentos */}
          <div className="bg-odara-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-4 sm:p-6 order-2 xl:order-1">
            {/* Título e contador */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-center sm:text-left">
              <h2 className="text-xl lg:text-2xl font-bold text-odara-dark">
                {filtroStatus === 'todos' ? 'Todos os Medicamentos' : `Medicamentos ${ROTULOS_STATUS[filtroStatus]}`}
                {controleAtivo && filtroControle !== 'todos' && ` (${ROTULOS_CONTROLES[filtroControle]})`}
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
              {controleAtivo && filtroControle !== 'todos' && (
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
              {medicamentosFiltrados.length === 0 ? (
                <div className="p-6 rounded-xl bg-odara-name/10 text-center">
                  <p className="text-odara-dark/60">
                    {controleAtivo && !filtroDia
                      ? 'Selecione um dia para ver os medicamentos'
                      : controleAtivo && filtroControle !== 'todos'
                        ? `Nenhum medicamento ${ROTULOS_CONTROLES[filtroControle].toLowerCase()} encontrado`
                        : 'Nenhum medicamento encontrado'
                    }
                  </p>
                </div>
              ) : (
                medicamentosFiltrados.map(medicamento => (
                  <div
                    key={medicamento.id}
                    className="bg-white rounded-lg shadow-md border border-gray-200"
                  >
                    {/* HEADER - Data de início e status */}
                    <div className={`flex items-center justify-between p-3 rounded-t-lg 
                      ${medicamento.status === 'ativo'
                        ? 'bg-green-50 border-b border-green-200'
                        : medicamento.status === 'suspenso'
                          ? 'bg-yellow-50 border-b border-yellow-200'
                          : 'bg-gray-50 border-b border-gray-200'
                      }`
                    }>

                      {/* Lado esquerdo: data de início */}
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${medicamento.status === 'ativo'
                          ? 'bg-green-500'
                          : medicamento.status === 'suspenso'
                            ? 'bg-yellow-500'
                            : 'bg-gray-500'
                          }`}></div>
                        <p className="text-sm sm:text-base text-odara-dark">
                          <span className='font-semibold'>
                            Início: {medicamento.dataInicio.getDate().toString().padStart(2, '0')}/
                            {(medicamento.dataInicio.getMonth() + 1).toString().padStart(2, '0')}/
                            {medicamento.dataInicio.getFullYear()}
                          </span>
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
                          {getStatusCalculado(medicamento) !== medicamento.status && (
                            <span className="text-yellow-600 ml-2 text-xs">(Ajustado manualmente)</span>
                          )}
                        </p>
                      </div>

                      {/* Lado direito: dropdown de status personalizado */}
                      <div className="flex items-center gap-3 status-dropdown-container">
                        <div className="relative">
                          {/* Botão do dropdown */}
                          <button
                            onClick={() => toggleDropdownStatus(medicamento.id)}
                            className={`flex items-center rounded-lg px-3 py-1 border-2 font-medium transition-colors duration-200 text-sm min-w-[100px] justify-center 
                              ${medicamento.status === 'ativo'
                                ? 'bg-green-500 text-white border-green-500 hover:bg-green-600'
                                : medicamento.status === 'suspenso'
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
                                    } first:rounded-t-lg last:rounded-b-lg`}
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
                    < div className="p-4" >
                      <h6 className="text-lg sm:text-xl font-bold mb-3 text-odara-dark">{medicamento.nomeMedicamento}</h6>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-sm">
                        <div className="space-y-2">
                          <div>
                            <strong className="text-odara-dark">Dosagem:</strong>
                            <span className="text-odara-name ml-1">{medicamento.dosagem}</span>
                          </div>
                          <div>
                            <strong className="text-odara-dark">Dose:</strong>
                            <span className="text-odara-name ml-1">{medicamento.dose}</span>
                          </div>

                          {medicamento.efeitosColaterais && (
                            <div>
                              <strong className="text-odara-dark">Efeitos colaterais:</strong>
                              <span className="text-odara-name ml-1">{medicamento.efeitosColaterais}</span>
                            </div>
                          )}

                          {medicamento.saudeRelacionada && (
                            <div>
                              <strong className="text-odara-dark">Saúde relacionada:</strong>
                              <span className="text-odara-name ml-1">{medicamento.saudeRelacionada}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2"><div>
                          <strong className="text-odara-dark">Horários:</strong>
                          <span className="text-odara-name ml-1">
                            {(medicamento.recorrencia === 'mensal' || medicamento.recorrencia === 'unico') && medicamento.diasHorarios
                              ? medicamento.diasHorarios.map(conjunto =>
                                `${new Date(conjunto.data).toLocaleDateString('pt-BR')}: ${conjunto.horarios.join(', ')}`
                              ).join(' • ')
                              : medicamento.horarios.join(', ')
                            }
                          </span>
                        </div>
                          <div>
                            <strong className="text-odara-dark">Recorrência:</strong>
                            <span className="text-odara-name ml-1">{ROTULOS_RECORRENCIAS[medicamento.recorrencia]}</span>
                          </div>

                          {medicamento.observacoes && (
                            <div>
                              <strong className="text-odara-dark">Observações:</strong>
                              <span className="text-odara-name ml-1">{medicamento.observacoes}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Controle de administração */}
                      {controleAtivo && filtroDia && medicamentoNoDia(medicamento, filtroDia) && (
                        <div className="mt-6 mb-3 p-4 bg-odara-white rounded-lg border border-odara-primary mx-auto w-full md:w-4/5 lg:w-3/5 xl:w-2/5">
                          <div className="flex items-center justify-center mb-3">
                            <h4 className="text-odara-primary text-center text-sm sm:text-base">
                              <span className='font-semibold'>Controle para: </span>
                              {formatarChaveData(filtroDia)}
                            </h4>
                          </div>

                          <div className="space-y-3">
                            {// ATUALIZADO: Obtém horários corretos baseados no tipo de recorrência
                              ((medicamento.recorrencia === 'mensal' || medicamento.recorrencia === 'unico') && medicamento.diasHorarios
                                ? medicamento.diasHorarios
                                  .filter(conjunto => {
                                    const dataConjunto = new Date(conjunto.data);
                                    dataConjunto.setHours(0, 0, 0, 0);
                                    const dataFiltro = new Date(filtroDia);
                                    dataFiltro.setHours(0, 0, 0, 0);
                                    return dataConjunto.getTime() === dataFiltro.getTime();
                                  })
                                  .flatMap(conjunto => conjunto.horarios)
                                : medicamento.horarios
                              ).map(horario => {
                                const status = getStatusAdministracao(medicamento, filtroDia, horario);
                                const config = configs[status];
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
                              <span>Total: {medicamento.horarios.length}</span>
                              <span className={`${getEstatisticasMedicamentoDia(medicamento, filtroDia).administradas === medicamento.horarios.length ? 'text-green-500' : 'text-gray-500'}`}>
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
                        <div className="flex items-center text-sm flex-wrap gap-1">
                          <span className="bg-odara-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                            {medicamento.residente}
                          </span>

                          {medicamento.recorrencia !== 'unico' && medicamento.diasAdministracao.length > 0 && (
                            <>
                              <span className="text-odara-name hidden sm:inline">
                                {' • '}
                                Dias: {medicamento.diasAdministracao.map(dia => DIAS_SEMANA.find(d => d.id === dia)?.label).join(', ')}
                              </span>
                              <span className="text-odara-name sm:hidden text-xs">
                                Dias: {medicamento.diasAdministracao.map(dia => DIAS_SEMANA.find(d => d.id === dia)?.label).join(', ')}
                              </span>
                            </>
                          )}

                          {medicamento.recorrencia === 'unico' && medicamento.diasEspecificos && medicamento.diasEspecificos.length > 0 && (
                            <>
                              <span className="text-odara-name">
                                {' • '}
                                Dias específicos: {medicamento.diasEspecificos.length} dia(s)
                              </span>
                            </>
                          )}
                        </div>

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

          {/* Seção do Calendário */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 h-fit sticky top-6 order-1 xl:order-2">
            <div className="flex justify-center mb-5">
              <button
                onClick={irParaHoje}
                className="bg-odara-accent hover:bg-odara-secondary text-odara-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
              >
                Hoje
              </button>
            </div>

            {/* Calendário */}
            <div className="flex justify-center border-2 border-odara-primary rounded-xl shadow-sm overflow-hidden max-w-2/3 mx-auto">
              <Calendar
                value={dataAtual}
                onChange={setDataAtual}
                onClickDay={handleDayClick}
                tileClassName={getTileClassName}
                tileContent={getTileContent}
                locale="pt-BR"
                className="border-0 !w-full"
              />
            </div>

            {/* Legenda de Estatísticas */}
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
                        <span className="font-semibold">{getEstatisticasMes(dataAtual).totalMedicamentos}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Residentes para medicar: </span>
                        <span className="font-semibold">{getEstatisticasMes(dataAtual).totalResidentes}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Administrações totais: </span>
                        <span className="font-semibold">{getEstatisticasMes(dataAtual).totalAdministracoes}</span>
                      </div>

                      <div className="flex justify-between gap-1 mt-2">
                        <div className="flex-1 border-1 border-green-500 text-green-500 font-semibold px-1 py-0.5 rounded text-center text-xs">
                          {getEstatisticasMes(dataAtual).administradas}
                        </div>

                        <div className="flex-1 border-1 border-yellow-500 text-yellow-500 font-semibold px-1 py-0.5 rounded text-center text-xs">
                          {getEstatisticasMes(dataAtual).pendentes}
                        </div>

                        <div className="flex-1 border-1 border-red-500 text-red-500 font-semibold px-1 py-0.5 rounded text-center text-xs">
                          {getEstatisticasMes(dataAtual).atrasadas}
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

        {/* Modal para adicionar/editar medicamento */}
        {/* ATUALIZADO: Interface dinâmica baseada no tipo de recorrência */}
        {
          modalAberto && (
            <div className="fixed inset-0 bg-odara-offwhite/80 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-4 sm:p-6 border-l-4 border-odara-primary max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-odara-accent">
                    {editando ? 'Editar' : 'Adicionar'} Medicamento
                  </h2>

                  <button
                    onClick={() => setModalAberto(false)}
                    className="text-odara-primary hover:text-odara-secondary transition-colors duration-200"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="space-y-4">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-odara-dark font-medium mb-2">Data de Início</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                        value={novoMedicamento.dataInicio}
                        onChange={(e) => setNovoMedicamento({ ...novoMedicamento, dataInicio: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-odara-dark font-medium mb-2">Data de Término (opcional)</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                        value={novoMedicamento.dataFim}
                        onChange={(e) => setNovoMedicamento({ ...novoMedicamento, dataFim: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Recorrência</label>
                    <select
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary text-sm sm:text-base"
                      value={novoMedicamento.recorrencia}
                      onChange={(e) => setNovoMedicamento({
                        ...novoMedicamento,
                        recorrencia: e.target.value,
                        diasAdministracao: [],
                        diasEspecificos: []
                      })}
                    >
                      {Object.entries(ROTULOS_RECORRENCIAS).map(([chave, rotulo]) => (
                        <option key={chave} value={chave}>{rotulo}</option>
                      ))}
                    </select>
                  </div>

                  {/* Interface dinâmica baseada no tipo de recorrência */}
                  {/* Diário: Apenas horários (sem dias da semana) */}
                  {novoMedicamento.recorrencia === 'diario' && (
                    <div className="p-3 mb-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-700">
                        <strong>Recorrência Diária:</strong> O medicamento será administrado todos os dias nos horários definidos abaixo.
                      </p>
                    </div>
                  )}

                  {/* Semanal: Dias da semana + horários */}
                  {novoMedicamento.recorrencia === 'semanal' && (
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
                                }`}
                            >
                              {dia.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Mensal: Conjuntos de dia + horários */}
                  {novoMedicamento.recorrencia === 'mensal' && (
                    <div>
                      <div className="p-3 mb-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-700">
                          <strong>Recorrência Mensal:</strong> O medicamento será administrado nos dias específicos do mês definidos abaixo.
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
                          <label className="block text-odara-dark font-medium mb-2">Dias e Horários Mensais *</label>
                          <p className="text-sm text-odara-name mb-3">Adicione os dias específicos do mês e seus horários correspondentes</p>

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

                  {/* Único: Conjuntos de dia + horários */}
                  {novoMedicamento.recorrencia === 'unico' && (
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
                  {(novoMedicamento.recorrencia === 'diario' || novoMedicamento.recorrencia === 'semanal') && (
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
          )
        }
      </div >
    </div >
  );
};

export default RegistroMedicamentos;