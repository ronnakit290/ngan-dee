import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Facebook, Instagram, Mail, Phone, Send } from 'lucide-react'
import Logo from './Logo'

const footerColumns = [
  {
    title: 'ค้นหางาน',
    links: [
      { label: 'งานวัด', to: '/events?cat=งานวัด' },
      { label: 'เทศกาล', to: '/events?cat=เทศกาล' },
      { label: 'คอนเสิร์ต', to: '/events?cat=คอนเสิร์ต' },
      { label: 'ตลาดนัด', to: '/events?cat=ตลาดนัด' },
    ],
  },
  {
    title: 'พื้นที่และบูธ',
    links: [
      { label: 'ฮอลล์และสตูดิโอ', to: '/spaces?type=ฮอลล์' },
      { label: 'ลานกลางแจ้ง', to: '/spaces?type=ลาน' },
      { label: 'บูธขาย/ให้เช่า', to: '/spaces?type=บูธ' },
      { label: 'ลงประกาศพื้นที่', to: '/post?tab=space' },
    ],
  },
  {
    title: 'งานดี',
    links: [
      { label: 'เกี่ยวกับเรา', to: '/about' },
      { label: 'ลงประกาศงาน', to: '/post' },
      { label: 'งานที่บันทึกไว้', to: '/events?saved=1' },
      { label: 'ติดต่อทีมงาน', to: '/about#contact' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(event) {
    event.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo light />
            <p>
              ศูนย์รวมประกาศงานอีเวนต์และพื้นที่จัดงานทั่วไทย
              ให้คุณค้นพบงานดี ๆ และพื้นที่ที่ใช่ในที่เดียว
            </p>
            <div className="footer__social" aria-label="โซเชียลมีเดีย">
              <a className="footer__social-btn" href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook size={18} aria-hidden="true" />
              </a>
              <a className="footer__social-btn" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a className="footer__social-btn" href="mailto:hello@ngandee.th" aria-label="อีเมล">
                <Mail size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="footer__columns">
            {footerColumns.map((column) => (
              <div key={column.title} className="footer__column">
                <h3>{column.title}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer__newsletter">
            <h3>รับงานใหม่ทุกสัปดาห์</h3>
            <p>สรุปงานน่าสนใจและพื้นที่ว่าง ส่งตรงถึงอีเมลคุณทุกวันพฤหัสบดี</p>
            {subscribed ? (
              <p className="footer__subscribed" role="status">
                <Check size={18} aria-hidden="true" /> สมัครเรียบร้อยแล้ว ขอบคุณค่ะ
              </p>
            ) : (
              <form className="footer__form" onSubmit={handleSubscribe}>
                <label className="sr-only" htmlFor="newsletter-email">
                  อีเมล
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="อีเมลของคุณ"
                  required
                />
                <button type="submit" className="footer__submit" aria-label="สมัครรับข่าวสาร">
                  <Send size={18} aria-hidden="true" />
                </button>
              </form>
            )}
            <div className="footer__contact">
              <a href="tel:+6620000000">
                <Phone size={16} aria-hidden="true" /> 02 000 0000
              </a>
              <Link to="/post">
                ลงประกาศฟรี <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2569 งานดี · สงวนลิขสิทธิ์</p>
          <p>
            ภาพประกอบจาก <a href="https://unsplash.com" target="_blank" rel="noreferrer">Unsplash</a>
            {' '}และ{' '}
            <a
              href="https://commons.wikimedia.org/wiki/File:Festival_Yi_Peng._ChiangMai,_Tailandia._(16786888573).jpg"
              target="_blank"
              rel="noreferrer"
            >
              Wikimedia Commons
            </a>{' '}
            (CC BY-SA 2.0) · เว็บไซต์ตัวอย่างเพื่อการสาธิต
          </p>
        </div>
      </div>
    </footer>
  )
}
