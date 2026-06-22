import React, { createContext, useContext, useState, useEffect } from "react"

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])
    const [confirm, setConfirm] = useState(null)

    const showToast = (message, type = "success") => {
        const id = Date.now() + Math.random()
        setToasts((prev) => [...prev, { id, message, type }])
    }

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }

    const showConfirm = (message, onConfirm, onCancel = null) => {
        setConfirm({
            message,
            onConfirm,
            onCancel
        })
    }

    const handleConfirm = () => {
        if (confirm) {
            confirm.onConfirm()
            setConfirm(null)
        }
    }

    const handleCancel = () => {
        if (confirm) {
            if (confirm.onCancel) {
                confirm.onCancel()
            }
            setConfirm(null)
        }
    }

    return (
        <NotificationContext.Provider value={{ showToast, showConfirm }}>
            {children}

            <div className="fixed bottom-4 left-4 z-[9999] flex flex-col-reverse gap-2 max-w-sm w-full pointer-events-none">
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>

            {confirm && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4">
                    <div className="bg-white border border-slate-200 rounded-lg p-6 max-w-sm w-full shadow-xl flex flex-col gap-5 bg-opacity-100 transform scale-100 transition-all duration-200">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Confirmação</h3>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                {confirm.message}
                            </p>
                        </div>
                        <div className="flex gap-3 justify-end border-t border-slate-100 pt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-3.5 py-1.5 rounded border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer bg-white"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                className="px-3.5 py-1.5 rounded bg-indigo-900 hover:bg-indigo-950 text-xs font-semibold text-white transition-colors cursor-pointer shadow-sm"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </NotificationContext.Provider>
    )
}

const ToastItem = ({ toast, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 4000)
        return () => clearTimeout(timer)
    }, [onClose])

    const stylesByType = {
        success: "border-l-green-600 bg-green-50 border-green-200 text-green-800",
        error: "border-l-red-600 bg-red-50 border-red-200 text-red-800",
        warning: "border-l-amber-600 bg-amber-50 border-amber-200 text-amber-800",
        info: "border-l-blue-600 bg-blue-50 border-blue-200 text-blue-800",
    }

    const typeClass = stylesByType[toast.type] || stylesByType.success

    return (
        <div className={`pointer-events-auto w-full bg-white border border-l-4 rounded-lg p-3.5 shadow-md flex items-start justify-between gap-3 transition-all duration-300 bg-opacity-100 ${typeClass}`}>
            <span className="text-xs font-semibold leading-relaxed">{toast.message}</span>
            <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs cursor-pointer bg-transparent border-none p-0 flex-shrink-0"
            >
                ✕
            </button>
        </div>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error("useNotification deve ser usado dentro de um NotificationProvider")
    }
    return context
}
