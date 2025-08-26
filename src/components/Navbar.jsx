import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation()

  // Verifique se a rota está ativa
  const isActive = (path) => {
    return location.pathname.toLowerCase() === path.toLowerCase()
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      path: "/",
      label: "Home",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      path: "/documentacao",
      label: "Documentação",
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
    },
    {
      path: "/sobre",
      label: "Sobre",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      path: "/cadastro",
      label: "Cadastro",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ]

  return (
    <nav className="bg-odara-primary text-white shadow-lg sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-0.5">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-odara-white rounded-full flex items-center justify-center overflow-hidden border-2 border-odara-contorno shadow-lg transition-transform">
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
              <h1 className="text-xl font-bold text-white transition-transform">
                Odara <span className="font-normal  nome-empresa-pequeno">Gestão</span>
              </h1>
              <span className="text-xs text-odara-white hidden sm:block">Sistema de Gestão para ILPIs</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition duration-200 relative group font-semibold text-odara-contorno transform
                  ease-in-out
                  ${isActive(item.path)
                    ? "bg-odara-secondary text-odara-contorno border-2 border-odara-contorno shadow-lg backdrop-blur-sm"
                    : "hover:bg-white hover:text-odara-primary hover:border-2 hover:border-odara-contorno  hover:scale-100 hover:shadow-md hover:backdrop-blur-sm"
                  }
                `}
              >
                <span
                  className={`transition-colors ${isActive(item.path) ? "text-odara-white" : ""}`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-0.5 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Botão do menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Menu expandido (visível apenas em mobile) */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-2">
            <div className="flex flex-col space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition duration-100 rounded-lg mx-2 font-semibold text-odara-contorno transform ease-in-out ${isActive(item.path)
                      ? "bg-odara-secondary text-odara-contorno border-2 border-odara-contorno shadow-md"
                      : "hover:bg-white hover:text-odara-primary hover:border-2 hover:border-odara-contorno"
                    }
                  `}
                >
                  {/* Ícone com transição de cor */}
                  <span className={`transition-colors ${isActive(item.path) ? "text-odara-white" : ""}`}>
                    {item.icon}
                  </span>

                  {/* Label do item */}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav >
  )
}

export default Navbar
