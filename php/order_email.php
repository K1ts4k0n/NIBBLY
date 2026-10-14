<?php
/**
 * สคริปต์ส่ง Email สรุปคำสั่งซื้อและใบเสร็จของ NIBBLY ด้วย PHPMailer (order_email.php)
 * สไตล์น่ารักสดใส ผลไม้หลากสี 🍓 📦 🥝 🥑 🍍 🍯 🍌 ✨
 * ข้อ 3 ของงานส่งอาจารย์: สรุปข้อมูลการสั่งซื้อสินค้าส่งไปทางเมลลูกค้า
 */

require_once __DIR__ . '/config.php';

// รับค่าจาก POST, JSON หรือ GET
$input_json = json_decode(file_get_contents('php://input'), true);

$email = $_POST['email'] ?? $input_json['email'] ?? $_GET['email'] ?? 'atetfitqlpseo123@gmail.com';
$name = $_POST['name'] ?? $input_json['name'] ?? $_GET['name'] ?? 'Artkung Rakyouna';
$order_id = $_POST['orderId'] ?? $input_json['orderId'] ?? $_GET['orderId'] ?? 'NIB-' . date('Y') . '-' . rand(100000, 999999);
$phone = $_POST['phone'] ?? $input_json['phone'] ?? $_GET['phone'] ?? '089-123-4567';
$address = $_POST['address'] ?? $input_json['address'] ?? $_GET['address'] ?? '123/45 ซอยสุขุมวิท 39 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110';
$payment_method = $_POST['paymentMethod'] ?? $input_json['paymentMethod'] ?? $_GET['paymentMethod'] ?? 'พร้อมเพย์ (PromptPay QR)';
$promo_code = $_POST['promoCode'] ?? $input_json['promoCode'] ?? $_GET['promoCode'] ?? 'NIBBLYWELCOME15';

$items = $input_json['items'] ?? [
    ['name' => 'NIBBLY Berry Granola', 'price' => 149, 'qty' => 2, 'emoji' => '🍓'],
    ['name' => 'Honey Almond Crunch', 'price' => 139, 'qty' => 1, 'emoji' => '🍯'],
];

$art_lookup = [
    'berry granola' => 'berry-granola.jpg',
    'honey almond' => 'honey.jpg',
    'choco oat' => 'choco.jpg',
    'tropical' => 'tropical.jpg',
    'banana oat' => 'banana.jpg',
    'strawberry yogurt' => 'strawberry-yogurt.jpg',
    'blueberry' => 'blueberry.jpg',
    'cashew honey' => 'cashew.jpg',
    'coconut almond' => 'coconut.jpg',
    'mixed berry' => 'mixed-berry.jpg',
    'banana cinnamon' => 'banana-chips.jpg',
    'pumpkin' => 'pumpkin.jpg',
    'mango cashew' => 'mango.jpg',
    'matcha' => 'matcha.jpg',
    'protein' => 'protein.jpg',
    'apple cinnamon' => 'apple.jpg',
    'dark cocoa' => 'dark-cocoa.jpg',
    'pineapple' => 'pineapple.jpg',
    'berry oat cookies' => 'berry-cookies.jpg',
    'super snack mix' => 'super-mix.jpg',
];

