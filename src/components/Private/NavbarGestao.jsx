import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarGestao = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isRegistrosDropdownOpen, setIsRegistrosDropdownOpen] = useState(false);

  // Verifique se a rota está ativa
  const isActive = (path) => {
    return location.pathname.toLowerCase() === path.toLowerCase();
  };

  const navigationItems = [
    {
      path: "/gestao",
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
      path: "./Usuarios",
      label: "Usuarios",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 00-2 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      path: "./Residentes",
      label: "Residentes",
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
  ];

  const registrosItems = [
    { path: "./RegistroPreferencias", label: "Registro de Preferências" },
    { path: "./RegistroMedicamentos", label: "Registro de Medicamento" },
    { path: "./RegistroOcorrencias", label: "Registro de Ocorrências" },
  ];

  return (
    <>
      {/* Botão para abrir/fechar a sidebar em mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-odara-primary text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar estilo ILPI com cores Odara */}
      <div className={`
        fixed inset-y-0 left-0 z-40 bg-odara-primary text-white 
        transform transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 
        ${isCollapsed ? 'w-20' : 'w-64'} 
        shadow-xl flex flex-col
      `}>
        {/* Cabeçalho com informações do usuário */}
        <div className="p-4 border-b border-odara-secondary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-odara-white rounded-full flex items-center justify-center overflow-hidden border-2 border-odara-contorno shadow-lg">
                <img
                  src="../images/Logo final - Icone fundo branco redondo[1].png"
                  alt="Logo Odara Gestão"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                  }}
                />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-white">
                    Odara <span className="font-normal">Gestão</span>
                  </h1>
                  <span className="text-xs text-odara-white/80">Sistema para ILPIs</span>
                </div>
              )}
            </div>
            
            {/* Botão para recolher/expandir a sidebar (apenas em desktop) */}
            <button 
              className="hidden md:block text-odara-white hover:text-odara-contorno"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isCollapsed ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                )}
              </svg>
            </button>
          </div>
          
          {!isCollapsed && (
            <div className="mt-4 flex items-center justify-between p-2 bg-odara-secondary/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-odara-contorno flex items-center justify-center text-odara-primary font-bold text-xs">
                  CA
                </div>
                <div>
                  <Link 
                    to="/perfil" 
                    className="font-semibold text-sm hover:text-odara-contorno transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Dr. Carlos Admin
                  </Link>
                  <p className="text-xs text-odara-white/80">Admin</p>
                </div>
              </div>
              <span className="text-xs bg-odara-white text-odara-primary px-2 py-1 rounded-full">45 mm</span>
            </div>
          )}
        </div>

        {/* Navegação */}
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
          
          {/* Dropdown de Registros */}
          <div className="relative">
            <button
              onClick={() => setIsRegistrosDropdownOpen(!isRegistrosDropdownOpen)}
              className={`
                w-full flex items-center justify-between space-x-3 p-3 rounded-lg text-sm font-medium transition-all duration-200 group
                ${location.pathname.toLowerCase().includes('/registros') 
                  ? "bg-odara-secondary text-odara-contorno border border-odara-contorno shadow-inner" 
                  : "hover:bg-odara-secondary/50 hover:text-white"
                }
              `}
              title={isCollapsed ? "Registros" : ""}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {!isCollapsed && <span>Registros</span>}
              </div>
              {!isCollapsed && (
                <svg 
                  className={`w-4 h-4 transition-transform ${isRegistrosDropdownOpen ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
            
            {/* Dropdown menu para Registros */}
            {(isRegistrosDropdownOpen || isCollapsed) && (
              <div className={`
                mt-1 overflow-hidden transition-all duration-300
                ${isCollapsed ? 'absolute left-full ml-2 w-48' : 'ml-6'}
              `}>
                <div className={`
                  bg-odara-primary border border-odara-secondary rounded-lg shadow-lg py-1
                  ${isCollapsed ? '' : 'border-l-2 border-l-odara-contorno'}
                `}>
                  {registrosItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        block px-4 py-2 text-sm transition-colors duration-200
                        ${isActive(item.path)
                          ? "bg-odara-secondary text-odara-contorno"
                          : "hover:bg-odara-secondary/50 hover:text-white"
                        }
                      `}
                      onClick={() => {
                        setIsRegistrosDropdownOpen(false);
                        if (window.innerWidth < 768) setIsSidebarOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Configurações */}
          <Link
            to="/config"
            className={`
              flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-all duration-200 group
              ${isActive("/config")
                ? "bg-odara-secondary text-odara-contorno border border-odara-contorno shadow-inner"
                : "hover:bg-odara-secondary/50 hover:text-white"
              }
            `}
            title={isCollapsed ? "Configurações" : ""}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {!isCollapsed && <span>Configurações</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-odara-secondary text-odara-contorno text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-50">
                Configurações
              </div>
            )}
          </Link>
        </nav>

        {/* Rodapé da sidebar */}
        <div className="p-4 border-t border-odara-secondary/30">
          {!isCollapsed && (
            <div className="text-center text-xs text-odara-white/60">
              v1.0.0 © 2023 Odara Gestão
            </div>
          )}
        </div>
      </div>

      {/* Overlay para mobile quando sidebar está aberta */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default NavbarGestao;