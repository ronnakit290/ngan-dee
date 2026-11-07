import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container notfound__inner">
        <p className="notfound__code" aria-hidden="true">404</p>
        <p className="eyebrow eyebrow--red">ไม่พบหน้าที่คุณต้องการ</p>
        <h1>หลงทางนิดหน่อย<br />แต่ยังไปงานดี ๆ ได้</h1>
        <p>ลิงก์นี้อาจถูกย้ายหรือไม่มีอยู่แล้ว ลองกลับไปเริ่มจากหน้าหลักหรือค้นหางานที่ใช่</p>
        <div className="notfound__actions">
          <Link to="/events" className="btn btn--primary">
            <Compass size={17} aria-hidden="true" /> ค้นหางาน
          </Link>
          <Link to="/" className="btn btn--outline">
            <Home size={17} aria-hidden="true" /> กลับหน้าหลัก
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
