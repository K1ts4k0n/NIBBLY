const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 450, height: 1200 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // ฟังก์ชันแปลงรูปเป็น base64 สำหรับเรนเดอร์ใน Playwright
  function getBase64Img(filename) {
    const p = path.join(__dirname, '../public/products', filename);
    if (fs.existsSync(p)) {
      return `data:image/jpeg;base64,${fs.readFileSync(p).toString('base64')}`;
    }
    return `https://k1ts4k0n.github.io/NIBBLY/products/${filename}`;
  }

  const prod1 = getBase64Img('berry-granola.jpg');
  const prod2 = getBase64Img('choco.jpg');
  const prod3 = getBase64Img('honey.jpg');
  const prod4 = getBase64Img('dark-cocoa.jpg');

  // ==============================================================================
  // 1. RENDER REGISTER WELCOME EMAIL WITH 4 PRODUCTS (CUTE & COLORFUL FRUITS)
  // ==============================================================================
  const registerHtml = `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>Email สมาชิกใหม่ NIBBLY</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 16px 14px 40px;
      background: linear-gradient(180deg, #FFF5EC 0%, #FFFDF9 35%, #F0FFF4 100%);
      font-family: 'Prompt', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #2D3748;
      -webkit-font-smoothing: antialiased;
    }
    .status-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2px 14px 10px;
      font-size: 13.5px;
      font-weight: 700;
      color: #1A202C;
    }
    .mail-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px 14px;
      font-size: 13px;
      color: #E63946;
      font-weight: 600;
      border-bottom: 1.5px solid rgba(255, 107, 107, 0.15);
      margin-bottom: 14px;
    }
    .mail-nav-title {
      color: #2D3748;
      font-weight: 800;
      font-size: 13.5px;
    }
    .container {
      max-width: 422px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border-radius: 34px;
      overflow: hidden;
      box-shadow: 0 16px 45px rgba(255, 112, 137, 0.16), 0 2px 10px rgba(0,0,0,0.04);
      border: 2px solid #FFE3EC;
    }
    /* Header แฟนซีผลไม้ สีสันสดใส */
    .banner {
      background: linear-gradient(135deg, #FF6B8B 0%, #FFA07A 35%, #FFD166 70%, #6BCB77 100%);
      padding: 30px 18px 26px;
      text-align: center;
      position: relative;
    }
    .fruit-ribbon {
      font-size: 23px;
      letter-spacing: 7px;
      margin-bottom: 12px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
    }
    .vip-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #FFFFFF;
      padding: 5px 16px;
      border-radius: 30px;
      margin-bottom: 12px;
      box-shadow: 0 4px 14px rgba(230, 57, 70, 0.2);
    }
    .vip-pill-text {
      font-size: 11.5px;
      font-weight: 900;
      color: #E63946;
      letter-spacing: 0.8px;
    }
    .banner-title {
      margin: 0 0 6px;
      font-size: 23px;
      font-weight: 900;
      color: #FFFFFF;
      line-height: 1.3;
      text-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }
    .banner-sub {
      margin: 0;
      font-size: 12.5px;
      color: #FFF8F0;
      font-weight: 600;
      line-height: 1.5;
      text-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }
    .content {
      padding: 22px 16px 28px;
    }
    /* Member Pass ลายน่ารักสดใส */
    .member-card {
      background: linear-gradient(135deg, #FFF0F5 0%, #FFF9E6 50%, #F0FFF4 100%);
      border: 2px dashed #FF758F;
      border-radius: 22px;
      padding: 16px 18px;
      margin-bottom: 22px;
      box-shadow: 0 8px 20px rgba(255, 117, 143, 0.12);
    }
    .code-badge {
      background: #FFFFFF;
      border: 2px solid #E63946;
      border-radius: 12px;
      padding: 6px 12px;
      display: inline-block;
      font-size: 18px;
      font-weight: 900;
      color: #E63946;
      font-family: monospace;
      letter-spacing: 1.5px;
      margin-top: 4px;
      box-shadow: 0 3px 8px rgba(230, 57, 70, 0.1);
    }
    /* หมวดหมู่ความสนใจผลไม้ */
    .taste-box {
      background: #FFF9F2;
      border: 1.5px solid #FFD8A8;
      border-radius: 18px;
      padding: 12px 14px;
      margin-bottom: 22px;
      font-size: 11.5px;
    }
    .taste-pill {
      display: inline-block;
      padding: 4px 9px;
      border-radius: 8px;
      margin: 3px 4px 3px 0;
      font-weight: 700;
      font-size: 11px;
    }
    /* สินค้าแนะนำการ์ดผลไม้หลากสี */
    .prod-card {
      border-radius: 20px;
      padding: 14px;
      margin-bottom: 16px;
      display: flex;
      gap: 14px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.04);
      transition: all 0.2s ease;
    }
    .prod-img-wrap {
      position: relative;
      width: 112px;
      height: 112px;
      border-radius: 16px;
      overflow: hidden;
      flex-shrink: 0;
      border: 2px solid #FFFFFF;
      box-shadow: 0 4px 10px rgba(0,0,0,0.08);
    }
    .prod-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .prod-emoji-corner {
      position: absolute;
      bottom: 5px;
      right: 5px;
      background: rgba(255,255,255,0.95);
      font-size: 14px;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    }
    .badge-tag {
      display: inline-block;
      font-size: 9.5px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
      margin-bottom: 4px;
      letter-spacing: 0.4px;
    }
    .prod-title {
      margin: 0 0 3px;
      font-size: 15px;
      font-weight: 800;
      color: #1A202C;
      line-height: 1.3;
    }
    .prod-desc {
      margin: 0 0 6px;
      font-size: 11px;
      color: #4A5568;
      line-height: 1.35;
    }
    .fruit-chips {
      font-size: 10px;
      font-weight: 700;
      padding: 3px 7px;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 8px;
    }
    .prod-price {
      font-size: 17px;
      font-weight: 900;
    }
    .btn-buy {
      display: inline-block;
      font-size: 11px;
      font-weight: 800;
      padding: 6px 14px;
      border-radius: 18px;
      text-decoration: none;
      box-shadow: 0 3px 8px rgba(0,0,0,0.12);
    }
  </style>
</head>
<body>
  <!-- แถบแจ้งเตือนด้านบนมือถือ (Status Bar) -->
  <div class="status-bar">
    <span>10:08</span>
    <span>5G 􀛨 100%</span>
  </div>

  <!-- แถบนำทางกล่องข้อความ -->
  <div class="mail-nav">
    <span>❮ กล่องขาเข้า</span>
    <span class="mail-nav-title">🍓 NIBBLY Member Club ✨</span>
    <span>•••</span>
  </div>

  <div class="container">
    <!-- แบนเนอร์สีสันสดใส มีอิโมจิผลไม้น่ารัก -->
    <div class="banner">
      <div class="fruit-ribbon">
        🍓 🥝 🫐 🍌 🍍 🍑 🥥 🥑 🍯
      </div>

      <div class="vip-pill">
        <span style="font-size:15px;">🍓</span>
        <span class="vip-pill-text">NIBBLY VIP MEMBER CLUB</span>
        <span style="font-size:13px;">✨</span>
      </div>

      <h1 class="banner-title">
        🎉 ยินดีต้อนรับคุณ Artkung Rakyouna 🥳
      </h1>
      <p class="banner-sub">
        ครอบครัวขนมผลไม้อบกรอบ NIBBLY สดใส อร่อยสุขภาพดีทุกวัน 🌈
      </p>
    </div>

    <div class="content">
      <!-- บัตรสมาชิกน่ารัก สิทธิพิเศษและโค้ดลด -->
      <div class="member-card">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="display:inline-block; background:#FF4D6D; color:#FFFFFF; font-size:9.5px; font-weight:800; padding:3px 9px; border-radius:6px; letter-spacing:0.4px;">
                🎁 สิทธิพิเศษสมาชิกใหม่ (WELCOME GIFT)
              </span>
              <p style="margin:6px 0 2px; font-size:12px; color:#6B2D5C; font-weight:700;">
                คูปองส่วนลดต้อนรับ 15% (ไม่มีขั้นต่ำ)
              </p>
              <div class="code-badge">
                ✂️ NIBBLYWELCOME15
              </div>
            </td>
            <td align="right" valign="middle">
              <div style="background:linear-gradient(135deg, #FF6B8B, #FFD166); width:52px; height:52px; border-radius:50%; text-align:center; line-height:52px; font-size:26px; box-shadow:0 4px 12px rgba(255, 107, 139, 0.35);">
                🎂
              </div>
            </td>
          </tr>
        </table>
        <div style="margin-top:12px; border-top:1px dashed #FFB4A2; padding-top:8px; font-size:10.5px; color:#784852; line-height:1.5;">
          <table width="100%">
            <tr>
              <td width="33%">🍓 <strong>สะสม Berry Point</strong></td>
              <td width="34%">🎂 <strong>ฟรีขนม 1 ซองวันเกิด</strong></td>
              <td width="33%">🚚 <strong>ส่งฟรีเมื่อครบ ฿450</strong></td>
            </tr>
          </table>
        </div>
      </div>

      <!-- รสชาติและความสนใจของคุณ ตกแต่งด้วยผลไม้ -->
      <div class="taste-box">
        <div style="font-size:12px; font-weight:800; color:#E65100; margin-bottom:6px;">
          🥑 รสชาติที่คุณชื่นชอบ & สไตล์สุขภาพที่ตรงใจ:
        </div>
        <div>
          <span class="taste-pill" style="background:#FFE5EC; color:#D81159;">🍓 เปรี้ยวอมหวานผลไม้แท้</span>
          <span class="taste-pill" style="background:#F3E8FF; color:#6B21A8;">🫐 เบอร์รี่รวมสดชื่น</span>
          <span class="taste-pill" style="background:#E6F4EA; color:#137333;">🌿 อบกรอบไร้น้ำมัน (Air-Baked)</span>
        </div>
      </div>

      <!-- หัวข้อสินค้าแนะนำ 4 รายการ -->
      <div style="text-align:center; margin-bottom:18px;">
        <div style="font-size:16px; margin-bottom:2px;">✨ 🍓 🍍 🫐 🥑 ✨</div>
        <h2 style="margin:2px 0 4px; font-size:18px; font-weight:900; color:#D81159; letter-spacing:0.3px;">
          ขนมแนะนำ 4 รายการที่คัดสรรมาเพื่อคุณ
        </h2>
        <p style="margin:0; font-size:11.5px; color:#718096;">
          คัดสรรผลไม้และธัญพืชแท้ สดใหม่ กรอบอร่อย ไร้สารเติมแต่ง
        </p>
      </div>

      <!-- รายการสินค้า 1: Berry Granola (สตรอว์เบอร์รี + บลูเบอร์รี สีชมพูสดใส) -->
      <div class="prod-card" style="background:#FFF0F3; border:2px solid #FF85A1;">
        <div class="prod-img-wrap">
          <img src="${prod1}" class="prod-img" alt="Berry Granola" />
          <div class="prod-emoji-corner">🍓</div>
        </div>
        <div style="flex:1;">
          <span class="badge-tag" style="background:#FF3366; color:#FFFFFF;">🍓 BEST SELLER อันดับ 1</span>
          <h3 class="prod-title">NIBBLY Berry Granola</h3>
          <p class="prod-desc">เปรี้ยวอมหวานเบอร์รี่แท้สดชื่น อัลมอนด์กรุบกรอบ ข้าวโอ๊ตเต็มเมล็ด</p>
          <span class="fruit-chips" style="background:#FFE0E6; color:#C9184A;">🍓 สตรอว์เบอร์รี · 🫐 บลูเบอร์รี · 🌾 โอ๊ต</span>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span class="prod-price" style="color:#FF3366;">฿149</span>
                <span style="font-size:10px; color:#888;">/ซอง</span>
              </td>
              <td align="right">
                <a href="https://k1ts4k0n.github.io/NIBBLY/shop/nibbly-berry-granola/" target="_blank" class="btn-buy" style="background:linear-gradient(135deg, #FF6584, #FF3366); color:#FFFFFF;">
                  ช้อปเลย ➔
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- รายการสินค้า 2: Choco Oat Crunch (กล้วยหอมทอง + ช็อกโกแลต สีเหลืองทองอบอุ่น) -->
      <div class="prod-card" style="background:#FFF8EA; border:2px solid #F4A261;">
        <div class="prod-img-wrap">
          <img src="${prod2}" class="prod-img" alt="Choco Oat Crunch" />
          <div class="prod-emoji-corner">🍌</div>
        </div>
        <div style="flex:1;">
          <span class="badge-tag" style="background:#E76F51; color:#FFFFFF;">🍫 POPULAR โกโก้แท้ฟินๆ</span>
          <h3 class="prod-title">Choco Oat Crunch</h3>
          <p class="prod-desc">ดาร์กโกโก้แท้เข้มข้น กรอบเพลิน แป้งต่ำ ไฟเบอร์ 4g ไม่รู้สึกผิด</p>
          <span class="fruit-chips" style="background:#FFE8D6; color:#B04A26;">🍫 โกโก้ 100% · 🍌 กล้วยทอง · 🌴 อินทผาลัม</span>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span class="prod-price" style="color:#D46200;">฿139</span>
                <span style="font-size:10px; color:#888;">/ซอง</span>
              </td>
              <td align="right">
                <a href="https://k1ts4k0n.github.io/NIBBLY/shop/choco-oat-crunch/" target="_blank" class="btn-buy" style="background:linear-gradient(135deg, #F9A03F, #E76F51); color:#FFFFFF;">
                  ช้อปเลย ➔
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- รายการสินค้า 3: Honey Almond Crunch (น้ำผึ้งป่า + มะพร้าว สีทองสดใส) -->
      <div class="prod-card" style="background:#FFFDF0; border:2px solid #FFD166;">
        <div class="prod-img-wrap">
          <img src="${prod3}" class="prod-img" alt="Honey Almond Crunch" />
          <div class="prod-emoji-corner">🐝</div>
        </div>
        <div style="flex:1;">
          <span class="badge-tag" style="background:#E69500; color:#FFFFFF;">🍯 STAFF PICK น้ำผึ้งป่าแท้เดือน 5</span>
          <h3 class="prod-title">Honey Almond Crunch</h3>
          <p class="prod-desc">อัลมอนด์แคลิฟอร์เนียคั่วทอง น้ำผึ้งดอกไม้ป่าแท้ หอมละมุนลงตัว</p>
          <span class="fruit-chips" style="background:#FFF3C4; color:#B26A00;">🍯 น้ำผึ้งป่า · 🌰 อัลมอนด์ · 🥥 มะพร้าวอบ</span>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span class="prod-price" style="color:#D97706;">฿139</span>
                <span style="font-size:10px; color:#888;">/ซอง</span>
              </td>
              <td align="right">
                <a href="https://k1ts4k0n.github.io/NIBBLY/shop/honey-almond-crunch/" target="_blank" class="btn-buy" style="background:linear-gradient(135deg, #FFC038, #E69500); color:#FFFFFF;">
                  ช้อปเลย ➔
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- รายการสินค้า 4: Dark Cocoa Nut Mix (อะโวคาโด + ถั่วรวม สีเขียวมิ้นต์สุขภาพ) -->
      <div class="prod-card" style="background:#F0FFF4; border:2px solid #52B788;">
        <div class="prod-img-wrap">
          <img src="${prod4}" class="prod-img" alt="Dark Cocoa Nut Mix" />
          <div class="prod-emoji-corner">🥑</div>
        </div>
        <div style="flex:1;">
          <span class="badge-tag" style="background:#2D6A4F; color:#FFFFFF;">🥑 HEALTHY PICK ถั่วรวมไขมันดี HDL</span>
          <h3 class="prod-title">Dark Cocoa Nut Mix</h3>
          <p class="prod-desc">เม็ดมะม่วงหิมพานต์ อัลมอนด์ เฮเซลนัท เคลือบโกโก้เข้มสะใจ</p>
          <span class="fruit-chips" style="background:#D8F3DC; color:#1B4332;">🥑 อะโวคาโด · 🥜 มะม่วงหิมพานต์ · 🍫 โกโก้</span>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span class="prod-price" style="color:#2D6A4F;">฿155</span>
                <span style="font-size:10px; color:#888;">/ซอง</span>
              </td>
              <td align="right">
                <a href="https://k1ts4k0n.github.io/NIBBLY/shop/dark-cocoa-nut-mix/" target="_blank" class="btn-buy" style="background:linear-gradient(135deg, #52B788, #2D6A4F); color:#FFFFFF;">
                  ช้อปเลย ➔
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- ปุ่มกด Action สีสันสดใส น่ารัก ชวนกด -->
      <div style="margin-top:22px;">
        <a href="https://k1ts4k0n.github.io/NIBBLY/shop/" target="_blank" style="display:block; background:linear-gradient(135deg, #FF4D6D 0%, #FF9E00 50%, #FFD000 100%); color:#FFFFFF; font-size:14px; font-weight:900; padding:14px; border-radius:28px; text-decoration:none; text-align:center; margin-bottom:10px; box-shadow:0 6px 18px rgba(255, 77, 109, 0.35);">
          🛍️ 🍓 ช้อปขนมผลไม้อบกรอบทั้งหมด (20 เมนู) ➔
        </a>
        <a href="https://k1ts4k0n.github.io/NIBBLY/recommend/" target="_blank" style="display:block; background:#E8F5E9; border:2px solid #52B788; color:#1B4332; font-size:13px; font-weight:800; padding:12px; border-radius:28px; text-decoration:none; text-align:center; margin-bottom:10px;">
          ✨ 🥑 แนะนำขนมสุขภาพเฉพาะบุคคล (Snack Finder) ➔
        </a>
        <a href="https://k1ts4k0n.github.io/NIBBLY/" target="_blank" style="display:block; background:#FFE5EC; border:2px solid #FF85A1; color:#D81159; font-size:13px; font-weight:800; padding:12px; border-radius:28px; text-decoration:none; text-align:center;">
          🏡 🌈 กลับไปที่หน้าร้าน NIBBLY
        </a>
      </div>

      <!-- ท้ายอีเมลน่ารักสดใส -->
      <div style="text-align:center; font-size:11px; color:#8E9AA0; margin-top:24px; border-top:1.5px solid #F0F2F5; padding-top:16px; line-height:1.6;">
        🍓 🫐 🥝 <strong>NIBBLY Healthy Treats</strong> · ขนมดี เติมวันให้สดใส 🍍 🥥 🥑<br>
        อีเมลนี้ส่งอัตโนมัติจากระบบสมาชิก NIBBLY ถึง <span style="color:#FF4D6D; font-weight:700;">atetfitqlpseo123@gmail.com</span>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  await page.setContent(registerHtml, { waitUntil: 'networkidle' });
  const registerImgPath = path.join(__dirname, '../email-content-2-register.png');
  const registerImgArtifact = '/Users/artkung/.gemini/antigravity-ide/brain/5fb9c6d0-3eb4-4a2d-9001-305afe8d2549/email-content-2-register.png';
  await page.screenshot({ path: registerImgPath, fullPage: true });
  fs.copyFileSync(registerImgPath, registerImgArtifact);
  console.log('Saved 4-product register email screenshot:', registerImgPath);

  // ==============================================================================
  // 2. RENDER SUBSCRIBE NEWSLETTER EMAIL (CUTE & COLORFUL FRUITS)
  // ==============================================================================
  const subscribeHtml = `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>Email ตอบรับการสมัครรับข่าวสาร NIBBLY</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 16px 14px 40px;
      background: linear-gradient(180deg, #F0FFF4 0%, #FFFDF9 35%, #FFF0F5 100%);
      font-family: 'Prompt', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #2D3748;
      -webkit-font-smoothing: antialiased;
    }
    .status-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2px 14px 10px;
      font-size: 13.5px;
      font-weight: 700;
      color: #1A202C;
    }
    .mail-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px 14px;
      font-size: 13px;
      color: #2D6A4F;
      font-weight: 600;
      border-bottom: 1.5px solid rgba(82, 183, 136, 0.2);
      margin-bottom: 14px;
    }
    .mail-nav-title {
      color: #2D3748;
      font-weight: 800;
      font-size: 13.5px;
    }
    .container {
      max-width: 422px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border-radius: 34px;
      overflow: hidden;
      box-shadow: 0 16px 45px rgba(82, 183, 136, 0.16), 0 2px 10px rgba(0,0,0,0.04);
      border: 2px solid #D8F3DC;
    }
    .banner {
      background: linear-gradient(135deg, #FF758F 0%, #FFB4A2 30%, #FFD166 65%, #52B788 100%);
      padding: 32px 20px 26px;
      text-align: center;
      position: relative;
    }
    .fruit-ribbon {
      font-size: 22px;
      letter-spacing: 7px;
      margin-bottom: 12px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
    }
    .brand-box {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #FFFFFF;
      padding: 8px 22px;
      border-radius: 30px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      margin-bottom: 10px;
    }
    .brand-title {
      font-size: 26px;
      font-weight: 900;
      color: #1B4332;
      letter-spacing: 0.5px;
    }
    .brand-sub {
      font-size: 13px;
      color: #FFFFFF;
      font-weight: 800;
      letter-spacing: 1px;
      text-shadow: 0 1px 4px rgba(0,0,0,0.25);
    }
    .content {
      padding: 24px 20px 30px;
      text-align: left;
    }
    .headline {
      font-size: 22px;
      font-weight: 900;
      color: #1B4332;
      margin: 0 0 14px;
      line-height: 1.3;
      text-align: center;
    }
    .email-box {
      background: #FFF9F2;
      border: 2px dashed #FFB4A2;
      border-radius: 16px;
      padding: 12px 16px;
      margin-bottom: 20px;
      text-align: center;
      font-size: 13px;
      color: #555;
    }
    .email-val {
      color: #E63946;
      font-weight: 800;
      font-size: 14px;
    }
    .benefit-card {
      background: #FAFAFA;
      border-radius: 18px;
      padding: 14px 16px;
      margin-bottom: 14px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }
    .benefit-icon {
      font-size: 24px;
      flex-shrink: 0;
    }
    .benefit-title {
      font-size: 13.5px;
      font-weight: 800;
      color: #1A202C;
      margin: 0 0 2px;
    }
    .benefit-desc {
      font-size: 11.5px;
      color: #555;
      margin: 0;
      line-height: 1.45;
    }
    .tip-box {
      background: #E8F5E9;
      border-left: 5px solid #52B788;
      border-radius: 0 16px 16px 0;
      padding: 14px 16px;
      margin: 20px 0 22px;
      font-size: 12px;
      color: #1B4332;
      line-height: 1.6;
    }
    .btn-action {
      display: block;
      background: linear-gradient(135deg, #FF6B8B 0%, #FF9E00 100%);
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 900;
      padding: 14px;
      border-radius: 28px;
      text-decoration: none;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 6px 18px rgba(255, 107, 139, 0.35);
    }
    .btn-sub {
      display: block;
      background: #F0FFF4;
      border: 2px solid #52B788;
      color: #1B4332;
      font-size: 13px;
      font-weight: 800;
      padding: 11px;
      border-radius: 28px;
      text-decoration: none;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="status-bar">
    <span>10:14</span>
    <span>5G 􀛨 100%</span>
  </div>

  <div class="mail-nav">
    <span>❮ กล่องขาเข้า</span>
    <span class="mail-nav-title">🍓 NIBBLY Newsletter ✨</span>
    <span>•••</span>
  </div>

  <div class="container">
    <div class="banner">
      <div class="fruit-ribbon">
        🍓 🥑 🍍 🫐 🍌 🥥 🍯 🥝 🍇
      </div>
      <div class="brand-box">
        <span style="font-size:24px;">🍓</span>
        <span class="brand-title">NIBBLY</span>
      </div>
      <div class="brand-sub">
        ขนมดี · เติมวันให้สดใส 🌈✨
      </div>
    </div>

    <div class="content">
      <h1 class="headline">
        🎉 ขอบคุณที่สมัครรับข่าวสาร 🥳
      </h1>

      <div class="email-box">
        <span>เพิ่มอีเมลเข้าสู่ระบบสมาชิก NIBBLY แล้ว:</span><br>
        <span class="email-val">atetfitqlpseo123@gmail.com</span>
      </div>

      <!-- สิทธิประโยชน์สีสันสดใส 3 ข้อ -->
      <div class="benefit-card" style="border:1.5px solid #FF85A1; background:#FFF0F3;">
        <span class="benefit-icon">🍓</span>
        <div>
          <div class="benefit-title" style="color:#C9184A;">ส่วนลด 15% ทันทีในการสั่งซื้อแรก</div>
          <div class="benefit-desc">กรอกโค้ด <strong>NIBBLYWELCOME15</strong> ตอนสั่งซื้อขนมผลไม้อบกรอบ ไม่มีขั้นต่ำ</div>
        </div>
      </div>

      <div class="benefit-card" style="border:1.5px solid #FFD166; background:#FFFDF0;">
        <span class="benefit-icon">🍌</span>
        <div>
          <div class="benefit-title" style="color:#B26A00;">เมนูผลไม้ตามฤดูกาล & ทริคโภชนาการ</div>
          <div class="benefit-desc">อัปเดตสูตรขนมคลีน แคลอรี่ต่ำ และสารอาหารบำรุงสุขภาพส่งตรงถึงกล่องข้อความ</div>
        </div>
      </div>

      <div class="benefit-card" style="border:1.5px solid #52B788; background:#F0FFF4;">
        <span class="benefit-icon">🥑</span>
        <div>
          <div class="benefit-title" style="color:#1B4332;">สิทธิ์ชิมรสชาติใหม่และ Flash Sale</div>
          <div class="benefit-desc">ร่วมสนุกทดลองรสชาติพิเศษก่อนใคร และโปรโมชั่นลดราคาสุดคุ้มเฉพาะสมาชิก</div>
        </div>
      </div>

      <!-- กล่องคำแนะนำน่ารัก -->
      <div class="tip-box">
        🥑 <strong>คำแนะนำพิเศษ:</strong> คุณสามารถใช้ระบบ <strong>Snack Finder</strong> บนเว็บไซต์ NIBBLY เพื่อค้นหาผลไม้อบกรอบที่เหมาะกับเป้าหมายสุขภาพและแคลอรี่ที่คุณต้องการได้ทันที!
      </div>

      <!-- ปุ่มกดน่ารัก -->
      <a href="https://k1ts4k0n.github.io/NIBBLY/shop/" target="_blank" class="btn-action">
        🛍️ 🍓 เริ่มต้นเลือกช้อปขนมผลไม้สดชื่น ➔
      </a>

      <a href="https://k1ts4k0n.github.io/NIBBLY/" target="_blank" class="btn-sub">
        🏡 🌈 กลับไปที่หน้าร้าน NIBBLY
      </a>

      <div style="text-align:center; font-size:11px; color:#8E9AA0; margin-top:24px; border-top:1.5px solid #F0F2F5; padding-top:16px;">
        🍓 NIBBLY · ขนมดี เติมวันให้สดใส 🥝
      </div>
    </div>
  </div>
</body>
</html>
  `;

  await page.setContent(subscribeHtml, { waitUntil: 'networkidle' });
  const subscribeImgPath = path.join(__dirname, '../email-content-1-subscribe.png');
  const subscribeImgArtifact = '/Users/artkung/.gemini/antigravity-ide/brain/5fb9c6d0-3eb4-4a2d-9001-305afe8d2549/email-content-1-subscribe.png';
  await page.screenshot({ path: subscribeImgPath, fullPage: true });
  fs.copyFileSync(subscribeImgPath, subscribeImgArtifact);
  console.log('Saved subscribe email screenshot:', subscribeImgPath);

  await browser.close();
  console.log('All email screenshots successfully generated!');
}

main().catch(console.error);
