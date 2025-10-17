import React, { useState } from "react";
import { FaUtensils, FaWalking, FaUserNurse, FaArrowLeft, FaClipboardCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const Preferencias = () => {
  const [residenteSelecionado, setResidenteSelecionado] = useState("");
  const [observacao, setObservacao] = useState("");
  const [checklist, setChecklist] = useState({});
  const [confirmado, setConfirmado] = useState(false);

  // Dados vindos do cadastro feito pelo admin
  const residentes = [
    {
      nome: "João",
      foto: "/images/foto-idoso-joao.jpg",
      preferencias: {
        alimentar: "Comida Italiana",
        atividades: "Leitura",
        cuidador: "Leticia",
      },
    },
    {
      nome: "Maria",
      foto: "/images/foto-idosa-maria.png",
      preferencias: {
        alimentar: "Vegetariano",
        atividades: "Caminhada ao ar livre",
        cuidador: "Maria",
      },
    },
  ];

  const toggleCheck = (residente, campo) => {
    setChecklist((prev) => ({
      ...prev,
      [residente]: {
        ...prev[residente],
        [campo]: !prev[residente]?.[campo],
      },
    }));
  };

  const residenteAtual = residentes.find((r) => r.nome === residenteSelecionado);

  const finalizarChecklist = () => {
    setConfirmado(true);
    // Aqui pode ser adicionado o envio para o backend ou salvar localmente
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-odara-offwhite to-odara-primary/30 p-6 lg:p-10">
      <div className="flex-1 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center mb-6">
          <Link
            to="/funcionario"
            className="text-odara-accent hover:text-odara-secondary transition-colors duration-200 flex items-center mr-4"
          >
            <FaArrowLeft className="mr-2" /> Voltar
          </Link>
          <h1 className="text-3xl font-bold text-odara-dark">Checklist Diário de Preferências</h1>
        </div>

        {/* Selecionar Residente */}
        <div className="mb-8">
          <label className="block text-odara-dark font-medium mb-2">Selecione o residente</label>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            value={residenteSelecionado}
            onChange={(e) => setResidenteSelecionado(e.target.value)}
          >
            <option value="">Escolher...</option>
            {residentes.map((r) => (
              <option key={r.nome} value={r.nome}>
                {r.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Mostrar preferências e checklist */}
        {residenteAtual ? (
          <div>
            <div className="flex items-center mb-6">
              <img
                src={residenteAtual.foto}
                alt={residenteAtual.nome}
                className="w-24 h-24 rounded-xl object-cover mr-4 border border-gray-300"
              />
              <div>
                <h2 className="text-2xl font-semibold text-odara-dark">{residenteAtual.nome}</h2>
                <p className="text-gray-600 text-sm">Preferências do residente</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Alimentar */}
              <div className="bg-odara-offwhite p-4 rounded-xl border-l-4 border-odara-accent">
                <h3 className="text-lg font-semibold flex items-center mb-3">
                  <FaUtensils className="mr-2 text-odara-accent" /> Alimentação
                </h3>
                <p className="text-gray-700 mb-2">
                  Preferência: <strong>{residenteAtual.preferencias.alimentar}</strong>
                </p>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checklist[residenteAtual.nome]?.alimentar || false}
                    onChange={() => toggleCheck(residenteAtual.nome, "alimentar")}
                    className="accent-odara-accent w-5 h-5"
                  />
                  <span>Ofereci o tipo de refeição de preferência</span>
                </label>
              </div>

              {/* Atividades */}
              <div className="bg-odara-offwhite p-4 rounded-xl border-l-4 border-odara-accent">
                <h3 className="text-lg font-semibold flex items-center mb-3">
                  <FaWalking className="mr-2 text-odara-accent" /> Atividade
                </h3>
                <p className="text-gray-700 mb-2">
                  Preferência: <strong>{residenteAtual.preferencias.atividades}</strong>
                </p>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checklist[residenteAtual.nome]?.atividades || false}
                    onChange={() => toggleCheck(residenteAtual.nome, "atividades")}
                    className="accent-odara-accent w-5 h-5"
                  />
                  <span>Realizei a atividade de preferência</span>
                </label>
              </div>

              {/* Cuidador */}
              <div className="bg-odara-offwhite p-4 rounded-xl border-l-4 border-odara-accent">
                <h3 className="text-lg font-semibold flex items-center mb-3">
                  <FaUserNurse className="mr-2 text-odara-accent" /> Cuidador
                </h3>
                <p className="text-gray-700 mb-2">
                  Preferência: <strong>{residenteAtual.preferencias.cuidador}</strong>
                </p>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checklist[residenteAtual.nome]?.cuidador || false}
                    onChange={() => toggleCheck(residenteAtual.nome, "cuidador")}
                    className="accent-odara-accent w-5 h-5"
                  />
                  <span>O cuidador preferido realizou o atendimento</span>
                </label>
              </div>
            </div>

            {/* Observações */}
            <div className="mt-8">
              <label className="block text-odara-dark font-medium mb-2">Observações</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                rows="3"
                placeholder="Anote algo importante sobre o atendimento..."
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              ></textarea>
            </div>

            {/* Botão Finalizar */}
            <div className="mt-6 text-right">
              <button
                onClick={finalizarChecklist}
                className="bg-odara-accent text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-odara-secondary transition"
              >
                <FaClipboardCheck />
                Finalizar Checklist
              </button>
            </div>

            {confirmado && (
              <p className="mt-4 text-green-600 font-semibold text-center">
                Checklist de {residenteAtual.nome} registrado com sucesso!
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-600 italic">Selecione um residente para iniciar o checklist.</p>
        )}
      </div>
    </div>
  );
};

export default Preferencias;
