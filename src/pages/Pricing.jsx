import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { pricingFaqs, pricingPlans } from '../data/dashboard'
import { thaiNumber } from '../lib/format'

export default function Pricing() {
  const { isAuthenticated } = useAuth()
  const [billing, setBilling] = useState('monthly')

  const ctaFor = (plan) => {
    if (isAuthenticated) return '/dashboard'
    if (plan.id === 'free') return '/register'
    return '/register'
  }

  return (
    <>
      <section className="page-head page-head--pricing">
        <div className="container pricing-head">
          <div>
            <nav className="breadcrumb" aria-label="เส้นทางนำทาง">
              <Link to="/">หน้าหลัก</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">แพ็กเกจราคา</span>
            </nav>
            <p className="eyebrow eyebrow--red">PRICING</p>
            <h1>แพ็กเกจที่พอดีกับ<br />ทุกขนาดของงาน</h1>
            <p className="page-head__lead">
              เริ่มฟรี ลงประกาศได้ทันที และอัปเกรดเมื่อพร้อม
              ไม่มีค่าธรรมเนียมแอบแฝง ไม่มี commission
            </p>
          </div>
          <div className="billing-toggle" role="group" aria-label="รอบการชำระเงิน">
            <button
              type="button"
              className={billing === 'monthly' ? 'is-active' : ''}
              onClick={() => setBilling('monthly')}
              aria-pressed={billing === 'monthly'}
            >
              รายเดือน
            </button>
            <button
              type="button"
              className={billing === 'yearly' ? 'is-active' : ''}
              onClick={() => setBilling('yearly')}
              aria-pressed={billing === 'yearly'}
            >
              รายปี <span>ประหยัด 20%</span>
            </button>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="pricing-grid">
            {pricingPlans.map((plan) => {
              const price = billing === 'monthly' ? plan.monthly : plan.yearly
              return (
                <article key={plan.id} className={`pricing-card ${plan.featured ? 'is-featured' : ''}`}>
                  {plan.featured && (
                    <span className="pricing-card__badge">
                      <Sparkles size={13} aria-hidden="true" /> แนะนำ
                    </span>
                  )}
                  <h2>{plan.name}</h2>
                  <p className="pricing-card__tagline">{plan.tagline}</p>

                  <p className="pricing-card__price">
                    ฿{thaiNumber(price)}
                    <span>{plan.monthly === 0 ? 'ตลอดไป' : billing === 'monthly' ? '/ เดือน' : '/ ปี'}</span>
                  </p>
                  {billing === 'yearly' && plan.monthly > 0 && (
                    <p className="pricing-card__save">
                      เทียบเท่า ฿{thaiNumber(Math.round(plan.yearly / 12))} / เดือน
                    </p>
                  )}

                  <Link
                    to={ctaFor(plan)}
                    className={`btn ${plan.featured ? 'btn--primary' : 'btn--outline'} btn--block`}
                  >
                    {isAuthenticated ? 'ไปที่แดชบอร์ด' : plan.cta} <ArrowRight size={16} aria-hidden="true" />
                  </Link>

                  <ul className="pricing-card__features">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <span><Check size={14} aria-hidden="true" /></span> {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>

          <p className="pricing-note">
            ราคาแสดงเป็นเงินบาทไทย · หน้านี้เป็นตัวอย่าง ยังไม่มีการเรียกเก็บเงินจริง
          </p>

          <div className="pricing-faq">
            <div className="pricing-faq__head">
              <p className="eyebrow eyebrow--blue">คำถามที่พบบ่อย</p>
              <h2>เรื่องที่คนมักถามก่อนสมัคร</h2>
            </div>
            <div className="faq-list">
              {pricingFaqs.map((item, index) => (
                <details key={item.q} className="faq" open={index === 0}>
                  <summary>
                    {item.q}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="pricing-cta">
            <div>
              <p className="eyebrow eyebrow--light">ยังไม่แน่ใจ?</p>
              <h2>เริ่มจากแพ็กเกจฟรี<br />แล้วอัปเกรดเมื่อพร้อม</h2>
              <p>ลงประกาศ 3 รายการแรกฟรี ไม่ต้องใช้บัตรเครดิต</p>
            </div>
            <Link to={isAuthenticated ? '/dashboard' : '/register'} className="btn btn--white">
              เริ่มใช้งานฟรี <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
