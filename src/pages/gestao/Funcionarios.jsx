import React, { useState } from 'react';
import { FaUsers, FaUserNurse, FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Funcionarios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: "Leticia Santos", cargo: "Cuidadora", departamento: "Cuidados", status: "Ativo", dataAdmissao: "2022-03-15" },
    { id: 2, nome: "Maria Andrade", cargo: "Cuidadora", departamento: "Cuidados", status: "Ativo", dataAdmissao: "2021-08-20" },
    { id: 3, nome: "João Oliveira", cargo: "Fisioterapeuta", departamento: "Saúde", status: "Ativo", dataAdmissao: "2020-11-05" },
    { id: 4, nome: "Ana Costa", cargo: "Nutricionista", departamento: "Nutrição", status: "Ativo", dataAdmissao: "2022-01-10" },
    { id: 5, nome: "Pedro Almeida", cargo: "Enfermeiro", departamento: "Saúde", status: "Licença", dataAdmissao: "2021-05-22" }
  ]);

  const filteredFuncionarios = funcionarios.filter(funcionario => 
    funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    funcionario.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    funcionario.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      setFuncionarios(funcionarios.filter(f => f.id !== id));
    }
  };

  return (
    <div className="ml-12 mt-10 min-h-screen bg-odara-offwhite p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-odara-dark">Gestão de Funcionários</h1>
          <button className="bg-odara-accent hover:bg-odara-secondary text-white font-medium py-2 px-4 rounded-lg flex items-center">
            <FaPlus className="mr-2" />
            Novo Funcionário
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center">
            <FaSearch className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Buscar funcionário por nome, cargo ou departamento..."
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
                <th className="p-4 text-left">Cargo</th>
                <th className="p-4 text-left">Departamento</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Data de Admissão</th>
                <th className="p-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredFuncionarios.map((funcionario, index) => (
                <tr key={funcionario.id} className={index % 2 === 0 ? 'bg-odara-offwhite' : 'bg-white'}>
                  <td className="p-4 font-medium">{funcionario.nome}</td>
                  <td className="p-4">{funcionario.cargo}</td>
                  <td className="p-4">{funcionario.departamento}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      funcionario.status === 'Ativo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {funcionario.status}
                    </span>
                  </td>
                  <td className="p-4">{new Date(funcionario.dataAdmissao).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(funcionario.id)}
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
          Total de {filteredFuncionarios.length} funcionário(s) encontrado(s)
        </div>
      </div>
    </div>
  );
};

export default Funcionarios;