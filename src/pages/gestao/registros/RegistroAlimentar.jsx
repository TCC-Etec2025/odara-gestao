import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaFilter,
  FaTrash,
  FaArrowLeft,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";

const RegistroAlimentar = () => {
  const [registros, setRegistros] = useState([
    {
      id: 1,
      data: new Date(),
      horario: "08:00",
      refeicao: "Café da Manhã",
      alimento: "Pão, leite, fruta",
      residentes: "João Santos",
      concluido: true,
    },
    {
      id: 2,
      data: new Date(),
      horario: "12:00",
      refeicao: "Almoço",
      alimento: "Arroz, feijão, frango",
      residentes: "Maria Oliveira",
      concluido: false,
    },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [novoRegistro, setNovoRegistro] = useState({
    data: new Date().toISOString().split("T")[0],
    horario: "",
    refeicao: "Café da Manhã",
    alimento: "",
    residentes: "",
  });
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [dataAtual, setDataAtual] = useState(new Date());
  const [filtroDia, setFiltroDia] = useState(null);
  const [filtroDiaAtivo, setFiltroDiaAtivo] = useState(false);
  const [mostrarArquivados, setMostrarArquivados] = useState(false);
  const [infoVisivel, setInfoVisivel] = useState(false);

  const REFEICOES = ["Café da Manhã", "Almoço", "Lanche", "Jantar"];

  // Funções básicas
  const abrirModalAdicionar = () => {
    setNovoRegistro({
      data: new Date().toISOString().split("T")[0],
      horario: "",
      refeicao: "Café da Manhã",
      alimento: "",
      residentes: "",
    });
    setEditando(false);
    setIdEditando(null);
    setModalAberto(true);
  };

  const abrirModalEditar = (id) => {
    const registro = registros.find((r) => r.id === id);
    if (registro) {
      setNovoRegistro({
        data: registro.data.toISOString().split("T")[0],
        horario: registro.horario,
        refeicao: registro.refeicao,
        alimento: registro.alimento,
        residentes: registro.residentes,
      });
      setEditando(true);
      setIdEditando(id);
      setModalAberto(true);
    }
  };

  const salvarRegistro = () => {
    const dataObj = new Date(novoRegistro.data);
    if (editando && idEditando) {
      setRegistros((prev) =>
        prev.map((r) =>
          r.id === idEditando ? { ...r, ...novoRegistro, data: dataObj } : r
        )
      );
    } else {
      const novo = {
        id: Date.now(),
        ...novoRegistro,
        data: dataObj,
        concluido: false,
      };
      setRegistros((prev) => [...prev, novo]);
    }
    setModalAberto(false);
  };

  const excluirRegistro = (id) => {
    if (window.confirm("Deseja excluir este registro?")) {
      setRegistros((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const alternarConclusao = (id) => {
    setRegistros((prev) =>
      prev.map((r) => (r.id === id ? { ...r, concluido: !r.concluido } : r))
    );
  };

  const registrosFiltrados = registros
    .filter((r) => {
      const passaDia =
        !filtroDiaAtivo ||
        (filtroDia && r.data.toDateString() === filtroDia.toDateString());
      const passaConcluido = mostrarArquivados ? r.concluido : !r.concluido;
      return passaDia && passaConcluido;
    })
    .sort((a, b) => a.data - b.data || a.horario.localeCompare(b.horario));

  const handleDayClick = (value) => {
    if (
      filtroDiaAtivo &&
      filtroDia &&
      value.toDateString() === filtroDia.toDateString()
    ) {
      setFiltroDiaAtivo(false);
      setFiltroDia(null);
    } else {
      setFiltroDia(value);
      setFiltroDiaAtivo(true);
    }
  };

  const irParaHoje = () => {
    const hoje = new Date();
    setDataAtual(hoje);
    setFiltroDia(hoje);
    setFiltroDiaAtivo(true);
  };

  const getTileClassName = ({ date, view }) => {
    const classes = [];
    const hoje = new Date();
    if (date.toDateString() === hoje.toDateString()) {
      classes.push("!bg-odara-primary/20 font-bold");
    }
    if (filtroDiaAtivo && filtroDia && date.toDateString() === filtroDia.toDateString()) {
      classes.push("outline-2 outline outline-odara-accent outline-offset-[-1px]");
    }
    return classes.join(" ");
  };

  const getTileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const registrosDoDia = registros.filter(
      (r) => r.data.toDateString() === date.toDateString() && !r.concluido
    );
    return (
      <div className="mt-1 flex justify-center gap-1 flex-wrap">
        {registrosDoDia.map((r, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-odara-accent"
            title={`${r.refeicao} - ${r.horario}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 p-6 lg:p-10">
        {/* Cabeçalho */}
        <div className="flex justify-start items-center mb-6">
          <Link to="/gestao/PaginaRegistros" className="flex items-center text-odara-accent mr-4">
            <FaArrowLeft className="mr-1" />
          </Link>
          <h1 className="text-3xl font-bold text-odara-dark">Registro Alimentar</h1>
          <div className="relative ml-4">
            <button
              onMouseEnter={() => setInfoVisivel(true)}
              onMouseLeave={() => setInfoVisivel(false)}
              className="text-odara-accent hover:text-odara-secondary transition-colors duration-200"
            >
              <FaInfoCircle size={20} />
            </button>
            {infoVisivel && (
              <div className="absolute z-10 left-0 top-full mt-2 w-72 p-3 bg-odara-dropdown text-odara-name text-sm rounded-lg shadow-lg">
                <h3 className="font-bold mb-2">Registro Alimentar</h3>
                <p>
                  O Registro de Quadro Alimentar é o documento no qual serão
                  adicionadas as informações sobre as refeições oferecidas aos
                  residentes, incluindo horário, tipo de refeição, alimentos e residentes.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={abrirModalAdicionar}
            className="bg-odara-accent hover:bg-odara-secondary text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" /> Novo Registro
          </button>
          <button
            onClick={() => setMostrarArquivados(!mostrarArquivados)}
            className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition w-40 justify-center"
          >
            <FaFilter className="text-odara-accent mr-2" />
            {mostrarArquivados ? "Próximos" : "Arquivados"}
          </button>
        </div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Lista de registros */}
          <div className="bg-white rounded-xl shadow p-4 max-h-[600px] overflow-y-auto">
            {registrosFiltrados.length === 0 ? (
              <p className="text-gray-500 text-center">Nenhum registro encontrado</p>
            ) : (
              registrosFiltrados.map((r) => (
                <div key={r.id} className="p-4 mb-4 rounded-xl border-l-4 border-odara-primary bg-odara-offwhite">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold">{r.refeicao} - {r.horario}</p>
                    <div className="flex gap-2">
                      <button onClick={() => abrirModalEditar(r.id)} className="p-1 text-white bg-blue-500 rounded">
                        <FaEdit />
                      </button>
                      <button onClick={() => excluirRegistro(r.id)} className="p-1 text-white bg-red-500 rounded">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p><strong>Alimento:</strong> {r.alimento}</p>
                  <p><strong>Residente(s):</strong> {r.residentes}</p>
                  <label className="flex items-center gap-2 mt-2">
                    <input type="checkbox" checked={r.concluido} onChange={() => alternarConclusao(r.id)} />
                    {r.concluido ? "Concluído" : "Pendente"}
                  </label>
                </div>
              ))
            )}
          </div>

          {/* Calendário */}
          <div className="bg-white rounded-2xl shadow-lg p-6 relative">
            <div className="flex justify-center mb-4">
              <button
                onClick={irParaHoje}
                className="bg-odara-accent hover:bg-odara-secondary text-white px-4 py-2 rounded-lg transition"
              >
                Hoje
              </button>
            </div>
            <div className="flex justify-center border-2 border-odara-primary rounded-xl shadow-sm overflow-hidden max-w-md mx-auto">
              <Calendar
                onChange={handleDayClick}
                value={dataAtual}
                tileContent={getTileContent}
                tileClassName={getTileClassName}
                className="border-0 mx-auto max-w-[350px] rounded-xl shadow-sm p-2"
              />
            </div>

        {/* Legenda atualizada */}
            <div className="grid grid-cols-1 mt-4 p-3 bg-odara-offwhite rounded-lg max-w-md mx-auto text-center">
              <h6 className="font-semibold text-odara-dark mb-2">Estatísticas do Dia:</h6>
              {filtroDia ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Medicamentos:</span>
                    <span className="font-semibold">{obterMedicamentosDoDia(filtroDia).length} registros</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Residentes:</span>
                    <span className="font-semibold">{obterResidentesDoDia(filtroDia).length} residentes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Administrações:</span>
                    <span className="font-semibold">
                      {getEstatisticasDia(filtroDia).total} total
                    </span>
                  </div>
                  <div className="flex justify-between gap-1 text-xs mt-2">
                    <div className="flex-1 bg-green-500 text-white px-1 py-0.5 rounded">
                      {getEstatisticasDia(filtroDia).administradas} ✓
                    </div>
                    <div className="flex-1 bg-yellow-500 text-white px-1 py-0.5 rounded">
                      {getEstatisticasDia(filtroDia).pendentes} ?
                    </div>
                    <div className="flex-1 bg-red-500 text-white px-1 py-0.5 rounded">
                      {getEstatisticasDia(filtroDia).atrasadas} !
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-odara-name/60">Selecione um dia no calendário para ver as estatísticas</p>
              )}
              
              <div className="mt-3 pt-2 border-t border-gray-200">
                <div className="flex justify-between gap-1 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Todos administrados</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>Pendentes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Atrasados</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {modalAberto && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
            <div className="bg-white border-odara-primary border-l-4 rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-odara-dark font-bold">{editando ? "Editar" : "Adicionar"} Registro</h2>
                <button onClick={() => setModalAberto(false)}><FaTimes /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-odara-dark font-medium">Data</label>
                  <input
                    type="date"
                    className="w-full border-odara-primary border p-2 rounded-lg"
                    value={novoRegistro.data}
                    onChange={(e) => setNovoRegistro({ ...novoRegistro, data: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-odara-dark font-medium">Horário</label>
                  <input
                    type="time"
                    className="w-full border-odara-primary border p-2 rounded-lg"
                    value={novoRegistro.horario}
                    onChange={(e) => setNovoRegistro({ ...novoRegistro, horario: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-odara-dark font-medium">Refeição</label>
                  <select
                    className="w-full border-odara-primary border p-2 rounded-lg"
                    value={novoRegistro.refeicao}
                    onChange={(e) => setNovoRegistro({ ...novoRegistro, refeicao: e.target.value })}
                  >
                    {REFEICOES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-odara-dark font-medium">Alimento *</label>
                  <input
                    type="text"
                    className="w-full border-odara-primary border p-2 rounded-lg"
                    value={novoRegistro.alimento}
                    onChange={(e) => setNovoRegistro({ ...novoRegistro, alimento: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-odara-dark font-medium">Residente(s)</label>
                  <input
                    type="text"
                    className="w-full border-odara-primary border p-2 rounded-lg"
                    value={novoRegistro.residentes}
                    onChange={(e) => setNovoRegistro({ ...novoRegistro, residentes: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 text-odara-primary hover:text-odara-white hover:bg-odara-primary border-odara-primary border rounded-lg"
                  onClick={() => setModalAberto(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-odara-accent hover:bg-odara-secondary text-white rounded-lg"
                  onClick={salvarRegistro}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroAlimentar;
