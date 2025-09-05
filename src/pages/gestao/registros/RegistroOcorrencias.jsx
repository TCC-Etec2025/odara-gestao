import React, { useState } from 'react';
import { FaUtensils, FaWalking, FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';


const RegistroOcorrencias = () => {
  const [preferences, setPreferences] = useState({
    ocorrencias: [
      { id: 1, 
        title: "Caiu da Cadeira", 
        description: "João caiu da cadeira", 
        residente: "João Silva", 
        foto: "/images/foto-idoso-joao.jpg",
        idade: 72,
        sexo: "Masculino",
        prontuario: "2023001",
        data: new Date(2023, 0, 15), // 15 Jan 2023
        horario: "10:30",
        medico: "Dr. Carlos Mendes",
         },

      { id: 2, 
        title: "Se Cortou", 
        description: "Maria se cortou", 
        residente: "Maria", 
        foto: "/images/foto-idosa-maria.png" }
    ],
    descricoes: [
      { id: 3, title: "Queda", description: "João caiu no horario de lazer, ao se sentar para jogar xadrez", residente: "João", foto: "/images/foto-idoso-joao.jpg" },
      { id: 4, title: "Corte", description: "Maria cortou sua mão ao ultilizar o garfo na hora do almoço", residente: "Maria", foto: "/images/foto-idosa-maria.png" }
    ],
    consequencias: [
      { id: 5, title: "Leticia", description: "Enfermeira Leticia checou seu sinais e o encaminhou para a enfermaria, onde foi realizado um check-up", residente: "João", foto: "/images/foto-idoso-joao.jpg" },
      { id: 6, title: "Livia", description: "Enfermeira Lívia encaminhou a residente para enfermaria, e fez um curativo", residente: "Maria", foto: "/images/foto-idosa-maria.png" }
    ]
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [categoriaAtual, setCategoriaAtual] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [novaPreferencia, setNovaPreferencia] = useState({ titulo: '', descricao: '', residente: '', foto: '', idade: '', sexo: '', prontuario: '', data: '', horario: '', medico: '' });
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [infoVisivel, setInfoVisivel] = useState(false);
  const [residenteSelecionado, setResidenteSelecionado] = useState('');
  const [residenteAtual, setResidenteAtual] = useState(null);
  const [dropdownAberto, setDropdownAberto] = useState(false);


  const CATEGORIAS = {
    OCORRENCIAS: 'ocorrencias',
    DESCRICOES: 'descricoes',
    CONSEQUENCIAS: 'consequencias'
  };

  const CATEGORIA_LABELS = {
    [CATEGORIAS.OCORRENCIAS]: "Ocorrências",
    [CATEGORIAS.DESCRICOES]: "Descrições",
    [CATEGORIAS.CONSEQUENCIAS]: "Consequências"
  };

  const FILTROS = [
    { id: 'todos', label: 'Todos' },
    { id: CATEGORIAS.OCORRENCIAS, label: CATEGORIA_LABELS[CATEGORIAS.OCORRENCIAS] },
    { id: CATEGORIAS.DESCRICOES, label: CATEGORIA_LABELS[CATEGORIAS.DESCRICOES] },
    { id: CATEGORIAS.CONSEQUENCIAS, label: CATEGORIA_LABELS[CATEGORIAS.CONSEQUENCIAS] }
  ];

  const abrirModalAdicionar = (categoria) => {
    setCategoriaAtual(categoria);
    setNovaPreferencia({ titulo: '', descricao: '', idade: '', sexo: '', prontuario: '', data: '', horario: '', medico: '',  residente: '', foto: '' });
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
        foto: preferenciaParaEditar.foto,
        idade: preferenciaParaEditar.idade,
        sexo: preferenciaParaEditar.sexo,
        prontuario: preferenciaParaEditar.prontuario,
        data: preferenciaParaEditar.data,
        horario: preferenciaParaEditar.horario,
        medico: preferenciaParaEditar.medico
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
              idade: novaPreferencia.idade,
              sexo: novaPreferencia.sexo,
              prontuario: novaPreferencia.prontuario,
              data: novaPreferencia.data,
              horario: novaPreferencia.horario,
              medico: novaPreferencia.medico,
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
        idade: novaPreferencia.idade,
        sexo: novaPreferencia.sexo,
        prontuario: novaPreferencia.prontuario,
        data: novaPreferencia.data,
        horario: novaPreferencia.horario,
        medico: novaPreferencia.medico,
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
    [...preferences.ocorrencias, ...preferences.descricoes, ...preferences.consequencias]
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
                to="/gestao/PaginaRegistros"
                className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 flex items-center"
              >
                <FaArrowLeft className="mr-1" />
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-odara-dark mr-2">Registro de Ocorrências</h1>
            <div className="relative">
              <button
                onMouseEnter={() => setInfoVisivel(true)}
                onMouseLeave={() => setInfoVisivel(false)}
                className="text-odara-accent hover:text-odara-secondary transition-colors duration-200"
              >
                <FaInfoCircle size={20} />
              </button>
              {infoVisivel && (
                <div className="absolute z-10 left-0 top-full mt-2 w-72 p-3 bg-odara-dropdown text-odara-name text-sm rounded-lg shadow-lg">
                  <h3 className="font-bold mb-2">Registro de Ocorrências</h3>
                  <p>
                    O Registro de Ocorrências ficha onde se registra qualquer situação fora do comum envolvendo os residentes, funcionários ou a rotina da casa de repouso, podendo ser clínica,  comportamental ou até mesmo relacional, esse diário ajuda a acompanhar tudo o que pode impactar o bem-estar dos idosos e na organização do local, também na ciência dos responsáveis sobre os acontecimentos do dia.
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
                        <h4 className="font-semibold text-odara-dark">Residente: {item.residente}</h4>
                        <p className="text-odara-dark/70 text-sm mt-1">Descrição: {item.description}</p>
                        <p className="text-odara-dark/70 text-sm mt-1">Idade: {item.idade}</p>
                        <p className="text-odara-dark/50 text-xs mt-1">Sexo:  {item.sexo}</p>
                        <p className="text-odara-dark/50 text-xs mt-1"> Data: {new Date(item.data).toLocaleDateString()}</p>
                        <p className="text-odara-dark/50 text-xs mt-1">Horário: {item.horario}</p>
                        <p className="text-odara-dark/50 text-xs mt-1">Médico: {item.medico}</p>
                        <p className="text-odara-dark/70 text-sm mt-1"> Prontuario: {item.prontuario}</p>
                        
                      </div>
                      <div className="w-16 h-16 ml-4">
                        {item.foto ? (
                          <img src={item.foto} alt={item.residente} className="w-full h-full rounded-lg object-cover" />
                        ) : (
                          <span className="text-odara-primary text-4xl">👤</span>
                        )}
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
                  {editando ? 'Editar' : 'Adicionar'} Registros - {CATEGORIA_LABELS[categoriaAtual]}
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

export default RegistroOcorrencias;
