import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaInfoCircle, FaTimes, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Comportamento = () => {
  const [comportamentos, setComportamentos] = useState([
    {
      id: 1,
      data: new Date(),
      horario: "10:00",
      titulo: "Calmo e colaborativo",
      descricao: "Residente apresentou comportamento calmo durante a atividade.",
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
      descricao: "Residente demonstrou agitação durante a atividade.",
      categoria: "negativo",
      residentes: "Maria Oliveira",
      foto: "../images/foto-idosa-maria.jpg",
      concluido: false
    }
  ]);

  const [residenteSelecionado, setResidenteSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [novaEntrada, setNovaEntrada] = useState({
    titulo: "",
    descricao: "",
    data: new Date().toISOString().split("T")[0],
    horario: "",
    residentes: "",
    categoria: "positivo",
    foto: ""
  });
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const CATEGORIAS = {
    positivo: "bg-odara-primary/60 text-odara-dark",
    negativo: "bg-odara-dropdown-accent/60 text-odara-dark",
    neutro: "bg-odara-secondary/60 text-odara-white"
  };

  const salvarEntrada = () => {
    if (!novaEntrada.titulo || !novaEntrada.data) return;

    const partesData = novaEntrada.data.split("-");
    const dataObj = new Date(partesData[0], partesData[1] - 1, partesData[2]);

    if (editando && idEditando) {
      setComportamentos(prev =>
        prev.map(c => (c.id === idEditando ? { ...c, ...novaEntrada, data: dataObj } : c))
      );
    } else {
      setComportamentos(prev => [
        ...prev,
        { id: Date.now(), ...novaEntrada, data: dataObj, concluido: false }
      ]);
    }

    setModalAberto(false);
  };

  const excluirEntrada = id => {
    if (window.confirm("Deseja excluir este registro?")) {
      setComportamentos(prev => prev.filter(c => c.id !== id));
      if (residenteSelecionado?.id === id) setResidenteSelecionado(null);
    }
  };

  const abrirModalEditar = id => {
    const c = comportamentos.find(c => c.id === id);
    if (c) {
      setNovaEntrada({ ...c, data: c.data.toISOString().split("T")[0] });
      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  const alternarConclusao = id => {
    setComportamentos(prev =>
      prev.map(c => (c.id === id ? { ...c, concluido: !c.concluido } : c))
    );
  };

  const abrirDetalhes = c => setResidenteSelecionado(c);

  return (
    <div className="flex min-h-screen  bg-gray-50 p-6">
      <div className="grid  grid-cols-3 gap-6 w-full">
        {/* COLUNA ESQUERDA - REGISTROS */}
        <div className="col-span-2 border-4 border-odara-primary flex flex-col  rounded-2xl shadow p-6">

          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Link to="/funcionario" className="text-odara-accent">
                <FaArrowLeft />
              </Link>
              <h1 className="text-2xl font-bold text-odara-dark">
                Registro de Comportamento
              </h1>
              <div className="relative">
                <FaInfoCircle
                  className="ml-2 text-odara-accent hover:text-odara-secondary cursor-pointer"
                  onMouseEnter={() => setMostrarInfo(true)}
                  onMouseLeave={() => setMostrarInfo(false)}
                />
                {mostrarInfo && (
                  <div className="absolute z-10 left-0 top-full mt-2 w-72 p-3 bg-odara-dropdown text-odara-name text-sm rounded-lg shadow-lg">
                  O Registro de Comportamento esse relatório é onde será disposto informações sobre o comportamento dos residentes, seja durante exames, momento de lazer, alimentação, e de todo o seu dia a dia. Nele deverá haver conteúdo detalhado se o mesmo provocou consequências para si mesmo ou a terceiros (enfermeiros, médicos, responsáveis, ou outros residentes).
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                setModalAberto(true);
                setEditando(false);
                setNovaEntrada({
                  titulo: "",
                  descricao: "",
                  data: new Date().toISOString().split("T")[0],
                  horario: "",
                  residentes: "",
                  categoria: "positivo",
                  foto: ""
                });
              }}
              className="bg-odara-accent hover:bg-odara-secondary text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaPlus /> Novo Registro
            </button>
          </div>

          {/* Lista de registros */}
          <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
            {comportamentos.length === 0 && (
              <p className="text-gray-500 text-center">Nenhum registro</p>
            )}
            {comportamentos.map(c => (
              <div
                key={c.id}
                onClick={() => abrirDetalhes(c)}
                className={`p-4 rounded-xl shadow-sm flex justify-between items-center cursor-pointer transition-all hover:shadow-md ${CATEGORIAS[c.categoria]}`}
              >
                <div className="flex-1 pr-4">
                  <p className="text-sm mb-1 font-semibold">
                    {c.data.getDate().toString().padStart(2, "0")}/
                    {(c.data.getMonth() + 1).toString().padStart(2, "0")}/
                    {c.data.getFullYear()} - {c.horario}
                  </p>
                  <h6 className="text-lg font-bold mb-1">{c.titulo}</h6>
                  <p className="text-base mb-2">{c.descricao}</p>
                  <p className="text-sm italic mb-2">{c.residentes}</p>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={c.concluido}
                      onChange={() => alternarConclusao(c.id)}
                    />
                    {c.concluido ? "Arquivado" : "Realizado"}
                  </label>
                </div>

                {/* Ações */}
                <div className="ml-4 flex flex-col gap-2">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      abrirModalEditar(c.id);
                    }}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      excluirEntrada(c.id);
                    }}
                    className="text-red-700 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA DIREITA - DETALHES */}
        <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-odara-primary flex flex-col items-center justify-center text-center">
          {residenteSelecionado ? (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                RESIDENTE
              </h2>
              <img
                src={residenteSelecionado.foto}
                alt={residenteSelecionado.residentes}
                className="w-32 h-32 rounded-full object-cover mb-3 shadow-md"
              />
              <h3 className="text-lg font-bold text-gray-800">
                {residenteSelecionado.residentes}
              </h3>
              <p className="text-gray-600 mt-2">{residenteSelecionado.titulo}</p>
              <p className="text-sm text-gray-500 mt-1">{residenteSelecionado.descricao}</p>
            </>
          ) : (
            <p className="text-gray-500 italic">Selecione um registro</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border-l-4 border-odara-primary">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-odara-accent">
                {editando ? "Editar Registro" : "Novo Registro"}
              </h2>
              <button onClick={() => setModalAberto(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-odara-dark mb-1">Título *</label>
                <input
                  type="text"
                  className="w-full  border border-odara-primary rounded-lg p-2"
                  value={novaEntrada.titulo}
                  onChange={e => setNovaEntrada({ ...novaEntrada, titulo: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-odara-dark mb-1">Descrição</label>
                <textarea
                  className="w-full border border-odara-primary rounded-lg p-2"
                  rows="3"
                  value={novaEntrada.descricao}
                  onChange={e => setNovaEntrada({ ...novaEntrada, descricao: e.target.value })}
                />
              </div>

              <div className="grid text-odara-dark grid-cols-2 gap-4">
                <div>
                  <label>Data *</label>
                  <input
                    type="date"
                    className="w-full border border-odara-primary rounded-lg p-2"
                    value={novaEntrada.data}
                    onChange={e => setNovaEntrada({ ...novaEntrada, data: e.target.value })}
                  />
                </div>
                <div classname="text-odara-dark">
                  <label>Horário</label>
                  <input
                    type="time"
                    className="w-full border border-odara-primary rounded-lg p-2"
                    value={novaEntrada.horario}
                    onChange={e => setNovaEntrada({ ...novaEntrada, horario: e.target.value })}
                  />
                </div>
              </div>

              <div className="text-odara-dark">
                <label>Residente(s)</label>
                <input
                  type="text"
                  className="w-full border border-odara-primary rounded-lg p-2"
                  value={novaEntrada.residentes}
                  onChange={e => setNovaEntrada({ ...novaEntrada, residentes: e.target.value })}
                />
              </div>

              <div className="text-odara-dark">
                <label>Categoria</label>
                <select
                  className="w-full border-odara-primary border rounded-lg p-2"
                  value={novaEntrada.categoria}
                  onChange={e => setNovaEntrada({ ...novaEntrada, categoria: e.target.value })}
                >
                  <option value="positivo">Positivo</option>
                  <option value="negativo">Negativo</option>
                  <option value="neutro">Neutro</option>
                </select>
              </div>

              <div className="text-odara-dark">
                <label>Foto (URL)</label>
                <input
                  type="text"
                  className="w-full border border-odara-primary rounded-lg p-2"
                  value={novaEntrada.foto}
                  onChange={e => setNovaEntrada({ ...novaEntrada, foto: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalAberto(false)}
                className="px-4 py-2 border-2 border-odara-primary hover:bg-odara-primary text-odara-primary hover:text-odara-white rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={salvarEntrada}
                className="px-4 py-2 bg-odara-accent hover:bg-odara-secondary text-white rounded-lg"
              >
                {editando ? "Atualizar" : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comportamento;
