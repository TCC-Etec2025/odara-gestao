import React, { useState } from 'react';
import { FaUtensils, FaWalking, FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';


const RegistroCorporal = () => {
  const [preferences, setPreferences] = useState({
    alimentar: [
      { id: 1, title: "Comida Italiana", description: "Prefere massas e pratos da culinária italiana", residente: "João", foto: "../images/foto-idoso-joao.jpg" },
      { id: 2, title: "Vegetariano", description: "Prefere refeições sem carne", residente: "Maria", foto: "../images/foto-idosa-maria.png" }
    ],
    atividades: [
      { id: 3, title: "Leitura", description: "Gosta de ler livros no tempo livre", residente: "João", foto: "../images/foto-idoso-joao.jpg" },
      { id: 4, title: "Caminhada", description: "Prefere caminhar ao ar livre", residente: "Maria", foto: "../images/foto-idosa-maria.png" }
    ],
    cuidador: [
      { id: 5, title: "Leticia", description: "Prefere que Leticia sirva seu alimento", residente: "João", foto: "../images/foto-idoso-joao.jpg" },
      { id: 6, title: "Maria", description: "Prefere que Maria dê banho e cuide de sua higiene", residente: "Maria", foto: "../images/foto-idosa-maria.png" }
    ]
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [categoriaAtual, setCategoriaAtual] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [novaPreferencia, setNovaPreferencia] = useState({ titulo: '', descricao: '', residente: '', foto: '' });
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [infoVisivel, setInfoVisivel] = useState(false);
  const [residenteSelecionado, setResidenteSelecionado] = useState('');
  const [residenteAtual, setResidenteAtual] = useState(null);
  const [dropdownAberto, setDropdownAberto] = useState(false);


  const CATEGORIAS = {
    ALIMENTAR: 'alimentar',
    ATIVIDADES: 'atividades',
    CUIDADOR: 'cuidador'
  };

  const CATEGORIA_LABELS = {
    [CATEGORIAS.ALIMENTAR]: "Alimentar",
    [CATEGORIAS.ATIVIDADES]: "Atividades",
    [CATEGORIAS.CUIDADOR]: "Cuidador"
  };

  const FILTROS = [
    { id: 'todos', label: 'Todos' },
    { id: CATEGORIAS.ALIMENTAR, label: CATEGORIA_LABELS[CATEGORIAS.ALIMENTAR] },
    { id: CATEGORIAS.ATIVIDADES, label: CATEGORIA_LABELS[CATEGORIAS.ATIVIDADES] },
    { id: CATEGORIAS.CUIDADOR, label: CATEGORIA_LABELS[CATEGORIAS.CUIDADOR] }
  ];

  const abrirModalAdicionar = (categoria) => {
    setCategoriaAtual(categoria);
    setNovaPreferencia({ titulo: '', descricao: '', residente: '', foto: '' });
    setEditando(false);
    setIdEditando(null);
    setModalAberto(true);
  };

  const abrirModalEditar = (categoria, id) => {
    const preferenciaParaEditar = preferences[categoria].find(item => item.id === id);
    if (preferenciaParaEditar) {
      setCategoriaAtual(categoria);
      setNovaPreferencia({
        titulo: preferenciaParaEditar.title,
        descricao: preferenciaParaEditar.description,
        residente: preferenciaParaEditar.residente,
        foto: preferenciaParaEditar.foto
      });
      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  const salvarPreferencia = () => {
    if (!novaPreferencia.titulo || !novaPreferencia.descricao) return;

    if (editando && idEditando) {
      // Atualiza existente
      setPreferences(prev => ({
        ...prev,
        [categoriaAtual]: prev[categoriaAtual].map(item =>
          item.id === idEditando
            ? {
              ...item,
              title: novaPreferencia.titulo,
              description: novaPreferencia.descricao,
              residente: novaPreferencia.residente,
              foto: novaPreferencia.foto
            }
            : item
        )
      }));
    } else {
      // Adiciona novo 
      const novoItem = {
        id: Date.now(),
        title: novaPreferencia.titulo,
        description: novaPreferencia.descricao,
        residente: novaPreferencia.residente,
        foto: novaPreferencia.foto
      };
      setPreferences(prev => ({
        ...prev,
        [categoriaAtual]: [...prev[categoriaAtual], novoItem]
      }));
    }

    setModalAberto(false);
  };


  const excluirPreferencia = (categoria, id) => {
    if (window.confirm('Tem certeza que deseja excluir esta preferência?')) {
      setPreferences(prev => ({
        ...prev,
        [categoria]: prev[categoria].filter(item => item.id !== id)
      }));
    }
  };

  const residentes = Array.from(new Set(
    [...preferences.alimentar, ...preferences.atividades, ...preferences.cuidador]
      .map(item => item.residente)
      .filter(Boolean)
  ));

  // Filtrar preferências por categoria e residente
  const preferenciasFiltradas = Object.fromEntries(
    Object.entries(preferences).map(([cat, items]) => [
      cat,
      items.filter(item =>
        (filtroAtivo === 'todos' || filtroAtivo === cat) &&
        (!residenteSelecionado || item.residente === residenteSelecionado)
      )
    ])
  );

  return (
    <div className="flex min-h-screen from-odara-offwhite to-odara-primary/30">
      <div className="flex-1 p-6 lg:p-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="flex items-center mb-1">
              <Link
                to="/funcionario"
                className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 flex items-center"
              >
                <FaArrowLeft className="mr-1" />
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-odara-dark mr-2">Registro de Saúde Corporal Inicial</h1>
            <div className="relative">
              <button
                onMouseEnter={() => setInfoVisivel(true)}
                onMouseLeave={() => setInfoVisivel(false)}
                className="text-odara-accent hover:text-odara-secondary transition-colors duration-200"
              >
                <FaInfoCircle size={20} />
              </button>
              {infoVisivel && (
                <div className="absolute z-10 left-0 top-full mt-2 w-72 p-3 bg-odara-dark text-white text-sm rounded-lg shadow-lg">
                  <h3 className="font-bold mb-2">Registro da Saúde Corporal Inicial</h3>
                  <p>
                    O Registro da Saúde Corporal Inicial se refere à investigação e registro de eventuais ferimentos e/ou questões corporais no momento da entrada inicial da pessoa idosa na Casa. Com um template anatômico prático, basta selecionar as regiões do corpo afetadas e descrever os sintomas físicos da pessoa idosa referentes a essa região, dessa forma preza-se por um acompanhamento mais completo da saúde do individuo e garante um melhor entendimento da situação da saúde dele ao entrar em seu novo lar.
                  </p>
                  <div className="absolute bottom-full left-4 border-4 border-transparent border-b-odara-dark"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative flex items-center gap-4 mb-6">
          {/* Botão Adicionar */}
          <button
            onClick={() => setDropdownAberto(!dropdownAberto)}
            className="bg-odara-accent hover:bg-odara-secondary/90 text-odara-contorno font-medium py-2 px-4 rounded-lg flex items-center transition duration-200 border-2 border-odara-contorno"
          >
            <FaPlus className="mr-2" /> Adicionar
          </button>

          {/* Dropdown */}
          {dropdownAberto && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
              {Object.values(CATEGORIAS).map(categoria => (
                <button
                  key={categoria}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/10"
                  onClick={() => {
                    setCategoriaSelecionada(categoria);
                    abrirModalAdicionar(categoria); // abre o modal
                    setDropdownAberto(false);
                  }}
                >
                  {CATEGORIA_LABELS[categoria]}
                </button>
              ))}
            </div>
          )}

          {/* Selecionando por residentes */}
          <div className="relative">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={residenteSelecionado || ''}
              onChange={(e) => setResidenteSelecionado(e.target.value)}
            >
              <option value="">Todos os residentes</option>
              {residentes.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="relative">
            <button
              className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-odara-dark font-medium hover:bg-odara-primary/10 transition"
              onClick={() => setFiltroAberto(!filtroAberto)}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Filtro
            </button>

            {filtroAberto && (
              <div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {FILTROS.map(filtro => (
                  <button
                    key={filtro.id}
                    onClick={() => {
                      setFiltroAtivo(filtro.id);
                      setFiltroAberto(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-odara-primary/10 ${filtroAtivo === filtro.id ? 'bg-odara-primary/20 font-semibold' : ''}`}
                  >
                    {filtro.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-odara-offwhite rounded-2xl shadow-lg p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-2 lg:col-span-2 space-y-8">
            {Object.entries(preferenciasFiltradas).map(([categoria, items]) => (
              <div key={categoria} className="mb-8">
                <h3 className="text-xl font-semibold text-odara-dark mb-4 flex items-center">
                  {categoria === 'alimentar' && <FaUtensils className="mr-2 text-odara-accent" />}
                  {categoria === 'atividades' && <FaWalking className="mr-2 text-odara-accent" />}
                  {categoria === 'cuidador' && <FaWalking className="mr-2 text-odara-accent" />}
                  {CATEGORIA_LABELS[categoria]}
                </h3>
                <ul className="space-y-4">
                  {items.map(item => (
                    <li
                      key={item.id}
                      className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-start hover:shadow-md transition-shadow duration-200"
                      onMouseEnter={() => setResidenteAtual(item)}
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-odara-dark">{item.residente}</h4>
                        <p className="text-odara-dark/70 text-sm mt-1">{item.description}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button onClick={() => abrirModalEditar(categoria, item.id)}
                          className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 p-1 rounded-full hover:bg-odara-accent/10">
                          <FaEdit />
                        </button>
                        <button onClick={() => excluirPreferencia(categoria, item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full hover:bg-red-50">
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-odara-offwhite rounded-2xl shadow-lg p-10 h-fit border-l-4 border-odara-primary">
            <h3 className="text-xl mb-4">RESIDENTE <h3 className="text-odara-dark">{residenteAtual?.residente || 'Área para foto do paciente'}</h3></h3>
            <div className="text-center">
              <div className="w-50 h-50 mx-auto rounded-full flex items-center justify-center mb-2">
                {residenteAtual?.foto ? (
                  <img src={residenteAtual.foto} alt={residenteAtual.residente} className="w-60 h-60 rounded-[30px] object-cover" />
                ) : (
                  <span className="text-odara-primary text-4xl">👤</span>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Modal */}
        {modalAberto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-odara-offwhite rounded-xl shadow-2xl max-w-md w-full p-6 border-l-4 border-odara-primary">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-odara-dark">
                  {editando ? 'Editar' : 'Adicionar'} Preferência - {CATEGORIA_LABELS[categoriaAtual]}
                </h2>
                <button onClick={() => setModalAberto(false)} className="text-odara-dark hover:text-odara-accent transition-colors duration-200">✕</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Residente</label>
                  <input type="text" className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                    value={novaPreferencia.residente}
                    onChange={(e) => setNovaPreferencia({ ...novaPreferencia, residente: e.target.value })}
                    placeholder="Nome do residente" />
                </div>
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Título</label>
                  <input type="text" className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                    value={novaPreferencia.titulo}
                    onChange={(e) => setNovaPreferencia({ ...novaPreferencia, titulo: e.target.value })}
                    placeholder="Digite o título" />
                </div>
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Descrição</label>
                  <textarea className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" rows="4"
                    value={novaPreferencia.descricao}
                    onChange={(e) => setNovaPreferencia({ ...novaPreferencia, descricao: e.target.value })}
                    placeholder="Digite a descrição"></textarea>
                </div>
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Foto do Residente</label>
                  <input type="text" className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                    value={novaPreferencia.foto}
                    onChange={(e) => setNovaPreferencia({ ...novaPreferencia, foto: e.target.value })}
                    placeholder="Link da foto" />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button onClick={() => setModalAberto(false)}
                  className="px-4 py-2 border border-odara-primary/30 text-odara-dark rounded-lg hover:bg-white transition-colors duration-200">Cancelar</button>
                <button onClick={salvarPreferencia}
                  className="px-4 py-2 bg-odara-accent text-odara-contorno rounded-lg hover:bg-odara-secondary/90 transition-colors duration-200 border-2 border-odara-contorno"
                  disabled={!novaPreferencia.titulo || !novaPreferencia.descricao}>
                  {editando ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default RegistroCorporal;
