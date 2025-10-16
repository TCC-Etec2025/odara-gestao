import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
	[CATEGORIAS.ACIDENTE]: "bg-odara-dropdown-accent/80 text-odara-dark",
	[CATEGORIAS.SAUDE]: "bg-odara-primary/60 text-odara-dark",
	[CATEGORIAS.COMPORTAMENTAL]: "bg-odara-accent/60 text-odara-white",
	[CATEGORIAS.ESTRUTURAL]: "bg-odara-secondary/60 text-odara-white",
	[CATEGORIAS.OUTRO]: "bg-odara-contorno/60 text-odara-dark",
};

const CORES_CALENDARIO = {
	[CATEGORIAS.ACIDENTE]: "bg-odara-dropdown-accent",
	[CATEGORIAS.SAUDE]: "bg-odara-primary",
	[CATEGORIAS.COMPORTAMENTAL]: "bg-odara-accent",
	[CATEGORIAS.ESTRUTURAL]: "bg-odara-secondary",
	[CATEGORIAS.OUTRO]: "bg-odara-contorno",
};

const FILTROS = [
	{ id: "todos", label: "Todos" },
	...Object.values(CATEGORIAS).map((cat) => ({
		id: cat,
		label: ROTULOS_CATEGORIAS[cat],
	})),
];

