import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'public/richmenu');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function getBase64(filePath) {
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
    return `data:${mime};base64,${fs.readFileSync(filePath).toString('base64')}`;
  }
  return '';
}

const logoBase64 = getBase64(path.join(rootDir, 'public/nibbly-logo-crop.png'));
const granolaBase64 = getBase64(path.join(rootDir, 'public/richmenu/granola.jpg'));
const mascotBase64 = getBase64(path.join(rootDir, 'public/richmenu/mascot.jpg'));
const couponBase64 = getBase64(path.join(rootDir, 'public/richmenu/coupon.jpg'));
const rewardsBase64 = getBase64(path.join(rootDir, 'public/richmenu/rewards.jpg'));
const storeBase64 = getBase64(path.join(rootDir, 'public/richmenu/store.jpg'));
const chatBase64 = getBase64(path.join(rootDir, 'public/richmenu/chat.jpg'));

const sharedStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Prompt:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=Mali:wght@500;600;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
  }

  body {
    width: 2500px;
    height: 1686px;
    overflow: hidden;
    background-color: #FAF4EB;
    font-family: 'Prompt', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .canvas {
    width: 2500px;
    height: 1686px;
    position: relative;
    overflow: hidden;
    background: radial-gradient(circle at 50% 15%, #FFFDF9 0%, #F5ECDD 100%);
  }

  /* Polka dot subtle background */
  .pattern-bg {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(#d3c19e 1.8px, transparent 1.8px);
    background-size: 42px 42px;
    opacity: 0.28;
    pointer-events: none;
  }

  /* Top decorative brand strip */
  .top-brand-strip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 16px;
    background: linear-gradient(90deg, #354B2D 0%, #6A934E 25%, #E86A58 50%, #F59E0B 75%, #354B2D 100%);
    z-index: 10;
  }

  /* Card Base Styling */
  .menu-card {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 34px 28px 32px;
    background: #FFFFFF;
    border-radius: 46px;
    box-shadow: 0 16px 36px rgba(90, 65, 30, 0.08), 0 2px 6px rgba(0,0,0,0.03);
    border: 3.5px solid #F0E4D2;
    overflow: hidden;
  }

  .badge-tag {
    font-size: 26px;
    font-weight: 700;
    padding: 8px 24px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    letter-spacing: 0.3px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    z-index: 2;
  }

  /* Perfectly clipped circular dish frame */
  .image-circle-frame {
    width: 320px;
    height: 320px;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    border: 6px solid #FFFFFF;
    box-shadow: 0 14px 30px rgba(90, 65, 30, 0.12);
    overflow: hidden;
    flex-shrink: 0;
  }

  .image-circle-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-title {
    font-size: 56px;
    font-weight: 800;
    color: #2D4026;
    line-height: 1.15;
    text-align: center;
    margin-top: 4px;
  }

  .card-desc {
    font-size: 30px;
    font-weight: 500;
    color: #79664F;
    text-align: center;
    margin-top: 6px;
    line-height: 1.25;
  }

  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    max-width: 480px;
    height: 86px;
    border-radius: 999px;
    font-size: 34px;
    font-weight: 800;
    color: #FFFFFF;
    box-shadow: 0 10px 22px rgba(0,0,0,0.13);
    letter-spacing: 0.5px;
    z-index: 2;
  }

  /* Guide overlay lines */
  .grid-guide {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 50;
  }
  .guide-line-h {
    position: absolute;
    left: 0;
    right: 0;
    height: 5px;
    background: #DC2626;
    border-bottom: 2px dashed #FFFFFF;
  }
  .guide-line-v {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 5px;
    background: #DC2626;
    border-right: 2px dashed #FFFFFF;
  }
  .guide-label {
    position: absolute;
    background: #DC2626;
    color: #FFFFFF;
    font-size: 36px;
    font-weight: 900;
    padding: 8px 24px;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.4);
    letter-spacing: 0.5px;
  }
`;

// ==============================================================================
// 1. TEMPLATE 1 HTML (6 BLOCKS: 2 ROWS X 3 COLS)
// ==============================================================================
function getTemplate1Html(showGuide = false) {
  return `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>NIBBLY Rich Menu 6 Blocks</title>
  <style>
    ${sharedStyles}

    /* Grid positions for 6 blocks on 2500 x 1686 */
    .card-a { left: 24px; top: 24px; width: 785px; height: 795px; }
    .card-b { left: 857px; top: 24px; width: 786px; height: 795px; }
    .card-c { left: 1691px; top: 24px; width: 785px; height: 795px; }
    
    .card-d { left: 24px; top: 867px; width: 785px; height: 795px; }
    .card-e { left: 857px; top: 867px; width: 786px; height: 795px; }
    .card-f { left: 1691px; top: 867px; width: 785px; height: 795px; }

    /* Custom Theme Colors for Each Card */
    .card-a { background: linear-gradient(180deg, #FFFFFF 0%, #FFF8EE 100%); border-color: #F6DFBE; }
    .card-a .badge-tag { background: #FEF3C7; color: #92400E; border: 2px solid #FDE68A; }
    .card-a .action-btn { background: linear-gradient(135deg, #354B2D 0%, #4D6B42 100%); }

    /* Card B (Centerpiece with Logo!) */
    .card-b {
      background: linear-gradient(180deg, #FFFFFF 0%, #F0F8EC 100%);
      border-color: #CBE3BD;
      padding: 24px 24px 30px;
    }
    .card-b .badge-tag { background: #DCFCE7; color: #166534; border: 2px solid #BBF7D0; }
    .card-b .action-btn { background: linear-gradient(135deg, #2D6A4F 0%, #3B8259 100%); }

    .card-c { background: linear-gradient(180deg, #FFFFFF 0%, #FFF0F3 100%); border-color: #FBCED7; }
    .card-c .badge-tag { background: #FFE4E6; color: #9F1239; border: 2px solid #FECDD3; }
    .card-c .action-btn { background: linear-gradient(135deg, #E11D48 0%, #F43F5E 100%); }

    .card-d { background: linear-gradient(180deg, #FFFFFF 0%, #FEFCE8 100%); border-color: #F8E899; }
    .card-d .badge-tag { background: #FEF08A; color: #854D0E; border: 2px solid #FDE047; }
    .card-d .action-btn { background: linear-gradient(135deg, #D97706 0%, #F59E0B 100%); }

    .card-e { background: linear-gradient(180deg, #FFFFFF 0%, #FAF5EE 100%); border-color: #EBDDCB; }
    .card-e .badge-tag { background: #EDE0D4; color: #5E4633; border: 2px solid #DDB892; }
    .card-e .action-btn { background: linear-gradient(135deg, #6B4F3A 0%, #8F694F 100%); }

    .card-f { background: linear-gradient(180deg, #FFFFFF 0%, #EFFCF4 100%); border-color: #BBE7C5; }
    .card-f .badge-tag { background: #D1FAE5; color: #065F46; border: 2px solid #A7F3D0; }
    .card-f .action-btn { background: linear-gradient(135deg, #059669 0%, #10B981 100%); }

    /* Centerpiece Big Logo inside Card B */
    .card-b-logo {
      width: 500px;
      height: 195px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card-b-logo img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 10px 18px rgba(70, 45, 10, 0.18));
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="pattern-bg"></div>
    <div class="top-brand-strip"></div>

    <!-- BLOCK A: เมนูสินค้าทั้งหมด -->
    <div class="menu-card card-a">
      <div class="badge-tag">🔥 ยอดฮิต Best Seller</div>
      <div class="image-circle-frame" style="border-color: #F8E5CD;">
        <img src="${granolaBase64}" alt="เมนูสินค้า Granola Bowl" />
      </div>
      <div>
        <h2 class="card-title">เมนูสินค้า</h2>
        <p class="card-desc">ช้อปขนมคลีน กราโนล่า & ผลไม้</p>
      </div>
      <div class="action-btn">
        <span>ช้อปสินค้าทั้งหมด 🛒</span>
      </div>
    </div>

    <!-- BLOCK B: LOGO + แนะนำขนมสุขภาพ (SNACK FINDER) -->
    <div class="menu-card card-b">
      <div class="card-b-logo">
        <img src="${logoBase64}" alt="NIBBLY Healthy Treats" />
      </div>
      
      <div class="image-circle-frame" style="width: 250px; height: 250px; border-color: #D1E7C4;">
        <img src="${mascotBase64}" alt="Snack Finder Mascot" />
      </div>
      
      <div>
        <div class="badge-tag" style="margin-bottom: 6px;">🎯 แบบทดสอบสุขภาพ</div>
        <h2 class="card-title" style="color: #245738; font-size: 50px;">แนะนำขนมสุขภาพ</h2>
        <p class="card-desc">ค้นหาขนมที่ตอบโจทย์ไลฟ์สไตล์คุณ</p>
      </div>
      
      <div class="action-btn">
        <span>เริ่มทำแบบทดสอบ 🎯</span>
      </div>
    </div>

    <!-- BLOCK C: คูปอง & โปรโมชั่น -->
    <div class="menu-card card-c">
      <div class="badge-tag">🎁 โค้ดลับ ลด 10%</div>
      <div class="image-circle-frame" style="border-color: #FCD5DC;">
        <img src="${couponBase64}" alt="คูปองส่วนลด" />
      </div>
      <div>
        <h2 class="card-title" style="color: #9F1239;">คูปองส่วนลด</h2>
        <p class="card-desc">เก็บคูปองลด 10% & ส่งฟรี</p>
      </div>
      <div class="action-btn">
        <span>เก็บคูปองด่วน 🎟️</span>
      </div>
    </div>

    <!-- BLOCK D: สมาชิก & สะสมแต้ม -->
    <div class="menu-card card-d">
      <div class="badge-tag">👑 NIBBLY MEMBER</div>
      <div class="image-circle-frame" style="border-color: #F8EAB0;">
        <img src="${rewardsBase64}" alt="สะสมแต้มสมาชิก" />
      </div>
      <div>
        <h2 class="card-title" style="color: #92400E;">สมาชิก & แต้ม</h2>
        <p class="card-desc">สมัครฟรี สะสมแต้มแลกขนม</p>
      </div>
      <div class="action-btn">
        <span>เช็คแต้ม / สมัคร 👑</span>
      </div>
    </div>

    <!-- BLOCK E: หน้าร้าน & เกี่ยวกับเรา -->
    <div class="menu-card card-e">
      <div class="badge-tag">📍 เปิดทุกวัน 08:30-18:00</div>
      <div class="image-circle-frame" style="border-color: #E6D8C6;">
        <img src="${storeBase64}" alt="หน้าร้าน NIBBLY" />
      </div>
      <div>
        <h2 class="card-title" style="color: #583F2A;">หน้าร้าน & Story</h2>
        <p class="card-desc">แผนที่หน้าร้าน & เรื่องราวแบรนด์</p>
      </div>
      <div class="action-btn">
        <span>ดูข้อมูลหน้าร้าน 🏡</span>
      </div>
    </div>

    <!-- BLOCK F: ติดต่อแอดมิน / สั่งซื้อ -->
    <div class="menu-card card-f">
      <div class="badge-tag">⚡ แอดมินพร้อมตอบ 24 ชม.</div>
      <div class="image-circle-frame" style="border-color: #C5EDCE;">
        <img src="${chatBase64}" alt="ติดต่อแอดมิน" />
      </div>
      <div>
        <h2 class="card-title" style="color: #065F46;">สั่งซื้อ / ติดต่อ</h2>
        <p class="card-desc">ปรึกษาโภชนาการ & สั่งซื้อด่วน</p>
      </div>
      <div class="action-btn">
        <span>คุยกับแอดมิน 💬</span>
      </div>
    </div>

    ${showGuide ? `
    <!-- GUIDE OVERLAYS -->
    <div class="grid-guide">
      <!-- Horizontal divider -->
      <div class="guide-line-h" style="top: 843px;"></div>
      <!-- Vertical dividers -->
      <div class="guide-line-v" style="left: 833px;"></div>
      <div class="guide-line-v" style="left: 1667px;"></div>
      
      <!-- Labels -->
      <div class="guide-label" style="top: 40px; left: 40px;">ช่อง A: สินค้า (Shop)</div>
      <div class="guide-label" style="top: 40px; left: 860px;">ช่อง B: แนะนำขนม (Quiz)</div>
      <div class="guide-label" style="top: 40px; left: 1690px;">ช่อง C: คูปอง (Coupon)</div>
      <div class="guide-label" style="top: 880px; left: 40px;">ช่อง D: สมาชิก (Member)</div>
      <div class="guide-label" style="top: 880px; left: 860px;">ช่อง E: หน้าร้าน (Store)</div>
      <div class="guide-label" style="top: 880px; left: 1690px;">ช่อง F: ติดต่อ (Chat)</div>
    </div>
    ` : ''}

  </div>
</body>
</html>
`;
}

// ==============================================================================
// 2. TEMPLATE 2 HTML (4 BLOCKS: 1 TOP BANNER + 3 BOTTOM COLS)
// ==============================================================================
function getTemplate2Html(showGuide = false) {
  return `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>NIBBLY Rich Menu 4 Blocks</title>
  <style>
    ${sharedStyles}

    /* Top banner: 0 to 843 px height */
    .top-hero-card {
      position: absolute;
      left: 24px;
      top: 24px;
      width: 2452px;
      height: 795px;
      background: linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 50%, #F5FBEF 100%);
      border-radius: 48px;
      border: 4px solid #F1DEC6;
      box-shadow: 0 16px 40px rgba(90, 65, 30, 0.09);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 40px 80px;
      overflow: hidden;
    }

    .hero-left-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 620px;
      flex-shrink: 0;
    }
    .hero-left-logo img {
      width: 580px;
      height: auto;
      filter: drop-shadow(0 14px 28px rgba(60, 40, 10, 0.18));
    }

    .hero-center-content {
      flex: 1;
      padding: 0 60px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 18px;
    }

    .hero-tag {
      background: #354B2D;
      color: #FFFFFF;
      font-size: 28px;
      font-weight: 700;
      padding: 10px 28px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 4px 14px rgba(53, 75, 45, 0.25);
    }

    .hero-title {
      font-size: 70px;
      font-weight: 900;
      color: #1F2E1A;
      line-height: 1.18;
    }

    .hero-title span {
      color: #E11D48;
    }

    .hero-subtitle {
      font-size: 34px;
      font-weight: 500;
      color: #6C5840;
      line-height: 1.35;
    }

    .hero-cta {
      margin-top: 10px;
      display: inline-flex;
      align-items: center;
      gap: 16px;
      background: linear-gradient(135deg, #E11D48 0%, #BE123C 100%);
      color: #FFFFFF;
      font-size: 38px;
      font-weight: 800;
      padding: 18px 48px;
      border-radius: 999px;
      box-shadow: 0 10px 28px rgba(225, 29, 72, 0.35);
    }

    .hero-right-visual {
      width: 390px;
      height: 390px;
      border-radius: 50%;
      border: 8px solid #FFFFFF;
      box-shadow: 0 16px 36px rgba(0,0,0,0.12);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FFFFFF;
      flex-shrink: 0;
    }
    .hero-right-visual img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Bottom 3 Columns: Col 1: 0 - 833, Col 2: 833 - 1667, Col 3: 1667 - 2500 */
    .card-b2 { left: 24px; top: 867px; width: 785px; height: 795px; }
    .card-c2 { left: 857px; top: 867px; width: 786px; height: 795px; }
    .card-d2 { left: 1691px; top: 867px; width: 785px; height: 795px; }

    .card-b2 { background: linear-gradient(180deg, #FFFFFF 0%, #FFF8EE 100%); border-color: #F6DFBE; }
    .card-b2 .badge-tag { background: #FEF3C7; color: #92400E; border: 2px solid #FDE68A; }
    .card-b2 .action-btn { background: linear-gradient(135deg, #354B2D 0%, #4D6B42 100%); }

    .card-c2 { background: linear-gradient(180deg, #FFFFFF 0%, #F0F8EC 100%); border-color: #CBE3BD; }
    .card-c2 .badge-tag { background: #DCFCE7; color: #166534; border: 2px solid #BBF7D0; }
    .card-c2 .action-btn { background: linear-gradient(135deg, #2D6A4F 0%, #3B8259 100%); }

    .card-d2 { background: linear-gradient(180deg, #FFFFFF 0%, #FFF0F3 100%); border-color: #FBCED7; }
    .card-d2 .badge-tag { background: #FFE4E6; color: #9F1239; border: 2px solid #FECDD3; }
    .card-d2 .action-btn { background: linear-gradient(135deg, #D97706 0%, #F59E0B 100%); }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="pattern-bg"></div>
    <div class="top-brand-strip"></div>

    <!-- TOP HERO BANNER (BLOCK A) -->
    <div class="top-hero-card">
      <div class="hero-left-logo">
        <img src="${logoBase64}" alt="NIBBLY Healthy Treats" />
      </div>

      <div class="hero-center-content">
        <div class="hero-tag">🌾 100% WHOLESOME & CLEAN SNACKS</div>
        <h1 class="hero-title">
          ขนมสุขภาพ อร่อย ฟิน <span>ลด 10%</span>
        </h1>
        <p class="hero-subtitle">
          ต้อนรับเพื่อนใหม่ • ใส่ใจทุกแคลอรี่ ใช้วัตถุดิบธรรมชาติ ไม่ใส่น้ำตาลทรายขาว
        </p>
        <div class="hero-cta">
          <span>ช้อปโปรโมชั่นพิเศษ คลิกเลย 🛒</span>
        </div>
      </div>

      <div class="hero-right-visual">
        <img src="${mascotBase64}" alt="NIBBLY Mascot" />
      </div>
    </div>

    <!-- BLOCK B: เมนูสินค้าทั้งหมด -->
    <div class="menu-card card-b2">
      <div class="badge-tag">🛍️ แคตตาล็อกขนมคลีน</div>
      <div class="image-circle-frame" style="border-color: #F8E5CD;">
        <img src="${granolaBase64}" alt="เมนูสินค้า" />
      </div>
      <div>
        <h2 class="card-title">เมนูสินค้า</h2>
        <p class="card-desc">กราโนล่า อัลมอนด์ & ขนมคลีน</p>
      </div>
      <div class="action-btn">
        <span>ดูสินค้าทั้งหมด 🛒</span>
      </div>
    </div>

    <!-- BLOCK C: แนะนำขนมสุขภาพ -->
    <div class="menu-card card-c2">
      <div class="badge-tag">🥣 ควิซค้นหาขนม</div>
      <div class="image-circle-frame" style="border-color: #D1E7C4;">
        <img src="${rewardsBase64}" alt="Snack Finder" />
      </div>
      <div>
        <h2 class="card-title" style="color: #245738;">แนะนำขนมสุขภาพ</h2>
        <p class="card-desc">Snack Finder หาขนมตามเป้าหมาย</p>
      </div>
      <div class="action-btn">
        <span>ทำแบบทดสอบ 🎯</span>
      </div>
    </div>

    <!-- BLOCK D: คูปองส่วนลด & หน้าร้าน -->
    <div class="menu-card card-d2">
      <div class="badge-tag">🎁 คูปอง & สิทธิพิเศษ</div>
      <div class="image-circle-frame" style="border-color: #FCD5DC;">
        <img src="${couponBase64}" alt="คูปองส่วนลด" />
      </div>
      <div>
        <h2 class="card-title" style="color: #92400E;">คูปอง & สมาชิก</h2>
        <p class="card-desc">เก็บคูปองลด 10% & หน้าร้าน</p>
      </div>
      <div class="action-btn">
        <span>รับสิทธิพิเศษ 🎟️</span>
      </div>
    </div>

    ${showGuide ? `
    <!-- GUIDE OVERLAYS -->
    <div class="grid-guide">
      <!-- Horizontal divider -->
      <div class="guide-line-h" style="top: 843px;"></div>
      <!-- Vertical dividers -->
      <div class="guide-line-v" style="left: 833px; top: 843px;"></div>
      <div class="guide-line-v" style="left: 1667px; top: 843px;"></div>
      
      <!-- Labels -->
      <div class="guide-label" style="top: 50px; left: 80px;">ช่อง A: แบนเนอร์โปรโมชั่นใหญ่ & โลโก้ (Promo Banner)</div>
      <div class="guide-label" style="top: 880px; left: 40px;">ช่อง B: เมนูสินค้า (Shop)</div>
      <div class="guide-label" style="top: 880px; left: 860px;">ช่อง C: แนะนำขนม (Quiz)</div>
      <div class="guide-label" style="top: 880px; left: 1690px;">ช่อง D: คูปอง & สมาชิก (Deals)</div>
    </div>
    ` : ''}

  </div>
</body>
</html>
`;
}

// ==============================================================================
// MAIN RENDERER
// ==============================================================================
async function renderAll() {
  console.log('Starting Playwright Chromium...');
  const browser = await chromium.launch({ headless: true });
  
  const context2500 = await browser.newContext({
    viewport: { width: 2500, height: 1686 },
    deviceScaleFactor: 1,
  });
  
  const context800 = await browser.newContext({
    viewport: { width: 800, height: 540 },
    deviceScaleFactor: 1,
  });

  const page = await context2500.newPage();

  // 1. Template 1: 6 Blocks HD (2500 x 1686)
  console.log('Rendering Template 1 (6 blocks - 2500x1686)...');
  await page.setContent(getTemplate1Html(false), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(outDir, 'richmenu-template-1-6blocks-2500x1686.png'),
    type: 'png',
  });
  await page.screenshot({
    path: path.join(outDir, 'richmenu-template-1-6blocks-2500x1686.jpg'),
    type: 'jpeg',
    quality: 92,
  });

  // 1b. Template 1 with Guide
  console.log('Rendering Template 1 with Guide (6 blocks - 2500x1686)...');
  await page.setContent(getTemplate1Html(true), { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outDir, 'richmenu-template-1-guide-2500x1686.png'),
    type: 'png',
  });

  // 2. Template 2: 4 Blocks HD (2500 x 1686)
  console.log('Rendering Template 2 (4 blocks - 2500x1686)...');
  await page.setContent(getTemplate2Html(false), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(outDir, 'richmenu-template-2-4blocks-2500x1686.png'),
    type: 'png',
  });
  await page.screenshot({
    path: path.join(outDir, 'richmenu-template-2-4blocks-2500x1686.jpg'),
    type: 'jpeg',
    quality: 92,
  });

  // 2b. Template 2 with Guide
  console.log('Rendering Template 2 with Guide (4 blocks - 2500x1686)...');
  await page.setContent(getTemplate2Html(true), { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outDir, 'richmenu-template-2-guide-2500x1686.png'),
    type: 'png',
  });

  // 3. Render 800x540 versions
  console.log('Rendering 800x540 versions...');
  const page800 = await context800.newPage();
  const wrap800 = (html) => html.replace('<div class="canvas">', '<div class="canvas" style="transform: scale(0.32); transform-origin: top left; width: 2500px; height: 1686px;">');

  await page800.setContent(wrap800(getTemplate1Html(false)), { waitUntil: 'networkidle' });
  await page800.waitForTimeout(500);
  await page800.screenshot({
    path: path.join(outDir, 'richmenu-template-1-6blocks-800x540.png'),
    type: 'png',
  });

  await page800.setContent(wrap800(getTemplate2Html(false)), { waitUntil: 'networkidle' });
  await page800.waitForTimeout(500);
  await page800.screenshot({
    path: path.join(outDir, 'richmenu-template-2-4blocks-800x540.png'),
    type: 'png',
  });

  await browser.close();
  console.log('All rich menus generated successfully!');

  const files = fs.readdirSync(outDir);
  console.log('Generated files:');
  for (const f of files) {
    const stat = fs.statSync(path.join(outDir, f));
    console.log(`- ${f}: ${(stat.size / 1024).toFixed(1)} KB`);
  }
}

renderAll().catch((err) => {
  console.error('Error generating rich menu:', err);
  process.exit(1);
});
