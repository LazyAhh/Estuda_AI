import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { createExercicio, getExercicios, getExercicioPorId, updateExercicio, deleteExercicio } from "../services/exerciseService";
import { createAula, getAulas, getAulaPorId, updateAula, deleteAula } from "../services/lessonsService";
import { getLessonPlansAdmin, getExercisesAdmin } from "../services/adminService";
import { FormExercicio } from "../components/forms/FormExercicio";
import { FormAula } from "../components/forms/FormAula";
import { HeaderProfessor } from "../components/dashboardProfessorComponents/HeaderProfessor";
import { ListaAulasProfessor } from "../components/dashboardProfessorComponents/ListaAulasProfessor";
import { ListaExerciciosProfessor } from "../components/dashboardProfessorComponents/ListaExerciciosProfessor";
import DetalheAula from "../components/shared/DetalheAula";
import DetalheExercicio from "../components/shared/DetalheExercicio";
import ExplorarRecursos from "../components/dashboardProfessorComponents/ExplorarRecursos";

export const DashboardProfessor = () => {
    const { user, logout } = useAuth();
    const { showToast, showConfirm } = useNotification();

    const [exercicios, setExercicios] = useState([]);
    const [aulas, setAulas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorGeral, setErrorGeral] = useState("");

    const [exibindoFormExercicio, setExibindoFormExercicio] = useState(false);
    const [exercicioParaEditar, setExercicioParaEditar] = useState(null);
    const [exibindoFormAula, setExibindoFormAula] = useState(false);
    const [aulaParaEditar, setAulaParaEditar] = useState(null);
    const [salvando, setSalvando] = useState(false);

    const [abaAtiva, setAbaAtiva] = useState("meus");
    const [todasAulas, setTodasAulas] = useState([]);
    const [todosExercicios, setTodosExercicios] = useState([]);

    const [aulaSelecionada, setAulaSelecionada] = useState(null);
    const [exercicioSelecionado, setExercicioSelecionado] = useState(null);

    const carregarDadosReais = async () => {
        setLoading(true);
        setErrorGeral("");
        try {
            const dataExercicios = await getExercicios(1, 50);
            const dataAulas = await getAulas(1, 50);
            const dataTodasAulas = await getLessonPlansAdmin(1, 100);
            const dataTodosExercicios = await getExercisesAdmin(1, 100);

            setExercicios(dataExercicios.data || []);
            setAulas(dataAulas.data || []);
            setTodasAulas(dataTodasAulas.data || []);
            setTodosExercicios(dataTodosExercicios.data || []);
        } catch (err) {
            setErrorGeral(err.response?.data?.message || "Erro ao carregar dados do painel principal.");
        }
        setLoading(false);
    };

    useEffect(() => {
        carregarDadosReais();
    }, []);

    const deletarExercicioPorId = (idExercicio) => {
        showConfirm("Deseja deletar este exercício?", async () => {
            try {
                await deleteExercicio(idExercicio);
                showToast("Exercício deletado!", "success");
                carregarDadosReais();
            } catch (err) {
                showToast(err.response?.data?.message || "Erro ao deletar exercício.", "error");
            }
        });
    };

    const deletarAulaPorId = (idAula) => {
        showConfirm("Deseja deletar este plano de aula?", async () => {
            try {
                await deleteAula(idAula);
                showToast("Plano de aula deletado com sucesso!", "success");
                carregarDadosReais();
            } catch (err) {
                showToast(err.response?.data?.message || "Erro ao deletar plano de aula.", "error");
            }
        });
    };

    const handleEditarExercicioClick = async (id) => {
        setLoading(true);
        try {
            const data = await getExercicioPorId(id);
            setExercicioParaEditar(data);
        } catch (err) {
            showToast("Erro ao carregar dados do exercício: " + (err.response?.data?.message || err.message), "error");
        }
        setLoading(false);
    };

    const handleEditarAulaClick = async (id) => {
        setLoading(true);
        try {
            const data = await getAulaPorId(id);
            setAulaParaEditar(data);
        } catch (err) {
            showToast("Erro ao carregar dados do plano de aula: " + (err.response?.data?.message || err.message), "error");
        }
        setLoading(false);
    };

    const handleSalvarExercicio = async (payload) => {
        setSalvando(true);
        try {
            if (exercicioParaEditar) {
                const id = exercicioParaEditar.id_exercise;
                await updateExercicio(id, payload);
                showToast("Exercício atualizado com sucesso!", "success");
                setExercicioParaEditar(null);
                carregarDadosReais();
            } else {
                await createExercicio(payload);
                showToast("Exercício criado com sucesso!", "success");
                setExibindoFormExercicio(false);
                carregarDadosReais();
            }
        } catch (err) {
            showToast("Erro na operação: " + (err.response?.data?.message || err.message), "error");
        } finally {
            setSalvando(false);
        }
    };

    const handleSalvarAula = async (payload) => {
        setSalvando(true);
        try {
            if (aulaParaEditar) {
                const id = aulaParaEditar.id_lesson_plan;
                await updateAula(id, payload);
                showToast("Plano de aula atualizado com sucesso!", "success");
                setAulaParaEditar(null);
                carregarDadosReais();
            } else {
                await createAula(payload);
                showToast("Plano de aula criado com sucesso!", "success");
                setExibindoFormAula(false);
                carregarDadosReais();
            }
        } catch (err) {
            showToast("Erro na operação: " + (err.response?.data?.message || err.message), "error");
        } finally {
            setSalvando(false);
        }
    };

    const handleVoltar = () => {
        setAulaSelecionada(null);
        setExercicioSelecionado(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-12">
            <HeaderProfessor user={user} logout={logout} />

            <main className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
                {errorGeral && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm font-medium mb-2">
                        {errorGeral}
                    </div>
                )}

                {aulaSelecionada ? (
                    <DetalheAula aula={aulaSelecionada} onVoltar={handleVoltar} />
                ) : exercicioSelecionado ? (
                    <DetalheExercicio exercicio={exercicioSelecionado} onVoltar={handleVoltar} />
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className="flex border-b border-slate-200 gap-2 mb-2">
                            <button
                                onClick={() => {
                                    setAbaAtiva("meus");
                                    setExibindoFormAula(false);
                                    setAulaParaEditar(null);
                                    setExibindoFormExercicio(false);
                                    setExercicioParaEditar(null);
                                }}
                                className={`px-4 py-2.5 text-sm border-b-2 transition-all cursor-pointer ${abaAtiva === "meus" ? "border-indigo-900 text-indigo-900 font-bold" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 font-medium"}`}
                            >
                                Meus Recursos
                            </button>
                            <button
                                onClick={() => {
                                    setAbaAtiva("todos");
                                    setExibindoFormAula(false);
                                    setAulaParaEditar(null);
                                    setExibindoFormExercicio(false);
                                    setExercicioParaEditar(null);
                                }}
                                className={`px-4 py-2.5 text-sm border-b-2 transition-all cursor-pointer ${abaAtiva === "todos" ? "border-indigo-900 text-indigo-900 font-bold" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 font-medium"}`}
                            >
                                Explorar Recursos
                            </button>
                        </div>

                        {exibindoFormAula || aulaParaEditar ? (
                            <section className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm bg-opacity-100">
                                <FormAula
                                    dadosIniciais={aulaParaEditar}
                                    onSubmit={handleSalvarAula}
                                    onCancelar={() => {
                                        setExibindoFormAula(false);
                                        setAulaParaEditar(null);
                                    }}
                                    disabled={salvando}
                                />
                            </section>
                        ) : exibindoFormExercicio || exercicioParaEditar ? (
                            <section className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm bg-opacity-100">
                                <FormExercicio
                                    dadosIniciais={exercicioParaEditar}
                                    onSubmit={handleSalvarExercicio}
                                    onCancelar={() => {
                                        setExibindoFormExercicio(false);
                                        setExercicioParaEditar(null);
                                    }}
                                    disabled={salvando}
                                />
                            </section>
                        ) : abaAtiva === "meus" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                <ListaAulasProfessor
                                    aulas={aulas}
                                    loading={loading}
                                    onNovoPlano={() => setExibindoFormAula(true)}
                                    onEditarPlano={handleEditarAulaClick}
                                    onDeletarPlano={deletarAulaPorId}
                                    onVisualizarPlano={setAulaSelecionada}
                                />

                                <ListaExerciciosProfessor
                                    exercicios={exercicios}
                                    loading={loading}
                                    onNovoExercicio={() => setExibindoFormExercicio(true)}
                                    onEditarExercicio={handleEditarExercicioClick}
                                    onDeletarExercicio={deletarExercicioPorId}
                                    onVisualizarExercicio={setExercicioSelecionado}
                                />
                            </div>
                        ) : (
                            <ExplorarRecursos
                                todasAulas={todasAulas}
                                todosExercicios={todosExercicios}
                                loading={loading}
                                onVisualizarPlano={setAulaSelecionada}
                                onVisualizarExercicio={setExercicioSelecionado}
                            />
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default DashboardProfessor;