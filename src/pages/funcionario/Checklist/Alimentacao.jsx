import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaTimes, FaChevronLeft, FaChevronRight, FaInfoCircle } from 'react-icons/fa';
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

  const REFEICOES = ['Café da Manhã', 'Almoço', 'Lanche', 'Jantar'];

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

  // Filtro registros
  const registrosFiltrados = registros.filter(r => {
    const passaDia = !filtroDiaAtivo || (
      filtroDia && r.data.toDateString() === filtroDia.toDateString()
    );
    const passaConcluido = mostrarArquivados ? r.concluido : !r.concluido;
    return passaDia && passaConcluido;
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
      classes.push('!bg-odara-primary/20 font-bold');
    }

    if (filtroDiaAtivo && filtroDia && date.toDateString() === filtroDia.toDateString()) {
      classes.push('outline-2 outline outline-odara-accent outline-offset-[-1px]');
    }

    return classes.join(' ');
  };

  const getTileContent = ({ date, view }) => {
    if (view !== 'month') return null;

    const registrosDoDia = registros.filter(r =>
      r.data.toDateString() === date.toDateString() && !r.concluido
    );

    return (
      <div className="mt-1 flex justify-center gap-1 flex-wrap">
        {registrosDoDia.map((r, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-odara-accent"
            title={`${r.refeicao} - ${r.horario}`}
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
            <div className="flex items-center mb-1"></div>
          
          <Link to="/funcionario/Checklist" className="flex items-center text-odara-dark">
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

        <div className="flex gap-2 mb-4">
          <button onClick={abrirModalAdicionar} className="bg-odara-accent hover:bg-odara-secondary text-white px-4 py-2 rounded flex items-center">
            <FaPlus className="mr-2"/> Novo Registro
          </button>
          <button onClick={() => setMostrarArquivados(!mostrarArquivados)} className="bg-odara-white text-odara-dark px-4 py-2 rounded">
            {mostrarArquivados ? 'Mostrar Próximos' : 'Mostrar Arquivados'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Lista registros */}
          <div className="bg-white rounded-xl shadow p-4 max-h-[600px] overflow-y-auto">
            {registrosFiltrados.length === 0 ? (
              <p className="text-gray-500 text-center">Nenhum registro encontrado</p>
            ) : registrosFiltrados.map(r => (
              <div key={r.id} className="p-4 mb-4 rounded-xl border-l-4 border-odara-primary bg-odara-offwhite">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">{r.refeicao} - {r.horario}</p>
                  <div className="flex gap-2">
                    <button onClick={() => abrirModalEditar(r.id)}><FaEdit/></button>
                    <button onClick={() => excluirRegistro(r.id)}><FaTrash/></button>
                  </div>
                </div>
                <p><strong>Alimento:</strong> {r.alimento}</p>
                <p><strong>Residente(s):</strong> {r.residentes}</p>
                <label className="flex items-center gap-2 mt-2">
                  <input type="checkbox" checked={r.concluido} onChange={() => alternarConclusao(r.id)} />
                  {r.concluido ? 'Concluído' : 'Pendente'}
                </label>
              </div>
            ))}
          </div>

          {/* Calendário */}
          <div className="bg-white rounded-xl shadow p-4 max-w-md mx-auto">
             <div className="mt-4 flex justify-center">
              <button
                onClick={irParaHoje}
                className="bg-odara-accent hover:bg-odara-secondary text-white px-4 py-2 rounded-lg transition mb-4"
              >
                Hoje
              </button>
            </div>
            <Calendar
              value={dataAtual}
              onChange={setDataAtual}
              onClickDay={handleDayClick}
              tileClassName={getTileClassName}
              tileContent={getTileContent}
              locale="pt-BR"
              nextLabel={<FaChevronRight />}
              prevLabel={<FaChevronLeft />}
              next2Label={null}
              prev2Label={null}
              showNeighboringMonth={false}
            />
          </div>
        </div>

        {/* Modal */}
        {modalAberto && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{editando ? 'Editar' : 'Adicionar'} Registro</h2>
                <button onClick={() => setModalAberto(false)}><FaTimes/></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-medium">Data *</label>
                  <input type="date" className="w-full border p-2 rounded" value={novoRegistro.data} onChange={e => setNovoRegistro({...novoRegistro, data:e.target.value})}/>
                </div>

                <div>
                  <label className="block font-medium">Horário</label>
                  <input type="time" className="w-full border p-2 rounded" value={novoRegistro.horario} onChange={e => setNovoRegistro({...novoRegistro, horario:e.target.value})}/>
                </div>

                <div>
                  <label className="block font-medium">Refeição *</label>
                  <select className="w-full border p-2 rounded" value={novoRegistro.refeicao} onChange={e => setNovoRegistro({...novoRegistro, refeicao:e.target.value})}>
                    {REFEICOES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-medium">Alimento *</label>
                  <input type="text" className="w-full border p-2 rounded" value={novoRegistro.alimento} onChange={e => setNovoRegistro({...novoRegistro, alimento:e.target.value})}/>
                </div>

                <div>
                  <label className="block font-medium">Residente(s)</label>
                  <input type="text" className="w-full border p-2 rounded" value={novoRegistro.residentes} onChange={e => setNovoRegistro({...novoRegistro, residentes:e.target.value})}/>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button className="px-4 py-2 border rounded" onClick={() => setModalAberto(false)}>Cancelar</button>
                <button className="px-4 py-2 bg-accent text-white rounded" onClick={salvarRegistro}>Salvar</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Alimentacao;
