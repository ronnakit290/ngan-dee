export const demoAccount = {
  id: 'acc-demo',
  name: 'พิมพ์ชนก วัฒนสุข',
  email: 'demo@ngandee.th',
  password: 'demo1234',
  role: 'organizer',
  organization: 'Studio Pim Craft',
  phone: '081-234-5678',
  bio: 'ผู้จัดงานแฮนด์เมดและตลาดสร้างสรรค์มากว่า 6 ปี ชอบงานที่ผู้คนได้พูดคุยกันจริง ๆ',
}

export const authRoles = [
  { value: 'organizer', label: 'ผู้จัดงานอีเวนต์', short: 'ผู้จัดงาน' },
  { value: 'owner', label: 'เจ้าของพื้นที่ / บูธ', short: 'เจ้าของพื้นที่' },
  { value: 'visitor', label: 'ผู้สนใจงานอีเวนต์', short: 'ผู้เข้าชมงาน' },
]

export const roleLabel = (value) =>
  authRoles.find((role) => role.value === value)?.short || 'สมาชิก'

export const statusMeta = {
  published: { label: 'เผยแพร่', tone: 'success' },
  review: { label: 'รอตรวจสอบ', tone: 'warning' },
  draft: { label: 'ฉบับร่าง', tone: 'neutral' },
  new: { label: 'ใหม่', tone: 'blue' },
  pending: { label: 'รอดำเนินการ', tone: 'warning' },
  replied: { label: 'ตอบแล้ว', tone: 'success' },
}

export const seedEvents = [
  {
    id: 'dev-1',
    slug: 'wat-sai-ma-annual-fair',
    title: 'งานวัดไทรม้า ประจำปี 2569',
    category: 'งานวัด',
    dateLabel: '4–10 ธ.ค. 2569',
    status: 'published',
    views: 3420,
    inquiries: 18,
    image: '/images/event-temple.webp',
  },
  {
    id: 'dev-2',
    slug: 'lanna-lantern-festival',
    title: 'เทศกาลโคมไฟล้านนา',
    category: 'เทศกาล',
    dateLabel: '19–28 ธ.ค. 2569',
    status: 'published',
    views: 5810,
    inquiries: 26,
    image: '/images/event-lantern.webp',
  },
  {
    id: 'dev-3',
    slug: 'creative-night-market',
    title: 'ตลาดนัดกลางคืน Creative Night',
    category: 'ตลาดนัด',
    dateLabel: '20 ธ.ค. 2569 – 31 ม.ค. 2570',
    status: 'review',
    views: 0,
    inquiries: 0,
    image: '/images/event-nightmarket.webp',
  },
  {
    id: 'dev-4',
    slug: 'suk-jai-community-fair',
    title: 'งานประจำปีชุมชนสุขใจ',
    category: 'งานประจำปี',
    dateLabel: '27 ก.พ. – 1 มี.ค. 2570',
    status: 'draft',
    views: 0,
    inquiries: 0,
    image: '/images/event-community.webp',
  },
]

export const seedSpaces = [
  {
    id: 'dsp-1',
    slug: 'the-white-loft',
    name: 'The White Loft',
    type: 'ฮอลล์',
    mode: 'rent',
    price: 45000,
    unit: 'วัน',
    status: 'published',
    views: 2140,
    inquiries: 14,
    image: '/images/space-loft.webp',
  },
  {
    id: 'dsp-2',
    slug: 'daylight-studio',
    name: 'Daylight Studio',
    type: 'สตูดิโอ',
    mode: 'rent',
    price: 8500,
    unit: 'วัน',
    status: 'published',
    views: 980,
    inquiries: 6,
    image: '/images/space-studio.webp',
  },
  {
    id: 'dsp-3',
    slug: 'market-booth-modular',
    name: 'Market Booth Modular',
    type: 'บูธ',
    mode: 'sell',
    price: 32000,
    unit: 'ครั้งเดียว',
    status: 'draft',
    views: 0,
    inquiries: 0,
    image: '/images/space-marketbooth.webp',
  },
]

