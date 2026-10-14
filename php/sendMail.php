<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
// โหลดไฟล์ class
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';
// ตรวจสอบการส่งข้อมูลผ่าน POST ที่ส่งมาจากฟอร์ม subscribe
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    if ($email) {
        $mail = new PHPMailer(true);
        try {
            // ตั้งค่าภาษาและการเข้ารหัส UTF-8
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';

            // ตั้งค่า SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'atetfitqlpseo123@gmail.com'; // ระบุอีเมลล์ผู้ส่ง
            $mail->Password = 'yuwthzzxvjxmoxda'; // ใช้ app password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            $mail->setFrom('atetfitqlpseo123@gmail.com', '🍓 NIBBLY Healthy Treats'); // ระบุ email ผู้ส่ง (หรือชื่อร้านค้า)
            // อีเมลล์ผู้รับ (รับตัวแปรจากฟอร์ม subscribe)
            $mail->addAddress($email);
            include "emailContent.php";
            $mail->isHTML(true);
            $mail->Subject = '🍓 ยินดีต้อนรับสู่ NIBBLY - ขอบคุณที่สมัครรับข่าวสาร 🌈✨';
            $mail->Body    = $bodyContent;
            $mail->send();
            file_put_contents("subscribers.txt", $email . "\n", FILE_APPEND);
            echo "✔ Subscription สำเร็จ. คุณจะได้รับข้อเสนอพิเศษทางอีเมลล์ : $email.";
        } catch (Exception $e) {
            echo "❌ เกิดข้อผิดพลาด : ไม่สามารถส่งอีเมลล์ถึงคุณได้ : {$mail->ErrorInfo}";
        }
    } else {
        echo "⚠ ไม่มีอีเมลล์นี้";
    }
} else {
    echo "Access Denied.";
}
?>
