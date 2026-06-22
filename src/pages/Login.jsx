import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/forms/Input";

const rotasPorCargo = {
    teacher: '/professor/dashboard',
    student: '/estudante/dashboard',
    admin: '/admin/dashboard',
};

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [revelarSenha, setRevelarSenha] = useState(false)
    const [error, setError] = useState("")
    const [carregando, setCarregando] = useState(false)

    const lidarComEnvio = async (e) => {
        e.preventDefault()
        setError("")

        if (!email || !senha) {
            setError('Por favor, preencha todos os campos')
            return
        }

        setCarregando(true)

        const result = await login(email, senha)

        if (result.success) {
            const rotaDestino = rotasPorCargo[result.role] || '/'
            navigate(rotaDestino)
        } else {
            setError(result.error)
        }

        setCarregando(false)
    };

    return (
        <div className="flex min-h-screen justify-center items-center p-4 bg-slate-50 font-sans">
            <div className="w-full max-w-md bg-white p-8 flex flex-col gap-6 rounded-lg shadow-sm border border-solid border-slate-200 bg-opacity-100">
                <div className="flex flex-col gap-2 text-center">
                    <Link to="/" className="text-2xl font-bold text-indigo-900 tracking-tight hover:opacity-90 transition-opacity duration-200">
                        🎓 EstudaAI
                    </Link>
                    <h1 className="mt-2 text-xl font-semibold text-slate-900 leading-snug">Acesse sua conta</h1>
                    <p className="text-sm text-slate-500 font-normal">Entre para gerenciar seus planos de aula e estudos</p>
                </div>

                {error && (
                    <div className="text-sm bg-red-50 border border-solid border-red-200 text-red-700 px-4 py-3 rounded-md font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={lidarComEnvio} className="flex flex-col gap-4">
                    <Input
                        id="Email"
                        label="Endereço de E-mail"
                        type="email"
                        placeholder="exemplo@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={carregando}
                    />

                    <Input
                        id="Senha"
                        label="Senha"
                        type={revelarSenha ? "text" : "password"}
                        placeholder="Sua senha secreta"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        disabled={carregando}
                    >
                        <button
                            type="button"
                            onClick={() => setRevelarSenha(!revelarSenha)}
                            className="absolute right-3 top-0 bottom-0 flex items-center text-xs font-medium text-slate-500 hover:text-indigo-900 transition-colors duration-150 ease-in-out cursor-pointer"
                        >
                            {revelarSenha ? "Ocultar" : "Mostrar"}
                        </button>
                    </Input>

                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full bg-indigo-900 hover:bg-indigo-950 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-all duration-250 ease-linear text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                    >
                        {carregando ? 'Entrando...' : 'Entrar na plataforma'}
                    </button>
                </form>

                <p className="text-sm text-slate-600 text-center">
                    Não tem uma conta?{" "}
                    <Link to="/cadastro" className="font-semibold text-indigo-900 hover:text-indigo-950 transition-colors duration-200 underline decoration-indigo-900">
                        Cadastre-se aqui
                    </Link>
                </p>
            </div>
        </div>
    )
}