export const seedInquiries = [
  {
    id: 'inq-1',
    name: 'ณัฐพล สมบูรณ์',
    initials: 'ณส',
    company: 'River Kwai Events',
    email: 'nattapon@example.com',
    phone: '081-234-5678',
    item: 'เทศกาลโคมไฟล้านนา',
    itemType: 'event',
    message:
      'สนใจจองบูธอาหารล้านนา 2 บูธ ต้องการทราบขนาดพื้นที่ ราคา และขั้นตอนการชำระเงินเพิ่มเติมค่ะ',
    date: 'วันนี้ 09:42',
    status: 'new',
  },
  {
    id: 'inq-2',
    name: 'อารียา ทองดี',
    initials: 'อท',
    company: 'อารียา แต่งงาน',
    email: 'areeya@example.com',
    phone: '089-876-5432',
    item: 'The White Loft',
    itemType: 'space',
    message:
      'ขอสอบถามพื้นที่ The White Loft สำหรับงานแต่งงาน 150 คน ในเดือนกุมภาพันธ์ค่ะ มีวันที่ว่างหรือยังคะ',
    date: 'วันนี้ 08:15',
    status: 'new',
  },
  {
    id: 'inq-3',
    name: 'ภัทรพล ใจดี',
    initials: 'ภใ',
    company: 'Slow Bar Coffee',
    email: 'patarapon@example.com',
    phone: '086-111-2233',
    item: 'ตลาดนัดกลางคืน Creative Night',
    itemType: 'event',
    message:
      'สนใจออกบูธกาแฟ 3 สัปดาห์ติดกัน ขอใบเสนอราคาและเงื่อนไขการขายเครื่องดื่มในงานด้วยครับ',
    date: 'เมื่อวาน 17:20',
    status: 'pending',
  },
  {
    id: 'inq-4',
    name: 'ศิริพร วัฒนา',
    initials: 'ศว',
    company: 'Bright Studio',
    email: 'siriporn@example.com',
    phone: '082-555-7788',
    item: 'Daylight Studio',
    itemType: 'space',
    message:
      'ต้องการเช่าสตูดิโอ 2 วันเพื่อถ่ายภาพสินค้า วันที่ 12–13 มกราคม ต้องการทราบว่ามีฉากหลังสีขาวและไฟเสริมให้ไหมคะ',
    date: 'เมื่อวาน 11:05',
    status: 'replied',
  },
  {
    id: 'inq-5',
    name: 'ธนกร มั่นคง',
    initials: 'ธม',
    company: 'Run for Hope',
    email: 'thanakorn@example.com',
    phone: '085-444-6677',
    item: 'ประกาศงานวิ่งการกุศล',
    itemType: 'event',
    message:
      'ต้องการลงประกาศงานวิ่งการกุศล 5 กม. ขอทราบขั้นตอนการลงประกาศและค่าธรรมเนียมครับ',
    date: '10 พ.ย. 09:12',
    status: 'new',
  },
  {
    id: 'inq-6',
    name: 'ปวีณา สุขใจ',
    initials: 'ปส',
    company: 'ปวีณาแฮนด์เมด',
    email: 'paweena@example.com',
    phone: '084-222-9911',
    item: 'Market Booth Modular',
    itemType: 'space',
    message:
      'สอบถามขนาดบูธ Market Booth Modular ว่าถอดประกอบใส่รถกระบะได้ไหม และมีบริการจัดส่งหรือเปล่าคะ',
    date: '9 พ.ย. 15:40',
    status: 'replied',
  },
]

export const activities = [
  {
    id: 'act-1',
    text: 'ประกาศ “เทศกาลโคมไฟล้านนา” ได้รับการเผยแพร่แล้ว',
    time: '2 ชั่วโมงที่แล้ว',
    tone: 'success',
  },
  {
    id: 'act-2',
    text: 'คุณตอบกลับข้อความจาก ณัฐพล สมบูรณ์',
    time: '4 ชั่วโมงที่แล้ว',
    tone: 'blue',
  },
  {
    id: 'act-3',
    text: 'ยอดเข้าชมประกาศวันนี้เพิ่มขึ้น 248 ครั้ง',
    time: 'เมื่อวานนี้',
    tone: 'red',
  },
  {
    id: 'act-4',
    text: 'Daylight Studio มีผู้สอบถามใหม่ 2 ราย',
    time: 'เมื่อวานนี้',
    tone: 'blue',
  },
  {
    id: 'act-5',
    text: 'อัปเดตรูปภาพประกาศ “งานวัดไทรม้า” สำเร็จ',
    time: '2 วันที่แล้ว',
    tone: 'neutral',
  },
]

