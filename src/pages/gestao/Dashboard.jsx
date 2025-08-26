const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard de Gestão</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Visão Geral</h2>
          <p>Resumo do sistema e estatísticas.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Atividades Recentes</h2>
          <p>Últimas atividades do sistema.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Alertas</h2>
          <p>Alertas e notificações importantes.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;