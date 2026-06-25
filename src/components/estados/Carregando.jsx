
export const Carregando = () => {
    return (
        <div className="flex flex-col gap-3 h-screen items-center justify-center bg-gray-50">
            <p className="animate-pulse text-sm italic text-blue-400">Carregando...</p>
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
    );
}