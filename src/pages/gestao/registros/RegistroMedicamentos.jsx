import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaTimes, FaArrowLeft, FaChevronLeft, FaChevronRight, FaCamera, FaCheck, FaClock, FaQuestion } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const RegistroMedicamentos = () => {
  // ===== ESTADOS DO COMPONENTE =====
  const [medicamentos, setMedicamentos] = useState([
    {
      id: 1,
      dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      residente: "João Santos",
      nomeMedicamento: "Losartana",
      dosagem: "50mg",
      dose: "1 comprimido",
      horarios: ["08:00", "20:00"],
      diasAdministracao: [1, 3, 5],
      recorrencia: "diario",
      efeitosColaterais: "Tontura, hipotensão",
      observacoes: "Tomar antes das refeições",
      saudeRelacionada: "Hipertensão arterial",
      foto: null,
      status: "ativo",
      administracoes: {}
    },
    {
      id: 2,
      dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
      residente: "Maria Oliveira",
      nomeMedicamento: "Sinvastatina",
      dosagem: "20mg",
      dose: "1 comprimido",
      horarios: ["22:00"],
      diasAdministracao: [0, 1, 2, 3, 4, 5, 6],
      recorrencia: "diario",
      efeitosColaterais: "Dores musculares",
      observacoes: "Tomar à noite",
      saudeRelacionada: "Colesterol alto",
      foto: null,
      status: "ativo",
      administracoes: {}
    }
  ]);

  // Estados para controle da interface
  const [dataAtual, setDataAtual] = useState(new Date());
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [controleAtivo, setControleAtivo] = useState(false);
  const [filtroControle, setFiltroControle] = useState('todos');

  // Estado para novo medicamento
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

  // Estados para filtros
  const [filtroResidente, setFiltroResidente] = useState('todos');
  const [filtroResidenteAberto, setFiltroResidenteAberto] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroStatusAberto, setFiltroStatusAberto] = useState(false);
  const [filtroControleAberto, setFiltroControleAberto] = useState(false);
  const [infoVisivel, setInfoVisivel] = useState(false);
  const [filtroDia, setFiltroDia] = useState(null);
  const [filtroDiaAtivo, setFiltroDiaAtivo] = useState(false);

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
    [STATUS.ATIVO]: "Ativo",
    [STATUS.SUSPENSO]: "Suspenso", 
    [STATUS.FINALIZADO]: "Finalizado"
  };

  const CONTROLES = {
    TODOS: 'todos',
    ADMINISTRADO: 'administrado',
    ATRASADO: 'atrasado',
    PENDENTE: 'pendente'
  };

  const ROTULOS_CONTROLES = {
    [CONTROLES.TODOS]: "Todos",
    [CONTROLES.ADMINISTRADO]: "Administrado",
    [CONTROLES.ATRASADO]: "Atrasado",
    [CONTROLES.PENDENTE]: "Pendente"
  };

  // Cores para status
  const CORES_STATUS = {
    [STATUS.ATIVO]: 'bg-green-500 text-white',
    [STATUS.SUSPENSO]: 'bg-yellow-500 text-white',
    [STATUS.FINALIZADO]: 'bg-gray-500 text-white'
  };

  // ===== FUNÇÕES AUXILIARES =====
  const formatarChaveData = (data) => {
    return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
  };

  const estaAtrasado = (data, horario) => {
    if (!horario) return false;
    
    const agora = new Date();
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);
    
    const dataMedicamento = new Date(data);
    dataMedicamento.setHours(0, 0, 0, 0);
    
    if (dataMedicamento > dataAtual) {
      return false;
    }
    
    if (dataMedicamento.getTime() === dataAtual.getTime()) {
      const [hora, minuto] = horario.split(':').map(Number);
      const horarioMedicamento = new Date();
      horarioMedicamento.setHours(hora, minuto, 0, 0);
      
      return (agora - horarioMedicamento) > 10 * 60 * 1000;
    }
    
    return dataMedicamento < dataAtual;
  };

  const getStatusAdministracao = (medicamento, data, horario) => {
    const chaveData = formatarChaveData(data);
    const administracao = medicamento.administracoes?.[chaveData]?.[horario];
    
    if (administracao === 'administrado') return CONTROLES.ADMINISTRADO;
    if (estaAtrasado(data, horario)) return CONTROLES.ATRASADO;
    return CONTROLES.PENDENTE;
  };

  // ===== FUNÇÕES PARA CALENDÁRIO E FILTROS =====
  const medicamentoNoDia = (medicamento, data) => {
    if (medicamento.status !== 'ativo') {
      return false;
    }

    const dataVerificar = new Date(data);
    dataVerificar.setHours(0, 0, 0, 0);

    const dataInicio = new Date(medicamento.dataInicio);
    dataInicio.setHours(0, 0, 0, 0);
    if (dataVerificar < dataInicio) {
      return false;
    }

    if (medicamento.dataFim) {
      const dataFim = new Date(medicamento.dataFim);
      dataFim.setHours(0, 0, 0, 0);
      if (dataVerificar > dataFim) {
        return false;
      }
    }

    switch(medicamento.recorrencia) {
      case 'diario':
        return medicamento.diasAdministracao.includes(dataVerificar.getDay());
      case 'semanal':
        return medicamento.diasAdministracao.includes(dataVerificar.getDay());
      case 'mensal':
        return dataVerificar.getDate() === dataInicio.getDate();
      case 'unico':
        if (!medicamento.diasEspecificos) return false;
        return medicamento.diasEspecificos.some(dataEspecifica => {
          const dataEsp = new Date(dataEspecifica);
          dataEsp.setHours(0, 0, 0, 0);
          return dataEsp.getTime() === dataVerificar.getTime();
        });
      default:
        return false;
    }
  };

  const obterMedicamentosDoDia = (data) => {
    let medicamentosDoDia = medicamentos.filter(medicamento => medicamentoNoDia(medicamento, data));
    
    if (controleAtivo && filtroControle !== 'todos') {
      medicamentosDoDia = medicamentosDoDia.filter(medicamento =>
        medicamento.horarios.some(horario => 
          getStatusAdministracao(medicamento, data, horario) === filtroControle
        )
      );
    }
    
    return medicamentosDoDia;
  };

  const obterResidentesDoDia = (data) => {
    const medicamentosDoDia = obterMedicamentosDoDia(data);
    return [...new Set(medicamentosDoDia.map(med => med.residente))];
  };

  const getEstatisticasDia = (data) => {
    const medicamentosDoDia = obterMedicamentosDoDia(data);
    let administradas = 0;
    let atrasadas = 0;
    let pendentes = 0;
    let total = 0;

    medicamentosDoDia.forEach(medicamento => {
      medicamento.horarios.forEach(horario => {
        const status = getStatusAdministracao(medicamento, data, horario);
        total++;
        if (status === CONTROLES.ADMINISTRADO) administradas++;
        else if (status === CONTROLES.ATRASADO) atrasadas++;
        else pendentes++;
      });
    });

    return { administradas, atrasadas, pendentes, total };
  };

  const getCorCalendario = (data) => {
    const estatisticas = getEstatisticasDia(data);
    
    if (estatisticas.total === 0) return null;

    if (controleAtivo && filtroControle !== 'todos') {
      const medicamentosDoDia = obterMedicamentosDoDia(data);
      if (medicamentosDoDia.length === 0) return null;
    }

    if (!controleAtivo || filtroControle === 'todos') {
      if (estatisticas.atrasadas > 0) return 'bg-red-500';
      if (estatisticas.pendentes > 0) return 'bg-yellow-500';
      return 'bg-green-500';
    }

    switch(filtroControle) {
      case 'administrado': return 'bg-green-500';
      case 'atrasado': return 'bg-red-500';
      case 'pendente': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getTileContent = ({ date, view }) => {
    if (view !== 'month') return null;

    const medicamentosDoDia = obterMedicamentosDoDia(date);
    const count = medicamentosDoDia.length;
    
    if (count > 0) {
      const cor = getCorCalendario(date);
      return (
        <div className="mt-1 flex justify-center">
          <div className={`w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center ${cor}`}>
            {count}
          </div>
        </div>
      );
    }
    
    return null;
  };

  const getTileClassName = ({ date, view }) => {
    let classes = [];

    const hoje = new Date();
    if (date.getDate() === hoje.getDate() &&
      date.getMonth() === hoje.getMonth() &&
      date.getFullYear() === hoje.getFullYear()) {
      classes.push('!bg-odara-primary/50 !text-dark !font-bold');
    }

    if (filtroDiaAtivo && filtroDia &&
      date.getDate() === filtroDia.getDate() &&
      date.getMonth() === filtroDia.getMonth() &&
      date.getFullYear() === filtroDia.getFullYear()) {
      classes.push('!bg-odara-secondary/70 !text-white !font-bold');
    }

    return classes.join(' ');
  };

  const handleDayClick = (value) => {
    if (filtroDiaAtivo && filtroDia &&
      value.getDate() === filtroDia.getDate() &&
      value.getMonth() === filtroDia.getMonth() &&
      value.getFullYear() === filtroDia.getFullYear()) {
      setFiltroDiaAtivo(false);
      setFiltroDia(null);
    } else {
      setFiltroDia(value);
      setFiltroDiaAtivo(true);
    }
  };

  const irParaHoje = () => {
    const hoje = new Date();
    setDataAtual(hoje);
    setFiltroDia(hoje);
    setFiltroDiaAtivo(true);
  };

  // ===== FUNÇÕES DE CONTROLE DE ADMINISTRAÇÃO =====
  const toggleControleAtivo = () => {
    const novoEstado = !controleAtivo;
    setControleAtivo(novoEstado);
    
    if (novoEstado) {
      if (!filtroDia) {
        setFiltroDia(new Date());
        setFiltroDiaAtivo(true);
      }
    } else {
      setFiltroControle('todos');
    }
  };

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

  // ===== FUNÇÕES DE GERENCIAMENTO DE MEDICAMENTOS =====
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
    setEditando(false);
    setIdEditando(null);
    setModalAberto(true);
  };

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
      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  const adicionarHorario = () => {
    setNovoMedicamento({
      ...novoMedicamento,
      horarios: [...novoMedicamento.horarios, '']
    });
  };

  const removerHorario = (index) => {
    const novosHorarios = novoMedicamento.horarios.filter((_, i) => i !== index);
    setNovoMedicamento({
      ...novoMedicamento,
      horarios: novosHorarios
    });
  };

  const atualizarHorario = (index, valor) => {
    const novosHorarios = [...novoMedicamento.horarios];
    novosHorarios[index] = valor;
    setNovoMedicamento({
      ...novoMedicamento,
      horarios: novosHorarios
    });
  };

  const toggleDiaAdministracao = (diaId) => {
    const novosDias = novoMedicamento.diasAdministracao.includes(diaId)
      ? novoMedicamento.diasAdministracao.filter(d => d !== diaId)
      : [...novoMedicamento.diasAdministracao, diaId];
    
    setNovoMedicamento({
      ...novoMedicamento,
      diasAdministracao: novosDias
    });
  };

  const adicionarDiaEspecifico = () => {
    setNovoMedicamento({
      ...novoMedicamento,
      diasEspecificos: [...novoMedicamento.diasEspecificos, '']
    });
  };

  const removerDiaEspecifico = (index) => {
    const novosDias = novoMedicamento.diasEspecificos.filter((_, i) => i !== index);
    setNovoMedicamento({
      ...novoMedicamento,
      diasEspecificos: novosDias
    });
  };

  const atualizarDiaEspecifico = (index, valor) => {
    const novosDias = [...novoMedicamento.diasEspecificos];
    novosDias[index] = valor;
    setNovoMedicamento({
      ...novoMedicamento,
      diasEspecificos: novosDias
    });
  };

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

  const salvarMedicamento = () => {
    if (!novoMedicamento.residente || !novoMedicamento.nomeMedicamento) return;

    const partesDataInicio = novoMedicamento.dataInicio.split('-');
    const dataInicio = new Date(partesDataInicio[0], partesDataInicio[1] - 1, partesDataInicio[2]);

    const dataFim = novoMedicamento.dataFim ? new Date(novoMedicamento.dataFim) : null;

    const diasEspecificos = novoMedicamento.recorrencia === 'unico' 
      ? novoMedicamento.diasEspecificos.filter(d => d !== '').map(d => new Date(d))
      : [];

    const medicamentoObj = {
      ...novoMedicamento,
      dataInicio,
      dataFim,
      diasEspecificos,
      horarios: novoMedicamento.horarios.filter(h => h !== ''),
      administracoes: novoMedicamento.administracoes || {}
    };

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

    setModalAberto(false);
  };

  const excluirMedicamento = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este medicamento?')) {
      setMedicamentos(anterior => anterior.filter(med => med.id !== id));
    }
  };

  const alterarStatus = (id, novoStatus) => {
    setMedicamentos(anterior => anterior.map(med =>
      med.id === id ? { ...med, status: novoStatus } : med
    ));
  };

  // ===== FILTROS =====
  const medicamentosFiltrados = medicamentos.filter(medicamento => {
    const passaFiltroResidente = filtroResidente === 'todos' || medicamento.residente === filtroResidente;
    const passaFiltroStatus = filtroStatus === 'todos' || medicamento.status === filtroStatus;
    
    let passaFiltroDia = true;
    if (filtroDiaAtivo) {
      passaFiltroDia = medicamentoNoDia(medicamento, filtroDia);
    }

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

    return passaFiltroResidente && passaFiltroStatus && passaFiltroDia && passaFiltroControle;
  });

  // ===== RENDERIZAÇÃO =====
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
            <h1 className="text-3xl font-bold text-odara-dark mr-2">Registro de Medicamentos</h1>
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

        {/* Barra de filtros */}
        <div className="relative flex items-center gap-4 mb-6">
          {/* Botão Adicionar */}
          <button
            onClick={abrirModalAdicionar}
            className="bg-odara-accent hover:bg-odara-secondary text-odara-contorno font-emibold py-2 px-4 rounded-lg flex items-center transition duration-200"
          >
            <FaPlus className="mr-2 text-odara-white" /> Novo Medicamento
          </button>

          {/* Filtro por Residente */}
          <div className="relative">
            <button
              className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition w-full justify-center"
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
              <div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={() => {
                    setFiltroResidente('todos');
                    setFiltroResidenteAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${filtroResidente === 'todos' ? 'bg-indigo-100 font-semibold' : ''}`}
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
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${filtroResidente === residente ? 'bg-indigo-100 font-semibold' : ''}`}
                  >
                    {residente}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtro por Status */}
          <div className="relative">
            <button
              className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition w-40 justify-center"
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
              <div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={() => {
                    setFiltroStatus('todos');
                    setFiltroStatusAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${filtroStatus === 'todos' ? 'bg-indigo-100 font-semibold' : ''}`}
                >
                  Todos
                </button>
                <button
                  onClick={() => {
                    setFiltroStatus('ativo');
                    setFiltroStatusAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${filtroStatus === 'ativo' ? 'bg-indigo-100 font-semibold' : ''}`}
                >
                  Ativos
                </button>
                <button
                  onClick={() => {
                    setFiltroStatus('suspenso');
                    setFiltroStatusAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${filtroStatus === 'suspenso' ? 'bg-indigo-100 font-semibold' : ''}`}
                >
                  Suspensos
                </button>
                <button
                  onClick={() => {
                    setFiltroStatus('finalizado');
                    setFiltroStatusAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${filtroStatus === 'finalizado' ? 'bg-indigo-100 font-semibold' : ''}`}
                >
                  Finalizados
                </button>
              </div>
            )}
          </div>

          {/* Botão Controle de Administração */}
          <button
            onClick={toggleControleAtivo}
            className={`flex items-center rounded-full px-4 py-2 shadow-sm border font-medium transition w-50 justify-center ${
              controleAtivo 
                ? 'bg-odara-primary text-white border-odara-primary' 
                : 'bg-gray-400 text-white border-gray-400 hover:bg-gray-500'
            }`}
          >
            {controleAtivo ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
            Controle {controleAtivo ? 'Ativo' : 'Inativo'}
          </button>

          {/* Filtro de Controle (apenas quando controle está ativo) */}
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
              className="flex items-center bg-odara-accent text-odara-white rounded-full px-4 py-2 shadow-sm font-medium hover:bg-odara-secondary transition"
            >
              <FaTimes className="mr-1" /> Limpar Filtros
            </button>
          )}
        </div>

        {/* Grid principal com medicamentos e calendário */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Seção de Medicamentos */}
          <div className="bg-odara-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-odara-dark flex items-center mb-2">
              {filtroStatus === 'todos' ? 'Todos os Medicamentos' : 
               `Medicamentos ${ROTULOS_STATUS[filtroStatus]}`}
              {controleAtivo && filtroControle !== 'todos' && ` (${ROTULOS_CONTROLES[filtroControle]})`}
            </h2>

            {/* Filtros ativos */}
            <div className="flex flex-wrap gap-2 mb-4">
              {filtroDiaAtivo && (
                <span className="text-sm bg-odara-accent text-odara-white px-2 py-1 rounded-full">
                  Dia: {filtroDia.getDate().toString().padStart(2, '0')}/{(filtroDia.getMonth() + 1).toString().padStart(2, '0')}
                </span>
              )}

              {filtroResidente !== 'todos' && (
                <span className="text-sm bg-odara-secondary text-odara-white px-2 py-1 rounded-full">
                  Residente: {filtroResidente}
                </span>
              )}

              {filtroStatus !== 'todos' && (
                <span className="text-sm bg-odara-dropdown-accent text-odara-white px-2 py-1 rounded-full">
                  Status: {ROTULOS_STATUS[filtroStatus]}
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

            {/* Mensagem quando controle ativo mas sem dia selecionado */}
            {controleAtivo && !filtroDia && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                <FaInfoCircle className="inline text-yellow-500 mr-2" />
                <span className="text-yellow-700">
                  Selecione um dia no calendário para realizar o controle de administração.
                </span>
              </div>
            )}

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
                    className="p-4 rounded-xl hover:shadow-md transition-shadow duration-200 bg-odara-offwhite"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          medicamento.status === 'ativo' ? 'bg-green-500' :
                          medicamento.status === 'suspenso' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}></span>
                        <p className="text-base font-semibold">
                          Início: {medicamento.dataInicio.getDate().toString().padStart(2, '0')}/
                          {(medicamento.dataInicio.getMonth() + 1).toString().padStart(2, '0')}/
                          {medicamento.dataInicio.getFullYear()}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={medicamento.status}
                          onChange={(e) => alterarStatus(medicamento.id, e.target.value)}
                          className={`text-sm rounded-lg px-3 py-1 border focus:ring-2 focus:ring-odara-primary focus:border-odara-primary transition-colors duration-200 ${CORES_STATUS[medicamento.status]}`}
                        >
                          {Object.entries(ROTULOS_STATUS).map(([valor, rotulo]) => (
                            <option key={valor} value={valor} className="bg-white text-odara-dark">
                              {rotulo}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <h6 className="text-xl font-bold mb-1">{medicamento.nomeMedicamento}</h6>
                    
                    <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
                      <div>
                        <strong>Dosagem:</strong> {medicamento.dosagem}
                      </div>
                      <div>
                        <strong>Dose:</strong> {medicamento.dose}
                      </div>
                      <div>
                        <strong>Recorrência:</strong> {ROTULOS_RECORRENCIAS[medicamento.recorrencia]}
                      </div>
                      <div>
                        <strong>Horários:</strong> {medicamento.horarios.join(', ')}
                      </div>
                    </div>

                    {/* Controle de administração */}
                    {controleAtivo && filtroDia && medicamentoNoDia(medicamento, filtroDia) && (
                      <div className="mb-3 p-3 bg-white rounded-lg border border-odara-primary">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-odara-dark">
                            Controle para {formatarChaveData(filtroDia)}
                          </h4>
                          <span className="text-xs bg-odara-primary text-white px-2 py-1 rounded-full">
                            {medicamento.residente}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {medicamento.horarios.map(horario => {
                            const status = getStatusAdministracao(medicamento, filtroDia, horario);
                            const isAdministrado = status === CONTROLES.ADMINISTRADO;
                            
                            return (
                              <div key={horario} className="flex items-center justify-between">
                                <span className="font-medium">{horario}</span>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => atualizarAdministracao(
                                      medicamento.id, 
                                      filtroDia, 
                                      horario, 
                                      isAdministrado ? CONTROLES.PENDENTE : CONTROLES.ADMINISTRADO
                                    )}
                                    className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
                                      isAdministrado 
                                        ? 'bg-green-500 text-white hover:bg-green-600' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    title={isAdministrado ? "Marcar como pendente" : "Marcar como administrado"}
                                  >
                                    {isAdministrado ? <FaCheck /> : <FaQuestion />}
                                  </button>
                                  {!isAdministrado && (
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                      status === CONTROLES.ATRASADO 
                                        ? 'bg-red-500 text-white' 
                                        : 'bg-yellow-500 text-white'
                                    }`}>
                                      {ROTULOS_CONTROLES[status]}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {medicamento.efeitosColaterais && (
                      <p className="text-sm mb-2">
                        <strong>Efeitos colaterais:</strong> {medicamento.efeitosColaterais}
                      </p>
                    )}

                    {medicamento.observacoes && (
                      <p className="text-sm mb-2">
                        <strong>Observações:</strong> {medicamento.observacoes}
                      </p>
                    )}

                    {medicamento.saudeRelacionada && (
                      <p className="text-sm mb-2">
                        <strong>Saúde relacionada:</strong> {medicamento.saudeRelacionada}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <span className="bg-odara-dropdown text-odara-dropdown-name/60 px-2 py-1 rounded-md text-xs">
                          {medicamento.residente}
                        </span>
                        
                        {medicamento.recorrencia !== 'unico' && medicamento.diasAdministracao.length > 0 && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="text-odara-name">
                              Dias: {medicamento.diasAdministracao.map(dia => DIAS_SEMANA.find(d => d.id === dia)?.label).join(', ')}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => abrirModalEditar(medicamento.id)}
                          className="text-odara-secondary hover:text-odara-dropdown-accent transition-colors duration-200 p-2 rounded-full hover:bg-odara-dropdown"
                          title="Editar medicamento"
                        >
                          <FaEdit size={14} />
                        </button>

                        <button
                          onClick={() => excluirMedicamento(medicamento.id)}
                          className="text-odara-alerta hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-odara-alerta/50"
                          title="Excluir medicamento"
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

          {/* Seção do Calendário */}
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
            <div className="flex justify-center mb-5">
              <button
                onClick={irParaHoje}
                className="bg-odara-accent hover:bg-odara-secondary text-odara-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Hoje
              </button>
            </div>

            <div className="flex justify-center border-2 border-odara-primary rounded-xl shadow-sm overflow-hidden max-w-md mx-auto">
              <Calendar
                value={dataAtual}
                onChange={setDataAtual}
                onClickDay={handleDayClick}
                tileClassName={getTileClassName}
                tileContent={getTileContent}
                locale="pt-BR"
                className="border-0"
                nextLabel={<FaChevronRight />}
                prevLabel={<FaChevronLeft />}
                next2Label={null}
                prev2Label={null}
                showNeighboringMonth={false}
              />
            </div>

            {/* Legenda atualizada */}
            <div className="grid grid-cols-1 mt-4 p-3 bg-odara-offwhite rounded-lg max-w-md mx-auto text-center">
              <h6 className="font-semibold text-odara-dark mb-2">Estatísticas do Dia:</h6>
              {filtroDia ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Medicamentos:</span>
                    <span className="font-semibold">{obterMedicamentosDoDia(filtroDia).length} registros</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Residentes:</span>
                    <span className="font-semibold">{obterResidentesDoDia(filtroDia).length} residentes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Administrações:</span>
                    <span className="font-semibold">
                      {getEstatisticasDia(filtroDia).total} total
                    </span>
                  </div>
                  <div className="flex justify-between gap-1 text-xs mt-2">
                    <div className="flex-1 bg-green-500 text-white px-1 py-0.5 rounded">
                      {getEstatisticasDia(filtroDia).administradas} ✓
                    </div>
                    <div className="flex-1 bg-yellow-500 text-white px-1 py-0.5 rounded">
                      {getEstatisticasDia(filtroDia).pendentes} ?
                    </div>
                    <div className="flex-1 bg-red-500 text-white px-1 py-0.5 rounded">
                      {getEstatisticasDia(filtroDia).atrasadas} !
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-odara-name/60">Selecione um dia no calendário para ver as estatísticas</p>
              )}
              
              <div className="mt-3 pt-2 border-t border-gray-200">
                <div className="flex justify-between gap-1 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Todos administrados</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>Pendentes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Atrasados</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal para adicionar/editar medicamento */}
        {modalAberto && (
          <div className="fixed inset-0 bg-odara-offwhite/80 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 border-l-4 border-odara-primary max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-odara-accent">
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Residente *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      value={novoMedicamento.residente}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, residente: e.target.value })}
                      placeholder="Nome do residente"
                    />
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Nome do Medicamento *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      value={novoMedicamento.nomeMedicamento}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, nomeMedicamento: e.target.value })}
                      placeholder="Nome do medicamento"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Dosagem</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      value={novoMedicamento.dosagem}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, dosagem: e.target.value })}
                      placeholder="Ex: 50mg, 100mg"
                    />
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Dose</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      value={novoMedicamento.dose}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, dose: e.target.value })}
                      placeholder="Ex: 1 comprimido, 5ml"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Data de Início</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      value={novoMedicamento.dataInicio}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, dataInicio: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Data de Término (opcional)</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      value={novoMedicamento.dataFim}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, dataFim: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Recorrência</label>
                  <select
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novoMedicamento.recorrencia}
                    onChange={(e) => setNovoMedicamento({ 
                      ...novoMedicamento, 
                      recorrencia: e.target.value,
                      diasEspecificos: e.target.value !== 'unico' ? [] : novoMedicamento.diasEspecificos
                    })}
                  >
                    {Object.entries(ROTULOS_RECORRENCIAS).map(([chave, rotulo]) => (
                      <option key={chave} value={chave}>{rotulo}</option>
                    ))}
                  </select>
                </div>

                {novoMedicamento.recorrencia !== 'unico' && (
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Dias de Administração</label>
                    <div className="flex flex-wrap gap-2">
                      {DIAS_SEMANA.map(dia => (
                        <button
                          key={dia.id}
                          type="button"
                          onClick={() => toggleDiaAdministracao(dia.id)}
                          className={`px-3 py-2 rounded-lg border transition-colors duration-200 ${
                            novoMedicamento.diasAdministracao.includes(dia.id)
                              ? 'bg-odara-primary text-white border-odara-primary'
                              : 'bg-white text-odara-dark border-odara-primary hover:bg-odara-primary/10'
                          }`}
                        >
                          {dia.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {novoMedicamento.recorrencia === 'unico' && (
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Dias Específicos de Administração</label>
                    {novoMedicamento.diasEspecificos.map((dia, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="date"
                          className="flex-1 px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                          value={dia}
                          onChange={(e) => atualizarDiaEspecifico(index, e.target.value)}
                        />
                        {novoMedicamento.diasEspecificos.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removerDiaEspecifico(index)}
                            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={adicionarDiaEspecifico}
                      className="px-4 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors duration-200 flex items-center"
                    >
                      <FaPlus className="mr-2" /> Adicionar Dia
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Horários de Administração</label>
                  {novoMedicamento.horarios.map((horario, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="time"
                        className="flex-1 px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
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
                    className="px-4 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors duration-200 flex items-center"
                  >
                    <FaPlus className="mr-2" /> Adicionar Horário
                  </button>
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Efeitos Colaterais Possíveis</label>
                  <textarea
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    rows="2"
                    value={novoMedicamento.efeitosColaterais}
                    onChange={(e) => setNovoMedicamento({ ...novoMedicamento, efeitosColaterais: e.target.value })}
                    placeholder="Liste os possíveis efeitos colaterais"
                  />
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Observações</label>
                  <textarea
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
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
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novoMedicamento.saudeRelacionada}
                    onChange={(e) => setNovoMedicamento({ ...novoMedicamento, saudeRelacionada: e.target.value })}
                    placeholder="Ex: Hipertensão, Diabetes, etc."
                  />
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Foto do Medicamento</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors duration-200 cursor-pointer">
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
                    className="px-6 py-2 border border-odara-primary text-odara-primary rounded-lg hover:bg-odara-primary/10 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={salvarMedicamento}
                    disabled={!novoMedicamento.residente || !novoMedicamento.nomeMedicamento}
                    className="px-6 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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