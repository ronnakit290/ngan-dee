import { Link } from 'react-router-dom'
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react'
import Logo from './Logo'
import { asset } from '../lib/asset'

const copy = {
  login: {
    title: 'กลับมาดูแลงานของคุณ',
    text: 'จัดการประกาศ ข้อความสอบถาม และสถิติทั้งหมดของงานและพื้นที่คุณในแดชบอร์ดเดียว',
    points: ['ดูสถิติผู้เข้าชมแบบเรียลไทม์', 'ตอบข้อความสอบถามได้ในที่เดียว', 'จัดการประกาศและบูธได้ทุกที่'],
  },
  register: {
    title: 'เริ่มต้นจัดงานอย่างมืออาชีพ',
    text: 'สร้างบัญชีฟรี ลงประกาศงานหรือพื้นที่ของคุณ แล้วให้คนที่ใช่ค้นพบคุณได้ทันที',
    points: ['ลงประกาศฟรี 3 รายการแรก', 'โปรไฟล์ผู้จัดงานสาธารณะ', 'แดชบอร์ดจัดการงานครบในที่เดียว'],
  },
  forgot: {
    title: 'กลับเข้าสู่บัญชีของคุณ',
    text: 'ไม่ต้องกังวล เราจะช่วยคุณตั้งรหัสผ่านใหม่ด้วยขั้นตอนง่าย ๆ ไม่กี่ขั้นตอน',
    points: ['ตรวจสอบอีเมลเพื่อรับลิงก์', 'ตั้งรหัสผ่านใหม่ได้ทันที', 'ทีมงานพร้อมช่วยเหลือ'],
  },
}

export default function AuthShell({ variant = 'login', children }) {
  const content = copy[variant] || copy.login

  return (
    <div className="auth">
      <aside className="auth__aside">
        <img
          className="auth__bg"
          src={asset('/images/event-community.webp')}
          alt=""
          width="1200"
          height="900"
          aria-hidden="true"
        />
        <div className="auth__overlay" aria-hidden="true" />
        <div className="auth__aside-inner">
          <div className="auth__brand">
            <Logo light />
          </div>

          <div className="auth__aside-copy">
            <p className="eyebrow eyebrow--light">NGAN DEE WORKSPACE</p>
            <h1>{content.title}</h1>
            <p>{content.text}</p>
            <ul>
              {content.points.map((point) => (
                <li key={point}>
                  <Check size={15} aria-hidden="true" /> {point}
                </li>
              ))}
            </ul>
          </div>

          <figure className="auth__quote">
            <blockquote>
              &ldquo;ลงประกาศพื้นที่ฮอลล์ของเรา แล้วมีดีลเข้ามาภายในสัปดาห์เดียว
              ตอนนี้ใช้แดชบอร์ดงานดีทุกฤดูกาล&rdquo;
            </blockquote>
            <figcaption>
              <span className="auth__quote-avatar" aria-hidden="true">ณส</span>
              <span>
                <strong>ณัฐพล ส.</strong>
                <small>ผู้จัดการ The White Loft</small>
              </span>
            </figcaption>
          </figure>
        </div>
      </aside>

      <div className="auth__panel">
        <div className="auth__panel-top">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> กลับหน้าหลัก
          </Link>
          <span className="auth__secure">
            <ShieldCheck size={15} aria-hidden="true" /> ระบบสาธิต
          </span>
        </div>

        <div className="auth__form-wrap">{children}</div>

        <p className="auth__foot">© 2569 งานดี · เว็บไซต์ตัวอย่างเพื่อการสาธิต</p>
      </div>
    </div>
  )
}
