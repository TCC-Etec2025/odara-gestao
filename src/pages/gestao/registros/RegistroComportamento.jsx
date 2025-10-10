import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RegistroComportamento = () => {
  const [comportamentos, setComportamentos] = useState([
    {
      id: 1,
      data: new Date(),
      horario: "10:00",
      titulo: "Calmo e colaborativo",
      descricao: "Residente apresentou comportamento calmo durante a atividade",
      categoria: "positivo",
      residentes: "João Santos",
      foto: "../images/foto-idoso-joao.jpg",
      concluido: true
    },
    {
      id: 2,
      data: new Date(),
      horario: "11:00",
      titulo: "Agitado",
      descricao: "Residente demonstrou agitação durante a atividade",
      categoria: "negativo",
      residentes: "Maria Oliveira",
      foto: "../images/foto-idosa-maria.jpg",
      concluido: false
    },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [novaEntrada, setNovaEntrada] = useState({
    titulo: '',
    descricao: '',
    data: new Date().toISOString().split('T')[0],
    horario: '',
    residentes: '',
    categoria: 'positivo',
    foto: ''
  });
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const CATEGORIAS = { POSITIVO: "positivo", NEGATIVO: "negativo", NEUTRO: "neutro" };
  const ROTULOS_CATEGORIAS = { positivo: "Positivo", negativo: "Negativo", neutro: "Neutro" };
  const CORES_CATEGORIAS = { positivo: "bg-odara-primary text-odara-white", negativo: "bg-odara-secondary text-white", neutro: "bg-odara-accent text-white" };
  const CORES_CATEGORIA_BOLINHA = { positivo: "bg-odara-primary", negativo: "bg-odara-secondary", neutro: "bg-odara-accent" };

  const salvarEntrada = () => {
    if (!novaEntrada.titulo || !novaEntrada.data) return;

    const partesData = novaEntrada.data.split('-');
    const dataObj = new Date(partesData[0], partesData[1] - 1, partesData[2]);

    if (editando && idEditando) {
      setComportamentos(prev => prev.map(c => 
        c.id === idEditando ? {...c, ...novaEntrada, data: dataObj } : c
      ));
    } else {
      setComportamentos(prev => [...prev, { id: Date.now(), ...novaEntrada, data: dataObj, concluido: false }]);
    }

    setModalAberto(false);
  };

  const excluirEntrada = (id) => {
    if (window.confirm('Deseja excluir este registro?')) {
      setComportamentos(prev => prev.filter(c => c.id !== id));
    }
  };

  const abrirModalEditar = (id) => {
    const c = comportamentos.find(c => c.id === id);
    if (c) {
      setNovaEntrada({...c, data: c.data.toISOString().split('T')[0]});
      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  const alternarConclusao = (id) => {
    setComportamentos(prev => prev.map(c => c.id === id ? {...c, concluido: !c.concluido } : c));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
      <div className="flex-1">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link to="/gestao/PaginaRegistros" className="text-odara-accent mr-2"><FaArrowLeft /></Link>
            <h1 className="text-3xl text-odara-dark font-bold">Registro de Comportamento</h1>
            <FaInfoCircle className="ml-2 text-odara-accent" />
          </div>
          <button
            onClick={() => {setModalAberto(true); setEditando(false); setNovaEntrada({
              titulo: '', descricao: '', data: new Date().toISOString().split('T')[0], horario: '', residentes: '', categoria: 'positivo', foto: ''
            });}}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" /> Novo
          </button>
        </div>

        {/* Lista de registros */}
        <div className="space-y-4">
          {comportamentos.length === 0 && <p className="text-gray-500 text-center">Nenhum registro</p>}
          {comportamentos.map(c => (
            <div key={c.id} className={`p-4 rounded-xl hover:shadow-md transition-shadow duration-200 ${CORES_CATEGORIAS[c.categoria]} flex justify-between items-center`}>
              
              {/* Texto */}
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2.5 mb-1">
                  <span className={`w-2.5 h-2.5 rounded-full ${CORES_CATEGORIA_BOLINHA[c.categoria]}`}></span>
                  <p className="text-base font-semibold">{c.data.getDate().toString().padStart(2,"0")}/{(c.data.getMonth()+1).toString().padStart(2,"0")}/{c.data.getFullYear()} - {c.horario}</p>
                </div>
                <h6 className="text-xl font-bold mb-1">{c.titulo}</h6>
                <p className="text-base mb-2">{c.descricao}</p>
                <div className="flex items-center text-sm mb-2">
                  <span className="px-2 py-1 text-xs rounded-md bg-white/50">{ROTULOS_CATEGORIAS[c.categoria]}</span>
                  <span className="mx-2">•</span>
                  <span>{c.residentes}</span>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={c.concluido} onChange={() => alternarConclusao(c.id)} className="rounded focus:ring-blue-500" />
                  {c.concluido ? 'Arquivado' : 'Realizado'}
                </label>
              </div>

              {/* Foto */}
              <img src={c.foto} alt="foto" className="w-20 h-20 object-cover rounded-lg" />

              {/* Ações */}
              <div className="ml-4 flex flex-col gap-2">
                <button onClick={() => abrirModalEditar(c.id)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                <button onClick={() => excluirEntrada(c.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalAberto && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-500">{editando ? 'Editar' : 'Adicionar'} Registro</h2>
                <button onClick={() => setModalAberto(false)}><FaTimes /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Título *</label>
                  <input type="text" className="w-full border rounded-lg p-2" value={novaEntrada.titulo} onChange={(e) => setNovaEntrada({...novaEntrada, titulo: e.target.value})} />
                </div>

                <div>
                  <label className="block mb-2">Descrição</label>
                  <textarea className="w-full border rounded-lg p-2" rows="3" value={novaEntrada.descricao} onChange={(e) => setNovaEntrada({...novaEntrada, descricao: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label>Data *</label>
                    <input type="date" className="w-full border rounded-lg p-2" value={novaEntrada.data} onChange={(e) => setNovaEntrada({...novaEntrada, data: e.target.value})}/>
                  </div>
                  <div>
                    <label>Horário</label>
                    <input type="time" className="w-full border rounded-lg p-2" value={novaEntrada.horario} onChange={(e) => setNovaEntrada({...novaEntrada, horario: e.target.value})}/>
                  </div>
                </div>

                <div>
                  <label>Residente(s)</label>
                  <input type="text" className="w-full border rounded-lg p-2" value={novaEntrada.residentes} onChange={(e) => setNovaEntrada({...novaEntrada, residentes: e.target.value})}/>
                </div>

                <div>
                  <label>Categoria</label>
                  <select className="w-full border rounded-lg p-2" value={novaEntrada.categoria} onChange={(e) => setNovaEntrada({...novaEntrada, categoria: e.target.value})}>
                    {Object.entries(ROTULOS_CATEGORIAS).map(([key,label]) => <option key={key} value={key}>{label}</option>)}
                  </select>
                </div>

                <div>
                  <label>Foto (URL)</label>
                  <input type="text" className="w-full border rounded-lg p-2" value={novaEntrada.foto} onChange={(e) => setNovaEntrada({...novaEntrada, foto: e.target.value})}/>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setModalAberto(false)} className="px-4 py-2 border rounded-lg">Cancelar</button>
                <button onClick={salvarEntrada} className="px-4 py-2 bg-blue-500 text-white rounded-lg">{editando ? 'Atualizar' : 'Salvar'}</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RegistroComportamento;
