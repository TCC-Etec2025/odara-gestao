import React, { useState } from 'react';
import { FaUtensils, FaWalking, FaUserNurse, FaInfoCircle, FaChartBar, FaHome, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [preferences, setPreferences] = useState({
    alimentar: [
      { id: 1, title: "Comida Italiana", description: "Prefere massas e pratos da culinária italiana" },
      { id: 2, title: "Vegetariano", description: "Prefere refeições sem carne" }
    ],
    atividades: [
      { id: 3, title: "Leitura", description: "Gosta de ler livros no tempo livre" },
      { id: 4, title: "Caminhada", description: "Prefere caminhar ao ar livre" }
    ],
    cuidador: [
      { id: 5, title: "Leticia", description: "Prefere que Leticia sirva seu alimento" },
      { id: 6, title: "Maria", description: "Prefere que maria de banho e cuide de sua higiene" }
    ]
  });

  // Estatísticas para o dashboard
  const stats = {
    total: preferences.alimentar.length + preferences.atividades.length + preferences.cuidador.length,
    alimentar: preferences.alimentar.length,
    atividades: preferences.atividades.length,
    cuidador: preferences.cuidador.length
  };

  // Preferências recentes (últimas 3 adicionadas)
  const recentPreferences = [
    ...preferences.alimentar.map(p => ({ ...p, category: 'alimentar', icon: <FaUtensils /> })),
    ...preferences.atividades.map(p => ({ ...p, category: 'atividades', icon: <FaWalking /> })),
    ...preferences.cuidador.map(p => ({ ...p, category: 'cuidador', icon: <FaUserNurse /> }))
  ].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <div className="ml-12 mt-10 flex min-h-screen bg-odara-offwhite">
      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-odara-dark">Dashboard</h1>
          <p className="text-odara-dark/70">Visão geral das preferências dos residentes</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-odara-accent">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-odara-dark/70">Total de Preferências</p>
                <h3 className="text-2xl font-bold text-odara-dark">{stats.total}</h3>
              </div>
              <div className="bg-odara-accent/10 p-3 rounded-full">
                <FaInfoCircle className="text-odara-accent text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-odara-dark/70">Preferências Alimentares</p>
                <h3 className="text-2xl font-bold text-odara-dark">{stats.alimentar}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaUtensils className="text-green-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-odara-dark/70">Preferências de Atividades</p>
                <h3 className="text-2xl font-bold text-odara-dark">{stats.atividades}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaWalking className="text-blue-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-odara-dark/70">Preferências de Cuidadores</p>
                <h3 className="text-2xl font-bold text-odara-dark">{stats.cuidador}</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaUserNurse className="text-purple-500 text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-odara-dark mb-4">Preferências Recentes</h2>
            <div className="space-y-4">
              {recentPreferences.map((item, index) => (
                <div key={index} className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-odara-offwhite transition">
                  <div className="bg-odara-primary/10 p-2 rounded-full mr-3">
                    <span className="text-odara-primary">{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-odara-dark">{item.title}</h4>
                    <p className="text-sm text-odara-dark/70 truncate">{item.description}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-odara-primary/10 text-odara-primary rounded-full capitalize">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Distribuição por Categoria */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-odara-dark mb-4">Distribuição por Categoria</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-odara-dark font-medium">Alimentar</span>
                  <span className="text-odara-dark">{stats.alimentar} ({Math.round((stats.alimentar/stats.total)*100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-odara-accent h-2.5 rounded-full" 
                    style={{ width: `${(stats.alimentar/stats.total)*100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-odara-dark font-medium">Atividades</span>
                  <span className="text-odara-dark">{stats.atividades} ({Math.round((stats.atividades/stats.total)*100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${(stats.atividades/stats.total)*100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-odara-dark font-medium">Cuidador</span>
                  <span className="text-odara-dark">{stats.cuidador} ({Math.round((stats.cuidador/stats.total)*100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-purple-500 h-2.5 rounded-full" 
                    style={{ width: `${(stats.cuidador/stats.total)*100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-odara-dark mb-4">Acesso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-odara-offwhite transition">
              <div className="bg-odara-accent/10 p-3 rounded-full mb-2">
                <FaUtensils className="text-odara-accent text-xl" />
              </div>
              <span className="text-odara-dark font-medium">Alimentar</span>
            </button>
            
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-odara-offwhite transition">
              <div className="bg-green-100 p-3 rounded-full mb-2">
                <FaWalking className="text-green-500 text-xl" />
              </div>
              <span className="text-odara-dark font-medium">Atividades</span>
            </button>
            
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-odara-offwhite transition">
              <div className="bg-purple-100 p-3 rounded-full mb-2">
                <FaUserNurse className="text-purple-500 text-xl" />
              </div>
              <span className="text-odara-dark font-medium">Cuidador</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;