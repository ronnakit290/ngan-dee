import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Modal({ open, onClose, title, subtitle, children }) {
  const dialogRef = useRef(null)
  const titleId = useId()
  const subtitleId = useId()
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return undefined
    const previous = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const node = dialogRef.current
    const focusTimer = window.setTimeout(() => {
      const first = node?.querySelector('[data-autofocus]') || node?.querySelector(FOCUSABLE)
      if (first) first.focus()
      else node?.focus()
    }, 30)

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !node) return
      const items = Array.from(node.querySelectorAll(FOCUSABLE)).filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = overflow
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={subtitle ? subtitleId : undefined}
        ref={dialogRef}
        tabIndex={-1}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="ปิดหน้าต่าง">
          <X size={20} aria-hidden="true" />
        </button>
        <header className="modal__head">
          <p className="eyebrow eyebrow--red">ติดต่อสอบถาม</p>
          <h2 id={titleId}>{title}</h2>
          {subtitle && <p id={subtitleId} className="modal__subtitle">{subtitle}</p>}
        </header>
        {children}
      </div>
    </div>,
    document.body,
  )
}