export const chartSeries = {
  '7d': {
    label: '7 วัน',
    labels: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'],
    values: [420, 680, 540, 920, 1180, 1540, 1320],
    total: '6,600',
    delta: '+18.2%',
  },
  '30d': {
    label: '30 วัน',
    labels: ['1', '5', '10', '15', '20', '25', '30'],
    values: [1200, 1480, 1360, 1720, 1980, 2240, 2480],
    total: '12,460',
    delta: '+12.4%',
  },
  '12m': {
    label: '12 เดือน',
    labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
    values: [5200, 6100, 5800, 7200, 8400, 9100, 8700, 10400, 9800, 11200, 10800, 12480],
    total: '105,180',
    delta: '+24.8%',
  },
}

export const notifications = [
  {
    id: 'ntf-1',
    title: 'มีข้อความสอบถามใหม่ 3 รายการ',
    detail: 'จากงานเทศกาลโคมไฟล้านนาและ The White Loft',
    time: '10 นาทีที่แล้ว',
    tone: 'blue',
  },
  {
    id: 'ntf-2',
    title: 'ประกาศ “Creative Night” รอตรวจสอบ',
    detail: 'ทีมงานจะตรวจสอบภายใน 1 วันทำการ',
    time: '1 ชั่วโมงที่แล้ว',
    tone: 'warning',
  },
  {
    id: 'ntf-3',
    title: 'ยอดเข้าชมสัปดาห์นี้เพิ่มขึ้น 18%',
    detail: 'ประกาศของคุณมีผู้เข้าชม 6,600 ครั้ง',
    time: 'เมื่อวานนี้',
    tone: 'success',
  },
]

export const pricingPlans = [
  {
    id: 'free',
    name: 'ฟรี',
    tagline: 'เริ่มต้นลงประกาศงานแรก',
    monthly: 0,
    yearly: 0,
    featured: false,
    cta: 'เริ่มใช้ฟรี',
    features: [
      'ลงประกาศได้ 3 รายการ',
      'กล่องข้อความสอบถามพื้นฐาน',
      'โปรไฟล์ผู้จัดงานสาธารณะ',
      'สถิติผู้เข้าชม 7 วัน',
    ],
  },
  {
    id: 'pro',
    name: 'โปร',
    tagline: 'สำหรับผู้จัดงานที่จัดเป็นประจำ',
    monthly: 590,
    yearly: 5664,
    featured: true,
    cta: 'ทดลองใช้ฟรี 14 วัน',
    features: [
      'ลงประกาศไม่จำกัด',
      'ไฮไลต์ประกาศ 5 รายการ',
      'สถิติเชิงลึกและรายงานรายเดือน',
      'ป้ายยืนยันผู้จัดงาน',
      'ตอบกลับข้อความได้ไม่จำกัด',
    ],
  },
  {
    id: 'business',
    name: 'ธุรกิจ',
    tagline: 'สำหรับทีมและสถานที่จัดงาน',
    monthly: 1590,
    yearly: 15264,
    featured: false,
    cta: 'คุยกับทีมขาย',
    features: [
      'ทุกอย่างในแพ็กเกจโปร',
      'สมาชิกในทีม 5 คน',
      'จัดการหลายพื้นที่และหลายงาน',
      'API และรายงานส่งออก',
      'ผู้จัดการบัญชีเฉพาะ',
    ],
  },
]

