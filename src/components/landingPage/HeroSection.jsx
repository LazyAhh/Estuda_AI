import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom";

export const HeroSection = () => {
    const { isAuthenticated, user } = useAuth();

    const getDashboardRoute = () => {
        if (!user) return "/";
        return user.role_user === "teacher" ? "/professor/dashboard" : "/estudante/dashboard";
    };

    return (
        <section>
            <h1>Revolucione seus estudos</h1>
            <p>
                Plataforma inteligente para otimizar o aprendizado e a gestão acadêmica.
            </p>

            <div>
                {isAuthenticated ? (
                    <Link to={getDashboardRoute}>Ir para meu painel acadêmico</Link>
                ) : (
                    <>
                        <Link to={"/cadastro"}>Começar agora</Link>
                        <Link to={"/login"}>Fazer login</Link>
                    </>
                )}
            </div>
        </section>
    )
}