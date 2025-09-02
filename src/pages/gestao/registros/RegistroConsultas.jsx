import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaFileMedical, FaUserMd, FaCalendarAlt, FaFilePdf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';


const RegistroConsultasMedicas = () => {
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      paciente: "João Silva",
      idade: 72,
      sexo: "Masculino",
      prontuario: "2023001",
      data: "15/01/2023",
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
      data: "16/01/2023",
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

  const [modalAberto, setModalAberto] = useState(false);
  const [consultaEditando, setConsultaEditando] = useState(null);
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtroMes, setFiltroMes] = useState('todos');
  const [infoVisivel, setInfoVisivel] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState('todos');
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  const meses = [
    { id: 'todos', label: 'Todos os meses' },
    { id: 'jan', label: 'JAN' },
    { id: 'fev', label: 'FEV' },
    { id: 'mar', label: 'MAR' },
    { id: 'abr', label: 'ABR' },
    { id: 'mai', label: 'MAI' },
    { id: 'jun', label: 'JUN' },
    { id: 'jul', label: 'JUL' },
    { id: 'ago', label: 'AGO' },
    { id: 'set', label: 'SET' },
    { id: 'out', label: 'OUT' },
    { id: 'nov', label: 'NOV' },
    { id: 'dez', label: 'DEZ' }
  ];

  const pacientes = Array.from(new Set(consultas.map(consulta => consulta.paciente)));

  const abrirModalAdicionar = () => {
    setConsultaEditando(null);
    setModalAberto(true);
  };

  const abrirModalEditar = (consulta) => {
    setConsultaEditando(consulta);
    setModalAberto(true);
  };

  const salvarConsulta = (novaConsulta) => {
    if (consultaEditando) {
      // Atualizar consulta existente
      setConsultas(prev => prev.map(c => c.id === consultaEditando.id ? novaConsulta : c));
    } else {
      // Adicionar nova consulta
      setConsultas(prev => [...prev, { ...novaConsulta, id: Date.now() }]);
    }
    setModalAberto(false);
  };

  const excluirConsulta = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta consulta?')) {
      setConsultas(prev => prev.filter(consulta => consulta.id !== id));
    }
  };

  // Filtrar consultas por mês e paciente
  const consultasFiltradas = consultas.filter(consulta => {
    const mesConsulta = consulta.data.split('/')[1]; // Extrai o mês da data
    return (
      (filtroMes === 'todos' || filtroMes === mesConsulta.toLowerCase().substring(0, 3)) &&
      (pacienteSelecionado === 'todos' || consulta.paciente === pacienteSelecionado)
    );
  });

  return (
    <div className="flex min-h-screen from-odara-offwhite to-odara-primary/30">
      <div className="flex-1 p-6 lg:p-10">
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
            <h1 className="text-3xl font-bold text-odara-dark mr-2">Registro de Consultas Médicas</h1>
            <div className="relative">
              <button
                onMouseEnter={() => setInfoVisivel(true)}
                onMouseLeave={() => setInfoVisivel(false)}
                className="text-odara-accent hover:text-odara-secondary transition-colors duration-200"
              >
                <FaInfoCircle size={20} />
              </button>
              {infoVisivel && (
                <div className="absolute z-10 left-0 top-full mt-2 w-72 p-3 bg-odara-dark text-white text-sm rounded-lg shadow-lg">
                  <p>
                    O Registro de Consultas Médicas é o documento onde serão anotadas todas as informações sobre os atendimentos médicos realizados a um paciente. Deve conter: nome completo, idade, sexo, número de prontuário, data e horário da consulta, profissional responsável, motivo da consulta, histórico e evolução clínica, tratamentos indicados, encaminhamentos, exames solicitados e receitas médicas, assinatura e autenticação.
                  </p>
                  <div className="absolute bottom-full left-4 border-4 border-transparent border-b-odara-dark"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative flex items-center gap-4 mb-6">
            {/* Botão Adicionar */}
            <button
              onClick={abrirModalAdicionar}
              className="bg-odara-accent hover:bg-odara-secondary/90 text-odara-contorno font-medium py-2 px-4 rounded-lg flex items-center transition duration-200 border-2 border-odara-contorno"
            >
              <FaPlus className="mr-2" /> Nova Consulta
            </button>

            {/* Filtro por mês */}
            <div className="relative">
              <button
                className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-odara-dark font-medium hover:bg-odara-primary/10 transition"
                onClick={() => setFiltroAberto(!filtroAberto)}
              >
                <FaFilter className="text-odara-accent mr-2" />
                {meses.find(m => m.id === filtroMes)?.label || 'Filtro'}
              </button>

              {filtroAberto && (
                <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-60 overflow-y-auto">
                  {meses.map(mes => (
                    <button
                      key={mes.id}
                      onClick={() => {
                        setFiltroMes(mes.id);
                        setFiltroAberto(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-odara-primary/10 ${filtroMes === mes.id ? 'bg-odara-primary/20 font-semibold' : ''}`}
                    >
                      {mes.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selecionar por paciente */}
            <div className="relative">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={pacienteSelecionado}
                onChange={(e) => setPacienteSelecionado(e.target.value)}
              >
                <option value="todos">Todos os pacientes</option>
                {pacientes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-odara-offwhite rounded-2xl shadow-lg p-6">
          <div className="space-y-6">
            {consultasFiltradas.map(consulta => (
              <div
                key={consulta.id}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
                onClick={() => setConsultaSelecionada(consulta)}
              >
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
                        <p className="text-odara-dark/70"><span className="font-medium">Data/Horário:</span> {consulta.data} às {consulta.horario}</p>
                        <p className="text-odara-dark/70"><span className="font-medium">Médico:</span> {consulta.medico}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-medium text-odara-dark mb-1">Motivo da consulta:</h4>
                      <p className="text-odara-dark/70">{consulta.motivo}</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-medium text-odara-dark mb-1">Resumo:</h4>
                      <p className="text-odara-dark/70">{consulta.historico}</p>
                    </div>
                    {consulta.anexos && consulta.anexos.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-odara-dark mb-2">Anexos:</h4>
                        <div className="flex space-x-2">
                          {consulta.anexos.map((anexo, index) => (
                            <div key={index} className="flex items-center text-odara-accent">
                              <FaFilePdf className="mr-1" />
                              <span className="text-sm">Anexo_{index + 1}.pdf</span>
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
            ))}
          </div>
        </div>

        {/* Modal para adicionar/editar consulta */}
        {modalAberto && (
          <ModalConsulta
            consulta={consultaEditando}
            onClose={() => setModalAberto(false)}
            onSave={salvarConsulta}
          />
        )}
      </div>
    </div>
  );
};

// Componente Modal para adicionar/editar consultas
const ModalConsulta = ({ consulta, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    consulta || {
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
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-odara-offwhite rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 border-l-4 border-odara-primary">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-odara-dark">
            {consulta ? 'Editar' : 'Nova'} Consulta Médica
          </h2>
          <button onClick={onClose} className="text-odara-dark hover:text-odara-accent transition-colors duration-200">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-odara-dark font-medium mb-2">Paciente *</label>
              <input
                type="text"
                name="paciente"
                value={formData.paciente}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
              />
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
              <label className="block text-odara-dark font-medium mb-2">Sexo *</label>
              <select
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
              >
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-odara-dark font-medium mb-2">Nº Prontuário *</label>
              <input
                type="text"
                name="prontuario"
                value={formData.prontuario}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-odara-dark font-medium mb-2">Data *</label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-odara-dark font-medium mb-2">Horário *</label>
              <input
                type="time"
                name="horario"
                value={formData.horario}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-odara-dark font-medium mb-2">Médico *</label>
              <input
                type="text"
                name="medico"
                value={formData.medico}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Motivo da Consulta *</label>
            <textarea
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Histórico e Evolução Clínica</label>
            <textarea
              name="historico"
              value={formData.historico}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Tratamento Indicado</label>
            <textarea
              name="tratamento"
              value={formData.tratamento}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Exames Solicitados</label>
            <textarea
              name="exames"
              value={formData.exames}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-odara-dark font-medium mb-2">Receitas Médicas</label>
            <textarea
              name="receitas"
              value={formData.receitas}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
              rows="3"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-odara-primary/30 text-odara-dark rounded-lg hover:bg-white transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-odara-accent text-odara-contorno rounded-lg hover:bg-odara-secondary/90 transition-colors duration-200 border-2 border-odara-contorno"
            >
              {consulta ? 'Atualizar' : 'Salvar'} Consulta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroConsultasMedicas;