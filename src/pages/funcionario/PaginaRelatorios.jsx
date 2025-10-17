import React, { useState } from 'react';
import { FaFileAlt, FaSearch, FaEye, FaEdit, FaDownload, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const PaginaRelatorios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const ActionButton = ({ icon: Icon, label, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div className="relative">
        <button
          className="p-2 rounded-full bg-odara-primary text-white transition-all duration-200 transform hover:scale-110 hover:bg-odara-primary/90"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Icon size={16} />
        </button>
        
        {isHovered && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
            <div className="bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
              {label}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const [relatorios, setRelatorios] = useState([
    {
      id: 1,
      tipo: "Relatório Diário",
      residente: "Carlos Silva",
      periodo: "2024-01-15",
      status: "pendente",
      prazo: "2024-01-15",
      prioridade: "alta",
      descricao: "Registro de atividades, alimentação e medicamentos do dia"
    },
    {
      id: 2,
      tipo: "Checklist de Saúde",
      residente: "Maria Oliveira", 
      periodo: "2024-01-15",
      status: "concluido",
      prazo: "2024-01-15",
      prioridade: "media",
      descricao: "Verificação de sinais vitais e condições de saúde"
    },
    {
      id: 3,
      tipo: "Relatório Semanal",
      residente: "João Santos",
      periodo: "08/01/2024 - 14/01/2024",
      status: "pendente",
      prazo: "2024-01-16",
      prioridade: "media",
      descricao: "Resumo semanal de evolução e ocorrências"
    },
    {
      id: 4,
      tipo: "Registro de Medicamentos",
      residente: "Carlos Silva",
      periodo: "2024-01-15",
      status: "concluido",
      prazo: "2024-01-15",
      prioridade: "alta",
      descricao: "Controle de administração de medicamentos"
    },
    {
      id: 5,
      tipo: "Relatório de Incidentes",
      residente: "Maria Oliveira",
      periodo: "2024-01-14",
      status: "atrasado",
      prazo: "2024-01-14",
      prioridade: "alta",
      descricao: "Registro de queda durante transferência"
    }
  ]);

  // Filtrar relatórios
  const filteredRelatorios = relatorios.filter(relatorio => {
    const matchesSearch = 
      relatorio.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      relatorio.residente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      relatorio.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filtroStatus === 'todos' || 
      relatorio.status === filtroStatus;
    
    return matchesSearch && matchesStatus;
  });

  const estatisticas = {
    total: relatorios.length,
    pendentes: relatorios.filter(r => r.status === 'pendente').length,
    concluidos: relatorios.filter(r => r.status === 'concluido').length,
    atrasados: relatorios.filter(r => r.status === 'atrasado').length,
    altaPrioridade: relatorios.filter(r => r.prioridade === 'alta' && r.status !== 'concluido').length
  };

  const handlePreencherRelatorio = (relatorio) => {
    console.log('Preencher relatório:', relatorio);
    alert(`Abrindo formulário para: ${relatorio.tipo} - ${relatorio.residente}`);
  };

  const handleVisualizar = (relatorio) => {
    console.log('Visualizar relatório:', relatorio);
    alert(`Visualizando: ${relatorio.tipo} - ${relatorio.residente}`);
  };

  const handleDownload = (relatorio) => {
    // Download do relatório
    console.log('Download relatório:', relatorio);
    alert(`Baixando: ${relatorio.tipo} - ${relatorio.residente}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'concluido':
        return <FaCheckCircle className="text-green-500" />;
      case 'pendente':
        return <FaClock className="text-yellow-500" />;
      case 'atrasado':
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'concluido':
        return 'bg-green-100 text-green-700';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-700';
      case 'atrasado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPrioridadeColor = (prioridade) => {
    switch (prioridade) {
      case 'alta':
        return 'bg-red-100 text-red-700 border border-red-200';
      case 'media':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'baixa':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-odara-offwhite p-6 lg:p-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-odara-dark">Meus Relatórios</h1>
          <p className="text-sm text-odara-dark/70">Relatórios e documentação dos residentes</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-odara-primary">{estatisticas.total}</div>
          <div className="text-sm text-odara-dark/70">Relatórios totais</div>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <FaFileAlt className="text-blue-600 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-odara-dark">{estatisticas.total}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <FaClock className="text-yellow-600 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-odara-dark">{estatisticas.pendentes}</div>
              <div className="text-sm text-gray-500">Pendentes</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-odara-dark">{estatisticas.concluidos}</div>
              <div className="text-sm text-gray-500">Concluídos</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <FaExclamationTriangle className="text-red-600 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-odara-dark">{estatisticas.atrasados}</div>
              <div className="text-sm text-gray-500">Atrasados</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <div className="text-red-600 text-xl font-bold">!</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-odara-dark">{estatisticas.altaPrioridade}</div>
              <div className="text-sm text-gray-500">Alta Prioridade</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="flex items-center">
              <FaSearch className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Buscar por tipo, residente ou descrição..."
                className="w-full p-2 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-odara-primary"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="todos">Todos os status</option>
              <option value="pendente">Pendentes</option>
              <option value="concluido">Concluídos</option>
              <option value="atrasado">Atrasados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Relatórios */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-odara-primary text-odara-contorno">
            <tr>
              <th className="p-4 text-left font-medium">Tipo</th>
              <th className="p-4 text-left font-medium">Residente</th>
              <th className="p-4 text-left font-medium">Período</th>
              <th className="p-4 text-left font-medium">Status</th>
              <th className="p-4 text-left font-medium">Prazo</th>
              <th className="p-4 text-left font-medium">Prioridade</th>
              <th className="p-4 text-left font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRelatorios.map((relatorio) => (
              <tr key={relatorio.id} className="hover:bg-odara-offwhite/60 transition">
                <td className="p-4">
                  <div className="font-medium text-odara-dark">{relatorio.tipo}</div>
                  <div className="text-xs text-gray-500 mt-1">{relatorio.descricao}</div>
                </td>
                <td className="p-4 font-medium">{relatorio.residente}</td>
                <td className="p-4">{relatorio.periodo}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(relatorio.status)}
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(relatorio.status)}`}>
                      {relatorio.status === 'concluido' ? 'Concluído' : 
                       relatorio.status === 'pendente' ? 'Pendente' : 'Atrasado'}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className={`text-sm ${
                    relatorio.status === 'atrasado' ? 'text-red-600 font-medium' : 'text-gray-600'
                  }`}>
                    {new Date(relatorio.prazo).toLocaleDateString('pt-BR')}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPrioridadeColor(relatorio.prioridade)}`}>
                    {relatorio.prioridade === 'alta' ? 'Alta' : 
                     relatorio.prioridade === 'media' ? 'Média' : 'Baixa'}
                  </span>
                </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      {relatorio.status !== 'concluido' ? (
                        <ActionButton
                          icon={FaEdit}
                          label="Preencher"
                          color="green"
                          onClick={() => handlePreencherRelatorio(relatorio)}
                        />
                      ) : (
                        <ActionButton
                          icon={FaEye}
                          label="Visualizar"
                          color="blue"
                          onClick={() => handleVisualizar(relatorio)}
                        />
                      )}
                      <ActionButton
                        icon={FaDownload}
                        label="Download"
                        color="purple"
                        onClick={() => handleDownload(relatorio)}
                      />
                    </div>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contagem e informações */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div>
          Mostrando {filteredRelatorios.length} de {relatorios.length} relatório(s)
        </div>
        <div className="flex space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-100 border border-red-300 rounded mr-1"></div>
            Alta prioridade
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded mr-1"></div>
            Pendente
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded mr-1"></div>
            Concluído
          </div>
        </div>
      </div>

      {/* Mensagem se não houver relatórios */}
      {filteredRelatorios.length === 0 && (
        <div className="text-center py-12">
          <FaFileAlt className="text-gray-300 text-5xl mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            {searchTerm || filtroStatus !== 'todos' ? 'Nenhum relatório encontrado' : 'Nenhum relatório atribuído'}
          </h3>
          <p className="text-gray-400">
            {searchTerm || filtroStatus !== 'todos' 
              ? 'Tente ajustar os filtros de busca' 
              : 'Todos os relatórios estão em dia!'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default PaginaRelatorios;