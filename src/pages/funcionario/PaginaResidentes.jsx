import React, { useState } from 'react';
import { FaUserInjured, FaSearch, FaEye, FaNotesMedical, FaClipboardList } from 'react-icons/fa';

const PaginaResidentes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [residentesAtribuidos, setResidentesAtribuidos] = useState([
    { 
      id: 1, 
      nome: "Carlos Silva", 
      quarto: "102", 
      idade: 78, 
      status: "Ativo", 
      cuidados: "Higiênicos, Alimentação",
      ultimoChecklist: "2024-01-15",
      proximaMedicacao: "14:30",
      alertas: "Pressão alta"
    },
    { 
      id: 2, 
      nome: "Maria Oliveira", 
      quarto: "105", 
      idade: 82, 
      status: "Ativo", 
      cuidados: "Mobilidade, Medicamentos",
      ultimoChecklist: "2024-01-15", 
      proximaMedicacao: "16:00",
      alertas: "Diabetes"
    },
    { 
      id: 3, 
      nome: "João Santos", 
      quarto: "201", 
      idade: 75, 
      status: "Ativo", 
      cuidados: "Alimentação, Companhia",
      ultimoChecklist: "2024-01-14",
      proximaMedicacao: "09:00",
      alertas: "Nenhum"
    }
  ]);

  const filteredResidentes = residentesAtribuidos.filter(residente => 
    residente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    residente.quarto.includes(searchTerm) ||
    residente.cuidados.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVerDetalhes = (residente) => {
    console.log('Ver detalhes:', residente);
  };

  const handleRegistrarCuidados = (residente) => {
    // Abrir modal/form para registrar cuidados
    console.log('Registrar cuidados:', residente);
  };

  const handleChecklist = (residente) => {
    // Navegar para checklist do residente
    console.log('Abrir checklist:', residente);
  };

  // Estatísticas para o funcionário
  const estatisticas = {
    total: residentesAtribuidos.length,
    comChecklistHoje: residentesAtribuidos.filter(r => r.ultimoChecklist === new Date().toISOString().split('T')[0]).length,
    comMedicacaoProxima: residentesAtribuidos.filter(r => {
      const horaAtual = new Date().getHours();
      const horaMedicacao = parseInt(r.proximaMedicacao.split(':')[0]);
      return horaMedicacao - horaAtual <= 2 && horaMedicacao >= horaAtual;
    }).length,
    comAlertas: residentesAtribuidos.filter(r => r.alertas !== "Nenhum").length
  };

  return (
    <div className="min-h-screen bg-odara-offwhite p-6 lg:p-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-odara-dark">Meus Residentes</h1>
          <p className="text-sm text-odara-dark/70">Residentes sob sua responsabilidade</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-odara-primary">{estatisticas.total}</div>
          <div className="text-sm text-odara-dark/70">Residentes atribuídos</div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <FaUserInjured className="text-blue-600 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-odara-dark">{estatisticas.total}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <FaClipboardList className="text-green-600 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-odara-dark">{estatisticas.comChecklistHoje}</div>
              <div className="text-sm text-gray-500">Checklist Hoje</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <FaNotesMedical className="text-yellow-600 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-odara-dark">{estatisticas.comMedicacaoProxima}</div>
              <div className="text-sm text-gray-500">Medicação Próxima</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <div className="text-red-600 text-xl font-bold">!</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-odara-dark">{estatisticas.comAlertas}</div>
              <div className="text-sm text-gray-500">Com Alertas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Pesquisa */}
      <div className="bg-white rounded-xl shadow-sm p-2 mb-6">
        <div className="flex items-center">
          <FaSearch className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Buscar residente por nome, quarto ou cuidados..."
            className="w-full p-2 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabela de Residentes Atribuídos */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-odara-primary text-odara-contorno">
            <tr>
              <th className="p-4 text-left font-medium">Residente</th>
              <th className="p-4 text-left font-medium">Quarto</th>
              <th className="p-4 text-left font-medium">Cuidados</th>
              <th className="p-4 text-left font-medium">Último Checklist</th>
              <th className="p-4 text-left font-medium">Próxima Medicação</th>
              <th className="p-4 text-left font-medium">Alertas</th>
              <th className="p-4 text-left font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredResidentes.map((residente) => (
              <tr key={residente.id} className="hover:bg-odara-offwhite/60 transition">
                <td className="p-4">
                  <div className="font-medium text-odara-dark">{residente.nome}</div>
                  <div className="text-xs text-gray-500">{residente.idade} anos</div>
                </td>
                <td className="p-4">
                  <span className="bg-odara-primary/10 text-odara-primary px-2 py-1 rounded text-xs font-medium">
                    {residente.quarto}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-xs text-gray-600 max-w-xs">{residente.cuidados}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    residente.ultimoChecklist === new Date().toISOString().split('T')[0] 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {new Date(residente.ultimoChecklist).toLocaleDateString('pt-BR')}
                  </span>
                </td>
                <td className="p-4">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                    {residente.proximaMedicacao}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    residente.alertas === "Nenhum" 
                      ? 'bg-gray-100 text-gray-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {residente.alertas}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700 transition p-2 bg-blue-50 rounded-lg"
                      onClick={() => handleVerDetalhes(residente)}
                      title="Ver detalhes"
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="text-green-500 hover:text-green-700 transition p-2 bg-green-50 rounded-lg"
                      onClick={() => handleChecklist(residente)}
                      title="Checklist diário"
                    >
                      <FaClipboardList />
                    </button>
                    <button 
                      className="text-purple-500 hover:text-purple-700 transition p-2 bg-purple-50 rounded-lg"
                      onClick={() => handleRegistrarCuidados(residente)}
                      title="Registrar cuidados"
                    >
                      <FaNotesMedical />
                    </button>
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
          Mostrando {filteredResidentes.length} de {residentesAtribuidos.length} residente(s)
        </div>
        <div className="flex space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded mr-1"></div>
            Checklist hoje
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded mr-1"></div>
            Checklist pendente
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-100 border border-red-300 rounded mr-1"></div>
            Com alertas
          </div>
        </div>
      </div>

      {/* Mensagem se não houver residentes */}
      {filteredResidentes.length === 0 && (
        <div className="text-center py-12">
          <FaUserInjured className="text-gray-300 text-5xl mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            {searchTerm ? 'Nenhum residente encontrado' : 'Nenhum residente atribuído'}
          </h3>
          <p className="text-gray-400">
            {searchTerm 
              ? 'Tente ajustar os termos da busca' 
              : 'Entre em contato com a gestão para receber residentes atribuídos'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default PaginaResidentes;