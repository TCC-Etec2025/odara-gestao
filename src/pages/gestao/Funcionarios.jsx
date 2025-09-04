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
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 p-6 lg:p-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-odara-dark">Funcionários</h1>
            <p className="text-sm text-odara-dark/70">Gestão de equipe e profissionais</p>
          </div>
          <button className="bg-odara-accent hover:bg-odara-secondary text-white font-medium py-2 px-4 rounded-lg flex items-center transition">
            <FaPlus className="mr-2" />
            Cadastrar Funcionário
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6">
          <div className="flex items-center">
            <FaSearch className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Buscar por nome, cargo ou departamento..."
              className="w-full p-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabela com as informações dos funcionarios */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-odara-primary text-odara-contorno">
              <tr>
                <th className="p-4 text-left font-medium">Nome</th>
                <th className="p-4 text-left font-medium">Cargo</th>
                <th className="p-4 text-left font-medium">Departamento</th>
                <th className="p-4 text-left font-medium">Status</th>
                <th className="p-4 text-left font-medium">Admissão</th>
                <th className="p-4 text-left font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFuncionarios.map((funcionario) => (
                <tr key={funcionario.id} className="hover:bg-odara-offwhite/60 transition">
                  <td className="p-4 font-medium text-odara-dark">{funcionario.nome}</td>
                  <td className="p-4">{funcionario.cargo}</td>
                  <td className="p-4">{funcionario.departamento}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${funcionario.status === 'Ativo' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'}
                    `}>
                      {funcionario.status}
                    </span>
                  </td>
                  <td className="p-4">{new Date(funcionario.dataAdmissao).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4">
                    <div className="flex space-x-3">
                      <button className="text-blue-500 hover:text-blue-700 transition">
                        <FaEdit />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700 transition"
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

        {/* Contagem de funcionários*/}
        <div className="mt-4 text-sm text-gray-500">
          Total de {filteredFuncionarios.length} funcionário(s) encontrado(s)
        </div>
      </div>
    </div>
  );
};

export default Funcionarios;
