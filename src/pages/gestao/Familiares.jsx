import React, { useState } from 'react';
import { FaUserFriends, FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Familiares = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [familiares, setFamiliares] = useState([
    { id: 1, nome: "João Silva", parentesco: "Filho", telefone: "(11) 99999-9999", email: "joao@email.com", residente: "Carlos Silva", acessos: ["Visitas", "Alimentação"], status: "Ativo", dataCadastro: "2023-02-15" },
    { id: 2, nome: "Fernanda Oliveira", parentesco: "Filha", telefone: "(11) 98888-8888", email: "fernanda@email.com", residente: "Maria Oliveira", acessos: ["Prontuário", "Visitas"], status: "Ativo", dataCadastro: "2022-10-05" },
    { id: 3, nome: "Pedro Santos", parentesco: "Sobrinho", telefone: "(11) 97777-7777", email: "pedro@email.com", residente: "João Santos", acessos: ["Visitas"], status: "Inativo", dataCadastro: "2021-06-20" },
  ]);

  const filteredFamiliares = familiares.filter(familiar =>
    familiar.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    familiar.residente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    familiar.parentesco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este familiar?')) {
      setFamiliares(familiares.filter(f => f.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 p-6 lg:p-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-odara-dark">Familiares</h1>
            <p className="text-sm text-odara-dark/70">Gestão de familiares vinculados aos residentes</p>
          </div>
          <button className="bg-odara-accent hover:bg-odara-secondary text-white font-medium py-2 px-4 rounded-lg flex items-center transition">
            <FaPlus className="mr-2" />
            Cadastrar Familiar
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6">
          <div className="flex items-center">
            <FaSearch className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Buscar por nome, residente ou parentesco..."
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
                <th className="p-4 text-left font-medium">Nome</th>
                <th className="p-4 text-left font-medium">Parentesco</th>
                <th className="p-4 text-left font-medium">Telefone</th>
                <th className="p-4 text-left font-medium">Residente</th>
                <th className="p-4 text-left font-medium">Acessos</th>
                <th className="p-4 text-left font-medium">Status</th>
                <th className="p-4 text-left font-medium">Cadastro</th>
                <th className="p-4 text-left font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFamiliares.map((familiar) => (
                <tr key={familiar.id} className="hover:bg-odara-offwhite/60 transition">
                  <td className="p-4 font-medium text-odara-dark">{familiar.nome}</td>
                  <td className="p-4">{familiar.parentesco}</td>
                  <td className="p-4">{familiar.telefone}</td>
                  <td className="p-4">{familiar.residente}</td>
                  <td className="p-4">
                    {familiar.acessos.map((a, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mr-2">
                        {a}
                      </span>
                    ))}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${familiar.status === 'Ativo' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-200 text-gray-700'}
                    `}>
                      {familiar.status}
                    </span>
                  </td>
                  <td className="p-4">{new Date(familiar.dataCadastro).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4">
                    <div className="flex space-x-3">
                      <button className="text-blue-500 hover:text-blue-700 transition">
                        <FaEdit />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700 transition"
                        onClick={() => handleDelete(familiar.id)}
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

        {/* Contagem */}
        <div className="mt-4 text-sm text-gray-500">
          Total de {filteredFamiliares.length} familiar(es) encontrado(s)
        </div>
      </div>
    </div>
  );
};

export default Familiares;
