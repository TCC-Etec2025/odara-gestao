import React, { useState } from 'react';
import {
  FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle,
  FaFilePdf, FaArrowLeft, FaChevronLeft, FaChevronRight, FaTimes
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const mesesLista = [
  { id: 'todos', label: 'Todos os meses' },
  { id: 'jan', label: 'JAN' }, { id: 'fev', label: 'FEV' }, { id: 'mar', label: 'MAR' },
  { id: 'abr', label: 'ABR' }, { id: 'mai', label: 'MAI' }, { id: 'jun', label: 'JUN' },
  { id: 'jul', label: 'JUL' }, { id: 'ago', label: 'AGO' }, { id: 'set', label: 'SET' },
  { id: 'out', label: 'OUT' }, { id: 'nov', label: 'NOV' }, { id: 'dez', label: 'DEZ' }
];

const mesIdParaIndex = {
  jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
  jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11
};

const Consultas = () => {
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      paciente: "João Silva",
      idade: 72,
      sexo: "Masculino",
      prontuario: "2023001",
      data: new Date(2023, 0, 15), // 15 Jan 2023
      horario: "10:30",
      medico: "Dr. Carlos Mendes",
      motivo: "Check-up regular",
      historico: "Hipertensão controlada com medicamentos",
      tratamento: "Manter uso de Losartana 50mg",
      exames: "Hemograma completo, Eletrocardiograma",
      receitas: "Losartana 50mg - 30 comprimidos",
      anexos: []
    },
    {
      id: 2,
      paciente: "Maria Oliveira",
      idade: 68,
      sexo: "Feminino",
      prontuario: "2023002",
      data: new Date(2023, 0, 16), // 16 Jan 2023
      horario: "14:15",
      medico: "Dra. Ana Santos",
      motivo: "Dor articular no joelho direito",
      historico: "Artrose diagnosticada há 5 anos",
      tratamento: "Fisioterapia 2x por semana, Paracetamol 500mg se necessário",
      exames: "Radiografia do joelho direito",
      receitas: "Paracetamol 500mg - 20 comprimidos",
      anexos: []
    }
  ]);

  // ---- estados de UI ----
  const [modalAberto, setModalAberto] = useState(false);
  const [consultaEditando, setConsultaEditando] = useState(null);
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtroMes, setFiltroMes] = useState('todos');
  const [infoVisivel, setInfoVisivel] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState('todos');
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  // ---- calendario estados ----
  const [dataAtual, setDataAtual] = useState(new Date());

  // ---- utilitários ----
  const pacientes = Array.from(new Set(consultas.map(c => c.paciente).filter(Boolean)));

  // abrir modal adicionar
  const abrirModalAdicionar = () => {
    setConsultaEditando(null);
    setModalAberto(true);
  };

  // abrir modal editar (transforma data para YYYY-MM-DD)
  const abrirModalEditar = (consulta) => {
    const copia = {
      ...consulta,
      data: consulta.data instanceof Date ? consulta.data.toISOString().split('T')[0] : consulta.data
    };
    setConsultaEditando(copia);
    setModalAberto(true);
  };

  // salvar (converte data do input YYYY-MM-DD para Date)
  const salvarConsulta = (novaConsulta) => {
    const form = { ...novaConsulta };
    // se data estiver em formato YYYY-MM-DD, converte
    if (typeof form.data === 'string' && form.data.includes('-')) {
      const [y, m, d] = form.data.split('-').map(Number);
      form.data = new Date(y, m - 1, d);
    }
    if (consultaEditando) {
      // atualização
      setConsultas(prev => prev.map(c => c.id === consultaEditando.id ? { ...form, id: consultaEditando.id } : c));
    } else {
      // inserir
      setConsultas(prev => [...prev, { ...form, id: Date.now() }]);
    }
    setModalAberto(false);
  };

  const excluirConsulta = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta consulta?')) {
      setConsultas(prev => prev.filter(c => c.id !== id));
    }
  };

  // filtro por mês e paciente (para lista)
  const consultasFiltradas = consultas.filter(consulta => {
    const mesConsulta = consulta.data instanceof Date ? consulta.data.getMonth() : null;
    const passaMes = filtroMes === 'todos' || (mesIdParaIndex[filtroMes] === mesConsulta);
    const passaPaciente = pacienteSelecionado === 'todos' || consulta.paciente === pacienteSelecionado;
    return passaMes && passaPaciente;
  }).sort((a,b)=> a.data - b.data || a.horario.localeCompare(b.horario));

  // -------------- função calendário (adaptada) --------------
  const alterarMes = (deslocamento) => {
    setDataAtual(ant => {
      const nova = new Date(ant);
      nova.setMonth(ant.getMonth() + deslocamento);
      return nova;
    });
  };
  const irParaMesAtual = () => setDataAtual(new Date());

  const renderizarCabecalhoCalendario = () => {
    const nomes = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    return `${nomes[dataAtual.getMonth()]} ${dataAtual.getFullYear()}`;
  };

  const obterConsultasDoDia = (dia, mes, ano) => {
    return consultas.filter(c => {
      if (!(c.data instanceof Date)) return false;
      return c.data.getDate() === dia && c.data.getMonth() === mes && c.data.getFullYear() === ano;
    });
  };

  const renderDiasCalendario = () => {
    const firstDay = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
    const lastDay = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const prevMonthLastDay = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0).getDate();
    const today = new Date();
    const days = [];

    // dias mes anterior
    for (let i = firstDayIndex; i > 0; i--) {
      const day = prevMonthLastDay - i + 1;
      days.push(
        <div key={`prev-${day}`} className="flex flex-col aspect-square p-1 bg-odara-name/10 border border-odara-primary text-odara-dark/40">
          <span className="text-xs font-semibold self-end">{day}</span>
        </div>
      );
    }

    // dias mes atual
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === today.getDate() && dataAtual.getMonth() === today.getMonth() && dataAtual.getFullYear() === today.getFullYear();
      const consultasDoDia = obterConsultasDoDia(i, dataAtual.getMonth(), dataAtual.getFullYear());
      days.push(
        <div
          key={`current-${i}`}
          className={`flex flex-col aspect-square p-1 relative ${isToday ? 'bg-odara-primary/20' : 'bg-white'} overflow-y-auto cursor-pointer border border-odara-primary`}
          onClick={() => {
            const clicked = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), i);
            setDataAtual(clicked);
            // selecionar lista filtrando pelo dia
            setFiltroMes('todos');
            setPacienteSelecionado('todos');
            // abrir lista apenas com esse dia
            // por simplicidade, usamos pacienteSelecionado='__dia' trick: mas vamos setar consultaSelecionada para o dia
            setConsultaSelecionada({ dia: clicked });
          }}
        >
          <div className="flex justify-between items-start">
            <span className={`text-xs font-semibold ${isToday ? 'text-odara-white bg-odara-accent rounded-full px-1.5 py-0.5 font-bold' : 'text-odara-accent'} self-end`}>
              {i}
            </span>
            {consultasDoDia.length > 0 && (
              <span className="text-xs text-odara-dropdown-accent font-bold text-center">
                {consultasDoDia.length}
              </span>
            )}
          </div>

          <div className="flex-1 mt-1 space-y-1 overflow-y-auto">
            {consultasDoDia.slice(0,3).map(c => (
              <div key={c.id} className="text-xs p-1 rounded bg-odara-offwhite/60 truncate">
                <div className="font-medium truncate">{c.horario}</div>
                <div className="truncate">{c.paciente}</div>
              </div>
            ))}
            {consultasDoDia.length > 3 && <div className="text-xs text-odara-dark/50">+{consultasDoDia.length - 3} outros</div>}
          </div>
        </div>
      );
    }

    // dias proximo mes (completa 42 células)
    const totalCells = 42;
    const remainingCells = totalCells - (firstDayIndex + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="flex flex-col aspect-square p-1 bg-odara-name/10 border border-odara-primary text-odara-dark/40">
          <span className="text-xs font-semibold self-end">{i}</span>
        </div>
      );
    }

    return days;
  };

  // quando um dia foi selecionado no calendário, filtra lista por esse dia
  const consultasMostradas = (() => {
    if (consultaSelecionada && consultaSelecionada.dia) {
      const dia = consultaSelecionada.dia;
      return consultas.filter(c => c.data instanceof Date &&
        c.data.getDate() === dia.getDate() &&
        c.data.getMonth() === dia.getMonth() &&
        c.data.getFullYear() === dia.getFullYear()
      ).sort((a,b)=> a.horario.localeCompare(b.horario));
    }
    return consultasFiltradas;
  })();

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 p-6 lg:p-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link to="/funcionario/Checklist" className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 mr-3">
              <FaArrowLeft />
            </Link>
            <h1 className="text-3xl font-bold text-odara-dark mr-2">Registro de Consultas Médicas</h1>
            <div className="relative">
              <button onMouseEnter={() => setInfoVisivel(true)} onMouseLeave={() => setInfoVisivel(false)} className="text-odara-accent">
                <FaInfoCircle size={20} />
              </button>
              {infoVisivel && (
                <div className="absolute z-10 left-0 top-full mt-2 w-72 p-3 bg-odara-dropdown text-odara-name text-sm rounded-lg shadow-lg">
                  <h3 className="font-bold mb-2">Registro de Consultas Médicas</h3>
                  <p>
                    O Registro de Consultas Médicas deve conter nome, idade, sexo, prontuário, data e horário, profissional, motivo, histórico, tratamentos, exames, receitas, e anexos.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={irParaMesAtual} className="bg-odara-white hover:bg-odara-primary text-odara-primary hover:text-odara-white font-medium py-2 px-4 rounded-lg">
              Hoje
            </button>
          </div>
        </div>

        {/* filtro e ações */}
        <div className="relative flex items-center gap-4 mb-6">
          <button onClick={abrirModalAdicionar} className="bg-odara-accent hover:bg-odara-secondary/90 text-odara-contorno font-medium py-2 px-4 rounded-lg flex items-center transition duration-200 border-2 border-odara-contorno">
            <FaPlus className="mr-2" /> Registrar Consulta
          </button>

          <div className="relative">
            <button className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-odara-dark font-medium hover:bg-odara-primary/10 transition"
              onClick={() => setFiltroAberto(!filtroAberto)}>
              <FaFilter className="text-odara-accent mr-2" />
              {mesesLista.find(m => m.id === filtroMes)?.label || 'Filtro'}
            </button>

            {filtroAberto && (
              <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-60 overflow-y-auto">
                {mesesLista.map(mes => (
                  <button key={mes.id} onClick={() => { setFiltroMes(mes.id); setFiltroAberto(false); setConsultaSelecionada(null); }}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-odara-primary/10 ${filtroMes === mes.id ? 'bg-odara-primary/20 font-semibold' : ''}`}>
                    {mes.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <select className="border border-gray-300 rounded-lg px-3 py-2"
            value={pacienteSelecionado}
            onChange={(e) => { setPacienteSelecionado(e.target.value); setConsultaSelecionada(null); }}>
            <option value="todos">Todos os pacientes</option>
            {pacientes.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          {/* limpar seleção de dia */}
          {(consultaSelecionada || filtroMes !== 'todos' || pacienteSelecionado !== 'todos') && (
            <button onClick={() => { setConsultaSelecionada(null); setFiltroMes('todos'); setPacienteSelecionado('todos'); }}
              className="px-3 py-2 bg-odara-accent text-white rounded-full">Limpar</button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-odara-offwhite rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-odara-dark mb-4">Próximas Consultas</h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {consultasMostradas.length === 0 ? (
                <div className="p-6 rounded-xl bg-odara-name/10 text-center">
                  <p className="text-odara-dark/60">Nenhuma consulta encontrada</p>
                </div>
              ) : (
                consultasMostradas.map(consulta => (
                  <div key={consulta.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-odara-dark mb-2">{consulta.paciente}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-odara-dark/70"><span className="font-medium">Idade:</span> {consulta.idade} anos</p>
                            <p className="text-odara-dark/70"><span className="font-medium">Sexo:</span> {consulta.sexo}</p>
                            <p className="text-odara-dark/70"><span className="font-medium">Prontuário:</span> {consulta.prontuario}</p>
                          </div>
                          <div>
                            <p className="text-odara-dark/70">
                              <span className="font-medium">Data/Horário:</span> {consulta.data instanceof Date ? `${consulta.data.getDate().toString().padStart(2,'0')}/${(consulta.data.getMonth()+1).toString().padStart(2,'0')}/${consulta.data.getFullYear()}` : consulta.data} às {consulta.horario}
                            </p>
                            <p className="text-odara-dark/70"><span className="font-medium">Médico:</span> {consulta.medico}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium text-odara-dark mb-1">Motivo:</h4>
                          <p className="text-odara-dark/70">{consulta.motivo}</p>
                        </div>

                        {consulta.anexos && consulta.anexos.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium text-odara-dark mb-2">Anexos:</h4>
                            <div className="flex space-x-2">
                              {consulta.anexos.map((anexo, idx) => (
                                <div key={idx} className="flex items-center text-odara-accent">
                                  <FaFilePdf className="mr-1" />
                                  <span className="text-sm">{anexo.name || `Anexo_${idx+1}.pdf`}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <button onClick={(e) => { e.stopPropagation(); abrirModalEditar(consulta); }}
                          className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 p-2 rounded-full hover:bg-odara-accent/10">
                          <FaEdit />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); excluirConsulta(consulta.id); }}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-red-50">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* calendário */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-semibold text-odara-dark">{renderizarCabecalhoCalendario()}</h5>
              <div className="flex items-center gap-2">
                <button onClick={() => alterarMes(-1)} className="p-2 rounded hover:bg-odara-dropdown">
                  <FaChevronLeft />
                </button>
                <button onClick={() => alterarMes(1)} className="p-2 rounded hover:bg-odara-dropdown">
                  <FaChevronRight />
                </button>
              </div>
            </div>

            <div className="border border-odara-primary rounded-xl shadow-sm">
              <div className="grid grid-cols-7 rounded-t-xl border-b border-odara-primary">
                {['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(d => (
                  <div key={d} className="py-2 border-r border-odara-primary bg-odara-accent last:border-r-0 flex items-center justify-center text-sm font-medium text-odara-white">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 rounded-b-xl">
                {renderDiasCalendario()}
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {modalAberto && (
          <ModalConsulta
            consulta={consultaEditando}
            onClose={() => { setModalAberto(false); setConsultaEditando(null); }}
            onSave={salvarConsulta}
          />
        )}
      </div>
    </div>
  );
};

// Modal adaptado para aceitar consulta.data como Date ou como string YYYY-MM-DD
const ModalConsulta = ({ consulta, onClose, onSave }) => {
  const initial = consulta ? {
    ...consulta,
    // se consulta.data é Date, transformar pra YYYY-MM-DD para input date
    data: consulta.data instanceof Date ? consulta.data.toISOString().split('T')[0] : (consulta.data || '')
  } : {
    paciente: '',
    idade: '',
    sexo: 'Masculino',
    prontuario: '',
    data: '',
    horario: '',
    medico: '',
    motivo: '',
    historico: '',
    tratamento: '',
    exames: '',
    receitas: '',
    anexos: []
  };

  const [formData, setFormData] = useState(initial);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'anexos' && files) {
      // transformar FileList em array simples (apenas demo; sem upload backend)
      setFormData(prev => ({ ...prev, anexos: Array.from(files) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-odara-offwhite rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 border-l-4 border-odara-primary">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-odara-dark">{consulta ? 'Editar' : 'Nova'} Consulta Médica</h2>
          <button onClick={onClose} className="text-odara-dark hover:text-odara-accent transition-colors duration-200">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-odara-dark font-medium mb-2">Paciente *</label>
              <input name="paciente" value={formData.paciente} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required />
            </div>
            <div>
              <label className="block text-odara-dark font-medium mb-2">Idade *</label>
              <input name="idade" type="number" value={formData.idade} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required />
            </div>
            <div>
              <label className="block text-odara-dark font-medium mb-2">Sexo *</label>
              <select name="sexo" value={formData.sexo} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required>
                <option>Masculino</option><option>Feminino</option><option>Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-odara-dark font-medium mb-2">Nº Prontuário *</label>
              <input name="prontuario" value={formData.prontuario} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required />
            </div>

            <div>
              <label className="block text-odara-dark font-medium mb-2">Data *</label>
              <input name="data" type="date" value={formData.data} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required />
            </div>
            <div>
              <label className="block text-odara-dark font-medium mb-2">Horário *</label>
              <input name="horario" type="time" value={formData.horario} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required />
            </div>

            <div>
              <label className="block text-odara-dark font-medium mb-2">Médico *</label>
              <input name="medico" value={formData.medico} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" required />
            </div>
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Motivo da Consulta *</label>
            <textarea name="motivo" value={formData.motivo} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" rows="3" required />
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Histórico e Evolução Clínica</label>
            <textarea name="historico" value={formData.historico} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" rows="3" />
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Tratamento Indicado</label>
            <textarea name="tratamento" value={formData.tratamento} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" rows="2" />
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Exames Solicitados</label>
            <textarea name="exames" value={formData.exames} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" rows="2" />
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Receitas Médicas</label>
            <textarea name="receitas" value={formData.receitas} onChange={handleChange} className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" rows="2" />
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Anexos (PDF)</label>
            <input name="anexos" type="file" onChange={handleChange} accept="application/pdf" multiple />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-odara-primary/30 text-odara-dark rounded-lg hover:bg-white">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-odara-accent text-odara-contorno rounded-lg hover:bg-odara-secondary/90 border-2 border-odara-contorno">{consulta ? 'Atualizar' : 'Salvar'} Consulta</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Consultas;
