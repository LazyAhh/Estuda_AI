import React from "react"

export const LandingPageSection = ({ id, titulo, className, children }) => {
    return (
        <section id={id} className="w-full py-16 border-b border-slate-200/60 last:border-b-0">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8 text-center md:text-left">{titulo}</h2>
                <div className={className}>
                    {children}
                </div>
            </div>
        </section>
    )
}