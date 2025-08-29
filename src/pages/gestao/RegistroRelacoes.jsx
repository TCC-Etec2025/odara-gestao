import React, { useState } from 'react';
import { FaUtensils, FaWalking, FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaTimes, FaUser, FaUsers, FaUserInjured } from 'react-icons/fa';

const RegistroRelacoes = () => {
  const [relacoes, setRelacoes] = useState({
    funcionario: [
      { id: 1, title: "Enfermeira Ana", description: "Atendimento dedicado e cuidadoso", residente: "João", foto: "../images/foto-idoso-joao.jpg" },
      { id: 2, title: "Dr. Carlos", description: "Consulta semanal com acompanhamento", residente: "Maria", foto: "../images/foto-idosa-maria.png" }
    ],
    familiar: [
      { id: 3, title: "Filha - Sofia", description: "Visitas aos finais de semana", residente: "João", foto: "../images/foto-idoso-joao.jpg" },
      { id: 4, title: "Neto - Pedro", description: "Telefonemas diários", residente: "Maria", foto: "../images/foto-idosa-maria.png" }
    ],
    paciente: [
      { id: 5, title: "Amizade com D. Alice", description: "Participam das mesmas atividades", residente: "João", foto: "../images/foto-idoso-joao.jpg" },
      { id: 6, title: "Parceiro de jogos - Sr. José", description: "Jogam cartas todas as tardes", residente: "Maria", foto: "../images/foto-idosa-maria.png" }
    ]
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [categoriaAtual, setCategoriaAtual] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [novaRelacao, setNovaRelacao] = useState({ titulo: '', descricao: '', residente: '', foto: '' });
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [infoVisivel, setInfoVisivel] = useState(false);
  const [residenteSelecionado, setResidenteSelecionado] = useState('');
  const [residenteAtual, setResidenteAtual] = useState(null);
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const CATEGORIAS = {
    FUNCIONARIO: 'funcionario',
    FAMILIAR: 'familiar',
    PACIENTE: 'paciente'
  };

  const CATEGORIA_LABELS = {
    [CATEGORIAS.FUNCIONARIO]: "Funcionário",
    [CATEGORIAS.FAMILIAR]: "Familiar",
    [CATEGORIAS.PACIENTE]: "Paciente"
  };

  const CATEGORIA_ICONS = {
    [CATEGORIAS.FUNCIONARIO]: <FaUser className="mr-2 text-odara-accent" />,
    [CATEGORIAS.FAMILIAR]: <FaUsers className="mr-2 text-odara-accent" />,
    [CATEGORIAS.PACIENTE]: <FaUserInjured className="mr-2 text-odara-accent" />
  };

  const FILTROS = [
    { id: 'todos', label: 'Todos' },
    { id: CATEGORIAS.FUNCIONARIO, label: CATEGORIA_LABELS[CATEGORIAS.FUNCIONARIO] },
    { id: CATEGORIAS.FAMILIAR, label: CATEGORIA_LABELS[CATEGORIAS.FAMILIAR] },
    { id: CATEGORIAS.PACIENTE, label: CATEGORIA_LABELS[CATEGORIAS.PACIENTE] }
  ];

  const abrirModalAdicionar = (categoria) => {
    setCategoriaAtual(categoria);
    setNovaRelacao({ titulo: '', descricao: '', residente: '', foto: '' });
    setEditando(false);
    setIdEditando(null);
    setModalAberto(true);
  };

  const abrirModalEditar = (categoria, id) => {
    const relacaoParaEditar = relacoes[categoria].find(item => item.id === id);
    if (relacaoParaEditar) {
      setCategoriaAtual(categoria);
      setNovaRelacao({
        titulo: relacaoParaEditar.title,
        descricao: relacaoParaEditar.description,
        residente: relacaoParaEditar.residente,
        foto: relacaoParaEditar.foto
      });
      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  const salvarRelacao = () => {
    if (!novaRelacao.titulo || !novaRelacao.descricao) return;

    if (editando && idEditando) {
      // Atualiza existente
      setRelacoes(prev => ({
        ...prev,
        [categoriaAtual]: prev[categoriaAtual].map(item =>
          item.id === idEditando
            ? {
              ...item,
              title: novaRelacao.titulo,
              description: novaRelacao.descricao,
              residente: novaRelacao.residente,
              foto: novaRelacao.foto
            }
            : item
        )
      }));
    } else {
      // Adiciona novo 
      const novoItem = {
        id: Date.now(),
        title: novaRelacao.titulo,
        description: novaRelacao.descricao,
        residente: novaRelacao.residente,
        foto: novaRelacao.foto
      };
      setRelacoes(prev => ({
        ...prev,
        [categoriaAtual]: [...prev[categoriaAtual], novoItem]
      }));
    }

    setModalAberto(false);
  };

  const excluirRelacao = (categoria, id) => {
    if (window.confirm('Tem certeza que deseja excluir esta relação?')) {
      setRelacoes(prev => ({
        ...prev,
        [categoria]: prev[categoria].filter(item => item.id !== id)
      }));
    }
  };

  const residentes = Array.from(new Set(
    [...relacoes.funcionario, ...relacoes.familiar, ...relacoes.paciente]
      .map(item => item.residente)
      .filter(Boolean)
  ));

  // Filtrar relações por categoria e residente
  const relacoesFiltradas = Object.fromEntries(
    Object.entries(relacoes).map(([cat, items]) => [
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
            <h1 className="text-3xl font-bold text-odara-dark mr-2">Registro de Relações</h1>
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
                  <h3 className="font-bold mb-2">Registro de Relações Internas</h3>
                  <p>
                    O Registro de Relações Internas é o instrumento de controle que irá acompanhar como se dão as interações entre os residentes, funcionários e visitantes dentro da instituição. Inclui as interações entre residentes, relacionamento com a equipe, observações de bem-estar social e ocorrências relevantes.
                  </p>
                  <div className="absolute bottom-full left-4 border-4 border-transparent border-b-odara-dark"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">          
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
                      abrirModalAdicionar(categoria);
                      setDropdownAberto(false);
                    }}
                  >
                    {CATEGORIA_LABELS[categoria]}
                  </button>
                ))}
              </div>
            )}

            {/* Filtro */}
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
          </div>
        </div>

        <div className="bg-odara-offwhite rounded-2xl shadow-lg p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-2 lg:col-span-2 space-y-8">
            {Object.entries(relacoesFiltradas).map(([categoria, items]) => (
              <div key={categoria} className="mb-8">
                <h3 className="text-xl font-semibold text-odara-dark mb-4 flex items-center">
                  {CATEGORIA_ICONS[categoria]}
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
                        <h4 className="font-semibold text-odara-dark">{item.title}</h4>
                        <p className="text-odara-dark/70 text-sm mt-1">{item.description}</p>
                        <span className="inline-block bg-odara-primary/10 text-odara-dark text-xs px-2 py-1 rounded-full mt-2">
                          {item.residente}
                        </span>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button onClick={() => abrirModalEditar(categoria, item.id)}
                          className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 p-1 rounded-full hover:bg-odara-accent/10">
                          <FaEdit />
                        </button>
                        <button onClick={() => excluirRelacao(categoria, item.id)}
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
            <h3 className="text-xl mb-4">RESIDENTE</h3>
            <h3 className="text-odara-dark text-2xl font-bold mb-6">{residenteAtual?.residente || 'Selecione uma relação'}</h3>
            <div className="text-center">
              <div className="w-50 h-50 mx-auto rounded-full flex items-center justify-center mb-6">
                {residenteAtual?.foto ? (
                  <img src={residenteAtual.foto} alt={residenteAtual.residente} className="w-60 h-60 rounded-[30px] object-cover" />
                ) : (
                  <div className="w-60 h-60 rounded-[30px] bg-gray-200 flex items-center justify-center">
                    <span className="text-odara-primary text-4xl">👤</span>
                  </div>
                )}
              </div>
              {residenteAtual && (
                <div className="text-left mt-4">
                  <h4 className="font-semibold text-odara-dark mb-2">Detalhes:</h4>
                  <p className="text-odara-dark/70">{residenteAtual.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal */}
        {modalAberto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-odara-offwhite rounded-xl shadow-2xl max-w-md w-full p-6 border-l-4 border-odara-primary">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-odara-dark">
                  {editando ? 'Editar' : 'Adicionar'} Relação - {CATEGORIA_LABELS[categoriaAtual]}
                </h2>
                <button onClick={() => setModalAberto(false)} className="text-odara-dark hover:text-odara-accent transition-colors duration-200">✕</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Residente</label>
                  <input type="text" className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                    value={novaRelacao.residente}
                    onChange={(e) => setNovaRelacao({ ...novaRelacao, residente: e.target.value })}
                    placeholder="Nome do residente" />
                </div>
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Título</label>
                  <input type="text" className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                    value={novaRelacao.titulo}
                    onChange={(e) => setNovaRelacao({ ...novaRelacao, titulo: e.target.value })}
                    placeholder="Digite o título" />
                </div>
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Descrição</label>
                  <textarea className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg" rows="4"
                    value={novaRelacao.descricao}
                    onChange={(e) => setNovaRelacao({ ...novaRelacao, descricao: e.target.value })}
                    placeholder="Digite a descrição"></textarea>
                </div>
                <div>
                  <label className="block text-odara-dark font-medium mb-2">Foto do Residente</label>
                  <input type="text" className="w-full px-4 py-2 border border-odara-primary/30 rounded-lg"
                    value={novaRelacao.foto}
                    onChange={(e) => setNovaRelacao({ ...novaRelacao, foto: e.target.value })}
                    placeholder="Link da foto" />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button onClick={() => setModalAberto(false)}
                  className="px-4 py-2 border border-odara-primary/30 text-odara-dark rounded-lg hover:bg-white transition-colors duration-200">Cancelar</button>
                <button onClick={salvarRelacao}
                  className="px-4 py-2 bg-odara-accent text-odara-contorno rounded-lg hover:bg-odara-secondary/90 transition-colors duration-200 border-2 border-odara-contorno"
                  disabled={!novaRelacao.titulo || !novaRelacao.descricao}>
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

export default RegistroRelacoes;