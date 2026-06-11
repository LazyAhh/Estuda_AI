import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { Input } from "../components/forms/input"
import { cadastrarUsuario } from "../services/cadastroService";


export const Cadastro = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [cargo, setCargo] = useState("student");
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [error, setError] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSucesso("");

        if (!nome || !email || !cpf || !senha || !confirmarSenha) {
            setError("Por favor, preencha todos os campos");
            return;
        }

        if (senha.length < 6) {
            setError("A senha deve conter pelo menos 6 caracteres");
            return;
        }

        if (senha !== confirmarSenha) {
            setError("As senhas não coincidem");
            return;
        }

        setCarregando(true);

        const result = await cadastrarUsuario(nome, email, cpf, senha, cargo);

        if (result.success) {
            setSucesso("Cadastro realizado com sucesso! Redirecionando para o login...");

            setNome("");
            setEmail("");
            setCpf("");
            setCargo("studant");
            setSenha("");
            setConfirmarSenha("");

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setError(result.error);
        }

        setCarregando(false)
    };

    return (
        <div>
            <h1>Criar conta no EstudaAI</h1>

            {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
            {sucesso && <p className="text-green-600 font-semibold mb-4">{sucesso}</p>}

            <form onSubmit={handleSubmit}>
                <Input id="Nome" label="Nome Completo" type="text" placeholder="Seu nome completo" value={nome}
                    onChange={(e) => setNome(e.target.value)} disabled={carregando} />

                <Input id="Email" label="Email" type="email" placeholder="Exemplo@email.com" value={email}
                    onChange={(e) => setEmail(e.target.value)} disabled={carregando} />

                <Input id="Cpf" label="Cpf" type="text" placeholder="Apenas números ou formato 000.000.000-00" value={cpf}
                    onChange={(e) => setCpf(e.target.value)} disabled={carregando} />

                <div>
                    <select id="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} disabled={carregando}>
                        <option value="student">Estudante</option>
                        <option value="teacher">Professor</option>
                    </select>
                </div>

                <Input id="Senha" label="Senha" type={mostrarSenha ? "text" : "password"} placeholder="Mínimo 6 caracteres" value={senha}
                    onChange={(e) => setSenha(e.target.value)} disabled={carregando} />

                <Input id="ConfirmarSenha" label="ConfirmarSenha" type={mostrarSenha ? "text" : "password"} placeholder="Repita sua senha" value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)} disabled={carregando} />

                <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)}>
                    {mostrarSenha ? "Ocultar senhas" : "Mostrar senhas"}
                </button>

                <button type="submit" disabled={carregando}>
                    {carregando ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>

            <p>
                Não tem uma conta?
                <Link to="/login" className="text-blue-500 hover:text-blue-400">
                    Entre aqui
                </Link>
            </p>
        </div>
    )
}