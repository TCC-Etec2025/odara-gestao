import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaTimes, FaChevronLeft, FaChevronRight, FaInfoCircle, FaFilter } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';

const Alimentacao = () => {
  const [registros, setRegistros] = useState([
    {
      id: 1,
      data: new Date(),
      horario: '08:00',
      refeicao: 'Café da Manhã',
      alimento: 'Pão, leite, fruta',
      residentes: 'João Santos',
      concluido: true
    },
    {
      id: 2,
      data: new Date(),
      horario: '12:00',
      refeicao: 'Almoço',
      alimento: 'Arroz, feijão, frango',
      residentes: 'Maria Oliveira',
      concluido: false
    },
    {
      id: 3,
      data: new Date(),
      horario: '15:30',
      refeicao: 'Lanche',
      alimento: 'Bolo e suco',
      residentes: 'João Santos',
      concluido: false
    },
    {
      id: 4,
      data: new Date(),
      horario: '19:00',
      refeicao: 'Jantar',
      alimento: 'Sopa e sanduíche',
      residentes: 'Ana Costa',
      concluido: false
    },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [novoRegistro, setNovoRegistro] = useState({
    data: new Date().toISOString().split('T')[0],
    horario: '',
    refeicao: 'Café da Manhã',
    alimento: '',
    residentes: ''
  });
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [dataAtual, setDataAtual] = useState(new Date());
  const [filtroDia, setFiltroDia] = useState(null);
  const [filtroDiaAtivo, setFiltroDiaAtivo] = useState(false);
  const [mostrarArquivados, setMostrarArquivados] = useState(false);
  const [infoVisivel, setInfoVisivel] = useState(false);

  // Novos estados para filtros
  const [filtroResidente, setFiltroResidente] = useState('');
  const [filtroRefeicao, setFiltroRefeicao] = useState('todos');
  const [filtroResidenteAberto, setFiltroResidenteAberto] = useState(false);
  const [filtroRefeicaoAberto, setFiltroRefeicaoAberto] = useState(false);

  // Constantes para refeições
  const REFEICOES = {
    CAFE_MANHA: 'Café da Manhã',
    ALMOCO: 'Almoço',
    LANCHE: 'Lanche',
    JANTAR: 'Jantar'
  };

  const ROTULOS_REFEICOES = {
    [REFEICOES.CAFE_MANHA]: "Café da Manhã",
    [REFEICOES.ALMOCO]: "Almoço",
    [REFEICOES.LANCHE]: "Lanche",
    [REFEICOES.JANTAR]: "Jantar"
  };

  // Cores para cada tipo de refeição
  const CORES_REFEICOES = {
    [REFEICOES.CAFE_MANHA]: 'bg-odara-primary/60 text-odara-dark',
    [REFEICOES.ALMOCO]: 'bg-odara-accent/60 text-white',
    [REFEICOES.LANCHE]: 'bg-odara-dropdown-accent/60 text-odara-dark',
    [REFEICOES.JANTAR]: 'bg-odara-secondary/60 text-odara-white'
  };

  // Cores para calendário
  const CORES_CALENDARIO = {
    [REFEICOES.CAFE_MANHA]: 'bg-odara-primary/60',
    [REFEICOES.ALMOCO]: 'bg-odara-accent/60',
    [REFEICOES.LANCHE]: 'bg-odara-dropdown-accent/60',
    [REFEICOES.JANTAR]: 'bg-odara-secondary/60'
  };

  // Abrir modal adicionar
  const abrirModalAdicionar = () => {
    setNovoRegistro({
      data: new Date().toISOString().split('T')[0],
      horario: '',
      refeicao: 'Café da Manhã',
      alimento: '',
      residentes: ''
    });
    setEditando(false);
    setIdEditando(null);
    setModalAberto(true);
  };

  // Abrir modal editar
  const abrirModalEditar = (id) => {
    const registro = registros.find(r => r.id === id);
    if (registro) {
      setNovoRegistro({
        data: registro.data.toISOString().split('T')[0],
        horario: registro.horario,
        refeicao: registro.refeicao,
        alimento: registro.alimento,
        residentes: registro.residentes
      });
      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  // Salvar registro
  const salvarRegistro = () => {
    const dataObj = new Date(novoRegistro.data);

    if (editando && idEditando) {
      setRegistros(prev =>
        prev.map(r => r.id === idEditando ? { ...r, ...novoRegistro, data: dataObj } : r)
      );
    } else {
      const novo = {
        id: Date.now(),
        ...novoRegistro,
        data: dataObj,
        concluido: false
      };
      setRegistros(prev => [...prev, novo]);
    }
    setModalAberto(false);
  };

  // Excluir registro
  const excluirRegistro = (id) => {
    if (window.confirm('Deseja excluir este registro?')) {
      setRegistros(prev => prev.filter(r => r.id !== id));
    }
  };

  // Alternar conclusão
  const alternarConclusao = (id) => {
    setRegistros(prev =>
      prev.map(r => r.id === id ? { ...r, concluido: !r.concluido } : r)
    );
  };

  // Filtro registros atualizado
  const registrosFiltrados = registros.filter(r => {
    const passaDia = !filtroDiaAtivo || (
      filtroDia && r.data.toDateString() === filtroDia.toDateString()
    );
    const passaConcluido = mostrarArquivados ? r.concluido : !r.concluido;
    const passaResidente = !filtroResidente || r.residentes === filtroResidente;
    const passaRefeicao = filtroRefeicao === 'todos' || r.refeicao === filtroRefeicao;
    
    return passaDia && passaConcluido && passaResidente && passaRefeicao;
  }).sort((a, b) => a.data - b.data || a.horario.localeCompare(b.horario));

  // Funções calendário
  const handleDayClick = (value) => {
    if (filtroDiaAtivo && filtroDia && value.toDateString() === filtroDia.toDateString()) {
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

  const getTileClassName = ({ date, view }) => {
    const classes = [];
    const hoje = new Date();

    if (date.toDateString() === hoje.toDateString()) {
      classes.push('!bg-odara-primary/20 font-bold rounded-full');
    }

    if (filtroDiaAtivo && filtroDia && date.toDateString() === filtroDia.toDateString()) {
      classes.push('outline-2 outline outline-odara-accent outline-offset-[-1px] rounded-full');
    }

    return classes.join(' ');
  };

  const obterRefeicoesDoDia = (data) => {
    return registros.filter(r => 
      r.data.toDateString() === data.toDateString() && !r.concluido
    );
  };

  const getTileContent = ({ date, view }) => {
    if (view !== 'month') return null;

    const refeicoesDoDia = obterRefeicoesDoDia(date);
    const refeicoesUnicas = [...new Set(refeicoesDoDia.map(r => r.refeicao))];

    return (
      <div className="mt-1 flex justify-center gap-1 flex-wrap">
        {refeicoesUnicas.map((refeicao, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${CORES_CALENDARIO[refeicao]}`}
            title={refeicao}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 p-6 lg:p-10">
        {/* Cabeçalho */}
        <div className="flex justify-start items-center mb-6">
          <div className="flex items-center">
            <Link to="/funcionario/Checklist" className="flex items-center text-odara-accent mr-4">
              <FaArrowLeft className="mr-1"/>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-odara-dark mr-2">Registro Alimentar</h1>
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
                <h3 className="font-bold mb-2">Registro Alimentar</h3>
                <p>
                  O Registro de Quadro Alimentar é o documento no qual serão adicionadas as informações sobre as refeições oferecidas aos residentes, incluindo detalhes como horário, tipo de refeição, alimentos servidos e os residentes que participaram. Esse registro é essencial para monitorar a nutrição e garantir que as necessidades alimentares de cada residente sejam atendidas adequadamente.
                </p>
                <div className="absolute bottom-full left-4 border-4 border-transparent border-b-gray-800"></div>
              </div>
            )}
          </div>
        </div>

        {/* Barra de Filtros */}
        <div className="relative flex items-center gap-4 mb-6">
          {/* Botão Adicionar */}
          <button 
            onClick={abrirModalAdicionar}
            className="bg-odara-accent hover:bg-odara-secondary text-odara-contorno font-emibold py-2 px-4 rounded-lg flex items-center transition duration-200"
          >
            <FaPlus className="mr-2 text-odara-white" /> Novo Registro
          </button>

          {/* Filtro por Residente */}
          <div className="relative">
            <button
              className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition w-40 justify-center"
              onClick={() => {
                setFiltroResidenteAberto(!filtroResidenteAberto);
                setFiltroRefeicaoAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Residentes
            </button>

            {filtroResidenteAberto && (
              <div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={() => {
                    setFiltroResidente('');
                    setFiltroResidenteAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${!filtroResidente ? 'bg-indigo-100 font-semibold' : ''}`}
                >
                  Todos
                </button>
                {[...new Set(registros.map(r => r.residentes).filter(Boolean))].map(residente => (
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

          {/* Filtro por Refeição */}
          <div className="relative">
            <button
              className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition w-40 justify-center"
              onClick={() => {
                setFiltroRefeicaoAberto(!filtroRefeicaoAberto);
                setFiltroResidenteAberto(false);
              }}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Refeição
            </button>

            {filtroRefeicaoAberto && (
              <div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={() => {
                    setFiltroRefeicao('todos');
                    setFiltroRefeicaoAberto(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${filtroRefeicao === 'todos' ? 'bg-indigo-100 font-semibold' : ''}`}
                >
                  Todas
                </button>
                {Object.values(REFEICOES).map(refeicao => (
                  <button
                    key={refeicao}
                    onClick={() => {
                      setFiltroRefeicao(refeicao);
                      setFiltroRefeicaoAberto(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${filtroRefeicao === refeicao ? 'bg-indigo-100 font-semibold' : ''}`}
                  >
                    {refeicao}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtro Arquivados/Próximos */}
          <button
            onClick={() => setMostrarArquivados(!mostrarArquivados)}
            className={`text-odara-contorno font-emibold py-2 px-4 rounded-lg flex items-center transition duration-200 ${
              mostrarArquivados 
                ? 'bg-odara-secondary text-odara-white border-odara-secondary'
                : 'bg-odara-accent hover:bg-odara-secondary text-odara-white'
            }`}
          >
            <FaFilter className="mr-2" />
            {mostrarArquivados ? 'Próximas' : 'Arquivadas'}
          </button>

          {/* Botão Limpar Filtros */}
          {(filtroDiaAtivo || filtroResidente || filtroRefeicao !== 'todos') && (
            <button
              onClick={() => {
                setFiltroDiaAtivo(false);
                setFiltroDia(null);
                setFiltroResidente('');
                setFiltroRefeicao('todos');
              }}
              className="flex items-center bg-odara-accent text-odara-white rounded-full px-4 py-2 shadow-sm font-medium hover:bg-odara-secondary transition"
            >
              <FaTimes className="mr-1" /> Limpar Filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Lista registros */}
          <div className="bg-odara-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-odara-dark flex items-center mb-2">
              {mostrarArquivados ? 'Refeições Arquivadas' : 'Próximas Refeições'}
            </h2>

            {/* Filtros ativos */}
            <div className="flex flex-wrap gap-2 mb-4">
              {filtroDiaAtivo && (
                <span className="text-sm bg-odara-accent text-odara-white px-2 py-1 rounded-full">
                  Dia: {filtroDia.getDate().toString().padStart(2, '0')}/{(filtroDia.getMonth() + 1).toString().padStart(2, '0')}
                </span>
              )}
              {filtroResidente && (
                <span className="text-sm bg-odara-secondary text-odara-white px-2 py-1 rounded-full">
                  Residente: {filtroResidente}
                </span>
              )}
              {filtroRefeicao !== 'todos' && (
                <span className="text-sm bg-odara-primary text-odara-white px-2 py-1 rounded-full">
                  Refeição: {filtroRefeicao}
                </span>
              )}
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {registrosFiltrados.length === 0 ? (
                <div className="p-6 rounded-xl bg-odara-name/10 text-center">
                  <p className="text-odara-dark/60">
                    {mostrarArquivados 
                      ? 'Nenhuma refeição arquivada' 
                      : 'Nenhuma refeição agendada'
                    }
                  </p>
                </div>
              ) : registrosFiltrados.map(r => (
                <div 
                  key={r.id} 
                  className={`p-4 rounded-xl hover:shadow-md transition-shadow duration-200 ${CORES_REFEICOES[r.refeicao]} bg-opacity-20 border-l-4`}
                  style={{ borderLeftColor: CORES_CALENDARIO[r.refeicao].replace('bg-', '').split('-')[0] }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${CORES_CALENDARIO[r.refeicao]}`}></span>
                      <p className="text-base font-semibold">
                        {r.data.getDate().toString().padStart(2, '0')}/
                        {(r.data.getMonth() + 1).toString().padStart(2, '0')}/
                        {r.data.getFullYear()} - {r.horario}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 text-sm">
                        <input 
                          type="checkbox" 
                          className="rounded focus:ring-odara-primary"
                          checked={r.concluido} 
                          onChange={() => alternarConclusao(r.id)} 
                        />
                        {r.concluido ? 'Arquivada' : 'Realizada'}
                      </label>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => abrirModalEditar(r.id)}
                          className="text-odara-secondary hover:text-odara-dropdown-accent transition-colors duration-200 p-1 rounded-full hover:bg-odara-dropdown"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => excluirRegistro(r.id)}
                          className="text-odara-alerta hover:text-odara-accent transition-colors duration-200 p-1 rounded-full hover:bg-odara-alerta/50"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>

                  <h6 className="text-xl font-bold mb-1">{r.refeicao}</h6>
                  <p className="text-base mb-2"><strong>Alimento:</strong> {r.alimento}</p>
                  
                  <div className="flex items-center text-sm">
                    <span className="bg-odara-dropdown text-odara-dropdown-name/60 px-2 py-1 rounded-md text-xs">
                      {r.residentes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendário */}
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
            <div className="flex justify-center mb-5">
              <button
                onClick={irParaHoje}
                className="bg-odara-accent hover:bg-odara-secondary text-odara-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Hoje
              </button>
            </div>

            <div className="border-2 border-odara-primary rounded-xl shadow-sm overflow-hidden max-w-md mx-auto">
              <Calendar
                value={dataAtual}
                onChange={setDataAtual}
                onClickDay={handleDayClick}
                tileClassName={getTileClassName}
                tileContent={getTileContent}
                locale="pt-BR"
                className="border-0"
                showNeighboringMonth={false}
              />
            </div>

            {/* Legenda das cores */}
            <div className="mt-4 p-3 bg-odara-offwhite rounded-lg max-w-md mx-auto">
              <h6 className="font-semibold text-odara-dark mb-2">Legenda das Refeições:</h6>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.values(REFEICOES).map(refeicao => (
                  <div key={refeicao} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${CORES_CALENDARIO[refeicao]}`}></div>
                    <span>{refeicao}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {modalAberto && (
          <div className="fixed inset-0 bg-odara-offwhite/80 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border-l-4 border-odara-primary">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-odara-accent">
                  {editando ? 'Editar' : 'Adicionar'} Registro
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
                  <label className="block text-odara-dark font-medium mb-2">Data *</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novoRegistro.data} 
                    onChange={e => setNovoRegistro({...novoRegistro, data:e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Horário</label>
                  <input 
                    type="time" 
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novoRegistro.horario} 
                    onChange={e => setNovoRegistro({...novoRegistro, horario:e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Refeição *</label>
                  <select 
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novoRegistro.refeicao} 
                    onChange={e => setNovoRegistro({...novoRegistro, refeicao:e.target.value})}
                  >
                    {Object.values(REFEICOES).map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Alimento *</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novoRegistro.alimento} 
                    onChange={e => setNovoRegistro({...novoRegistro, alimento:e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-odara-dark font-medium mb-2">Residente(s)</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novoRegistro.residentes} 
                    onChange={e => setNovoRegistro({...novoRegistro, residentes:e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  className="px-4 py-2 border-2 border-odara-primary text-odara-primary rounded-lg hover:bg-odara-primary hover:text-odara-white transition-colors duration-200"
                  onClick={() => setModalAberto(false)}
                >
                  Cancelar
                </button>
                <button 
                  className="px-4 py-2 bg-odara-accent text-odara-white rounded-lg hover:bg-odara-secondary transition-colors duration-200"
                  onClick={salvarRegistro}
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

export default Alimentacao;