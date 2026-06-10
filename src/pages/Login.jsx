import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Erro } from "../components/estados/Erro";
import { Input } from "../components/forms/input";

const rotasPorCargo = {
    teacher: '/professor/dashboard',
    student: '/estudante/dashboard',
};

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [error, setError] = useState("");
    const [carregando, setCarregando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !senha) {
            setError('Por favor, preencha todos os campos');
            return;
        }

        setCarregando(true);

        const result = await login(email, senha);

        if (result.success) {
            const rotaDestino = rotasPorCargo[result.role] || '/';
            navigate(rotaDestino);
        } else {
            setError(result.error);
        }

        setCarregando(false);
    };

    return (
        <div>
            <h1>Entrar no EstudaAI</h1>

            {error && <p className="text-red-600">{error}</p>}

            <form onSubmit={handleSubmit}>
                <Input id="Email" label="Email" type="email" placeholder="exemplo@email.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} disabled={carregando} />

                <Input id="Senha" label="Senha" type={mostrarSenha ? "text" : "password"} placeholder="Digite sua senha"
                    value={senha} onChange={(e) => setSenha(e.target.value)} disabled={carregando} />

                <div>
                    <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)}>
                        {mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                    </button>
                </div>

                <button type="submit" disabled={carregando}>
                    {carregando ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            <p>
                Não tem uma conta?
                <Link to="/cadastro" className="text-blue-500 hover:text-blue-400">
                    Cadastre-se aqui
                </Link>
            </p>
        </div>
    )
}