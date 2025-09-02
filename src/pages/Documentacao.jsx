import React, { useState, useRef, useEffect } from 'react';
import { Pill, ClipboardList, AlertTriangle, Hospital, Utensils, BarChart, Star, Users, Stethoscope, Microscope, Video, Phone } from "lucide-react"


const Documentacao = () => {
  const [activeItem, setActiveItem] = useState(null);
  const detailsRef = useRef(null);


  const funcionalidades = [
    {
      nome: 'Registro de Medicamentos',
      descricao: 'Controle completo da medicação dos residentes com alertas e histórico detalhado',
      icone: <Pill size={24} />,
      detalhes: [
        'O Registro de Medicamentos está localizado os respectivos cadastros para melhor controle detalhado de medicação tais quais o paciente deverá ingerir para a realização de seu tratamento.   Ele garante a segurança e continuidade do tratamento dos residentes, e auxiliam na organização, otimização e na avaliação da funcionalidade do mesmo, colaborando para o trabalho da equipe de saúde.'
      ]
    },
    {
      nome: 'Registro de Exames Médicos',
      descricao: 'Organização e resultados de exames médicos',
      icone: <Microscope size={24} />,
      detalhes: [
        'O Registro de Exames Médicos aqui será anotado e organizado todas as informações sobre exames realizados por um paciente, seja para diagnóstico, acompanhamento ou controle de rotina.No documento deve haver controle e histórico para ser fornecido informações precisas para avaliar a evolução do paciente.',

      ]
    },
    {
      nome: 'Registro de Consultas Médicas',
      descricao: 'Controle completo de consultas e acompanhamento médico',
      icone: <Stethoscope size={24} />,
      detalhes: [
        'O Registro de Consultas Médicas é o documento onde serão anotadas todas as informações sobre os atendimentos médicos realizados a um paciente. No mesmo deve conter: nome completo, idade, sexo, número de prontuário data e horário da consulta, profissional responsável, motivo da consulta, histórico e evolução clínica, tratamentos indicados, encaminhamentos, exames solicitados e receitas médicas, assinatura e autenticação.',

      ]
    },
    {
      nome: 'Registro da Saúde Corporal',
      descricao: 'Monitoramento contínuo do estado de saúde dos residentes',
      icone: <Hospital size={24} />,
      detalhes: [
        'O Registro da Saúde Corporal Inicial se refere à investigação e registro de eventuais ferimentos e/ou questões corporais no momento da entrada inicial da pessoa idosa na Casa. Com um template anatômico prático, basta selecionar as regiões do corpo afetadas e descrever os sintomas físicos da pessoa idosa referentes a essa região, dessa forma preza-se por um acompanhamento mais completo da saúde do individuo e garante um melhor entendimento da situação da saúde dele ao entrar em seu novo lar.',
      ]
    },
    {
      nome: 'Registro de Ocorrências',
      descricao: 'Documentação de incidentes e acompanhamento de resolução',
      icone: <AlertTriangle size={24} />,
      detalhes: [
        'O Registro de Ocorrências ficha onde se registra qualquer situação fora do comum envolvendo os residentes, funcionários ou a rotina da casa de repouso, podendo ser clínica,  comportamental ou até mesmo relacional, esse diário ajuda a acompanhar tudo o que pode impactar o bem-estar dos idosos e na organização do local, também na ciência dos responsáveis sobre os acontecimentos do dia.',
      ]
    },
    {
      nome: 'Registro de Comportamento',
      descricao: 'Registro e análise de padrões comportamentais',
      icone: <BarChart size={24} />,
      detalhes: [
        'O Registro de Comportamento esse relatório é onde será disposto informações sobre o comportamento dos residentes, seja durante exames, momento de lazer, alimentação, e de todo o seu dia a dia. Nele deverá haver conteúdo detalhado se o mesmo provocou consequências para si mesmo ou a terceiros (enfermeiros, médicos, responsáveis, ou outros residentes).',
      ]
    },
    {
      nome: 'Registro de Atividades',
      descricao: 'Organização e acompanhamento das atividades diárias dos residentes',
      icone: <ClipboardList size={24} />,
      detalhes: [
        'O Registro de Atividades é um documento fundamental que reúne todas as ações, cuidados e acontecimentos do dia a dia na instituição. Ele serve para garantir a organização, transparência e a qualidade do atendimento aos idosos. Ele permite monitorar o que foi feito com cada residente, como medicação, alimentação, atividades físicas e sociais, também ajuda a identificar rapidamente qualquer problema. ',
      ]
    },
    {
      nome: 'Registro de Alimentação',
      descricao: 'Gestão nutricional e acompanhamento alimentar',
      icone: <Utensils size={24} />,
      detalhes: [
        'O Registro de  Quadro Alimentar é o documento no qual serão adicionadas minuciosamente todas as informações sobre alimentação do residente, para acompanhamento e avaliação, se a nutrição está adequada e se é necessário alguma alteração para atender melhor as necessidades do idoso. Deve estar registrado quantas refeições o mesmo fez, quando foi, e o que ingeriu, se ele se queixou de algo, deixou de se alimentar e o motivo de tal decisão.',

      ]
    },
    {
      nome: 'Registro de Preferências',
      descricao: 'Registro das preferências individuais de cada residente',
      icone: <Star size={24} />,
      detalhes: [
        'O Registro de Preferências é uma ficha na qual serão anotadas as preferências pessoais de cada residente, para que a equipe possa oferecer um cuidado mais humanizado. Ele é parte importante do prontuário de atendimento, garante o bem-estar do idoso respeitando seus gostos, como comidas e temperos de preferência, sua rotina diária em geral (horário que acorda, prefere tomar banho, ou praticar seus lazeres).',
      ]
    },
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
            className={`group text-odara-dark p-6 rounded-xl shadow-sm hover:shadow-md text-left border-l-4 transition-all duration-300 shadow-lg ${activeItem === index ? 'bg-odara-dropdown border-odara-secondary shadow-md' : 'transform hover:scale-105 bg-odara-offwhite border-odara-primary hover:bg-odara-primary/50 hover:border-odara-accent'}`}
          >
            <div className="flex items-center">
              <span className={`text-2xl mr-4 ${activeItem === index ? 'text-odara-secondary' : 'text-odara-primary group-hover:text-odara-accent'}`}>{item.icone}</span>
              <div>
                <h3 className={`text-lg font-semibold ${activeItem === index ? 'text-odara-dropdown-accent' : 'text-odara-dark group-hover:text-odara-dark'}`}>{item.nome}</h3>
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