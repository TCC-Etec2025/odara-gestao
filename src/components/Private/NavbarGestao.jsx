import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

const NavbarGestao = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isRegistrosOpen, setIsRegistrosOpen] = useState(false)

  // Verifique se a rota está ativa
  const isActive = (path) => {
    return location.pathname.toLowerCase() === path.toLowerCase()
  }

  const navigationItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      path: "/usuarios",
      label: "Usuários",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      path: "/residentes",
      label: "Residentes",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      type: "dropdown",
      label: "Registros",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      items: [
        {
          path: "/registros/medicos",
          label: "Registros Médicos",
        },
        {
          path: "/registros/atividades",
          label: "Registros de Atividades",
        },
        {
          path: "/registros/incidentes",
          label: "Registros de Incidentes",
        },
        {
          path: "/registros/visitas",
          label: "Registros de Visitas",
        },
        {
          path: "/registros/financeiros",
          label: "Registros Financeiros",
        },
      ],
    },
    {
      path: "/configuracoes",
      label: "Configurações",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  return (
    <nav className="bg-odara-primary text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-odara-accent rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-lg transition-transform group-hover:scale-105">
              <img
                src="../images/Logo final - Icone fundo branco redondo[1].png"
                alt="Logo Odara Gestão"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null
                }}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white transition-transform group-hover:scale-105">
                Odara <span className="font-normal  nome-empresa-medio">Gestão</span>
              </h1>
              <span className="text-xs text-white/70 hidden sm:block">Sistema de Gestão para ILPs</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              if (item.type === "dropdown") {
                return (
                  <div key={item.label} className="relative group">
                    <button
                      className={`
                        flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                        text-white/90 hover:text-white hover:bg-white/10 hover:shadow-md hover:backdrop-blur-sm
                      `}
                    >
                      <span className="text-white/80 group-hover:text-white">{item.icon}</span>
                      <span>{item.label}</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown para desktop */}
                    <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-1">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                              isActive(subItem.path) ? "bg-gray-100 font-medium" : ""
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative group
                    ${isActive(item.path)
                      ? "bg-odara-light-blue text-odara-dark border border-white/20 shadow-lg backdrop-blur-sm"
                      : "text-white/90 hover:text-white hover:bg-white/10 hover:shadow-md hover:backdrop-blur-sm"
                    }
                  `}
                >
                  <span
                    className={`transition-colors ${isActive(item.path) ? "text-odara-dark" : "text-white/80 group-hover:text-white"}`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-odara-dark rounded-full"></div>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Menu expandido */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-2">
            <div className="flex flex-col space-y-1">
              {navigationItems.map((item) => {
                if (item.type === "dropdown") {
                  return (
                    <div key={item.label}>
                      <button
                        className={`
                          flex items-center justify-between w-full space-x-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg mx-2
                          text-white/90 hover:text-white hover:bg-white/10
                        `}
                        onClick={() => setIsRegistrosOpen(!isRegistrosOpen)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-white/80">{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                        <svg 
                          className={`w-4 h-4 transition-transform ${isRegistrosOpen ? "rotate-180" : ""}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Submenu para mobile */}
                      {isRegistrosOpen && (
                        <div className="pl-10 pr-2 py-1 space-y-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`
                                flex items-center space-x-3 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg
                                ${isActive(subItem.path)
                                  ? "bg-odara-accent text-odara-dark"
                                  : "text-white/90 hover:text-white hover:bg-white/10"
                                }
                              `}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <span>{subItem.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg mx-2
                      ${isActive(item.path)
                        ? "bg-odara-accent text-odara-dark border-l-4 border-white shadow-md"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className={`transition-colors ${isActive(item.path) ? "text-odara-dark" : "text-white/80"}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavbarGestao