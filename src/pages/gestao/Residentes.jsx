import React, { useState } from 'react';
import { FaUserInjured, FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const ResidentesFuncionario = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [residentes, setResidentes] = useState([
    { id: 1, nome: "Carlos Silva", quarto: "102", idade: 78, status: "Ativo", preferencias: 6, dataEntrada: "2022-05-20" },
    { id: 2, nome: "Maria Oliveira", quarto: "105", idade: 82, status: "Ativo", preferencias: 4, dataEntrada: "2021-08-18" },
    { id: 3, nome: "João Santos", quarto: "201", idade: 75, status: "Ativo", preferencias: 8, dataEntrada: "2023-01-22" },
    { id: 4, nome: "Ana Costa", quarto: "110", idade: 85, status: "Inativo", preferencias: 3, dataEntrada: "2020-11-15" },
    { id: 5, nome: "Pedro Almeida", quarto: "205", idade: 79, status: "Ativo", preferencias: 5, dataEntrada: "2022-07-10" }
  ]);

  const filteredResidentes = residentes.filter(residente => 
    residente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    residente.quarto.includes(searchTerm)
  );

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este residente?')) {
      setResidentes(residentes.filter(r => r.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 p-6 lg:p-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-odara-dark">Residentes</h1>
            <p className="text-sm text-odara-dark/70">Gestão de moradores da instituição</p>
          </div>
          <button className="bg-odara-accent hover:bg-odara-secondary text-white font-medium py-2 px-4 rounded-lg flex items-center transition">
            <FaPlus className="mr-2" />
            Cadastrar Residente
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6">
          <div className="flex items-center">
            <FaSearch className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Buscar por nome ou quarto..."
              className="w-full p-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabela com todos os residentes */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-odara-primary text-odara-contorno">
              <tr>
                <th className="p-4 text-left font-medium">Nome</th>
                <th className="p-4 text-left font-medium">Quarto</th>
                <th className="p-4 text-left font-medium">Idade</th>
                <th className="p-4 text-left font-medium">Status</th>
                <th className="p-4 text-left font-medium">Preferências</th>
                <th className="p-4 text-left font-medium">Entrada</th>
                <th className="p-4 text-left font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredResidentes.map((residente) => (
                <tr key={residente.id} className="hover:bg-odara-offwhite/60 transition">
                  <td className="p-4 font-medium text-odara-dark">{residente.nome}</td>
                  <td className="p-4">{residente.quarto}</td>
                  <td className="p-4">{residente.idade} anos</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${residente.status === 'Ativo' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-200 text-gray-700'}
                    `}>
                      {residente.status}
                    </span>
                  </td>
                  <td className="p-4">{residente.preferencias} preferência(s)</td>
                  <td className="p-4">{new Date(residente.dataEntrada).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4">
                    <div className="flex space-x-3">
                      <button className="text-blue-500 hover:text-blue-700 transition">
                        <FaEdit />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700 transition"
                        onClick={() => handleDelete(residente.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Contagem de residentes */}
        <div className="mt-4 text-sm text-gray-500">
          Total de {filteredResidentes.length} residente(s) encontrado(s)
        </div>
      </div>
    </div>
  );
};

export default ResidentesFuncionario;
