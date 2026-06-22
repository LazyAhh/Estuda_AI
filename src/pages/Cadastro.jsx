import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/forms/Input";
import { cadastrarUsuario } from "../services/cadastroService";

export const Cadastro = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [repitaSenha, setRepitaSenha] = useState("")
    const [perfilCargo, setPerfilCargo] = useState("student")
    const [revelarSenha, setRevelarSenha] = useState(false)

    const [error, setError] = useState("")
    const [sucesso, setSucesso] = useState("")
    const [carregando, setCarregando] = useState(false)

    const lidarComEnvio = async (e) => {
        e.preventDefault()
        setError("")
        setSucesso("")

        if (!nome || !email || !cpf || !senha || !repitaSenha) {
            setError("Por favor, preencha todos os campos")
            return
        }

        if (senha.length < 6) {
            setError("A senha deve conter pelo menos 6 caracteres")
            return
        }

        if (senha !== repitaSenha) {
            setError("As senhas não coincidem")
            return
        }

        setCarregando(true)

        try {
            await cadastrarUsuario(nome, email, cpf, senha, perfilCargo)
            setSucesso("Cadastro realizado com sucesso! Redirecionando para o login...")

            setNome("")
            setEmail("")
            setCpf("")
            setPerfilCargo("student")
            setSenha("")
            setRepitaSenha("")

            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (err) {
            setError(err.response?.data?.message || "Falha ao realizar o cadastro. Tente novamente");
        }

        setCarregando(false)
    };

    return (
        <div className="flex min-h-screen justify-center items-center p-4 bg-slate-50 font-sans">
            <div className="w-full max-w-lg bg-white p-8 flex flex-col gap-6 rounded-lg shadow-sm border border-solid border-slate-200 bg-opacity-100">
                <div className="flex flex-col gap-2 text-center">
                    <Link to="/" className="text-2xl font-bold text-indigo-900 tracking-tight hover:opacity-90 transition-opacity duration-200">
                        🎓 EstudaAI
                    </Link>
                    <h1 className="mt-2 text-xl font-semibold text-slate-900 leading-snug">Crie sua conta acadêmica</h1>
                    <p className="text-sm text-slate-500 font-normal">Comece a gerenciar e compartilhar conhecimentos</p>
                </div>

                {error && (
                    <div className="text-sm bg-red-50 border border-solid border-red-200 text-red-700 px-4 py-3 rounded-md font-medium">
                        {error}
                    </div>
                )}
                {sucesso && (
                    <div className="text-sm bg-green-50 border border-solid border-green-200 text-green-700 px-4 py-3 rounded-md font-medium">
                        {sucesso}
                    </div>
                )}

                <form onSubmit={lidarComEnvio} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            id="Nome"
                            label="Nome Completo"
                            type="text"
                            placeholder="Seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            disabled={carregando}
                        />

                        <Input
                            id="Email"
                            label="Endereço de E-mail"
                            type="email"
                            placeholder="exemplo@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={carregando}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            id="Cpf"
                            label="CPF"
                            type="text"
                            placeholder="000.000.000-00"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            disabled={carregando}
                        />

                        <div className="flex flex-col gap-1.5 w-full">
                            <label htmlFor="Cargo" className="text-sm font-medium text-slate-700 select-none">
                                Tipo de Perfil
                            </label>
                            <select
                                id="Cargo"
                                value={perfilCargo}
                                onChange={(e) => setPerfilCargo(e.target.value)}
                                disabled={carregando}
                                className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed"
                            >
                                <option value="student">Estudante</option>
                                <option value="teacher">Professor</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            id="Senha"
                            label="Senha"
                            type={revelarSenha ? "text" : "password"}
                            placeholder="Mínimo 6 caracteres"
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

                        <Input
                            id="ConfirmarSenha"
                            label="Confirmar Senha"
                            type={revelarSenha ? "text" : "password"}
                            placeholder="Repita a senha"
                            value={repitaSenha}
                            onChange={(e) => setRepitaSenha(e.target.value)}
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
                    </div>

                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full bg-indigo-900 hover:bg-indigo-950 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-all duration-250 ease-linear text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                    >
                        {carregando ? "Realizando cadastro..." : "Cadastrar conta"}
                    </button>
                </form>

                <p className="text-sm text-slate-600 text-center">
                    Já tem uma conta?{" "}
                    <Link to="/login" className="font-semibold text-indigo-900 hover:text-indigo-950 transition-colors duration-200 underline decoration-indigo-900">
                        Entre aqui
                    </Link>
                </p>
            </div>
        </div>
    )
}