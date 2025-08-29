import React, { useState } from 'react';
import { FaPaperPlane, FaPlus, FaCheckCircle } from 'react-icons/fa';

const RegistroMidiaSimples = () => {
  const [ultimaMidia, setUltimaMidia] = useState(null);
  const [formulario, setFormulario] = useState({ residente: '', url: '', descricao: '' });
  const [mostrarSucesso, setMostrarSucesso] = useState(false);

  // Lista de residentes para o dropdown
  const residentes = [
    { nome: 'João', foto: '../images/foto-idoso-joao.jpg' },
    { nome: 'Maria', foto: '../images/foto-idosa-maria.png' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formulario.residente || !formulario.url) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setUltimaMidia({
      ...formulario,
      id: Date.now(),
      isImagem: formulario.url.match(/\.(jpeg|jpg|gif|png)$/) != null
    });

    setMostrarSucesso(true);
    // Limpar o formulário após o envio
    setFormulario({ residente: '', url: '', descricao: '' });

    setTimeout(() => {
      setMostrarSucesso(false);
    }, 3000);
  };

  return (
    <div className="flex min-h-screen bg-odara-offwhite p-6 lg:p-10">
      <div className="flex-1 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-odara-dark mb-6">Enviar Mídia</h1>

        {mostrarSucesso && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 flex items-center" role="alert">
            <FaCheckCircle className="mr-3 text-2xl" />
            <p className="font-bold">Mídia enviada com sucesso!</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coluna do Formulário */}
          <div>
            <h2 className="text-xl font-semibold text-odara-dark mb-4">Novo Envio</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="residente" className="block text-odara-dark font-medium mb-2">Residente</label>
                <select
                  id="residente"
                  name="residente"
                  value={formulario.residente}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                  required
                >
                  <option value="">Selecione um residente</option>
                  {residentes.map(r => (
                    <option key={r.nome} value={r.nome}>{r.nome}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="url" className="block text-odara-dark font-medium mb-2">URL da Mídia</label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={formulario.url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                  placeholder="Cole o link da foto ou vídeo"
                  required
                />
              </div>

              <div>
                <label htmlFor="descricao" className="block text-odara-dark font-medium mb-2">Descrição (opcional)</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formulario.descricao}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                  rows="3"
                  placeholder="Adicione uma legenda"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-odara-accent hover:bg-odara-secondary/90 text-odara-contorno font-medium py-3 rounded-lg flex items-center justify-center transition duration-200 border-2 border-odara-contorno"
              >
                <FaPaperPlane className="mr-2" /> Enviar Mídia
              </button>
            </form>
          </div>

          {/* Coluna da Última Mídia Enviada */}
          <div className="mt-8 md:mt-0 p-6 bg-odara-offwhite rounded-xl shadow-inner border border-gray-200">
            <h2 className="text-xl font-semibold text-odara-dark mb-4">Último Envio</h2>
            {ultimaMidia ? (
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <p className="font-bold text-odara-dark mb-1">Para: {ultimaMidia.residente}</p>
                <p className="text-sm text-odara-dark/70 mb-3">{ultimaMidia.descricao || 'Sem descrição'}</p>
                <div className="w-full h-auto rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                  {ultimaMidia.isImagem ? (
                    <img src={ultimaMidia.url} alt="Mídia enviada" className="w-full h-auto object-cover max-h-60" />
                  ) : (
                    <video controls className="w-full h-auto max-h-60">
                      <source src={ultimaMidia.url} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-8">
                <FaPlus className="text-6xl mb-4" />
                <p>Nenhuma mídia enviada ainda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroMidiaSimples;