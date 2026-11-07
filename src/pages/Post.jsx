import { useEffect, useId, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  ImagePlus,
  Info,
  LoaderCircle,
  Send,
  Sparkles,
  X,
} from 'lucide-react'
import { categories, provinces } from '../data/events'
import { spaceTypes } from '../data/spaces'

const eventDefaults = {
  title: '',
  category: 'งานวัด',
  start: '',
  end: '',
  province: 'กรุงเทพมหานคร',
  venue: '',
  time: '',
  price: '',
  description: '',
  name: '',
  phone: '',
  email: '',
}

const spaceDefaults = {
  title: '',
  type: 'ฮอลล์',
  mode: 'rent',
  price: '',
  area: '',
  capacity: '',
  province: 'กรุงเทพมหานคร',
  address: '',
  description: '',
  name: '',
  phone: '',
  email: '',
}

export default function Post() {
  const [searchParams] = useSearchParams()
  const [tab, setTab] = useState(searchParams.get('tab') === 'space' ? 'space' : 'event')
  const [values, setValues] = useState(eventDefaults)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [reference, setReference] = useState('')
  const [preview, setPreview] = useState('')
  const previewRef = useRef('')
  const timer = useRef(null)
  const uid = useId()
  const topRef = useRef(null)

  useEffect(() => () => {
    window.clearTimeout(timer.current)
    if (previewRef.current) URL.revokeObjectURL(previewRef.current)
  }, [])

  function switchTab(nextTab) {
    setTab(nextTab)
    setValues(nextTab === 'space' ? spaceDefaults : eventDefaults)
    setErrors({})
    setStatus('idle')
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current)
      previewRef.current = ''
      setPreview('')
    }
  }

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handleFile(event) {
    const file = event.target.files?.[0]
    if (!file) return
    if (previewRef.current) URL.revokeObjectURL(previewRef.current)
    const url = URL.createObjectURL(file)
    previewRef.current = url
    setPreview(url)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (tab === 'event') {
      if (!values.title.trim()) nextErrors.title = 'กรุณากรอกชื่องาน'
      if (!values.start) nextErrors.start = 'กรุณาเลือกวันที่เริ่มงาน'
      if (!values.venue.trim()) nextErrors.venue = 'กรุณากรอกสถานที่จัดงาน'
    } else {
      if (!values.title.trim()) nextErrors.title = 'กรุณากรอกชื่อพื้นที่'
      if (!values.address.trim()) nextErrors.address = 'กรุณากรอกที่อยู่'
      if (!values.price) nextErrors.price = 'กรุณากรอกราคา'
    }
    if (!values.description.trim()) nextErrors.description = 'กรุณาเล่ารายละเอียดสั้น ๆ'
    if (!values.name.trim()) nextErrors.name = 'กรุณากรอกชื่อผู้ติดต่อ'
    if (!values.phone.trim()) nextErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์'
    else if (!/^[0-9+\-\s]{9,15}$/.test(values.phone.trim())) nextErrors.phone = 'กรุณากรอกเบอร์โทรให้ถูกต้อง'
    if (!values.email.trim()) nextErrors.email = 'กรุณากรอกอีเมล'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = 'กรุณากรอกอีเมลให้ถูกต้อง'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      window.setTimeout(() => {
        document.querySelector('[aria-invalid="true"]')?.focus()
      }, 0)
      return
    }

    setStatus('sending')
    timer.current = window.setTimeout(() => {
      setReference(`${tab === 'event' ? 'EVT' : 'SPC'}-${String(Date.now()).slice(-5)}`)
      setStatus('done')
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 800)
  }

  if (status === 'done') {
    return (
      <section className="section" ref={topRef}>
        <div className="container post-success">
          <span className="post-success__icon"><Check size={30} aria-hidden="true" /></span>
          <p className="eyebrow eyebrow--blue">ส่งประกาศเรียบร้อย</p>
          <h1>ขอบคุณ! ประกาศของคุณอยู่ระหว่างตรวจสอบ</h1>
          <p>
            ทีมงานจะตรวจสอบข้อมูลและเผยแพร่ภายใน 1 วันทำการ
            หมายเลขอ้างอิงของคุณคือ <strong>{reference}</strong>
          </p>
          <div className="post-success__summary">
            <span>{tab === 'event' ? 'ประกาศงาน' : 'ประกาศพื้นที่'}</span>
            <strong>{values.title}</strong>
            <span>{values.province}</span>
          </div>
          <div className="post-success__actions">
            <button type="button" className="btn btn--outline" onClick={() => switchTab(tab)}>
              ลงประกาศอีกครั้ง
            </button>
            <Link to="/" className="btn btn--primary">
              กลับหน้าหลัก <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const isEvent = tab === 'event'
  const errorProps = (field) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `${uid}-${field}-error` : undefined,
  })
  const errorNode = (field) =>
    errors[field] ? (
      <p className="field__error" id={`${uid}-${field}-error`}>
        {errors[field]}
      </p>
    ) : null

  return (
    <>
      <section className="page-head page-head--post">
        <div className="container">
          <nav className="breadcrumb" aria-label="เส้นทางนำทาง">
            <Link to="/">หน้าหลัก</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">ลงประกาศ</span>
          </nav>
          <p className="eyebrow eyebrow--red">POST AN EVENT</p>
          <h1>ลงประกาศงาน<br />หรือพื้นที่ของคุณ</h1>
          <p className="page-head__lead">
            ลงประกาศฟรี ใช้เวลาไม่ถึง 5 นาที
            และให้คนที่ใช่ค้นพบคุณได้ทันที
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container post-layout">
          <div className="post-form-wrap">
            <div className="tabs" role="group" aria-label="ประเภทประกาศ">
              <button
                type="button"
                aria-pressed={isEvent}
                className={isEvent ? 'is-active' : ''}
                onClick={() => switchTab('event')}
              >
                <CalendarDays size={17} aria-hidden="true" /> ประกาศงานอีเวนต์
              </button>
              <button
                type="button"
                aria-pressed={!isEvent}
                className={!isEvent ? 'is-active' : ''}
                onClick={() => switchTab('space')}
              >
                <Sparkles size={17} aria-hidden="true" /> ประกาศพื้นที่ / บูธ
              </button>
            </div>

            <form className="post-form" onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>
                  <span>01</span> ข้อมูล{isEvent ? 'งาน' : 'พื้นที่'}
                </legend>

                <div className="field">
                  <label htmlFor={`${uid}-title`}>{isEvent ? 'ชื่องาน' : 'ชื่อพื้นที่'} <span aria-hidden="true">*</span></label>
                  <input
                    id={`${uid}-title`}
                    type="text"
                    value={values.title}
                    onChange={(event) => update('title', event.target.value)}
                    placeholder={isEvent ? 'เช่น งานวัดไทรม้า ประจำปี 2569' : 'เช่น The White Loft'}
                    {...errorProps('title')}
                    required
                  />
                  {errorNode('title')}
                </div>

                {isEvent ? (
                  <>
                    <div className="field-row field-row--3">
                      <div className="field">
                        <label htmlFor={`${uid}-category`}>ประเภทงาน</label>
                        <select
                          id={`${uid}-category`}
                          value={values.category}
                          onChange={(event) => update('category', event.target.value)}
                        >
                          {categories.slice(1).map((category) => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor={`${uid}-start`}>วันที่เริ่ม <span aria-hidden="true">*</span></label>
                        <input
                          id={`${uid}-start`}
                          type="date"
                          value={values.start}
                          onChange={(event) => update('start', event.target.value)}
                          {...errorProps('start')}
                          required
                        />
                        {errorNode('start')}
                      </div>
                      <div className="field">
                        <label htmlFor={`${uid}-end`}>วันที่สิ้นสุด</label>
                        <input
                          id={`${uid}-end`}
                          type="date"
                          value={values.end}
                          min={values.start || undefined}
                          onChange={(event) => update('end', event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="field-row">
                      <div className="field">
                        <label htmlFor={`${uid}-province`}>จังหวัด <span aria-hidden="true">*</span></label>
                        <select
                          id={`${uid}-province`}
                          value={values.province}
                          onChange={(event) => update('province', event.target.value)}
                        >
                          {provinces.slice(1).map((province) => (
                            <option key={province} value={province}>{province}</option>
                          ))}
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor={`${uid}-venue`}>สถานที่จัดงาน <span aria-hidden="true">*</span></label>
                        <input
                          id={`${uid}-venue`}
                          type="text"
                          value={values.venue}
                          onChange={(event) => update('venue', event.target.value)}
                          placeholder="ชื่อสถานที่และที่อยู่โดยย่อ"
                          {...errorProps('venue')}
                          required
                        />
                        {errorNode('venue')}
                      </div>
                    </div>

                    <div className="field-row">
                      <div className="field">
                        <label htmlFor={`${uid}-time`}>เวลาเปิด–ปิด</label>
                        <input
                          id={`${uid}-time`}
                          type="text"
                          value={values.time}
                          onChange={(event) => update('time', event.target.value)}
                          placeholder="เช่น 16:00 – 23:00 น."
                        />
                      </div>
                      <div className="field">
                        <label htmlFor={`${uid}-price`}>ค่าเข้าชม</label>
                        <input
                          id={`${uid}-price`}
                          type="text"
                          value={values.price}
                          onChange={(event) => update('price', event.target.value)}
                          placeholder="เช่น ฟรีเข้าชม หรือ เริ่ม 150 บาท"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="field-row field-row--3">
                      <div className="field">
                        <label htmlFor={`${uid}-type`}>ประเภทพื้นที่</label>
                        <select
                          id={`${uid}-type`}
                          value={values.type}
                          onChange={(event) => update('type', event.target.value)}
                        >
                          {spaceTypes.slice(1).map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor={`${uid}-mode`}>ประกาศ</label>
                        <select
                          id={`${uid}-mode`}
                          value={values.mode}
                          onChange={(event) => update('mode', event.target.value)}
                        >
                          <option value="rent">ให้เช่า</option>
                          <option value="sell">ขาย</option>
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor={`${uid}-price`}>ราคา (บาท) <span aria-hidden="true">*</span></label>
                        <input
                          id={`${uid}-price`}
                          type="number"
                          inputMode="numeric"
                          min="0"
                          value={values.price}
                          onChange={(event) => update('price', event.target.value)}
                          placeholder="เช่น 45000"
                          {...errorProps('price')}
                          required
                        />
                        {errorNode('price')}
                      </div>
                    </div>

                    <div className="field-row field-row--3">
                      <div className="field">
                        <label htmlFor={`${uid}-province`}>จังหวัด <span aria-hidden="true">*</span></label>
                        <select
                          id={`${uid}-province`}
                          value={values.province}
                          onChange={(event) => update('province', event.target.value)}
                        >
                          {provinces.slice(1).map((province) => (
                            <option key={province} value={province}>{province}</option>
                          ))}
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor={`${uid}-area`}>ขนาดพื้นที่</label>
                        <input
                          id={`${uid}-area`}
                          type="text"
                          value={values.area}
                          onChange={(event) => update('area', event.target.value)}
                          placeholder="เช่น 800 ตร.ม."
                        />
                      </div>
                      <div className="field">
                        <label htmlFor={`${uid}-capacity`}>รองรับคน</label>
                        <input
                          id={`${uid}-capacity`}
                          type="text"
                          value={values.capacity}
                          onChange={(event) => update('capacity', event.target.value)}
                          placeholder="เช่น 500 คน"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor={`${uid}-address`}>ที่อยู่โดยละเอียด <span aria-hidden="true">*</span></label>
                      <input
                        id={`${uid}-address`}
                        type="text"
                        value={values.address}
                        onChange={(event) => update('address', event.target.value)}
                        placeholder="เลขที่ ถนน แขวง/ตำบล เขต/อำเภอ"
                        {...errorProps('address')}
                        required
                      />
                      {errorNode('address')}
                    </div>
                  </>
                )}

                <div className="field">
                  <label htmlFor={`${uid}-description`}>รายละเอียด <span aria-hidden="true">*</span></label>
                  <textarea
                    id={`${uid}-description`}
                    rows="5"
                    value={values.description}
                    onChange={(event) => update('description', event.target.value)}
                    placeholder={isEvent ? 'เล่าเกี่ยวกับงาน ไฮไลต์ และสิ่งที่ผู้เข้าชมจะได้พบ' : 'เล่าจุดเด่นของพื้นที่ สิ่งอำนวยความสะดวก และเงื่อนไขการใช้งาน'}
                    {...errorProps('description')}
                    required
                  />
                  {errorNode('description')}
                </div>

                <div className="field">
                  <span className="field__label">รูปภาพประกอบ</span>
                  <label className={`upload ${preview ? 'has-preview' : ''}`} htmlFor={`${uid}-image`}>
                    {preview ? (
                      <>
                        <img src={preview} alt="ตัวอย่างรูปที่เลือก" />
                        <span className="upload__change">เปลี่ยนรูป</span>
                      </>
                    ) : (
                      <>
                        <ImagePlus size={26} aria-hidden="true" />
                        <strong>ลากรูปมาวาง หรือเลือกไฟล์</strong>
                        <span>JPG หรือ PNG ขนาดไม่เกิน 5MB · แนะนำ 1600×900 px</span>
                      </>
                    )}
                    <input id={`${uid}-image`} type="file" accept="image/*" onChange={handleFile} className="sr-only" />
                  </label>
                  {preview && (
                    <button
                      type="button"
                      className="upload__remove"
                      onClick={() => {
                        URL.revokeObjectURL(previewRef.current)
                        previewRef.current = ''
                        setPreview('')
                      }}
                    >
                      <X size={14} aria-hidden="true" /> ลบรูป
                    </button>
                  )}
                </div>
              </fieldset>

              <fieldset>
                <legend><span>02</span> ข้อมูลผู้ติดต่อ</legend>
                <div className="field-row field-row--3">
                  <div className="field">
                    <label htmlFor={`${uid}-name`}>ชื่อผู้ติดต่อ <span aria-hidden="true">*</span></label>
                    <input
                      id={`${uid}-name`}
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(event) => update('name', event.target.value)}
                      placeholder="ชื่อ–นามสกุล"
                      {...errorProps('name')}
                      required
                    />
                    {errorNode('name')}
                  </div>
                  <div className="field">
                    <label htmlFor={`${uid}-phone`}>เบอร์โทรศัพท์ <span aria-hidden="true">*</span></label>
                    <input
                      id={`${uid}-phone`}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(event) => update('phone', event.target.value)}
                      placeholder="08X-XXX-XXXX"
                      {...errorProps('phone')}
                      required
                    />
                    {errorNode('phone')}
                  </div>
                  <div className="field">
                    <label htmlFor={`${uid}-email`}>อีเมล <span aria-hidden="true">*</span></label>
                    <input
                      id={`${uid}-email`}
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(event) => update('email', event.target.value)}
                      placeholder="you@example.com"
                      {...errorProps('email')}
                      required
                    />
                    {errorNode('email')}
                  </div>
                </div>
                <p className="post-form__note">
                  <Info size={15} aria-hidden="true" /> ข้อมูลติดต่อจะแสดงเฉพาะผู้ที่ส่งคำขอเท่านั้น
                </p>
              </fieldset>

              <div className="post-form__actions">
                <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <><LoaderCircle size={18} className="spin" aria-hidden="true" /> กำลังส่งประกาศ...</>
                  ) : (
                    <><Send size={17} aria-hidden="true" /> ส่งประกาศ</>
                  )}
                </button>
                <Link to="/" className="btn btn--ghost">
                  <ArrowLeft size={16} aria-hidden="true" /> ยกเลิก
                </Link>
              </div>
            </form>
          </div>

          <aside className="post-aside">
            <div className="post-tips">
              <p className="eyebrow eyebrow--red">ก่อนลงประกาศ</p>
              <h2>ทำให้ประกาศของคุณ<br />น่าสนใจกว่าเดิม</h2>
              <ul>
                <li>
                  <span>01</span>
                  <div>
                    <strong>ใส่รูปคุณภาพสูง</strong>
                    <p>รูปแนวนอน 1600×900 px ช่วยให้ประกาศโดดเด่นขึ้น 2 เท่า</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>เขียนรายละเอียดให้ครบ</strong>
                    <p>ระบุไฮไลต์ ราคา และสิ่งที่รวมอยู่ในแพ็กเกจ</p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <strong>ตอบกลับไว</strong>
                    <p>ประกาศที่ตอบกลับภายใน 1 วันมีโอกาสปิดดีลสูงกว่า 60%</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="post-help">
              <h3>ต้องการความช่วยเหลือ?</h3>
              <p>ทีมงานพร้อมช่วยคุณลงประกาศให้เสร็จภายใน 1 วันทำการ</p>
              <Link to="/about#contact" className="link-arrow">
                ติดต่อทีมงาน <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
