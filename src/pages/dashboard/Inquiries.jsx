import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCheck,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Settings,
} from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'
import { useToast } from '../../context/ToastContext'
import { useWorkspace } from '../../context/WorkspaceContext'

const filters = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'new', label: 'ใหม่' },
  { id: 'pending', label: 'รอดำเนินการ' },
  { id: 'replied', label: 'ตอบแล้ว' },
]

export default function Inquiries() {
  const { inquiries, updateInquiryStatus } = useWorkspace()
  const { showToast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const openParam = searchParams.get('open')

  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(openParam || inquiries[0]?.id || '')
  const [mobileOpen, setMobileOpen] = useState(Boolean(openParam))
  const [reply, setReply] = useState('')

  useEffect(() => {
    if (openParam) {
      setSelectedId(openParam)
      setMobileOpen(true)
    }
  }, [openParam])

  const filtered = useMemo(
    () => inquiries.filter((item) => filter === 'all' || item.status === filter),
    [inquiries, filter],
  )

  const selected =
    filtered.find((item) => item.id === selectedId) ||
    filtered[0] ||
    null

  function countOf(status) {
    return status === 'all' ? inquiries.length : inquiries.filter((item) => item.status === status).length
  }

  function selectInquiry(item) {
    setSelectedId(item.id)
    setMobileOpen(true)
    setReply('')
    setSearchParams({ open: item.id }, { replace: true })
  }

  function markReplied(item) {
    updateInquiryStatus(item.id, 'replied')
    showToast('ทำเครื่องหมายว่าตอบแล้ว', 'success')
  }

  function sendReply(event) {
    event.preventDefault()
    if (!selected || !reply.trim()) return
    updateInquiryStatus(selected.id, 'replied')
    showToast(`ส่งข้อความตอบกลับถึง ${selected.name} แล้ว`)
    setReply('')
  }

  return (
    <div className="dash-page">
      <div className="dash-head">
        <div>
          <p className="eyebrow eyebrow--blue">กล่องข้อความ</p>
          <h1>ข้อความสอบถาม</h1>
          <p className="dash-head__sub">ตอบกลับผู้สนใจงานและพื้นที่ของคุณได้จากที่นี่</p>
        </div>
        <div className="dash-head__actions">
          <Link to="/dashboard/settings" className="btn btn--outline btn--sm">
            <Settings size={16} aria-hidden="true" /> ตั้งค่าการแจ้งเตือน
          </Link>
        </div>
      </div>

      <div className={`inq ${mobileOpen ? 'is-mobile-open' : ''}`}>
        <section className="panel inq__list" aria-label="รายการข้อความ">
          <div className="inq-filters">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={filter === item.id ? 'is-active' : ''}
                onClick={() => setFilter(item.id)}
                aria-pressed={filter === item.id}
              >
                {item.label} <span>{countOf(item.id)}</span>
              </button>
            ))}
          </div>

          {filtered.length ? (
            <ul className="inq-items">
              {filtered.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`inq-item ${selected?.id === item.id ? 'is-active' : ''}`}
                    onClick={() => selectInquiry(item)}
                  >
                    <span className="inq-item__avatar" aria-hidden="true">{item.initials}</span>
                    <span className="inq-item__main">
                      <span className="inq-item__top">
                        <strong>{item.name}</strong>
                        <time>{item.date}</time>
                      </span>
                      <span className="inq-item__item">{item.item}</span>
                      <span className="inq-item__bottom">
                        <StatusBadge status={item.status} />
                        <span>{item.itemType === 'event' ? 'งานอีเวนต์' : 'พื้นที่ / บูธ'}</span>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="inq-empty">
              <MessageSquare size={24} aria-hidden="true" />
              <p>ยังไม่มีข้อความในหมวดนี้</p>
            </div>
          )}
        </section>

        <section className="panel inq__detail" aria-label="รายละเอียดข้อความ" id="inquiry-detail">
          {selected ? (
            <>
              <button
                type="button"
                className="inq__back"
                onClick={() => setMobileOpen(false)}
              >
                <ArrowLeft size={16} aria-hidden="true" /> กลับไปรายการข้อความ
              </button>

              <header className="inq-detail__head">
                <span className="inq-detail__avatar" aria-hidden="true">{selected.initials}</span>
                <div>
                  <h2>{selected.name}</h2>
                  <p>{selected.company}</p>
                </div>
                <StatusBadge status={selected.status} />
              </header>

              <div className="inq-detail__contact">
                <a href={`mailto:${selected.email}`}>
                  <Mail size={15} aria-hidden="true" /> {selected.email}
                </a>
                <a href={`tel:${selected.phone.replace(/[^0-9+]/g, '')}`}>
                  <Phone size={15} aria-hidden="true" /> {selected.phone}
                </a>
              </div>

              <div className="inq-subject">
                <span className="badge badge--soft">
                  {selected.itemType === 'event' ? 'งานอีเวนต์' : 'พื้นที่ / บูธ'}
                </span>
                <strong>{selected.item}</strong>
                <Link
                  to={selected.itemType === 'event' ? '/dashboard/events' : '/dashboard/spaces'}
                  className="inq-subject__link"
                >
                  ดูประกาศ <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>

              <blockquote className="inq-message">{selected.message}</blockquote>

              <div className="inq-detail__meta">
                <span>ส่งเมื่อ {selected.date}</span>
                {selected.status !== 'replied' && (
                  <button type="button" className="inq-mark" onClick={() => markReplied(selected)}>
                    <CheckCheck size={15} aria-hidden="true" /> ทำเครื่องหมายว่าตอบแล้ว
                  </button>
                )}
              </div>

              <form className="inq-reply" onSubmit={sendReply}>
                <label htmlFor="inquiry-reply">ตอบกลับ {selected.name}</label>
                <textarea
                  id="inquiry-reply"
                  rows="4"
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  placeholder="พิมพ์ข้อความตอบกลับ เช่น ขนาดบูธ ราคา และขั้นตอนการจอง..."
                />
                <div className="inq-reply__foot">
                  <span>ส่งถึง {selected.email}</span>
                  <button type="submit" className="btn btn--primary btn--sm" disabled={!reply.trim()}>
                    <Send size={15} aria-hidden="true" /> ส่งข้อความ
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="inq-detail__empty">
              <MessageSquare size={28} aria-hidden="true" />
              <h2>เลือกข้อความเพื่ออ่านรายละเอียด</h2>
              <p>ข้อความสอบถามจากผู้สนใจงานและพื้นที่ของคุณจะแสดงที่นี่</p>
            </div>
          )}
        </section>
      </div>

      <p className="dash-page__note">
        ข้อความทั้งหมดเป็นข้อมูลจำลอง การตอบกลับจะไม่ถูกส่งอีเมลจริง
      </p>
    </div>
  )
}
