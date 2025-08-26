import { Outlet } from 'react-router-dom';
import NavbarGestao from './NavbarGestao';
import Footer from '../Footer';

const LayoutGestao = () => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <div className="w-full">
        <NavbarGestao />
      </div>
      
      {/* Conteúdo principal que se expande totalmente */}
      <main className="flex-grow w-full max-w-[100vw] bg-gray-50">
        <div className="mx-auto w-full">
          <Outlet /> {/* Aqui serão renderizadas as páginas de gestão */}
        </div>
      </main>
      
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default LayoutGestao;