$embedded_images = [];
$subtotal = 0;
$items_html = '';
foreach ($items as $idx => $item) {
    $qty = $item['qty'] ?? $item['quantity'] ?? 1;
    $price = $item['price'] ?? 0;
    $line_total = $price * $qty;
    $subtotal += $line_total;
    $emoji = $item['emoji'] ?? '🍓';
    $item_name = htmlspecialchars($item['name']);

    $img_file = 'berry-granola.jpg';
    $lower = strtolower($item['name']);
    foreach ($art_lookup as $k => $f) {
        if (strpos($lower, $k) !== false) {
            $img_file = $f;
            break;
        }
    }

    $img_path = __DIR__ . '/images/' . $img_file;
    $has_img = file_exists($img_path);
    $cid = 'order_img_' . $idx;

    if ($has_img) {
        $embedded_images[] = [
            'path' => $img_path,
            'cid' => $cid,
            'name' => $img_file
        ];
        $img_tag = "<img src=\"cid:{$cid}\" alt=\"{$item_name}\" style=\"width:60px; height:60px; object-fit:cover; display:block; border-radius:12px;\" />";
    } else {
        $img_tag = "<div style=\"line-height:60px; font-size:28px;\">{$emoji}</div>";
    }

    $items_html .= <<<ITEM
    <tr style="border-bottom:1px solid #F0F2F5;">
      <td width="68" valign="middle" style="padding:10px 8px 10px 0;">
        <div style="width:60px; height:60px; border-radius:14px; overflow:hidden; background:#FFF5F7; border:2px solid #FFE3EC; text-align:center;">
          {$img_tag}
        </div>
      </td>
      <td valign="middle" style="padding:10px 6px; font-size:14px; font-weight:800; color:#2D3748;">
        {$item_name}
        <div style="font-size:11.5px; color:#718096; font-weight:normal; margin-top:2px;">
          {$qty} ซอง × ฿{$price}
        </div>
      </td>
      <td width="70" align="right" valign="middle" style="padding:10px 0; font-size:15px; font-weight:900; color:#354B2D;">
        ฿{$line_total}
      </td>
    </tr>
ITEM;
}

$discount = !empty($promo_code) ? round($subtotal * 0.15) : 0;
$shipping = $subtotal >= 500 ? 0 : 40;
$grand_total = max(0, $subtotal - $discount + $shipping);

$is_preview = isset($_GET['preview']) || (!isset($_POST['send']) && !isset($input_json['send']) && !isset($_GET['send']));
$do_send = isset($_POST['send']) || (isset($input_json['send']) && $input_json['send']) || (isset($_GET['send']) && $_GET['send'] == '1');

$brand_name = 'NIBBLY';
$brand_sub = 'ขนมดี · เติมวันให้สดใส 🌈✨';

