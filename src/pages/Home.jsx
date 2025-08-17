import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const funcionalidades = [
    'Registro de medicamentos',
    'Registro de Atividades',
    'Registro de Ocorrências',
    'Registro da saúde corporal inicial',
    'Registro de alimentação',
    'Registro de comportamento',
    'Registro de preferências',
    'Registro de relações internas',
    'Registro de consultas médicas',
    'Registro de exames médicos',
    'Registros de vídeo e fotográfico',
    'Plataforma para chamadas de vídeo'
  ];

  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-odara-primary mb-2">Odara Gestão</h1>
        <h2 className="text-xl text-odara-dark">Nossa Missão</h2>
      </header>

      <section className="bg-white p-6 rounded-lg shadow-md mb-12 border-l-4 border-odara-accent">
        <p className="text-odara-dark mb-4">
          A <strong className="text-odara-primary">Odara Gestão</strong> é um Sistema de Gestão dedicado à facilitação da gestão de Instituições de Lares para Pessoas Séniores (ILPS). Temos como objetivo auxiliar a administração diária e cuidados dos devidos pacientes.
        </p>
        <p className="text-odara-dark">
          Esse aplicativo estará contribuindo tanto com o trabalho de registrar informações dos enfermeiros quanto a participação e ciência dos responsáveis pelo sênior.
        </p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md mb-12 border-l-4 border-odara-accent">
        <h2 className="text-2xl font-bold text-odara-primary mb-6 text-center">
          Confira abaixo as funcionalidades disponíveis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {funcionalidades.map((funcionalidade, index) => (
            <div 
              key={index} 
              className="flex items-start p-3 bg-odara-light rounded-lg hover:bg-odara-lightest transition-colors"
            >
              <div className="bg-odara-accent p-1 rounded-full mr-3 mt-0.5">
                <svg 
                  className="w-4 h-4 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <span className="text-odara-dark">{funcionalidade}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center mb-12">
        <button 
          onClick={() => navigate('/Cadastro')}
          className="bg-odara-primary hover:bg-odara-dark text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md transform hover:scale-105"
        >
          Conheça nosso sistema
        </button>
      </div>
    </main>
  );
};

export default Home;