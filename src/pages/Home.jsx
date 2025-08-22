"use client" // Este componente roda no cliente (browser) porque usa interatividade (hooks, eventos, etc.)

import { useState, useEffect, useRef } from "react"

const Home = () => {
  const [isScrolling, setIsScrolling] = useState(false)
  const [showArrows, setShowArrows] = useState({
    hero: false,
    documentacao: false,
    sobre: false
  })

  const heroRef = useRef(null);
  const docRef = useRef(null);
  const sobreRef = useRef(null);
  const cadastroRef = useRef(null);

  // Atualiza a visibilidade das setas quando as seções são carregadas
  useEffect(() => {
    setShowArrows({
      hero: !!heroRef.current,
      documentacao: !!docRef.current,
      sobre: !!sobreRef.current,
      cadastro: !!cadastroRef.current
    })
  }, [])

  // Função de scroll suave
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      setIsScrolling(true)
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
      setTimeout(() => setIsScrolling(false), 1000)
    }
  }


  const funcionalidades = [
    { nome: "Registro de medicamentos", icon: "💊" },
    { nome: "Registro de Atividades", icon: "📋" },
    { nome: "Registro de Ocorrências", icon: "⚠️" },
    { nome: "Registro da saúde corporal inicial", icon: "🏥" },
    { nome: "Registro de alimentação", icon: "🍽️" },
    { nome: "Registro de comportamento", icon: "📊" },
    { nome: "Registro de preferências", icon: "⭐" },
    { nome: "Registro de relações internas", icon: "👥" },
    { nome: "Registro de consultas médicas", icon: "🩺" },
    { nome: "Registro de exames médicos", icon: "🔬" },
    { nome: "Registros de vídeo e fotográfico", icon: "📹" },
    { nome: "Plataforma para Reuniões", icon: "📞" },
  ]

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      {/* Seção Hero -"Hero" é a seção principal/banner de destaque de uma página. */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen w-full bg-odara-primary text-white relative overflow-hidden flex items-center justify-center"
      >
        {/* Imagem de fundo*/}
        <div className="absolute inset-0 opacity-18">
          <img
            src="../images/idosos.jpg"
            alt="Logo Odara Gestão"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null
            }}
          />
        </div>

        <div className="w-full px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Odara <span className="text-odara-name">Gestão</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-odara-white animate-fade-in-delay ">
              Sistema completo de gestão para cuidados especializados
            </p>
            <p className="text-lg mb-12 text-odara-white max-w-4xl mx-auto leading-relaxed ">
              A Odara Gestão é um Sistema de Gestão dedicado à administração de Instituições de Longa Permanência para Idosos (ILPIs). Nosso objetivo é facilitar o registro de informações por cuidadores e garantir que
              responsáveis estejam sempre cientes e conectados ao cuidado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => scrollToSection("documentacao")}
                className="bg-odara-accent border-2 border-odara-contorno hover:bg-odara-secondary/90 text-odara-contorno font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explorar Funcionalidades
              </button>
              <button
                onClick={() => scrollToSection("cadastro")}
                className="border-2 border-odara-contorno text-odara-contorno hover:bg-white hover:text-odara-primary font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Começar Agora
              </button>
            </div>
          </div>
        </div>

        {/* Seta de scroll - APENAS se documentacao existir */}
        {showArrows.documentacao && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce z-50">
            <button
              onClick={() => scrollToSection("documentacao")}
              aria-label="Rolar para Documentação"
              className="text-odara-accent hover:text-odara-contorno transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Seção Documentação/ funcionalidades */}
      <section id="documentacao" ref={docRef} className="min-h-screen bg-gray-50 flex items-center py-20">
        <div className="w-full px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-odara-accent mb-6">Funcionalidades Completas</h2>
              <p className="text-xl text-odara-dark max-w-3xl mx-auto">
                Descubra todas as ferramentas disponíveis para uma gestão eficiente e completa
              </p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-cols-3 gap-6">
              {funcionalidades.map((funcionalidade, index) => (
                <div
                  key={index}
                  className="group bg-odara-offwhite p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-odara-primary hover:border-odara-dropdown-accent hover:bg-odara-dropdown transform hover:-translate-y-2"
                >
                  <div className="flex items-center space-x-4 my-2">
                    <div className="text-2xl">{funcionalidade.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-odara-dark group-hover:text-odara-secondary transition-colors text-md leading-tight">
                        {funcionalidade.nome}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <button
                onClick={() => window.location.href = "/documentacao"}
                className="bg-odara-accent border-2 border-odara-contorno hover:bg-odara-secondary/90 text-odara-contorno font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg w-auto min-w-[240px]"
              >
                Confira mais sobre as funcionalidades
              </button>
            </div>
          </div>
        </div>

        {/* Seta de scroll - APENAS se sobre existir */}
        {showArrows.sobre && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce z-50">
            <button
              onClick={() => scrollToSection("sobre")}
              aria-label="Rolar para Sobre"
              className="text-odara-accent hover:text-odara-contorno transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Seção Sobre */}
      <section id="sobre" ref={sobreRef} className="min-h-screen bg-white flex items-center py-20">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-odara-accent mb-6">Sobre o Sistema</h2>
            <section className="bg-odara-offwhite p-6 rounded-lg shadow-md mb-10 border-l-4 border-odara-primary">
              <p className="text-odara-dark mb-4">
                A <strong className="text-odara-name">Odara Gestão</strong> é um Sistema de Gestão dedicado à facilitação da gestão de Instituições de Longa Permanência para Idosos (ILPIs). Temos como objetivo auxiliar a administração diária e cuidados dos devidos pacientes.
              </p>
              <p className="text-odara-dark">
                Esse aplicativo estará contribuindo tanto com o trabalho de registrar informações dos enfermeiros quanto a participação e ciência dos responsáveis pelo sênior.
              </p>
            </section>
            <div className="flex justify-center mt-12">
              <button
                onClick={() => window.location.href = "/sobre"}
                className="bg-odara-accent border-2 border-odara-contorno hover:bg-odara-secondary/90 text-odara-contorno font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg w-auto min-w-[240px]"
              >
                Quero saber mais
              </button>
            </div>
          </div>
        </div>

        {/* Seta de scroll - APENAS se cadastro existir */}
        {showArrows.cadastro && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce z-50">
            <button
              onClick={() => scrollToSection("cadastro")}
              aria-label="Rolar para Cadastro"
              className="text-odara-accent hover:text-odara-contorno transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Seção Cadastro */}
      <section
        id="cadastro"
        ref={cadastroRef}
        className="min-h-screen bg-odara-primary text-white flex items-center justify-center py-20"
      >
        <div className="w-full px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Pronto para Começar?</h2>
            <p className="text-xl mb-12 text-odara-white max-w-2xl mx-auto">
              Junte-se a centenas de profissionais que já utilizam nosso sistema para otimizar seus cuidados.
            </p>

            <div className="bg-white/20 backdrop-blur-sm p-12 rounded-2xl max-w-2xl mx-auto mb-16">
              <h3 className="text-2xl font-bold mb-8">Comece sua jornada hoje</h3>
              <div className="space-y-6">
                <button
                  onClick={() => window.location.href = "/cadastro"}
                  className="w-full bg-odara-accent border-2 bg-odara-accent hover:bg-odara-secondary/90 text-odara-contorno font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                >
                  Criar Conta Gratuita
                </button>
                <p className="text-odara-white">Configuração em minutos • Suporte incluído</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