export const pricingFaqs = [
  {
    q: 'แพ็กเกจฟรีมีข้อจำกัดอะไรบ้าง?',
    a: 'ลงประกาศได้ไม่เกิน 3 รายการ ดูสถิติย้อนหลัง 7 วัน และใช้กล่องข้อความพื้นฐานได้ ไม่มีค่าธรรมเนียมแอบแฝง',
  },
  {
    q: 'เปลี่ยนหรือยกเลิกแพ็กเกจได้เมื่อไหร่?',
    a: 'เปลี่ยนแพ็กเกจได้ทุกเมื่อ มีผลในรอบบิลถัดไป ยกเลิกได้ตลอดเวลาโดยไม่ต้องแจ้งล่วงหน้า',
  },
  {
    q: 'ชำระเงินด้วยวิธีไหนได้บ้าง?',
    a: 'ในเวอร์ชันจริงรองรับบัตรเครดิต โอนผ่านธนาคาร และพร้อมเพย์ ส่วนหน้านี้เป็นตัวอย่างจึงยังไม่มีการเรียกเก็บเงิน',
  },
  {
    q: 'มีส่วนลดสำหรับงานชุมชนหรือไม่?',
    a: 'มีค่ะ งานวัด งานชุมชน และงานไม่แสวงหากำไรสามารถสมัครแพ็กเกจฟรีแบบขยายเวลาได้ ติดต่อทีมงานเพื่อขอรายละเอียด',
  },
]

export const helpCategories = [
  { id: 'start', label: 'เริ่มต้นใช้งาน', count: 4 },
  { id: 'post', label: 'การลงประกาศ', count: 5 },
  { id: 'space', label: 'พื้นที่และบูธ', count: 4 },
  { id: 'account', label: 'บัญชีและการชำระเงิน', count: 3 },
]

