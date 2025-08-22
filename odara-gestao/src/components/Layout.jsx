import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <div className="w-full">
        <Navbar />
      </div>
      
      {/* Conteúdo principal que se expande totalmente */}
      <main className="flex-grow w-full max-w-[100vw]">
        <div className="mx-auto w-full">
          <Outlet /> {/*  é onde o conteúdo das páginas será colocado e linkado tudo*/}
        </div>
      </main>
      
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;