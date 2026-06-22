import { Footer } from "../components/layout/Footer"
import { Navbar } from "../components/layout/Navbar"
import { HeroSection } from "../components/landingPage/HeroSection"
import { LandingPageSection } from "../components/landingPage/LandingPageSection"
import { LandingPageCard } from "../components/landingPage/LandingPageCard"

export const LandingPage = () => {

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />
            <main className="flex-1">
                <HeroSection />

                <LandingPageSection id="recursos" titulo="Recursos Principais" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <LandingPageCard titulo="Trilhas organizadas" descricao="Roteiros de estudo estruturados e adaptados às suas necessidades acadêmicas." />
                    <LandingPageCard titulo="Quizzes Inteligentes" descricao="Questões dinâmicas personalizadas sob demanda para testar seus conhecimentos." />
                    <LandingPageCard titulo="Painel de Controle" descricao="Relatórios de desempenho claros e detalhados para alunos e professores." />
                </LandingPageSection>

                <LandingPageSection id="como-funciona" titulo="Como Funciona" className="bg-white border border-slate-200 rounded-xl p-8 max-w-3xl mx-auto shadow-sm">
                    <ol className="relative border-l border-slate-200 space-y-6 ml-4">
                        <li className="mb-10 ml-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-50 rounded-full -left-4 ring-4 ring-white">
                                <span className="font-semibold text-indigo-900 text-sm">1</span>
                            </span>
                            <h3 className="font-semibold text-slate-900 mb-1">Crie sua conta</h3>
                            <p className="text-sm text-slate-600">Registre-se como professor ou estudante para obter acesso personalizado.</p>
                        </li>
                        <li className="mb-10 ml-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-50 rounded-full -left-4 ring-4 ring-white">
                                <span className="font-semibold text-indigo-900 text-sm">2</span>
                            </span>
                            <h3 className="font-semibold text-slate-900 mb-1">Acesse seu painel exclusivo</h3>
                            <p className="text-sm text-slate-600">Navegue em uma interface limpa criada especificamente para suas tarefas diárias.</p>
                        </li>
                        <li className="mb-10 ml-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-50 rounded-full -left-4 ring-4 ring-white">
                                <span className="font-semibold text-indigo-900 text-sm">3</span>
                            </span>
                            <h3 className="font-semibold text-slate-900 mb-1">Aproveite as ferramentas</h3>
                            <p className="text-sm text-slate-600">Crie e edite planos de aula, resolva exercícios e acesse trilhas completas.</p>
                        </li>
                        <li className="ml-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-50 rounded-full -left-4 ring-4 ring-white">
                                <span className="font-semibold text-indigo-900 text-sm">4</span>
                            </span>
                            <h3 className="font-semibold text-slate-900 mb-1">Acompanhe seu rendimento</h3>
                            <p className="text-sm text-slate-600">Veja seu progresso detalhado ao longo do semestre com estatísticas integradas.</p>
                        </li>
                    </ol>
                </LandingPageSection>

                <LandingPageSection id="sobre" titulo="Sobre o EstudaAI" className="max-w-2xl mx-auto text-center">
                    <p className="text-slate-600 leading-relaxed text-base">
                        Somos uma plataforma dedicada a facilitar a jornada de aprendizado de estudantes e potencializar a produtividade de docentes através de ferramentas inteligentes de ensino.
                    </p>
                </LandingPageSection>
            </main>
            <Footer />
        </div>
    )
}