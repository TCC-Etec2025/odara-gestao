import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaChevronLeft, FaChevronRight, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RegistroAtividades = () => {
  // ===== ESTADOS DO COMPONENTE =====
  // Estado que armazena todas as atividades cadastradas
  const [atividades, setAtividades] = useState([
    {
      id: 1,
      data: new Date(new Date().getFullYear(), new Date().getMonth(), 3),
      horario: "10:00",
      titulo: "Clube do livro",
      descricao: "Encontro para discutir a leitura da semana",
      categoria: "criativa",
      residentes: "João Santos",
      cor: "rosa",
      concluida: true
    },
    {
      id: 2,
      data: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
      horario: "9:00",
      titulo: "Fisioterapia de Emergência",
      descricao: "Sessão de emergência para 4 residentes",
      categoria: "fisica",
      residentes: "Maria Oliveira",
      cor: "vermelho",
      concluida: false
    },
    {
      id: 3,
      data: new Date(new Date().getFullYear(), new Date().getMonth(), 6),
      horario: "14:00",
      titulo: "Roda de Conversa",
      descricao: "Roda de conversa liderada pela psicóloga Júlia",
      categoria: "social",
      residentes: "Ana Costa",
      cor: "azul",
      concluida: false
    },
  ]);

  // Estado para controlar a data atual do calendário
  const [dataAtual, setDataAtual] = useState(new Date());

  // Estado para controlar se o modal está aberto ou fechado
  const [modalAberto, setModalAberto] = useState(false);

  // Estado para armazenar os dados da nova atividade sendo criada/editada
  const [novaAtividade, setNovaAtividade] = useState({
    titulo: '',
    descricao: '',
    data: '',
    horario: '',
    residentes: '',
    categoria: 'criativa',
    cor: 'rosa'
  });

  // Estados para controle de edição
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  // Estados para controle de filtros
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [infoVisivel, setInfoVisivel] = useState(false);
  const [filtroDia, setFiltroDia] = useState(null);
  const [filtroDiaAtivo, setFiltroDiaAtivo] = useState(false);
  const [residenteSelecionado, setResidenteSelecionado] = useState('');
  const [filtroResidenteAberto, setFiltroResidenteAberto] = useState(false);
  const [mostrarArquivadas, setMostrarArquivadas] = useState(false);

  // ===== CONSTANTES E CONFIGURAÇÕES =====
  // Mapeamento de categorias
  const CATEGORIAS = {
    CRIATIVA: 'criativa',
    LOGICA: 'logica',
    FISICA: 'fisica',
    SOCIAL: 'social',
    OUTRA: 'outra'
  };

  const ROTULOS_CATEGORIAS = {
    [CATEGORIAS.CRIATIVA]: "Criativa",
    [CATEGORIAS.LOGICA]: "Lógica",
    [CATEGORIAS.FISICA]: "Física",
    [CATEGORIAS.SOCIAL]: "Social",
    [CATEGORIAS.OUTRA]: "Outra"
  };

  // Cores disponíveis para as atividades
  const CORES = {
    ROSA: 'rosa',
    MAGENTA: 'magenta',
    AZUL: 'azul',
    AZUL_CLARO: 'azul claro',
    AMARELO: 'amarelo',
    VERMELHO: 'vermelho',
    NEVE: 'neve'
  };

  // Classes CSS correspondentes a cada cor
  const CLASSES_CORES = {
    [CORES.ROSA]: 'bg-odara-primary/60 text-odara-dark shadow-sm',
    [CORES.MAGENTA]: 'bg-odara-accent/60 text-odara-white shadow-sm',
    [CORES.AZUL]: 'bg-odara-secondary/60 text-odara-white shadow-sm',
    [CORES.AZUL_CLARO]: 'bg-odara-dropdown-accent/60 text-odara-dark shadow-sm',
    [CORES.AMARELO]: 'bg-odara-contorno text-odara-dark shadow-sm',
    [CORES.VERMELHO]: 'bg-odara-alerta text-odara-white shadow-sm',
    [CORES.NEVE]: 'bg-odara-offwhite text-odara-dark shadow-sm'
  };

  // Opções de filtro disponíveis
  const FILTROS = [
    { id: 'todos', label: 'Todos' },
    ...Object.values(CATEGORIAS).map(cat => ({
      id: cat,
      label: ROTULOS_CATEGORIAS[cat]
    }))
  ];

  // ===== FUNÇÕES DE NAVEGAÇÃO DO CALENDÁRIO =====
  // Altera o mês atual do calendário
  // @param {number} deslocamento - Número de meses para avançar/retroceder
  const alterarMes = (deslocamento) => {
    setDataAtual(dataAnterior => {
      const novaData = new Date(dataAnterior);
      novaData.setMonth(dataAnterior.getMonth() + deslocamento);
      return novaData;
    });

    // Mantém o filtro de dia ativo se estiver aplicado, mas ajusta para o novo mês
    if (filtroDiaAtivo && filtroDia) {
      const novoFiltroDia = new Date(filtroDia);
      novoFiltroDia.setMonth(dataAtual.getMonth() + deslocamento);
      setFiltroDia(novoFiltroDia);
    }
  };

  // Retorna o calendário para o mês atual e ativa o filtro do dia para o dia atual (hoje)
  const irParaMesAtual = () => {
    const hoje = new Date();
    setDataAtual(hoje);
    setFiltroDia(hoje);
    setFiltroDiaAtivo(true);
  };

  // ===== FUNÇÕES DE GERENCIAMENTO DE ATIVIDADES =====
  // Abre o modal para adicionar uma nova atividade
  const abrirModalAdicionar = () => {
    setNovaAtividade({
      titulo: '',
      descricao: '',
      data: new Date().toISOString().split('T')[0],
      horario: '',
      residentes: '',
      categoria: 'criativa',
      cor: 'rosa'
    });
    setEditando(false);
    setIdEditando(null);
    setModalAberto(true);
  };

  // Abre o modal para editar uma atividade existente
  // @param {number} id - ID da atividade a ser editada
  const abrirModalEditar = (id) => {
    const atividadeParaEditar = atividades.find(atividade => atividade.id === id);
    if (atividadeParaEditar) {
      setNovaAtividade({
        titulo: atividadeParaEditar.titulo,
        descricao: atividadeParaEditar.descricao,
        data: atividadeParaEditar.data.toISOString().split('T')[0],
        horario: atividadeParaEditar.horario.split(' - ')[0] || '',
        residentes: atividadeParaEditar.residentes,
        categoria: atividadeParaEditar.categoria,
        cor: atividadeParaEditar.cor
      });
      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  // Salva uma atividade nova ou editada
  const salvarAtividade = () => {
    if (!novaAtividade.titulo || !novaAtividade.data) return;

    const partesData = novaAtividade.data.split('-');
    const dataAtividade = new Date(partesData[0], partesData[1] - 1, partesData[2]);

    let textoHorario = '';
    if (novaAtividade.horario) {
      textoHorario = `${novaAtividade.horario}`;
    }

    if (editando && idEditando) {
      // Atualiza atividade existente
      setAtividades(anterior => anterior.map(atividade =>
        atividade.id === idEditando
          ? {
            ...atividade,
            titulo: novaAtividade.titulo,
            descricao: novaAtividade.descricao,
            data: dataAtividade,
            horario: textoHorario,
            residentes: novaAtividade.residentes,
            categoria: novaAtividade.categoria,
            cor: novaAtividade.cor
          }
          : atividade
      ));
    }
    else {
      // Adiciona nova atividade
      const novaAtividadeObj = {
        id: Date.now(),
        titulo: novaAtividade.titulo,
        descricao: novaAtividade.descricao,
        data: dataAtividade,
        horario: textoHorario,
        residentes: novaAtividade.residentes,
        categoria: novaAtividade.categoria,
        cor: novaAtividade.cor,
        concluida: false
      };
      setAtividades(anterior => [...anterior, novaAtividadeObj]);
    }

    setModalAberto(false);
  };

  // Exclui uma atividade após confirmação
  // @param {number} id - ID da atividade a ser excluída
  const excluirAtividade = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta atividade?')) {
      setAtividades(anterior => anterior.filter(atividade => atividade.id !== id));
    }
  };

  // Alterna o status de conclusão de uma atividade
  // @param {number} id - ID da atividade
  const alternarConclusao = (id) => {
    setAtividades(anterior => anterior.map(atividade =>
      atividade.id === id
        ? { ...atividade, concluida: !atividade.concluida }
        : atividade
    ));

    // Mantém o filtro ativo após marcar como concluída
    if (filtroDiaAtivo) {
      const atividadeFiltrada = atividades.find(a => a.id === id);
      if (atividadeFiltrada) {
        setFiltroDia(new Date(atividadeFiltrada.data));
        setFiltroDiaAtivo(true);
      }
    }
  };

  // ===== FUNÇÕES DE RENDERIZAÇÃO DO CALENDÁRIO =====
  // Retorna o cabeçalho do calendário com mês e ano formatados
  const renderizarCabecalhoCalendario = () => {
    const nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return `${nomesMeses[dataAtual.getMonth()]} ${dataAtual.getFullYear()}`;
  };

  // Obtém as atividades de um dia específico (não mostra concluídas)
  // @param {number} dia - Dia do mês
  // @param {number} mes - Mês (0-11)
  // @param {number} ano - Ano
  const obterAtividadesDoDia = (dia, mes, ano) => {
    return atividades
      .filter(atividade => {
        const dataAtividade = atividade.data;
        return dataAtividade.getDate() === dia &&
          dataAtividade.getMonth() === mes &&
          dataAtividade.getFullYear() === ano &&
          !atividade.concluida; // Não mostra atividades concluídas
      })
      .sort((a, b) => {
        // Ordena por horário dentro do mesmo dia
        const horarioA = a.horario.split(' - ')[0] || '00:00';
        const horarioB = b.horario.split(' - ')[0] || '00:00';
        return horarioA.localeCompare(horarioB);
      });
  };

  // Renderiza os dias do calendário
  const renderDiasCalendario = () => {
    // Altere currentDate para dataAtual em todas as ocorrências
    const firstDay = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
    const lastDay = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const prevMonthLastDay = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0).getDate();

    const today = new Date();

    const days = [];

    // Dias do mês anterior
    for (let i = firstDayIndex; i > 0; i--) {
      const day = prevMonthLastDay - i + 1;
      const cellIndex = i - 1;
      days.push(
        <div
          key={`prev-${day}`}
          className={`flex flex-col aspect-square p-1 bg-odara-name/10 
          ${cellIndex % 7 !== 6 ? 'border-r-0' : 'border-r'} 
          border-b-0
          border border-odara-primary`}
        >
          <span className="text-xs font-semibold text-odara-dark/40 self-end">{day}</span>
        </div>
      );
    }

    // Dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === today.getDate() &&
        dataAtual.getMonth() === today.getMonth() &&
        dataAtual.getFullYear() === today.getFullYear();

      const atividadesDoDia = obterAtividadesDoDia(i, dataAtual.getMonth(), dataAtual.getFullYear());

      const cellIndex = firstDayIndex + i - 1;
      const isLastColumn = cellIndex % 7 === 6;
      const isLastRow = cellIndex >= 35;

      days.push(
        <div
          key={`current-${i}`}
          className={`flex flex-col aspect-square p-1 relative ${isToday ? 'bg-odara-primary/20' : 'bg-white'} overflow-y-auto cursor-pointer 
          border border-odara-primary 
          ${!isLastColumn ? 'border-r-0' : ''} 
          ${!isLastRow ? 'border-b-0' : ''}
          ${filtroDiaAtivo && i === filtroDia.getDate() && dataAtual.getMonth() === filtroDia.getMonth() && dataAtual.getFullYear() === filtroDia.getFullYear()
              ? 'outline-2 outline outline-odara-accent outline-offset-[-1px] z-10'
              : ''}`}
          onClick={() => {
            const diaClicado = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), i);
            if (filtroDiaAtivo && filtroDia && diaClicado.getDate() === filtroDia.getDate() && diaClicado.getMonth() === filtroDia.getMonth() && diaClicado.getFullYear() === filtroDia.getFullYear()) {
              setFiltroDiaAtivo(false);
              setFiltroDia(null);
            } else {
              setFiltroDia(diaClicado);
              setFiltroDiaAtivo(true);
            }
          }}
        >
          <div className="flex justify-between items-start">
            <span className={`text-xs font-semibold ${isToday ? 'text-odara-white bg-odara-accent rounded-full px-1.5 py-0.5 min-w-[1rem] text-center font-bold' : 'text-odara-accent'} self-end`}>
              {i}
            </span>
            {atividadesDoDia.length > 0 && (
              <span className="text-xs text-odara-dropdown-accent font-bold text-center">
                {atividadesDoDia.length}
              </span>
            )}
          </div>

          {/* atividades do dia */}
          <div className="flex-1 mt-1 space-y-1 overflow-y-auto">
            {atividadesDoDia.map(atividade => (
              <div
                key={atividade.id}
                className={`text-xs p-1 rounded ${CLASSES_CORES[atividade.cor]} truncate`}
                title={`${atividade.horario} - ${atividade.titulo} - ${atividade.residentes}`}
              >
                <div className="font-medium truncate">
                  {atividade.horario.split(' - ')[0]} {/* Mostra apenas o horário inicial */}
                </div>
                <div className="truncate">{atividade.titulo}</div>
                <div className="truncate">{atividade.residentes}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Dias do próximo mês
    const totalCells = 42;
    const remainingCells = totalCells - (firstDayIndex + daysInMonth);

    for (let i = 1; i <= remainingCells; i++) {
      const cellIndex = firstDayIndex + daysInMonth + i - 1;
      const isLastColumn = cellIndex % 7 === 6;
      const isLastRow = cellIndex >= 35;

      days.push(
        <div
          key={`next-${i}`}
          className={`flex flex-col aspect-square p-1 bg-odara-name/10 
          ${!isLastColumn ? 'border-r-0' : ''} 
          ${!isLastRow ? 'border-b-0' : ''}
          border border-odara-primary`}
        >
          <span className="text-xs font-semibold text-odara-dark/40 self-end">{i}</span>
        </div>
      );
    }

    return days;
  };

  // ===== FILTROS =====
  // Filtra atividades por categoria, dia selecionado, residente e arquivadas/ativas
  const atividadesFiltradas = atividades
    .filter(atividade => {
      // Filtro por categoria
      const passaFiltroCategoria = filtroAtivo === 'todos' || atividade.categoria === filtroAtivo;

      // Filtro por dia
      const passaFiltroDia = !filtroDiaAtivo || (
        atividade.data.getDate() === filtroDia.getDate() &&
        atividade.data.getMonth() === filtroDia.getMonth() &&
        atividade.data.getFullYear() === filtroDia.getFullYear()
      );

      // Filtro por residente
      const passaFiltroResidente = !residenteSelecionado || atividade.residentes === residenteSelecionado;

      // Filtro por status de arquivamento
      const passaFiltroArquivamento = mostrarArquivadas ? atividade.concluida : !atividade.concluida;

      return passaFiltroCategoria && passaFiltroDia && passaFiltroResidente && passaFiltroArquivamento;
    })

    // Ordenação das atividades
    .sort((a, b) => {
      // Primeiro ordena por data (mais recente primeiro se arquivadas, mais antiga primeiro se ativas)
      const comparacaoData = mostrarArquivadas
        ? new Date(b.data) - new Date(a.data)  // Arquivadas: mais recente primeiro
        : new Date(a.data) - new Date(b.data); // Ativas: mais antiga primeiro

      // Se for o mesmo dia, ordena por horário
      if (comparacaoData === 0) {
        // Extrai apenas a parte do horário (HH:MM) para comparação
        const horarioA = a.horario.split(' - ')[0] || '00:00';
        const horarioB = b.horario.split(' - ')[0] || '00:00';

        return horarioA.localeCompare(horarioB);
      }

      return comparacaoData;
    });

  // ===== RENDERIZAÇÃO DO COMPONENTE =====
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
            <h1 className="text-3xl font-bold text-odara-dark mr-2">Registro de Atividades</h1>
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
                  <h3 className="font-bold mb-2">Registro de Atividades</h3>
                  <p>
                    O Registro de Atividades é um documento fundamental que reúne todas as ações, cuidados e acontecimentos do dia a dia na instituição. Ele serve para garantir a organização, a transparência e a qualidade do atendimento aos idosos. Ele permite monitorar o que foi feito com cada residente, como medicação, alimentação, atividades físicas e sociais, também ajuda a identificar rapidamente qualquer problema.
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
            <FaPlus className="mr-2 text-odara-white" /> Nova Atividade
          </button>

          {/* Filtro por Categoria */}
          <div className="relative">
            <button
              className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition w-40 justify-center"
              onClick={() => {
                setFiltroAberto(!filtroAberto);
                setFiltroResidenteAberto(false); // Fecha o outro dropdown
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Categoria
            </button>

            {filtroAberto && (
              <div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {FILTROS.map(filtro => (
                  <button
                    key={filtro.id}
                    onClick={() => {
                      setFiltroAtivo(filtro.id);
                      setFiltroAberto(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${filtroAtivo === filtro.id ? 'bg-indigo-100 font-semibold' : ''}`}
                  >
                    {filtro.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtro por Residente */}
          <div className="relative">
            <button
              className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition w-40 justify-center"
              onClick={() => {
                setFiltroResidenteAberto(!filtroResidenteAberto);
                setFiltroAberto(false); // Fecha o outro dropdown
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Residentes
            </button>

            {filtroResidenteAberto && (
              <div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={() => {
                    setResidenteSelecionado('');
                    setFiltroResidenteAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${!residenteSelecionado ? 'bg-indigo-100 font-semibold' : ''}`}
                >
                  Todos
                </button>
                {[...new Set(atividades.map(atividade => atividade.residentes).filter(Boolean))].map(residente => (
                  <button
                    key={residente}
                    onClick={() => {
                      setResidenteSelecionado(residente);
                      setFiltroResidenteAberto(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${residenteSelecionado === residente ? 'bg-indigo-100 font-semibold' : ''}`}
                  >
                    {residente}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtro para Mostrar/Ocultar Arquivadas */}
          <button
            onClick={() => setMostrarArquivadas(!mostrarArquivadas)}
            className={` text-odara-contorno font-emibold py-2 px-4 rounded-lg flex items-center transition duration-200 ${mostrarArquivadas
              ? 'bg-odara-secondary text-odara-white border-odara-secondary'
              : 'bg-odara-accent hover:bg-odara-secondary'
              }`}
          >
            <FaFilter className="mr-2" />
            {mostrarArquivadas ? 'Próximas' : 'Arquivadas'}
          </button>

          {/* Botão Limpar Todos os Filtros */}
          {(filtroDiaAtivo || residenteSelecionado || filtroAtivo !== 'todos') && (
            <button
              onClick={() => {
                setFiltroDiaAtivo(false);
                setFiltroDia(null);
                setResidenteSelecionado('');
                setFiltroAtivo('todos');
              }}
              className="flex items-center bg-odara-accent text-odara-white rounded-full px-4 py-2 shadow-sm font-medium hover:bg-odara-secondary transition"
            >
              <FaTimes className="mr-1" /> Limpar Filtros
            </button>
          )}
        </div>

        {/* Grid principal com atividades e calendário */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Seção de Próximas Atividades */}
          <div className="bg-odara-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-odara-dark flex items-center mb-2">
              {mostrarArquivadas ? 'Atividades Arquivadas' : 'Próximas Atividades'}
            </h2>

            {/* Filtros ativos - ADICIONE ESTE BLOCO */}
            <div className="flex flex-wrap gap-2 mb-4">
              {filtroDiaAtivo && (
                <span className="text-sm bg-odara-accent text-odara-white px-2 py-1 rounded-full">
                  Dia: {filtroDia.getDate().toString().padStart(2, '0')}/{(filtroDia.getMonth() + 1).toString().padStart(2, '0')}
                </span>
              )}
              {residenteSelecionado && (
                <span className="text-sm bg-odara-secondary text-odara-white px-2 py-1 rounded-full">
                  Residente: {residenteSelecionado}
                </span>
              )}
              {filtroAtivo !== 'todos' && (
                <span className="text-sm bg-odara-primary text-odara-white px-2 py-1 rounded-full">
                  Categoria: {ROTULOS_CATEGORIAS[filtroAtivo]}
                </span>
              )}
            </div>

            <p className="text-odara-name/60 mb-6">
              {mostrarArquivadas
                ? 'Atividades concluídas e arquivadas'
                : 'Não perca sua programação'
              }
            </p>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {atividadesFiltradas.length === 0 ? (
                <div className="p-6 rounded-xl bg-odara-name/10 text-center">
                  <p className="text-odara-dark/60">
                    {mostrarArquivadas
                      ? 'Nenhuma atividade arquivada'
                      : 'Nenhuma atividade agendada'
                    }
                  </p>
                </div>
              ) : (
                atividadesFiltradas.map(atividade => (
                  <div key={atividade.id} className="p-4 rounded-xl bg-odara-offwhite/60 border-l-2 border-odara-primary hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full bg-${atividade.cor}-600`}></span>
                        <p className="text-base font-semibold text-odara-primary">
                          {atividade.data.getDate().toString().padStart(2, '0')}/
                          {(atividade.data.getMonth() + 1).toString().padStart(2, '0')}/
                          {atividade.data.getFullYear()}
                          {atividade.horario && ` - ${atividade.horario.split(' - ')[0]}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm text-odara-dark">
                          <input
                            type="checkbox"
                            className={`rounded text-${atividade.cor}-600 focus:ring-${atividade.cor}-300`}
                            checked={atividade.concluida}
                            onChange={() => alternarConclusao(atividade.id)}
                          />
                          {atividade.concluida ? 'Arquivada' : 'Realizado'}
                        </label>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => abrirModalEditar(atividade.id)}
                            className="text-odara-secondary hover:text-odara-dropdown-accent transition-colors duration-200 p-1 rounded-full hover:bg-odara-dropdown"
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={() => excluirAtividade(atividade.id)}
                            className="text-odara-alerta hover:text-odara-accent transition-colors duration-200 p-1 rounded-full hover:bg-odara-alerta/50"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Título da atividade com ícone de alerta se for vermelha */}
                    <h6 className="text-xl font-bold text-odara-accent mb-1 flex items-center">
                      {atividade.concluida && (
                        <span className="text-odara-secondary mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                          </svg>
                        </span>
                      )}

                      {atividade.cor === 'vermelho' && !atividade.concluida && (
                        <span className="text-odara-alerta mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </span>
                      )}

                      {atividade.titulo}
                    </h6>

                    <p className="text-base text-odara-dark mb-2">{atividade.descricao}</p>
                    <div className="flex items-center text-sm">
                      <span className="bg-odara-dropdown text-odara-dropdown-name/60 px-2 py-1 rounded-md text-xs">
                        {ROTULOS_CATEGORIAS[atividade.categoria]}
                      </span>

                      {atividade.residentes && (
                        <>
                          <span className="mx-2 text-odara-primary">•</span>
                          <span className="text-odara-name">{atividade.residentes}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Seção do Calendário */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
              <h5 className="text-xl font-semibold text-odara-dark">{renderizarCabecalhoCalendario()}</h5>

              <div className="flex flex-row items-end gap-2">
                {/* Botão Hoje */}
                <button
                  onClick={irParaMesAtual}
                  className="bg-odara-white hover:bg-odara-primary text-odara-primary hover:text-odara-white font-medium py-2 px-4 rounded-lg w-full text-center"
                >
                  Hoje
                </button>

                {/* Setas de navegação */}
                <div className="flex items-center">
                  <button
                    onClick={() => alterarMes(-1)}
                    className="text-odara-primary p-2 rounded transition-all duration-300 hover:text-odara-secondary hover:bg-odara-dropdown"
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    onClick={() => alterarMes(1)}
                    className="text-odara-primary p-2 rounded transition-all duration-300 hover:text-odara-secondary hover:bg-odara-dropdown"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-odara-primary rounded-xl shadow-sm">
              <div className="grid grid-cols-7 rounded-t-xl border-b border-odara-primary">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(dia => (
                  <div key={dia} className="py-2 border-r border-odara-primary bg-odara-accent last:border-r-0 flex items-center justify-center text-sm font-medium text-odara-white">
                    {dia}
                  </div>
                ))}
              </div>

              {/* Renderiza o calendário */}
              <div className="grid grid-cols-7 rounded-b-xl">
                {renderDiasCalendario()}
              </div>
            </div>
          </div>
        </div>

        {/* Modal para adicionar/editar atividade */}
        {modalAberto && (
          <div className="fixed inset-0 bg-odara-offwhite/80 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border-l-4 border-odara-primary">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-odara-accent">
                  {editando ? 'Editar' : 'Adicionar'} Atividade
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
                  <label className="block text-odara-dark font-medium mb-2">Título da Atividade *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novaAtividade.titulo}
                    onChange={(e) => setNovaAtividade({ ...novaAtividade, titulo: e.target.value })}
                    placeholder="Digite o título da atividade"
                  />
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Descrição</label>
                  <textarea
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    rows="3"
                    value={novaAtividade.descricao}
                    onChange={(e) => setNovaAtividade({ ...novaAtividade, descricao: e.target.value })}
                    placeholder="Digite a descrição da atividade"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Data *</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      value={novaAtividade.data}
                      onChange={(e) => setNovaAtividade({ ...novaAtividade, data: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Horário</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      value={novaAtividade.horario}
                      onChange={(e) => setNovaAtividade({ ...novaAtividade, horario: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Residente(s)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novaAtividade.residentes}
                    onChange={(e) => setNovaAtividade({ ...novaAtividade, residentes: e.target.value })}
                    placeholder="Nome do(s) residente(s)"
                  />
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Categoria</label>
                  <select
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novaAtividade.categoria}
                    onChange={(e) => setNovaAtividade({ ...novaAtividade, categoria: e.target.value })}
                  >
                    {Object.entries(ROTULOS_CATEGORIAS).map(([chave, rotulo]) => (
                      <option key={chave} value={chave}>{rotulo}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Cor da Atividade</label>
                  <div className="flex space-x-2">
                    {Object.entries(CLASSES_CORES).map(([cor, classe]) => (
                      <div
                        key={cor}
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${classe} ${novaAtividade.cor === cor ? 'border-odara-secondary' : 'border-transparent'}`}
                        onClick={() => setNovaAtividade({ ...novaAtividade, cor })}
                      ></div>
                    ))}
                  </div>
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
                  onClick={salvarAtividade}
                  className="px-4 py-2 bg-odara-accent text-odara-white rounded-lg hover:bg-odara-secondary transition-colors duration-200"
                  disabled={!novaAtividade.titulo || !novaAtividade.data}
                >
                  {editando ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroAtividades;