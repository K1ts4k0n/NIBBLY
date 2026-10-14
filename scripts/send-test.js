const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'atetfitqlpseo123@gmail.com',
    pass: 'yuwthzzxvjxmoxda'
  }
});

const topProducts = [
  {
    name: 'NIBBLY Berry Granola',
    badge: '🍓 BEST SELLER อันดับ 1',
    badgeBg: '#FF3366',
    cardBg: '#FFF0F3',
    cardBorder: '#FF85A1',
    priceColor: '#FF3366',
    btnBg: 'linear-gradient(135deg, #FF6584 0%, #FF3366 100%)',
    fruitChips: '🍓 สตรอว์เบอร์รี · 🫐 บลูเบอร์รี · 🌾 โอ๊ต',
    chipBg: '#FFE0E6',
    chipColor: '#C9184A',
    image: path.join(process.cwd(), 'public/products/berry-granola.jpg'),
    cid: 'prod_1',
    desc: 'เปรี้ยวอมหวานเบอร์รี่สดชื่น อัลมอนด์กรุบกรอบ ข้าวโอ๊ตเต็มเมล็ด',
    price: '149',
    url: 'https://k1ts4k0n.github.io/NIBBLY/shop/nibbly-berry-granola/'
  },
  {
    name: 'Choco Oat Crunch',
    badge: '🍫 POPULAR โกโก้แท้ฟินๆ',
    badgeBg: '#E76F51',
    cardBg: '#FFF8EA',
    cardBorder: '#F4A261',
    priceColor: '#D46200',
    btnBg: 'linear-gradient(135deg, #F9A03F 0%, #E76F51 100%)',
    fruitChips: '🍫 โกโก้ 100% · 🍌 กล้วยทอง · 🌴 อินทผาลัม',
    chipBg: '#FFE8D6',
    chipColor: '#B04A26',
    image: path.join(process.cwd(), 'public/products/choco.jpg'),
    cid: 'prod_2',
    desc: 'ดาร์กโกโก้แท้เข้มข้น กรอบเพลิน แป้งต่ำ ไฟเบอร์ 4g ไม่รู้สึกผิด',
    price: '139',
    url: 'https://k1ts4k0n.github.io/NIBBLY/shop/choco-oat-crunch/'
  },
  {
    name: 'Honey Almond Crunch',
    badge: '🍯 STAFF PICK น้ำผึ้งป่าแท้เดือน 5',
    badgeBg: '#E69500',
    cardBg: '#FFFDF0',
    cardBorder: '#FFD166',
    priceColor: '#D97706',
    btnBg: 'linear-gradient(135deg, #FFC038 0%, #E69500 100%)',
    fruitChips: '🍯 น้ำผึ้งป่า · 🌰 อัลมอนด์ · 🥥 มะพร้าวอบ',
    chipBg: '#FFF3C4',
    chipColor: '#B26A00',
    image: path.join(process.cwd(), 'public/products/honey.jpg'),
    cid: 'prod_3',
    desc: 'อัลมอนด์แคลิฟอร์เนียคั่วทอง น้ำผึ้งดอกไม้ป่าแท้ หอมละมุนลงตัว',
    price: '139',
    url: 'https://k1ts4k0n.github.io/NIBBLY/shop/honey-almond-crunch/'
  },
  {
    name: 'Dark Cocoa Nut Mix',
    badge: '🥑 HEALTHY PICK ถั่วรวมไขมันดี HDL',
    badgeBg: '#2D6A4F',
    cardBg: '#F0FFF4',
    cardBorder: '#52B788',
    priceColor: '#2D6A4F',
    btnBg: 'linear-gradient(135deg, #52B788 0%, #2D6A4F 100%)',
    fruitChips: '🥑 อะโวคาโด · 🥜 มะม่วงหิมพานต์ · 🍫 โกโก้',
    chipBg: '#D8F3DC',
    chipColor: '#1B4332',
    image: path.join(process.cwd(), 'public/products/dark-cocoa.jpg'),
    cid: 'prod_4',
    desc: 'เม็ดมะม่วงหิมพานต์ อัลมอนด์ เฮเซลนัท เคลือบโกโก้เข้มสะใจ',
    price: '155',
    url: 'https://k1ts4k0n.github.io/NIBBLY/shop/dark-cocoa-nut-mix/'
  }
];

