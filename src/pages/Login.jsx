"use client"

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { supabase } from "../supabaseClient"
import bcrypt from 'bcryptjs'

  const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      email: "",
      senha: ""
    })

    const handleNavigate = () => {
      navigate('/cadastro');
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: userData, error: fetchError } = await supabase
        .from('usuarios_sistema')
        .select('email, senha')
        .eq('email', formData.email)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (!userData) {
        alert("Email ou senha inválidos.");
        return;
      }

      const passwordMatch = await bcrypt.compare(formData.senha, userData.senha);

      if (passwordMatch) {
        alert("Login realizado com sucesso!");
        console.log("Usuário conectado:", userData);
        navigate('/gestao');
      } else {
        alert("Email ou senha inválidos.");
      }
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
      console.error("Erro no login:", error);
    }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <section className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-odara-accent mb-2">Bem-vindo de volta</h1>
              <p className="text-gray-600">Faça login para acessar sua conta</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-odara-dark mb-1 text-sm font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-odara-primary focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="senha" className="block text-odara-dark mb-1 text-sm font-medium">
                  Senha *
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-odara-primary focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="lembrar"
                    name="lembrar"
                    type="checkbox"
                    className="h-4 w-4 text-odara-primary focus:ring-odara-primary border-gray-300 rounded"
                  />
                  <label htmlFor="lembrar" className="ml-2 block text-sm text-gray-700">
                    Lembrar de mim
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/recuperar-senha")}
                  className="text-sm text-odara-primary hover:text-odara-dark"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-odara-accent hover:bg-odara-dark text-white py-3 px-4 rounded-lg font-medium transition duration-200 mt-4"
              >
                Entrar
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Ainda não tem uma conta?{" "}
                <button
                  onClick={handleNavigate}
                  className="text-odara-primary hover:text-odara-dark font-medium"
                >
                  Criar conta
                </button>
              </p>
            </div>
          </section>
        </div>
      </div>
    )
  }

  export default Login