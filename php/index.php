<?php
/**
 * หน้าแดชบอร์ดทดสอบระบบส่ง Email ด้วย PHPMailer & Gmail SMTP
 * ออกแบบสำหรับนักศึกษาใช้งานส่งงานอาจารย์ (รูป Content + ไฟล์ .php)
 * ธีม NIBBLY น่ารักสดใส ผลไม้หลากสี 🍓 🥝 🫐 🥑 🍌 🍍 🍯
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/products_data.php';

$saved_note = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_settings'])) {
    $user_gmail = trim($_POST['gmail_username'] ?? '');
    $user_pass = trim($_POST['gmail_app_password'] ?? '');

    if (!empty($user_gmail) && !empty($user_pass)) {
        $config_file = __DIR__ . '/config.php';
        $content = file_get_contents($config_file);

        $content = preg_replace("/define\('GMAIL_USERNAME',.*?\);/", "define('GMAIL_USERNAME', '{$user_gmail}');", $content);
        $content = preg_replace("/define\('GMAIL_APP_PASSWORD',.*?\);/", "define('GMAIL_APP_PASSWORD', '{$user_pass}');", $content);

        file_put_contents($config_file, $content);
        $saved_note = '✅ บันทึกข้อมูล Gmail SMTP เรียบร้อยแล้ว!';
    }
}
?>
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ระบบส่ง Email NIBBLY ด้วย PHP & Gmail SMTP (งานส่งอาจารย์)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background: #FFF8F0;
      font-family: 'Prompt', sans-serif;
      color: #2D3748;
      line-height: 1.6;
    }
    .container {
      max-width: 980px;
      margin: 0 auto;
      padding: 36px 20px 50px;
    }
    .header {
      text-align: center;
      margin-bottom: 36px;
    }
    .badge {
      display: inline-block;
      background: linear-gradient(135deg, #FF6B8B, #FFA07A);
      color: #FFFFFF;
      font-weight: 800;
      font-size: 12px;
      padding: 5px 16px;
      border-radius: 20px;
      margin-bottom: 12px;
      letter-spacing: 0.8px;
      box-shadow: 0 4px 12px rgba(255,107,139,0.25);
    }
    h1 {
      font-size: 28px;
      font-weight: 900;
      margin: 0 0 10px;
      color: #D81159;
    }
    p.lead {
      color: #718096;
      font-size: 15px;
      margin: 0;
    }
    .alert {
      background: #E6F4EA;
      border: 1px solid #A8DAB5;
      border-radius: 14px;
      padding: 12px 18px;
      color: #137333;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 24px;
      text-align: center;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }
    .card {
      background: #FFFFFF;
      border: 2px solid #FFE3EC;
      border-radius: 24px;
      padding: 26px;
      position: relative;
      box-shadow: 0 10px 30px rgba(255, 112, 137, 0.08);
    }
    .card-title {
      font-size: 19px;
      font-weight: 800;
      color: #1A202C;
      margin: 0 0 8px;
    }
    .card-desc {
      font-size: 13.5px;
      color: #4A5568;
      margin: 0 0 20px;
      line-height: 1.6;
    }
    .task-tag {
      display: inline-block;
      font-size: 11px;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: 8px;
      background: #FFE5EC;
      color: #D81159;
      margin-bottom: 12px;
    }
    .btn {
      display: block;
      width: 100%;
      padding: 13px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 800;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      margin-top: 10px;
      border: none;
      transition: transform 0.15s, opacity 0.2s;
    }
    .btn:hover {
      opacity: 0.92;
      transform: translateY(-1px);
    }
    .btn-preview {
      background: linear-gradient(135deg, #FF6B8B 0%, #FFA07A 100%);
      color: #FFFFFF;
      box-shadow: 0 4px 14px rgba(255,107,139,0.3);
    }
    .btn-secondary {
      background: #F0FFF4;
      color: #1B4332;
      border: 2px solid #52B788;
    }
    .settings-box {
      background: #FFFFFF;
      border: 2px solid #FFEDD5;
      border-radius: 24px;
      padding: 26px;
      margin-bottom: 32px;
      box-shadow: 0 8px 24px rgba(255,160,122,0.08);
    }
    .form-group {
      margin-bottom: 16px;
    }
    label {
      display: block;
      font-size: 13px;
      font-weight: 700;
      color: #2D3748;
      margin-bottom: 6px;
    }
    input[type="text"], input[type="password"] {
      width: 100%;
      padding: 11px 16px;
      background: #FFFDF9;
      border: 1.5px solid #CBD5E0;
      border-radius: 12px;
      color: #1A202C;
      font-family: inherit;
      font-size: 14px;
      outline: none;
    }
    input[type="text"]:focus, input[type="password"]:focus {
      border-color: #FF6B8B;
    }
    .note {
      font-size: 12px;
      color: #718096;
      margin-top: 6px;
    }
    .file-list {
      background: #FFFDF9;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      padding: 16px 20px;
      font-family: monospace;
      font-size: 13px;
      color: #2D3748;
      line-height: 1.7;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">🍓 NIBBLY HEALTHY SNACKS 🥝</div>
      <h1>ระบบส่ง Email ด้วย PHPMailer + Gmail SMTP</h1>
      <p class="lead">ส่งงานอาจารย์: ส่ง Content รูปภาพ + ไฟล์ .php ดึงข้อมูลสินค้าและจัดการการส่งอีเมล</p>
    </div>

    <?php if ($saved_note): ?>
      <div class="alert"><?= htmlspecialchars($saved_note) ?></div>
    <?php endif; ?>

    <!-- งานที่ 1, งานที่ 2 & งานที่ 3 -->
    <div class="grid">
      <!-- งานที่ 1 -->
      <div class="card">
        <span class="task-tag">งานข้อที่ 1 ตามรูปครู</span>
        <h2 class="card-title">🍓 Email รับข่าวสาร (Subscribe)</h2>
        <p class="card-desc">
          ส่งอีเมลตอบรับเมื่อสมัครรับข่าวสาร แสดงข้อความยืนยัน <strong>สิทธิประโยชน์ 3 ข้อ กล่องทิปผลไม้ และปุ่มกลับหน้าร้าน</strong> สดใสหลายสี
        </p>

        <a href="subscribe_email.php?preview=1" target="_blank" class="btn btn-preview">
          📷 เปิดดูพรีวิว (สำหรับแคปรูปส่งครู)
        </a>
        <a href="subscribe_email.php?preview=1&send=1" class="btn btn-secondary">
          ⚡ ทดสอบส่งเข้า Gmail จริง
        </a>
      </div>

      <!-- งานที่ 2 -->
      <div class="card">
        <span class="task-tag">งานข้อที่ 2 ตามรูปครู</span>
        <h2 class="card-title">🥑 Email สมาชิกใหม่ (สินค้าแนะนำ 4 ตัว)</h2>
        <p class="card-desc">
          ส่งอีเมลต้อนรับสมาชิก <strong>ใช้ PHP ดึงข้อมูลขนมแนะนำ 4 รายการจากเว็บ NIBBLY</strong> พร้อมการ์ดโค้ดลด 15% และรูปภาพฝังแบบ CID Inline
        </p>

        <a href="register_email.php?preview=1" target="_blank" class="btn btn-preview">
          📷 เปิดดูพรีวิว (สำหรับแคปรูปส่งครู)
        </a>
        <a href="register_email.php?preview=1&send=1" class="btn btn-secondary">
          ⚡ ทดสอบส่งเข้า Gmail จริง
        </a>
      </div>

      <!-- งานที่ 3 -->
      <div class="card">
        <span class="task-tag" style="background:#E6F4EA; color:#137333;">งานข้อที่ 3 ตามรูปครู</span>
        <h2 class="card-title">📦 Email สรุปข้อมูลการสั่งซื้อ (Order Receipt)</h2>
        <p class="card-desc">
          ส่งอีเมลสรุปข้อมูลคำสั่งซื้อเมื่อลูกค้าชำระเงินเสร็จสิ้น <strong>แสดงรายการขนม ตารางคำนวณราคา ส่วนลด 15% เลขคำสั่งซื้อ และที่อยู่จัดส่ง</strong> สวยงามระดับพรีเมียม
        </p>

        <a href="order_email.php?preview=1" target="_blank" class="btn btn-preview">
          📷 เปิดดูพรีวิว (สำหรับแคปรูปส่งครู)
        </a>
        <a href="order_email.php?preview=1&send=1" class="btn btn-secondary">
          ⚡ ทดสอบส่งเข้า Gmail จริง
        </a>
      </div>
    </div>

    <!-- ตั้งค่า Gmail SMTP -->
    <div class="settings-box">
      <h3 style="margin-top:0; color:#D81159;">⚙️ ตั้งค่า Gmail SMTP (สำหรับส่งจริงเข้ากล่องข้อความ)</h3>
      <p class="note" style="margin-bottom: 18px;">
        กรอก Gmail และ <strong>รหัสผ่านแอป 16 หลัก (App Password)</strong> เพื่อให้ระบบส่งอีเมลจริง หรือหากเปิดพรีวิวเพื่อแคปรูปส่งครูก็สามารถคลิกเปิดดูได้ทันที
      </p>

      <form method="POST" action="">
        <div class="form-group">
          <label>Gmail Address (อีเมลของคุณ):</label>
          <input type="text" name="gmail_username" value="<?= htmlspecialchars(GMAIL_USERNAME) ?>" placeholder="your.name@gmail.com" />
        </div>
        <div class="form-group">
          <label>Gmail App Password (รหัสผ่านสำหรับแอป 16 ตัวอักษร):</label>
          <input type="password" name="gmail_app_password" value="<?= htmlspecialchars(GMAIL_APP_PASSWORD) ?>" placeholder="xxxx xxxx xxxx xxxx" />
          <div class="note">
            * สร้างรหัสผ่านแอปได้ที่ Google Account &gt; Security &gt; 2-Step Verification &gt; App passwords
          </div>
        </div>
        <button type="submit" name="save_settings" class="btn btn-preview" style="width: auto; padding: 11px 26px; margin-top: 14px; border-radius: 24px;">
          บันทึกการตั้งค่า SMTP
        </button>
      </form>
    </div>

    <!-- ส่วนงาน LAB: sendMail.php & emailContent.php ตรงตามโจทย์อาจารย์ 100% -->
    <div class="settings-box" style="border: 2px solid #52B788; background: #F6FFF8;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
        <h3 style="margin: 0; color: #1B4332; font-size: 18px;">
          ⭐ ไฟล์ LAB ตามใบงานอาจารย์ (sendMail.php + emailContent.php)
        </h3>
        <span style="background: #52B788; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 800;">
          ตรงตามใบงาน 100%
        </span>
      </div>
      <p style="font-size: 13.5px; color: #2D6A4F; margin: 0 0 16px; line-height: 1.6;">
        โค้ดใน <code>sendMail.php</code> ถอดแบบตามไฟล์ตัวอย่างใน LAB ทุกบรรทัด พร้อมแยกเนื้อหาใส่ <code>emailContent.php</code> ในบรรทัดที่ 25 และแนบรูปภาพสินค้าแนะนำด้วย <code>$mail-&gt;addEmbeddedImage()</code> แสดงผ่าน <code>&lt;img src="cid:product_poster"&gt;</code> ครบทั้ง 4 ข้อกำหนดเพิ่มเติม
      </p>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="subscribe.html" target="_blank" class="btn btn-preview" style="display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; text-decoration: none; border-radius: 20px; font-size: 13px;">
          💌 เปิดฟอร์มทดสอบสมัครรับข่าวสาร (subscribe.html)
        </a>
        <a href="sendMail.php" target="_blank" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; text-decoration: none; border-radius: 20px; font-size: 13px;">
          📄 ตรวจสอบไฟล์ sendMail.php
        </a>
        <a href="emailContent.php" target="_blank" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; text-decoration: none; border-radius: 20px; font-size: 13px;">
          📄 ตรวจสอบไฟล์ emailContent.php
        </a>
      </div>
    </div>

    <!-- สรุปโครงสร้างไฟล์สำหรับส่งอาจารย์ -->
    <div class="settings-box">
      <h3 style="margin-top:0; color:#2D6A4F;">📁 โครงสร้างไฟล์ .php สำหรับส่งงานอาจารย์ (โฟลเดอร์ /php)</h3>
      <div class="file-list">
        ├── sendMail.php          # ⭐ ไฟล์หลักตามใบงาน LAB โหลด PHPMailer ตรวจสอบ POST และส่งอีเมล<br>
        ├── emailContent.php      # ⭐ เนื้อหาอีเมลบรรทัดที่ 25 + แนบรูปภาพสินค้าด้วย CID<br>
        ├── subscribe.html        # ⭐ แบบฟอร์ม HTML ส่ง POST เข้า sendMail.php<br>
        ├── images/poster.jpg     # ⭐ รูปภาพสินค้าแนะนำสำหรับลูกค้าใหม่ (แนบด้วย addEmbeddedImage)<br>
        ├── subscribers.txt       # บันทึกรายชื่ออีเมลที่สมัครสมาชิกสำเร็จ (FILE_APPEND)<br>
        ├── config.php            # ตั้งค่า Gmail SMTP & การเชื่อมต่อ PHPMailer<br>
        ├── products_data.php     # ฐานข้อมูลสินค้า NIBBLY 20 รายการ<br>
        ├── subscribe_email.php   # สคริปต์ส่ง Email รับข่าวสาร สดใสผลไม้ 🍓🥑 (งานข้อ 1)<br>
        ├── register_email.php    # สคริปต์ส่ง Email สมาชิกใหม่ แนะนำ 4 ขนม (งานข้อ 2)<br>
        ├── order_email.php       # สคริปต์ส่ง Email สรุปข้อมูลการสั่งซื้อและใบเสร็จ (งานข้อ 3)<br>
        └── PHPMailer/            # ไลบรารี PHPMailer พร้อมโฟลเดอร์ src/<br>
        &nbsp;&nbsp;&nbsp;&nbsp;└── src/<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── Exception.php<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── PHPMailer.php<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── SMTP.php
      </div>
    </div>
  </div>
</body>
</html>
