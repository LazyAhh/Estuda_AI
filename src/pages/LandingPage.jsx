import { Footer } from "../components/layout/Footer"
import { Navbar } from "../components/layout/Navbar"
import { HeroSection } from "../components/landingPage/HeroSection"
import { LandingPageSection } from "../components/landingPage/LandingPageSection"
import { LandingPageCard } from "../components/landingPage/LandingPageCard"

export const LandingPage = () => {

    return (
        <div className="flex flex-col bg-slate-600 items-center gap-4">
            <Navbar />
            <div>
                <HeroSection />

                <LandingPageSection id="recursos" titulo="Recursos principais">
                    <LandingPageCard titulo="Trilhas organizadas" descricao="Roteiros adaptados às suas necessidades" />
                    <LandingPageCard titulo="Quizzes" descricao="Questões personalizadas sob demanda" />
                    <LandingPageCard titulo="Painel de Controle" descricao="Relatórios para alunos e docentes" />
                </LandingPageSection>



                <LandingPageSection id="como-funciona" titulo="Como funciona" className={"bg-slate-500 p-4 b-4"}>
                    <ol>
                        <li>Crie sua conta</li>
                        <li>Acesse seu painel exlusivo</li>
                        <li>Aproveite as ferramentas oferecidas</li>
                        <li>Acompanhe seu rendimento</li>
                    </ol>
                </LandingPageSection>

                <LandingPageSection id="sobre" titulo="Sobre o EstudaAI">
                    <p>
                        Somos uma plataforma voltada a facilitar a jornada de aprendizado do estudante e potencializar a produtividade de docentes.
                    </p>
                </LandingPageSection>
            </div>
            <Footer />
        </div>
    )
}