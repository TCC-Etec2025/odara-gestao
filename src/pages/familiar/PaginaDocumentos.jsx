import React, { useState } from 'react';
import { 
  FaArrowLeft, 
  FaFileMedical, 
  FaCalendarAlt, 
  FaUserMd, 
  FaNotesMedical,
  FaPlus,
  FaTimes,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Documentos = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [solicitacaoEditando, setSolicitacaoEditando] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroPaciente, setFiltroPaciente] = useState('todos');
  const [filtroData, setFiltroData] = useState(new Date());
  const [filtroTipo, setFiltroTipo] = useState('todos');

  const [solicitacoes, setSolicitacoes] = useState([
    {
      id: 1,
      paciente: "João Silva",
      idade: 78,
      quarto: "101",
      tipoExame: "Hemograma Completo",
      medicoSolicitante: "Dr. Carlos Mendes",
      dataSolicitacao: new Date(2024, 0, 15),
      dataPrevista: new Date(2024, 0, 20),
      urgencia: "Rotina",
      status: "pendente",
      observacoes: "Verificar plaquetas",
      preparo: "Jejum de 8 horas",
      local: "Laboratório Central"
    },
    {
      id: 2,
      paciente: "Maria Santos",
      idade: 82,
      quarto: "205",
      tipoExame: "Radiografia de Tórax",
      medicoSolicitante: "Dra. Ana Santos",
      dataSolicitacao: new Date(2024, 0, 16),
      dataPrevista: new Date(2024, 0, 18),
      urgencia: "Urgente",
      status: "agendado",
      observacoes: "Avaliar congestão pulmonar",
      preparo: "Nenhum preparo necessário",
      local: "Setor de Radiologia"
    },
    {
      id: 3,
      paciente: "João Silva",
      idade: 78,
      quarto: "101",
      tipoExame: "Eletrocardiograma",
      medicoSolicitante: "Dr. Carlos Mendes",
      dataSolicitacao: new Date(2024, 0, 10),
      dataPrevista: new Date(2024, 0, 12),
      urgencia: "Rotina",
      status: "realizado",
      observacoes: "Controle anual",
      preparo: "Repouso prévio de 15 minutos",
      local: "Cardiologia"
    }
  ]);

  // Tipos de exames disponíveis
  const tiposExames = [
    "Hemograma Completo",
    "Glicemia em Jejum",
    "Colesterol Total e Frações",
    "TGO/TGP",
    "TSH e T4 Livre",
    "Eletrocardiograma",
    "Radiografia de Tórax",
    "Ultrassonografia Abdominal",
    "Densitometria Óssea",
    "Tomografia Computadorizada",
    "Ressonância Magnética",
    "Endoscopia Digestiva"
  ];

  // Níveis de urgência
  const niveisUrgencia = [
    "Rotina",
    "Urgente",
    "Emergência"
  ];

  // Status possíveis
  const STATUS = {
    PENDENTE: "pendente",
    AGENDADO: "agendado",
    REALIZADO: "realizado",
    CANCELADO: "cancelado"
  };

  const pacientes = Array.from(new Set(solicitacoes.map(s => s.paciente)));

  // Funções de formatação
  const formatarData = (data) => {
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatarStatus = (status) => {
    const configs = {
      [STATUS.PENDENTE]: { texto: "Pendente", cor: "bg-yellow-100 text-yellow-800" },
      [STATUS.AGENDADO]: { texto: "Agendado", cor: "bg-blue-100 text-blue-800" },
      [STATUS.REALIZADO]: { texto: "Realizado", cor: "bg-green-100 text-green-800" },
      [STATUS.CANCELADO]: { texto: "Cancelado", cor: "bg-red-100 text-red-800" }
    };
    return configs[status] || configs[STATUS.PENDENTE];
  };

  // CRUD
  const abrirModalNovaSolicitacao = () => {
    setSolicitacaoEditando(null);
    setModalAberto(true);
  };

  const abrirModalEditar = (solicitacao) => {
    setSolicitacaoEditando({
      ...solicitacao,
      dataSolicitacao: solicitacao.dataSolicitacao.toISOString().split('T')[0],
      dataPrevista: solicitacao.dataPrevista.toISOString().split('T')[0]
    });
    setModalAberto(true);
  };

  const salvarSolicitacao = (novaSolicitacao) => {
    const form = { 
      ...novaSolicitacao,
      dataSolicitacao: new Date(novaSolicitacao.dataSolicitacao),
      dataPrevista: new Date(novaSolicitacao.dataPrevista)
    };

    if (solicitacaoEditando) {
      setSolicitacoes(prev => prev.map(s => 
        s.id === solicitacaoEditando.id ? { ...form, id: solicitacaoEditando.id } : s
      ));
    } else {
      setSolicitacoes(prev => [...prev, { ...form, id: Date.now() }]);
    }
    setModalAberto(false);
  };

  const cancelarSolicitacao = (id) => {
    if (window.confirm('Tem certeza que deseja cancelar esta solicitação?')) {
      setSolicitacoes(prev => prev.map(s => 
        s.id === id ? { ...s, status: STATUS.CANCELADO } : s
      ));
    }
  };

  // Filtragem
  const solicitacoesFiltradas = solicitacoes.filter(solicitacao => {
    const passaStatus = filtroStatus === 'todos' || solicitacao.status === filtroStatus;
    const passaPaciente = filtroPaciente === 'todos' || solicitacao.paciente === filtroPaciente;
    const passaTipo = filtroTipo === 'todos' || solicitacao.tipoExame === filtroTipo;
    
    const dataSolicitacao = new Date(solicitacao.dataSolicitacao);
    const dataFiltro = new Date(filtroData);
    const passaData = dataSolicitacao.toDateString() === dataFiltro.toDateString();

    return passaStatus && passaPaciente && passaTipo && passaData;
  });

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 flex flex-col items-center px-4 py-6 lg:px-10 lg:py-10">
        <div className="w-full max-w-6xl mb-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <Link
                to="/familiar"
                className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 mr-3"
              >
                <FaArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl lg:text-3xl font-bold text-odara-dark">
                Solicitação de Exames
              </h1>
            </div>
          </div>
        </div>

        {/* ===== BARRA DE AÇÕES E FILTROS ===== */}
        <div className="w-full max-w-6xl flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {/* Filtro de Status */}
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="bg-white rounded-full px-4 py-2 shadow-sm border-2 border-odara-primary/40 text-gray-700 font-medium hover:border-odara-primary transition text-sm"
            >
              <option value="todos">Todos os status</option>
              <option value={STATUS.PENDENTE}>Pendentes</option>
              <option value={STATUS.AGENDADO}>Agendados</option>
              <option value={STATUS.REALIZADO}>Realizados</option>
              <option value={STATUS.CANCELADO}>Cancelados</option>
            </select>

            {/* Filtro de Paciente */}
            <select
              value={filtroPaciente}
              onChange={(e) => setFiltroPaciente(e.target.value)}
              className="bg-white rounded-full px-4 py-2 shadow-sm border-2 border-odara-primary/40 text-gray-700 font-medium hover:border-odara-primary transition text-sm"
            >
              <option value="todos">Todos os pacientes</option>
              {pacientes.map(paciente => (
                <option key={paciente} value={paciente}>{paciente}</option>
              ))}
            </select>

            {/* Filtro de Tipo */}
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="bg-white rounded-full px-4 py-2 shadow-sm border-2 border-odara-primary/40 text-gray-700 font-medium hover:border-odara-primary transition text-sm"
            >
              <option value="todos">Todos os tipos</option>
              {tiposExames.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>

            {/* Filtro de Data */}
            <input
              type="date"
              value={filtroData.toISOString().split('T')[0]}
              onChange={(e) => setFiltroData(new Date(e.target.value))}
              className="bg-white rounded-full px-4 py-2 shadow-sm border-2 border-odara-primary/40 text-gray-700 font-medium hover:border-odara-primary transition text-sm"
            />
          </div>

          <button
            onClick={abrirModalNovaSolicitacao}
            className="flex items-center bg-odara-accent hover:bg-odara-secondary text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            <FaPlus className="mr-2" />
            Nova Solicitação
          </button>
        </div>

        <div className="w-full max-w-6xl bg-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {(filtroStatus !== 'todos' || filtroPaciente !== 'todos' || filtroTipo !== 'todos') && (
              <>
                {filtroStatus !== 'todos' && (
                  <span className="bg-odara-primary/20 text-odara-primary font-bold px-3 py-1 rounded-full text-sm">
                    Status: {formatarStatus(filtroStatus).texto}
                  </span>
                )}
                {filtroPaciente !== 'todos' && (
                  <span className="bg-odara-accent/20 text-odara-accent font-bold px-3 py-1 rounded-full text-sm">
                    Paciente: {filtroPaciente}
                  </span>
                )}
                {filtroTipo !== 'todos' && (
                  <span className="bg-odara-secondary/20 text-odara-secondary font-bold px-3 py-1 rounded-full text-sm">
                    Tipo: {filtroTipo}
                  </span>
                )}
                <button
                  onClick={() => {
                    setFiltroStatus('todos');
                    setFiltroPaciente('todos');
                    setFiltroTipo('todos');
                    setFiltroData(new Date());
                  }}
                  className="flex items-center bg-odara-accent text-white rounded-full px-3 py-1 text-sm font-medium hover:bg-odara-secondary transition"
                >
                  <FaTimes className="mr-1" /> Limpar Filtros
                </button>
              </>
            )}
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              Total: {solicitacoesFiltradas.length}
            </span>
          </div>

          <div className="space-y-4">
            {solicitacoesFiltradas.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FaFileMedical size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Nenhuma solicitação de exame encontrada para os filtros selecionados.</p>
              </div>
            ) : (
              solicitacoesFiltradas.map((solicitacao) => {
                const statusConfig = formatarStatus(solicitacao.status);
                return (
                  <div key={solicitacao.id} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between p-4 bg-odara-primary/10 rounded-t-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-odara-accent p-2 rounded-lg">
                          <FaFileMedical className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-odara-dark text-lg">
                            {solicitacao.tipoExame}
                          </h3>
                          <p className="text-sm text-odara-dark/60">
                            {solicitacao.paciente} • {solicitacao.idade} anos • Quarto {solicitacao.quarto}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.cor}`}>
                          {statusConfig.texto}
                        </span>
                        {solicitacao.status !== STATUS.CANCELADO && solicitacao.status !== STATUS.REALIZADO && (
                          <button
                            onClick={() => cancelarSolicitacao(solicitacao.id)}
                            className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Corpo da Solicitação */}
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Médico Solicitante</label>
                          <p className="text-odara-dark">{solicitacao.medicoSolicitante}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Data Solicitação</label>
                          <p className="text-odara-dark">{formatarData(solicitacao.dataSolicitacao)}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Data Prevista</label>
                          <p className="text-odara-dark">{formatarData(solicitacao.dataPrevista)}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Urgência</label>
                          <p className="text-odara-dark">{solicitacao.urgencia}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Local</label>
                          <p className="text-odara-dark">{solicitacao.local}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Preparo</label>
                          <p className="text-odara-dark">{solicitacao.preparo}</p>
                        </div>
                      </div>

                      {solicitacao.observacoes && (
                        <div className="mt-4">
                          <label className="text-sm font-medium text-gray-500">Observações</label>
                          <p className="text-odara-dark">{solicitacao.observacoes}</p>
                        </div>
                      )}
                    </div>

                    {/* Footer da Solicitação */}
                    <div className="px-4 py-3 bg-gray-50 rounded-b-lg flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Solicitado em: {formatarData(solicitacao.dataSolicitacao)}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => abrirModalEditar(solicitacao)}
                          className="text-odara-accent hover:text-odara-secondary transition-colors px-3 py-1 rounded text-sm font-medium"
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modal de Solicitação */}
      {modalAberto && (
        <ModalSolicitacaoExame
          solicitacao={solicitacaoEditando}
          onClose={() => {
            setModalAberto(false);
            setSolicitacaoEditando(null);
          }}
          onSave={salvarSolicitacao}
          tiposExames={tiposExames}
          niveisUrgencia={niveisUrgencia}
          pacientes={pacientes}
        />
      )}
    </div>
  );
};

// Componente Modal para Solicitação de Exame
const ModalSolicitacaoExame = ({ solicitacao, onClose, onSave, tiposExames, niveisUrgencia, pacientes }) => {
  const initial = solicitacao ? {
    ...solicitacao
  } : {
    paciente: '',
    idade: '',
    quarto: '',
    tipoExame: '',
    medicoSolicitante: '',
    dataSolicitacao: new Date().toISOString().split('T')[0],
    dataPrevista: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    urgencia: 'Rotina',
    status: 'pendente',
    observacoes: '',
    preparo: '',
    local: ''
  };

  const [formData, setFormData] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-l-4 border-odara-primary">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-odara-dark">
            {solicitacao ? 'Editar' : 'Nova'} Solicitação de Exame
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dados do Paciente */}
            <div className="md:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-semibold text-odara-dark mb-4 flex items-center gap-2">
                <FaUserMd className="text-odara-accent" />
                Dados do Paciente
              </h3>
            </div>
            
            <div>
              <label className="block text-odara-dark font-medium mb-2">Paciente *</label>
              <select
                name="paciente"
                value={formData.paciente}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
              >
                <option value="">Selecione o paciente</option>
                {pacientes.map(paciente => (
                  <option key={paciente} value={paciente}>{paciente}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-odara-dark font-medium mb-2">Idade *</label>
              <input
                type="number"
                name="idade"
                value={formData.idade}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-odara-dark font-medium mb-2">Quarto *</label>
              <input
                name="quarto"
                value={formData.quarto}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dados do Exame */}
            <div className="md:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-semibold text-odara-dark mb-4 flex items-center gap-2">
                <FaFileMedical className="text-odara-accent" />
                Dados do Exame
              </h3>
            </div>

            <div className="md:col-span-2">
              <label className="block text-odara-dark font-medium mb-2">Tipo de Exame *</label>
              <select
                name="tipoExame"
                value={formData.tipoExame}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
              >
                <option value="">Selecione o tipo de exame</option>
                {tiposExames.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-odara-dark font-medium mb-2">Urgência *</label>
              <select
                name="urgencia"
                value={formData.urgencia}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
              >
                {niveisUrgencia.map(nivel => (
                  <option key={nivel} value={nivel}>{nivel}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-odara-dark font-medium mb-2">Data Solicitação *</label>
              <input
                type="date"
                name="dataSolicitacao"
                value={formData.dataSolicitacao}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-odara-dark font-medium mb-2">Data Prevista *</label>
              <input
                type="date"
                name="dataPrevista"
                value={formData.dataPrevista}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-odara-dark font-medium mb-2">Local *</label>
              <input
                name="local"
                value={formData.local}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
                placeholder="Ex: Laboratório Central"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-odara-dark font-medium mb-2">Médico Solicitante *</label>
              <input
                name="medicoSolicitante"
                value={formData.medicoSolicitante}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
                placeholder="Nome do médico"
              />
            </div>

            <div>
              <label className="block text-odara-dark font-medium mb-2">Preparo Necessário</label>
              <input
                name="preparo"
                value={formData.preparo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                placeholder="Ex: Jejum de 8 horas"
              />
            </div>
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Observações</label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
              placeholder="Observações adicionais sobre o exame..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-odara-primary/30 text-odara-dark rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-odara-accent text-white rounded-lg hover:bg-odara-secondary transition-colors"
            >
              {solicitacao ? 'Atualizar' : 'Solicitar'} Exame
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Documentos;