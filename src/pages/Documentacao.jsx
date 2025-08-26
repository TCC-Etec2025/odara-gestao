import React, { useState, useRef, useEffect } from 'react';
import { Pill, ClipboardList, AlertTriangle, Hospital, Utensils, BarChart, Star, Users, Stethoscope, Microscope, Video, Phone } from "lucide-react"


const Documentacao = () => {
  const [activeItem, setActiveItem] = useState(null);
  const detailsRef = useRef(null);


  const funcionalidades = [
    {
      nome: 'Registro de medicamentos',
      descricao: 'Controle completo da medicação dos residentes com alertas e histórico detalhado',
      icone: <Pill size={24} />,
      detalhes: [
        'Controle de horários e dosagens',
        'Alertas para medicamentos pendentes',
        'Relatório de administração',
      ]
    },
    {
      nome: 'Registro de Atividades',
      descricao: 'Organização e acompanhamento das atividades diárias dos residentes',
      icone: <ClipboardList size={24} />,
      detalhes: [
        'Agendamento de atividades recreativas',
        'Registro de participação',
        'Avaliação de desempenho',
        'Programação semanal',
      ]
    },
    {
      nome: 'Registro de Ocorrências',
      descricao: 'Documentação de incidentes e acompanhamento de resolução',
      icone: <AlertTriangle size={24} />,
      detalhes: [
        'Classificação por gravidade',
        'Registro fotográfico',
        'Fluxo de acompanhamento',
        'Comunicação com familiares',
        'Relatórios analíticos'
      ]
    },
    {
      nome: 'Registro da saúde corporal inicial',
      descricao: 'Monitoramento contínuo do estado de saúde dos residentes',
      icone: <Hospital size={24} />,
      detalhes: [
        'O Registro da Saúde Corporal Inicial se refere à investigação e registro de eventuais ferimentos e/ou questões corporais no momento da entrada inicial da pessoa idosa na Casa. Com um template anatômico prático, basta selecionar as regiões do corpo afetadas e descrever os sintomas físicos da pessoa idosa referentes a essa região, dessa forma preza-se por um acompanhamento mais completo da saúde do individuo e garante um melhor entendimento da situação da saúde dele ao entrar em seu novo lar.',
      ]
    },
    {
      nome: 'Registro de alimentação',
      descricao: 'Gestão nutricional e acompanhamento alimentar',
      icone: <Utensils size={24} />,
      detalhes: [
        'Registro de consumo',
        'Controle de dietas especiais',
        'Preferências individuais'
      ]
    },
    {
      nome: 'Registro de comportamento',
      descricao: 'Registro e análise de padrões comportamentais',
      icone: <BarChart size={24} />,
      detalhes: [
        'Identificação de alterações',
        'Acompanhamento psicológico',
        'Registro de humor',
        'Integração com equipe'
      ]
    },
    {
      nome: 'Registro de preferências',
      descricao: 'Registro das preferências individuais de cada residente',
      icone: <Star size={24} />,
      detalhes: [
        'Hábitos pessoais',
        'Gostos e aversões',
        'Rotinas preferidas',
        'Atividades favoritas',
      ]
    },
    {
      nome: 'Registro de relações internas',
      descricao: 'Mapeamento das relações interpessoais na instituição',
      icone: <Users size={24} />,
      detalhes: [
        'Vínculos entre residentes',
        'Registro de visitas',
        'Contatos familiares',
        'Preferências de convivência'
      ]
    },
    {
      nome: 'Registro de consultas médicas',
      descricao: 'Controle completo de consultas e acompanhamento médico',
      icone: <Stethoscope size={24} />,
      detalhes: [
        'Agendamento de consultas',
        'Prescrições digitais',
        'Laudos médicos',
      ]
    },
    {
      nome: 'Registro de exames médicos',
      descricao: 'Organização e resultados de exames médicos',
      icone: <Microscope size={24} />,
      detalhes: [
        'Agendamento de exames',
        'Alertas',
      ]
    },
    {
      nome: 'Registros de vídeo e fotográfico',
      descricao: 'Armazenamento de registros fotográficos e vídeos',
      icone: <Video size={24} />,
      detalhes: [
        'Registro de evolução',
        'Compartilhamento familiar',
      ]
    },
    {
      nome: 'Plataforma para Reuniões',
      descricao: 'Sistema integrado de reuniões e comunicação',
      icone: <Phone size={24} />,
      detalhes: [
        'Agenda compartilhada',
        'Comunicação com familiares',
        'Reuniões multidisciplinares',
      ]
    }
  ];

  // Efeito para rolar até os detalhes quando activeItem muda
  useEffect(() => {
    if (activeItem !== null && detailsRef.current) {
      // Pequeno timeout para garantir que o DOM foi atualizado
      setTimeout(() => {
        detailsRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 50);
    }
  }, [activeItem]);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };


  return (
    <main className="container mx-auto py-8 px-4 max-w-6xl font-sans">
      {/* Cabeçalho */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-odara-accent mb-2">Funcionalidades do Sistema</h1>
        <h2 className="text-xl text-odara-dark">Explore todas as ferramentas disponíveis para gestão de ILPIs</h2>
      </header>

      {/* Lista de funcionalidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {funcionalidades.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveItem(index)}
            className={`group text-odara-dark p-6 rounded-xl shadow-sm hover:shadow-md text-left border-l-4 transition-all duration-300 transform hover:scale-105 shadow-lg ${activeItem === index ? 'border-odara-secondary bg-odara-dropdown shadow-md' : 'bg-odara-offwhite border-odara-primary hover:bg-odara-primary hover:border-odara-accent'}`}
          >
            <div className="flex items-center">
              <span className={`text-2xl mr-4 ${activeItem === index ? 'text-odara-secondary' : 'text-odara-primary group-hover:text-odara-accent'}`}>{item.icone}</span>
              <div>
                <h3 className={`text-lg font-semibold ${activeItem === index ? 'text-odara-dropdown-accent' : 'text-odara-dark group-hover:text-odara-white'}`}>{item.nome}</h3>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Seção de detalhes com ref para scroll */}
      <div ref={detailsRef}>
        {activeItem !== null && (
          <section className="bg-gray-50 rounded-xl p-8 mb-8 animate-fadeIn">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-4 text-odara-primary">{funcionalidades[activeItem].icone}</span>
              <div>
                <h2 className="text-2xl font-bold text-odara-accent">{funcionalidades[activeItem].nome}</h2>
                <p className="text-odara-dark">{funcionalidades[activeItem].descricao}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-odara-dropdown border-l-4 border-odara-secondary p-6 rounded-lg shadow-xs">
                <h3 className="text-lg font-bold text-odara-dropdown-accent mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-odara-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recursos Principais
                </h3>
                <ul className="space-y-3">
                  {funcionalidades[activeItem].detalhes.map((detalhe, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-odara-secondary mr-2">•</span>
                      <span className="text-odara-name">{detalhe}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-odara-white bg-opacity-10 p-6 rounded-lg border-2 border-odara-primary">
                <h3 className="text-lg font-semibold text-odara-accent mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-odara-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Benefícios
                </h3>
                <p className="text-odara-dark">
                  Esta funcionalidade foi desenvolvida para otimizar o trabalho dos cuidadores e 
                  melhorar a qualidade de vida dos residentes, proporcionando um acompanhamento 
                  mais preciso e personalizado.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={() => setActiveItem(null)}
                className="bg-odara-accent hover:bg-odara-secondary/90 text-odara-contorno font-semibold px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Fechar Detalhes
              </button>
            </div>
          </section>
        )}
      </div>

      {/* Informação para ver as descrições */}
      {activeItem === null && (
        <div className="text-center py-12">
          <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-500 mt-4">Selecione uma funcionalidade para ver seus detalhes</h3>
          <p className="text-gray-400 mt-1">Conheça todas as ferramentas disponíveis para gestão de ILPIs</p>
        </div>
      )}
    </main>
  );
};

export default Documentacao;