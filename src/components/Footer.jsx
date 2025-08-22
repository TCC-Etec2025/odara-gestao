import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-odara-primary text-white py-8 border-t-4 border-odara-accent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-6">

          <div className="flex flex-col items-center lg:items-start group">
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 bg-odara-accent rounded-full mr-3 flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                <img
                  src="../images/Logo final - Icone fundo branco redondo[1].png"
                  alt="Logo Odara Gestão"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                  }}
                />
              </div>
              <h2 className="text-2xl font-bold transition-transform group-hover:scale-105">
                Odara <span className="nome-empresa-medio">Gestão</span>
              </h2>
            </div>

            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Siga-nos em nossas redes:</h3>
              <div className="flex space-x-4">
                <a href="#"><FaInstagram className="h-6 w-6 hover:text-indigo-300" /></a>
                <a href="#"><FaFacebook className="h-6 w-6 hover:text-indigo-300" /></a>
                <a href="#"><FaLinkedin className="h-6 w-6 hover:text-indigo-300" /></a>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/5512987654321"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FaWhatsapp className="text-2xl" />
            <span className="font-semibold">Fale Conosco</span>
          </a>
        </div>

        <div className="border-t border-odara-accent my-6 opacity-30"></div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-6 text-center justify-items-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-odara-accent mr-2" />
              <h3 className="font-semibold">Endereço</h3>
            </div>
            <p>Rua Estafania do Nascimento</p>
            <p>Jardim das Indústrias</p>
            <p>São José dos Campos - SP</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-2">
              <FaEnvelope className="text-odara-accent mr-2" />
              <h3 className="font-semibold">Email</h3>
            </div>
            <a href="mailto:contato@odaragestao.com" className="hover:text-odara-secondary hover:underline">
              contato@odaragestao.com
            </a>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-2">
              <FaPhoneAlt className="text-odara-accent mr-2" />
              <h3 className="font-semibold">Telefone</h3>
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