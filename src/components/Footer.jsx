import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-odara-secondary text-white py-8 border-t-4 border-odara-contorno">
      <div className="container mx-auto px-4">
        {/*Grid responsivo para a seção superior*/}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8 lg:ml-10 items-center justify-items-center">
          
          {/*Logo e Título*/}
          <div className="lg:col-span-1 md:col-span-2 col-span-1 flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <div className="w-20 h-20 bg-odara-white rounded-full mr-3 flex items-center justify-center overflow-hidden border-2 border-odara-contorno shadow-lg">
                <img
                  src="../images/Logo final - Icone fundo branco redondo[1].png"
                  alt="Logo Odara Gestão"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                  }}
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-4xl font-bold transition-transform group-hover:scale-105">
                  Odara <span className="nome-empresa-medio text-xl">Gestão</span>
                </h2>
                <span className="text-xm text-odara-white hidden sm:block">Sistema de Gestão para ILPIs</span>
              </div>
            </div>
          </div>

          {/*Redes Sociais*/}
          <div className="lg:col-span-1 md:col-span-2 col-span-1 text-center">
            <h3 className="text-xl font-bold mb-4">Siga-nos em nossas redes:</h3>
            <div className="flex justify-center space-x-4">
              <a href="#"><FaInstagram className="h-6 w-6 hover:text-odara-primary" /></a>
              <a href="#"><FaFacebook className="h-6 w-6 hover:text-odara-primary" /></a>
              <a href="#"><FaLinkedin className="h-6 w-6 hover:text-odara-primary" /></a>
            </div>
          </div>

          {/*Link WhatsApps*/}
          <div className="lg:col-span-1 md:col-span-1 col-span-1 flex justify-items-center">
            <a
              href="https://wa.me/5512987654321"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-odara-primary text-white py-3 px-6 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaWhatsapp className="text-2xl" />
              <span className="font-semibold">Fale Conosco</span>
            </a>
          </div>
        </div>

        {/*divisória*/}
        <div className="border-t-2 border-odara-contorno rounded-full my-6"></div>

        {/*Endereço*/}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 text-center justify-items-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-odara-white mr-2" />
              <h3 className="font-bold text-odara-contorno">Endereço</h3>
            </div>
            <p>Rua Estafania do Nascimento</p>
            <p>Jardim das Indústrias</p>
            <p>São José dos Campos - SP</p>
          </div>

        {/*E-mail*/}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-2">
              <FaEnvelope className="text-odara-white mr-2" />
              <h3 className="font-bold text-odara-contorno">E-mail</h3>
            </div>
            <a href="mailto:contato@odaragestao.com" className="hover:text-odara-primary hover:underline">
              contato@odaragestao.com
            </a>
          </div>

        {/*Telefone*/}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-2">
              <FaPhoneAlt className="text-odara-white mr-2" />
              <h3 className="font-bold text-odara-contorno">Telefone</h3>
            </div>
            <p>(12) 3456-7890</p>
            <p className="text-sm opacity-80">Seg-Sex: 9h às 18h</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm opacity-80">
          <p>VERSÃO 0.2 | © {new Date().getFullYear()} Odara Gestão. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;