// ==============================================================================
// HTML Template สำหรับ Email สรุปคำสั่งซื้อ (น่ารัก สดใส ผลไม้หลากสี)
// ==============================================================================
$html_content = <<<HTML
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>สรุปคำสั่งซื้อ #{$order_id} - {$brand_name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap');
    body {
      margin: 0;
      padding: 0;
      background-color: #FFF5EC;
      font-family: 'Prompt', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #2D3748;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #FFF5EC;
      padding: 30px 0 50px;
    }
    .container {
      max-width: 520px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border-radius: 36px;
      overflow: hidden;
      box-shadow: 0 20px 55px rgba(255, 112, 137, 0.18);
      border: 2px solid #FFE3EC;
    }
    .header-banner {
      background: linear-gradient(135deg, #FF6B8B 0%, #FFA07A 35%, #FFD166 70%, #52B788 100%);
      padding: 36px 22px 30px;
      text-align: center;
    }
    .fruit-ribbon {
      font-size: 24px;
      letter-spacing: 8px;
      margin-bottom: 10px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
    }
    .logo-box {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #FFFFFF;
      padding: 6px 20px;
      border-radius: 30px;
      margin-bottom: 12px;
      box-shadow: 0 4px 14px rgba(230, 57, 70, 0.2);
    }
    .brand-tag {
      font-size: 13px;
      font-weight: 900;
      color: #E63946;
      letter-spacing: 0.8px;
    }
    .headline {
      margin: 0 0 6px;
      font-size: 24px;
      font-weight: 900;
      color: #FFFFFF;
      line-height: 1.3;
      text-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }
    .subline {
      margin: 0;
      font-size: 13px;
      color: #FFF8F0;
      font-weight: 600;
      line-height: 1.5;
    }
    .body-content {
      padding: 26px 22px;
      text-align: left;
    }
    .order-box {
      background: linear-gradient(135deg, #FFF9E6 0%, #FFF0F5 100%);
      border: 2px dashed #FF758F;
      border-radius: 22px;
      padding: 18px;
      margin-bottom: 22px;
    }
    .order-tag {
      font-size: 11px;
      font-weight: 800;
      color: #718096;
      text-transform: uppercase;
    }
    .order-id {
      font-size: 20px;
      font-weight: 900;
      color: #D81159;
      font-family: monospace;
      margin-top: 2px;
    }
    .paid-badge {
      background: #E6F4EA;
      color: #137333;
      font-size: 11px;
      font-weight: 800;
      padding: 5px 12px;
      border-radius: 20px;
      border: 1px solid #A8DAB5;
      display: inline-block;
    }
    .delivery-box {
      background: #F8FBF8;
      border: 1.5px solid #D8F3DC;
      border-radius: 20px;
      padding: 16px;
      margin-bottom: 22px;
      font-size: 12.5px;
      line-height: 1.6;
    }
    .summary-box {
      background: #FFFDF9;
      border: 2px solid #FFE3EC;
      border-radius: 22px;
      padding: 18px;
      margin-bottom: 24px;
      font-size: 13px;
    }
    .btn-shop {
      display: block;
      background: linear-gradient(135deg, #FF4D6D 0%, #FF9E00 100%);
      color: #FFFFFF;
      font-size: 14.5px;
      font-weight: 900;
      padding: 13px;
      border-radius: 30px;
      text-decoration: none;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 6px 18px rgba(255,77,109,0.3);
    }
    .btn-home {
      display: block;
      background: #F0FFF4;
      border: 2px solid #52B788;
      color: #1B4332;
      font-size: 13px;
      font-weight: 800;
      padding: 11px;
      border-radius: 30px;
      text-decoration: none;
      text-align: center;
    }
    .footer-bar {
      text-align: center;
      font-size: 11px;
      color: #8E9AA0;
      margin-top: 24px;
      border-top: 1.5px solid #F0F2F5;
      padding-top: 16px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- ส่วนแบนเนอร์ด้านบน สีสันสดใสหลากสี -->
      <div class="header-banner">
        <div class="fruit-ribbon">
          🍓 📦 🥝 🥑 🍍 🍯 🍌 ✨
        </div>
        <div class="logo-box">
          <span style="font-size:18px;">🍓</span>
          <span class="brand-tag">NIBBLY HEALTHY TREATS</span>
        </div>
        <h1 class="headline">🎉 ขอบคุณสำหรับคำสั่งซื้อแสนอร่อย! 🥳</h1>
        <p class="subline">
          เราได้รับคำสั่งซื้อและชำระเงินเรียบร้อยแล้ว กำลังจัดเตรียมขนมส่งตรงถึงบ้านคุณ 🚚✨
        </p>
      </div>

      <!-- เนื้อหาหลัก -->
      <div class="body-content">
        <!-- กล่องเลขที่คำสั่งซื้อ -->
        <div class="order-box">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span class="order-tag">เลขที่คำสั่งซื้อ (ORDER ID)</span>
                <div class="order-id">#{$order_id}</div>
              </td>
              <td align="right" valign="middle">
                <span class="paid-badge">✓ ชำระเงินสำเร็จ (PAID)</span>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding-top:10px; border-top:1px dashed #FFD2DC; margin-top:10px; font-size:12px; color:#6B4B53;">
                💳 ช่องทางชำระเงิน: <strong>{$payment_method}</strong>
              </td>
            </tr>
          </table>
        </div>

        <!-- ข้อมูลการจัดส่งพัสดุ -->
        <div class="delivery-box">
          <div style="font-size:13px; font-weight:900; color:#1B4332; margin-bottom:6px;">
            🚚 ข้อมูลการจัดส่งพัสดุ
          </div>
          <strong>คุณ {$name}</strong> (โทร: {$phone})<br>
          {$address}<br>
          <span style="color:#52B788; font-weight:700;">📦 คาดว่าจะได้รับสินค้าภายใน 1-2 วันทำการ</span>
        </div>

        <!-- รายการขนมในคำสั่งซื้อ -->
        <div style="margin-bottom:20px;">
          <div style="font-size:15px; font-weight:900; color:#2D3748; margin-bottom:10px;">
            🥣 รายการขนมในคำสั่งซื้อของคุณ
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            {$items_html}
          </table>
        </div>

        <!-- กล่องสรุปคำนวณราคา -->
        <div class="summary-box">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:4px 0; color:#718096;">ราคาสินค้ารวม (Subtotal)</td>
              <td style="padding:4px 0; text-align:right; font-weight:700;">฿{$subtotal}</td>
            </tr>
            <tr>
              <td style="padding:4px 0; color:#E63946; font-weight:700;">🏷️ ส่วนลดสมาชิก ({$promo_code})</td>
              <td style="padding:4px 0; text-align:right; color:#E63946; font-weight:800;">-฿{$discount}</td>
            </tr>
            <tr>
              <td style="padding:4px 0; color:#718096;">ค่าจัดส่งด่วน (Shipping)</td>
              <td style="padding:4px 0; text-align:right; font-weight:700; color:#2D6A4F;">
                ส่งฟรี
              </td>
            </tr>
            <tr style="border-top:2px solid #FFE3EC;">
              <td style="padding:10px 0 4px; font-size:15px; font-weight:900; color:#354B2D;">ยอดชำระสุทธิ (Total)</td>
              <td style="padding:10px 0 4px; text-align:right; font-size:22px; font-weight:900; color:#D81159;">฿{$grand_total}</td>
            </tr>
          </table>
        </div>

        <div style="margin-top:20px;">
          <a href="https://k1ts4k0n.github.io/NIBBLY/shop/" target="_blank" class="btn-shop">
            🛍️ ช้อปขนมเพื่อสุขภาพเพิ่มเติม ➔
          </a>
          <a href="https://k1ts4k0n.github.io/NIBBLY/" target="_blank" class="btn-home">
            🏡 🌈 กลับสู่หน้าร้านหลัก NIBBLY
          </a>
        </div>

        <div class="footer-bar">
          🍓 {$brand_name} Healthy Treats · ขนมดี เติมวันให้สดใส ☀️
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
            $mail->Subject = "🍓 ขอบคุณสำหรับคำสั่งซื้อ NIBBLY #{$order_id} - ชำระเงินเรียบร้อยแล้ว! 📦✨";
            $mail->Body    = $html_content;
            $mail->AltBody = "ขอบคุณสำหรับคำสั่งซื้อ NIBBLY #{$order_id} ยอดชำระสุทธิ ฿{$grand_total} สินค้าจะถูกจัดส่งไปที่ {$address}";

            foreach ($embedded_images as $emb) {
                if (file_exists($emb['path'])) {
                    $mail->addEmbeddedImage($emb['path'], $emb['cid'], $emb['name']);
                }
            }

            $mail->send();
            $send_status = true;
            $send_message = "ส่งอีเมลสรุปคำสั่งซื้อไปยัง {$email} สำเร็จเรียบร้อยแล้ว!";
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
            'orderId' => $order_id,
            'email' => $email
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// โหมดพรีวิวผ่านเบราว์เซอร์
if ($is_preview) {
    $toolbar = <<<TOOLBAR
    <div style="background:#FFF5EC; padding:12px 20px; font-family:'Prompt',sans-serif; font-size:13px; color:#2D3748; display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #FFD2DC;">
      <div>
        <strong style="color:#D81159;">🍓 พรีวิว Email สรุปคำสั่งซื้อและใบเสร็จ (Task 3)</strong>
        <span style="color:#555; margin-left:14px;">เลขที่: <strong>#{$order_id}</strong> | ส่งถึง: <strong>{$email}</strong></span>
      </div>
      <div>
        <a href="?preview=1&send=1&email={$email}&orderId={$order_id}" style="background:linear-gradient(135deg, #FF6B8B, #FFA07A); color:#FFFFFF; text-decoration:none; padding:7px 18px; border-radius:20px; font-weight:bold; font-size:12px; margin-right:8px; box-shadow:0 3px 8px rgba(255,107,139,0.3);">📧 ทดลองส่งเข้า Gmail จริง</a>
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
