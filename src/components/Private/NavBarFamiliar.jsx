import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavbarFamiliar = ({ isCollapsed, setIsCollapsed, searchTerm, setSearchTerm }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Verifica se a rota está ativa
  const isActive = (path) => {
    return location.pathname.toLowerCase() === path.toLowerCase();
  };

  return (
    <>
      {/* Barra de Navegação Superior */}
      <div className="fixed top-0 left-0 right-0 h-13 bg-white shadow-md z-40 flex items-center justify-between px-4">
        <div className="h-13 flex items-center px-4 border-b border-odara-secondary/30 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
          <div className="flex items-center overflow-hidden">
            <img
              src="../images/Logo final - Icone fundo branco redondo[1].png"
              alt="Logo Odara Gestão"
              className="w-8 h-8 object-contain flex-shrink-0"
            />
            <span className={`ml-2 text-xl font-bold text-white transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
              <h1 className="text-xl font-bold text-white">
                Área do <span className="font-normal">Responsável</span>
              </h1>
            </span>
          </div>
        </div>
        <div className="flex items-center">
          {/* Botão de alternância da barra lateral para dispositivos móveis */}
          <button
            className="md:hidden p-2 rounded-md text-odara-primary mr-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Logo na navbar superior para mobile */}
          <div className="flex items-center space-x-2 md:hidden">
            <div className="w-8 h-8 bg-odara-accent rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="../images/Logo final - Icone fundo branco redondo[1].png"
                alt="Logo Odara Gestão"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-bold text-odara-primary">Área do Funcionário</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Botão de Notificações */}
          <button className="relative p-1 text-gray-600 hover:text-odara-primary">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Dropdown do Perfil */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-odara-primary flex items-center justify-center text-white font-bold text-xs">
                FU
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">Responsavel</span>
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/perfil-funcionario"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  Meu Perfil
                </Link>
                <div className="border-t border-gray-100"></div>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    navigate("/login");
                    setIsProfileDropdownOpen(false);
                  }}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarFamiliar;