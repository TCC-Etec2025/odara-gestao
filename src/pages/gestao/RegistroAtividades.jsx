import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaChevronLeft, FaChevronRight, FaTimes, FaCheck } from 'react-icons/fa';

const RegistroAtividades = () => {
  // Estados para gerenciar eventos, calendário e modal
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
  const [novaEvento, setNovaEvento] = useState({ 
    title: '', 
    description: '', 
    date: '', 
    time: '', 
    person: '', 
    category: '', 
    color: '' 
  });
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [infoVisivel, setInfoVisivel] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState(false);

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
    [CORES.ROSA]: 'bg-odara-primary/50 text-odara-dark',
    [CORES.MAGENTA]: 'bg-odara-accent/50 text-odara-dark',
    [CORES.AZUL]: 'bg-odara-secondary/50 text-odara-dark',
    [CORES.AZULDROP]: 'bg-odara-dropdown-accent/50 text-odara-dark',
    [CORES.AMARELO]: 'bg-odara-contorno text-odara-dark',
    [CORES.VERMELHO]: 'bg-odara-alerta/60 text-odara-dark',
    [CORES.NEVE]: 'bg-odara-offwhite text-odara-dark'
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

  // Funções para gerenciar eventos
  const abrirModalAdicionar = () => {
    setNovaEvento({ 
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
    const eventoParaEditar = events.find(event => event.id === id);
    if (eventoParaEditar) {
      setNovaEvento({
        title: eventoParaEditar.title,
        description: eventoParaEditar.description,
        date: eventoParaEditar.date.toISOString().split('T')[0],
        time: eventoParaEditar.time.split(' - ')[0] || '',
        person: eventoParaEditar.person,
        category: eventoParaEditar.category,
        color: eventoParaEditar.color
      });
      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  const salvarEvento = () => {
    if (!novaEvento.title || !novaEvento.date) return;

    const dateParts = novaEvento.date.split('-');
    const eventDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    
    let timeText = '';
    if (novaEvento.time) {
      timeText = `${novaEvento.time}`;
    }

    if (editando && idEditando) {
      // Atualiza existente
      setEvents(prev => prev.map(event =>
        event.id === idEditando
          ? {
            ...event,
            title: novaEvento.title,
            description: novaEvento.description,
            date: eventDate,
            time: timeText,
            person: novaEvento.person,
            category: novaEvento.category,
            color: novaEvento.color
          }
          : event
      ));
    } else {
      // Adiciona novo 
      const novoEvento = {
        id: Date.now(),
        title: novaEvento.title,
        description: novaEvento.description,
        date: eventDate,
        time: timeText,
        person: novaEvento.person,
        category: novaEvento.category,
        color: novaEvento.color,
        completed: false
      };
      setEvents(prev => [...prev, novoEvento]);
    }

    setModalAberto(false);
  };

  const excluirEvento = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      setEvents(prev => prev.filter(event => event.id !== id));
    }
  };

  const toggleCompletado = (id) => {
    setEvents(prev => prev.map(event =>
      event.id === id
        ? { ...event, completed: !event.completed }
        : event
    ));
  };

  // Funções para renderizar o calendário
  const renderCabecalhoCalendario = () => {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                       "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  // Função para obter eventos de um dia específico
  const getEventosDoDia = (dia, mes, ano) => {
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
        <div key={`prev-${day}`} className="flex flex-col aspect-square p-1 bg-gray-50 border-r border-b border-gray-200">
          <span className="text-xs font-semibold text-gray-400 self-end">{day}</span>
        </div>
      );
    }
    
    // Dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === today.getDate() && 
                     currentDate.getMonth() === today.getMonth() && 
                     currentDate.getFullYear() === today.getFullYear();
      
      const eventosDoDia = getEventosDoDia(i, currentDate.getMonth(), currentDate.getFullYear());
      
      days.push(
        <div 
          key={`current-${i}`} 
          className={`flex flex-col aspect-square p-1 border-r border-b border-gray-200 relative ${isToday ? 'bg-odara-dropdown' : 'bg-white'} overflow-y-auto`}
        >
          <span className={`text-xs font-semibold ${isToday ? 'text-odara-dropdown-accent font-bold' : 'text-gray-900'} self-end`}>
            {i}
          </span>
          
          {/* Eventos do dia */}
          <div className="flex-1 mt-1 space-y-1 overflow-y-auto">
            {eventosDoDia.map(event => (
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
        <div key={`next-${i}`} className="flex flex-col aspect-square p-1 bg-gray-50 border-r border-b border-gray-200">
          <span className="text-xs font-semibold text-gray-400 self-end">{i}</span>
        </div>
      );
    }
    
    return days;
  };

  // Filtrar eventos por categoria
  const eventosFiltrados = events.filter(event => 
    filtroAtivo === 'todos' || event.category === filtroAtivo
  );

  return (
    <div className="flex min-h-screen bg-stone-50">
      <div className="flex-1 p-6 lg:p-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-gray-900 mr-2">Calendário de Eventos</h1>
            <div className="relative">
              <button
                onMouseEnter={() => setInfoVisivel(true)}
                onMouseLeave={() => setInfoVisivel(false)}
                className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                <FaInfoCircle size={20} />
              </button>
              {infoVisivel && (
                <div className="absolute z-10 left-0 top-full mt-2 w-72 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg">
                  <h3 className="font-bold mb-2">Calendário de Eventos</h3>
                  <p>
                    Gerencie seus eventos e compromissos de forma fácil e organizada. 
                    Adicione novos eventos, marque como concluídos e filtre por categorias.
                  </p>
                  <div className="absolute bottom-full left-4 border-4 border-transparent border-b-gray-800"></div>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={irParaMesAtual}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Hoje
          </button>
        </div>

        <div className="relative flex items-center gap-4 mb-6">
          {/* Botão Adicionar */}
          <button
            onClick={abrirModalAdicionar}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition duration-200"
          >
            <FaPlus className="mr-2" /> Novo Evento
          </button>

          {/* Filtros */}
          <div className="relative">
            <button
              className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
              onClick={() => setFiltroAberto(!filtroAberto)}
            >
              <FaFilter className="text-indigo-600 mr-2" />
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Seção de Próximos Eventos */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Próximos Eventos</h2>
            <p className="text-gray-600 mb-6">Não perca sua programação</p>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {eventosFiltrados.length === 0 ? (
                <div className="p-6 rounded-xl bg-gray-50 text-center">
                  <p className="text-gray-500">Nenhum evento agendado</p>
                </div>
              ) : (
                eventosFiltrados.map(event => (
                  <div key={event.id} className="p-4 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full bg-${event.color}-600`}></span>
                        <p className="text-base font-medium text-gray-900">
                          {event.date.getDate()} de {event.date.toLocaleString('pt-BR', { month: 'long' })} de {event.date.getFullYear()}
                          {event.time && ` - ${event.time}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm text-gray-600">
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
                            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200 p-1 rounded-full hover:bg-indigo-100"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => excluirEvento(event.id)}
                            className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                    <h6 className="text-xl font-semibold text-black mb-1">{event.title}</h6>
                    <p className="text-base text-gray-600 mb-2">{event.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">
                        {CATEGORIA_LABELS[event.category]}
                      </span>
                      {event.person && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{event.person}</span>
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
                <h5 className="text-xl font-semibold text-gray-900">{renderCabecalhoCalendario()}</h5>
                <div className="flex items-center">
                  <button 
                    onClick={() => mudarMes(-1)}
                    className="text-indigo-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-indigo-600"
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    onClick={() => mudarMes(1)}
                    className="text-indigo-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-indigo-600"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-xl shadow-sm">
              <div className="grid grid-cols-7 rounded-t-xl border-b border-gray-200">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="py-2 border-r border-gray-200 bg-gray-50 last:border-r-0 flex items-center justify-center text-sm font-medium text-gray-700">
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

        {/* Modal para adicionar/editar evento */}
        {modalAberto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border-l-4 border-indigo-500">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editando ? 'Editar' : 'Adicionar'} Evento
                </h2>
                <button 
                  onClick={() => setModalAberto(false)} 
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Título do Evento *</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={novaEvento.title}
                    onChange={(e) => setNovaEvento({ ...novaEvento, title: e.target.value })}
                    placeholder="Digite o título do evento"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Descrição</label>
                  <textarea 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    rows="3"
                    value={novaEvento.description}
                    onChange={(e) => setNovaEvento({ ...novaEvento, description: e.target.value })}
                    placeholder="Digite a descrição do evento"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Data *</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={novaEvento.date}
                      onChange={(e) => setNovaEvento({ ...novaEvento, date: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Hora</label>
                    <input 
                      type="time" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={novaEvento.time}
                      onChange={(e) => setNovaEvento({ ...novaEvento, time: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Pessoa Envolvida</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={novaEvento.person}
                    onChange={(e) => setNovaEvento({ ...novaEvento, person: e.target.value })}
                    placeholder="Nome da pessoa envolvida"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Categoria</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={novaEvento.category}
                    onChange={(e) => setNovaEvento({ ...novaEvento, category: e.target.value })}
                  >
                    {Object.entries(CATEGORIA_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Cor do Evento</label>
                  <div className="flex space-x-2">
                    {Object.entries(CORES_CLASSES).map(([color, className]) => (
                      <div 
                        key={color}
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${className} ${novaEvento.color === color ? 'border-gray-800' : 'border-transparent'}`}
                        onClick={() => setNovaEvento({ ...novaEvento, color })}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setModalAberto(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button 
                  onClick={salvarEvento}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  disabled={!novaEvento.title || !novaEvento.date}
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