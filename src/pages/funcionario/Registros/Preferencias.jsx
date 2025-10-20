import React, { useState } from 'react';
import { FaUtensils, FaWalking, FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Preferencias = () => {
  const [preferences, setPreferences] = useState({
    alimentar: [
      { id: 1, title: "Comida Italiana", description: "Prefere massas e pratos da culinária italiana", residente: "João", foto: "/images/foto-idoso-joao.jpg" },
      { id: 2, title: "Vegetariano", description: "Prefere refeições sem carne", residente: "Maria", foto: "/images/foto-idosa-maria.png" }
    ],
    atividades: [
      { id: 3, title: "Leitura", description: "Gosta de ler livros no tempo livre", residente: "João", foto: "/images/foto-idoso-joao.jpg" },
      { id: 4, title: "Caminhada", description: "Prefere caminhar ao ar livre", residente: "Maria", foto: "/images/foto-idosa-maria.png" }
    ],
    cuidador: [
      { id: 5, title: "Leticia", description: "Prefere que Leticia sirva seu alimento", residente: "João", foto: "/images/foto-idoso-joao.jpg" },
      { id: 6, title: "Maria", description: "Prefere que Maria dê banho e cuide de sua higiene", residente: "Maria", foto: "/images/foto-idosa-maria.png" }
    ]
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [categoriaAtual, setCategoriaAtual] = useState('');
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

  const CORES_CATEGORIAS = {
    [CATEGORIAS.ALIMENTAR]: 'bg-odara-primary/60 text-odara-dark',
    [CATEGORIAS.ATIVIDADES]: 'bg-odara-accent/60 text-odara-dark',
    [CATEGORIAS.CUIDADOR]: 'bg-odara-secondary/60 text-odara-dark'
  };

  const CORES_CALENDARIO = {
    [CATEGORIAS.ALIMENTAR]: 'bg-odara-primary',
    [CATEGORIAS.ATIVIDADES]: 'bg-odara-accent',
    [CATEGORIAS.CUIDADOR]: 'bg-odara-secondary'
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
    <div className="flex min-h-screen bg-odara-offwhite">
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
            <h1 className="text-3xl font-bold text-odara-dark mr-2">Registro de Preferências</h1>
            <div className="relative">
              <button
                onMouseEnter={() => setInfoVisivel(true)}
                onMouseLeave={() => setInfoVisivel(false)}
                className="text-odara-dark hover:text-odara-secondary transition-colors duration-200"
              >
                <FaInfoCircle size={20} className='text-odara-accent hover:text-odara-secondary' />
              </button>
              {infoVisivel && (
                <div className="absolute z-10 left-0 top-full mt-2 w-72 p-3 bg-odara-dropdown text-odara-name text-sm rounded-lg shadow-lg">
                  <h3 className="font-bold mb-2">Registro de Preferências</h3>
                  <p>
                    O Registro de Preferências é uma ficha na qual serão anotadas as preferências pessoais de cada residente, para que a equipe possa oferecer um cuidado mais humanizado. Ele é parte importante do prontuário de atendimento, garante o bem-estar do idoso respeitando seus gostos, como comidas e temperos de preferência, sua rotina diária em geral (horário que acorda, prefere tomar banho, ou praticar seus lazeres).
                  </p>
                  <div className="absolute bottom-full left-4 border-4 border-transparent border-b-gray-800"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Barra de filtros */}
        <div className="relative flex items-center gap-4 mb-6">
          {/* Botão Adicionar */}
          <button
            onClick={() => setDropdownAberto(!dropdownAberto)}
            className="bg-odara-accent hover:bg-odara-secondary text-odara-white font-emibold py-2 px-4 rounded-lg flex items-center transition duration-200"
          >
            <FaPlus className="mr-2 text-odara-white" /> Adicionar
          </button>

          {dropdownAberto && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {Object.values(CATEGORIAS).map(categoria => (
                <button
                  key={categoria}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-50"
                  onClick={() => {
                    abrirModalAdicionar(categoria);
                    setDropdownAberto(false);
                  }}
                >
                  {CATEGORIA_LABELS[categoria]}
                </button>
              ))}
            </div>
          )}

          {/* Filtro por Categoria */}
          <div className="relative">
            <button
              className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition w-full justify-center"
              onClick={() => setFiltroAberto(!filtroAberto)}
            >
              <FaFilter className="text-odara-accent mr-2" />
              Categoria
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
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${filtroAtivo === filtro.id ? 'bg-indigo-100 font-semibold' : ''}`}
                  >
                    {filtro.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtro por Residente */}
          <div className="relative">
            <select
              className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition w-full justify-center appearance-none cursor-pointer"
              value={residenteSelecionado || ''}
              onChange={(e) => setResidenteSelecionado(e.target.value)}
            >
              <option value="">Todos os residentes</option>
              {residentes.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Botão Limpar Filtros */}
          {(filtroAtivo !== 'todos' || residenteSelecionado) && (
            <button
              onClick={() => {
                setFiltroAtivo('todos');
                setResidenteSelecionado('');
              }}
              className="flex items-center bg-odara-accent text-odara-white rounded-full px-4 py-2 shadow-sm font-medium hover:bg-odara-secondary transition"
            >
              <FaTimes className="mr-1" /> Limpar Filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Seção de Preferências */}
          <div className="bg-odara-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-odara-dark flex items-center mb-2">
              {filtroAtivo === 'todos' ? 'Todas as Preferências' : `Preferências - ${CATEGORIA_LABELS[filtroAtivo]}`}
            </h2>

            {/* Filtros ativos */}
            <div className="flex flex-wrap gap-2 mb-4">
              {filtroAtivo !== 'todos' && (
                <span className="text-sm bg-odara-accent text-odara-white px-2 py-1 rounded-full">
                  Categoria: {CATEGORIA_LABELS[filtroAtivo]}
                </span>
              )}
              {residenteSelecionado && (
                <span className="text-sm bg-odara-secondary text-odara-white px-2 py-1 rounded-full">
                  Residente: {residenteSelecionado}
                </span>
              )}
            </div>

            <p className="text-odara-name/60 mb-6">
              {filtroAtivo === 'todos' 
                ? 'Todas as preferências cadastradas' 
                : `Preferências da categoria ${CATEGORIA_LABELS[filtroAtivo].toLowerCase()}`
              }
            </p>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {Object.entries(preferenciasFiltradas).map(([categoria, items]) => (
                items.length > 0 && (
                  <div key={categoria} className="mb-6">
                    <h3 className="text-lg font-semibold text-odara-dark mb-3 flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${CORES_CALENDARIO[categoria]}`}></span>
                      {CATEGORIA_LABELS[categoria]}
                    </h3>
                    <div className="space-y-3">
                      {items.map(item => (
                        <div
                          key={item.id}
                          className={`p-4 rounded-xl hover:shadow-md transition-shadow duration-200 ${CORES_CATEGORIAS[categoria]}`}
                          onMouseEnter={() => setResidenteAtual(item)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`w-2.5 h-2.5 rounded-full ${CORES_CALENDARIO[categoria]}`}></span>
                              <h4 className="font-semibold text-odara-dark">{item.residente}</h4>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => abrirModalEditar(categoria, item.id)}
                                className="text-odara-secondary hover:text-odara-dropdown-accent transition-colors duration-200 p-2 rounded-full hover:bg-odara-dropdown"
                                title="Editar preferência"
                              >
                                <FaEdit size={14} />
                              </button>
                              <button 
                                onClick={() => excluirPreferencia(categoria, item.id)}
                                className="text-odara-alerta hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-odara-alerta/50"
                                title="Excluir preferência"
                              >
                                <FaTrash size={14} />
                              </button>
                            </div>
                          </div>
                          
                          <h6 className="text-lg font-bold mb-1">{item.title}</h6>
                          <p className="text-base mb-2">{item.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="bg-odara-dropdown text-odara-dropdown-name/60 px-2 py-1 rounded-md text-xs">
                              {CATEGORIA_LABELS[categoria]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
              
              {Object.values(preferenciasFiltradas).every(items => items.length === 0) && (
                <div className="p-6 rounded-xl bg-odara-name/10 text-center">
                  <p className="text-odara-dark/60">
                    Nenhuma preferência encontrada
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
            <h3 className="text-xl font-bold text-odara-dark mb-4">RESIDENTE</h3>
            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-odara-offwhite">
                {residenteAtual?.foto ? (
                  <img 
                    src={residenteAtual.foto} 
                    alt={residenteAtual.residente} 
                    className="w-48 h-48 rounded-2xl object-cover" 
                  />
                ) : (
                  <span className="text-odara-primary text-6xl">👤</span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-odara-dark mb-2">
                {residenteAtual?.residente || 'Nenhum residente selecionado'}
              </h3>
              {residenteAtual && (
                <p className="text-odara-name/60">
                  Passe o mouse sobre uma preferência para ver os detalhes do residente
                </p>
              )}
            </div>

            {/* Legenda das categorias */}
            <div className="mt-6 p-4 bg-odara-offwhite rounded-lg">
              <h6 className="font-semibold text-odara-dark mb-3 text-center">Legenda das Categorias:</h6>
              <div className="space-y-2">
                {Object.entries(CATEGORIAS).map(([chave, valor]) => (
                  <div key={valor} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${CORES_CALENDARIO[valor]}`}></div>
                    <span className="text-sm">{CATEGORIA_LABELS[valor]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {modalAberto && (
          <div className="fixed inset-0 bg-odara-offwhite/80 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border-l-4 border-odara-primary">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-odara-accent">
                  {editando ? 'Editar' : 'Adicionar'} Preferência - {CATEGORIA_LABELS[categoriaAtual]}
                </h2>
                <button
                  onClick={() => setModalAberto(false)}
                  className="text-odara-primary hover:text-odara-secondary transition-colors duration-200"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Residente *</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novaPreferencia.residente}
                    onChange={(e) => setNovaPreferencia({ ...novaPreferencia, residente: e.target.value })}
                    placeholder="Nome do residente" 
                  />
                </div>
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Título *</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novaPreferencia.titulo}
                    onChange={(e) => setNovaPreferencia({ ...novaPreferencia, titulo: e.target.value })}
                    placeholder="Digite o título" 
                  />
                </div>
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Descrição *</label>
                  <textarea 
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary" 
                    rows="4"
                    value={novaPreferencia.descricao}
                    onChange={(e) => setNovaPreferencia({ ...novaPreferencia, descricao: e.target.value })}
                    placeholder="Digite a descrição"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Foto do Residente</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
                    value={novaPreferencia.foto}
                    onChange={(e) => setNovaPreferencia({ ...novaPreferencia, foto: e.target.value })}
                    placeholder="Link da foto" 
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setModalAberto(false)}
                  className="px-4 py-2 border-2 border-odara-primary text-odara-primary rounded-lg hover:bg-odara-primary hover:text-odara-white transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button 
                  onClick={salvarPreferencia}
                  className="px-4 py-2 bg-odara-accent text-odara-white rounded-lg hover:bg-odara-secondary transition-colors duration-200"
                  disabled={!novaPreferencia.titulo || !novaPreferencia.descricao || !novaPreferencia.residente}
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

export default Preferencias;