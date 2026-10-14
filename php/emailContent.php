<?php
/**
 * ไฟล์ emailContent.php (ตามข้อกำหนดใน LAB บรรทัดที่ 25)
 * กำหนดเนื้อหาในอีเมลและแนบรูปภาพสินค้าแนะนำสำหรับลูกค้าใหม่ด้วย addEmbeddedImage
 */

// 1. แนบรูปสินค้าแนะนำสำหรับลูกค้าใหม่ (ตามข้อกำหนดที่ 2 ของ LAB)
// คำสั่ง: $mail->addEmbeddedImage('ชื่อไฟล์และpath', 'ชื่อตัวแทนรูป');
$posterImage = __DIR__ . '/images/poster.jpg';
if (file_exists($posterImage)) {
    $mail->addEmbeddedImage($posterImage, 'product_poster', 'poster.jpg');
}

// 2. กำหนดเนื้อหา HTML ของอีเมลลงในตัวแปร $bodyContent
$bodyContent = <<<HTML
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap');
  </style>
</head>
<body style="margin:0; padding:0; background-color:#F0FFF4; font-family:'Prompt',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#2D3748;">
  <div style="width:100%; background-color:#F0FFF4; padding:30px 0 50px;">
    <div style="max-width:500px; margin:0 auto; background-color:#FFFFFF; border-radius:34px; overflow:hidden; box-shadow:0 16px 45px rgba(82,183,136,0.18); border:2px solid #D8F3DC;">
      
      <!-- ส่วนแบนเนอร์ด้านบน แฟนซีผลไม้หลากสี -->
      <div style="background:linear-gradient(135deg, #FF758F 0%, #FFB4A2 30%, #FFD166 65%, #52B788 100%); padding:34px 20px 28px; text-align:center;">
        <div style="font-size:24px; letter-spacing:8px; margin-bottom:12px;">
          🍓 🥑 🍍 🫐 🍌 🥥 🍯 🥝 🍇
        </div>
        <div style="display:inline-flex; align-items:center; gap:8px; background:#FFFFFF; padding:8px 24px; border-radius:30px; margin-bottom:8px; box-shadow:0 4px 14px rgba(0,0,0,0.1);">
          <span style="font-size:24px;">🍓</span>
          <span style="font-size:26px; font-weight:900; color:#1B4332; letter-spacing:0.5px;">NIBBLY</span>
        </div>
        <div style="font-size:13px; color:#FFFFFF; font-weight:800; letter-spacing:1px; text-shadow:0 1px 4px rgba(0,0,0,0.25);">
          ขนมดี · เติมวันให้สดใส 🌈✨
        </div>
      </div>

      <!-- เนื้อหาหลัก -->
      <div style="padding:28px 24px 34px; text-align:left;">
        <h1 style="font-size:22px; font-weight:900; color:#1B4332; margin:0 0 14px; line-height:1.3; text-align:center;">
          🎉 ขอบคุณที่สมัครรับข่าวสาร 🥳
        </h1>
        
        <!-- กล่องแสดงอีเมลที่ลงทะเบียน -->
        <div style="background:#FFF9F2; border:2px dashed #FFB4A2; border-radius:18px; padding:14px 18px; margin-bottom:20px; text-align:center; font-size:13px; color:#555;">
          <span>เพิ่มอีเมลเข้าสู่รายชื่อสมาชิกรับสิทธิพิเศษ NIBBLY แล้ว:</span><br>
          <span style="color:#E63946; font-weight:900; font-size:15px; font-family:monospace;">{$email}</span>
        </div>

        <!-- กล่องคูปองของขวัญต้อนรับ 15% -->
        <div style="background:linear-gradient(135deg, #FFF0F5 0%, #FFF9E6 50%, #F0FFF4 100%); border:2px dashed #FF758F; border-radius:20px; padding:16px; margin-bottom:22px; text-align:center;">
          <div style="display:inline-block; background:#FF4D6D; color:#FFFFFF; font-size:10px; font-weight:900; padding:3px 10px; border-radius:12px; margin-bottom:6px;">
            🎁 โค้ดส่วนลดต้อนรับสมาชิกใหม่
          </div>
          <div style="font-size:14px; font-weight:800; color:#6B2D5C; margin-bottom:4px;">
            ลดทันที 15% ในการสั่งซื้อครั้งแรก
          </div>
          <div style="display:inline-block; background:#FFFFFF; border:2px solid #E63946; border-radius:14px; padding:6px 18px; font-family:monospace; font-size:16px; font-weight:900; color:#E63946; letter-spacing:1px; margin:4px 0 8px;">
            ✂️ NIBBLYWELCOME15
          </div>
          <div style="font-size:11px; color:#784852;">
            (ไม่มีขั้นต่ำ · ใช้ได้กับขนมผลไม้อบกรอบทุกรสชาติ)
          </div>
        </div>

        <!-- รูปภาพสินค้าแนะนำสำหรับลูกค้าใหม่ (ตามข้อกำหนดที่ 2: <img src="cid:ชื่อตัวแทนรูป">) -->
        <div style="text-align:center; margin-bottom:22px;">
          <div style="font-size:12px; font-weight:800; color:#D81159; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">
            ✨ สินค้าแนะนำสำหรับคุณ (Recommended Treats) ✨
          </div>
          <div style="border-radius:20px; overflow:hidden; border:2px solid #FFD2DC; box-shadow:0 6px 18px rgba(0,0,0,0.06); background:#FFF;">
            <img src="cid:product_poster" alt="สินค้าแนะนำ NIBBLY" style="width:100%; max-height:280px; object-fit:cover; display:block;" />
          </div>
          <p style="font-size:11px; color:#718096; margin:8px 0 0;">
            🍓 NIBBLY Berry Granola ข้าวโอ๊ตเต็มเมล็ดอบลมร้อน ผสมสตรอว์เบอร์รีและอัลมอนด์
          </p>
        </div>

        <!-- 3 สิทธิประโยชน์สีสันสดใส -->
        <div style="margin-bottom:20px;">
          <div style="border:1.5px solid #FF85A1; background:#FFF0F3; border-radius:18px; padding:14px 16px; margin-bottom:12px; display:flex; align-items:flex-start; gap:12px;">
            <span style="font-size:24px;">🍓</span>
            <div>
              <div style="font-size:13px; font-weight:800; color:#C9184A; margin-bottom:2px;">ส่วนลดพิเศษเฉพาะสมาชิก 15%</div>
              <div style="font-size:11.5px; color:#555; line-height:1.45;">รับสิทธิ์ซื้อขนมราคาสมาชิกตลอดปี พร้อมโปรโมชั่นวันเกิดสุดคุ้ม</div>
            </div>
          </div>

          <div style="border:1.5px solid #FFD166; background:#FFFDF0; border-radius:18px; padding:14px 16px; margin-bottom:12px; display:flex; align-items:flex-start; gap:12px;">
            <span style="font-size:24px;">🍌</span>
            <div>
              <div style="font-size:13px; font-weight:800; color:#B26A00; margin-bottom:2px;">เมนูผลไม้ตามฤดูกาล & ทริคสุขภาพ</div>
              <div style="font-size:11.5px; color:#555; line-height:1.45;">อัปเดตสูตรขนมคลีน แคลอรี่ต่ำ สารอาหารแน่นส่งตรงถึงกล่องข้อความ</div>
            </div>
          </div>

          <div style="border:1.5px solid #52B788; background:#F0FFF4; border-radius:18px; padding:14px 16px; margin-bottom:12px; display:flex; align-items:flex-start; gap:12px;">
            <span style="font-size:24px;">🥑</span>
            <div>
              <div style="font-size:13px; font-weight:800; color:#1B4332; margin-bottom:2px;">สิทธิ์ชิมรสชาติใหม่ก่อนวางจำหน่าย</div>
              <div style="font-size:11.5px; color:#555; line-height:1.45;">ร่วมกิจกรรมทดลองรสชาติผลไม้อบกรอบสูตรลับ และ Flash Sale ทุกเดือน</div>
            </div>
          </div>
        </div>

        <!-- กล่องคำแนะนำพิเศษ -->
        <div style="background:#E8F5E9; border-left:5px solid #52B788; border-radius:0 16px 16px 0; padding:14px 16px; margin:20px 0 22px; font-size:12px; color:#1B4332; line-height:1.6;">
          🥑 <strong>คำแนะนำพิเศษ:</strong> สามารถใช้ระบบ <strong>Snack Finder</strong> บนเว็บไซต์ NIBBLY เพื่อค้นหาผลไม้อบกรอบที่ตรงกับเป้าหมายสุขภาพและแคลอรี่ของคุณได้ทันที!
        </div>

        <!-- ปุ่มกดกลับหน้าร้าน -->
        <a href="https://k1ts4k0n.github.io/NIBBLY/shop/" target="_blank" style="display:block; margin:0 auto 10px; padding:14px 20px; background:linear-gradient(135deg, #FF6B8B 0%, #FF9E00 100%); color:#FFFFFF; text-align:center; text-decoration:none; font-size:14px; font-weight:900; border-radius:28px; box-shadow:0 6px 18px rgba(255,107,139,0.35);">
          🛍️ 🍓 เริ่มต้นเลือกช้อปขนมผลไม้สดชื่น ➔
        </a>

        <a href="https://k1ts4k0n.github.io/NIBBLY/" target="_blank" style="display:block; margin:0 auto 16px; padding:11px 20px; background:#F0FFF4; border:2px solid #52B788; color:#1B4332; text-align:center; text-decoration:none; font-size:13px; font-weight:800; border-radius:28px;">
          🏡 🌈 กลับไปที่หน้าร้านหลัก NIBBLY
        </a>

        <div style="text-align:center; font-size:11px; color:#8E9AA0; margin-top:22px; padding-top:16px; border-top:1.5px solid #F0F2F5;">
          🍓 NIBBLY Healthy Treats · ขนมดี เติมวันให้สดใส 🥝<br>
          อีเมลนี้ถูกส่งโดยระบบอัตโนมัติถึง {$email}
        </div>
      </div>
    </div>
  </div>
</body>
</html>
HTML;
