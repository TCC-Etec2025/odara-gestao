import React, { useState } from 'react';
import { FaUsers, FaUserInjured, FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Residentes = () => {
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
    <div className="ml-12 mt-10 min-h-screen bg-odara-offwhite p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-odara-dark">Gestão de Residentes</h1>
          <button className="bg-odara-accent hover:bg-odara-secondary text-white font-medium py-2 px-4 rounded-lg flex items-center">
            <FaPlus className="mr-2" />
            Novo Residente
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center">
            <FaSearch className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Buscar residente por nome ou quarto..."
              className="w-full p-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-odara-primary text-odara-contorno">
              <tr>
                <th className="p-4 text-left">Nome</th>
                <th className="p-4 text-left">Quarto</th>
                <th className="p-4 text-left">Idade</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Preferências</th>
                <th className="p-4 text-left">Data de Entrada</th>
                <th className="p-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredResidentes.map((residente, index) => (
                <tr key={residente.id} className={index % 2 === 0 ? 'bg-odara-offwhite' : 'bg-white'}>
                  <td className="p-4 font-medium">{residente.nome}</td>
                  <td className="p-4">{residente.quarto}</td>
                  <td className="p-4">{residente.idade} anos</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      residente.status === 'Ativo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {residente.status}
                    </span>
                  </td>
                  <td className="p-4">{residente.preferencias} preferências</td>
                  <td className="p-4">{new Date(residente.dataEntrada).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700"
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

        <div className="mt-4 text-sm text-gray-500">
          Total de {filteredResidentes.length} residente(s) encontrado(s)
        </div>
      </div>
    </div>
  );
};

export default Residentes;