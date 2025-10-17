import React, { useState } from 'react';
import { FaUserInjured, FaSearch, FaEye, FaNotesMedical, FaClipboardList } from 'react-icons/fa';
import { Eye, Edit } from 'lucide-react';

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

const PaginaResidentes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [residentesAtribuidos] = useState([
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

  const handleVerDetalhes = (residente) => console.log('Ver detalhes:', residente);
  const handleRegistrarCuidados = (residente) => console.log('Registrar cuidados:', residente);
  const handleChecklist = (residente) => console.log('Abrir checklist:', residente);

  const estatisticas = {
    total: residentesAtribuidos.length,
    comChecklistHoje: residentesAtribuidos.filter(r => r.ultimoChecklist === new Date().toISOString().split('T')[0]).length,
    comMedicacaoProxima: residentesAtribuidos.filter(r => {r => r.ultimoChecklist === new Date().toISOString().split('T')[0]
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

      {/* Tabela */}
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
              <th className="p-4 text-center font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredResidentes.map((residente) => (
              <tr key={residente.id} className="hover:bg-odara-offwhite/60 transition">
                <td className="p-4">
                  <div className="font-medium text-odara-dark">{residente.nome}</div>
                  <div className="text-xs text-gray-500">{residente.idade} anos</div>
                </td>
                <td className="p-4">{residente.quarto}</td>
                <td className="p-4 text-gray-600">{residente.cuidados}</td>
                <td className="p-4">{new Date(residente.ultimoChecklist).toLocaleDateString('pt-BR')}</td>
                <td className="p-4">{residente.proximaMedicacao}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    residente.alertas === "Nenhum" 
                      ? 'text-gray-700' 
                      : 'text-red-700 font-semibold'
                  }`}>
                    {residente.alertas}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2 pt-2 border-t border-gray-100">
                    <ActionButton
                      icon={Eye}
                      label="Detalhes"
                      onClick={() => handleVerDetalhes(residente)}
                    />
                    <ActionButton
                      icon={FaClipboardList}
                      label="Checklist"
                      onClick={() => handleChecklist(residente)}
                    />
                    <ActionButton
                      icon={FaNotesMedical}
                      label="Cuidados"
                      onClick={() => handleRegistrarCuidados(residente)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rodapé da tabela */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div>
          Mostrando {filteredResidentes.length} de {residentesAtribuidos.length} residente(s)
        </div>
      </div>

      {/* Nenhum residente */}
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
