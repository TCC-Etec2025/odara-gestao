import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarGestao from './NavbarGestao';

const LayoutGestao = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // estado da sidebar
  const [searchTerm, setSearchTerm] = useState('');      // estado global do search

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <div className="w-full">
        <NavbarGestao
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Configutração para o site geral no sidebar e navbar*/}
      <main
        className={`flex-grow transition-all duration-300
          ${isCollapsed ? 'pl-20' : 'pl-25'} 
          pt-13
          bg-odara-offwhite
        `}
      >
        <div className="mx-auto w-full">
          {/* Passa searchTerm para todas as páginas (NÃO FUNCIONANDO)*/}
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default LayoutGestao;