async function run() {
  console.log('⏳ กำลังส่ง Email ต้อนรับสมาชิกใหม่ สดใสหลากสี พร้อมผลไม้น่ารัก 🍓 🫐 🥑...');

  // เตรียม attachments สำหรับรูปภาพสินค้าทั้ง 4 ตัว
  const attachments = topProducts.map(p => ({
    filename: `${p.cid}.jpg`,
    path: p.image,
    cid: p.cid
  }));

  const productsHtml = topProducts.map(p => `
    <div style="background:${p.cardBg}; border:2px solid ${p.cardBorder}; border-radius:22px; padding:16px; margin-bottom:18px; text-align:left; box-shadow:0 6px 18px rgba(0,0,0,0.04);">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="125" valign="top" style="padding-right:14px;">
            <div style="position:relative; width:125px; height:125px; border-radius:16px; overflow:hidden; background:#F5F5F5; border:2px solid #FFFFFF; box-shadow:0 4px 10px rgba(0,0,0,0.08);">
              <img src="cid:${p.cid}" alt="${p.name}" style="width:125px; height:125px; object-fit:cover; display:block; border-radius:14px;" />
            </div>
          </td>
          <td valign="top">
            <span style="display:inline-block; background:${p.badgeBg}; color:#FFFFFF; font-size:10px; font-weight:800; padding:3.5px 9px; border-radius:6px; margin-bottom:5px; letter-spacing:0.3px;">
              ${p.badge}
            </span>
            <h3 style="margin:0 0 3px; font-size:16px; font-weight:800; color:#1A202C; line-height:1.3;">
              ${p.name}
            </h3>
            <p style="margin:0 0 6px; font-size:11.5px; color:#4A5568; line-height:1.4;">
              ${p.desc}
            </p>
            <div style="margin-bottom:8px;">
              <span style="display:inline-block; background:${p.chipBg}; color:${p.chipColor}; font-size:10.5px; font-weight:700; padding:3px 8px; border-radius:6px;">
                ${p.fruitChips}
              </span>
            </div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="font-size:19px; font-weight:900; color:${p.priceColor};">฿${p.price}</span>
                  <span style="font-size:11px; color:#718096; margin-left:3px;">/ซอง</span>
                </td>
                <td align="right">
                  <a href="${p.url}" target="_blank" style="display:inline-block; background:${p.btnBg}; color:#FFFFFF; font-size:11.5px; font-weight:800; padding:7px 16px; border-radius:20px; text-decoration:none; box-shadow:0 3px 8px rgba(0,0,0,0.12);">
                    ช้อปเลย ➔
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html lang="th">
    <head>
      <meta charset="UTF-8">
      <title>🍓 ยินดีต้อนรับสู่ NIBBLY Healthy Treats</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap');
      </style>
    </head>
    <body style="margin:0; padding:0; background-color:#FFF5EC; font-family:'Prompt',sans-serif; color:#2D3748;">
      <div style="width:100%; background-color:#FFF5EC; padding:28px 0 50px;">
        <div style="max-width:530px; margin:0 auto; background-color:#FFFFFF; border-radius:36px; overflow:hidden; box-shadow:0 20px 55px rgba(255,112,137,0.18); border:2px solid #FFE3EC;">
          
          <!-- เฮดเดอร์แฟนซีผลไม้สดใส -->
          <div style="background: linear-gradient(135deg, #FF6B8B 0%, #FFA07A 35%, #FFD166 70%, #6BCB77 100%); padding:38px 24px 30px; text-align:center; position:relative;">
            <div style="font-size:26px; letter-spacing:8px; margin-bottom:12px;">
              🍓 🥝 🫐 🍌 🍍 🍑 🥥 🥑 🍯
            </div>

            <div style="display:inline-flex; align-items:center; gap:8px; background:#FFFFFF; padding:6px 20px; border-radius:30px; margin-bottom:14px; box-shadow:0 4px 14px rgba(230,57,70,0.2);">
              <span style="font-size:18px;">🍓</span>
              <span style="font-size:12.5px; font-weight:900; color:#E63946; letter-spacing:0.8px;">NIBBLY VIP MEMBER CLUB</span>
              <span style="font-size:15px;">✨</span>
            </div>

            <h1 style="margin:0 0 6px; font-size:26px; font-weight:900; color:#FFFFFF; line-height:1.3; text-shadow:0 2px 6px rgba(0,0,0,0.2);">
              🎉 ยินดีต้อนรับคุณ Artkung Rakyouna 🥳
            </h1>
            <p style="margin:0; font-size:13.5px; color:#FFF8F0; font-weight:600; line-height:1.6; text-shadow:0 1px 3px rgba(0,0,0,0.15);">
              ครอบครัวขนมผลไม้อบกรอบ NIBBLY สดใส อร่อยสุขภาพดีทุกวัน 🌈
            </p>
          </div>

          <div style="padding:28px 22px;">

            <!-- บัตรสมาชิกน่ารัก สิทธิพิเศษและโค้ดลด -->
            <div style="background:linear-gradient(135deg, #FFF0F5 0%, #FFF9E6 50%, #F0FFF4 100%); border:2px dashed #FF758F; border-radius:24px; padding:20px; text-align:left; margin-bottom:24px; box-shadow:0 8px 20px rgba(255,117,143,0.12);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display:inline-block; background:#FF4D6D; color:#FFFFFF; font-size:10.5px; font-weight:900; padding:4px 10px; border-radius:6px; letter-spacing:0.4px;">
                      🎁 สิทธิพิเศษสมาชิกใหม่ (WELCOME GIFT)
                    </span>
                    <p style="margin:8px 0 2px; font-size:12.5px; color:#6B2D5C; font-weight:700;">
                      คูปองส่วนลดต้อนรับ 15% (ไม่มีขั้นต่ำ)
                    </p>
                    <div style="background:#FFFFFF; border:2px solid #E63946; border-radius:12px; padding:7px 14px; display:inline-block; margin-top:4px; box-shadow:0 3px 8px rgba(230,57,70,0.1);">
                      <span style="font-size:20px; font-weight:900; color:#E63946; font-family:monospace; letter-spacing:2px;">✂️ NIBBLYWELCOME15</span>
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <div style="background:linear-gradient(135deg, #FF6B8B, #FFD166); width:56px; height:56px; border-radius:50%; text-align:center; line-height:56px; font-size:28px; box-shadow:0 4px 12px rgba(255,107,139,0.35);">
                      🎂
                    </div>
                  </td>
                </tr>
              </table>

              <div style="margin-top:14px; padding-top:10px; border-top:1px dashed #FFB4A2; font-size:11.5px; color:#784852; line-height:1.6;">
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
            <div style="background:#FFF9F2; border:1.5px solid #FFD8A8; border-radius:20px; padding:16px 18px; margin-bottom:26px; text-align:left;">
              <div style="font-size:13px; font-weight:800; color:#E65100; margin-bottom:8px;">
                🥑 รสชาติที่คุณชื่นชอบ & สไตล์สุขภาพที่ตรงใจ:
              </div>
              <table width="100%" cellpadding="0" cellspacing="4" style="font-size:11.5px;">
                <tr>
                  <td style="background:#FFE5EC; border:1px solid #FF85A1; border-radius:10px; padding:8px 10px; color:#D81159; font-weight:700;">
                    🍓 <strong>รสชาติ:</strong> เปรี้ยวอมหวานผลไม้แท้
                  </td>
                  <td style="background:#F3E8FF; border:1px solid #D8B4FE; border-radius:10px; padding:8px 10px; color:#6B21A8; font-weight:700;">
                    🫐 <strong>กลิ่น:</strong> เบอร์รี่รวมสดชื่น
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="background:#E6F4EA; border:1px solid #A8DAB5; border-radius:10px; padding:8px 10px; color:#137333; font-weight:700;">
                    🌿 <strong>กรรมวิธี:</strong> อบกรอบด้วยลมร้อน (Air-Baked ไร้น้ำมัน หวานธรรมชาติ แคลต่ำ)
                  </td>
                </tr>
              </table>
            </div>

            <!-- หัวข้อสินค้าแนะนำ 4 ตัวจากเว็บ NIBBLY -->
            <div style="text-align:center; margin-bottom:22px;">
              <div style="font-size:20px; margin-bottom:4px;">✨ 🍓 🍍 🫐 🥑 ✨</div>
              <h2 style="margin:2px 0 6px; font-size:22px; font-weight:900; color:#D81159; letter-spacing:0.3px;">
                ขนมแนะนำ 4 รายการที่คัดสรรมาเพื่อคุณ
              </h2>
              <p style="margin:0; font-size:12.5px; color:#718096;">
                คัดสรรผลไม้และธัญพืชแท้ สดใหม่ กรอบอร่อย ไร้สารเติมแต่ง
              </p>
            </div>

            <!-- รายการสินค้าแนะนำ 4 ตัว -->
            ${productsHtml}

            <!-- ปุ่มกด Action สีสันสดใส น่ารัก ชวนกด -->
            <div style="margin-top:28px;">
              <a href="https://k1ts4k0n.github.io/NIBBLY/shop/" target="_blank" style="display:block; background:linear-gradient(135deg, #FF4D6D 0%, #FF9E00 50%, #FFD000 100%); color:#FFFFFF; font-size:15px; font-weight:900; padding:15px; border-radius:32px; text-decoration:none; text-align:center; margin-bottom:12px; box-shadow:0 6px 20px rgba(255,77,109,0.35);">
                🛍️ 🍓 ช้อปขนมผลไม้อบกรอบทั้งหมด (20 เมนู) ➔
              </a>
              <a href="https://k1ts4k0n.github.io/NIBBLY/recommend/" target="_blank" style="display:block; background:#E8F5E9; border:2px solid #52B788; color:#1B4332; font-size:13.5px; font-weight:800; padding:12px; border-radius:30px; text-decoration:none; text-align:center; margin-bottom:10px;">
                ✨ 🥑 แนะนำขนมสุขภาพเฉพาะบุคคล (Snack Finder) ➔
              </a>
              <a href="https://k1ts4k0n.github.io/NIBBLY/" target="_blank" style="display:block; background:#FFE5EC; border:2px solid #FF85A1; color:#D81159; font-size:13.5px; font-weight:800; padding:12px; border-radius:30px; text-decoration:none; text-align:center;">
                🏡 🌈 กลับไปที่หน้าร้าน NIBBLY
              </a>
            </div>

            <!-- ท้ายอีเมลน่ารักสดใส -->
            <div style="text-align:center; font-size:11px; color:#8E9AA0; margin-top:30px; border-top:1.5px solid #F0F2F5; padding-top:20px; line-height:1.7;">
              <div style="font-size:20px; margin-bottom:6px;">🍓 🥑 🍍 🫐 🍌 🥥 🍯</div>
              <p style="margin:0 0 4px; font-weight:800; color:#4A5568; font-size:12px;">
                NIBBLY Healthy Treats · ขนมดี เติมวันให้สดใส ☀️
              </p>
              <p style="margin:0;">อีเมลนี้ส่งอัตโนมัติจากระบบสมาชิกของร้าน NIBBLY ถึง <span style="color:#FF4D6D; font-weight:700;">atetfitqlpseo123@gmail.com</span></p>
            </div>

          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const info = await transporter.sendMail({
    from: '"NIBBLY Healthy Treats" <atetfitqlpseo123@gmail.com>',
    to: 'atetfitqlpseo123@gmail.com',
    subject: '🍓 ยินดีต้อนรับคุณ Artkung Rakyouna - 4 ขนมสุขภาพสดใสหลากสีจาก NIBBLY 🌈✨',
    html: html,
    attachments: attachments
  });

  console.log('🎉 ส่ง Email สดใสพร้อมรูป 4 สินค้าสำเร็จ! MessageID:', info.messageId);
}

run().catch(console.error);
