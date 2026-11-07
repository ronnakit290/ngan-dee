import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Facebook,
  LoaderCircle,
  LockKeyhole,
  Mail,
  Sparkles,
} from 'lucide-react'
import AuthShell from '../components/AuthShell'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { demoAccount } from '../data/dashboard'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useToast()
  const [values, setValues] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const redirectTo = location.state?.from?.pathname || '/dashboard'

  if (user) return <Navigate to={redirectTo} replace />

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    setError('')
  }

  function fillDemo() {
    setValues({ email: demoAccount.email, password: demoAccount.password })
    setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!values.email.trim() || !values.password) {
      setError('กรุณากรอกอีเมลและรหัสผ่าน')
      return
    }
    setLoading(true)
    setError('')
    try {
      await login({ ...values, remember })
      showToast('เข้าสู่ระบบสำเร็จ ยินดีต้อนรับกลับค่ะ')
      navigate(redirectTo, { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell variant="login">
      <header className="auth__head">
        <p className="eyebrow eyebrow--blue">ยินดีต้อนรับกลับ</p>
        <h2>เข้าสู่ระบบ</h2>
        <p>จัดการงาน พื้นที่ และข้อความสอบถามของคุณได้จากที่เดียว</p>
      </header>

      <div className="demo-box">
        <span className="demo-box__icon">
          <Sparkles size={17} aria-hidden="true" />
        </span>
        <div className="demo-box__text">
          <strong>บัญชีทดลอง</strong>
          <span>{demoAccount.email} · {demoAccount.password}</span>
        </div>
        <button type="button" className="demo-box__btn" onClick={fillDemo}>
          ใช้บัญชีนี้
        </button>
      </div>

      {error && (
        <div className="form-alert" role="alert">
          <AlertCircle size={17} aria-hidden="true" /> {error}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="login-email">อีเมล</label>
          <div className="input-icon">
            <Mail size={17} aria-hidden="true" />
            <input
              id="login-email"
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
          <div className="field__between">
            <label htmlFor="login-password">รหัสผ่าน</label>
            <Link to="/forgot-password" className="field__link">
              ลืมรหัสผ่าน?
            </Link>
          </div>
          <div className="input-icon">
            <LockKeyhole size={17} aria-hidden="true" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={values.password}
              onChange={(event) => update('password', event.target.value)}
              placeholder="รหัสผ่านของคุณ"
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
        </div>

        <label className="check">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          <span>จดจำการเข้าสู่ระบบ</span>
        </label>

        <button type="submit" className="btn btn--primary btn--block auth__submit" disabled={loading}>
          {loading ? (
            <>
              <LoaderCircle size={18} className="spin" aria-hidden="true" /> กำลังเข้าสู่ระบบ...
            </>
          ) : (
            <>
              เข้าสู่ระบบ <ArrowRight size={17} aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <div className="auth__divider">
        <span>หรือดำเนินการต่อด้วย</span>
      </div>

      <div className="auth__social">
        <button
          type="button"
          className="social-btn"
          onClick={() => showToast('โซเชียลล็อกอินเป็นตัวอย่าง — กรุณาใช้บัญชีทดลองก่อนนะคะ', 'info')}
        >
          <span className="social-btn__g" aria-hidden="true">G</span> Google
        </button>
        <button
          type="button"
          className="social-btn"
          onClick={() => showToast('โซเชียลล็อกอินเป็นตัวอย่าง — กรุณาใช้บัญชีทดลองก่อนนะคะ', 'info')}
        >
          <Facebook size={18} aria-hidden="true" /> Facebook
        </button>
      </div>

      <p className="auth__switch">
        ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิกฟรี</Link>
      </p>
      <p className="auth__note">
        ระบบสาธิต: บัญชีและข้อมูลถูกเก็บไว้ใน localStorage ของเบราว์เซอร์นี้เท่านั้น
      </p>
    </AuthShell>
  )
}
