import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaChevronLeft, FaChevronRight, FaTimes, FaCheck } from 'react-icons/fa';

const RegistroAtividades = () => {
  // Estados para gerenciar atividades, calendário e modal
  const [events, setEvents] = useState([
    {
      id: 1,
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 3),
      time: "10:00 - 11:00",
      title: "Clube do livro",
      description: "Encontro para discutir a leitura da semana",
      category: "criativa",
      person: "João Silva",
      color: "rosa",
      completed: false
    },
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalAberto, setModalAberto] = useState(false);
  const [novaAtividade, setNovaAtividade] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    person: '',
    category: 'criativa',
    color: 'rosa'
  });
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [infoVisivel, setInfoVisivel] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [filtroDia, setFiltroDia] = useState(null);
  const [filtroDiaAtivo, setFiltroDiaAtivo] = useState(false);

  // Categorias e cores
  const CATEGORIAS = {
    CRIATIVA: 'criativa',
    LOGICA: 'logica',
    FISICA: 'fisica',
    SOCIAL: 'social',
    OUTRA: 'outra'
  };

  const CATEGORIA_LABELS = {
    [CATEGORIAS.CRIATIVA]: "Criativa",
    [CATEGORIAS.LOGICA]: "Lógica",
    [CATEGORIAS.FISICA]: "Física",
    [CATEGORIAS.SOCIAL]: "Social",
    [CATEGORIAS.OUTRA]: "Outra"
  };

  const CORES = {
    ROSA: 'rosa',
    MAGENTA: 'magenta',
    AZUL: 'azul',
    AZULDROP: 'azul claro',
    AMARELO: 'amarelo',
    VERMELHO: 'vermelho',
    NEVE: 'neve'
  };

  const CORES_CLASSES = {
    [CORES.ROSA]: 'bg-odara-primary/60 text-odara-dark shadow-sm',
    [CORES.MAGENTA]: 'bg-odara-accent/60 text-odara-white shadow-sm',
    [CORES.AZUL]: 'bg-odara-secondary/60 text-odara-white shadow-sm',
    [CORES.AZULDROP]: 'bg-odara-dropdown-accent/60 text-odara-dark shadow-sm',
    [CORES.AMARELO]: 'bg-odara-contorno text-odara-dark shadow-sm',
    [CORES.VERMELHO]: 'bg-odara-alerta text-odara-white shadow-sm',
    [CORES.NEVE]: 'bg-odara-offwhite text-odara-dark shadow-sm'
  };

  const FILTROS = [
    { id: 'todos', label: 'Todos' },
    ...Object.values(CATEGORIAS).map(cat => ({
      id: cat,
      label: CATEGORIA_LABELS[cat]
    }))
  ];

  // Funções para navegação do calendário
  const mudarMes = (offset) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + offset);
      return newDate;
    });
  };

  const irParaMesAtual = () => {
    setCurrentDate(new Date());
  };

  // Funções para gerenciar atividades
  const abrirModalAdicionar = () => {
    setNovaAtividade({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      person: '',
      category: 'criativa',
      color: 'rosa'
    });
    setEditando(false);
    setIdEditando(null);
    setModalAberto(true);
  };

  const abrirModalEditar = (id) => {
    const atividadeParaEditar = events.find(event => event.id === id);
    if (atividadeParaEditar) {
      setNovaAtividade({
        title: atividadeParaEditar.title,
        description: atividadeParaEditar.description,
        date: atividadeParaEditar.date.toISOString().split('T')[0],
        time: atividadeParaEditar.time.split(' - ')[0] || '',
        person: atividadeParaEditar.person,
        category: atividadeParaEditar.category,
        color: atividadeParaEditar.color
      });
      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  const salvarAtividade = () => {
    if (!novaAtividade.title || !novaAtividade.date) return;

    const dateParts = novaAtividade.date.split('-');
    const eventDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    let timeText = '';
    if (novaAtividade.time) {
      timeText = `${novaAtividade.time}`;
    }

    if (editando && idEditando) {
      // Atualiza existente
      setEvents(prev => prev.map(event =>
        event.id === idEditando
          ? {
            ...event,
            title: novaAtividade.title,
            description: novaAtividade.description,
            date: eventDate,
            time: timeText,
            person: novaAtividade.person,
            category: novaAtividade.category,
            color: novaAtividade.color
          }
          : event
      ));
    } else {
      // Adiciona nova atividade - CORREÇÃO AQUI: mudei o nome da variável
      const novaAtividadeObj = {
        id: Date.now(),
        title: novaAtividade.title,
        description: novaAtividade.description,
        date: eventDate,
        time: timeText,
        person: novaAtividade.person,
        category: novaAtividade.category,
        color: novaAtividade.color,
        completed: false
      };
      setEvents(prev => [...prev, novaAtividadeObj]);
    }

    setModalAberto(false);
  };

  const excluirAtividade = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta atividade?')) {
      setEvents(prev => prev.filter(event => event.id !== id));
    }
  };

  const toggleCompletado = (id) => {
    setEvents(prev => prev.map(event =>
      event.id === id
        ? { ...event, completed: !event.completed }
        : event
    ));

    // Mantém o filtro ativo após marcar como realizado
    if (filtroDiaAtivo) {
      const evento = events.find(e => e.id === id);
      if (evento) {
        setFiltroDia(new Date(evento.date));
        setFiltroDiaAtivo(true);
      }
    }
  };

  // Funções para renderizar o calendário
  const renderCabecalhoCalendario = () => {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  // Função para obter atividades de um dia específico
  const getAtividadesDoDia = (dia, mes, ano) => {
    return events.filter(event => {
      const eventDate = event.date;
      return eventDate.getDate() === dia &&
        eventDate.getMonth() === mes &&
        eventDate.getFullYear() === ano;
    });
  };

  const renderDiasCalendario = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    const today = new Date();

    const days = [];

    // Dias do mês anterior
    for (let i = firstDayIndex; i > 0; i--) {
      const day = prevMonthLastDay - i + 1;
      days.push(
        <div key={`prev-${day}`} className="flex flex-col aspect-square p-1 bg-odara-name/10 border-r border-b border-odara-primary">
          <span className="text-xs font-semibold text-odara-dark/40 self-end">{day}</span>
        </div>
      );
    }

    // Dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

      const atividadesDoDia = getAtividadesDoDia(i, currentDate.getMonth(), currentDate.getFullYear());

      days.push(
        <div
          key={`current-${i}`}
          className={`flex flex-col aspect-square p-1 border-r border-b border-odara-primary relative ${isToday ? 'bg-odara-dropdown' : 'bg-white'} overflow-y-auto cursor-pointer ${filtroDiaAtivo && i === filtroDia.getDate() && currentDate.getMonth() === filtroDia.getMonth() && currentDate.getFullYear() === filtroDia.getFullYear() ? 'ring-2 ring-odara-accent' : ''}`}
          onClick={() => {
            const diaClicado = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            if (filtroDiaAtivo && filtroDia && diaClicado.getDate() === filtroDia.getDate() && diaClicado.getMonth() === filtroDia.getMonth() && diaClicado.getFullYear() === filtroDia.getFullYear()) {
              setFiltroDiaAtivo(false); // Desativa se clicar no mesmo dia
              setFiltroDia(null);
            } else {
              setFiltroDia(diaClicado);
              setFiltroDiaAtivo(true);
            }
          }}
        >
          <div className="flex justify-between items-start">
            <span className={`text-xs font-semibold ${isToday ? 'text-odara-dropdown-accent font-bold' : 'text-odara-accent'} self-end`}>
              {i}
            </span>
            {atividadesDoDia.length > 0 && (
              <span className="text-xs bg-odara-accent text-odara-white rounded-full px-1.5 py-0.5 min-w-[1rem] text-center">
                {atividadesDoDia.length}
              </span>
            )}
          </div>

          {/* atividades do dia */}
          <div className="flex-1 mt-1 space-y-1 overflow-y-auto">
            {atividadesDoDia.map(event => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded ${CORES_CLASSES[event.color]} truncate`}
                title={`${event.time} - ${event.title} - ${event.person}`}
              >
                <div className="font-medium truncate">{event.time}</div>
                <div className="truncate">{event.title}</div>
                <div className="truncate">{event.person}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Dias do próximo mês
    const totalCells = 42; // 6 semanas * 7 dias
    const remainingCells = totalCells - (firstDayIndex + daysInMonth);

    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="flex flex-col aspect-square p-1 bg-odara-name/10 border-r border-b border-odara-primary">
          <span className="text-xs font-semibold text-odara-dark/40 self-end">{i}</span>
        </div>
      );
    }

    return days;
  };

  // Filtrar atividades por categoria e por dia selecionado
  const atividadesFiltradas = events.filter(event => {
    const passaFiltroCategoria = filtroAtivo === 'todos' || event.category === filtroAtivo;
    const passaFiltroDia = !filtroDiaAtivo || (
      event.date.getDate() === filtroDia.getDate() &&
      event.date.getMonth() === filtroDia.getMonth() &&
      event.date.getFullYear() === filtroDia.getFullYear()
    );

    return passaFiltroCategoria && passaFiltroDia;
  });

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 p-6 lg:p-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
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
                    Gerencie suas atividades de forma fácil e organizada.
                    Adicione novas atividades, marque como concluídas e filtre por categorias ou residentes.
                  </p>
                  <div className="absolute bottom-full left-4 border-4 border-transparent border-b-gray-800"></div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={irParaMesAtual}
            className="bg-odara-white hover:bg-odara-primary text-odara-primary hover:text-odara-white font-medium py-2 px-4 rounded-lg"
          >
            Hoje
          </button>
        </div>

        <div className="relative flex items-center gap-4 mb-6">
          {/* Botão Adicionar */}
          <button
            onClick={abrirModalAdicionar}
            className="bg-odara-accent hover:bg-odara-secondary text-odara-contorno font-emibold py-2 px-4 rounded-lg flex items-center transition duration-200"
          >
            <FaPlus className="mr-2 text-odara-white" /> Nova Atividade
          </button>

          {/* Filtros */}
          <div className="relative">
            <button
              className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
              onClick={() => setFiltroAberto(!filtroAberto)}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Filtro
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

          {filtroDiaAtivo && (
            <button
              onClick={() => {
                setFiltroDiaAtivo(false);
                setFiltroDia(null);
              }}
              className="flex items-center bg-odara-accent text-odara-white rounded-full px-4 py-2 shadow-sm font-medium hover:bg-odara-secondary transition"
            >
              <FaTimes className="mr-1" /> Limpar Filtro
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Seção de Próximas Atividades */}
          <div className="bg-odara-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-6">
            {/* No cabeçalho da seção de próximas atividades, adicione: */}
            <h2 className="text-2xl font-bold text-odara-dark flex items-center">
              Próximas Atividades
              {filtroDiaAtivo && (
                <span className="ml-2 text-sm bg-odara-accent text-odara-white px-2 py-1 rounded-full">
                  Filtrado: {filtroDia.getDate()}/{filtroDia.getMonth() + 1}
                </span>
              )}
            </h2>
            <p className="text-odara-name/60 mb-6">Não perca sua programação</p>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {atividadesFiltradas.length === 0 ? (
                <div className="p-6 rounded-xl bg-odara-name/10 text-center">
                  <p className="text-odara-dark/60">Nenhuma atividade agendada</p>
                </div>
              ) : (
                atividadesFiltradas.map(event => (
                  <div key={event.id} className="p-4 rounded-xl bg-odara-offwhite/60 border-l-2 border-odara-primary hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full bg-${event.color}-600`}></span>
                        <p className="text-base font-semibold text-odara-primary">
                          {event.date.getDate()} de {event.date.toLocaleString('pt-BR', { month: 'long' })} de {event.date.getFullYear()}
                          {event.time && ` - ${event.time}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm text-odara-dark">
                          <input
                            type="checkbox"
                            className={`rounded text-${event.color}-600 focus:ring-${event.color}-300`}
                            checked={event.completed}
                            onChange={() => toggleCompletado(event.id)}
                          />
                          Realizado
                        </label>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => abrirModalEditar(event.id)}
                            className="text-odara-secondary hover:text-odara-dropdown-accent transition-colors duration-200 p-1 rounded-full hover:bg-odara-dropdown"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => excluirAtividade(event.id)}
                            className="text-odara-alerta hover:text-odara-accent transition-colors duration-200 p-1 rounded-full hover:bg-odara-alerta/50"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Título da atividade recebe icone de alerta se utilizar a cor vermelha */}
                    <h6 className="text-xl font-bold text-odara-accent mb-1 flex items-center">
                      {event.color === 'vermelho' && (
                        <span className="text-odara-alerta mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </span>
                      )}
                      {event.title}
                    </h6>
                    <p className="text-base text-odara-dark mb-2">{event.description}</p>
                    <div className="flex items-center text-sm">
                      <span className="bg-odara-dropdown text-odara-dropdown-name/60 px-2 py-1 rounded-md text-xs">
                        {CATEGORIA_LABELS[event.category]}
                      </span>
                      {event.person && (
                        <>
                          <span className="mx-2 text-odara-primary">•</span>
                          <span className="text-odara-name">{event.person}</span>
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
              <div className="flex items-center gap-4">
                <h5 className="text-xl font-semibold text-odara-dark">{renderCabecalhoCalendario()}</h5>
                <div className="flex items-center">
                  <button
                    onClick={() => mudarMes(-1)}
                    className="text-odara-primary p-1 rounded transition-all duration-300 hover:text-odara-secondary hover:bg-odara-dropdown"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={() => mudarMes(1)}
                    className="text-odara-primary p-1 rounded transition-all duration-300 hover:text-odara-secondary hover:bg-odara-dropdown"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-odara-primary rounded-xl shadow-sm">
              <div className="grid grid-cols-7 rounded-t-xl border-b border-odara-primary">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="py-2 border-r border-odara-primary bg-odara-accent last:border-r-0 flex items-center justify-center text-sm font-medium text-odara-white">
                    {day}
                  </div>
                ))}
              </div>
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
                    value={novaAtividade.title}
                    onChange={(e) => setNovaAtividade({ ...novaAtividade, title: e.target.value })}
                    placeholder="Digite o título da atividade"
                  />
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Descrição</label>
                  <textarea
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    rows="3"
                    value={novaAtividade.description}
                    onChange={(e) => setNovaAtividade({ ...novaAtividade, description: e.target.value })}
                    placeholder="Digite a descrição da atividade"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Data *</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      value={novaAtividade.date}
                      onChange={(e) => setNovaAtividade({ ...novaAtividade, date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-odara-dark font-medium mb-2">Hora</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                      value={novaAtividade.time}
                      onChange={(e) => setNovaAtividade({ ...novaAtividade, time: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Pessoa Envolvida</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novaAtividade.person}
                    onChange={(e) => setNovaAtividade({ ...novaAtividade, person: e.target.value })}
                    placeholder="Nome da pessoa envolvida"
                  />
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Categoria</label>
                  <select
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novaAtividade.category}
                    onChange={(e) => setNovaAtividade({ ...novaAtividade, category: e.target.value })}
                  >
                    {Object.entries(CATEGORIA_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Cor da Atividade</label>
                  <div className="flex space-x-2">
                    {Object.entries(CORES_CLASSES).map(([color, className]) => (
                      <div
                        key={color}
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${className} ${novaAtividade.color === color ? 'border-odara-secondary' : 'border-transparent'}`}
                        onClick={() => setNovaAtividade({ ...novaAtividade, color })}
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
                  disabled={!novaAtividade.title || !novaAtividade.date}
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