<?php
/**
 * ไฟล์กำหนดค่าระบบและการเชื่อมต่อ PHPMailer ด้วย Gmail SMTP (config.php)
 */

// โหลดไฟล์ PHPMailer แบบ Standalone (ไม่ต้องพึ่งพา Composer)
require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// ==============================================================================
// 1. ตั้งค่า Gmail SMTP (กรอกอีเมล Gmail และ รหัสผ่านแอป 16 หลัก)
// ==============================================================================
// * วิธีสร้าง App Password ของ Gmail:
//   1) ไปที่ Google Account -> ความปลอดภัย (Security)
//   2) เปิดการยืนยันแบบ 2 ขั้นตอน (2-Step Verification)
//   3) ค้นหา "รหัสผ่านสำหรับแอป" (App Passwords)
//   4) สร้างรหัสผ่านใหม่ แล้วนำรหัส 16 ตัวอักษรมาใส่ใน GMAIL_APP_PASSWORD ด้านล่าง
// ==============================================================================

define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587); // 587 สำหรับ TLS, 465 สำหรับ SSL
define('SMTP_ENCRYPTION', PHPMailer::ENCRYPTION_STARTTLS);

// กรอกข้อมูล Gmail ของคุณที่นี่ หรือแก้ไขผ่านหน้า Dashboard (index.php)
define('GMAIL_USERNAME', getenv('GMAIL_USERNAME') ?: 'atetfitqlpseo123@gmail.com');
define('GMAIL_APP_PASSWORD', getenv('GMAIL_APP_PASSWORD') ?: 'yuwt hzzx vjxm oxda');

// ข้อมูลผู้ส่ง (Sender Info)
define('MAIL_FROM_EMAIL', GMAIL_USERNAME);
define('MAIL_FROM_NAME', 'NIBBLY Healthy Treats');

// เว็บไซต์ URL ของคุณ
define('SITE_URL', 'https://k1ts4k0n.github.io/NIBBLY');

/**
 * ฟังก์ชันสร้างและตั้งค่าอินสแตนซ์ของ PHPMailer
 * 
 * @param bool $debug เปิดดู log การเชื่อมต่อ SMTP หรือไม่
 * @return PHPMailer
 */
function getPHPMailer($debug = false) {
    $mail = new PHPMailer(true);

    try {
        // การเข้ารหัสภาษาไทย UTF-8
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        // ใช้งาน SMTP
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = GMAIL_USERNAME;
        $mail->Password   = str_replace(' ', '', GMAIL_APP_PASSWORD); // ตัดวรรคออกอัตโนมัติ
        $mail->SMTPSecure = SMTP_ENCRYPTION;
        $mail->Port       = SMTP_PORT;

        // ระดับการดีบั๊ก
        if ($debug) {
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        } else {
            $mail->SMTPDebug = SMTP::DEBUG_OFF;
        }

        // ผู้ส่งเริ่มต้น
        $mail->setFrom(GMAIL_USERNAME, MAIL_FROM_NAME);
        $mail->isHTML(true);

        return $mail;
    } catch (Exception $e) {
        error_log("PHPMailer Setup Error: " . $e->getMessage());
        return null;
    }
}
