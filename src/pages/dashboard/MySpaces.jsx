import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  ExternalLink,
  Eye,
  MessageSquare,
  Plus,
  Power,
  Trash2,
} from 'lucide-react'
import Modal from '../../components/Modal'
import StatusBadge from '../../components/StatusBadge'
import { useToast } from '../../context/ToastContext'
import { useWorkspace } from '../../context/WorkspaceContext'
import { formatPrice } from '../../data/spaces'
import { asset } from '../../lib/asset'
import { thaiNumber } from '../../lib/format'

const filters = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'published', label: 'เผยแพร่' },
  { id: 'draft', label: 'ฉบับร่าง' },
]

export default function MySpaces() {
  const { spaces, toggleSpaceStatus, deleteSpace } = useWorkspace()
  const { showToast } = useToast()
  const [filter, setFilter] = useState('all')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filtered = useMemo(
    () => spaces.filter((space) => filter === 'all' || space.status === filter),
    [spaces, filter],
  )

  function countOf(status) {
    return status === 'all' ? spaces.length : spaces.filter((space) => space.status === status).length
  }

  function handleToggle(space) {
    const wasPublished = space.status === 'published'
    toggleSpaceStatus(space.id)
    showToast(
      wasPublished ? `หยุดเผยแพร่ “${space.name}” แล้ว` : `เผยแพร่ “${space.name}” แล้ว`,
      wasPublished ? 'info' : 'success',
    )
  }

  function handleDelete() {
    if (!deleteTarget) return
    deleteSpace(deleteTarget.id)
    showToast(`ลบประกาศ “${deleteTarget.name}” แล้ว`, 'info')
    setDeleteTarget(null)
  }

  return (
    <div className="dash-page">
      <div className="dash-head">
        <div>
          <p className="eyebrow eyebrow--blue">พื้นที่และบูธ</p>
          <h1>พื้นที่ของฉัน</h1>
          <p className="dash-head__sub">จัดการฮอลล์ สตูดิโอ ลาน และบูธที่คุณประกาศไว้</p>
        </div>
        <div className="dash-head__actions">
          <Link to="/post?tab=space" className="btn btn--primary btn--sm">
            <Plus size={17} aria-hidden="true" /> ลงประกาศพื้นที่
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
      </div>

      {filtered.length ? (
        <div className="manage-space-grid">
          {filtered.map((space) => (
            <article key={space.id} className="manage-space">
              <div className="manage-space__media">
                <img src={asset(space.image)} alt="" width="640" height="420" loading="lazy" />
                <span className={`badge ${space.mode === 'sell' ? 'badge--sale' : 'badge--rent'}`}>
                  {space.mode === 'sell' ? 'ขาย' : 'ให้เช่า'}
                </span>
                <StatusBadge status={space.status} />
              </div>

              <div className="manage-space__body">
                <div className="manage-space__title">
                  <h2>{space.name}</h2>
                  <span>{space.type} · {space.mode === 'sell' ? 'ขายขาด' : `เช่า / ${space.unit}`}</span>
                </div>

                <p className="manage-space__price">
                  ฿{formatPrice(space.price)}
                  {space.mode === 'sell' ? '' : <span> / {space.unit}</span>}
                </p>

                <div className="manage-space__stats">
                  <span><Eye size={15} aria-hidden="true" /> {thaiNumber(space.views)} ผู้เข้าชม</span>
                  <span><MessageSquare size={15} aria-hidden="true" /> {space.inquiries} ข้อความ</span>
                </div>

                <div className="manage-space__actions">
                  <Link to={`/spaces/${space.slug}`} className="btn btn--outline btn--sm">
                    <ExternalLink size={15} aria-hidden="true" /> ดูประกาศ
                  </Link>
                  <button
                    type="button"
                    className="table-action"
                    onClick={() => handleToggle(space)}
                    aria-label={space.status === 'published' ? `หยุดเผยแพร่ ${space.name}` : `เผยแพร่ ${space.name}`}
                    title={space.status === 'published' ? 'หยุดเผยแพร่' : 'เผยแพร่'}
                  >
                    <Power size={16} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="table-action table-action--danger"
                    onClick={() => setDeleteTarget(space)}
                    aria-label={`ลบประกาศ ${space.name}`}
                    title="ลบประกาศ"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-state__icon"><Building2 size={26} aria-hidden="true" /></span>
          <h2>ยังไม่มีพื้นที่ในหมวดนี้</h2>
          <p>เพิ่มฮอลล์ สตูดิโอ ลาน หรือบูธของคุณ แล้วให้ผู้จัดงานค้นพบ</p>
          <Link to="/post?tab=space" className="btn btn--primary">
            <Plus size={16} aria-hidden="true" /> ลงประกาศพื้นที่
          </Link>
        </div>
      )}

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        eyebrow="ยืนยันการลบ"
        title="ลบประกาศพื้นที่นี้?"
        subtitle={deleteTarget?.name}
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
