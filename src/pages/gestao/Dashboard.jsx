import { useState } from 'react';

const Dashboard = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Asa Escrita (e Seguro e extenso) - Ao término: +1.5 bilínea", completed: false },
    { id: 2, text: "Conecta direto em acórdão para abril Sino - Antes financeiro: 1.5 bilíneas", completed: false },
    { id: 3, text: "Atuais créditos relacionados com todos os atuais - Sistema: 1.5 bilíneas", completed: false },
    { id: 4, text: "Receitas como: <0> condicionamento gratuito - D: Cível único - >0.15m", completed: false },
  ]);

  const toggleNotification = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, completed: !notification.completed } 
        : notification
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-odara-primary">Dashboard</h1>
          <p className="text-odara-secondary mt-2">Sistema de Gestão</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1: Ações Administrativas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-odara-primary mb-4">Ações Administrativas</h2>
              
              <div className="mb-6">
                <h3 className="font-semibold text-odara-secondary mb-2">Contexto/Receito:</h3>
                <p className="text-odara-secondary mb-4">Informações e cursos: verificar do sistema</p>
                
                <div className="space-y-4">
                  <div className="flex items-start p-3 rounded-lg hover:bg-odara-light transition-colors">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-odara-primary mr-3"></div>
                    <div>
                      <span className="font-medium text-odara-secondary">Configurações</span>
                      <p className="text-sm text-odara-secondary/80">Apesar configurá-las do sistema e permitirão</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 rounded-lg hover:bg-odara-light transition-colors">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-odara-primary mr-3"></div>
                    <div>
                      <span className="font-medium text-odara-secondary">Reflexão técnica</span>
                      <p className="text-sm text-odara-secondary/80">Desde final, o procedimento é a órbita</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-odara-secondary mb-2">Contexto/Receito:</h3>
                <p className="text-odara-secondary mb-4">Informações e cursos: verificar do sistema</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-odara-light rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-odara-primary">95%</div>
                    <div className="text-sm text-odara-secondary">Existências Mensais</div>
                  </div>
                  <div className="bg-odara-light rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-odara-primary">94%</div>
                    <div className="text-sm text-odara-secondary">Inversa Consultoria</div>
                  </div>
                  <div className="bg-odara-light rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-odara-primary">92%</div>
                    <div className="text-sm text-odara-secondary">Federico Obrasco</div>
                  </div>
                  <div className="bg-odara-light rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-odara-primary">96%</div>
                    <div className="text-sm text-odara-secondary">Sardinário Canal</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status do Externo */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-odara-primary mb-4">Status do Externo</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Semiúde Principal", "Base de Distrito", "Estatura da Defesa", "Monitoragem"].map((status, index) => (
                  <div key={index} className="bg-odara-light rounded-lg p-4 text-center">
                    <div className="text-odara-secondary font-medium">{status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna 2: Estatísticas e Notificações */}
          <div className="space-y-6">
            {/* Estatísticas Mensais */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-odara-primary mb-4">Existências Mensais</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-odara-light rounded-lg">
                  <span className="text-odara-secondary">Inversa Consultoria</span>
                  <span className="font-bold text-odara-primary">1.347</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-odara-light rounded-lg">
                  <span className="text-odara-secondary">Federico Obrasco</span>
                  <span className="font-bold text-odara-primary">42</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-odara-light rounded-lg">
                  <span className="text-odara-secondary">Sardinário Canal</span>
                  <span className="font-bold text-odara-primary">84%</span>
                </div>
              </div>
            </div>

            {/* Acróbios Recorte */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-odara-primary mb-4">Acróbios Recorte</h2>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className="flex items-start p-3 rounded-lg hover:bg-odara-light transition-colors cursor-pointer"
                    onClick={() => toggleNotification(notification.id)}
                  >
                    <input 
                      type="checkbox" 
                      checked={notification.completed}
                      onChange={() => toggleNotification(notification.id)}
                      className="mt-1 mr-3 h-4 w-4 text-odara-primary focus:ring-odara-primary border-gray-300 rounded"
                    />
                    <span className={`text-sm text-odara-secondary ${notification.completed ? 'line-through text-gray-400' : ''}`}>
                      {notification.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notificações Importantes */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-odara-primary mb-4">Notificações Importantes</h2>
              <div className="space-y-4">
                <div className="p-3 bg-odara-light rounded-lg">
                  <h3 className="font-semibold text-odara-primary">Setores de Receita</h3>
                  <p className="text-sm text-odara-secondary">Utilização autenticamente por 2 dias</p>
                </div>
                <div className="p-3 bg-odara-light rounded-lg">
                  <h3 className="font-semibold text-odara-primary">Nível Internacional</h3>
                  <p className="text-sm text-odara-secondary">Apresentar operações exclusivas</p>
                </div>
                <div className="p-3 bg-odara-light rounded-lg">
                  <h3 className="font-semibold text-odara-primary">Relatório Manual</h3>
                  <p className="text-sm text-odara-secondary">Processamental de serviço</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;