const RegistroOcorrencias = () => {
	// ===== ESTADOS =====
	const [ocorrencias, setOcorrencias] = useState([
		// exemplo de dados iniciais
		{
			id: 1,
			titulo: "Queda no corredor",
			descricao: "Residente escorregou no corredor",
			providencias: "Atendimento rápido",
			data: new Date(),
			horario: "10:30",
			categoria: CATEGORIAS.COMPORTAMENTAL,
			residente: "Maria Oliveira",
			funcionario: "João",
			resolvido: false,
		},
		{
			id: 2,
			titulo: "Problema estrutural",
			descricao: "Porta quebrada",
			providencias: "Reparo agendado",
			data: new Date(),
			horario: "09:00",
			categoria: CATEGORIAS.ESTRUTURAL,
			residente: "João Santos",
			funcionario: "Pedro",
			resolvido: true,
		},
	]);

	const [mostrarResolvidas, setMostrarResolvidas] = useState(false);
	const [filtroAtivo, setFiltroAtivo] = useState("todos");
	const [residenteSelecionado, setResidenteSelecionado] = useState("");
	const [filtroAberto, setFiltroAberto] = useState(false);
	const [filtroResidenteAberto, setFiltroResidenteAberto] = useState(false);
	const [modalAberto, setModalAberto] = useState(false);
	const [novaOcorrencia, setNovaOcorrencia] = useState({});
	const [editando, setEditando] = useState(false);
	const [dataAtual, setDataAtual] = useState(new Date());
	const [infoVisivel, setInfoVisivel] = useState(false);

	// ===== FUNÇÕES =====
	const abrirModalAdicionar = () => {
		setNovaOcorrencia({});
		setEditando(false);
		setModalAberto(true);
	};

	const abrirModalEditar = (id) => {
		const oc = ocorrencias.find((o) => o.id === id);
		setNovaOcorrencia(oc);
		setEditando(true);
		setModalAberto(true);
	};

	const salvarOcorrencia = () => {
		if (editando) {
			setOcorrencias((prev) =>
				prev.map((o) => (o.id === novaOcorrencia.id ? novaOcorrencia : o))
			);
		} else {
			setOcorrencias((prev) => [
				...prev,
				{ ...novaOcorrencia, id: Date.now() },
			]);
		}
		setModalAberto(false);
	};

	const excluirOcorrencia = (id) => {
		setOcorrencias((prev) => prev.filter((o) => o.id !== id));
	};

	const alternarResolvido = (id) => {
		setOcorrencias((prev) =>
			prev.map((o) =>
				o.id === id ? { ...o, resolvido: !o.resolvido } : o
			)
		);
	};

	const handleDayClick = (date) => {
		setDataAtual(date);
	};

	const irParaHoje = () => setDataAtual(new Date());

	// ===== FILTROS =====
	const ocorrenciasFiltradas = ocorrencias
		.filter((o) => {
			const passaFiltroResolvido = mostrarResolvidas ? o.resolvido : !o.resolvido;
			const passaFiltroCategoria =
				filtroAtivo === "todos" || o.categoria === filtroAtivo;
			const passaFiltroResidente =
				residenteSelecionado === "" || o.residente === residenteSelecionado;
			return passaFiltroResolvido && passaFiltroCategoria && passaFiltroResidente;
		})
		.sort((a, b) => new Date(a.data) - new Date(b.data));

	const getTileContent = ({ date, view }) => {
		if (view !== "month") return null;
		const ocorrenciasDia = ocorrencias.filter(
			(o) => o.data.toDateString() === date.toDateString()
		);
		if (ocorrenciasDia.length === 0) return null;
		const categoriasDia = [...new Set(ocorrenciasDia.map((o) => o.categoria))];
		return (
			<div className="flex justify-center gap-1 mt-0.5 flex-wrap">
				{categoriasDia.map((c) => (
					<div
						key={c}
						className={`w-2.5 h-2.5 rounded-full shadow-sm ${CORES_CALENDARIO[c]}`}
						title={ROTULOS_CATEGORIAS[c]}
					/>
				))}
			</div>
		);
	};

	const getTileClassName = ({ date, view }) => {
		const classes = [];
		const hoje = new Date();
		if (date.toDateString() === hoje.toDateString())
			classes.push("bg-odara-primary/10 font-semibold rounded-lg");
		if (date.toDateString() === dataAtual.toDateString())
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
							to="/gestao/PaginaRegistros"
							className="text-odara-accent hover:text-odara-secondary flex items-center"
						>
							<FaArrowLeft className="mr-1" />
						</Link>
						<h1 className="text-3xl font-bold text-odara-dark">
							Registro de Ocorrências
						</h1>
						<div className="relative">
							<FaInfoCircle
								className="ml-2 text-odara-accent"
								size={20}
								onMouseEnter={() => setInfoVisivel(true)}
								onMouseLeave={() => setInfoVisivel(false)}
							/>
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
				<div className="flex flex-wrap gap-4 mb-6 items-center">
					<button
						onClick={abrirModalAdicionar}
						className="bg-odara-accent hover:bg-odara-secondary text-white px-4 py-2 rounded-lg flex items-center"
					>
						<FaPlus className="mr-2" /> Nova Ocorrência
					</button>

					<button
						onClick={() => setMostrarResolvidas(!mostrarResolvidas)}
						className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition w-40 justify-center"
					>
						<FaFilter className="text-odara-accent mr-2" />
						{mostrarResolvidas
							? "Pendentes"
							: "Resolvidas"}
					</button>

					{/* Filtro Categoria */}
					<div className="relative">
						<button
							className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition w-40 justify-center"
							onClick={() => {
								setFiltroAberto(!filtroAberto);
								setFiltroResidenteAberto(false);
							}}
						>
							<FaFilter className="text-odara-accent mr-2" />
							Categoria
						</button>
						{filtroAberto && (
							<div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
								{FILTROS.map((filtro) => (
									<button
										key={filtro.id}
										onClick={() => {
											setFiltroAtivo(filtro.id);
											setFiltroAberto(false);
										}}
										className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${filtroAtivo === filtro.id ? "bg-indigo-100 font-semibold" : ""
											}`}
									>
										{filtro.label}
									</button>
								))}
							</div>
						)}
					</div>

					{/* Filtro Residente */}
					<div className="relative">
						<button
							className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition w-40 justify-center"
							onClick={() => {
								setFiltroResidenteAberto(!filtroResidenteAberto);
								setFiltroAberto(false);
							}}
						>
							<FaFilter className="text-odara-accent mr-2" />
							Residentes
						</button>
						{filtroResidenteAberto && (
							<div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
								<button
									onClick={() => {
										setResidenteSelecionado("");
										setFiltroResidenteAberto(false);
									}}
									className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${!residenteSelecionado ? "bg-indigo-100 font-semibold" : ""
										}`}
								>
									Todos
								</button>
								{[...new Set(ocorrencias.map((o) => o.residente).filter(Boolean))].map(
									(residente) => (
										<button
											key={residente}
											onClick={() => {
												setResidenteSelecionado(residente);
												setFiltroResidenteAberto(false);
											}}
											className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-50 ${residenteSelecionado === residente
													? "bg-indigo-100 font-semibold"
													: ""
												}`}
										>
											{residente}
										</button>
									)
								)}
							</div>
						)}
					</div>
				</div>

				{/* Grid de Ocorrências e Calendário */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Lista de Ocorrências */}
					<div className="bg-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-6">
						<h2 className="text-2xl text-odara-dark font-bold mb-4">
							{mostrarResolvidas ? "Ocorrências Resolvidas" : "Ocorrências Pendentes"}
						</h2>
						<div className="space-y-4 max-h-[600px] overflow-y-auto">
							{ocorrenciasFiltradas.length === 0 ? (
								<p className="text-center text-gray-500">Nenhuma ocorrência encontrada</p>
							) : (
								ocorrenciasFiltradas.map((o) => (
									<div key={o.id} className={`p-4 rounded-lg ${CORES_CATEGORIAS[o.categoria]}`}>
										<div className="flex justify-between items-center mb-2">
											<div>
												<span className="font-semibold">
													{o.data.getDate()}/{o.data.getMonth() + 1}/{o.data.getFullYear()}
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
										{o.providencias && <p className="text-sm italic mb-1">Providências: {o.providencias}</p>}
										<p className="text-xs">
											<strong>Residente:</strong> {o.residente} | <strong>Funcionário:</strong> {o.funcionario}
										</p>
										<div className="flex justify-end gap-2 mt-2">
											<button onClick={() => abrirModalEditar(o.id)} className="p-1 text-white bg-blue-500 rounded">
												<FaEdit />
											</button>
											<button onClick={() => excluirOcorrencia(o.id)} className="p-1 text-white bg-red-500 rounded">
												<FaTrash />
											</button>
										</div>
									</div>
								))
							)}
						</div>
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
						<Calendar
							onChange={handleDayClick}
							value={dataAtual}
							tileContent={getTileContent}
							tileClassName={getTileClassName}
							className="border-0 mx-auto max-w-[350px]  rounded-xl shadow-sm p-2"
						/>
					</div>
				</div>

				{/* Modal de Adicionar/Editar Ocorrência */}
				{modalAberto && (
					<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50">
						<div className="bg-white text-odara-dark border-4 border-odara-primary rounded-lg py-2 p-6 w-full max-w-lg">
							<h2 className="text-xl font-bold mb-4">{editando ? "Editar Ocorrência" : "Nova Ocorrência"}</h2>
							<div className="space-y-3">
								<input
									type="text"
									placeholder="Título"
									className="w-full border-odara-primary border rounded-lg px-3 py-2"
									value={novaOcorrencia.titulo || ""}
									onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, titulo: e.target.value })}
								/>
								<textarea
									placeholder="Descrição"
									className="w-full border-odara-primary border rounded-lg px-3 py-2"
									value={novaOcorrencia.descricao || ""}
									onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, descricao: e.target.value })}
								/>
								<textarea
									placeholder="Providências"
									className="w-full border-odara-primary border rounded-lg px-3 py-2"
									value={novaOcorrencia.providencias || ""}
									onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, providencias: e.target.value })}
								/>
								<div className="flex gap-2">
									<input
										type="date"
										className="border-odara-primary border rounded-lg px-3 py-2 flex-1"
										value={novaOcorrencia.data || ""}
										onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, data: e.target.value })}
									/>
									<input
										type="time"
										className="border-odara-primary border rounded-lg px-3 py-2 flex-1"
										value={novaOcorrencia.horario || ""}
										onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, horario: e.target.value })}
									/>
								</div>
								<input
									type="text"
									placeholder="Residente"
									className="w-full border-odara-primary border rounded-lg px-3 py-2"
									value={novaOcorrencia.residente || ""}
									onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, residente: e.target.value })}
								/>
								<input
									type="text"
									placeholder="Funcionário"
									className="w-full  border-odara-primary border rounded-lg px-3 py-2"
									value={novaOcorrencia.funcionario || ""}
									onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, funcionario: e.target.value })}
								/>
								<select
									className="w-full border-odara-primary text-odara-dark border rounded-lg px-3 py-2"
									value={novaOcorrencia.categoria || ""}
									onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, categoria: e.target.value })}
								>
									{Object.entries(ROTULOS_CATEGORIAS).map(([key, label]) => (
										<option key={key} value={key}>
											{label}
										</option>
									))}
								</select>
							</div>
							<div className="mt-4 flex justify-end gap-2">
								<button
									className="px-4 border-odara-primary border py-2 rounded-lg text-odara-primary hover:text-odara-white hover:bg-odara-primary"
									onClick={() => setModalAberto(false)}
								>
									Cancelar
								</button>
								<button
									className="px-4 py-2 bg-odara-accent hover:bg-odara-secondary text-odara-white rounded-lg"
									onClick={salvarOcorrencia}
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

export default RegistroOcorrencias;
