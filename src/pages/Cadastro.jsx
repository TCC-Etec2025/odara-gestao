"use client"

import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Cadastro = () => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/login');
  };

  const [formData, setFormData] = useState({
    nomeInstituicao: "",
    cnpj: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    aceitaTermos: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Lucas colocar a lógica de submit aqui
  }

  const estadosBrasil = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
    "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ]

  return (
    <div className="min-h-screen bg-gray-50 w-full py-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center w-full">  {/* Adicionei w-full aqui */}
          <div className="w-full lg:w-2/3">  {/* Removi a div flex desnecessária e ajustei a largura */}
            <section className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-odara-accent mb-6 text-center">Cadastro da Instituição</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Nome da Instituição */}
                  <div className="col-span-2">
                    <label className="block text-odara-dark mb-1 text-sm font-medium">
                      Nome da Instituição <span class='text-odara-primary'>*</span>
                    </label>
                    <input
                      type="text"
                      name="nomeInstituicao"
                      value={formData.nomeInstituicao}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-odara-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-odara-primary focus:border-transparent text-odara-secondary"
                      placeholder="Casa de Repouso Esperança"
                    />
                  </div>

                  {/* CNPJ */}
                  <div>
                    <label className="block text-odara-dark mb-1 text-sm font-medium">
                      CNPJ <span class='text-odara-primary'>*</span>
                    </label>
                    <input
                      type="text"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-odara-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-odara-primary focus:border-transparent text-odara-secondary"
                      placeholder="00.000.000/0000-00"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-odara-dark mb-1 text-sm font-medium">
                      Email <span class='text-odara-primary'>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-odara-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-odara-primary focus:border-transparent text-odara-secondary"
                      placeholder="contato@instituicao.com"
                    />
                  </div>

                  {/* Senha */}
                  <div>
                    <label className="block text-odara-dark mb-1 text-sm font-medium">
                      Senha <span class='text-odara-primary'>*</span>
                    </label>
                    <input
                      type="password"
                      name="senha"
                      value={formData.senha}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-odara-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-odara-primary focus:border-transparent text-odara-secondary"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* Confirmar Senha */}
                  <div>
                    <label className="block text-odara-dark mb-1 text-sm font-medium">
                      Confirmar Senha <span class='text-odara-primary'>*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmarSenha"
                      value={formData.confirmarSenha}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-odara-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-odara-primary focus:border-transparent text-odara-secondary"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* Telefone */}
                  <div>
                    <label className="block text-odara-dark mb-1 text-sm font-medium">
                      Telefone <span class='text-odara-primary'>*</span>
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-odara-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-odara-primary focus:border-transparent text-odara-secondary"
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  {/* Endereço */}
                  <div className="col-span-2">
                    <label className="block text-odara-dark mb-1 text-sm font-medium">
                      Endereço <span class='text-odara-primary'>*</span>
                    </label>
                    <input
                      type="text"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-odara-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-odara-primary focus:border-transparent text-odara-secondary"
                      placeholder="Rua, número, complemento"
                    />
                  </div>

                  {/* Cidade */}
                  <div>
                    <label className="block text-odara-dark mb-1 text-sm font-medium">
                      Cidade <span class='text-odara-primary'>*</span>
                    </label>
                    <input
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-odara-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-odara-primary focus:border-transparent text-odara-secondary"
                      placeholder="Sua cidade"
                    />
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-odara-dark mb-1 text-sm font-medium">
                      Estado <span class='text-odara-primary'>*</span>
                    </label>
                    <select
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-odara-secondary/50 rounded-lg focus:outline-none focus:ring-2 text-odara-secondary focus:ring-odara-primary focus:border-transparent"
                    >
                      <option value="">Selecione</option>
                      {estadosBrasil.map(uf => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>

                  {/* CEP */}
                  <div>
                    <label className="block text-odara-dark mb-1 text-sm font-medium">
                      CEP <span class='text-odara-primary'>*</span>
                    </label>
                    <input
                      type="text"
                      name="cep"
                      value={formData.cep}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-odara-secondary/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-odara-primary focus:border-transparent text-odara-secondary"
                      placeholder="00000-000"
                    />
                  </div>
                </div>

                {/* Termos de uso */}
                <div className="flex items-start mt-4">
                  <div className="flex items-center h-5">
                    <input
                      id="aceitaTermos"
                      name="aceitaTermos"
                      type="checkbox"
                      checked={formData.aceitaTermos}
                      onChange={handleInputChange}
                      required
                      className="focus:ring-odara-primary h-4 w-4 text-odara-primary border-odara-secondary/50 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="aceitaTermos" className="font-medium text-odara-dark">
                      Eu li e aceito os <a href="/termos" className="text-odara-primary hover:underline">Termos de Uso</a> e <a href="/privacidade" className="text-odara-primary hover:underline">Política de Privacidade</a> <span class='text-odara-primary'>*</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-odara-accent border-2 border-odara-contorno hover:bg-odara-secondary text-odara-contorno py-3 px-4 rounded-lg font-medium mt-6 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Cadastrar Instituição
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-odara-dark">
                  Já tem uma conta?{" "}
                  <button
                    onClick={handleNavigate}
                    className="text-odara-primary hover:underline font-medium"
                  >
                    Fazer Login
                  </button>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main >
    </div >
  )
}

export default Cadastro