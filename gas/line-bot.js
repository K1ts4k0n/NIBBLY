/**
 * ========================================================
 * 🥣 NIBBLY LINE Official Account Webhook (Google Apps Script)
 * ========================================================
 * สคริปต์ส่งปุ่มลัด (Quick Reply) ตลอดเวลา:
 * ลูกค้าพิมพ์อะไรก็ได้ ➡️ แถบปุ่มลัดคีย์เวิร์ดทั้ง 8 ปุ่มจะเด้งขึ้นมาเสมอ
 * ไม่ต้องดักจับคำว่า "สวัสดี" หรือคำเฉพาะเจาะจงใดๆ
 */

var CHANNEL_ACCESS_TOKEN = 'OHrhVSfQ2sCTKCZswpADKdcbPbUaGMCRVTscmoRLZTDlHOHQMnTTzKf+pGY/opThzdQgJPl7RRNY93WMcVw7SNN3TdSuI0GGstwdgxCkNvnKNr5OLmc008C4SaDDXNZEQJj3A0+K75I2SzCjGtZE6AdB04t89/1O/w1cDnyilFU=';

function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var event = contents.events && contents.events[0];

    if (!event) return ContentService.createTextOutput("OK");

    // ตรวจสอบว่ามีข้อความส่งเข้ามา (ไม่ว่าจะพิมพ์อะไรมาก็ตาม)
    if (event.type === 'message' && event.message.type === 'text') {
      var replyToken = event.replyToken;

      var quickReplyMessage = {
        "type": "text",
        "text": "กดเลือกเมนูลัดด้านล่างได้เลยนะคะ 👇",
        "quickReply": {
          "items": [
            { "type": "action", "action": { "type": "message", "label": "🎁 โปรโมชั่น", "text": "โปรโมชั่น" } },
            { "type": "action", "action": { "type": "message", "label": "🥣 ดูเมนูขนม", "text": "ดูเมนูขนม" } },
            { "type": "action", "action": { "type": "message", "label": "🎮 เล่นเกมรับโค้ด", "text": "เล่นเกม" } },
            { "type": "action", "action": { "type": "message", "label": "📦 เช็คสถานะพัสดุ", "text": "ตรวจสอบสถานะพัสดุ" } },
            { "type": "action", "action": { "type": "message", "label": "🚚 รอบส่ง & ค่าส่ง", "text": "รอบการจัดส่ง&ค่าส่ง" } },
            { "type": "action", "action": { "type": "message", "label": "💳 ช่องทางชำระเงิน", "text": "ช่องทางชำระเงิน" } },
            { "type": "action", "action": { "type": "message", "label": "🥑 ข้อมูลสุขภาพ", "text": "ข้อมูลสุขภาพ" } },
            { "type": "action", "action": { "type": "message", "label": "👩‍💼 ติดต่อแอดมิน", "text": "ติดต่อแอดมิน" } }
          ]
        }
      };

      // ส่งปุ่มลัดกลับไปทุกครั้งที่ลูกค้าส่งข้อความ
      replyLine(replyToken, [quickReplyMessage]);
      return ContentService.createTextOutput("OK");
    }
  } catch (err) {
    console.error("Error: " + err.message);
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
