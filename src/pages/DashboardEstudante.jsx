import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getLessonPlansAdmin, getExercisesAdmin } from "../services/adminService";
import HeaderEstudante from "../components/dashboardEstudanteComponents/HeaderEstudante";
import DetalheAula from "../components/shared/DetalheAula";
import DetalheExercicio from "../components/shared/DetalheExercicio";
import GridAulasEstudante from "../components/dashboardEstudanteComponents/GridAulasEstudante";
import GridExerciciosEstudante from "../components/dashboardEstudanteComponents/GridExerciciosEstudante";

export const DashboardEstudante = () => {
    const { user, logout } = useAuth();

    const [aulas, setAulas] = useState([]);
    const [exercicios, setExercicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    const [abaAtiva, setAbaAtiva] = useState("aulas");
    const [busca, setBusca] = useState("");

    const [aulaSelecionada, setAulaSelecionada] = useState(null);
    const [exercicioSelecionado, setExercicioSelecionado] = useState(null);

    const carregarDadosEstudante = async () => {
        setLoading(true);
        setErro("");

        try {
            const dadosAulas = await getLessonPlansAdmin(1, 100);
            const dadosExercicios = await getExercisesAdmin(1, 100);

            setAulas(dadosAulas.data || []);
            setExercicios(dadosExercicios.data || []);
        } catch (erroResponse) {
            setErro(erroResponse.response?.data?.message || "Erro ao carregar os materiais de estudo do servidor.");
        }
        setLoading(false);
    };

    useEffect(() => {
        carregarDadosEstudante();
    }, []);

    const handleVoltar = () => {
        setAulaSelecionada(null);
        setExercicioSelecionado(null);
    };

    const aulasFiltradas = aulas.filter(aula =>
        aula.subjectLessonPlan.toLowerCase().includes(busca.toLowerCase()) ||
        aula.descriptionLessonPlan.toLowerCase().includes(busca.toLowerCase())
    );

    const exerciciosFiltrados = exercicios.filter(exercicio =>
        exercicio.subjectExercises.toLowerCase().includes(busca.toLowerCase()) ||
        exercicio.descriptionExercises.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-12">
            <HeaderEstudante user={user} logout={logout} />

            <main className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
                {erro && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm font-medium">
                        {erro}
                    </div>
                )}

                {aulaSelecionada ? (
                    <DetalheAula aula={aulaSelecionada} onVoltar={handleVoltar} />
                ) : exercicioSelecionado ? (
                    <DetalheExercicio exercicio={exercicioSelecionado} onVoltar={handleVoltar} />
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setAbaAtiva("aulas")}
                                    className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all cursor-pointer ${abaAtiva === "aulas" ? "border-indigo-900 text-indigo-900" : "border-transparent text-slate-500 hover:text-slate-750"}`}
                                >
                                    Planos de Aula
                                </button>
                                <button
                                    onClick={() => setAbaAtiva("exercicios")}
                                    className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all cursor-pointer ${abaAtiva === "exercicios" ? "border-indigo-900 text-indigo-900" : "border-transparent text-slate-500 hover:text-slate-750"}`}
                                >
                                    Exercícios
                                </button>
                            </div>

                            <input
                                type="text"
                                placeholder="Buscar materiais..."
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                className="w-full md:max-w-xs px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                            />
                        </div>

                        {loading ? (
                            <div className="text-center py-12 bg-white border border-slate-200 rounded-lg shadow-sm">
                                <p className="text-slate-500 text-sm font-medium animate-pulse">Buscando materiais...</p>
                            </div>
                        ) : abaAtiva === "aulas" ? (
                            <GridAulasEstudante aulas={aulasFiltradas} onSelecionarAula={setAulaSelecionada} />
                        ) : (
                            <GridExerciciosEstudante exercicios={exerciciosFiltrados} onSelecionarExercicio={setExercicioSelecionado} />
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default DashboardEstudante;