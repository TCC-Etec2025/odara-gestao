import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaTimes, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
    categoria: 'criativa'
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
  // Mapeamento de categorias com cores correspondentes
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

  // Cores por categoria (não mais por atividade)
  const CORES_CATEGORIAS = {
    [CATEGORIAS.CRIATIVA]: 'bg-odara-primary/60 text-odara-dark',
    [CATEGORIAS.LOGICA]: 'bg-odara-accent/60 text-odara-white',
    [CATEGORIAS.FISICA]: 'bg-odara-secondary/60 text-odara-white',
    [CATEGORIAS.SOCIAL]: 'bg-odara-dropdown-accent/60 text-odara-dark',
    [CATEGORIAS.OUTRA]: 'bg-odara-contorno text-odara-dark'
  };

  // Cores para os marcadores no calendário
  const CORES_CALENDARIO = {
    [CATEGORIAS.CRIATIVA]: 'bg-odara-primary',
    [CATEGORIAS.LOGICA]: 'bg-odara-accent',
    [CATEGORIAS.FISICA]: 'bg-odara-secondary',
    [CATEGORIAS.SOCIAL]: 'bg-odara-dropdown-accent',
    [CATEGORIAS.OUTRA]: 'bg-odara-contorno'
  };

  // Opções de filtro disponíveis
  const FILTROS = [
    { id: 'todos', label: 'Todos' },
    ...Object.values(CATEGORIAS).map(cat => ({
      id: cat,
      label: ROTULOS_CATEGORIAS[cat]
    }))
  ];

  // ===== FUNÇÕES DO REACT CALENDAR =====
  // Obtém as atividades de um dia específico (não mostra concluídas)
  const obterAtividadesDoDia = (data) => {
    return atividades
      .filter(atividade => {
        const dataAtividade = atividade.data;
        return dataAtividade.getDate() === data.getDate() &&
          dataAtividade.getMonth() === data.getMonth() &&
          dataAtividade.getFullYear() === data.getFullYear() &&
          !atividade.concluida;
      })
      .sort((a, b) => {
        const horarioA = a.horario.split(' - ')[0] || '00:00';
        const horarioB = b.horario.split(' - ')[0] || '00:00';
        return horarioA.localeCompare(horarioB);
      });
  };

  // Obtém categorias únicas das atividades de um dia
  const obterCategoriasDoDia = (data) => {
    const atividadesDoDia = atividades.filter(atividade => {
      const dataAtividade = atividade.data;
      return dataAtividade.getDate() === data.getDate() &&
        dataAtividade.getMonth() === data.getMonth() &&
        dataAtividade.getFullYear() === data.getFullYear() &&
        !atividade.concluida;
    });

    return [...new Set(atividadesDoDia.map(atividade => atividade.categoria))];
  };

  // Verifica se um dia tem atividades
  const diaTemAtividades = (data) => {
    return atividades.some(atividade => {
      const dataAtividade = atividade.data;
      return dataAtividade.getDate() === data.getDate() &&
        dataAtividade.getMonth() === data.getMonth() &&
        dataAtividade.getFullYear() === data.getFullYear() &&
        !atividade.concluida;
    });
  };

  // Retorna a classe CSS para um dia específico no calendário
  const getTileClassName = ({ date, view }) => {
    let classes = [];

    // Dia atual
    const hoje = new Date();
    if (date.getDate() === hoje.getDate() &&
      date.getMonth() === hoje.getMonth() &&
      date.getFullYear() === hoje.getFullYear()) {
      classes.push('!bg-odara-primary/20 font-bold');
    }

    // Dia selecionado pelo filtro
    if (filtroDiaAtivo && filtroDia &&
      date.getDate() === filtroDia.getDate() &&
      date.getMonth() === filtroDia.getMonth() &&
      date.getFullYear() === filtroDia.getFullYear()) {
      classes.push('outline-2 outline outline-odara-accent outline-offset-[-1px]');
    }

    return classes.join(' ');
  };

  // Conteúdo personalizado para cada dia no calendário
  const getTileContent = ({ date, view }) => {
    if (view !== 'month') return null;

    const categoriasDoDia = obterCategoriasDoDia(date);

    return (
      <div className="mt-1 flex justify-center gap-1 flex-wrap">
        {categoriasDoDia.map(categoria => (
          <div
            key={categoria}
            className={`w-2 h-2 rounded-full ${CORES_CALENDARIO[categoria]}`}
            title={ROTULOS_CATEGORIAS[categoria]}
          />
        ))}
      </div>
    );
  };

  // Manipula o clique em um dia do calendário
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

  // Vai para o mês e dia atual
  const irParaHoje = () => {
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
      categoria: 'criativa'
    });
    setEditando(false);
    setIdEditando(null);
    setModalAberto(true);
  };

  // Abre o modal para editar uma atividade existente
  const abrirModalEditar = (id) => {
    const atividadeParaEditar = atividades.find(atividade => atividade.id === id);
    if (atividadeParaEditar) {
      setNovaAtividade({
        titulo: atividadeParaEditar.titulo,
        descricao: atividadeParaEditar.descricao,
        data: atividadeParaEditar.data.toISOString().split('T')[0],
        horario: atividadeParaEditar.horario.split(' - ')[0] || '',
        residentes: atividadeParaEditar.residentes,
        categoria: atividadeParaEditar.categoria
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
            categoria: novaAtividade.categoria
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
        concluida: false
      };
      setAtividades(anterior => [...anterior, novaAtividadeObj]);
    }

    setModalAberto(false);
  };

  // Exclui uma atividade após confirmação
  const excluirAtividade = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta atividade?')) {
      setAtividades(anterior => anterior.filter(atividade => atividade.id !== id));
    }
  };

  // Alterna o status de conclusão de uma atividade
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

  // ===== FILTROS =====
  const atividadesFiltradas = atividades
    .filter(atividade => {
      const passaFiltroCategoria = filtroAtivo === 'todos' || atividade.categoria === filtroAtivo;
      const passaFiltroDia = !filtroDiaAtivo || (
        atividade.data.getDate() === filtroDia.getDate() &&
        atividade.data.getMonth() === filtroDia.getMonth() &&
        atividade.data.getFullYear() === filtroDia.getFullYear()
      );
      const passaFiltroResidente = !residenteSelecionado || atividade.residentes === residenteSelecionado;
      const passaFiltroArquivamento = mostrarArquivadas ? atividade.concluida : !atividade.concluida;

      return passaFiltroCategoria && passaFiltroDia && passaFiltroResidente && passaFiltroArquivamento;
    })
    .sort((a, b) => {
      const comparacaoData = mostrarArquivadas
        ? new Date(b.data) - new Date(a.data)
        : new Date(a.data) - new Date(b.data);

      if (comparacaoData === 0) {
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
                setFiltroResidenteAberto(false);
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
                setFiltroAberto(false);
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

            {/* Filtros ativos */}
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
                  <div
                    key={atividade.id}
                    className={`p-4 rounded-xl hover:shadow-md transition-shadow duration-200 ${CORES_CATEGORIAS[atividade.categoria]}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${CORES_CALENDARIO[atividade.categoria]}`}></span>
                        <p className="text-base font-semibold">
                          {atividade.data.getDate().toString().padStart(2, '0')}/
                          {(atividade.data.getMonth() + 1).toString().padStart(2, '0')}/
                          {atividade.data.getFullYear()}
                          {atividade.horario && ` - ${atividade.horario.split(' - ')[0]}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            className="rounded focus:ring-odara-primary"
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

                    <h6 className="text-xl font-bold mb-1 flex items-center">
                      {atividade.concluida && (
                        <span className="text-odara-secondary mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                          </svg>
                        </span>
                      )}

                      {atividade.titulo}
                    </h6>

                    <p className="text-base mb-2">{atividade.descricao}</p>
                    <div className="flex items-center text-sm">
                      <span className="bg-odara-dropdown text-odara-dropdown-name/60 px-2 py-1 rounded-md text-xs">
                        {ROTULOS_CATEGORIAS[atividade.categoria]}
                      </span>

                      {atividade.residentes && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-odara-name">{atividade.residentes}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Seção do Calendário com React Calendar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
            <div className="flex justify-center mb-5">
              {/* Botão Hoje apenas - centralizado */}
              <button
                onClick={irParaHoje}
                className="bg-odara-accent hover:bg-odara-secondary text-odara-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Hoje
              </button>
            </div>

            <div className="border border-odara-primary rounded-xl shadow-sm overflow-hidden max-w-md mx-auto">
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

            {/* Legenda das cores */}
            <div className="mt-4 p-3 bg-odara-offwhite rounded-lg max-w-md mx-auto">
              <h6 className="font-semibold text-odara-dark mb-2">Legenda das Categorias:</h6>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(CATEGORIAS).map(([chave, valor]) => (
                  <div key={valor} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${CORES_CALENDARIO[valor]}`}></div>
                    <span>{ROTULOS_CATEGORIAS[valor]}</span>
                  </div>
                ))}
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