export const helpFaqs = [
  {
    id: 'h1',
    category: 'start',
    q: 'เริ่มลงประกาศงานแรกต้องทำอะไรบ้าง?',
    a: 'สมัครสมาชิกหรือเข้าสู่ระบบด้วยบัญชีทดลอง จากนั้นไปที่ “ลงประกาศ” กรอกข้อมูลงาน ใส่วันที่ สถานที่ และรายละเอียด จากนั้นกดส่งประกาศ ทีมงานจะตรวจสอบภายใน 1 วันทำการ',
  },
  {
    id: 'h2',
    category: 'start',
    q: 'งานดีใช้ฟรีจริงหรือไม่?',
    a: 'แพ็กเกจฟรีลงประกาศได้ 3 รายการโดยไม่เสียค่าใช้จ่าย และไม่มี commission จากการจองพื้นที่หรือบูธ',
  },
  {
    id: 'h3',
    category: 'start',
    q: 'ดูประกาศของตัวเองได้ที่ไหน?',
    a: 'หลังเข้าสู่ระบบ ไปที่เมนู “แดชบอร์ด” แล้วเลือก “งานของฉัน” หรือ “พื้นที่ของฉัน” คุณจะเห็นสถานะผู้เข้าชม และข้อความสอบถามทั้งหมด',
  },
  {
    id: 'h4',
    category: 'start',
    q: 'รองรับการใช้งานบนมือถือหรือไม่?',
    a: 'รองรับทุกหน้าจอตั้งแต่ 320px ขึ้นไป ทั้งการค้นหางาน ลงประกาศ และจัดการประกาศในแดชบอร์ด',
  },
  {
    id: 'h5',
    category: 'post',
    q: 'ประกาศของฉันใช้เวลาตรวจสอบนานแค่ไหน?',
    a: 'โดยปกติภายใน 1 วันทำการ หากข้อมูลครบถ้วน ประกาศจะถูกเผยแพร่ทันที และคุณจะได้รับแจ้งเตือนในแดชบอร์ด',
  },
  {
    id: 'h6',
    category: 'post',
    q: 'แก้ไขประกาศที่เผยแพร่แล้วได้ไหม?',
    a: 'ได้ค่ะ ไปที่ “งานของฉัน” เลือกประกาศ แล้วกดแก้ไข การแก้ไขจะเข้าสู่การตรวจสอบอีกครั้งก่อนเผยแพร่',
  },
  {
    id: 'h7',
    category: 'post',
    q: 'ทำไมประกาศของฉันไม่แสดงในผลค้นหา?',
    a: 'ตรวจสอบว่าสถานะเป็น “เผยแพร่” แล้ว และข้อมูลหมวดหมู่ จังหวัด และวันที่ไม่ขัดกัน หากยังไม่พบ ติดต่อทีมงานพร้อมเลขอ้างอิงประกาศ',
  },
  {
    id: 'h8',
    category: 'post',
    q: 'อัปโหลดรูปได้กี่รูปและขนาดเท่าไร?',
    a: 'ในเวอร์ชันจริงรองรับสูงสุด 8 รูปต่อประกาศ ขนาดไม่เกิน 5MB ต่อรูป แนะนำรูปแนวนอน 1600×900 px',
  },
  {
    id: 'h9',
    category: 'post',
    q: 'ลบประกาศแล้วกู้คืนได้ไหม?',
    a: 'การลบจะนำประกาศออกจากระบบทันทีและไม่สามารถกู้คืนได้ หากต้องการหยุดแสดงชั่วคราวแนะนำให้เปลี่ยนสถานะเป็นฉบับร่างแทน',
  },
  {
    id: 'h10',
    category: 'space',
    q: 'ลงประกาศพื้นที่ให้เช่าหรือขายต้องใส่อะไรบ้าง?',
    a: 'ชื่อพื้นที่ ประเภท ขนาด ความจุ ที่อยู่ ราคา และรูปภาพอย่างน้อย 1 รูป ยิ่งระบุสิ่งอำนวยความสะดวกครบ ผู้จัดงานจะตัดสินใจได้เร็วขึ้น',
  },
  {
    id: 'h11',
    category: 'space',
    q: 'คิดค่าธรรมเนียมจากการเช่าพื้นที่หรือไม่?',
    a: 'ไม่คิด commission ในแพ็กเกจฟรีและโปร ผู้จัดงานติดต่อและตกลงกันโดยตรงผ่านช่องทางที่ให้ไว้',
  },
  {
    id: 'h12',
    category: 'space',
    q: 'ปิดประกาศพื้นที่ชั่วคราวได้อย่างไร?',
    a: 'ไปที่ “พื้นที่ของฉัน” แล้วกดไอคอนหยุดเผยแพร่ ประกาศจะถูกซ่อนจากหน้าค้นหาแต่ข้อมูลยังอยู่ครบ',
  },
  {
    id: 'h13',
    category: 'space',
    q: 'ต้องยืนยันตัวตนก่อนลงประกาศพื้นที่ไหม?',
    a: 'แนะนำให้ยืนยันตัวตนเพื่อเพิ่มความน่าเชื่อถือและได้ป้ายยืนยันบนประกาศ แต่สามารถลงประกาศก่อนได้',
  },
  {
    id: 'h14',
    category: 'account',
    q: 'ลืมรหัสผ่านต้องทำอย่างไร?',
    a: 'กด “ลืมรหัสผ่าน” ที่หน้าเข้าสู่ระบบ กรอกอีเมล แล้วทำตามลิงก์รีเซ็ตที่ส่งไป ในเว็บตัวอย่างนี้ระบบจะแสดงข้อความสำเร็จแบบจำลอง',
  },
  {
    id: 'h15',
    category: 'account',
    q: 'เปลี่ยนอีเมลหรือชื่อผู้จัดงานได้ที่ไหน?',
    a: 'ไปที่แดชบอร์ด > ตั้งค่า แก้ไขข้อมูลโปรไฟล์และกดบันทึก การเปลี่ยนแปลงจะแสดงบนประกาศใหม่ของคุณ',
  },
  {
    id: 'h16',
    category: 'account',
    q: 'ใบเสร็จและประวัติการชำระเงินดูได้ที่ไหน?',
    a: 'ในเวอร์ชันจริงจะมีเมนู “การเรียกเก็บเงิน” ในแดชบอร์ด หน้านี้เป็นตัวอย่างจึงยังไม่มีการชำระเงินจริง',
  },
]
