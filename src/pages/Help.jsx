import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeftRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  CreditCard,
  HelpCircle,
  Mail,
  MapPin,
  Search,
  UserRound,
} from 'lucide-react'
import { helpCategories, helpFaqs } from '../data/dashboard'

const categoryIcons = {
  start: BookOpen,
  post: MapPin,
  space: ArrowLeftRight,
  account: UserRound,
}

export default function Help() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [openId, setOpenId] = useState('h1')

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return helpFaqs.filter((item) => {
      if (category !== 'all' && item.category !== category) return false
      if (!needle) return true
      return `${item.q} ${item.a}`.toLowerCase().includes(needle)
    })
  }, [query, category])

  return (
    <>
      <section className="page-head page-head--help">
        <div className="container">
          <nav className="breadcrumb" aria-label="เส้นทางนำทาง">
            <Link to="/">หน้าหลัก</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">ศูนย์ช่วยเหลือ</span>
          </nav>
          <p className="eyebrow eyebrow--red">HELP CENTER</p>
          <h1>มีคำถาม?<br />เรามีคำตอบ</h1>
          <p className="page-head__lead">
            ค้นหาวิธีใช้งานการลงประกาศ การจัดการพื้นที่ และบัญชีของคุณ
            หรือติดต่อทีมงานได้โดยตรง
          </p>

          <div className="help-search">
            <Search size={19} aria-hidden="true" />
            <label className="sr-only" htmlFor="help-search-input">ค้นหาคำถาม</label>
            <input
              id="help-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ค้นหา เช่น ลงประกาศ, พื้นที่, รหัสผ่าน..."
            />
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="help-categories">
            <button
              type="button"
              className={`help-cat ${category === 'all' ? 'is-active' : ''}`}
              onClick={() => setCategory('all')}
              aria-pressed={category === 'all'}
            >
              <span className="help-cat__icon"><HelpCircle size={20} aria-hidden="true" /></span>
              <strong>ทั้งหมด</strong>
              <span>{helpFaqs.length} คำถาม</span>
            </button>
            {helpCategories.map((item) => {
              const Icon = categoryIcons[item.id] || BookOpen
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`help-cat ${category === item.id ? 'is-active' : ''}`}
                  onClick={() => setCategory(item.id)}
                  aria-pressed={category === item.id}
                >
                  <span className="help-cat__icon"><Icon size={20} aria-hidden="true" /></span>
                  <strong>{item.label}</strong>
                  <span>{helpFaqs.filter((faq) => faq.category === item.id).length} คำถาม</span>
                </button>
              )
            })}
          </div>

          <div className="help-layout">
            <div className="help-faq">
              <div className="help-faq__head">
                <p className="eyebrow eyebrow--blue">คำถามที่พบบ่อย</p>
                <h2>{category === 'all' ? 'ทุกหัวข้อ' : helpCategories.find((item) => item.id === category)?.label}</h2>
                <p>พบ {filtered.length} คำถาม</p>
              </div>

              {filtered.length ? (
                <div className="faq-list">
                  {filtered.map((item) => {
                    const open = openId === item.id
                    return (
                      <article key={item.id} className={`faq faq--accordion ${open ? 'is-open' : ''}`}>
                        <button
                          type="button"
                          className="faq__q"
                          onClick={() => setOpenId(open ? '' : item.id)}
                          aria-expanded={open}
                          aria-controls={`faq-${item.id}`}
                        >
                          <span>{item.q}</span>
                          <ChevronDown size={18} aria-hidden="true" />
                        </button>
                        {open && (
                          <div className="faq__a" id={`faq-${item.id}`}>
                            <p>{item.a}</p>
                          </div>
                        )}
                      </article>
                    )
                  })}
                </div>
              ) : (
                <div className="empty-state">
                  <span className="empty-state__icon"><Search size={24} aria-hidden="true" /></span>
                  <h2>ไม่พบคำถามที่ตรงกัน</h2>
                  <p>ลองใช้คำค้นอื่น หรือติดต่อทีมงานเพื่อสอบถามโดยตรง</p>
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => { setQuery(''); setCategory('all') }}
                  >
                    ล้างคำค้นหา
                  </button>
                </div>
              )}
            </div>

            <aside className="help-aside">
              <section className="help-card">
                <span className="help-card__icon"><Mail size={20} aria-hidden="true" /></span>
                <h2>ยังต้องการความช่วยเหลือ?</h2>
                <p>ทีมงานตอบกลับภายใน 1 วันทำการ ทุกวันจันทร์–ศุกร์ เวลา 09:00–18:00 น.</p>
                <a href="mailto:hello@ngandee.th" className="btn btn--primary btn--block">
                  อีเมลถึงทีมงาน <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <Link to="/about#contact" className="help-card__link">
                  ช่องทางติดต่ออื่น ๆ <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </section>

              <section className="help-card help-card--soft">
                <span className="help-card__icon help-card__icon--blue"><CreditCard size={20} aria-hidden="true" /></span>
                <h2>เรื่องการชำระเงิน</h2>
                <p>ดูรายละเอียดแพ็กเกจ การเรียกเก็บเงิน และคำถามเกี่ยวกับใบเสร็จ</p>
                <Link to="/pricing" className="link-arrow">
                  ดูแพ็กเกจราคา <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
