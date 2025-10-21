import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaFilter, FaInfoCircle, FaArrowLeft, FaTimes, FaChevronLeft, FaChevronRight, FaAngleDown } from "react-icons/fa";
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
	[CATEGORIAS.COMPORTAMENTAL]: "bg-odara-accent/60 text-odara-dark",
	[CATEGORIAS.ESTRUTURAL]: "bg-odara-secondary/60 text-odara-dark",
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

const STATUS_OPCOES = [
	{ id: "todos", label: "Todos" },
	{ id: "pendente", label: "Pendente" },
	{ id: "resolvido", label: "Resolvido" },
];

const RegistroOcorrencias = () => {
	// ===== ESTADOS =====
	const [ocorrencias, setOcorrencias] = useState([
		{
			id: 1,
			titulo: "Queda no corredor",
			descricao: "Residente escorregou no corredor molhado durante a limpeza",
			providencias: "Atendimento médico imediato, verificação de fraturas, acompanhamento por 24h",
			data: new Date(new Date().getFullYear(), new Date().getMonth(), 3),
			horario: "10:30",
			categoria: CATEGORIAS.ACIDENTE,
			residente: "Maria Oliveira",
			funcionario: "João Silva",
			status: "pendente",
		},
		{
			id: 2,
			titulo: "Problema estrutural",
			descricao: "Porta do quarto 204 quebrada e não fecha corretamente",
			providencias: "Reparo agendado para amanhã, residente realocado temporariamente",
			data: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
			horario: "09:00",
			categoria: CATEGORIAS.ESTRUTURAL,
			residente: "João Santos",
			funcionario: "Pedro Almeida",
			status: "resolvido",
		},
		{
			id: 3,
			titulo: "Febre alta",
			descricao: "Residente com febre de 39°C e mal-estar geral",
			providencias: "Medicação administrada, compressas aplicadas, médico acionado",
			data: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
			horario: "14:00",
			categoria: CATEGORIAS.SAUDE,
			residente: "Ana Costa",
			funcionario: "Carla Mendes",
			status: "pendente",
		},
		{
			id: 4,
			titulo: "Agitação noturna",
			descricao: "Residente apresentou comportamento agitado durante a noite",
			providencias: "Acompanhamento psicológico, medicação ajustada, monitoramento contínuo",
			data: new Date(new Date().getFullYear(), new Date().getMonth(), 23),
			horario: "22:30",
			categoria: CATEGORIAS.COMPORTAMENTAL,
			residente: "Carlos Oliveira",
			funcionario: "Mariana Lima",
			status: "pendente",
		},
	]);

	const [filtroStatus, setFiltroStatus] = useState("todos");
	const [filtroAtivo, setFiltroAtivo] = useState("todos");
	const [residenteSelecionado, setResidenteSelecionado] = useState("");
	const [filtroAberto, setFiltroAberto] = useState(false);
	const [filtroResidenteAberto, setFiltroResidenteAberto] = useState(false);
	const [filtroStatusAberto, setFiltroStatusAberto] = useState(false);
	const [modalAberto, setModalAberto] = useState(false);
	const [novaOcorrencia, setNovaOcorrencia] = useState({
		titulo: '',
		descricao: '',
		providencias: '',
		data: new Date().toISOString().split('T')[0],
		horario: '',
		categoria: CATEGORIAS.OUTRO,
		residente: '',
		funcionario: '',
		status: 'pendente'
	});
	const [editando, setEditando] = useState(false);
	const [idEditando, setIdEditando] = useState(null);
	const [dataAtual, setDataAtual] = useState(new Date());
	const [infoVisivel, setInfoVisivel] = useState(false);
	const [dropdownStatusAberto, setDropdownStatusAberto] = useState(null);

	// ===== FUNÇÕES =====
	const abrirModalAdicionar = () => {
		setNovaOcorrencia({
			titulo: '',
			descricao: '',
			providencias: '',
			data: new Date().toISOString().split('T')[0],
			horario: '',
			categoria: CATEGORIAS.OUTRO,
			residente: '',
			funcionario: '',
			status: 'pendente'
		});
		setEditando(false);
		setIdEditando(null);
		setModalAberto(true);
	};

	const abrirModalEditar = (id) => {
		const ocorrenciaParaEditar = ocorrencias.find(ocorrencia => ocorrencia.id === id);
		if (ocorrenciaParaEditar) {
			setNovaOcorrencia({
				...ocorrenciaParaEditar,
				data: ocorrenciaParaEditar.data.toISOString().split('T')[0],
				horario: ocorrenciaParaEditar.horario
			});
			setEditando(true);
			setIdEditando(id);
			setModalAberto(true);
		}
	};

	const salvarOcorrencia = () => {
		if (!novaOcorrencia.titulo || !novaOcorrencia.data) return;

		const partesData = novaOcorrencia.data.split('-');
		const dataOcorrencia = new Date(partesData[0], partesData[1] - 1, partesData[2]);

		if (editando && idEditando) {
			setOcorrencias(anterior => anterior.map(ocorrencia =>
				ocorrencia.id === idEditando
					? {
						...ocorrencia,
						...novaOcorrencia,
						data: dataOcorrencia
					}
					: ocorrencia
			));
		} else {
			const novaOcorrenciaObj = {
				...novaOcorrencia,
				id: Date.now(),
				data: dataOcorrencia
			};
			setOcorrencias(anterior => [...anterior, novaOcorrenciaObj]);
		}
		setModalAberto(false);
	};

	const excluirOcorrencia = (id) => {
		if (window.confirm('Tem certeza que deseja excluir esta ocorrência?')) {
			setOcorrencias(anterior => anterior.filter(ocorrencia => ocorrencia.id !== id));
		}
	};

	const alterarStatus = (id, novoStatus) => {
		setOcorrencias(anterior => anterior.map(ocorrencia => {
			if (ocorrencia.id === id) {
				return { ...ocorrencia, status: novoStatus };
			}
			return ocorrencia;
		}));
	};

	const handleDayClick = (value) => {
		setDataAtual(value);
	};

	const irParaHoje = () => setDataAtual(new Date());

	const toggleDropdownStatus = (ocorrenciaId) => {
		setDropdownStatusAberto(dropdownStatusAberto === ocorrenciaId ? null : ocorrenciaId);
	};

	// ===== FILTROS =====
	const ocorrenciasFiltradas = ocorrencias
		.filter((o) => {
			const passaFiltroStatus = filtroStatus === "todos" || o.status === filtroStatus;
			const passaFiltroCategoria = filtroAtivo === "todos" || o.categoria === filtroAtivo;
			const passaFiltroResidente = residenteSelecionado === "" || o.residente === residenteSelecionado;
			return passaFiltroStatus && passaFiltroCategoria && passaFiltroResidente;
		})
		.sort((a, b) => new Date(b.data) - new Date(a.data));

	const getTileContent = ({ date, view }) => {
		if (view !== "month") return null;
		const ocorrenciasDia = ocorrencias.filter(
			(o) => o.data.toDateString() === date.toDateString()
		);
		if (ocorrenciasDia.length === 0) return null;
		const categoriasDia = [...new Set(ocorrenciasDia.map((o) => o.categoria))];
		return (
			<div className="flex justify-center gap-1 mt-1 flex-wrap">
				{categoriasDia.map((c) => (
					<div
						key={c}
						className={`w-2 h-2 rounded-full ${CORES_CALENDARIO[c]}`}
						title={ROTULOS_CATEGORIAS[c]}
					/>
				))}
			</div>
		);
	};

	const getTileClassName = ({ date, view }) => {
		const classes = [];
		const hoje = new Date();
		
		// Dia atual
		if (date.toDateString() === hoje.toDateString()) {
			classes.push('!bg-odara-primary/50 !text-dark !font-bold');
		}
		
		// Dia selecionado
		if (date.toDateString() === dataAtual.toDateString()) {
			classes.push('!bg-odara-secondary/70 !text-white !font-bold');
		}
		
		return classes.join(' ');
	};

	// ===== RENDER =====
	return (
		<div className="flex min-h-screen bg-odara-offwhite">
			<div className="flex-1 p-6 lg:p-10">
				{/* Cabeçalho */}
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
								className="text-odara-dark hover:text-odara-secondary transition-colors duration-200"
							>
								<FaInfoCircle size={20} className='text-odara-accent hover:text-odara-secondary' />
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
									<div className="absolute bottom-full left-4 border-4 border-transparent border-b-gray-800"></div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Botão novo registro*/}
				<div className="relative flex items-center gap-4 mb-6">
					<button
						onClick={abrirModalAdicionar}
						className="bg-odara-accent hover:bg-odara-secondary text-odara-contorno font-emibold py-2 px-4 rounded-lg flex items-center transition duration-200"
					>
						<FaPlus className="mr-2 text-odara-white" /> Nova Ocorrência
					</button>

					 {/* Barra de Filtros - Responsiva */}
        <div className="relative flex flex-wrap items-center gap-2 sm:gap-4 mb-6"></div>

					{/* Filtro por Status */}
					<div className="relative dropdown-container">
						<button
							className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border-2 font-medium hover:border-2 hover:border-odara-primary transition w-40 justify-center"
							onClick={() => {
								setFiltroStatusAberto(!filtroStatusAberto);
								setFiltroAberto(false);
								setFiltroResidenteAberto(false);
							}}
						>
							<FaFilter className="text-odara-accent mr-2" />
							Status
						</button>
						{filtroStatusAberto && (
							<div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-10">
								{STATUS_OPCOES.map((status) => (
									<button
										key={status.id}
										onClick={() => {
											setFiltroStatus(status.id);
											setFiltroStatusAberto(false);
										}}
										className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-odara-primary/20 transition-colors duration-200 ${
											filtroStatus === status.id 
												? 'bg-odara-accent/20 font-semibold text-odara-accent' 
												: 'text-odara-dark'
										}`}
									>
										{status.label}
									</button>
								))}
							</div>
						)}
					</div>

					{/* Filtro Categoria */}
					<div className="relative dropdown-container">
						<button
							className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border-2 font-medium hover:border-2 hover:border-odara-primary transition w-40 justify-center"
							onClick={() => {
								setFiltroAberto(!filtroAberto);
								setFiltroResidenteAberto(false);
								setFiltroStatusAberto(false);
							}}
						>
							<FaFilter className="text-odara-accent mr-2" />
							Categoria
						</button>
						{filtroAberto && (
							<div className="absolute mt-2 w-40 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-10">
								{FILTROS.map((filtro) => (
									<button
										key={filtro.id}
										onClick={() => {
											setFiltroAtivo(filtro.id);
											setFiltroAberto(false);
										}}
										className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-odara-primary/20 transition-colors duration-200 ${
											filtroAtivo === filtro.id 
												? 'bg-odara-accent/20 font-semibold text-odara-accent' 
												: 'text-odara-dark'
										}`}
									>
										{filtro.label}
									</button>
								))}
							</div>
						)}
					</div>

					{/* Filtro Residente */}
					<div className="relative dropdown-container">
						<button
							className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border-2 font-medium hover:border-2 hover:border-odara-primary transition w-40 justify-center"
							onClick={() => {
								setFiltroResidenteAberto(!filtroResidenteAberto);
								setFiltroAberto(false);
								setFiltroStatusAberto(false);
							}}
						>
							<FaFilter className="text-odara-accent mr-2" />
							Residentes
						</button>
						{filtroResidenteAberto && (
							<div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-10 max-h-60 overflow-y-auto">
								<button
									onClick={() => {
										setResidenteSelecionado("");
										setFiltroResidenteAberto(false);
									}}
									className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-odara-primary/20 transition-colors duration-200 ${
										!residenteSelecionado 
											? 'bg-odara-accent/20 font-semibold text-odara-accent' 
											: 'text-odara-dark'
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
											className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-odara-primary/20 transition-colors duration-200 ${
												residenteSelecionado === residente
													? 'bg-odara-accent/20 font-semibold text-odara-accent'
													: 'text-odara-dark'
											}`}
										>
											{residente}
										</button>
									)
								)}
							</div>
						)}
					</div>

					{/* Botão Limpar Filtros */}
					{(filtroAtivo !== 'todos' || residenteSelecionado || filtroStatus !== 'todos') && (
						<button
							onClick={() => {
								setFiltroAtivo('todos');
								setResidenteSelecionado('');
								setFiltroStatus('todos');
							}}
							className="flex items-center bg-odara-accent text-odara-white rounded-full px-4 py-2 shadow-sm font-medium hover:bg-odara-secondary transition"
						>
							<FaTimes className="mr-1" /> Limpar Filtros
						</button>
					)}
				</div>

				{/* Grid de Ocorrências e Calendário */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Lista de Ocorrências */}
					<div className="bg-odara-white border-l-4 border-odara-primary rounded-2xl shadow-lg p-6">
						<h2 className="text-2xl font-bold text-odara-dark flex items-center mb-2">
							{filtroStatus === 'todos' ? 'Todas as Ocorrências' :
								`Ocorrências ${filtroStatus === 'pendente' ? 'Pendentes' : 'Resolvidas'}`}
						</h2>

						{/* Filtros ativos */}
						<div className="flex flex-wrap gap-2 mb-4">
							{filtroStatus !== 'todos' && (
								<span className="text-sm bg-odara-dropdown-accent text-odara-white px-2 py-1 rounded-full">
									Status: {filtroStatus === 'pendente' ? 'Pendente' : 'Resolvido'}
								</span>
							)}
							{filtroAtivo !== 'todos' && (
								<span className="text-sm bg-odara-primary text-odara-white px-2 py-1 rounded-full">
									Categoria: {ROTULOS_CATEGORIAS[filtroAtivo]}
								</span>
							)}
							{residenteSelecionado && (
								<span className="text-sm bg-odara-secondary text-odara-white px-2 py-1 rounded-full">
									Residente: {residenteSelecionado}
								</span>
							)}
						</div>

						<p className="text-odara-name/60 mb-6">
							{filtroStatus === 'todos'
								? 'Todas as ocorrências registradas'
								: filtroStatus === 'resolvido'
									? 'Ocorrências que foram resolvidas e finalizadas'
									: 'Ocorrências que ainda precisam de atenção e acompanhamento'
							}
						</p>

						<div className="space-y-4 max-h-[600px] overflow-y-auto">
							{ocorrenciasFiltradas.length === 0 ? (
								<div className="p-6 rounded-xl bg-odara-name/10 text-center">
									<p className="text-odara-dark/60">
										{filtroStatus === 'resolvido'
											? 'Nenhuma ocorrência resolvida encontrada'
											: filtroStatus === 'pendente'
												? 'Nenhuma ocorrência pendente encontrada'
												: 'Nenhuma ocorrência encontrada'
										}
									</p>
								</div>
							) : (
								ocorrenciasFiltradas.map((ocorrencia) => (
									<div
										key={ocorrencia.id}
										className={`p-4 rounded-xl hover:shadow-md transition-shadow duration-200 ${CORES_CATEGORIAS[ocorrencia.categoria]}`}
									>
										<div className="flex items-center justify-between mb-3">
											<div className="flex items-center gap-2.5">
												<span className={`w-2.5 h-2.5 rounded-full ${CORES_CALENDARIO[ocorrencia.categoria]}`}></span>
												<p className="text-base font-semibold">
													{ocorrencia.data.getDate().toString().padStart(2, '0')}/
													{(ocorrencia.data.getMonth() + 1).toString().padStart(2, '0')}/
													{ocorrencia.data.getFullYear()}
													{ocorrencia.horario && ` - ${ocorrencia.horario}`}
												</p>
											</div>

											{/* Dropdown de Status no Card */}
											<div className="flex items-center gap-3 status-dropdown-container">
												<div className="relative">
													<button
														onClick={() => toggleDropdownStatus(ocorrencia.id)}
														className={`flex items-center rounded-lg px-3 py-1 border-2 font-medium transition-colors duration-200 text-sm min-w-[120px] justify-center ${
															ocorrencia.status === 'resolvido'
																? 'bg-odara-primary text-white border-odara-primary hover:bg-odara-primary/90'
																: 'bg-odara-accent text-white border-odara-accent hover:bg-odara-accent/90'
														}`}
													>
														<FaAngleDown className="mr-2 text-white" />
														{ocorrencia.status === 'resolvido' ? 'Resolvido' : 'Pendente'}
													</button>

													{/* Dropdown Menu */}
													{dropdownStatusAberto === ocorrencia.id && (
														<div className="absolute mt-1 w-32 bg-white rounded-lg shadow-lg border-2 border-odara-primary z-20 right-0">
															<button
																onClick={() => alterarStatus(ocorrencia.id, 'pendente')}
																className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 transition-colors duration-200 ${
																	ocorrencia.status === 'pendente'
																		? 'bg-odara-accent/20 font-semibold text-odara-accent'
																		: 'text-odara-dark'
																} first:rounded-t-lg`}
															>
																Pendente
															</button>
															<button
																onClick={() => alterarStatus(ocorrencia.id, 'resolvido')}
																className={`block w-full text-left px-4 py-2 text-sm hover:bg-odara-primary/20 transition-colors duration-200 ${
																	ocorrencia.status === 'resolvido'
																		? 'bg-odara-accent/20 font-semibold text-odara-accent'
																		: 'text-odara-dark'
																} last:rounded-b-lg`}
															>
																Resolvido
															</button>
														</div>
													)}
												</div>
											</div>
										</div>

										<h6 className="text-xl font-bold mb-1 flex items-center">
											{ocorrencia.status === 'resolvido' && (
												<span className="text-green-500 mr-2">
													<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
													</svg>
												</span>
											)}
											{ocorrencia.titulo}
										</h6>

										<p className="text-base mb-2">{ocorrencia.descricao}</p>
										
										{ocorrencia.providencias && (
											<div className="mb-2">
												<p className="text-sm font-semibold text-odara-dark">Providências tomadas:</p>
												<p className="text-base italic">{ocorrencia.providencias}</p>
											</div>
										)}

										<div className="flex items-center justify-between">
											<div className="flex items-center text-sm">
												<span className="bg-odara-dropdown text-odara-dropdown-name/60 px-2 py-1 rounded-md text-xs">
													{ROTULOS_CATEGORIAS[ocorrencia.categoria]}
												</span>

												{ocorrencia.residente && (
													<>
														<span className="mx-2">•</span>
														<span className="text-odara-name">{ocorrencia.residente}</span>
													</>
												)}

												{ocorrencia.funcionario && (
													<>
														<span className="mx-2">•</span>
														<span className="text-odara-name">Registrado por: {ocorrencia.funcionario}</span>
													</>
												)}
											</div>

											{/* Botões de editar e excluir */}
											<div className="flex space-x-2">
												<button
													onClick={() => abrirModalEditar(ocorrencia.id)}
													className="text-odara-secondary hover:text-odara-dropdown-accent transition-colors duration-200 p-2 rounded-full hover:bg-odara-dropdown"
													title="Editar ocorrência"
												>
													<FaEdit size={14} />
												</button>

												<button
													onClick={() => excluirOcorrencia(ocorrencia.id)}
													className="text-odara-alerta hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-odara-alerta/50"
													title="Excluir ocorrência"
												>
													<FaTrash size={14} />
												</button>
											</div>
										</div>
									</div>
								))
							)}
						</div>
					</div>

					{/* Calendário */}
					<div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
						<div className="flex justify-center mb-5">
							<button
								onClick={irParaHoje}
								className="bg-odara-accent hover:bg-odara-secondary text-odara-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
							>
								Hoje
							</button>
						</div>

						<div className="flex justify-center border-2 border-odara-primary rounded-xl shadow-sm overflow-hidden max-w-md mx-auto">
							<Calendar
								value={dataAtual}
								onChange={setDataAtual}
								onClickDay={handleDayClick}
								tileClassName={getTileClassName}
								tileContent={getTileContent}
								locale="pt-BR"
								className="border-0"
								showNeighboringMonth={false}
							/>
						</div>

						{/* Legenda das cores */}
						<div className="grid grid-cols-1 mt-4 p-3 bg-odara-offwhite rounded-lg max-w-md mx-auto text-center">
							<h6 className="font-semibold text-odara-dark mb-2">Legenda das Categorias:</h6>
							<div className="grid grid-cols-2 gap-2 text-xs justify-items-center">
								{Object.entries(CATEGORIAS).map(([chave, valor]) => (
									<div key={valor} className="flex items-center gap-2">
										<div className={`w-3 h-3 rounded-full ${CORES_CALENDARIO[valor]}`}></div>
										<span>{ROTULOS_CATEGORIAS[valor]}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Modal para adicionar/editar ocorrência */}
				{modalAberto && (
					<div className="fixed inset-0 bg-odara-offwhite/80 flex items-center justify-center p-4 z-50">
						<div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border-l-4 border-odara-primary">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-2xl font-bold text-odara-accent">
									{editando ? 'Editar' : 'Adicionar'} Ocorrência
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
									<label className="block text-odara-dark font-medium mb-2">Título da Ocorrência *</label>
									<input
										type="text"
										className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
										value={novaOcorrencia.titulo || ''}
										onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, titulo: e.target.value })}
										placeholder="Digite o título da ocorrência"
									/>
								</div>

								<div>
									<label className="block text-odara-dark font-medium mb-2">Descrição</label>
									<textarea
										className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
										rows="3"
										value={novaOcorrencia.descricao || ''}
										onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, descricao: e.target.value })}
										placeholder="Descreva a ocorrência em detalhes"
									></textarea>
								</div>

								<div>
									<label className="block text-odara-dark font-medium mb-2">Providências Tomadas</label>
									<textarea
										className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
										rows="2"
										value={novaOcorrencia.providencias || ''}
										onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, providencias: e.target.value })}
										placeholder="Descreva as providências tomadas"
									></textarea>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-odara-dark font-medium mb-2">Data *</label>
										<input
											type="date"
											className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
											value={novaOcorrencia.data}
											onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, data: e.target.value })}
										/>
									</div>

									<div>
										<label className="block text-odara-dark font-medium mb-2">Horário</label>
										<input
											type="time"
											className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
											value={novaOcorrencia.horario || ''}
											onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, horario: e.target.value })}
										/>
									</div>
								</div>

								<div>
									<label className="block text-odara-dark font-medium mb-2">Residente(s)</label>
									<input
										type="text"
										className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
										value={novaOcorrencia.residente || ''}
										onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, residente: e.target.value })}
										placeholder="Nome do(s) residente(s) envolvido(s)"
									/>
								</div>

								<div>
									<label className="block text-odara-dark font-medium mb-2">Funcionário Responsável</label>
									<input
										type="text"
										className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
										value={novaOcorrencia.funcionario || ''}
										onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, funcionario: e.target.value })}
										placeholder="Nome do funcionário que registrou"
									/>
								</div>

								<div>
									<label className="block text-odara-dark font-medium mb-2">Categoria</label>
									<select
										className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
										value={novaOcorrencia.categoria}
										onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, categoria: e.target.value })}
									>
										{Object.entries(ROTULOS_CATEGORIAS).map(([chave, rotulo]) => (
											<option key={chave} value={chave}>{rotulo}</option>
										))}
									</select>
								</div>

								<div>
									<label className="block text-odara-dark font-medium mb-2">Status</label>
									<select
										className="w-full px-4 py-2 border border-odara-primary rounded-lg focus:border-odara-secondary text-odara-secondary"
										value={novaOcorrencia.status}
										onChange={(e) => setNovaOcorrencia({ ...novaOcorrencia, status: e.target.value })}
									>
										<option value="pendente">Pendente</option>
										<option value="resolvido">Resolvido</option>
									</select>
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
									onClick={salvarOcorrencia}
									className="px-4 py-2 bg-odara-accent text-odara-white rounded-lg hover:bg-odara-secondary transition-colors duration-200"
									disabled={!novaOcorrencia.titulo || !novaOcorrencia.data}
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

export default RegistroOcorrencias;