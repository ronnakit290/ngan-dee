import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import { asset } from '../lib/asset'

const values = [
  {
    icon: Sparkles,
    title: 'คัดสรรอย่างตั้งใจ',
    text: 'ทุกงานและทุกพื้นที่ผ่านการตรวจสอบข้อมูลก่อนเผยแพร่ เพื่อให้คุณตัดสินใจได้อย่างมั่นใจ',
  },
  {
    icon: HeartHandshake,
    title: 'ชุมชนเป็นหัวใจ',
    text: 'เราเชื่อว่างานท้องถิ่นคือหัวใจของวัฒนธรรมไทย จึงให้พื้นที่กับงานวัด งานชุมชน และงานประจำปีอย่างเต็มที่',
  },
  {
    icon: ShieldCheck,
    title: 'โปร่งใส ไร้ค่าธรรมเนียมแอบแฝง',
    text: 'ลงประกาศฟรี ไม่มี commission และแสดงข้อมูลราคาอย่างตรงไปตรงมา',
  },
]

const stats = [
  { value: '860+', label: 'งานอีเวนต์ในระบบ' },
  { value: '320+', label: 'พื้นที่และบูธ' },
  { value: '45', label: 'จังหวัดทั่วไทย' },
  { value: '1.2 ล้าน', label: 'ผู้เข้าชมต่อปี' },
]

export default function About() {
  return (
    <>
      <section className="page-head page-head--about">
        <div className="container page-head__inner">
          <div>
            <nav className="breadcrumb" aria-label="เส้นทางนำทาง">
              <Link to="/">หน้าหลัก</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">เกี่ยวกับเรา</span>
            </nav>
            <p className="eyebrow eyebrow--red">ABOUT NGAN DEE</p>
            <h1>งานดี<br />คือพื้นที่ของทุกงานดี ๆ</h1>
            <p className="page-head__lead">
              เราเชื่อว่าทุกงานมีเรื่องเล่า และทุกพื้นที่ว่างมีศักยภาพ
              งานดีจึงเกิดขึ้นเพื่อเชื่อมคนจัดงาน คนเที่ยวงาน
              และเจ้าของพื้นที่เข้าหากันอย่างเรียบง่ายและโปร่งใส
            </p>
          </div>
          <div className="page-head__aside page-head__aside--light">
            <p><strong>2567</strong> เริ่มต้นที่กรุงเทพฯ</p>
            <p><strong>4,000+</strong> ผู้จัดงานในเครือข่าย</p>
            <p><strong>100%</strong> ลงประกาศฟรี</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-intro">
          <Reveal className="about-intro__media">
            <img
              src={asset('/images/about-hall.webp')}
              alt="ฮอลล์จัดงานสีขาวขนาดใหญ่บรรยากาศโปร่งสบาย"
              width="1600"
              height="1000"
              loading="lazy"
              decoding="async"
            />
            <div className="about-intro__stamp" aria-hidden="true">
              <strong>งานดี</strong>
              <span>EVENT MARKETPLACE</span>
            </div>
          </Reveal>
          <Reveal className="about-intro__copy" delay={80}>
            <p className="eyebrow eyebrow--blue">เรื่องราวของเรา</p>
            <h2>เริ่มจากคำถามง่าย ๆ ว่า<br />&ldquo;งานถัดไปจะไปที่ไหนดี?&rdquo;</h2>
            <p>
              งานดีเริ่มต้นในปี 2567 จากปัญหาที่คนไทยเจอทุกฤดูกาล —
              ข้อมูลงานกระจายอยู่ตามโซเชียลมีเดีย โทรหาผู้จัดก็ยาก
              และคนที่มีพื้นที่ว่างก็ไม่รู้จะประกาศที่ไหน
            </p>
            <p>
              เราจึงสร้างพื้นที่กลางที่รวมงานวัด งานประจำปี เทศกาล คอนเสิร์ต
              ตลาดนัด และพื้นที่จัดงานไว้ในที่เดียว
              พร้อมระบบค้นหาและติดต่อที่ใช้งานง่ายทั้งบนมือถือและคอมพิวเตอร์
            </p>
            <Link to="/events" className="btn btn--primary">
              เริ่มค้นหางาน <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--flush">
        <div className="container">
          <div className="stats-band">
            {stats.map((item) => (
              <div key={item.label} className="stats-band__item">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--red">สิ่งที่เรายึดถือ</p>
              <h2>ทำไมต้องงานดี</h2>
            </div>
          </div>
          <div className="value-grid">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Reveal key={value.title} delay={index * 70}>
                  <article className="value-card">
                    <span className="value-card__icon"><Icon size={22} aria-hidden="true" /></span>
                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow--blue">กระบวนการ</p>
              <h2>ทุกประกาศผ่านการตรวจสอบ</h2>
              <p className="section-head__text">
                เพื่อให้ข้อมูลที่คุณเห็นถูกต้องและเชื่อถือได้
              </p>
            </div>
          </div>
          <ol className="process">
            {[
              ['ส่งประกาศ', 'กรอกข้อมูลงานหรือพื้นที่ผ่านแบบฟอร์ม ใช้เวลาไม่ถึง 5 นาที'],
              ['ตรวจสอบ', 'ทีมงานตรวจสอบความถูกต้องและติดต่อยืนยันภายใน 1 วันทำการ'],
              ['เผยแพร่', 'ประกาศขึ้นระบบ พร้อมให้ผู้ที่สนใจค้นพบและส่งคำขอ'],
              ['ติดตามผล', 'ทีมงานช่วยประสานและติดตามผลจนปิดดีล'],
            ].map(([title, text], index) => (
              <li key={title}>
                <span className="process__num">0{index + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <Reveal>
            <div className="contact-band">
              <div>
                <p className="eyebrow eyebrow--light">ติดต่อเรา</p>
                <h2>อยากบอกอะไรเรา?<br />เราพร้อมฟัง</h2>
                <p>ไม่ว่าจะเป็นคำถามเรื่องการลงประกาศ การจองพื้นที่ หรือความร่วมมือ ทีมงานตอบกลับภายใน 1 วันทำการ</p>
              </div>
              <div className="contact-band__details">
                <a href="mailto:hello@ngandee.th">
                  <Mail size={19} aria-hidden="true" />
                  <span><small>อีเมล</small>hello@ngandee.th</span>
                </a>
                <a href="tel:+6620000000">
                  <Phone size={19} aria-hidden="true" />
                  <span><small>โทรศัพท์</small>02 000 0000</span>
                </a>
                <p>
                  <MapPin size={19} aria-hidden="true" />
                  <span><small>ที่ตั้ง</small>88 อาคารสุขุมวิท ชั้น 12 เขตคลองเตย กรุงเทพฯ</span>
                </p>
                <Link to="/post" className="btn btn--white">
                  ลงประกาศกับเรา <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
