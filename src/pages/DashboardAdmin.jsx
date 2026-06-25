import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import {
    getUsersAdmin,
    deleteUserAdmin,
    getLessonPlansAdmin,
    deleteLessonPlanAdmin,
    getExercisesAdmin,
    deleteExerciseAdmin
} from "../services/adminService";
import HeaderAdmin from "../components/dashboardAdminComponents/HeaderAdmin";
import StatsAdmin from "../components/dashboardAdminComponents/StatsAdmin";
import TabelaUsuarios from "../components/dashboardAdminComponents/TabelaUsuarios";
import TabelaAulas from "../components/dashboardAdminComponents/TabelaAulas";
import TabelaExercicios from "../components/dashboardAdminComponents/TabelaExercicios";

export const DashboardAdmin = () => {
    const { user, logout } = useAuth();
    const { showToast, showConfirm } = useNotification();

    const [usuarios, setUsuarios] = useState([]);
    const [aulas, setAulas] = useState([]);
    const [exercicios, setExercicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    const [abaAtiva, setAbaAtiva] = useState("usuarios");

    const carregarDadosAdmin = async () => {
        setLoading(true);
        setErro("");

        try {
            const dataUsers = await getUsersAdmin();
            const dataAulas = await getLessonPlansAdmin(1, 100);
            const dataExercicios = await getExercisesAdmin(1, 100);

            setUsuarios(dataUsers.users || []);
            setAulas(dataAulas.data || []);
            setExercicios(dataExercicios.data || []);
        } catch (err) {
            setErro(err.response?.data?.message || "Falha ao recuperar dados administrativos do servidor.");
        }
        setLoading(false);
    };

    useEffect(() => {
        carregarDadosAdmin();
    }, []);

    const handleDeletarUsuario = (idUser) => {
        if (idUser === user.id_user) {
            showToast("Você não pode excluir sua própria conta de administrador!", "error");
            return;
        }

        showConfirm("Atenção: Excluir este usuário também removerá todos os recursos (aulas e exercícios) associados a ele. Continuar?", async () => {
            try {
                await deleteUserAdmin(idUser);
                showToast("Usuário excluído com sucesso!", "success");
                carregarDadosAdmin();
            } catch (err) {
                showToast(err.response?.data?.message || "Erro ao excluir usuário.", "error");
            }
        });
    };

    const handleDeletarAula = (idLessonPlan) => {
        showConfirm("Deseja deletar este plano de aula permanentemente?", async () => {
            try {
                await deleteLessonPlanAdmin(idLessonPlan);
                showToast("Plano de aula excluído com sucesso!", "success");
                carregarDadosAdmin();
            } catch (err) {
                showToast(err.response?.data?.message || "Erro ao excluir plano de aula.", "error");
            }
        });
    };

    const handleDeletarExercicio = (idExercise) => {
        showConfirm("Deseja deletar este exercício permanentemente?", async () => {
            try {
                await deleteExerciseAdmin(idExercise);
                showToast("Exercício excluído com sucesso!", "success");
                carregarDadosAdmin();
            } catch (err) {
                showToast(err.response?.data?.message || "Erro ao excluir exercício.", "error");
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-12">
            <HeaderAdmin user={user} logout={logout} />

            <main className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
                <h1 className="text-xl font-bold text-slate-800 leading-snug">Área Administrativa</h1>

                {erro && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm font-medium">
                        {erro}
                    </div>
                )}

                <StatsAdmin
                    usuariosCount={usuarios.length}
                    aulasCount={aulas.length}
                    exerciciosCount={exercicios.length}
                />

                <div className="flex border-b border-slate-200 gap-2 mt-4">
                    <button
                        onClick={() => setAbaAtiva("usuarios")}
                        className={`px-4 py-2.5 text-sm border-b-2 transition-all cursor-pointer ${abaAtiva === "usuarios" ? "border-indigo-900 text-indigo-900 font-bold" : "border-transparent text-slate-500 hover:text-slate-750 font-medium"}`}
                    >
                        Gerenciar Usuários
                    </button>
                    <button
                        onClick={() => setAbaAtiva("aulas")}
                        className={`px-4 py-2.5 text-sm border-b-2 transition-all cursor-pointer ${abaAtiva === "aulas" ? "border-indigo-900 text-indigo-900 font-bold" : "border-transparent text-slate-500 hover:text-slate-750 font-medium"}`}
                    >
                        Planos de Aula
                    </button>
                    <button
                        onClick={() => setAbaAtiva("exercicios")}
                        className={`px-4 py-2.5 text-sm border-b-2 transition-all cursor-pointer ${abaAtiva === "exercicios" ? "border-indigo-900 text-indigo-900 font-bold" : "border-transparent text-slate-500 hover:text-slate-750 font-medium"}`}
                    >
                        Exercícios
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12 bg-white border border-slate-200 rounded-lg shadow-sm">
                        <p className="text-slate-500 text-sm font-medium animate-pulse">Buscando informações do painel...</p>
                    </div>
                ) : (
                    <div className="w-full">
                        {abaAtiva === "usuarios" && (
                            <TabelaUsuarios usuarios={usuarios} onDeletarUsuario={handleDeletarUsuario} />
                        )}

                        {abaAtiva === "aulas" && (
                            <TabelaAulas aulas={aulas} onDeletarAula={handleDeletarAula} />
                        )}

                        {abaAtiva === "exercicios" && (
                            <TabelaExercicios exercicios={exercicios} onDeletarExercicio={handleDeletarExercicio} />
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default DashboardAdmin;
