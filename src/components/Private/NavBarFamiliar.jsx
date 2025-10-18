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
        <div className="flex items-center">
          {/* Logo na navbar superior para mobile */}
          <div className="flex items-center space-x-2">
            <div className="ml-3 w-12 h-12 flex items-center justify-center overflow-hidden">
              <img
                src="../images/Logo_final_-_sem fundo.png"
                alt="Logo Odara Gestão"
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold  text-odara-primary transition-transform">
                Odara <span className="font-normal text-odara-primary nome-empresa-pequeno">Gestão</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Dropdown do Perfil */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-odara-primary flex items-center justify-center text-white font-bold text-xs">
                JS
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">Joana Silva</span>
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