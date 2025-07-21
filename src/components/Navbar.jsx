import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Verifique se a rota está ativa para colorirmos
  const isActive = (path) => {
    return location.pathname.toLowerCase() === path.toLowerCase();
  };

  return (
    <nav className="bg-odara-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-14 h-14 bg-odara-accent rounded-full mr-3 flex items-center justify-center">
            <span className="text-2xl font-bold text-odara-dark">OG</span>
          </div>
          <h1 className="text-2xl font-bold">Odara Gestão</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Link 
            to="/documentacao" 
            className={`hover:text-odara-secondary transition font-medium ${
              isActive('/documentacao') ? 'text-odara-dark font-bold underline' : ''
            }`}
          >
            Documentação
          </Link>
          <Link 
            to="/sobre" 
            className={`hover:text-odara-secondary transition font-medium ${
              isActive('/sobre') ? 'text-odara-dark font-bold underline' : ''
            }`}
          >
            Sobre
          </Link>
          <Link 
            to="/cadastro" 
            className={`hover:text-odara-secondary transition font-medium ${
              isActive('/cadastro') ? 'text-odara-dark font-bold underline' : ''
            }`}
          >
            Cadastro
          </Link>
          <Link 
            to="/" 
            className={`hover:text-odara-secondary transition font-medium ${
              isActive('/') ? 'text-odara-dark font-bold underline' : ''
            }`}
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;