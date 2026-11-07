import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BadgeCheck,
  Building2,
  LogOut,
  Mail,
  RefreshCcw,
  Save,
  ShieldCheck,
  Trash2,
  UserRound,
} from 'lucide-react'
import Modal from '../../components/Modal'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useWorkspace } from '../../context/WorkspaceContext'
import { authRoles, demoAccount } from '../../data/dashboard'
import { initialsOf, roleLabel } from '../../lib/format'

const SETTINGS_KEY = 'ngan-dee:settings'

function readSettings() {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY)
    if (!raw) return { inquiries: true, digest: true, product: false }
    return { inquiries: true, digest: true, product: false, ...JSON.parse(raw) }
  } catch {
    return { inquiries: true, digest: true, product: false }
  }
}

export default function Settings() {
  const { user, updateProfile, logout } = useAuth()
  const { resetWorkspace } = useWorkspace()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    organization: user?.organization || '',
    role: user?.role || 'organizer',
    bio: user?.bio || '',
  })
  const [prefs, setPrefs] = useState(readSettings)
  const [saving, setSaving] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!values.name.trim()) {
      showToast('กรุณากรอกชื่อผู้จัดงาน', 'error')
      return
    }
    setSaving(true)
    window.setTimeout(() => {
      updateProfile({
        name: values.name.trim(),
        phone: values.phone,
        organization: values.organization,
        role: values.role,
        bio: values.bio,
      })
      try {
        window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(prefs))
      } catch {
        // Preferences are optional in private mode.
      }
      setSaving(false)
      showToast('บันทึกการเปลี่ยนแปลงแล้ว')
    }, 500)
  }

  function togglePref(key, value) {
    setPrefs((current) => ({ ...current, [key]: value }))
  }

  function handleReset() {
    resetWorkspace()
    setResetOpen(false)
    showToast('คืนค่าข้อมูลตัวอย่างเรียบร้อยแล้ว', 'info')
  }

  function handleLogout() {
    navigate('/')
    logout()
    showToast('ออกจากระบบแล้ว แล้วพบกันใหม่ค่ะ', 'info')
  }

  return (
    <div className="dash-page">
      <div className="dash-head">
        <div>
          <p className="eyebrow eyebrow--blue">บัญชีของฉัน</p>
          <h1>ตั้งค่า</h1>
          <p className="dash-head__sub">จัดการข้อมูลโปรไฟล์ผู้จัดงานและการแจ้งเตือนของคุณ</p>
        </div>
      </div>

      <div className="settings-grid">
        <form className="settings-main" onSubmit={handleSubmit}>
          <section className="panel">
            <div className="panel__head">
              <div>
                <h2>ข้อมูลโปรไฟล์</h2>
                <p>ข้อมูลนี้จะแสดงบนประกาศและโปรไฟล์สาธารณะของคุณ</p>
              </div>
              <span className="settings-verified">
                <BadgeCheck size={15} aria-hidden="true" /> ยืนยันแล้ว
              </span>
            </div>

            <div className="settings-avatar-row">
              <span className="settings-avatar" aria-hidden="true">{initialsOf(values.name)}</span>
              <div>
                <strong>{values.name}</strong>
                <span>{roleLabel(values.role)} · สมาชิกตั้งแต่ พ.ย. 2569</span>
              </div>
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={() => showToast('การอัปโหลดรูปเป็นตัวอย่าง — ยังไม่รองรับในเดโมนี้', 'info')}
              >
                เปลี่ยนรูป
              </button>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="settings-name">ชื่อ–นามสกุล</label>
                <div className="input-icon">
                  <UserRound size={16} aria-hidden="true" />
                  <input
                    id="settings-name"
                    type="text"
                    value={values.name}
                    onChange={(event) => update('name', event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="settings-phone">เบอร์โทรศัพท์</label>
                <input
                  id="settings-phone"
                  type="tel"
                  value={values.phone}
                  onChange={(event) => update('phone', event.target.value)}
                  placeholder="08X-XXX-XXXX"
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="settings-email">อีเมล</label>
                <div className="input-icon input-icon--disabled">
                  <Mail size={16} aria-hidden="true" />
                  <input id="settings-email" type="email" value={values.email} disabled />
                </div>
                <p className="field__hint">อีเมลใช้สำหรับเข้าสู่ระบบ ไม่สามารถแก้ไขได้ในเดโม</p>
              </div>
              <div className="field">
                <label htmlFor="settings-role">ประเภทธุรกิจ</label>
                <select
                  id="settings-role"
                  value={values.role}
                  onChange={(event) => update('role', event.target.value)}
                >
                  {authRoles.map((role) => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="settings-org">ชื่อองค์กร / สตูดิโอ</label>
              <div className="input-icon">
                <Building2 size={16} aria-hidden="true" />
                <input
                  id="settings-org"
                  type="text"
                  value={values.organization}
                  onChange={(event) => update('organization', event.target.value)}
                  placeholder="เช่น Studio Pim Craft"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="settings-bio">แนะนำตัวสั้น ๆ</label>
              <textarea
                id="settings-bio"
                rows="4"
                value={values.bio}
                onChange={(event) => update('bio', event.target.value)}
                placeholder="เล่าเกี่ยวกับงานหรือพื้นที่ของคุณให้ผู้สนใจรู้จัก"
              />
              <p className="field__hint">{values.bio.length}/240 ตัวอักษร</p>
            </div>
          </section>

          <section className="panel">
            <div className="panel__head">
              <div>
                <h2>การแจ้งเตือน</h2>
                <p>เลือกช่องทางและเรื่องที่คุณต้องการรับข่าวสาร</p>
              </div>
            </div>

            <div className="switch-list">
              <label className="switch-row">
                <span>
                  <strong>ข้อความสอบถามใหม่</strong>
                  <small>แจ้งเตือนทางอีเมลเมื่อมีผู้สนใจติดต่อ</small>
                </span>
                <span className="switch">
                  <input
                    type="checkbox"
                    checked={prefs.inquiries}
                    onChange={(event) => togglePref('inquiries', event.target.checked)}
                  />
                  <span className="switch__track" aria-hidden="true" />
                </span>
              </label>
              <label className="switch-row">
                <span>
                  <strong>สรุปสถิติรายสัปดาห์</strong>
                  <small>รับรายงานผู้เข้าชมและข้อความทุกวันจันทร์</small>
                </span>
                <span className="switch">
                  <input
                    type="checkbox"
                    checked={prefs.digest}
                    onChange={(event) => togglePref('digest', event.target.checked)}
                  />
                  <span className="switch__track" aria-hidden="true" />
                </span>
              </label>
              <label className="switch-row">
                <span>
                  <strong>ข่าวสารและโปรโมชัน</strong>
                  <small>อัปเดตฟีเจอร์ใหม่และส่วนลดแพ็กเกจ</small>
                </span>
                <span className="switch">
                  <input
                    type="checkbox"
                    checked={prefs.product}
                    onChange={(event) => togglePref('product', event.target.checked)}
                  />
                  <span className="switch__track" aria-hidden="true" />
                </span>
              </label>
            </div>
          </section>

          <div className="settings-save">
            <button type="submit" className="btn btn--primary" disabled={saving}>
              <Save size={17} aria-hidden="true" /> {saving ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
            </button>
            <span className="settings-save__hint">ข้อมูลถูกเก็บในเบราว์เซอร์นี้เท่านั้น</span>
          </div>
        </form>

        <aside className="settings-aside">
          <section className="panel">
            <h2>บัญชี</h2>
            <dl className="settings-account">
              <div>
                <dt>สถานะ</dt>
                <dd><span className="settings-active"><ShieldCheck size={14} aria-hidden="true" /> ใช้งานอยู่</span></dd>
              </div>
              <div>
                <dt>อีเมล</dt>
                <dd>{user?.email}</dd>
              </div>
              <div>
                <dt>ประเภทธุรกิจ</dt>
                <dd>{roleLabel(user?.role)}</dd>
              </div>
              <div>
                <dt>แพ็กเกจ</dt>
                <dd>ฟรี · <Link to="/pricing">อัปเกรด</Link></dd>
              </div>
            </dl>
            <button type="button" className="btn btn--outline btn--block" onClick={handleLogout}>
              <LogOut size={16} aria-hidden="true" /> ออกจากระบบ
            </button>
          </section>

          <section className="panel demo-panel">
            <h2>โหมดสาธิต</h2>
            <p>
              ข้อมูลงาน พื้นที่ และข้อความถูกเก็บไว้ในเบราว์เซอร์ของคุณ
              คุณสามารถคืนค่าข้อมูลตัวอย่างได้ทุกเมื่อ
            </p>
            <p className="demo-panel__cred">
              บัญชีทดลอง: <code>{demoAccount.email}</code> / <code>{demoAccount.password}</code>
            </p>
            <button type="button" className="btn btn--outline btn--block" onClick={() => setResetOpen(true)}>
              <RefreshCcw size={16} aria-hidden="true" /> คืนค่าข้อมูลตัวอย่าง
            </button>
          </section>
        </aside>
      </div>

      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        eyebrow="คืนค่าข้อมูล"
        title="คืนค่าข้อมูลตัวอย่าง?"
        subtitle="งาน พื้นที่ และข้อความที่แก้ไขจะกลับไปเป็นค่าเริ่มต้น"
      >
        <p className="confirm-text">
          การดำเนินการนี้จะแทนที่ข้อมูล Workspace ปัจจุบันด้วยข้อมูลตัวอย่างเริ่มต้น
          แต่จะไม่ลบบัญชีหรือรายการโปรดของคุณ
        </p>
        <div className="confirm-actions">
          <button type="button" className="btn btn--outline" onClick={() => setResetOpen(false)}>
            ยกเลิก
          </button>
          <button type="button" className="btn btn--danger" onClick={handleReset}>
            <Trash2 size={16} aria-hidden="true" /> คืนค่าข้อมูล
          </button>
        </div>
      </Modal>
    </div>
  )
}
