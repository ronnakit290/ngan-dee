import { useEffect, useId, useRef, useState } from 'react'
import { Check, LoaderCircle, Send } from 'lucide-react'

export default function InquiryForm({ kind = 'event', itemName, onDone }) {
  const uid = useId()
  const [status, setStatus] = useState('idle')
  const [reference, setReference] = useState('')
  const [values, setValues] = useState({ name: '', phone: '', qty: '1', message: '' })
  const [errors, setErrors] = useState({})
  const timer = useRef(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'กรุณากรอกชื่อผู้ติดต่อ'
    if (!values.phone.trim()) nextErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์'
    else if (!/^[0-9+\-\s]{9,15}$/.test(values.phone.trim())) nextErrors.phone = 'กรุณากรอกเบอร์โทรให้ถูกต้อง'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setStatus('sending')
    timer.current = window.setTimeout(() => {
      setReference(`ND-${String(Date.now()).slice(-6)}`)
      setStatus('done')
      onDone?.()
    }, 650)
  }

  if (status === 'done') {
    return (
      <div className="inquiry-success" role="status">
        <span className="inquiry-success__icon">
          <Check size={26} aria-hidden="true" />
        </span>
        <h3>ส่งคำขอเรียบร้อยแล้ว</h3>
        <p>
          ทีมงานจะติดต่อกลับภายใน 1 วันทำการ หมายเลขอ้างอิงของคุณคือ <strong>{reference}</strong>
        </p>
        <p className="inquiry-success__note">
          {kind === 'event' ? 'ข้อมูลบูธ' : 'ข้อมูลพื้นที่'}: {itemName}
        </p>
      </div>
    )
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor={`${uid}-name`}>ชื่อผู้ติดต่อ</label>
        <input
          id={`${uid}-name`}
          type="text"
          autoComplete="name"
          data-autofocus
          value={values.name}
          onChange={(event) => update('name', event.target.value)}
          placeholder="เช่น สมชาย ใจดี"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${uid}-name-error` : undefined}
          required
        />
        {errors.name && (
          <p className="field__error" id={`${uid}-name-error`}>
            {errors.name}
          </p>
        )}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor={`${uid}-phone`}>เบอร์โทรศัพท์</label>
          <input
            id={`${uid}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            placeholder="08X-XXX-XXXX"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
            required
          />
          {errors.phone && (
            <p className="field__error" id={`${uid}-phone-error`}>
              {errors.phone}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-qty`}>{kind === 'event' ? 'จำนวนบูธ' : 'ระยะเวลาเช่า'}</label>
          <select id={`${uid}-qty`} value={values.qty} onChange={(event) => update('qty', event.target.value)}>
            {kind === 'event' ? (
              <>
                <option value="1">1 บูธ</option>
                <option value="2">2 บูธ</option>
                <option value="3">3 บูธ</option>
                <option value="4+">4 บูธขึ้นไป</option>
              </>
            ) : (
              <>
                <option value="1">1 วัน</option>
                <option value="2-3">2–3 วัน</option>
                <option value="1w">1 สัปดาห์</option>
                <option value="1m">1 เดือนขึ้นไป</option>
              </>
            )}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor={`${uid}-message`}>รายละเอียดเพิ่มเติม</label>
        <textarea
          id={`${uid}-message`}
          rows="3"
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          placeholder={kind === 'event' ? 'ประเภทธุรกิจ ขนาดบูธที่ต้องการ หรือคำถามเพิ่มเติม' : 'วัตถุประสงค์การใช้งาน วันที่ต้องการ หรือคำถามเพิ่มเติม'}
        />
      </div>

      <button type="submit" className="btn btn--primary btn--block" disabled={status === 'sending'}>
        {status === 'sending' ? (
          <>
            <LoaderCircle size={18} className="spin" aria-hidden="true" /> กำลังส่ง...
          </>
        ) : (
          <>
            <Send size={18} aria-hidden="true" /> ส่งคำขอ
          </>
        )}
      </button>
      <p className="inquiry-form__note">ข้อมูลของคุณใช้เพื่อติดต่อกลับเท่านั้น · ไม่มีการชำระเงินในตัวอย่างนี้</p>
    </form>
  )
}
