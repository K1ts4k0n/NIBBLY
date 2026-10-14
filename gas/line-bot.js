/**
 * ========================================================
 * 🥣 NIBBLY LINE Official Account Webhook (Google Apps Script)
 * ========================================================
 * "Snack Happy. Live Healthy."
 * สคริปต์ตอบกลับอัตโนมัติอัจฉริยะ พร้อม Quick Reply และคีย์เวิร์ดสำหรับร้าน NIBBLY
 * 
 * 📌 ขั้นตอนการใช้งาน:
 * 1. เข้าไปที่ https://script.google.com สร้างโปรเจกต์ใหม่
 * 2. วางโค้ดนี้ลงใน Code.gs
 * 3. ใส่ Channel Access Token จาก LINE Developers Console ที่ตัวแปร CHANNEL_ACCESS_TOKEN ด้านล่าง
 * 4. กด "Deploy" (การทำให้ใช้งานได้) -> "New deployment" -> เลือกประเภท "Web app"
 *    - Execute as: Me (ฉัน)
 *    - Who has access: Anyone (ทุกคน)
 * 5. คัดลอก Web app URL ที่ได้ นำไปใส่ใน Webhook URL บน LINE Developers Console แล้วกด Verify + เปิด Use Webhook
 * ========================================================
 */

// 🔑 ใส่ Channel Access Token (แบบ Long-Lived) ของ LINE Messaging API ที่นี่
var CHANNEL_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN_HERE';

// 🌐 ลิงก์หลักของเว็บไซต์ NIBBLY
var BASE_URL = 'https://k1ts4k0n.github.io/NIBBLY';

