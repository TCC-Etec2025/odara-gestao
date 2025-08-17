import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Verifique se a rota está ativa
  const isActive = (path) => {
    return location.pathname.toLowerCase() === path.toLowerCase();
  };

  return (
    <nav className="bg-odara-primary text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0 group">
          <div className="w-14 h-14 bg-odara-accent rounded-full mr-3 flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
            <img 
              src="../images/Logo final - Icone fundo branco redondo[1].png" 
              alt="Logo Odara Gestão" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null; 
              }}
            />
          </div>
          <h1 className="text-2xl font-bold transition-transform group-hover:scale-105">
            Odara <span className="font-normal">Gestão</span>
          </h1>
        </div>

        {/* Links de Navegação*/}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {[
            { path: '/', label: 'Home' },
            { path: '/documentacao', label: 'Documentação' },
            { path: '/sobre', label: 'Sobre' },
            { path: '/cadastro', label: 'Cadastro' }
          ].map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`
                relative px-1 py-1 font-medium transition-all
                ${isActive(item.path) 
                  ? 'text-odara-dark font-semibold' 
                  : 'text-white hover:text-odara-secondary'
                }
                after:content-[''] after:absolute after:bottom-0 after:left-0 
                after:w-0 after:h-0.5 after:bg-odara-accent after:transition-all
                hover:after:w-full ${isActive(item.path) ? 'after:w-full' : ''}
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;