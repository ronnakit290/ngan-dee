import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  const dismiss = useCallback(() => {
    window.clearTimeout(timer.current)
    setToast(null)
  }, [])

  const showToast = useCallback((message, type = 'success') => {
    window.clearTimeout(timer.current)
    setToast({ message, type, id: Date.now() })
    timer.current = window.setTimeout(() => setToast(null), 3600)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`toast toast--${toast.type}`} role="status" aria-live="polite">
          {(() => {
            const Icon = icons[toast.type] || CheckCircle2
            return <Icon size={19} aria-hidden="true" />
          })()}
          <p>{toast.message}</p>
          <button type="button" className="toast__close" onClick={dismiss} aria-label="ปิดข้อความ">
            <X size={15} aria-hidden="true" />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside ToastProvider')
  return context
}
