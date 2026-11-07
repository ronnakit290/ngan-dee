import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, LoaderCircle, Mail, MailCheck } from 'lucide-react'
import AuthShell from '../components/AuthShell'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('กรุณากรอกอีเมลให้ถูกต้อง')
      return
    }
    setError('')
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 700)
  }

  return (
    <AuthShell variant="forgot">
      {sent ? (
        <div className="auth-success">
          <span className="auth-success__icon">
            <MailCheck size={30} aria-hidden="true" />
          </span>
          <p className="eyebrow eyebrow--blue">ตรวจสอบกล่องจดหมาย</p>
          <h2>ส่งลิงก์รีเซ็ตแล้ว</h2>
          <p>
            หากอีเมล <strong>{email}</strong> มีอยู่ในระบบ
            คุณจะได้รับลิงก์ตั้งรหัสผ่านใหม่ภายในไม่กี่นาที
          </p>
          <div className="auth-success__tip">
            <Check size={15} aria-hidden="true" /> อย่าลืมตรวจสอบโฟลเดอร์สแปมด้วยนะคะ
          </div>
          <Link to="/login" className="btn btn--primary btn--block">
            กลับไปหน้าเข้าสู่ระบบ <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <button type="button" className="auth__resend" onClick={() => setSent(false)}>
            ยังไม่ได้รับอีเมล? ลองอีกครั้ง
          </button>
        </div>
      ) : (
        <>
          <header className="auth__head">
            <p className="eyebrow eyebrow--red">ลืมรหัสผ่าน</p>
            <h2>ตั้งรหัสผ่านใหม่</h2>
            <p>กรอกอีเมลที่ใช้สมัครสมาชิก แล้วเราจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ให้คุณ</p>
          </header>

          {error && (
            <div className="form-alert" role="alert">
              <span aria-hidden="true">!</span> {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="forgot-email">อีเมล</label>
              <div className="input-icon">
                <Mail size={17} aria-hidden="true" />
                <input
                  id="forgot-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setError('')
                  }}
                  placeholder="you@example.com"
                  required
                  autoFocus
                />
              </div>
            </div>

            <button type="submit" className="btn btn--primary btn--block auth__submit" disabled={loading}>
              {loading ? (
                <>
                  <LoaderCircle size={18} className="spin" aria-hidden="true" /> กำลังส่งลิงก์...
                </>
              ) : (
                <>
                  ส่งลิงก์รีเซ็ต <ArrowRight size={17} aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <Link to="/login" className="auth__back-link">
            <ArrowLeft size={16} aria-hidden="true" /> กลับไปหน้าเข้าสู่ระบบ
          </Link>
        </>
      )}
    </AuthShell>
  )
}
