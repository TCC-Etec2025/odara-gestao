import React, { useState } from "react";
import { FaUsers, FaUserTie, FaExclamationTriangle, FaClipboardList, FaBell, } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";

const Dashboard = () => {
  // Defindo / simulando estatisticas
  const stats = {
    residentes: 45,
    funcionarios: 18,
    alertas: 3,
    acoes: 12,
  };

  const atividadesRecentes = [
    { id: 1, atividade: "Banho realizado", horario: "08:00", responsavel: "Maria" },
    { id: 2, atividade: "Medicamento entregue", horario: "09:30", responsavel: "João" },
    { id: 3, atividade: "Café da manhã servido", horario: "07:30", responsavel: "Leticia" },
  ];

  // Estatísticas para simulação de dados mensais
  const dadosMensais = [
    { mes: "Jan", residentes: 40, funcionarios: 15 },
    { mes: "Fev", residentes: 42, funcionarios: 16 },
    { mes: "Mar", residentes: 44, funcionarios: 18 },
    { mes: "Abr", residentes: 45, funcionarios: 18 },
  ];

  // informações definidas para simulação de notificações
  const notificacoes = [
    { id: 1, texto: "Consulta médica coletiva amanhã às 14h", tipo: "info" },
    { id: 2, texto: "Alerta: 2 residentes com medicação atrasada", tipo: "alert" },
    { id: 3, texto: "Reunião administrativa sexta às 10h", tipo: "admin" },
  ];

  return (
    <div className="flex min-h-screen bg-odara-offwhite">
      <div className="flex-1 p-6 lg:p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-odara-dark">Dashboard Administrativo
          </h1>
          <p className="text-odara-dark/60 text-sm">
            Visão geral da gestão do sistema
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card titulo="Residentes" valor={stats.residentes} icone={<FaUsers />} cor="blue" />
          <Card titulo="Funcionários" valor={stats.funcionarios} icone={<FaUserTie />} cor="green" />
          <Card titulo="Alertas Críticos" valor={stats.alertas} icone={<FaExclamationTriangle />} cor="red" />
          <Card titulo="Ações" valor={stats.acoes} icone={<FaClipboardList />} cor="purple" />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Atividades recentes */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="text-lg font-semibold text-odara-dark mb-4">
              Atividades Recentes
            </h2>
            <ul className="divide-y divide-gray-100">
              {atividadesRecentes.map((a) => (
                <li key={a.id} className="py-2 flex justify-between text-sm">
                  <span>{a.atividade} <b>({a.horario})</b></span>
                  <span className="text-odara-dark/60">{a.responsavel}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Grafico mensal */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="text-lg font-semibold text-odara-dark mb-4">
              Estatísticas Mensais - Funcionarios & Residentes
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dadosMensais}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="residentes" fill="#D8A4AA" radius={[4, 4, 0, 0]} />
                <Bar dataKey="funcionarios" fill="#2D5B78" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Notificações */}
        <section className="mt-10 bg-white rounded-2xl shadow p-5">
          <h2 className="text-lg font-semibold text-odara-dark mb-4">
            Notificações
          </h2>
          <div className="space-y-3">
            {notificacoes.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-xl flex items-center gap-3 text-sm ${n.tipo === "alert"
                    ? "bg-red-50 text-red-700"
                    : n.tipo === "admin"
                      ? "bg-odara-primary/30 text-odara-accent"
                      : "bg-odara-secondary/30 text-odara-name"
                  }`}
              >
                <FaBell className="flex-shrink-0" />
                <span>{n.texto}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// Card de estatísticas
const Card = ({ titulo, valor, icone, cor }) => {
  const estilos = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-odara-dark/60">{titulo}</p>
        <h3 className="text-2xl font-bold text-odara-dark">{valor}</h3>
      </div>
      <div className={`${estilos[cor]} p-3 rounded-full text-xl`}>
        {icone}
      </div>
    </div>
  );
};

export default Dashboard;
