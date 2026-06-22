import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom";

export const HeroSection = () => {
    const { isAuthenticated, user } = useAuth();

    const getDashboardRoute = () => {
        if (!user) return "/";
        return user.role_user === "teacher" ? "/professor/dashboard" : "/estudante/dashboard";
    };

    return (
        <section className="w-full py-20 bg-slate-50 border-b border-slate-200">
            <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Otimize sua jornada acadêmica com <span className="text-indigo-900">Inteligência</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
                    Uma plataforma simples, clara e eficiente para criação de planos de aula, realização de exercícios e acompanhamento de desempenho acadêmico.
                </p>

                <div className="flex items-center gap-4 mt-4">
                    {isAuthenticated ? (
                        <Link to={getDashboardRoute()} className="bg-indigo-900 hover:bg-indigo-950 text-white font-medium px-6 py-3 rounded-md shadow transition-colors text-base">
                            Acessar Painel Acadêmico
                        </Link>
                    ) : (
                        <>
                            <Link to={"/cadastro"} className="bg-indigo-900 hover:bg-indigo-950 text-white font-medium px-6 py-3 rounded-md shadow transition-colors text-base">
                                Criar conta gratuita
                            </Link>
                            <Link to={"/login"} className="bg-white hover:bg-slate-100 text-slate-700 font-medium px-6 py-3 rounded-md border border-slate-300 shadow-sm transition-colors text-base">
                                Fazer login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}