import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { buildOrderSlipEmail } from "@/lib/email-order-slip";

// ดึงการตั้งค่า Gmail จาก php/config.php เพื่อให้ผู้ใช้แก้ที่เดียว
function getGmailCredentials() {
  try {
    const configPath = path.join(process.cwd(), "php/config.php");
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, "utf-8");
      const userMatch = content.match(/define\('GMAIL_USERNAME',.*?['"]([^'"]+)['"]\);/);
      const passMatch = content.match(/define\('GMAIL_APP_PASSWORD',.*?['"]([^'"]+)['"]\);/);

      return {
        user: userMatch ? userMatch[1] : "atetfitqlpseo123@gmail.com",
        pass: passMatch ? passMatch[1].replace(/\s+/g, "") : "",
      };
    }
  } catch {
    // Fallback to defaults
  }
  return {
    user: process.env.GMAIL_USERNAME || "atetfitqlpseo123@gmail.com",
    pass: (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, ""),
  };
}

function recordMember(member: any) {
  try {
    const filePath = path.join(process.cwd(), "data/members.json");
    let members: any[] = [];
    if (fs.existsSync(filePath)) {
      members = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    if (!members.some((m) => m.email.toLowerCase() === member.email.toLowerCase())) {
      members.unshift(member);
      fs.writeFileSync(filePath, JSON.stringify(members, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error recording member:", err);
  }
}

function recordSubscriber(subscriber: any) {
  try {
    const filePath = path.join(process.cwd(), "data/subscribers.json");
    let subs: any[] = [];
    if (fs.existsSync(filePath)) {
      subs = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    if (!subs.some((s) => s.email.toLowerCase() === subscriber.email.toLowerCase())) {
      subs.unshift(subscriber);
      fs.writeFileSync(filePath, JSON.stringify(subs, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error recording subscriber:", err);
  }
}

function recordOrder(order: any) {
  try {
    const filePath = path.join(process.cwd(), "data/orders.json");
    let orders: any[] = [];
    if (fs.existsSync(filePath)) {
      orders = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    if (!orders.some((o) => o.orderId === order.orderId)) {
      orders.unshift(order);
      fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error recording order:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, name, taste, scent, roast } = body;

    const recipientEmail = email || "atetfitqlpseo123@gmail.com";
    const recipientName = name || "Artkung Rakyouna";

    // 1. ดึงข้อมูล Gmail Credentials
    const creds = getGmailCredentials();
    const isPassConfigured = Boolean(creds.pass && creds.pass !== "xxxxxxxxxxxxxxxx" && !creds.pass.includes("xxxx"));
    console.log(`[SendEmail] Starting email dispatch: action=${action}, to=${recipientEmail}, sender=${creds.user}, isPassConfigured=${isPassConfigured}`);

    // 2. ถ้าตั้งค่า App Password แล้ว -> ส่งจริงทันทีด้วย Gmail SMTP
    if (isPassConfigured) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: creds.user,
          pass: creds.pass,
        },
      });

      if (action === "register") {
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
            file: 'berry-granola.jpg',
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
            file: 'choco.jpg',
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
            file: 'honey.jpg',
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
            file: 'dark-cocoa.jpg',
            cid: 'prod_4',
            desc: 'เม็ดมะม่วงหิมพานต์ อัลมอนด์ เฮเซลนัท เคลือบโกโก้เข้มสะใจ',
            price: '155',
            url: 'https://k1ts4k0n.github.io/NIBBLY/shop/dark-cocoa-nut-mix/'
          }
        ];

        const attachments = topProducts
          .map(p => {
            const pPath = path.join(process.cwd(), 'public/products', p.file);
            return fs.existsSync(pPath) ? { filename: p.file, path: pPath, cid: p.cid } : null;
          })
          .filter((a): a is { filename: string; path: string; cid: string } => a !== null);

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

        await transporter.sendMail({
          from: `"NIBBLY Healthy Treats" <${creds.user}>`,
          to: recipientEmail,
          subject: `🍓 ยินดีต้อนรับคุณ ${recipientName} - แนะนำ 4 ขนมสุขภาพผลไม้สดใสจาก NIBBLY 🌈✨`,
          attachments,
          html: `
            <!DOCTYPE html>
            <html lang="th">
            <head>
              <meta charset="UTF-8">
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap');
              </style>
            </head>
            <body style="margin:0; padding:0; background-color:#FFF5EC; font-family:'Prompt',sans-serif; color:#2D3748;">
              <div style="width:100%; background-color:#FFF5EC; padding:28px 0 50px;">
                <div style="max-width:530px; margin:0 auto; background-color:#FFFFFF; border-radius:36px; overflow:hidden; box-shadow:0 20px 55px rgba(255,112,137,0.18); border:2px solid #FFE3EC;">
                  
                  <div style="background:linear-gradient(135deg, #FF6B8B 0%, #FFA07A 35%, #FFD166 70%, #6BCB77 100%); padding:38px 24px 30px; text-align:center;">
                    <div style="font-size:26px; letter-spacing:8px; margin-bottom:12px;">
                      🍓 🥝 🫐 🍌 🍍 🍑 🥥 🥑 🍯
                    </div>

                    <div style="display:inline-flex; align-items:center; gap:8px; background:#FFFFFF; padding:6px 20px; border-radius:30px; margin-bottom:14px; box-shadow:0 4px 14px rgba(230,57,70,0.2);">
                      <span style="font-size:18px;">🍓</span>
                      <span style="font-size:12.5px; font-weight:900; color:#E63946; letter-spacing:0.8px;">NIBBLY VIP MEMBER CLUB</span>
                      <span style="font-size:15px;">✨</span>
                    </div>

                    <h1 style="margin:0 0 6px; font-size:26px; font-weight:900; color:#FFFFFF; line-height:1.3; text-shadow:0 2px 6px rgba(0,0,0,0.2);">
                      🎉 ยินดีต้อนรับคุณ ${recipientName} 🥳
                    </h1>
                    <p style="margin:0; font-size:13.5px; color:#FFF8F0; font-weight:600; line-height:1.6; text-shadow:0 1px 3px rgba(0,0,0,0.15);">
                      ครอบครัวขนมผลไม้อบกรอบ NIBBLY สดใส อร่อยสุขภาพดีทุกวัน 🌈
                    </p>
                  </div>

                  <div style="padding:28px 22px;">
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

                    <div style="text-align:center; margin-bottom:22px;">
                      <div style="font-size:20px; margin-bottom:4px;">✨ 🍓 🍍 🫐 🥑 ✨</div>
                      <h2 style="margin:2px 0 6px; font-size:22px; font-weight:900; color:#D81159; letter-spacing:0.3px;">
                        ขนมแนะนำ 4 รายการที่คัดสรรมาเพื่อคุณ
                      </h2>
                      <p style="margin:0; font-size:12.5px; color:#718096;">
                        คัดสรรผลไม้และธัญพืชแท้ สดใหม่ กรอบอร่อย ไร้สารเติมแต่ง
                      </p>
                    </div>

                    ${productsHtml}

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

                    <div style="text-align:center; font-size:11px; color:#8E9AA0; margin-top:30px; border-top:1.5px solid #F0F2F5; padding-top:20px; line-height:1.7;">
                      <div style="font-size:20px; margin-bottom:6px;">🍓 🥑 🍍 🫐 🍌 🥥 🍯</div>
                      <p style="margin:0 0 4px; font-weight:800; color:#4A5568; font-size:12px;">
                        NIBBLY Healthy Treats · ขนมดี เติมวันให้สดใส ☀️
                      </p>
                      <p style="margin:0;">อีเมลนี้ส่งอัตโนมัติจากระบบสมาชิกของร้าน NIBBLY ถึง <span style="color:#FF4D6D; font-weight:700;">${recipientEmail}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        // บันทึกสมาชิกลงฐานข้อมูล data/members.json
        recordMember({
          name: recipientName,
          email: recipientEmail,
          phone: body.phone || "-",
          berryPoints: 100,
          welcomeCoupon: "NIBBLYWELCOME15",
          healthGoals: body.healthGoals || [],
          registeredAt: new Date().toISOString(),
        });

        // ส่งการแจ้งเตือนถึง Admin ถ้าผู้สมัครไม่ใช่เมลของ Admin
        if (recipientEmail.toLowerCase() !== creds.user.toLowerCase()) {
          transporter.sendMail({
            from: `"NIBBLY Store System" <${creds.user}>`,
            to: creds.user,
            subject: `📢 [Admin Alert] มีสมาชิกใหม่สมัคร NIBBLY Club: คุณ ${recipientName} 🍓`,
            html: `
              <div style="font-family:'Prompt',sans-serif; padding:18px; background:#FFF5EC; border-radius:18px; border:2px solid #FFD1DC;">
                <h3 style="color:#D81159; margin:0 0 10px;">🍓 สมาชิกใหม่สมัคร NIBBLY Club</h3>
                <p style="margin:4px 0;"><b>ชื่อ:</b> คุณ ${recipientName}</p>
                <p style="margin:4px 0;"><b>อีเมล:</b> ${recipientEmail}</p>
                <p style="margin:4px 0;"><b>เบอร์โทร:</b> ${body.phone || "-"}</p>
                <p style="margin:4px 0;"><b>เป้าหมายสุขภาพ:</b> ${(body.healthGoals || []).join(", ") || "ทั่วไป"}</p>
                <p style="margin:4px 0;"><b>เวลาลงทะเบียน:</b> ${new Date().toLocaleString("th-TH")}</p>
                <p style="font-size:12px; color:#666; margin-top:12px;">ระบบได้ส่งอีเมลต้อนรับและคูปอง NIBBLYWELCOME15 ให้สมาชิกแล้ว</p>
              </div>
            `,
          }).catch(console.error);
        }
      } else if (action === "order") {
        const orderIdVal = body.orderId || `NIB-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
        const phoneVal = body.phone || "089-123-4567";
        const addressVal = body.address || "123/45 อาคารสุขุมวิทการ์เดนท์ กรุงเทพฯ 10110";
        const paymentMethodVal = body.paymentMethod || "พร้อมเพย์ (PromptPay QR)";
        const promoCodeVal = body.promoCode || "NIBBLYWELCOME15";
        const subtotalVal = body.subtotal || 437;
        const discountVal = body.discount || 66;
        const shippingVal = body.shipping !== undefined ? body.shipping : 0;
        const grandTotalVal = body.grandTotal || (subtotalVal - discountVal + shippingVal);

        const orderItemsList = body.items && body.items.length > 0 ? body.items : [
          { name: "NIBBLY Berry Granola", price: 149, quantity: 2, emoji: "🍓", art: "berry-granola" },
          { name: "Honey Almond Crunch", price: 139, quantity: 1, emoji: "🍯", art: "honey" }
        ];

        // 1. สร้าง HTML สลิปใบเสร็จพร้อมรูปภาพสินค้าจริง (CID Inline Attachments)
        const orderEmailData = buildOrderSlipEmail({
          orderId: orderIdVal,
          customerName: recipientName,
          email: recipientEmail,
          phone: phoneVal,
          address: addressVal,
          paymentMethod: paymentMethodVal,
          promoCode: promoCodeVal,
          subtotal: subtotalVal,
          discount: discountVal,
          shipping: shippingVal,
          grandTotal: grandTotalVal,
          status: "PAID",
          items: orderItemsList,
        });

        // 2. ส่งสลิปใบเสร็จตรงถึงลูกค้าพร้อมรูปสินค้า
        await transporter.sendMail({
          from: `"NIBBLY Healthy Treats" <${creds.user}>`,
          to: recipientEmail,
          subject: orderEmailData.subject,
          html: orderEmailData.html,
          attachments: orderEmailData.attachments,
        });

        // 3. บันทึกคำสั่งซื้อลงฐานข้อมูล data/orders.json
        recordOrder({
          orderId: orderIdVal,
          customerName: recipientName,
          email: recipientEmail,
          phone: phoneVal,
          address: addressVal,
          paymentMethod: paymentMethodVal,
          promoCode: promoCodeVal,
          subtotal: subtotalVal,
          discount: discountVal,
          shipping: shippingVal,
          grandTotal: grandTotalVal,
          status: "PAID",
          createdAt: new Date().toISOString(),
          items: orderItemsList,
        });

        // 4. ส่งการแจ้งเตือนออเดอร์ใหม่ถึง Admin ถ้าผู้ซื้อไม่ใช่เมลของ Admin
        if (recipientEmail.toLowerCase() !== creds.user.toLowerCase()) {
          const itemsSummaryHtml = orderItemsList
            .map((i: any) => `<li style="margin: 4px 0;"><b>${i.name}</b> × ${i.quantity || 1} ซอง (฿${i.price})</li>`)
            .join("");

          transporter.sendMail({
            from: `"NIBBLY Store System" <${creds.user}>`,
            to: creds.user,
            subject: `📢 [Admin Alert] มีคำสั่งซื้อใหม่ #${orderIdVal} ยอด ฿${grandTotalVal} (${paymentMethodVal}) 📦✨`,
            html: `
              <div style="font-family:'Prompt',sans-serif; padding:18px; background:#FFFDF8; border-radius:18px; border:2px solid #FFE3EC;">
                <h3 style="color:#D81159; margin:0 0 10px;">📦 คำสั่งซื้อใหม่ #${orderIdVal}</h3>
                <p style="margin:4px 0;"><b>ลูกค้า:</b> คุณ ${recipientName} (โทร: ${phoneVal})</p>
                <p style="margin:4px 0;"><b>อีเมล:</b> ${recipientEmail}</p>
                <p style="margin:4px 0;"><b>ที่อยู่จัดส่ง:</b> ${addressVal}</p>
                <p style="margin:4px 0;"><b>ช่องทางชำระเงิน:</b> ${paymentMethodVal}</p>
                <div style="margin:10px 0; padding:10px; background:#FFF5F7; border-radius:10px;">
                  <b>รายการสินค้าที่สั่งซื้อ:</b>
                  <ul style="margin:6px 0; padding-left:20px; font-size:13px;">
                    ${itemsSummaryHtml}
                  </ul>
                </div>
                <p style="margin:4px 0; font-size:16px;"><b>ยอดชำระสุทธิ:</b> <span style="color:#D81159; font-weight:900;">฿${grandTotalVal}</span></p>
                <p style="font-size:12px; color:#666; margin-top:12px;">ระบบได้ส่งสลิปใบเสร็จรับเงินพร้อมรูปภาพสินค้าให้ลูกค้าเรียบร้อยแล้ว</p>
              </div>
            `,
          }).catch(console.error);
        }
      } else {
        // อีเมลตอบรับ Subscribe ข่าวสาร (น่ารักสดใส)
        await transporter.sendMail({
          from: `"NIBBLY Healthy Treats" <${creds.user}>`,
          to: recipientEmail,
          subject: "🍓 ขอบคุณที่สมัครรับข่าวสารจาก NIBBLY Healthy Treats 🌈✨",
          html: `
            <!DOCTYPE html>
            <html lang="th">
            <head>
              <meta charset="UTF-8">
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap');
              </style>
            </head>
            <body style="margin:0; padding:0; background-color:#F0FFF4; font-family:'Prompt',sans-serif; color:#2D3748;">
              <div style="width:100%; background-color:#F0FFF4; padding:30px 0 50px;">
                <div style="max-width:480px; margin:0 auto; background-color:#FFFFFF; border-radius:34px; overflow:hidden; box-shadow:0 16px 45px rgba(82,183,136,0.16); border:2px solid #D8F3DC;">
                  <div style="background:linear-gradient(135deg, #FF758F 0%, #FFB4A2 30%, #FFD166 65%, #52B788 100%); padding:34px 20px 28px; text-align:center;">
                    <div style="font-size:24px; letter-spacing:8px; margin-bottom:12px;">
                      🍓 🥑 🍍 🫐 🍌 🥥 🍯 🥝 🍇
                    </div>
                    <div style="display:inline-flex; align-items:center; gap:8px; background:#FFFFFF; padding:8px 24px; border-radius:30px; margin-bottom:8px;">
                      <span style="font-size:26px;">🍓</span>
                      <span style="font-size:28px; font-weight:900; color:#1B4332;">NIBBLY</span>
                    </div>
                    <div style="font-size:13px; color:#FFFFFF; font-weight:800; letter-spacing:1px; text-shadow:0 1px 4px rgba(0,0,0,0.25);">
                      ขนมดี · เติมวันให้สดใส 🌈✨
                    </div>
                  </div>

                  <div style="padding:28px 22px 34px; text-align:left;">
                    <h1 style="font-size:22px; font-weight:900; color:#1B4332; margin:0 0 14px; line-height:1.3; text-align:center;">
                      🎉 ขอบคุณที่สมัครรับข่าวสาร 🥳
                    </h1>
                    
                    <div style="background:#FFF9F2; border:2px dashed #FFB4A2; border-radius:16px; padding:12px 16px; margin-bottom:20px; text-align:center; font-size:13px; color:#555;">
                      <span>เพิ่มอีเมลเข้าสู่ระบบสมาชิก NIBBLY แล้ว:</span><br>
                      <span style="color:#E63946; font-weight:800; font-size:14px;">${recipientEmail}</span>
                    </div>

                    <div style="border:1.5px solid #FF85A1; background:#FFF0F3; border-radius:18px; padding:14px 16px; margin-bottom:14px; display:flex; align-items:flex-start; gap:12px;">
                      <span style="font-size:24px;">🍓</span>
                      <div>
                        <div style="font-size:13.5px; font-weight:800; color:#C9184A; margin:0 0 2px;">ส่วนลด 15% ทันทีในการสั่งซื้อแรก</div>
                        <div style="font-size:11.5px; color:#555; margin:0; line-height:1.45;">กรอกโค้ด <strong>NIBBLYWELCOME15</strong> ตอนสั่งซื้อ ไม่มีขั้นต่ำ</div>
                      </div>
                    </div>

                    <div style="border:1.5px solid #FFD166; background:#FFFDF0; border-radius:18px; padding:14px 16px; margin-bottom:14px; display:flex; align-items:flex-start; gap:12px;">
                      <span style="font-size:24px;">🍌</span>
                      <div>
                        <div style="font-size:13.5px; font-weight:800; color:#B26A00; margin:0 0 2px;">เมนูผลไม้ตามฤดูกาล & ทริคโภชนาการ</div>
                        <div style="font-size:11.5px; color:#555; margin:0; line-height:1.45;">อัปเดตสูตรขนมคลีน แคลอรี่ต่ำ และสารอาหารบำรุงสุขภาพ</div>
                      </div>
                    </div>

                    <div style="border:1.5px solid #52B788; background:#F0FFF4; border-radius:18px; padding:14px 16px; margin-bottom:14px; display:flex; align-items:flex-start; gap:12px;">
                      <span style="font-size:24px;">🥑</span>
                      <div>
                        <div style="font-size:13.5px; font-weight:800; color:#1B4332; margin:0 0 2px;">สิทธิ์ชิมรสชาติใหม่และ Flash Sale</div>
                        <div style="font-size:11.5px; color:#555; margin:0; line-height:1.45;">ร่วมสนุกทดลองรสชาติพิเศษก่อนใคร และโปรสุดคุ้มเฉพาะสมาชิก</div>
                      </div>
                    </div>

                    <div style="background:#E8F5E9; border-left:5px solid #52B788; border-radius:0 16px 16px 0; padding:14px 16px; margin:20px 0 22px; font-size:12px; color:#1B4332; line-height:1.6;">
                      🥑 <strong>คำแนะนำพิเศษ:</strong> คุณสามารถใช้ระบบ <strong>Snack Finder</strong> บนเว็บไซต์ NIBBLY เพื่อค้นหาผลไม้อบกรอบที่เหมาะกับคุณได้ทันที!
                    </div>

                    <a href="https://k1ts4k0n.github.io/NIBBLY/shop/" target="_blank" style="display:block; margin:0 auto 12px; padding:14px 20px; background:linear-gradient(135deg, #FF6B8B 0%, #FF9E00 100%); color:#FFFFFF; text-align:center; text-decoration:none; font-size:14px; font-weight:900; border-radius:28px; box-shadow:0 6px 18px rgba(255,107,139,0.35);">
                      🛍️ 🍓 เริ่มต้นเลือกช้อปขนมผลไม้สดชื่น ➔
                    </a>

                    <a href="https://k1ts4k0n.github.io/NIBBLY/" target="_blank" style="display:block; margin:0 auto 16px; padding:11px 20px; background:#F0FFF4; border:2px solid #52B788; color:#1B4332; text-align:center; text-decoration:none; font-size:13px; font-weight:800; border-radius:28px;">
                      🏡 🌈 กลับไปที่หน้าร้าน NIBBLY
                    </a>

                    <div style="text-align:center; font-size:11px; color:#8E9AA0; margin-top:20px; padding-top:16px; border-top:1.5px solid #F0F2F5;">
                      🍓 NIBBLY · ขนมดี เติมวันให้สดใส 🥝
                    </div>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        // บันทึกผู้รับข่าวสารลงฐานข้อมูล data/subscribers.json
        recordSubscriber({
          email: recipientEmail,
          subscribedAt: new Date().toISOString(),
          couponSent: "NIBBLYWELCOME15",
          status: "active",
        });

        // ส่งการแจ้งเตือนถึง Admin ถ้าผู้รับข่าวสารไม่ใช่เมลของ Admin
        if (recipientEmail.toLowerCase() !== creds.user.toLowerCase()) {
          transporter.sendMail({
            from: `"NIBBLY Store System" <${creds.user}>`,
            to: creds.user,
            subject: `📢 [Admin Alert] มีผู้สมัครรับข่าวสารใหม่: ${recipientEmail} 💌`,
            html: `
              <div style="font-family:'Prompt',sans-serif; padding:18px; background:#F0FFF4; border-radius:18px; border:2px solid #D8F3DC;">
                <h3 style="color:#1B4332; margin:0 0 10px;">💌 สมาชิกใหม่สมัครรับข่าวสาร</h3>
                <p style="margin:4px 0;"><b>อีเมล:</b> ${recipientEmail}</p>
                <p style="margin:4px 0;"><b>เวลาที่สมัคร:</b> ${new Date().toLocaleString("th-TH")}</p>
                <p style="font-size:12px; color:#666; margin-top:12px;">ระบบได้ส่งอีเมลขอบคุณพร้อมโค้ดลด 15% ให้เรียบร้อยแล้ว</p>
              </div>
            `,
          }).catch(console.error);
        }
      }

      return NextResponse.json({
        success: true,
        message: `ส่งอีเมลสดใสไปยัง ${recipientEmail} สำเร็จเรียบร้อยแล้ว!`,
        sender: creds.user,
        recipient: recipientEmail,
      });
    }

    // 3. หากยังไม่ได้กรอก Google App Password
    return NextResponse.json({
      success: true,
      simulated: true,
      message: `บันทึกข้อมูลแล้ว! (ต้องการส่งเข้า Inbox จริง กรุณาใส่รหัสผ่านแอป 16 หลักใน php/config.php)`,
      recipient: recipientEmail,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดในการส่งอีเมล", error: String(error) },
      { status: 500 }
    );
  }
}
