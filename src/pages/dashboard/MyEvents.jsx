import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays,
  ExternalLink,
  Eye,
  MessageSquare,
  Plus,
  Power,
  Search,
  Trash2,
} from 'lucide-react'
import Modal from '../../components/Modal'
import StatusBadge from '../../components/StatusBadge'
import { useToast } from '../../context/ToastContext'
import { useWorkspace } from '../../context/WorkspaceContext'
import { asset } from '../../lib/asset'
import { thaiNumber } from '../../lib/format'

const filters = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'published', label: 'เผยแพร่' },
  { id: 'review', label: 'รอตรวจสอบ' },
  { id: 'draft', label: 'ฉบับร่าง' },
]

export default function MyEvents() {
  const { events, toggleEventStatus, deleteEvent } = useWorkspace()
  const { showToast } = useToast()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return events.filter((event) => {
      if (filter !== 'all' && event.status !== filter) return false
      if (!needle) return true
      return `${event.title} ${event.category}`.toLowerCase().includes(needle)
    })
  }, [events, filter, query])

  function countOf(status) {
    return status === 'all' ? events.length : events.filter((event) => event.status === status).length
  }

  function handleToggle(event) {
    const wasPublished = event.status === 'published'
    toggleEventStatus(event.id)
    showToast(wasPublished ? `หยุดเผยแพร่ “${event.title}” แล้ว` : `เผยแพร่ “${event.title}” แล้ว`, wasPublished ? 'info' : 'success')
  }

  function handleDelete() {
    if (!deleteTarget) return
    deleteEvent(deleteTarget.id)
    showToast(`ลบประกาศ “${deleteTarget.title}” แล้ว`, 'info')
    setDeleteTarget(null)
  }

  return (
    <div className="dash-page">
      <div className="dash-head">
        <div>
          <p className="eyebrow eyebrow--red">จัดการประกาศ</p>
          <h1>งานของฉัน</h1>
          <p className="dash-head__sub">ติดตามสถานะผู้เข้าชม และข้อความสอบถามของทุกงานในที่เดียว</p>
        </div>
        <div className="dash-head__actions">
          <Link to="/post" className="btn btn--primary btn--sm">
            <Plus size={17} aria-hidden="true" /> ลงประกาศใหม่
          </Link>
        </div>
      </div>

      <div className="manage-toolbar">
        <div className="manage-tabs" role="group" aria-label="กรองตามสถานะ">
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

        <div className="manage-search">
          <Search size={16} aria-hidden="true" />
          <label className="sr-only" htmlFor="my-events-search">ค้นหางานของฉัน</label>
          <input
            id="my-events-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ค้นหาชื่องาน..."
          />
        </div>
      </div>

      {filtered.length ? (
        <div className="manage-table">
          <div className="manage-table__head">
            <span>ประกาศ</span>
            <span>สถานะ</span>
            <span>ผู้เข้าชม</span>
            <span>ข้อความ</span>
            <span className="align-right">จัดการ</span>
          </div>

          {filtered.map((event) => (
            <div key={event.id} className="manage-table__row">
              <div className="manage-item">
                <img src={asset(event.image)} alt="" width="72" height="72" loading="lazy" />
                <div className="manage-item__info">
                  <strong>{event.title}</strong>
                  <span>{event.category} · {event.dateLabel}</span>
                  <span className="manage-item__mobile">
                    <Eye size={13} aria-hidden="true" /> {thaiNumber(event.views)}
                    <MessageSquare size={13} aria-hidden="true" /> {event.inquiries}
                  </span>
                </div>
              </div>

              <div className="manage-status">
                <StatusBadge status={event.status} />
              </div>

              <div className="manage-stat">
                <Eye size={14} aria-hidden="true" /> {thaiNumber(event.views)}
              </div>
              <div className="manage-stat">
                <MessageSquare size={14} aria-hidden="true" /> {event.inquiries}
              </div>

              <div className="manage-actions">
                <Link
                  to={`/events/${event.slug}`}
                  className="table-action"
                  aria-label={`ดูประกาศ ${event.title}`}
                  title="ดูประกาศ"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  className="table-action"
                  onClick={() => handleToggle(event)}
                  aria-label={event.status === 'published' ? `หยุดเผยแพร่ ${event.title}` : `เผยแพร่ ${event.title}`}
                  title={event.status === 'published' ? 'หยุดเผยแพร่' : 'เผยแพร่'}
                >
                  <Power size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="table-action table-action--danger"
                  onClick={() => setDeleteTarget(event)}
                  aria-label={`ลบประกาศ ${event.title}`}
                  title="ลบประกาศ"
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-state__icon"><CalendarDays size={26} aria-hidden="true" /></span>
          <h2>ยังไม่มีประกาศในหมวดนี้</h2>
          <p>ลองเปลี่ยนตัวกรอง หรือสร้างประกาศงานใหม่ของคุณเอง</p>
          <Link to="/post" className="btn btn--primary">
            <Plus size={16} aria-hidden="true" /> ลงประกาศใหม่
          </Link>
        </div>
      )}

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        eyebrow="ยืนยันการลบ"
        title="ลบประกาศนี้?"
        subtitle={deleteTarget?.title}
      >
        <p className="confirm-text">
          ประกาศจะถูกนำออกจากระบบทันทีและไม่สามารถกู้คืนได้
          หากต้องการหยุดแสดงชั่วคราว แนะนำให้ใช้ปุ่มหยุดเผยแพร่แทน
        </p>
        <div className="confirm-actions">
          <button type="button" className="btn btn--outline" onClick={() => setDeleteTarget(null)}>
            ยกเลิก
          </button>
          <button type="button" className="btn btn--danger" onClick={handleDelete}>
            <Trash2 size={16} aria-hidden="true" /> ลบประกาศ
          </button>
        </div>
      </Modal>
    </div>
  )
}
