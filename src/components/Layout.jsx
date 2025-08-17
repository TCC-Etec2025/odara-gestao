import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-odara-lightest">
      <Navbar />
      <main className="flex-grow container mx-auto py-8 px-4">
        <Outlet /> {/*  é onde o conteúdo das páginas será colocado e linkado tudo*/}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;