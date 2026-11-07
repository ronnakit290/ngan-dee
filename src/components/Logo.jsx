import { Link } from 'react-router-dom'

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label="งานดี — กลับหน้าหลัก">
      <svg className="logo__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect x="4" y="4" width="15" height="15" rx="4.5" fill="#D32F2F" />
        <rect x="13" y="13" width="15" height="15" rx="4.5" fill="#1B48D6" stroke="currentColor" strokeWidth="2.5" />
      </svg>
      <span className="logo__text">
        <strong>งานดี</strong>
        <small>NGAN DEE</small>
      </span>
    </Link>
  )
}
