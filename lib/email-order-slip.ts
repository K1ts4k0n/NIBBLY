import fs from "fs";
import path from "path";

export interface OrderSlipItem {
  name: string;
  price: number;
  quantity?: number;
  qty?: number;
  art?: string;
  slug?: string;
  emoji?: string;
  category?: string;
}

export interface OrderSlipData {
  orderId: string;
  customerName: string;
  email: string;
  phone?: string;
  address?: string;
  paymentMethod?: string;
  promoCode?: string;
  subtotal: number;
  discount?: number;
  shipping?: number;
  grandTotal: number;
  status?: string;
  isResend?: boolean;
  isAdminTest?: boolean;
  items: OrderSlipItem[];
}

const CATALOG_LOOKUP: Record<
  string,
  { art: string; slug: string; emoji: string; category: string }
> = {
  "nibbly berry granola": { art: "berry-granola", slug: "nibbly-berry-granola", emoji: "🍓", category: "Granola" },
  "honey almond crunch": { art: "honey", slug: "honey-almond-crunch", emoji: "🍯", category: "Granola" },
  "tropical fruit mix": { art: "tropical", slug: "tropical-fruit-mix", emoji: "🍍", category: "Dried Fruits" },
  "banana oat bites": { art: "banana", slug: "banana-oat-bites", emoji: "🍌", category: "Energy Bites" },
  "strawberry yogurt bites": { art: "strawberry-yogurt", slug: "strawberry-yogurt-bites", emoji: "🍓", category: "Fruit Snacks" },
  "blueberry nut mix": { art: "blueberry", slug: "blueberry-nut-mix", emoji: "🫐", category: "Nut Mix" },
  "cashew honey bites": { art: "cashew", slug: "cashew-honey-bites", emoji: "🌰", category: "Energy Bites" },
  "choco oat crunch": { art: "choco", slug: "choco-oat-crunch", emoji: "🍫", category: "Oat Snacks" },
  "coconut almond granola": { art: "coconut", slug: "coconut-almond-granola", emoji: "🥥", category: "Granola" },
  "mixed berry energy bites": { art: "mixed-berry", slug: "mixed-berry-energy-bites", emoji: "🍓", category: "Energy Bites" },
  "banana cinnamon chips": { art: "banana-chips", slug: "banana-cinnamon-chips", emoji: "🍌", category: "Dried Fruits" },
  "pumpkin seed crunch": { art: "pumpkin", slug: "pumpkin-seed-crunch", emoji: "🎃", category: "Healthy Snacks" },
  "mango cashew mix": { art: "mango", slug: "mango-cashew-mix", emoji: "🥭", category: "Nut Mix" },
  "green matcha oat bites": { art: "matcha", slug: "green-matcha-oat-bites", emoji: "🍵", category: "Energy Bites" },
  "peanut butter protein bites": { art: "protein", slug: "peanut-butter-protein-bites", emoji: "⚡", category: "Protein Snacks" },
  "apple cinnamon granola": { art: "apple", slug: "apple-cinnamon-granola", emoji: "🍎", category: "Granola" },
  "dark cocoa nut mix": { art: "dark-cocoa", slug: "dark-cocoa-nut-mix", emoji: "🍫", category: "Nut Mix" },
  "pineapple coconut bites": { art: "pineapple", slug: "pineapple-coconut-bites", emoji: "🍍", category: "Energy Bites" },
  "berry oat cookies": { art: "berry-cookies", slug: "berry-oat-cookies", emoji: "🍪", category: "Healthy Cookies" },
  "nibbly super snack mix": { art: "super-mix", slug: "nibbly-super-snack-mix", emoji: "🌟", category: "Trail Mix" },
};

export function resolveOrderItem(item: OrderSlipItem, idx: number) {
  let art = item.art;
  let slug = item.slug;
  let emoji = item.emoji || "🍓";
  let category = item.category || "ขนมสุขภาพ";

  if (!art && item.name) {
    const lowerName = item.name.toLowerCase().trim();
    for (const [key, val] of Object.entries(CATALOG_LOOKUP)) {
      if (lowerName.includes(key) || key.includes(lowerName)) {
        art = val.art;
        slug = val.slug;
        emoji = val.emoji;
        category = val.category;
        break;
      }
    }
  }

  if (!art) {
    art = "berry-granola";
    slug = "nibbly-berry-granola";
  }

  const filename = `${art}.jpg`;
  const filePath = path.join(process.cwd(), "public/products", filename);
  const exists = fs.existsSync(filePath);
  const cid = `order_product_${idx}`;
  const quantity = item.quantity || item.qty || 1;

  return {
    ...item,
    quantity,
    art,
    slug: slug || art,
    emoji,
    category,
    filename,
    filePath,
    exists,
    cid,
  };
}

