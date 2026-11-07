import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  UserRound,
} from 'lucide-react'
import AuthShell from '../components/AuthShell'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { authRoles } from '../data/dashboard'

function strengthOf(password) {
  let score = 0
  if (password.length >= 8) score += 1
  if (/\d/.test(password)) score += 1
  if (/[A-Za-z]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  const labels = ['อ่อนมาก', 'อ่อน', 'ปานกลาง', 'ดี', 'แข็งแรง']
  return { score, label: labels[score] }
}

export default function Register() {
  const { user, register } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [values, setValues] = useState({
    name: '',
    email: '',
    role: 'organizer',
    password: '',
    confirm: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [terms, setTerms] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const strength = strengthOf(values.password)

  if (user) return <Navigate to="/dashboard" replace />

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!values.name.trim()) return setError('กรุณากรอกชื่อ–นามสกุล')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) return setError('กรุณากรอกอีเมลให้ถูกต้อง')
    if (values.password.length < 8) return setError('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร')
    if (values.password !== values.confirm) return setError('รหัสผ่านทั้งสองช่องไม่ตรงกัน')
    if (!terms) return setError('กรุณายอมรับข้อกำหนดการใช้งานก่อนสมัครสมาชิก')

    setLoading(true)
    setError('')
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      })
      showToast('สมัครสมาชิกสำเร็จ เริ่มจัดการงานของคุณได้เลย')
      navigate('/dashboard', { replace: true })
    } catch (registerError) {
      setError(registerError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell variant="register">
      <header className="auth__head">
        <p className="eyebrow eyebrow--red">เริ่มต้นฟรี</p>
        <h2>สร้างบัญชีใหม่</h2>
        <p>ใช้เวลาไม่ถึง 2 นาที แล้วลงประกาศงานหรือพื้นที่ของคุณได้ทันที</p>
      </header>

      {error && (
        <div className="form-alert" role="alert">
          <AlertCircle size={17} aria-hidden="true" /> {error}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="register-name">ชื่อ–นามสกุล</label>
          <div className="input-icon">
            <UserRound size={17} aria-hidden="true" />
            <input
              id="register-name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(event) => update('name', event.target.value)}
              placeholder="เช่น พิมพ์ชนก วัฒนสุข"
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="register-email">อีเมล</label>
          <div className="input-icon">
            <Mail size={17} aria-hidden="true" />
            <input
              id="register-email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => update('email', event.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="register-role">คุณคือใคร</label>
          <select
            id="register-role"
            value={values.role}
            onChange={(event) => update('role', event.target.value)}
          >
            {authRoles.map((role) => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="register-password">รหัสผ่าน</label>
          <div className="input-icon">
            <LockKeyhole size={17} aria-hidden="true" />
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={values.password}
              onChange={(event) => update('password', event.target.value)}
              placeholder="อย่างน้อย 8 ตัวอักษร"
              required
            />
            <button
              type="button"
              className="input-icon__toggle"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
            >
              {showPassword ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
            </button>
          </div>
          {values.password && (
            <div className="strength" aria-live="polite">
              <div className="strength__bars">
                {Array.from({ length: 4 }).map((_, index) => (
                  <span key={index} className={index < strength.score ? 'is-on' : ''} />
                ))}
              </div>
              <span className="strength__label">ความปลอดภัย: {strength.label}</span>
            </div>
          )}
        </div>

        <div className="field">
          <label htmlFor="register-confirm">ยืนยันรหัสผ่าน</label>
          <div className="input-icon">
            <LockKeyhole size={17} aria-hidden="true" />
            <input
              id="register-confirm"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={values.confirm}
              onChange={(event) => update('confirm', event.target.value)}
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              required
            />
          </div>
        </div>

        <label className="check check--terms">
          <input
            type="checkbox"
            checked={terms}
            onChange={(event) => setTerms(event.target.checked)}
          />
          <span>
            ฉันยอมรับ <Link to="/about">ข้อกำหนดการใช้งาน</Link> และนโยบายความเป็นส่วนตัวของงานดี
          </span>
        </label>

        <button type="submit" className="btn btn--primary btn--block auth__submit" disabled={loading}>
          {loading ? (
            <>
              <LoaderCircle size={18} className="spin" aria-hidden="true" /> กำลังสร้างบัญชี...
            </>
          ) : (
            <>
              สมัครสมาชิก <ArrowRight size={17} aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <p className="auth__switch">
        มีบัญชีอยู่แล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
      </p>
      <p className="auth__note">
        ระบบสาธิต: บัญชีและข้อมูลถูกเก็บไว้ใน localStorage ของเบราว์เซอร์นี้เท่านั้น
      </p>
    </AuthShell>
  )
}
