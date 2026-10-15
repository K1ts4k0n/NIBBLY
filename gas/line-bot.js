/**
 * ========================================================
 * 🥣 NIBBLY LINE Official Account Webhook (Google Apps Script)
 * ========================================================
 * สคริปต์ส่งปุ่มลัด (Quick Reply) แบบคีย์เวิร์ดข้อความ (type: message)
 * 
 * 📌 หมายเหตุ:
 * ตามข้อกำหนดของ LINE API ปุ่ม Quick Reply จำเป็นต้องแนบไปกับข้อความอย่างน้อย 1 ข้อความเสมอ
 * เราจึงย่อข้อความให้สั้นที่สุดเหลือเพียง "กดเลือกเมนูลัดด้านล่างได้เลยนะคะ 👇"
 * เพื่อไม่ให้ซ้ำซ้อนกับข้อความทักทายที่คุณตั้งไว้ใน LINE OA ครับ
 */

var CHANNEL_ACCESS_TOKEN = 'OHrhVSfQ2sCTKCZswpADKdcbPbUaGMCRVTscmoRLZTDlHOHQMnTTzKf+pGY/opThzdQgJPl7RRNY93WMcVw7SNN3TdSuI0GGstwdgxCkNvnKNr5OLmc008C4SaDDXNZEQJj3A0+K75I2SzCjGtZE6AdB04t89/1O/w1cDnyilFU=';

function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var event = contents.events && contents.events[0];

    if (!event) {
      return ContentService.createTextOutput("OK");
    }

    if (event.type === 'message' && event.message.type === 'text') {
      var userMessage = event.message.text.trim();
      var replyToken = event.replyToken;
      var lowerMsg = userMessage.toLowerCase();

      // เมื่อผู้ใช้พิมพ์ทักทาย หรือเรียกดูเมนู
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
        lowerMsg.includes("คีย์ลัด")
      ) {
        var quickReplyMessage = {
          "type": "text",
          "text": "กดเลือกเมนูลัดด้านล่างได้เลยนะคะ 👇",
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

        replyLine(replyToken, [quickReplyMessage]);
        return ContentService.createTextOutput("OK");
      }
    }
  } catch (err) {
    console.error("Error in doPost: " + err.message);
  }

  return ContentService.createTextOutput("OK");
}

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
