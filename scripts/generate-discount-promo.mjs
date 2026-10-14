import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'public/richmenu');

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

const promoHtml = `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>NIBBLY Discount Promo</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700;800&family=Prompt:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700&family=Mali:wght@500;600;700;800&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    body {
      width: 1200px;
      height: 1200px;
      overflow: hidden;
      background: #FAF3E8;
      font-family: 'Prompt', -apple-system, BlinkMacSystemFont, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .promo-canvas {
      width: 1200px;
      height: 1200px;
      position: relative;
      overflow: hidden;
      background: radial-gradient(circle at 50% 12%, #FFFDF9 0%, #F9EFE1 55%, #F0E1C6 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 40px 48px 42px;
    }

    /* Polka dot subtle texture */
    .pattern-dots {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(#CCA873 1.8px, transparent 1.8px);
      background-size: 34px 34px;
      opacity: 0.22;
      pointer-events: none;
    }

    /* Glow backdrop lights */
    .glow-light {
      position: absolute;
      top: 60px;
      width: 600px;
      height: 350px;
      background: radial-gradient(circle, rgba(255, 237, 213, 0.9) 0%, rgba(255, 237, 213, 0) 70%);
      pointer-events: none;
      z-index: 1;
    }

    /* Top Header Section */
    .header-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 2;
      margin-top: 2px;
    }

    .top-pill-tag {
      background: linear-gradient(135deg, #354B2D 0%, #4D6B42 100%);
      color: #FFFFFF;
      font-size: 21px;
      font-weight: 800;
      padding: 8px 30px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 6px 18px rgba(53, 75, 45, 0.28);
      letter-spacing: 0.5px;
      margin-bottom: 12px;
    }

    .logo-container {
      width: 520px;
      height: 195px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo-container img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 12px 24px rgba(60, 40, 10, 0.2));
    }

    .header-subline {
      margin-top: 4px;
      font-size: 24px;
      font-weight: 700;
      color: #5D4B34;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* Central Coupon Voucher Card */
    .coupon-card {
      width: 100%;
      max-width: 1104px;
      background: #FFFFFF;
      border-radius: 44px;
      box-shadow: 0 22px 55px rgba(90, 60, 20, 0.14), 0 4px 12px rgba(0,0,0,0.04);
      border: 4.5px solid #F1DFC8;
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 38px 46px 34px;
      z-index: 2;
    }

    /* Ticket Notches */
    .notch-left, .notch-right {
      position: absolute;
      top: 50%;
      width: 44px;
      height: 88px;
      background: #F9EFE1;
      border: 4.5px solid #F1DFC8;
      transform: translateY(-50%);
      z-index: 5;
    }
    .notch-left {
      left: -26px;
      border-radius: 0 50px 50px 0;
      border-left: none;
    }
    .notch-right {
      right: -26px;
      border-radius: 50px 0 0 50px;
      border-right: none;
    }

    /* Card Upper Body */
    .card-upper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      border-bottom: 3.5px dashed #E8D2B7;
      padding-bottom: 28px;
    }

    .upper-left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex: 1;
    }

    .badge-deal {
      background: linear-gradient(135deg, #FFE4E6 0%, #FECDD3 100%);
      color: #BE123C;
      font-size: 21px;
      font-weight: 800;
      padding: 7px 22px;
      border-radius: 999px;
      border: 2px solid #FDA4AF;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      box-shadow: 0 4px 10px rgba(225, 29, 72, 0.1);
    }

    .discount-headline {
      font-family: 'Fredoka', 'Prompt', sans-serif;
      font-size: 88px;
      font-weight: 800;
      color: #E11D48;
      line-height: 1.05;
      display: flex;
      align-items: baseline;
      gap: 16px;
    }

    .discount-headline .percent {
      font-size: 108px;
      color: #BE123C;
      text-shadow: 3px 5px 0px #FFE4E6;
    }

    .discount-subtext {
      font-size: 28px;
      font-weight: 800;
      color: #263820;
      margin-top: 8px;
      letter-spacing: -0.3px;
    }

    .discount-condition {
      font-size: 20px;
      font-weight: 500;
      color: #7A664F;
      margin-top: 6px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Images in Upper Card */
    .upper-right-visuals {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-shrink: 0;
    }

    .circle-avatar {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 6px solid #FFFFFF;
      box-shadow: 0 12px 28px rgba(90, 60, 20, 0.14);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .circle-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Card Lower Body: Promo Code Voucher Box & Button */
    .card-lower {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 22px;
      padding-top: 26px;
    }

    .promo-code-box {
      display: flex;
      align-items: center;
      background: #FFF9F0;
      border: 3.5px dashed #D97706;
      border-radius: 26px;
      padding: 14px 30px;
      gap: 20px;
      box-shadow: 0 6px 16px rgba(217, 119, 6, 0.1);
    }

    .code-label-group {
      display: flex;
      flex-direction: column;
    }

    .code-title {
      font-size: 16px;
      font-weight: 700;
      color: #92400E;
      letter-spacing: 0.5px;
    }

    .code-text {
      font-family: 'Fredoka', monospace;
      font-size: 46px;
      font-weight: 800;
      color: #B45309;
      letter-spacing: 4px;
      line-height: 1.1;
    }

    .code-badge-copy {
      background: #FDE68A;
      color: #78350F;
      font-size: 16px;
      font-weight: 800;
      padding: 8px 16px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    }

    .cta-btn {
      flex: 1;
      height: 84px;
      background: linear-gradient(135deg, #E11D48 0%, #BE123C 100%);
      color: #FFFFFF;
      font-size: 28px;
      font-weight: 800;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      box-shadow: 0 12px 28px rgba(225, 29, 72, 0.38);
      letter-spacing: 0.5px;
    }

    /* Footer Trust Perks */
    .footer-perks {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      z-index: 2;
      width: 100%;
    }

    .perk-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 20px;
      font-weight: 700;
      color: #314728;
      background: rgba(255, 255, 255, 0.85);
      padding: 10px 26px;
      border-radius: 999px;
      border: 2px solid #E6D9C3;
      box-shadow: 0 4px 12px rgba(0,0,0,0.04);
    }
  </style>
</head>
<body>
  <div class="promo-canvas">
    <div class="pattern-dots"></div>
    <div class="glow-light"></div>

    <!-- 1. HEADER SECTION WITH OFFICIAL LOGO -->
    <div class="header-section">
      <div class="top-pill-tag">
        <span>✨ สิทธิพิเศษเฉพาะเพื่อนทาง LINE & สมาชิกใหม่ ✨</span>
      </div>
      <div class="logo-container">
        <img src="${logoBase64}" alt="NIBBLY Healthy Treats Logo" />
      </div>
      <div class="header-subline">
        <span>🌿 ขนมสุขภาพ อร่อย ฟิน ไม่รู้สึกผิด • 100% Organic & Clean</span>
      </div>
    </div>

    <!-- 2. MAIN COUPON VOUCHER CARD -->
    <div class="coupon-card">
      <div class="notch-left"></div>
      <div class="notch-right"></div>

      <!-- Upper Half -->
      <div class="card-upper">
        <div class="upper-left">
          <div class="badge-deal">
            <span>🔥 SPECIAL WELCOME COUPON</span>
          </div>
          <div class="discount-headline">
            <span>ลดทันที</span>
            <span class="percent">15%</span>
          </div>
          <div class="discount-subtext">
            ช้อปขนมคลีน กราโนล่า & ผลไม้อบแห้ง ทุกรายการ
          </div>
          <div class="discount-condition">
            <span>✓ ไม่มีขั้นต่ำ</span>
            <span>•</span>
            <span>✓ สำหรับออเดอร์แรก</span>
            <span>•</span>
            <span>✓ ส่งฟรีเมื่อช้อปครบ 499.-</span>
          </div>
        </div>

        <div class="upper-right-visuals">
          <!-- 3D Mascot -->
          <div class="circle-avatar" style="border-color: #D3EBC6;">
            <img src="${mascotBase64}" alt="NIBBLY Mascot" />
          </div>
          <!-- 3D Granola Bowl -->
          <div class="circle-avatar" style="border-color: #F8DFC0;">
            <img src="${granolaBase64}" alt="Granola Bowl" />
          </div>
        </div>
      </div>

      <!-- Lower Half: Promo Code & Call to Action -->
      <div class="card-lower">
        <div class="promo-code-box">
          <div class="code-label-group">
            <span class="code-title">กรอกโค้ดส่วนลดนี้:</span>
            <span class="code-text">NIBBLY15</span>
          </div>
          <div class="code-badge-copy">
            <span>✂️ คัดลอก</span>
          </div>
        </div>

        <div class="cta-btn">
          <span>เก็บคูปอง & ช้อปเลย 🛒</span>
        </div>
      </div>
    </div>

    <!-- 3. FOOTER TRUST PERKS -->
    <div class="footer-perks">
      <div class="perk-item">
        <span>🌱 100% Organic Plant-based</span>
      </div>
      <div class="perk-item">
        <span>🚫 ไม่ใส่น้ำตาลทรายขาว</span>
      </div>
      <div class="perk-item">
        <span>🚚 จัดส่งด่วนทั่วไทย</span>
      </div>
    </div>

  </div>
</body>
</html>
`;

async function renderPromo() {
  console.log('Rendering Updated Discount Promo Image (1200x1200)...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 1200 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();
  await page.setContent(promoHtml, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const pngPath = path.join(outDir, 'nibbly-discount-promo-1200x1200.png');
  const jpgPath = path.join(outDir, 'nibbly-discount-promo-1200x1200.jpg');

  await page.screenshot({ path: pngPath, type: 'png' });
  await page.screenshot({ path: jpgPath, type: 'jpeg', quality: 92 });

  await browser.close();
  console.log('Promo image updated successfully!');

  const statPng = fs.statSync(pngPath);
  const statJpg = fs.statSync(jpgPath);
  console.log(`- PNG: ${(statPng.size / 1024).toFixed(1)} KB`);
  console.log(`- JPG: ${(statJpg.size / 1024).toFixed(1)} KB`);
}

renderPromo().catch((err) => {
  console.error('Error generating promo:', err);
  process.exit(1);
});
