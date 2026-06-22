
import React from "react"

export const LandingPageCard = ({ titulo, descricao, className }) => {
    return (
        <div className={`bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${className || ''}`}>
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">{titulo}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{descricao}</p>
        </div>
    )
}