import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarGestao from './NavbarGestao';

const LayoutGestao = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); 
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div
      className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <div className="w-full">
        <NavbarGestao
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Área de conteúdo principal, ajusta o padding com base no estado recolhido da barra lateral */}
      <main
        className={`flex-grow transition-all duration-300
          ${isCollapsed ? 'pl-20' : 'pl-64'} // Ajusta o padding com base em isCollapsed
          pt-13
          bg-odara-offwhite
        `}
      >
        <div className="mx-auto w-full">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default LayoutGestao;