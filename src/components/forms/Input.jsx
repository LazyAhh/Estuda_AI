
import React from "react"

export const Input = ({ id, label, type, placeholder, value, onChange, disabled, className, children }) => {
    return (
        <div className={`flex flex-col gap-1.5 w-full ${className || ''}`}>
            <label htmlFor={id} className="text-sm font-medium text-slate-700 select-none">
                {label}
            </label>
            <div className="relative w-full">
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="w-full pl-3 pr-12 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed select-text"
                />
                {children}
            </div>
        </div>
    )
}