export function buildOrderSlipEmail(data: OrderSlipData) {
  const itemsList = data.items && data.items.length > 0 ? data.items : [
    { name: "NIBBLY Berry Granola", price: 149, quantity: 2, emoji: "🍓" },
    { name: "Choco Oat Crunch", price: 139, quantity: 1, emoji: "🍫" },
  ];

  const resolvedItems = itemsList.map((item, idx) => resolveOrderItem(item, idx));

  // สร้าง CID attachments สำหรับ Nodemailer
  const attachments = resolvedItems
    .filter((item) => item.exists)
    .map((item) => ({
      filename: item.filename,
      path: item.filePath,
      cid: item.cid,
    }));

  const itemsRowsHtml = resolvedItems
    .map((item) => {
      const lineTotal = item.price * item.quantity;
      const productUrl = `https://k1ts4k0n.github.io/NIBBLY/shop/${item.slug}/`;

      return `
        <tr style="border-bottom: 1.5px solid #F3F4F6;">
          <td width="76" valign="middle" style="padding: 14px 12px 14px 0;">
            <div style="width: 70px; height: 70px; border-radius: 16px; overflow: hidden; background: #FFF5F7; border: 2px solid #FFE3EC; box-shadow: 0 4px 12px rgba(255,107,139,0.1); text-align: center; position: relative;">
              ${
                item.exists
                  ? `<img src="cid:${item.cid}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; display: block;" />`
                  : `<div style="line-height: 70px; font-size: 34px;">${item.emoji}</div>`
              }
            </div>
          </td>
          <td valign="middle" style="padding: 14px 8px;">
            <div style="display: inline-block; background: #FFE0E6; color: #C9184A; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 6px; margin-bottom: 4px; letter-spacing: 0.3px;">
              ${item.category}
            </div>
            <div style="font-size: 15px; font-weight: 800; color: #1F2937; line-height: 1.35;">
              <a href="${productUrl}" target="_blank" style="color: #1F2937; text-decoration: none;">
                ${item.name}
              </a>
            </div>
            <div style="font-size: 12.5px; color: #718096; margin-top: 4px; font-weight: 500;">
              <span style="font-weight: 800; color: #2D6A4F; background: #E8F5E9; padding: 2px 7px; border-radius: 6px; font-size: 11.5px;">
                จำนวน: ${item.quantity} ซอง
              </span>
              <span style="margin-left: 8px; color: #718096;">× ฿${item.price}</span>
            </div>
          </td>
          <td width="90" align="right" valign="middle" style="padding: 14px 0; font-size: 16px; font-weight: 900; color: #2D6A4F;">
            ฿${lineTotal}
          </td>
        </tr>
      `;
    })
    .join("");

  const discountVal = data.discount || 0;
  const shippingVal = data.shipping !== undefined ? data.shipping : 0;
  const subtotalVal = data.subtotal || 0;
  const grandTotalVal = data.grandTotal || subtotalVal - discountVal + shippingVal;
  const statusLabel = data.status || "PAID";
  const statusBadge =
    statusLabel === "DELIVERED"
      ? { text: "✓ จัดส่งสำเร็จ (DELIVERED)", bg: "#E6F4EA", color: "#137333", border: "#A8DAB5" }
      : statusLabel === "SHIPPED"
      ? { text: "🚚 อยู่ระหว่างจัดส่ง (SHIPPED)", bg: "#E8F0FE", color: "#1A73E8", border: "#AECBFA" }
      : { text: "✓ ชำระเงินสำเร็จ (PAID)", bg: "#E6F4EA", color: "#137333", border: "#A8DAB5" };

  const subjectPrefix = data.isAdminTest
    ? "📦 [Admin Test] สลิปใบเสร็จคำสั่งซื้อ NIBBLY"
    : data.isResend
    ? "🍓 [สลิปซ้ำ] ใบเสร็จรับเงินคำสั่งซื้อ NIBBLY"
    : "🍓 ขอบคุณสำหรับคำสั่งซื้อ NIBBLY";

  const subject = `${subjectPrefix} #${data.orderId} - ชำระเงินเรียบร้อยแล้ว! 📦✨`;

  const html = `
    <!DOCTYPE html>
    <html lang="th">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>สลิปใบเสร็จรับเงิน #${data.orderId} - NIBBLY</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap');
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #FFF5EC; font-family: 'Prompt', sans-serif; color: #2D3748;">
      <div style="width: 100%; background-color: #FFF5EC; padding: 28px 0 50px;">
        <div style="max-width: 540px; margin: 0 auto; background-color: #FFFFFF; border-radius: 36px; overflow: hidden; box-shadow: 0 20px 55px rgba(255,112,137,0.18); border: 2px solid #FFE3EC;">
          
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #FF6B8B 0%, #FFA07A 35%, #FFD166 70%, #52B788 100%); padding: 36px 24px 30px; text-align: center;">
            <div style="font-size: 26px; letter-spacing: 8px; margin-bottom: 10px;">
              🍓 📦 🥝 🥑 🍍 🍯 🍫 ✨
            </div>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: #FFFFFF; padding: 6px 22px; border-radius: 30px; margin-bottom: 12px; box-shadow: 0 4px 14px rgba(230,57,70,0.2);">
              <span style="font-size: 18px;">🍓</span>
              <span style="font-size: 13px; font-weight: 900; color: #E63946; letter-spacing: 0.8px;">NIBBLY HEALTHY TREATS</span>
            </div>
            <h1 style="margin: 0 0 6px; font-size: 25px; font-weight: 900; color: #FFFFFF; line-height: 1.3; text-shadow: 0 2px 6px rgba(0,0,0,0.2);">
              ${data.isResend ? "🧾 ใบเสร็จรับเงิน (ส่งซ้ำโดยแอดมิน)" : "🎉 ขอบคุณสำหรับคำสั่งซื้อแสนอร่อย! 🥳"}
            </h1>
            <p style="margin: 0; font-size: 13px; color: #FFF8F0; font-weight: 600; line-height: 1.5; text-shadow: 0 1px 3px rgba(0,0,0,0.15);">
              สลิปยืนยันการชำระเงินและรายการขนมสุขภาพที่สั่งซื้อ จัดส่งตรงถึงบ้านคุณ 🚚✨
            </p>
          </div>

          <!-- Content Body -->
          <div style="padding: 26px 22px;">
            
            <!-- Order Meta Box -->
            <div style="background: linear-gradient(135deg, #FFF9E6 0%, #FFF0F5 100%); border: 2px dashed #FF758F; border-radius: 22px; padding: 18px; margin-bottom: 22px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 11px; font-weight: 800; color: #718096; text-transform: uppercase;">เลขที่คำสั่งซื้อ (ORDER ID)</span>
                    <div style="font-size: 19px; font-weight: 900; color: #D81159; font-family: monospace; margin-top: 2px;">
                      #${data.orderId}
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <span style="background: ${statusBadge.bg}; color: ${statusBadge.color}; font-size: 11.5px; font-weight: 800; padding: 6px 14px; border-radius: 20px; border: 1px solid ${statusBadge.border}; display: inline-block;">
                      ${statusBadge.text}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 10px; border-top: 1px dashed #FFD2DC; margin-top: 10px; font-size: 12.5px; color: #6B4B53;">
                    💳 ช่องทางชำระเงิน: <strong>${data.paymentMethod || "พร้อมเพย์ (PromptPay QR)"}</strong>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Shipping Info Box -->
            <div style="background: #F8FBF8; border: 1.5px solid #D8F3DC; border-radius: 20px; padding: 16px; margin-bottom: 22px; font-size: 12.5px; line-height: 1.6;">
              <div style="font-size: 13.5px; font-weight: 900; color: #1B4332; margin-bottom: 6px;">
                🚚 ข้อมูลผู้รับและสถานที่จัดส่งพัสดุ
              </div>
              <strong style="font-size: 13px; color: #1B4332;">คุณ ${data.customerName}</strong> ${data.phone ? `(โทร: ${data.phone})` : ""}<br>
              <span style="color: #4A5568;">${data.address || "128/9 ซอยสุขุมวิท 23 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110"}</span><br>
              <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #E2E8F0; color: #2D6A4F; font-weight: 700; font-size: 12px;">
                📦 คาดว่าจะได้รับพัสดุขนมสุขภาพสดใหม่ภายใน 1-2 วันทำการ
              </div>
            </div>

            <!-- Purchased Snacks List with Images -->
            <div style="margin-bottom: 22px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <div style="font-size: 15.5px; font-weight: 900; color: #2D3748;">
                  🥣 รายการขนมในคำสั่งซื้อของคุณ (${resolvedItems.length} รายการ)
                </div>
              </div>
              
              <div style="background: #FFFFFF; border: 2px solid #F0F2F5; border-radius: 22px; padding: 6px 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.02);">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                  ${itemsRowsHtml}
                </table>
              </div>
            </div>

            <!-- Price Breakdown Summary -->
            <div style="background: #FFFDF9; border: 2px solid #FFE3EC; border-radius: 22px; padding: 18px 20px; margin-bottom: 24px; font-size: 13.5px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 5px 0; color: #718096;">ราคาสินค้ารวม (Subtotal)</td>
                  <td style="padding: 5px 0; text-align: right; font-weight: 700; color: #2D3748;">฿${subtotalVal}</td>
                </tr>
                ${
                  discountVal > 0
                    ? `
                <tr>
                  <td style="padding: 5px 0; color: #E63946; font-weight: 700;">
                    🏷️ ส่วนลดสมาชิก ${data.promoCode ? `(${data.promoCode})` : ""}
                  </td>
                  <td style="padding: 5px 0; text-align: right; color: #E63946; font-weight: 800;">-฿${discountVal}</td>
                </tr>
                `
                    : ""
                }
                <tr>
                  <td style="padding: 5px 0; color: #718096;">ค่าจัดส่งด่วน (Shipping Fee)</td>
                  <td style="padding: 5px 0; text-align: right; font-weight: 700;">
                    ${shippingVal === 0 ? '<span style="color: #2D6A4F; font-weight: 800;">ฟรี (Free Shipping)</span>' : `฿${shippingVal}`}
                  </td>
                </tr>
                <tr style="border-top: 2px solid #FFE3EC;">
                  <td style="padding: 12px 0 4px; font-size: 15.5px; font-weight: 900; color: #354B2D;">ยอดชำระสุทธิ (Grand Total)</td>
                  <td style="padding: 12px 0 4px; text-align: right; font-size: 23px; font-weight: 900; color: #D81159;">฿${grandTotalVal}</td>
                </tr>
              </table>
            </div>

            <!-- Buttons & Actions -->
            <div style="margin-top: 20px;">
              <a href="https://k1ts4k0n.github.io/NIBBLY/shop/" target="_blank" style="display: block; background: linear-gradient(135deg, #FF4D6D 0%, #FF9E00 100%); color: #FFFFFF; font-size: 14.5px; font-weight: 900; padding: 14px; border-radius: 30px; text-decoration: none; text-align: center; margin-bottom: 10px; box-shadow: 0 6px 18px rgba(255,77,109,0.3);">
                🛍️ ช้อปขนมผลไม้เพื่อสุขภาพเพิ่มเติม ➔
              </a>
              <a href="https://k1ts4k0n.github.io/NIBBLY/" target="_blank" style="display: block; background: #FFF5F7; border: 2px solid #FF85A1; color: #D81159; font-size: 13.5px; font-weight: 800; padding: 11px; border-radius: 30px; text-decoration: none; text-align: center;">
                🏡 กลับสู่หน้าหลัก NIBBLY Healthy Treats
              </a>
            </div>

            <!-- Footer Note -->
            <div style="text-align: center; font-size: 11px; color: #8E9AA0; margin-top: 26px; border-top: 1.5px solid #F0F2F5; padding-top: 16px; line-height: 1.6;">
              <div style="font-size: 18px; margin-bottom: 4px;">🍓 🥑 🍍 🫐 🍌 🥥 🍯</div>
              <strong>NIBBLY Healthy Treats</strong> · ขนมดี เติมวันให้สดใส ☀️<br>
              ใบเสร็จรับเงินอิเล็กทรอนิกส์ส่งถึง <span style="color: #D81159; font-weight: 700;">${data.email}</span>
            </div>

          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return {
    subject,
    html,
    attachments,
  };
}
