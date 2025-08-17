import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row items-center gap-8 justify-center">
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="w-200 h-[375px] bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <img 
              src="/images/idosos.jpg"
              alt="Exemplo de perfil"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <section className="bg-white p-6 rounded-xl shadow-lg w-full lg:w-96">
          <h2 className="text-2xl font-bold text-odara-primary mb-5 text-center">
            Faça seu Cadastro
          </h2>

          <div className="space-y-3 mb-5">
            <div>
              <label htmlFor="nome-casa" className="block text-odara-dark mb-1 text-sm">
                Nome da Casa
              </label>
              <input
                type="text"
                id="nome-casa"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-odara-primary text-sm"
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-odara-dark mb-1 text-sm">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-odara-primary text-sm"
              />  
            </div>

            <div>
              <label htmlFor="servidor-local" className="block text-odara-dark mb-1 text-sm">
                Servidor Local
              </label>
              <input
                type="text"
                id="servidor-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-odara-primary text-sm"
              />
            </div>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="w-full bg-odara-primary hover:bg-odara-dark text-white py-2 px-4 rounded-md font-medium transition duration-200 text-sm"
          >
            Publicar seu site
          </button>
        </section>
      </div>
    </main>
  );
};

export default Cadastro;