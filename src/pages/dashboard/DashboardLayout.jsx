import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowUpRight,
  Bell,
  Building2,
  CalendarDays,
  ChevronRight,
  Heart,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Sparkles,
  X,
} from 'lucide-react'
import Logo from '../../components/Logo'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useWorkspace } from '../../context/WorkspaceContext'
import { initialsOf, roleLabel } from '../../lib/format'
import { notifications } from '../../data/dashboard'

const navItems = [
  { to: '/dashboard', label: 'ภาพรวม', icon: LayoutDashboard, end: true },
  { to: '/dashboard/events', label: 'งานของฉัน', icon: CalendarDays, key: 'events' },
  { to: '/dashboard/spaces', label: 'พื้นที่ของฉัน', icon: Building2, key: 'spaces' },
  { to: '/dashboard/inquiries', label: 'ข้อความสอบถาม', icon: MessageSquare, key: 'inquiries' },
  { to: '/dashboard/favorites', label: 'งานที่บันทึก', icon: Heart },
  { to: '/dashboard/settings', label: 'ตั้งค่า', icon: Settings },
]

const pageTitles = {
  '/dashboard': 'ภาพรวม',
  '/dashboard/events': 'งานของฉัน',
  '/dashboard/spaces': 'พื้นที่ของฉัน',
  '/dashboard/inquiries': 'ข้อความสอบถาม',
  '/dashboard/favorites': 'งานที่บันทึก',
  '/dashboard/settings': 'ตั้งค่า',
}

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const { events, spaces, inquiries } = useWorkspace()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifRead, setNotifRead] = useState(false)
  const notifRef = useRef(null)

  const newInquiries = inquiries.filter((item) => item.status === 'new').length

  useEffect(() => {
    setMenuOpen(false)
    setNotifOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setNotifOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!notifOpen) return undefined
    function handlePointerDown(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [notifOpen])

  function countsFor(key) {
    if (key === 'events') return events.length
    if (key === 'spaces') return spaces.length
    if (key === 'inquiries') return newInquiries || null
    return null
  }

  function handleLogout() {
    navigate('/')
    logout()
    showToast('ออกจากระบบแล้ว แล้วพบกันใหม่ค่ะ', 'info')
  }

  function handleSearch(event) {
    event.preventDefault()
    const value = new FormData(event.currentTarget).get('q')
    if (value?.trim()) navigate(`/events?q=${encodeURIComponent(String(value).trim())}`)
  }

  const currentTitle = pageTitles[location.pathname] || 'แดชบอร์ด'
  const initials = initialsOf(user?.name)

  return (
    <div className="dash">
      <aside className={`dash__sidebar ${menuOpen ? 'is-open' : ''}`} aria-label="เมนูแดชบอร์ด">
        <div className="dash__brand">
          <Logo light />
          <button
            type="button"
            className="dash__close"
            onClick={() => setMenuOpen(false)}
            aria-label="ปิดเมนู"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="dash__workspace">
          <span className="dash__workspace-avatar" aria-hidden="true">{initials}</span>
          <div>
            <small>พื้นที่ทำงาน</small>
            <strong>{user?.organization || 'Workspace ของฉัน'}</strong>
          </div>
          <span className="dash__plan">ฟรี</span>
        </div>

        <nav className="dash__nav">
          {navItems.map((item) => {
            const Icon = item.icon
            const count = countsFor(item.key)
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `dash__nav-link ${isActive ? 'is-active' : ''}`}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
                {count ? <span className="dash__nav-count">{count}</span> : null}
              </NavLink>
            )
          })}
        </nav>

        <div className="dash__nav-foot">
          <Link to="/" className="dash__side-link">
            <ArrowUpRight size={17} aria-hidden="true" /> กลับหน้าสาธารณะ
          </Link>
          <Link to="/help" className="dash__side-link">
            <HelpCircle size={17} aria-hidden="true" /> ศูนย์ช่วยเหลือ
          </Link>
        </div>

        <div className="dash__user">
          <span className="dash__user-avatar" aria-hidden="true">{initials}</span>
          <div className="dash__user-info">
            <strong>{user?.name}</strong>
            <span>{roleLabel(user?.role)}</span>
          </div>
          <button type="button" className="dash__logout" onClick={handleLogout} aria-label="ออกจากระบบ">
            <LogOut size={17} aria-hidden="true" />
          </button>
        </div>
      </aside>

      {menuOpen && (
        <button
          type="button"
          className="dash__overlay"
          onClick={() => setMenuOpen(false)}
          aria-label="ปิดเมนู"
        />
      )}

      <div className="dash__main">
        <header className="dash__topbar">
          <div className="dash__topbar-left">
            <button
              type="button"
              className="dash__menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="เปิดเมนู"
            >
              <Menu size={21} aria-hidden="true" />
            </button>
            <div className="dash__crumb">
              <Link to="/dashboard">แดชบอร์ด</Link>
              <ChevronRight size={13} aria-hidden="true" />
              <span>{currentTitle}</span>
            </div>
          </div>

          <div className="dash__topbar-right">
            <form className="dash__search" onSubmit={handleSearch} role="search">
              <Search size={16} aria-hidden="true" />
              <label className="sr-only" htmlFor="dash-search-input">ค้นหางานหรือพื้นที่</label>
              <input id="dash-search-input" name="q" type="search" placeholder="ค้นหางานหรือพื้นที่..." />
            </form>

            <div className="dash__notif-wrap" ref={notifRef}>
              <button
                type="button"
                className="dash__icon-btn"
                onClick={() => setNotifOpen((value) => !value)}
                aria-label={`การแจ้งเตือน${notifRead ? '' : ` ${notifications.length} รายการใหม่`}`}
                aria-expanded={notifOpen}
              >
                <Bell size={19} aria-hidden="true" />
                {!notifRead && <span className="dash__dot" aria-hidden="true" />}
              </button>

              {notifOpen && (
                <>
                  <div className="notif-panel" role="dialog" aria-label="การแจ้งเตือน">
                    <div className="notif-panel__head">
                      <strong>การแจ้งเตือน</strong>
                      <button
                        type="button"
                        onClick={() => setNotifRead(true)}
                        disabled={notifRead}
                      >
                        อ่านทั้งหมด
                      </button>
                    </div>
                    <ul>
                      {notifications.map((item) => (
                        <li key={item.id}>
                          <span className={`notif-dot notif-dot--${item.tone}`} aria-hidden="true" />
                          <div>
                            <strong>{item.title}</strong>
                            <p>{item.detail}</p>
                            <small>{item.time}</small>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            <Link to="/dashboard/settings" className="dash__topbar-user" aria-label="ตั้งค่าโปรไฟล์">
              <span className="dash__topbar-avatar" aria-hidden="true">{initials}</span>
            </Link>
          </div>
        </header>

        <div className="dash__content">
          <Outlet />
        </div>

        <footer className="dash__footer">
          <span>© 2569 งานดี · Workspace สาธิต</span>
          <Link to="/pricing">
            <Sparkles size={14} aria-hidden="true" /> อัปเกรดแพ็กเกจ
          </Link>
        </footer>
      </div>
    </div>
  )
}
