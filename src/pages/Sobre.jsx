import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Sobre = () => {
  const desenvolvedores = [
    {
      nome: 'Letícia Veiga',
      github: '#',
      linkedin: '#'
    },
    {
      nome: 'Lucas Martins',
      github: '#',
      linkedin: '#'
    },
    {
      nome: 'Nicole Cajueiro',
      github: '#',
      linkedin: '#'
    },
    {
      nome: 'Jamilly Evelyn',
      github: '#',
      linkedin: '#'
    }
  ];

  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-odara-primary mb-2">
          Odara <span className="font-normal text-4xl nome-empresa-medio">Gestão</span>
        </h1>
        <h2 className="text-xl text-odara-accent">Nossa Missão</h2>
      </header>

      <section className="bg-odara-offwhite p-6 rounded-lg shadow-md mb-12 border-l-4 border-odara-primary">
        <p className="text-odara-dark mb-4">
          A <strong className="text-odara-primary">Odara Gestão</strong> é um Sistema de Gestão dedicado à facilitação da gestão de Instituições de Lares para Pessoas Séniores (ILPS). Temos como objetivo auxiliar a administração diária e cuidados dos devidos pacientes.
        </p>
        <p className="text-odara-dark">
          Esse aplicativo estará contribuindo tanto com o trabalho de registrar informações dos enfermeiros quanto a participação e ciência dos responsáveis pelo sênior.
        </p>
      </section>
      <header className="text-center mb-12">
        <h2 className="text-xl text-odara-accent">Quem Somos?</h2>
      </header>

      <section className="bg-odara-offwhite p-6 rounded-lg shadow-md mb-12 border-l-4 border-odara-primary">
        <p className="text-odara-dark mb-4">
          Pensada para um projeto de conclusão de curso (TCC) a <strong className="text-odara-primary">Odara Gestão</strong> surgiu da observação de que o mercado dedicado aos cuidados com indivíduos séniores é carente, de forma geral, de sistemas de gestão dedicados a tanto facilitar a vida dos funcionários dessas residências quanto para apoiar e tranquilizar os parentes de seus clientes/pacientes.
        </p>

        <p className="text-odara-dark mb-4">
          Diante dessa lacuna, a Imber Solis propõe o desenvolvimento de uma plataforma digital inovadora, focada na gestão integrada de lares para idosos e instituições de longa permanência. O sistema tem como principal objetivo otimizar rotinas administrativas, melhorar a comunicação entre os profissionais e familiares, além de garantir maior segurança e bem-estar aos residentes.
        </p>

        <p className="text-odara-dark">
          Ademais, o programa visa sobressalt-se por apresentar um design amigável, que facilita o uso por pessoas com mais ou menos experiência em informática, e por permitir adaptações de acordo com o tamanho e as precisões únicas de cada organização.
        </p>
      </section>

      <section className="bg-odara-dropdown p-6 rounded-lg shadow-md mb-12 border-l-4 border-odara-secondary">
        <h2 className="text-2xl font-bold text-odara-dropdown-accent mb-6 text-center">
          Confira abaixo os desenvolvedores da Odara Gestão!
        </h2>

        <div className="flex overflow-x-auto pb-4 gap-6 justify-center">
          {desenvolvedores.map((dev, index) => (
            <div key={index} className="flex flex-col items-center min-w-[120px] flex-shrink-0">
              <span className="text-odara-dark font-medium mb-2 text-center">{dev.nome}</span>
              <div className="flex gap-3">
                <a href={dev.github} target="_blank" rel="noopener noreferrer" className="text-odara-secondary hover:text-odara-primary transition-colors">
                  <FaGithub size={24} />
                </a>
                <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="text-odara-secondary hover:text-odara-primary transition-colors">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Sobre;