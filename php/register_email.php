<?php
/**
 * สคริปต์ส่ง Email ต้อนรับสมาชิกใหม่ NIBBLY สไตล์น่ารักสดใส ผลไม้หลากสี (register_email.php)
 * ตกแต่งพิเศษด้วยอิโมจิผลไม้สดใส 🍓 🫐 🥑 🍌 🍍 🍯 🍫 🥥 🥝 พร้อมสินค้าแนะนำ 4 ตัวจากร้านจริง
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/products_data.php';

// รับค่าจาก POST, JSON หรือ GET
$input_json = json_decode(file_get_contents('php://input'), true);

$name = $_POST['name'] ?? $input_json['name'] ?? $_GET['name'] ?? 'Artkung Rakyouna';
$email = $_POST['email'] ?? $input_json['email'] ?? $_GET['email'] ?? 'atetfitqlpseo123@gmail.com';
$taste = $_POST['taste'] ?? $input_json['taste'] ?? $_GET['taste'] ?? 'เปรี้ยวอมหวานผลไม้แท้';
$scent = $_POST['scent'] ?? $input_json['scent'] ?? $_GET['scent'] ?? 'เบอร์รี่รวมสดชื่น';
$roast = $_POST['roast'] ?? $input_json['roast'] ?? $_GET['roast'] ?? 'อบกรอบด้วยลมร้อน (Air-Baked)';

$is_preview = isset($_GET['preview']) || (!isset($_POST['send']) && !isset($input_json['send']) && !isset($_GET['send']));
$do_send = isset($_POST['send']) || (isset($input_json['send']) && $input_json['send']) || (isset($_GET['send']) && $_GET['send'] == '1');

// ดึงข้อมูลสินค้าแนะนำ 4 ตัว
$top_products = fetchTop4NibblyRecommendations($taste, $scent, $roast);

// สีสันและอิโมจิผลไม้สดใสสำหรับสินค้าแต่ละตัว (ธีมพาสเทลผลไม้สดชื่น)
$fruit_decorations = [
    0 => [
        'emoji' => '🍓',
        'badge' => '🍓 BEST SELLER อันดับ 1',
        'badge_bg' => '#FF3366',
        'badge_color' => '#FFFFFF',
        'card_border' => '#FF85A1',
        'card_bg' => '#FFF0F3',
        'btn_bg' => 'linear-gradient(135deg, #FF6584 0%, #FF3366 100%)',
        'btn_color' => '#FFFFFF',
        'tag_color' => '#C9184A',
        'tag_bg' => '#FFE0E6',
        'price_color' => '#FF3366',
        'fruit_chips' => '🍓 สตรอว์เบอร์รี · 🫐 บลูเบอร์รี · 🌾 โอ๊ต'
    ],
    1 => [
        'emoji' => '🍌',
        'badge' => '🍫 POPULAR โกโก้แท้ฟินๆ',
        'badge_bg' => '#E76F51',
        'badge_color' => '#FFFFFF',
        'card_border' => '#F4A261',
        'card_bg' => '#FFF8EA',
        'btn_bg' => 'linear-gradient(135deg, #F9A03F 0%, #E76F51 100%)',
        'btn_color' => '#FFFFFF',
        'tag_color' => '#B04A26',
        'tag_bg' => '#FFE8D6',
        'price_color' => '#D46200',
        'fruit_chips' => '🍫 โกโก้ 100% · 🍌 กล้วยทอง · 🌴 อินทผาลัม'
    ],
    2 => [
        'emoji' => '🐝',
        'badge' => '🍯 STAFF PICK น้ำผึ้งป่าแท้เดือน 5',
        'badge_bg' => '#E69500',
        'badge_color' => '#FFFFFF',
        'card_border' => '#FFD166',
        'card_bg' => '#FFFDF0',
        'btn_bg' => 'linear-gradient(135deg, #FFC038 0%, #E69500 100%)',
        'btn_color' => '#FFFFFF',
        'tag_color' => '#B26A00',
        'tag_bg' => '#FFF3C4',
        'price_color' => '#D97706',
        'fruit_chips' => '🍯 น้ำผึ้งป่า · 🌰 อัลมอนด์ · 🥥 มะพร้าวอบ'
    ],
    3 => [
        'emoji' => '🥑',
        'badge' => '🥑 HEALTHY PICK ถั่วรวมไขมันดี HDL',
        'badge_bg' => '#2D6A4F',
        'badge_color' => '#FFFFFF',
        'card_border' => '#52B788',
        'card_bg' => '#F0FFF4',
        'btn_bg' => 'linear-gradient(135deg, #52B788 0%, #2D6A4F 100%)',
        'btn_color' => '#FFFFFF',
        'tag_color' => '#1B4332',
        'tag_bg' => '#D8F3DC',
        'price_color' => '#2D6A4F',
        'fruit_chips' => '🥑 อะโวคาโด · 🥜 มะม่วงหิมพานต์ · 🍫 โกโก้'
    ]
];

$products_html = '';
foreach ($top_products as $idx => $prod) {
    $cid_name = "prod_img_" . ($idx + 1);
    $img_tag = $do_send ? "cid:{$cid_name}" : $prod['image'];
    $dec = $fruit_decorations[$idx % 4];

    $products_html .= <<<ITEM
    <div style="background:{$dec['card_bg']}; border:2px solid {$dec['card_border']}; border-radius:22px; padding:16px; margin-bottom:18px; text-align:left; box-shadow:0 6px 18px rgba(0,0,0,0.04);">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="125" valign="top" style="padding-right:14px;">
            <div style="position:relative; width:125px; height:125px; border-radius:16px; overflow:hidden; background:#F5F5F5; border:2px solid #FFFFFF; box-shadow:0 4px 10px rgba(0,0,0,0.08);">
              <img src="{$img_tag}" alt="{$prod['name']}" style="width:125px; height:125px; object-fit:cover; display:block; border-radius:14px;" />
              <div style="position:absolute; bottom:5px; right:5px; background:rgba(255,255,255,0.95); font-size:15px; border-radius:50%; width:26px; height:26px; text-align:center; line-height:26px; box-shadow:0 2px 6px rgba(0,0,0,0.15);">
                {$dec['emoji']}
              </div>
            </div>
          </td>
          <td valign="top">
            <span style="display:inline-block; background:{$dec['badge_bg']}; color:{$dec['badge_color']}; font-size:10px; font-weight:800; padding:3.5px 9px; border-radius:6px; margin-bottom:5px; letter-spacing:0.3px;">
              {$dec['badge']}
            </span>
            <h3 style="margin:0 0 3px; font-size:16px; font-weight:800; color:#1A202C; line-height:1.3;">
              {$prod['name']}
            </h3>
            <p style="margin:0 0 6px; font-size:11.5px; color:#4A5568; line-height:1.4;">
              {$prod['notes']}
            </p>
            <div style="margin-bottom:8px;">
              <span style="display:inline-block; background:{$dec['tag_bg']}; color:{$dec['tag_color']}; font-size:10.5px; font-weight:700; padding:3px 8px; border-radius:6px;">
                {$dec['fruit_chips']}
              </span>
            </div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="font-size:19px; font-weight:900; color:{$dec['price_color']};">฿{$prod['price']}</span>
                  <span style="font-size:11px; color:#718096; margin-left:3px;">/ซอง</span>
                </td>
                <td align="right">
                  <a href="{$prod['url']}" target="_blank" style="display:inline-block; background:{$dec['btn_bg']}; color:{$dec['btn_color']}; font-size:11.5px; font-weight:800; padding:7px 16px; border-radius:20px; text-decoration:none; box-shadow:0 3px 8px rgba(0,0,0,0.12);">
                    ช้อปเลย ➔
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
ITEM;
}

$html_content = <<<HTML
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🍓 ยินดีต้อนรับคุณ {$name} - NIBBLY Healthy Treats</title>
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
  </style>
</head>
<body style="margin:0; padding:0; background-color:#FFF5EC;">
  <div style="width:100%; background-color:#FFF5EC; padding:28px 0 50px;">
    <div style="max-width:530px; margin:0 auto; background-color:#FFFFFF; border-radius:36px; overflow:hidden; box-shadow:0 20px 55px rgba(255,112,137,0.18); border:2px solid #FFE3EC;">
      
      <!-- เฮดเดอร์แฟนซีผลไม้สดใส -->
      <div style="background: linear-gradient(135deg, #FF6B8B 0%, #FFA07A 35%, #FFD166 70%, #6BCB77 100%); padding:38px 24px 30px; text-align:center; position:relative;">
        <div style="font-size:26px; letter-spacing:8px; margin-bottom:12px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));">
          🍓 🥝 🫐 🍌 🍍 🍑 🥥 🥑 🍯
        </div>

        <div style="display:inline-flex; align-items:center; gap:8px; background:#FFFFFF; padding:6px 20px; border-radius:30px; margin-bottom:14px; box-shadow:0 4px 14px rgba(230,57,70,0.2);">
          <span style="font-size:18px;">🍓</span>
          <span style="font-size:12.5px; font-weight:900; color:#E63946; letter-spacing:0.8px;">NIBBLY VIP MEMBER CLUB</span>
          <span style="font-size:15px;">✨</span>
        </div>

        <h1 style="margin:0 0 6px; font-size:26px; font-weight:900; color:#FFFFFF; line-height:1.3; text-shadow:0 2px 6px rgba(0,0,0,0.2);">
          🎉 ยินดีต้อนรับคุณ {$name} 🥳
        </h1>
        <p style="margin:0; font-size:13.5px; color:#FFF8F0; font-weight:600; line-height:1.6; text-shadow:0 1px 3px rgba(0,0,0,0.15);">
          ครอบครัวขนมผลไม้อบกรอบ NIBBLY สดใส อร่อยสุขภาพดีทุกวัน 🌈
        </p>
      </div>

      <div style="padding:28px 22px;">

        <!-- ดิจิทัลเมมเบอร์การ์ด ลายพาสเทลผลไม้สดใส -->
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

        <!-- รสชาติและความสนใจของคุณ ตกแต่งด้วยผลไม้ -->
        <div style="background:#FFF9F2; border:1.5px solid #FFD8A8; border-radius:20px; padding:16px 18px; margin-bottom:26px; text-align:left;">
          <div style="font-size:13px; font-weight:800; color:#E65100; margin-bottom:8px;">
            🥑 รสชาติที่คุณชื่นชอบ & สไตล์สุขภาพที่ตรงใจ:
          </div>
          <table width="100%" cellpadding="0" cellspacing="4" style="font-size:11.5px;">
            <tr>
              <td style="background:#FFE5EC; border:1px solid #FF85A1; border-radius:10px; padding:8px 10px; color:#D81159; font-weight:700;">
                🍓 <strong>รสชาติ:</strong> {$taste}
              </td>
              <td style="background:#F3E8FF; border:1px solid #D8B4FE; border-radius:10px; padding:8px 10px; color:#6B21A8; font-weight:700;">
                🫐 <strong>กลิ่น:</strong> {$scent}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="background:#E6F4EA; border:1px solid #A8DAB5; border-radius:10px; padding:8px 10px; color:#137333; font-weight:700;">
                🌿 <strong>กรรมวิธี:</strong> {$roast} (ไร้น้ำมัน หวานธรรมชาติ แคลต่ำ)
              </td>
            </tr>
          </table>
        </div>

        <!-- หัวข้อสินค้าแนะนำ 4 ตัวจากเว็บ NIBBLY -->
        <div style="text-align:center; margin-bottom:22px;">
          <div style="font-size:20px; margin-bottom:4px;">✨ 🍓 🍍 🫐 🥑 ✨</div>
          <h2 style="margin:2px 0 6px; font-size:22px; font-weight:900; color:#D81159; letter-spacing:0.3px;">
            ขนมแนะนำ 4 รายการที่คัดสรรมาเพื่อคุณ
          </h2>
          <p style="margin:0; font-size:12.5px; color:#718096;">
            คัดสรรผลไม้และธัญพืชแท้ สดใหม่ กรอบอร่อย ไร้สารเติมแต่ง
          </p>
        </div>

        <!-- รายการสินค้าแนะนำ 4 ตัว -->
        {$products_html}

        <!-- ปุ่มกด Action สีสันสดใส น่ารัก ชวนกด -->
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

        <!-- ท้ายอีเมลน่ารักสดใส -->
        <div style="text-align:center; font-size:11px; color:#8E9AA0; margin-top:30px; border-top:1.5px solid #F0F2F5; padding-top:20px; line-height:1.7;">
          <div style="font-size:20px; margin-bottom:6px;">🍓 🥑 🍍 🫐 🍌 🥥 🍯</div>
          <p style="margin:0 0 4px; font-weight:800; color:#4A5568; font-size:12px;">
            NIBBLY Healthy Treats · ขนมดี เติมวันให้สดใส ☀️
          </p>
          <p style="margin:0;">อีเมลนี้ส่งอัตโนมัติจากระบบสมาชิกของร้าน NIBBLY ถึง <span style="color:#FF4D6D; font-weight:700;">{$email}</span></p>
        </div>

      </div>
    </div>
  </div>
</body>
</html>
HTML;

// ==============================================================================
// ส่งอีเมลจริงด้วย PHPMailer (Gmail SMTP) พร้อมฝังรูปภาพ 4 สินค้า (CID Embedding)
// ==============================================================================
$send_status = false;
$send_message = '';

if ($do_send) {
    $mail = getPHPMailer();
    if ($mail) {
        try {
            $mail->addAddress($email, $name);

            // ฝังรูปสินค้าทั้ง 4 ตัวเป็น CID Attachment เพื่อให้ Gmail แสดงภาพทันที 100%
            foreach ($top_products as $idx => $prod) {
                $cid_name = "prod_img_" . ($idx + 1);
                $local_filename = $prod['local_file'] ?? ($prod['id'] . '.jpg');
                $local_path = __DIR__ . '/../public/products/' . $local_filename;

                if (file_exists($local_path)) {
                    $mail->addEmbeddedImage($local_path, $cid_name, $local_filename);
                }
            }

            $mail->Subject = "🍓 ยินดีต้อนรับคุณ {$name} - แนะนำ 4 ขนมสุขภาพผลไม้สดใสจาก NIBBLY ✨";
            $mail->Body    = $html_content;
            $mail->AltBody = "ยินดีต้อนรับคุณ {$name}! สมัครสมาชิก NIBBLY สำเร็จ รับส่วนลด 15%: NIBBLYWELCOME15";

            $mail->send();
            $send_status = true;
            $send_message = "ส่งอีเมลต้อนรับสดใสพร้อม 4 สินค้าแนะนำไปยัง {$email} สำเร็จเรียบร้อยแล้ว!";
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
            'products' => $top_products,
            'recipient' => $email
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// แสดงหน้าพรีวิวในเบราว์เซอร์
if ($is_preview) {
    $toolbar = <<<TOOLBAR
    <div style="background:#FFF9F2; padding:12px 20px; font-family:'Prompt',sans-serif; font-size:13px; color:#2D3748; display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #FFD8A8;">
      <div>
        <strong style="color:#D81159;">🍓 พรีวิว Email สมาชิกใหม่ สดใสหลากสี (สินค้าแนะนำ 4 ตัว)</strong>
        <span style="color:#718096; margin-left:14px;">ผู้รับ: <strong>{$name}</strong> ({$email})</span>
      </div>
      <div>
        <a href="?preview=1&send=1&name={$name}&email={$email}" style="background:linear-gradient(135deg, #FF6B8B, #FFA07A); color:#FFFFFF; text-decoration:none; padding:7px 18px; border-radius:20px; font-weight:bold; font-size:12px; margin-right:8px; box-shadow:0 3px 8px rgba(255,107,139,0.3);">📧 ส่งเข้า Gmail จริง</a>
        <a href="index.php" style="background:#E2E8F0; color:#2D3748; text-decoration:none; padding:7px 16px; border-radius:20px; font-size:12px;">← หน้าหลัก</a>
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