function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var event = contents.events && contents.events[0];

    if (!event) {
      return ContentService.createTextOutput("OK");
    }

    // ตรวจสอบว่าเป็น Event ประเภทข้อความ (message) และเป็นตัวอักษร (text)
    if (event.type === 'message' && event.message.type === 'text') {
      var userMessage = event.message.text.trim();
      var replyToken = event.replyToken;

      // แปลงเป็นตัวพิมพ์เล็กเพื่อเทียบคำภาษาอังกฤษง่ายขึ้น
      var lowerMsg = userMessage.toLowerCase();

      // ==========================================
      // 1. คีย์เวิร์ด: ทักทาย / เริ่มต้น / สวัสดี
      // ==========================================
      if (
        lowerMsg.includes("สวัสดี") ||
        lowerMsg.includes("ดีครับ") ||
        lowerMsg.includes("ดีค่ะ") ||
        lowerMsg.includes("หวัดดี") ||
        lowerMsg === "hi" ||
        lowerMsg === "hello" ||
        lowerMsg === "menu" ||
        lowerMsg === "เริ่ม"
      ) {
        var welcomeMsg = {
          "type": "text",
          "text": "🎉 ยินดีต้อนรับสู่ NIBBLY คลับขนมสุขภาพสุดพรีเมียมค่า! 🍓🥣✨\n\"Snack Happy. Live Healthy.\"\n\nอร่อยฟิน หุ่นปัง ธรรมชาติ 100% ไม่ใช้น้ำตาลทรายขาว อบสดใหม่ทุกวัน 🥑🍪\n\nสามารถเลือกเมนูหรือสอบถามข้อมูลที่สนใจจากปุ่มด้านล่างได้เลยน้า 👇",
          "quickReply": getStandardQuickReply()
        };
        replyLine(replyToken, [welcomeMsg]);
        return ContentService.createTextOutput("OK");
      }

      // ==========================================
      // 2. คีย์เวิร์ด: โปรโมชั่น / ส่วนลด / โค้ด
      // ==========================================
      if (
        lowerMsg.includes("โปร") ||
        lowerMsg.includes("ส่วนลด") ||
        lowerMsg.includes("โค้ด") ||
        lowerMsg.includes("code") ||
        lowerMsg.includes("ลด") ||
        lowerMsg.includes("คูปอง") ||
        lowerMsg.includes("promo")
      ) {
        var promoMsg = {
          "type": "text",
          "text": "🎁 รวมโปรโมชั่น & โค้ดลับ NIBBLY! 🥣✨\n\n" +
            "🏷️ โค้ด: NIBBLYWELCOME15\n" +
            "👉 ลดทันที 15% สำหรับสมาชิกใหม่ ไม่มีขั้นต่ำ!\n\n" +
            "🎮 โค้ด: NIBBLYCRUSH30\n" +
            "👉 รับส่วนลด 30% ทันทีเมื่อเล่นชนะเกม Snack Crush บนเว็บ!\n\n" +
            "🚚 ดีลส่งฟรี:\n" +
            "👉 ช้อปครบ 499 บาท จัดส่งด่วนฟรีถึงหน้าบ้าน 💨\n\n" +
            "💌 สิทธิ์วันเกิด NIBBLY Club:\n" +
            "👉 สมาชิกรับส่วนลดพิเศษเดือนเกิด 20% ทันที\n\n" +
            "กดปุ่มด้านล่างเพื่อช้อปหรือเล่นเกมรับโค้ดได้เลยค่า 👇",
          "quickReply": {
            "items": [
              {
                "type": "action",
                "action": {
                  "type": "uri",
                  "label": "🛒 ช้อปขนมเลย",
                  "uri": BASE_URL + "/shop/"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "uri",
                  "label": "🎮 เล่นเกมลด 30%",
                  "uri": BASE_URL + "/game/"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "uri",
                  "label": "🔥 หน้าโปรโมชั่น",
                  "uri": BASE_URL + "/promotions/"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "🚚 เงื่อนไขส่งฟรี",
                  "text": "ส่งฟรี"
                }
              }
            ]
          }
        };
        replyLine(replyToken, [promoMsg]);
        return ContentService.createTextOutput("OK");
      }

      // ==========================================
      // 3. คีย์เวิร์ด: เมนู / ขนม / สินค้า / แนะนำ
      // ==========================================
      if (
        lowerMsg.includes("เมนู") ||
        lowerMsg.includes("ขนม") ||
        lowerMsg.includes("สินค้า") ||
        lowerMsg.includes("แนะนำ") ||
        lowerMsg.includes("มีอะไรบ้าง") ||
        lowerMsg.includes("shop") ||
        lowerMsg.includes("catalog")
      ) {
        var menuMsg = {
          "type": "text",
          "text": "🥣 หมวดหมู่ขนมเพื่อสุขภาพยอดฮิตของ NIBBLY 🍓✨\n\n" +
            "1️⃣ Superfood Granola (กราโนล่าซูเปอร์ฟู้ด อบกรอบไฟต่ำ)\n" +
            "2️⃣ Clean Protein Cookies (คุกกี้ข้าวโอ๊ต ไร้แป้งสาลี)\n" +
            "3️⃣ Freeze-Dried Fruits (ผลไม้แท้อบกรอบ หวานธรรมชาติ ไม่ใส่น้ำตาล)\n" +
            "4️⃣ Premium Mixed Nuts (ถั่วลายเสือ อัลมอนด์ วอลนัท อบเกลือชมพู)\n\n" +
            "💡 ไม่แน่ใจว่าจะทานตัวไหนดี? ลองทำแบบทดสอบ 'Snack Finder' ช่วยแนะนำขนมที่เหมาะกับคุณภายใน 1 นาทีได้เลยค่า! 👇",
          "quickReply": {
            "items": [
              {
                "type": "action",
                "action": {
                  "type": "uri",
                  "label": "🛒 เลือกดูขนมทั้งหมด",
                  "uri": BASE_URL + "/shop/"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "uri",
                  "label": "✨ แบบทดสอบแนะนำขนม",
                  "uri": BASE_URL + "/recommend/"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "🎁 ดูโค้ดส่วนลด",
                  "text": "โปรโมชั่น"
                }
              }
            ]
          }
        };
        replyLine(replyToken, [menuMsg]);
        return ContentService.createTextOutput("OK");
      }

      // ==========================================
      // 4. คีย์เวิร์ด: เกม / เล่นเกม / ลด 30% / game
      // ==========================================
      if (
        lowerMsg.includes("เกม") ||
        lowerMsg.includes("game") ||
        lowerMsg.includes("crush") ||
        lowerMsg.includes("30") ||
        lowerMsg.includes("เล่น")
      ) {
        var gameMsg = {
          "type": "text",
          "text": "🎮 สนุกกับ NIBBLY Snack Crush Party! 🍓🧸\n\n" +
            "มินิเกมแคนดี้จับคู่ขนมสุขภาพสุดน่ารักบนหน้าเว็บ!\n" +
            "🎯 กติกาง่ายๆ: สลับขนมให้เรียงครบ 3 ชิ้น ทำคะแนนถึง 1,000 คะแนน\n" +
            "🏆 รางวัลชนะเลิศ: รับโค้ดส่วนลด 30% (NIBBLYCRUSH30) ไปช้อปขนมได้ทันที ไม่มีขั้นต่ำ!\n\n" +
            "กดปุ่มด้านล่างเข้าเล่นผ่านมือถือได้ทันที ไม่ต้องดาวน์โหลดแอพค่า 👇",
          "quickReply": {
            "items": [
              {
                "type": "action",
                "action": {
                  "type": "uri",
                  "label": "🎮 เข้าเล่นเกมตอนนี้",
                  "uri": BASE_URL + "/game/"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "uri",
                  "label": "🛒 ไปช้อปปิ้ง",
                  "uri": BASE_URL + "/shop/"
                }
              }
            ]
          }
        };
        replyLine(replyToken, [gameMsg]);
        return ContentService.createTextOutput("OK");
      }

      // ==========================================
      // 5. คีย์เวิร์ด: ส่งฟรี / ค่าส่ง / จัดส่ง / ขนส่ง
      // ==========================================
      if (
        lowerMsg.includes("ส่งฟรี") ||
        lowerMsg.includes("ค่าส่ง") ||
        lowerMsg.includes("ส่งยังไง") ||
        lowerMsg.includes("จัดส่ง") ||
        lowerMsg.includes("ขนส่ง") ||
        lowerMsg.includes("delivery")
      ) {
        var shippingMsg = {
          "type": "text",
          "text": "🚚 ข้อมูลการจัดส่ง NIBBLY Healthy Treats 📦💨\n\n" +
            "✨ ช้อปครบ 499 บาท: จัดส่งด่วนฟรีทั่วประเทศไทย! 🆓\n" +
            "📦 ยอดสั่งซื้อต่ำกว่า 499 บาท: ค่าจัดส่งเหมาจ่ายเพียง 45 บาท\n\n" +
            "⏱️ ระยะเวลาจัดส่ง:\n" +
            "- กทม.และปริมณฑล: 1 - 2 วันทำการ\n" +
            "- ต่างจังหวัด: 2 - 3 วันทำการ\n" +
            "ขนมอบสดใหม่ บรรจุในถุงซิปล็อกฟอยล์กันความชื้นอย่างดีค่า 🥣",
          "quickReply": getStandardQuickReply()
        };
        replyLine(replyToken, [shippingMsg]);
        return ContentService.createTextOutput("OK");
      }

      // ==========================================
      // 6. คีย์เวิร์ด: สมาชิก / สมัคร / สะสมแต้ม / club
      // ==========================================
      if (
        lowerMsg.includes("สมาชิก") ||
        lowerMsg.includes("สมัคร") ||
        lowerMsg.includes("แต้ม") ||
        lowerMsg.includes("คะแนน") ||
        lowerMsg.includes("club") ||
        lowerMsg.includes("register")
      ) {
        var memberMsg = {
          "type": "text",
          "text": "👑 สิทธิพิเศษสมาชิก NIBBLY Club 🫐✨\n\n" +
            "🎁 สมัครฟรีวันนี้ รับสิทธิประโยชน์มากมาย:\n" +
            "1. รับโค้ดลด 15% ทันทีที่สมัคร\n" +
            "2. สะสม Berry Points ทุกยอดสั่งซื้อ (25 บาท = 1 แต้ม แลกขนมฟรี)\n" +
            "3. สิทธิ์รับของขวัญ & ส่วนลด 20% ตลอดทั้งเดือนเกิดของคุณ! 🎂\n\n" +
            "กดสมัครสมาชิกผ่านหน้าเว็บได้เลย ใช้เวลาไม่ถึง 1 นาทีค่า 👇",
          "quickReply": {
            "items": [
              {
                "type": "action",
                "action": {
                  "type": "uri",
                  "label": "📝 สมัครสมาชิก",
                  "uri": BASE_URL + "/register/"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "uri",
                  "label": "🛒 ไปช้อปขนม",
                  "uri": BASE_URL + "/shop/"
                }
              }
            ]
          }
        };
        replyLine(replyToken, [memberMsg]);
        return ContentService.createTextOutput("OK");
      }

      // ==========================================
      // 7. คีย์เวิร์ด: ติดต่อ / แอดมิน / เบอร์ / โทร
      // ==========================================
      if (
        lowerMsg.includes("ติดต่อ") ||
        lowerMsg.includes("แอดมิน") ||
        lowerMsg.includes("เจ้าหน้าที่") ||
        lowerMsg.includes("โทร") ||
        lowerMsg.includes("เบอร์") ||
        lowerMsg.includes("admin") ||
        lowerMsg.includes("contact")
      ) {
        var contactMsg = {
          "type": "text",
          "text": "👩‍💼 เจ้าหน้าที่ NIBBLY ยินดีให้บริการค่ะ!\n\n" +
            "แอดมินได้รับข้อความของคุณเรียบร้อยแล้ว จะรีบเข้ามาตอบกลับโดยเร็วนะคะ 💖\n\n" +
            "⏰ เวลาทำการแอดมิน: ทุกวัน 09:00 - 20:00 น.\n" +
            "📧 Email Admin: atetfitqlpseo123@gmail.com\n" +
            "🌐 สั่งซื้อด่วนผ่านเว็บไซต์ได้ตลอด 24 ชม. ค่า 👇",
          "quickReply": getStandardQuickReply()
        };
        replyLine(replyToken, [contactMsg]);
        return ContentService.createTextOutput("OK");
      }

      // ==========================================
      // 8. ข้อความอื่นๆ ที่ไม่ตรงคีย์เวิร์ด (Fallback)
      // ==========================================
      var defaultMsg = {
        "type": "text",
        "text": "ขอบคุณสำหรับข้อความนะคะน้อง NIBBLY ได้รับเรื่องแล้วค่า 🥣✨\n\nหากต้องการสอบถามเรื่องใดเพิ่มเติม สามารถกดเลือกจากปุ่มลัดด้านล่าง หรือพิมพ์คำว่า 'โปรโมชั่น', 'ขนม', 'เล่นเกม' ได้เลยนะคะ 😊👇",
        "quickReply": getStandardQuickReply()
      };
      replyLine(replyToken, [defaultMsg]);
      return ContentService.createTextOutput("OK");
    }
  } catch (err) {
    console.error("Error handling webhook: " + err.message);
  }

  return ContentService.createTextOutput("OK");
}

/**
 * ฟังก์ชันสร้างปุ่มลัดมาตรฐาน (Quick Reply Items)
 */
function getStandardQuickReply() {
  return {
    "items": [
      {
        "type": "action",
        "action": {
          "type": "uri",
          "label": "🛒 ช้อปขนมคลีน",
          "uri": BASE_URL + "/shop/"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "🎁 ดูโปรโมชั่น",
          "text": "โปรโมชั่น"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "uri",
          "label": "🎮 เล่นเกมลด 30%",
          "uri": BASE_URL + "/game/"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "uri",
          "label": "✨ แนะนำขนม",
          "uri": BASE_URL + "/recommend/"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "🚚 เงื่อนไขส่งฟรี",
          "text": "ส่งฟรี"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "👩‍💼 คุยกับแอดมิน",
          "text": "ติดต่อแอดมิน"
        }
      }
    ]
  };
}

/**
 * ฟังก์ชันส่งข้อความตอบกลับไปยัง LINE Messaging API
 */
function replyLine(replyToken, messagesArray) {
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': messagesArray
    }),
  });
}
