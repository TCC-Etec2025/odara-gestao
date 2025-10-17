import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavbarFuncionario = ({ isCollapsed, setIsCollapsed, searchTerm, setSearchTerm }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Verifica se a rota está ativa
  const isActive = (path) => {
    return location.pathname.toLowerCase() === path.toLowerCase();
  };

  const navigationItems = [
    {
      path: "/funcionario",
      label: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      path: "./residentes/funcionario",
      label: "Meus Residentes",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      path: "./checklist",
      label: "Checklists",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      path: "./relatorios",
      label: "Meus Relatórios",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Barra de Navegação Superior */}
      <div className="fixed top-0 left-0 right-0 h-13 bg-white shadow-md z-40 flex items-center justify-between px-4">
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
              <span className="hidden md:block text-sm font-medium text-gray-700">Funcionário</span>
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

      {/* Barra Lateral - igual ao do gestor */}
      <div className={`
        fixed top-0 left-0 inset-y-0 z-50 bg-odara-primary text-white
        transform transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 
        ${isCollapsed ? 'w-20' : 'w-64'}  
        shadow-xl flex flex-col
        h-screen
      `}
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
      >
        <div className="h-13 flex items-center px-4 border-b border-odara-secondary/30 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
          <div className="flex items-center overflow-hidden">
            <img
              src="../images/Logo final - Icone fundo branco redondo[1].png"
              alt="Logo Odara Gestão"
              className="w-8 h-8 object-contain flex-shrink-0"
            />
            <span className={`ml-2 text-xl font-bold text-white transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
              <h1 className="text-xl font-bold text-white">
                Área do <span className="font-normal">Funcionário</span>
              </h1>
            </span>
          </div>
        </div>

        {/* Links de Navegação */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-all duration-200 group
                ${isActive(item.path)
                  ? "bg-odara-secondary text-odara-contorno border border-odara-contorno shadow-inner"
                  : "hover:bg-odara-secondary/50 hover:text-white"
                }
              `}
              title={isCollapsed ? item.label : ""}
            >
              <span className={`${isActive(item.path) ? "text-odara-contorno" : "text-odara-white"}`}>
                {item.icon}
              </span>
              {!isCollapsed && <span>{item.label}</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-odara-secondary text-odara-contorno text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-50">
                  {item.label}
                </div>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-odara-secondary/30">
          {!isCollapsed && (
            <div className="text-center text-xs text-odara-white/60">
              v1.0.0 © 2023 Odara Gestão
            </div>
          )}
        </div>
      </div>

      {/* Overlay para dispositivos móveis quando a barra lateral está aberta */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 md:hidden mt-16"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default NavbarFuncionario;