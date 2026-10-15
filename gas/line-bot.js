/**
 * ========================================================
 * 🥣 NIBBLY LINE Official Account Webhook (Google Apps Script)
 * ========================================================
 * "Snack Happy. Live Healthy."
 * สคริปต์ส่งปุ่มลัด (Quick Reply) แบบคีย์เวิร์ดข้อความ (type: message)
 * 
 * 📌 หลักการทำงาน:
 * 1. เมื่อลูกค้าพิมพ์ทักทาย เช่น "สวัสดี", "เมนู", "hi", "hello"
 * 2. บอทจะตอบข้อความต้อนรับ พร้อมแถบปุ่มลัด Quick Reply ด้านล่าง
 * 3. ปุ่มทุกปุ่มเป็น "type: message" (ไม่เด้งไปหน้าเว็บ)
 * 4. เมื่อลูกค้ากดปุ่ม จะส่งข้อความคีย์เวิร์ดนั้นเข้าไปในแชททันที
 * 5. ระบบตอบกลับอัตโนมัติ (Auto-response) ที่คุณตั้งไว้ใน LINE OA Manager จะตอบกลับตามคีย์เวิร์ดนั้นทันที!
 * ========================================================
 */

// 🔑 Channel Access Token ของคุณ
var CHANNEL_ACCESS_TOKEN = 'OHrhVSfQ2sCTKCZswpADKdcbPbUaGMCRVTscmoRLZTDlHOHQMnTTzKf+pGY/opThzdQgJPl7RRNY93WMcVw7SNN3TdSuI0GGstwdgxCkNvnKNr5OLmc008C4SaDDXNZEQJj3A0+K75I2SzCjGtZE6AdB04t89/1O/w1cDnyilFU=';

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
      var lowerMsg = userMessage.toLowerCase();

      // เงื่อนไข: เมื่อผู้ใช้พิมพ์ทักทาย หรือต้องการดูเมนูคีย์ลัด
      if (
        lowerMsg.includes("สวัสดี") ||
        lowerMsg.includes("ดีครับ") ||
        lowerMsg.includes("ดีค่ะ") ||
        lowerMsg.includes("หวัดดี") ||
        lowerMsg === "hi" ||
        lowerMsg === "hello" ||
        lowerMsg === "menu" ||
        lowerMsg.includes("เมนู") ||
        lowerMsg.includes("เริ่ม") ||
        lowerMsg.includes("คีย์ลัด") ||
        lowerMsg.includes("สอบถาม")
      ) {
        var quickReplyMessage = {
          "type": "text",
          "text": "สวัสดีค่ะ ยินดีต้อนรับสู่ NIBBLY Healthy Treats 🍓🥣✨\n\"Snack Happy. Live Healthy.\"\n\nสามารถเลือกกดปุ่มคีย์ลัดด้านล่าง เพื่อดูข้อมูลที่ต้องการได้เลยนะคะ 👇",
          "quickReply": {
            "items": [
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "🎁 โปรโมชั่น",
                  "text": "โปรโมชั่น"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "🥣 ดูเมนูขนม",
                  "text": "ดูเมนูขนม"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "🎮 เล่นเกมรับโค้ด",
                  "text": "เล่นเกม"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "📦 เช็คสถานะพัสดุ",
                  "text": "ตรวจสอบสถานะพัสดุ"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "🚚 รอบส่ง & ค่าส่ง",
                  "text": "รอบการจัดส่ง&ค่าส่ง"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "💳 ช่องทางชำระเงิน",
                  "text": "ช่องทางชำระเงิน"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "🥑 ข้อมูลสุขภาพ",
                  "text": "ข้อมูลสุขภาพ"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "👩‍💼 ติดต่อแอดมิน",
                  "text": "ติดต่อแอดมิน"
                }
              }
            ]
          }
        };

        // ส่งข้อความพร้อมปุ่มลัด Quick Reply กลับไป
        replyLine(replyToken, [quickReplyMessage]);
        return ContentService.createTextOutput("OK");
      }

      // ถ้าเป็นข้อความอื่นๆ หรือเป็นคีย์เวิร์ดที่ตรงกับใน LINE OA
      // ไม่ต้องตอบกลับจากสคริปต์นี้ เพื่อให้ระบบ Auto-response ของ LINE OA ตอบกลับเองโดยตรง
    }
  } catch (err) {
    console.error("Error in doPost: " + err.message);
  }

  return ContentService.createTextOutput("OK");
}

/**
 * ฟังก์ชันส่งข้อความกลับไปยัง LINE Messaging API
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
