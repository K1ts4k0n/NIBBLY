<?php
/**
 * สคริปต์ส่ง Email ตอบรับการสมัครรับข่าวสารของ NIBBLY ด้วย PHPMailer (subscribe_email.php)
 * สไตล์น่ารักสดใส ผลไม้หลากสี 🍓 🥑 🍍 🫐 🍌 🥥 🍯 🥝 🍇
 * เชื่อมโยงกับหน้าร้าน: https://k1ts4k0n.github.io/NIBBLY/
 */

require_once __DIR__ . '/config.php';

// รับค่าจาก POST, JSON หรือ GET
$input_json = json_decode(file_get_contents('php://input'), true);

$email = $_POST['email'] ?? $input_json['email'] ?? $_GET['email'] ?? 'atetfitqlpseo123@gmail.com';

$is_preview = isset($_GET['preview']) || (!isset($_POST['send']) && !isset($input_json['send']) && !isset($_GET['send']));
$do_send = isset($_POST['send']) || (isset($input_json['send']) && $input_json['send']) || (isset($_GET['send']) && $_GET['send'] == '1');

$brand_name = 'NIBBLY';
$brand_sub = 'ขนมดี · เติมวันให้สดใส 🌈✨';

// ==============================================================================
// สร้าง HTML Template สำหรับ Email ข่าวสาร สไตล์น่ารักสดใส
// ==============================================================================
$html_content = <<<HTML
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ขอบคุณที่สมัครรับข่าวสาร - {$brand_name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap');
    body {
      margin: 0;
      padding: 0;
      background-color: #F0FFF4;
      font-family: 'Prompt', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #2D3748;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #F0FFF4;
      padding: 30px 0 50px;
    }
    .container {
      max-width: 480px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border-radius: 34px;
      overflow: hidden;
      box-shadow: 0 16px 45px rgba(82, 183, 136, 0.16);
      border: 2px solid #D8F3DC;
    }
    .header-banner {
      background: linear-gradient(135deg, #FF758F 0%, #FFB4A2 30%, #FFD166 65%, #52B788 100%);
      padding: 34px 20px 28px;
      text-align: center;
    }
    .fruit-ribbon {
      font-size: 24px;
      letter-spacing: 8px;
      margin-bottom: 12px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
    }
    .logo-box {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #FFFFFF;
      padding: 8px 24px;
      border-radius: 30px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      margin-bottom: 8px;
    }
    .brand-name {
      font-size: 28px;
      font-weight: 900;
      color: #1B4332;
      letter-spacing: 0.5px;
    }
    .brand-tagline {
      font-size: 13px;
      color: #FFFFFF;
      font-weight: 800;
      letter-spacing: 1px;
      text-shadow: 0 1px 4px rgba(0,0,0,0.25);
    }
    .body-content {
      padding: 28px 22px 34px;
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
    .btn-return {
      display: block;
      margin: 0 auto 12px;
      padding: 14px 20px;
      background: linear-gradient(135deg, #FF6B8B 0%, #FF9E00 100%);
      color: #FFFFFF;
      text-align: center;
      text-decoration: none;
      font-size: 14px;
      font-weight: 900;
      border-radius: 28px;
      box-shadow: 0 6px 18px rgba(255, 107, 139, 0.35);
    }
    .btn-home {
      display: block;
      margin: 0 auto 16px;
      padding: 11px 20px;
      background: #F0FFF4;
      border: 2px solid #52B788;
      color: #1B4332;
      text-align: center;
      text-decoration: none;
      font-size: 13px;
      font-weight: 800;
      border-radius: 28px;
    }
    .footer-bar {
      text-align: center;
      font-size: 11px;
      color: #8E9AA0;
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1.5px solid #F0F2F5;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- ส่วนแบนเนอร์ด้านบน แฟนซีผลไม้ -->
      <div class="header-banner">
        <div class="fruit-ribbon">
          🍓 🥑 🍍 🫐 🍌 🥥 🍯 🥝 🍇
        </div>
        <div class="logo-box">
          <span style="font-size:26px;">🍓</span>
          <span class="brand-name">{$brand_name}</span>
        </div>
        <div class="brand-tagline">{$brand_sub}</div>
      </div>

      <!-- เนื้อหาหลัก สดใสน่ารัก -->
      <div class="body-content">
        <h1 class="headline">🎉 ขอบคุณที่สมัครรับข่าวสาร 🥳</h1>
        
        <div class="email-box">
          <span>เพิ่มอีเมลเข้าสู่ระบบสมาชิก NIBBLY แล้ว:</span><br>
          <span class="email-val">{$email}</span>
        </div>

        <p style="font-size:12.5px; color:#555; text-align:center; margin:0 0 20px; line-height:1.6;">
          ต่อจากนี้คุณจะได้รับสิทธิพิเศษ สูตรขนมเพื่อสุขภาพ และข่าวสารผลไม้อบกรอบก่อนใคร 🌈
        </p>

        <!-- 3 สิทธิประโยชน์สีสันสดใส -->
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

        <!-- กล่องคำแนะนำ -->
        <div class="tip-box">
          🥑 <strong>คำแนะนำพิเศษ:</strong> คุณสามารถใช้ระบบ <strong>Snack Finder</strong> บนเว็บไซต์ NIBBLY เพื่อค้นหาผลไม้อบกรอบที่เหมาะกับเป้าหมายสุขภาพและแคลอรี่ที่คุณต้องการได้ทันที!
        </div>

        <!-- ปุ่มกลับไปหน้าร้าน NIBBLY -->
        <a href="https://k1ts4k0n.github.io/NIBBLY/shop/" class="btn-return" target="_blank">
          🛍️ 🍓 เริ่มต้นเลือกช้อปขนมผลไม้สดชื่น ➔
        </a>

        <a href="https://k1ts4k0n.github.io/NIBBLY/" class="btn-home" target="_blank">
          🏡 🌈 กลับไปที่หน้าร้าน NIBBLY
        </a>

        <div class="footer-bar">
          🍓 {$brand_name} · {$brand_sub} 🥝
        </div>
      </div>
    </div>
  </div>
</body>
</html>
HTML;

// ==============================================================================
// ส่งอีเมลจริงด้วย PHPMailer (Gmail SMTP)
// ==============================================================================
$send_status = false;
$send_message = '';

if ($do_send) {
    $mail = getPHPMailer();
    if ($mail) {
        try {
            $mail->addAddress($email);
            $mail->Subject = "🍓 ขอบคุณที่สมัครรับข่าวสารจาก {$brand_name} Healthy Treats 🌈";
            $mail->Body    = $html_content;
            $mail->AltBody = "ขอบคุณที่สมัครรับข่าวสารจาก {$brand_name}! อีเมล {$email} ถูกเพิ่มในรายชื่อสมาชิกเรียบร้อยแล้ว";

            $mail->send();
            $send_status = true;
            $send_message = "ส่งอีเมลยืนยันการรับข่าวสารไปยัง {$email} สำเร็จเรียบร้อยแล้ว!";
        } catch (Exception $e) {
            $send_status = false;
            $send_message = "เกิดข้อผิดพลาดในการส่งอีเมล: " . $mail->ErrorInfo;
        }
    } else {
        $send_message = "ไม่สามารถเชื่อมต่อ PHPMailer ได้ กรุณาตรวจสอบการตั้งค่าใน config.php";
    }

    if (isset($input_json) || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'success' => $send_status,
            'message' => $send_message,
            'email' => $email
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// โหมดพรีวิวผ่านเบราว์เซอร์
if ($is_preview) {
    $toolbar = <<<TOOLBAR
    <div style="background:#F0FFF4; padding:12px 20px; font-family:'Prompt',sans-serif; font-size:13px; color:#1B4332; display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #A8DAB5;">
      <div>
        <strong style="color:#2D6A4F;">🍓 พรีวิว Email สมัครรับข่าวสาร สดใสหลากสี (Task 1)</strong>
        <span style="color:#555; margin-left:14px;">ผู้รับ: <strong>{$email}</strong></span>
      </div>
      <div>
        <a href="?preview=1&send=1&email={$email}" style="background:linear-gradient(135deg, #52B788, #2D6A4F); color:#FFFFFF; text-decoration:none; padding:7px 18px; border-radius:20px; font-weight:bold; font-size:12px; margin-right:8px; box-shadow:0 3px 8px rgba(45,106,79,0.3);">📧 ทดลองส่งเข้า Gmail จริง</a>
        <a href="index.php" style="background:#E2E8F0; color:#2D3748; text-decoration:none; padding:7px 16px; border-radius:20px; font-size:12px;">← กลับหน้าหลัก</a>
      </div>
    </div>
TOOLBAR;

    if ($do_send && $send_message) {
        $msg_color = $send_status ? '#137333' : '#D81159';
        $msg_bg = $send_status ? '#E6F4EA' : '#FFE5EC';
        echo "<div style='background:{$msg_bg}; color:{$msg_color}; padding:12px 16px; text-align:center; font-family:sans-serif; font-weight:bold; font-size:13px;'>{$send_message}</div>";
    }

    echo $toolbar . $html_content;
    exit;
}
