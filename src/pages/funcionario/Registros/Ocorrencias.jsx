import React, { useState } from "react";
import {
	FaPlus,
	FaEdit,
	FaTrash,
	FaFilter,
	FaInfoCircle,
	FaTimes,
	FaArrowLeft,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Ocorrencias = () => {
	// ===== ESTADOS DO COMPONENTE =====
	const [ocorrencias, setOcorrencias] = useState([
		{
			id: 1,
			data: new Date(new Date().getFullYear(), new Date().getMonth(), 2),
			horario: "14:30",
			titulo: "Queda no banheiro",
			descricao: "Residente escorregou no banheiro. Sem ferimentos graves.",
			providencias: "Monitoramento médico.",
			categoria: "acidente",
			residente: "Maria Oliveira",
			funcionario: "João Santos",
			resolvido: false,
		},
		{
			id: 2,
			data: new Date(new Date().getFullYear(), new Date().getMonth(), 3),
			horario: "09:15",
			titulo: "Febre",
			descricao: "Residente apresentou febre de 38.5°C.",
			providencias: "Medicamento prescrito.",
			categoria: "saude",
			residente: "José Silva",
			funcionario: "Ana Costa",
			resolvido: false,
		},
	]);

	const [dataAtual, setDataAtual] = useState(new Date());
	const [modalAberto, setModalAberto] = useState(false);
	const [novaOcorrencia, setNovaOcorrencia] = useState({
		titulo: "",
		descricao: "",
		providencias: "",
		data: "",
		horario: "",
		residente: "",
		funcionario: "",
		categoria: "outro",
	});
	const [editando, setEditando] = useState(false);
	const [idEditando, setIdEditando] = useState(null);
	const [filtroAtivo, setFiltroAtivo] = useState("todos");
	const [filtroAberto, setFiltroAberto] = useState(false);
	const [infoVisivel, setInfoVisivel] = useState(false);
	const [filtroDia, setFiltroDia] = useState(null);
	const [filtroDiaAtivo, setFiltroDiaAtivo] = useState(false);
	const [residenteSelecionado, setResidenteSelecionado] = useState("");
	const [filtroResidenteAberto, setFiltroResidenteAberto] = useState(false);
	const [mostrarResolvidas, setMostrarResolvidas] = useState(false);

	// ===== CONSTANTES =====
	const CATEGORIAS = {
		ACIDENTE: "acidente",
		SAUDE: "saude",
		COMPORTAMENTAL: "comportamental",
		ESTRUTURAL: "estrutural",
		OUTRO: "outro",
	};

	const ROTULOS_CATEGORIAS = {
		[CATEGORIAS.ACIDENTE]: "Acidente",
		[CATEGORIAS.SAUDE]: "Saúde",
		[CATEGORIAS.COMPORTAMENTAL]: "Comportamental",
		[CATEGORIAS.ESTRUTURAL]: "Estrutural",
		[CATEGORIAS.OUTRO]: "Outro",
	};

	const CORES_CATEGORIAS = {
		[CATEGORIAS.ACIDENTE]: "bg-odara-alerta text-white",
		[CATEGORIAS.SAUDE]: "bg-odara-primary text-white",
		[CATEGORIAS.COMPORTAMENTAL]: "bg-odara-accent text-white",
		[CATEGORIAS.ESTRUTURAL]: "bg-odara-dropdown-accent text-white",
		[CATEGORIAS.OUTRO]: "bg-odara-secondary text-white",
	};

	const CORES_CALENDARIO = {
		[CATEGORIAS.ACIDENTE]: "bg-odara-alerta",
		[CATEGORIAS.SAUDE]: "bg-odara-primary",
		[CATEGORIAS.COMPORTAMENTAL]: "bg-odara-accent",
		[CATEGORIAS.ESTRUTURAL]: "bg-odara-dropdown-accent",
		[CATEGORIAS.OUTRO]: "bg-odara-secondary",
	};

	const FILTROS = [
		{ id: "todos", label: "Todos" },
		...Object.values(CATEGORIAS).map((cat) => ({
			id: cat,
			label: ROTULOS_CATEGORIAS[cat],
		})),
	];

	// ===== FUNÇÕES =====
	const obterOcorrenciasDoDia = (data) => {
		return ocorrencias.filter((o) => {
			return (
				o.data.getDate() === data.getDate() &&
				o.data.getMonth() === data.getMonth() &&
				o.data.getFullYear() === data.getFullYear()
			);
		});
	};

	const handleDayClick = (value) => {
		if (
			filtroDiaAtivo &&
			filtroDia &&
			value.getDate() === filtroDia.getDate() &&
			value.getMonth() === filtroDia.getMonth() &&
			value.getFullYear() === filtroDia.getFullYear()
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

	const abrirModalAdicionar = () => {
		setNovaOcorrencia({
			titulo: "",
			descricao: "",
			providencias: "",
			data: new Date().toISOString().split("T")[0],
			horario: "",
			residente: "",
			funcionario: "",
			categoria: "outro",
		});
		setEditando(false);
		setIdEditando(null);
		setModalAberto(true);
	};

	const abrirModalEditar = (id) => {
		const ocorrencia = ocorrencias.find((o) => o.id === id);
		if (ocorrencia) {
			setNovaOcorrencia({
				titulo: ocorrencia.titulo,
				descricao: ocorrencia.descricao,
				providencias: ocorrencia.providencias,
				data: ocorrencia.data.toISOString().split("T")[0],
				horario: ocorrencia.horario,
				residente: ocorrencia.residente,
				funcionario: ocorrencia.funcionario,
				categoria: ocorrencia.categoria,
			});
			setEditando(true);
			setIdEditando(id);
			setModalAberto(true);
		}
	};

	const salvarOcorrencia = () => {
		if (!novaOcorrencia.titulo || !novaOcorrencia.data) return;

		const partesData = novaOcorrencia.data.split("-");
		const dataObj = new Date(partesData[0], partesData[1] - 1, partesData[2]);

		if (editando && idEditando) {
			setOcorrencias((prev) =>
				prev.map((o) =>
					o.id === idEditando ? { ...o, ...novaOcorrencia, data: dataObj } : o
				)
			);
		} else {
			const novaObj = {
				id: Date.now(),
				...novaOcorrencia,
				data: dataObj,
				resolvido: false,
			};
			setOcorrencias((prev) => [...prev, novaObj]);
		}

		setModalAberto(false);
	};

	const excluirOcorrencia = (id) => {
		if (window.confirm("Deseja realmente excluir esta ocorrência?")) {
			setOcorrencias((prev) => prev.filter((o) => o.id !== id));
		}
	};

	const alternarResolvido = (id) => {
		setOcorrencias((prev) =>
			prev.map((o) => (o.id === id ? { ...o, resolvido: !o.resolvido } : o))
		);
	};

	const ocorrenciasFiltradas = ocorrencias
		.filter((o) => {
			const passaFiltroCategoria =
				filtroAtivo === "todos" || o.categoria === filtroAtivo;
			const passaFiltroDia =
				!filtroDiaAtivo ||
				(o.data.getDate() === filtroDia.getDate() &&
					o.data.getMonth() === filtroDia.getMonth() &&
					o.data.getFullYear() === filtroDia.getFullYear());
			const passaFiltroResidente =
				!residenteSelecionado || o.residente === residenteSelecionado;
			const passaFiltroResolvido = mostrarResolvidas
				? o.resolvido
				: !o.resolvido;

			return (
				passaFiltroCategoria &&
				passaFiltroDia &&
				passaFiltroResidente &&
				passaFiltroResolvido
			);
		})
		.sort((a, b) => {
			const comparacaoData = new Date(a.data) - new Date(b.data);
			if (comparacaoData === 0)
				return (a.horario || "").localeCompare(b.horario || "");
			return comparacaoData;
		});

	const getTileContent = ({ date, view }) => {
  if (view !== 'month') return null;

  const ocorrenciasDia = obterOcorrenciasDoDia(date);
  if (!ocorrenciasDia || ocorrenciasDia.length === 0) {
    return null; // <-- nada é renderizado mesmo
  }

  const categoriasDia = [...new Set(ocorrenciasDia.map(o => o.categoria))];

  // Garante que só renderiza bolinhas reais
  return categoriasDia.length > 0 ? (
    <div className="flex justify-center gap-1 mt-0.5 flex-wrap">
      {categoriasDia.map(c => (
        <div
          key={c}
          className={`w-2.5 h-2.5 rounded-full shadow-sm ${CORES_CALENDARIO[c]}`}
          title={ROTULOS_CATEGORIAS[c]}
        />
      ))}
    </div>
  ) : null;
};


	const getTileClassName = ({ date, view }) => {
		const classes = [];
		const hoje = new Date();

		if (date.toDateString() === hoje.toDateString())
			classes.push("bg-odara-primary/10 font-semibold rounded-lg");

		if (
			filtroDiaAtivo &&
			filtroDia &&
			date.toDateString() === filtroDia.toDateString()
		)
			classes.push("outline outline-2 outline-odara-accent rounded-lg");

		return classes.join(" ");
	};

	// ===== RENDER =====
	return (
		<div className="flex min-h-screen bg-odara-offwhite">
			<div className="flex-1 p-6 lg:p-10">
				{/* Cabeçalho */}
				<div className="flex justify-between items-center mb-6">
					<div className="flex items-center gap-2">
						<Link
							to="/funcionario"
							className="text-odara-accent hover:text-odara-secondary flex items-center"
						>
							<FaArrowLeft className="mr-1" />
						</Link>
						<h1 className="text-3xl font-bold text-odara-dark">
							Registro de Ocorrências
						</h1>
						<div className="relative">
							<button
								onMouseEnter={() => setInfoVisivel(true)}
								onMouseLeave={() => setInfoVisivel(false)}
							>
								<FaInfoCircle className="ml-2 text-odara-accent" size={20} />
							</button>
							{infoVisivel && (
								<div className="absolute z-10 left-0 top-full mt-2 w-72 p-3 bg-odara-dropdown text-odara-name text-sm rounded-lg shadow-lg">
									<h3 className="font-bold mb-2">Registro de Ocorrências</h3>
									<p>
										O registro de ocorrências serve para documentar todos os
										incidentes, acidentes, problemas de saúde ou situações
										relevantes envolvendo residentes e funcionários. Isso
										garante acompanhamento, prevenção e transparência.
									</p>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Barra de ações e filtros */}
				<div className="flex flex-wrap gap-4 mb-6">
					<button
						onClick={abrirModalAdicionar}
						className="bg-odara-accent hover:bg-odara-secondary text-white px-4 py-2 rounded-lg flex items-center"
					>
						<FaPlus className="mr-2" /> Nova Ocorrência
					</button>
					<button
						onClick={() => setMostrarResolvidas(!mostrarResolvidas)}
						className="bg-odara-offwhite text-odara-dark border px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition"
					>
						<FaFilter className="text-odara-accent" />
						{mostrarResolvidas
							? "Ocorrências Pendentes"
							: "Ocorrências Resolvidas"}
					</button>
				</div>

				{/* Grid de Ocorrências e Calendário */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Lista de Ocorrências */}
					<div className="bg-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-6">
						<h2 className="text-2xl font-bold mb-4">
							{mostrarResolvidas
								? "Ocorrências Resolvidas"
								: "Ocorrências Pendentes"}
						</h2>
						<div className="space-y-4 max-h-[600px] overflow-y-auto">
							{ocorrenciasFiltradas.length === 0 ? (
								<p className="text-center text-gray-500">
									Nenhuma ocorrência encontrada
								</p>
							) : (
								ocorrenciasFiltradas.map((o) => (
									<div
										key={o.id}
										className={`p-4 rounded-xl ${
											CORES_CATEGORIAS[o.categoria]
										}`}
									>
										<div className="flex justify-between items-center mb-2">
											<div>
												<span className="font-semibold">
													{o.data.getDate()}/{o.data.getMonth() + 1}/
													{o.data.getFullYear()}
												</span>
												{o.horario && ` - ${o.horario}`}
											</div>
											<label className="flex items-center gap-2 text-sm">
												<input
													type="checkbox"
													checked={o.resolvido}
													onChange={() => alternarResolvido(o.id)}
												/>
												{o.resolvido ? "Resolvido" : "Pendente"}
											</label>
										</div>
										<h3 className="text-lg font-bold">{o.titulo}</h3>
										<p className="text-sm mb-1">{o.descricao}</p>
										{o.providencias && (
											<p className="text-sm italic mb-1">
												Providências: {o.providencias}
											</p>
										)}
										<p className="text-xs">
											<strong>Residente:</strong> {o.residente} |{" "}
											<strong>Funcionário:</strong> {o.funcionario}
										</p>
										<div className="flex justify-end gap-2 mt-2">
											<button
												onClick={() => abrirModalEditar(o.id)}
												className="p-1 text-white bg-blue-500 rounded"
											>
												<FaEdit />
											</button>
											<button
												onClick={() => excluirOcorrencia(o.id)}
												className="p-1 text-white bg-red-500 rounded"
											>
												<FaTrash />
											</button>
										</div>
									</div>
								))
							)}
						</div>
					</div>

					{/* Calendário */}
					<div className="bg-white rounded-2xl shadow-lg p-6">
						<div className="flex justify-center mb-4">
							<button
								onClick={irParaHoje}
								className="bg-odara-accent hover:bg-odara-secondary text-white px-4 py-2 rounded-lg transition"
							>
								{" "}
								Hoje{" "}
							</button>
						</div>

						<Calendar
							value={dataAtual}
							onChange={setDataAtual}
							onClickDay={handleDayClick}
							tileClassName={getTileClassName}
							tileContent={getTileContent}
							nextLabel={<FaChevronRight />}
							prevLabel={<FaChevronLeft />}
							next2Label={null}
							prev2Label={null}
							className="border-0 mx-auto max-w-[350px] rounded-xl shadow-sm p-2"
						/>
					</div>
				</div>

				{/* Modal */}
				{modalAberto && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
						<div className="bg-white rounded-xl p-6 max-w-md w-full border-l-4 border-odara-primary shadow-xl">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-bold">
									{editando ? "Editar" : "Adicionar"} Ocorrência
								</h2>
								<button onClick={() => setModalAberto(false)}>
									<FaTimes />
								</button>
							</div>
							<div className="space-y-3">
								<input
									type="text"
									placeholder="Título"
									className="w-full p-2 border rounded"
									value={novaOcorrencia.titulo}
									onChange={(e) =>
										setNovaOcorrencia({
											...novaOcorrencia,
											titulo: e.target.value,
										})
									}
								/>
								<textarea
									placeholder="Descrição"
									className="w-full p-2 border rounded"
									rows={3}
									value={novaOcorrencia.descricao}
									onChange={(e) =>
										setNovaOcorrencia({
											...novaOcorrencia,
											descricao: e.target.value,
										})
									}
								/>
								<textarea
									placeholder="Providências"
									className="w-full p-2 border rounded"
									rows={2}
									value={novaOcorrencia.providencias}
									onChange={(e) =>
										setNovaOcorrencia({
											...novaOcorrencia,
											providencias: e.target.value,
										})
									}
								/>
								<div className="grid grid-cols-2 gap-2">
									<input
										type="date"
										value={novaOcorrencia.data}
										onChange={(e) =>
											setNovaOcorrencia({
												...novaOcorrencia,
												data: e.target.value,
											})
										}
										className="p-2 border rounded"
									/>
									<input
										type="time"
										value={novaOcorrencia.horario}
										onChange={(e) =>
											setNovaOcorrencia({
												...novaOcorrencia,
												horario: e.target.value,
											})
										}
										className="p-2 border rounded"
									/>
								</div>
								<input
									type="text"
									placeholder="Residente"
									className="w-full p-2 border rounded"
									value={novaOcorrencia.residente}
									onChange={(e) =>
										setNovaOcorrencia({
											...novaOcorrencia,
											residente: e.target.value,
										})
									}
								/>
								<input
									type="text"
									placeholder="Funcionário Responsável"
									className="w-full p-2 border rounded"
									value={novaOcorrencia.funcionario}
									onChange={(e) =>
										setNovaOcorrencia({
											...novaOcorrencia,
											funcionario: e.target.value,
										})
									}
								/>
								<select
									className="w-full p-2 border rounded"
									value={novaOcorrencia.categoria}
									onChange={(e) =>
										setNovaOcorrencia({
											...novaOcorrencia,
											categoria: e.target.value,
										})
									}
								>
									{Object.entries(ROTULOS_CATEGORIAS).map(([key, label]) => (
										<option key={key} value={key}>
											{label}
										</option>
									))}
								</select>
								<div className="flex justify-end gap-2 mt-4">
									<button
										onClick={() => setModalAberto(false)}
										className="px-4 py-2 border rounded"
									>
										Cancelar
									</button>
									<button
										onClick={salvarOcorrencia}
										className="px-4 py-2 bg-odara-accent text-white rounded"
									>
										{editando ? "Atualizar" : "Salvar"}
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};


export default Ocorrencias;
