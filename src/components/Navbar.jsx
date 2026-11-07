import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Heart, Menu, X } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import Logo from './Logo'

const navLinks = [
  { to: '/events', label: 'งานอีเวนต์' },
  { to: '/spaces', label: 'พื้นที่และบูธ' },
  { to: '/about', label: 'เกี่ยวกับเรา' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { favorites } = useFavorites()
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar__inner">
          <p>
            <span className="topbar__dot" aria-hidden="true" />
            เปิดรับประกาศงานฤดูกาล 2569–2570 · ลงประกาศฟรี
          </p>
          <Link to="/post" className="topbar__link">
            ลงประกาศเลย <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="navbar">
        <div className="container navbar__inner">
          <Logo />

          <nav className="navbar__nav" aria-label="เมนูหลัก">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar__actions">
            <Link
              to="/events?saved=1"
              className="icon-btn icon-btn--nav"
              aria-label={`งานที่บันทึกไว้ ${favorites.length} รายการ`}
            >
              <Heart size={20} aria-hidden="true" fill={favorites.length ? 'currentColor' : 'none'} />
              {favorites.length > 0 && <span className="count-badge">{favorites.length}</span>}
            </Link>
            <Link to="/post" className="btn btn--primary btn--sm navbar__cta">
              ลงประกาศงาน <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="icon-btn icon-btn--nav navbar__toggle"
              aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="mobile-menu" id="mobile-menu">
          <nav className="mobile-menu__nav" aria-label="เมนูมือถือ">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className="mobile-menu__link">
                {link.label}
                <ArrowUpRight size={18} aria-hidden="true" />
              </NavLink>
            ))}
            <Link to="/events?saved=1" className="mobile-menu__link">
              งานที่บันทึกไว้ ({favorites.length})
              <Heart size={18} aria-hidden="true" />
            </Link>
          </nav>
          <Link to="/post" className="btn btn--primary btn--block">
            ลงประกาศงาน
          </Link>
          <p className="mobile-menu__note">งานดี · ศูนย์รวมงานและพื้นที่จัดงานทั่วไทย</p>
        </div>
      )}
    </header>
  )
}
