import React, { useState } from 'react';
import { FaUtensils, FaWalking, FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle } from 'react-icons/fa';

const RegistroPreferencias = () => {
  // Dados iniciais das preferências
  const [preferences, setPreferences] = useState({
    alimentar: [
      { id: 1, title: "Comida Italiana", description: "Prefere massas e pratos da culinária italiana" },
      { id: 2, title: "Vegetariano", description: "Prefere refeições sem carne" }
    ],
    atividades: [
      { id: 3, title: "Leitura", description: "Gosta de ler livros no tempo livre" },
      { id: 4, title: "Caminhada", description: "Prefere caminhar ao ar livre" }
    ]
  });
  
  const [modalAberto, setModalAberto] = useState(false);
  const [categoriaAtual, setCategoriaAtual] = useState('');
  const [novaPreferencia, setNovaPreferencia] = useState({ titulo: '', descricao: '' });
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [tooltipVisivel, setTooltipVisivel] = useState(null);

  // Categorias disponíveis
  const CATEGORIAS = {
    ALIMENTAR: 'alimentar',
    ATIVIDADES: 'atividades'
  };

  // Labels para exibição
  const CATEGORIA_LABELS = {
    [CATEGORIAS.ALIMENTAR]: "Alimentar",
    [CATEGORIAS.ATIVIDADES]: "Atividades"
  };

  // Filtros disponíveis
  const FILTROS = [
    { id: 'todos', label: 'Todos' },
    { id: CATEGORIAS.ALIMENTAR, label: CATEGORIA_LABELS[CATEGORIAS.ALIMENTAR] },
    { id: CATEGORIAS.ATIVIDADES, label: CATEGORIA_LABELS[CATEGORIAS.ATIVIDADES] }
  ];

  // Abrir modal para adicionar nova preferência
  const abrirModalAdicionar = (categoria) => {
    setCategoriaAtual(categoria);
    setNovaPreferencia({ titulo: '', descricao: '' });
    setEditando(false);
    setIdEditando(null);
    setModalAberto(true);
  };

  // Abrir modal para editar preferência existente
  const abrirModalEditar = (categoria, id) => {
    const preferenciaParaEditar = preferences[categoria].find(item => item.id === id);
    if (preferenciaParaEditar) {
      setCategoriaAtual(categoria);
      setNovaPreferencia({ 
        titulo: preferenciaParaEditar.title, 
        descricao: preferenciaParaEditar.description 
      });
      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  // Salvar preferência (tanto nova quanto edição)
  const salvarPreferencia = () => {
    if (!novaPreferencia.titulo || !novaPreferencia.descricao) return;
    
    if (editando && idEditando) {
      // Modo edição
      setPreferences(prev => ({
        ...prev,
        [categoriaAtual]: prev[categoriaAtual].map(item => 
          item.id === idEditando ? { 
            ...item, 
            title: novaPreferencia.titulo, 
            description: novaPreferencia.descricao 
          } : item
        )
      }));
    } else {
      // Modo adição
      const novoItem = {
        id: Date.now(),
        title: novaPreferencia.titulo,
        description: novaPreferencia.descricao
      };
      
      setPreferences(prev => ({
        ...prev,
        [categoriaAtual]: [...prev[categoriaAtual], novoItem]
      }));
    }
    
    setModalAberto(false);
  };

  // Excluir preferência
  const excluirPreferencia = (categoria, id) => {
    if (window.confirm('Tem certeza que deseja excluir esta preferência?')) {
      setPreferences(prev => ({
        ...prev,
        [categoria]: prev[categoria].filter(item => item.id !== id)
      }));
    }
  };

  // Filtrar preferências com base no filtro ativo
  const preferenciasFiltradas = filtroAtivo === 'todos' 
    ? preferences 
    : { [filtroAtivo]: preferences[filtroAtivo] };

  return (
    <div className="min-h-screen bg-gradient-to-br from-odara-offwhite to-odara-primary/30 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-odara-offwhite rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-odara-primary">
          <h1 className="text-3xl font-bold text-odara-dark mb-4">Registro de Preferências</h1>
          <p className="text-odara-dark max-w-3xl leading-relaxed">
            O <strong className="text-odara-accent">Registro de Preferências</strong> é uma ficha que permite um cuidado mais humanizado, 
            respeitando os gostos individuais como preferências alimentares, horários, banho e atividades de lazer.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-odara-offwhite rounded-2xl shadow-lg p-6 border-l-4 border-odara-primary">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-odara-dark">Preferências</h2>
                <div className="flex space-x-3">
                  <button 
                    className="bg-odara-accent hover:bg-odara-secondary/90 text-odara-contorno font-medium py-2 px-4 rounded-lg flex items-center transition duration-200 border-2 border-odara-contorno"
                    onClick={() => abrirModalAdicionar(CATEGORIAS.ALIMENTAR)}
                  >
                    <FaPlus className="mr-2" />
                    Adicionar
                  </button>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-odara-dark mb-4 flex items-center">
                  <FaUtensils className="mr-2 text-odara-accent" />
                  Alimentar
                </h3>
                <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {preferenciasFiltradas[CATEGORIAS.ALIMENTAR]?.map(item => (
                    <li key={item.id} className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-start hover:shadow-md transition-shadow duration-200">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-odara-dark">{item.title}</h4>
                          <div className="relative">
                            <button 
                              onMouseEnter={() => setTooltipVisivel(item.id)}
                              onMouseLeave={() => setTooltipVisivel(null)}
                              className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 p-1"
                            >
                              <FaInfoCircle />
                            </button>
                            {tooltipVisivel === item.id && (
                              <div className="absolute z-10 left-0 bottom-full mb-2 w-64 p-3 bg-odara-dark text-white text-sm rounded-lg shadow-lg">
                                {item.description}
                                <div className="absolute top-full left-4 border-4 border-transparent border-t-odara-dark"></div>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-odara-dark/70 text-sm mt-1 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button 
                          onClick={() => abrirModalEditar(CATEGORIAS.ALIMENTAR, item.id)}
                          className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 p-1 rounded-full hover:bg-odara-accent/10"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => excluirPreferencia(CATEGORIAS.ALIMENTAR, item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-odara-dark mb-4 flex items-center">
                  <FaWalking className="mr-2 text-odara-accent" />
                  Atividades
                </h3>
                <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {preferenciasFiltradas[CATEGORIAS.ATIVIDADES]?.map(item => (
                    <li key={item.id} className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-start hover:shadow-md transition-shadow duration-200">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-odara-dark">{item.title}</h4>
                          <div className="relative">
                            <button 
                              onMouseEnter={() => setTooltipVisivel(item.id)}
                              onMouseLeave={() => setTooltipVisivel(null)}
                              className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 p-1"
                            >
                              <FaInfoCircle />
                            </button>
                            {tooltipVisivel === item.id && (
                              <div className="absolute z-10 left-0 bottom-full mb-2 w-64 p-3 bg-odara-dark text-white text-sm rounded-lg shadow-lg">
                                {item.description}
                                <div className="absolute top-full left-4 border-4 border-transparent border-t-odara-dark"></div>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-odara-dark/70 text-sm mt-1 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button 
                          onClick={() => abrirModalEditar(CATEGORIAS.ATIVIDADES, item.id)}
                          className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 p-1 rounded-full hover:bg-odara-accent/10"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => excluirPreferencia(CATEGORIAS.ATIVIDADES, item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-odara-offwhite rounded-2xl shadow-lg p-6 border-l-4 border-odara-primary">
              <h3 className="text-xl font-semibold text-odara-dark mb-4 flex items-center">
                <FaFilter className="mr-2 text-odara-accent" />
                Filtro
              </h3>
              <div className="flex flex-wrap gap-3">
                {FILTROS.map(filtro => (
                  <button
                    key={filtro.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 border-2 ${
                      filtroAtivo === filtro.id 
                        ? 'bg-odara-accent text-odara-contorno border-odara-contorno' 
                        : 'bg-white text-odara-dark border-odara-primary/30 hover:bg-odara-primary/10'
                    }`}
                    onClick={() => setFiltroAtivo(filtro.id)}
                  >
                    {filtro.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-odara-offwhite rounded-2xl shadow-lg p-6 h-fit border-l-4 border-odara-primary">
            <h3 className="text-xl font-semibold text-odara-dark mb-4">FOTO ILUSTRATIVA</h3>
            <div className="bg-white rounded-lg p-8 text-center border border-odara-primary/30">
              <div className="w-32 h-32 mx-auto bg-odara-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-odara-primary text-4xl">👤</span>
              </div>
              <p className="text-odara-dark">Área para foto do paciente</p>
            </div>
          </div>
        </div>
        
        {/* Modal para adicionar/editar preferência */}
        {modalAberto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-odara-offwhite rounded-xl shadow-2xl max-w-md w-full p-6 border-l-4 border-odara-primary">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-odara-dark">
                  {editando ? 'Editar' : 'Adicionar'} Preferência - {CATEGORIA_LABELS[categoriaAtual]}
                </h2>
                <button 
                  onClick={() => setModalAberto(false)}
                  className="text-odara-dark hover:text-odara-accent transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Título</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-odara-accent focus:border-transparent transition-all duration-200"
                    value={novaPreferencia.titulo}
                    onChange={(e) => setNovaPreferencia({...novaPreferencia, titulo: e.target.value})}
                    placeholder="Digite o título"
                  />
                </div>
                
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Descrição</label>
                  <textarea 
                    className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-odara-accent focus:border-transparent transition-all duration-200"
                    value={novaPreferencia.descricao}
                    onChange={(e) => setNovaPreferencia({...novaPreferencia, descricao: e.target.value})}
                    placeholder="Digite a descrição"
                    rows="4"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setModalAberto(false)}
                  className="px-4 py-2 border border-odara-primary/30 text-odara-dark rounded-lg hover:bg-white transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button 
                  onClick={salvarPreferencia}
                  className="px-4 py-2 bg-odara-accent text-odara-contorno rounded-lg hover:bg-odara-secondary/90 transition-colors duration-200 border-2 border-odara-contorno"
                  disabled={!novaPreferencia.titulo || !novaPreferencia.descricao}
                >
                  {editando ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroPreferencias;