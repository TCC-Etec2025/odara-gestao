import React from 'react';

const Documentacao = () => {
  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-odara-primary mb-2">Odara Gestão</h1>
        <h2 className="text-xl text-odara-dark">Confira abaixo a documentação de cada funcionalidade</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {[
          'Registro de medicamentos',
          'Registro de Atividades',
          'Registro de Ocorrências',
          'Registro da saúde corporal inicial',
          'Registro de quadro alimentar',
          'Registro de comportamento',
          'Registro de preferências',
          'Registro de relações internas',
          'Registro de consultas médicas',
          'Registro de exames médicos',
          'Registros de vídeo e fotográfico',
          'Plataforma para chamadas de vídeo'
        ].map((item, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-odara-accent"
          >
            <p className="text-odara-dark">{item}</p>
          </div>
        ))}
      </div>

      <section className="bg-white p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold text-odara-primary mb-4">Registro da Saúde Corporal Inicial</h2>
        <p className="text-odara-dark mb-4">
          O <strong className="text-odara-dark">Registro da Saúde Corporal Inicial</strong> se refere à investigação e registro de eventuais ferimentos e/ou questões corporais no momento da entrada inicial da pessoa idosa na Casa. Com um template anatômico prático, basta selecionar as regiões do corpo afetadas e descrever os sintomas físicos da pessoa idosa referentes a essa região, dessa forma preza-se por um acompanhamento mais completo da saúde do indivíduo e garante um melhor entendimento da situação da saúde dele ao entrar em seu novo lar.
        </p>

        <div className="text-odara-dark space-y-6 mt-8">
          {[
            {
              area: 'Área 1',
              condicoes: [
                'Descrição da condição pontuada.',
                'Descrição da condição pontuada.'
              ]
            },
            {
              area: 'Área 2',
              condicoes: [
                'Descrição da condição pontuada.'
              ]
            },
            {
              area: 'Área 3',
              condicoes: [
                'Descrição da condição pontuada.'
              ]
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="border-l-4 border-odara-accent pl-4"
            >
              <h3 className="font-semibold text-lg text-odara-darkest">{item.area}</h3>
              <ul className="mt-2 space-y-2">
                {item.condicoes.map((condicao, i) => (
                  <li key={i} className="text-odara-dark">
                    <span className="font-medium text-odara-darkest">Condição {i+1}:</span> {condicao}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Documentacao;