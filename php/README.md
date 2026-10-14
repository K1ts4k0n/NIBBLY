# เอกสารประกอบการส่งงาน: ระบบส่ง Email ด้วย PHPMailer & Gmail SMTP

ระบบนี้พัฒนาขึ้นเพื่อส่งงานอาจารย์ตามหัวข้อและใบงาน LAB ที่กำหนด:
1. **ไฟล์หลักตามใบงาน LAB (อธิบายใน LAB):**
   - [`sendMail.php`](file:///Users/artkung/Documents/NIBBLY/php/sendMail.php) โครงสร้างโค้ดตามไฟล์ตัวอย่างใน LAB 41 บรรทัด
   - [`emailContent.php`](file:///Users/artkung/Documents/NIBBLY/php/emailContent.php) แยกเนื้อหาอีเมล (บรรทัดที่ 25) พร้อมแนบรูปสินค้าแนะนำด้วย CID
   - [`subscribe.html`](file:///Users/artkung/Documents/NIBBLY/php/subscribe.html) แบบฟอร์ม HTML ส่ง POST เข้า `sendMail.php`
2. **ส่ง Content รูปภาพสำหรับส่ง Email หลังจากลูกค้า Subscribe เพื่อรับข่าวสาร** (ไฟล์ `subscribe_email.php`)
3. **ส่ง Content รูปภาพสำหรับส่ง Email หลังจากลูกค้า สมัครสมาชิก** (ไฟล์ `register_email.php`)
4. **ส่ง Content รูปภาพสำหรับส่ง Email สรุปคำสั่งซื้อสินค้า** (ไฟล์ `order_email.php`)
5. **การส่งไฟล์ .php** (ทั้งโฟลเดอร์ `php/`)

---

## 📋 ตารางตรวจสอบความสอดคล้องกับข้อกำหนดในใบงาน LAB

| ข้อกำหนดอาจารย์ | สิ่งที่ทำในระบบ | ตำแหน่งในโค้ด |
| :--- | :--- | :--- |
| **1. สร้างไฟล์ `emailContent.php` ในบรรทัดที่ 25** | สร้างไฟล์ [`php/emailContent.php`](file:///Users/artkung/Documents/NIBBLY/php/emailContent.php) กำหนดตัวแปร `$bodyContent` | `sendMail.php` บรรทัด 25: `include "emailContent.php";` |
| **2. แนบรูปสินค้าแนะนำสำหรับลูกค้าใหม่** | แนบรูปด้วย `$mail->addEmbeddedImage()` และแสดงผ่าน `<img src="cid:product_poster">` | `emailContent.php` ส่วนต้น และในแท็ก `<img>` |
| **3. กำหนดชื่อผู้ส่งเป็นชื่อร้านค้า** | ตั้งชื่อผู้ส่งเป็น `🍓 NIBBLY Healthy Treats` | `sendMail.php` บรรทัด 22: `$mail->setFrom(..., '🍓 NIBBLY Healthy Treats');` |
| **4. กำหนดชื่อข้อความหลัก (Subject)** | ตั้งชื่อหัวข้อให้น่ารัก ชัดเจน และดึงดูดใจ | `sendMail.php` บรรทัด 27: `$mail->Subject = '...';` |
| **5. บันทึกลง `subscribers.txt`** | บันทึกอีเมลที่สมัครสมาชิกต่อท้ายไฟล์ | `sendMail.php` บรรทัด 30: `file_put_contents("subscribers.txt", $email . "\n", FILE_APPEND);` |

---

## 📁 โครงสร้างไฟล์ในโฟลเดอร์ `php/`

| ไฟล์ | หน้าที่การทำงาน |
| :--- | :--- |
| [`sendMail.php`](file:///Users/artkung/Documents/NIBBLY/php/sendMail.php) | **⭐ ไฟล์หลักตาม LAB:** ตรวจสอบ POST, ตั้งค่า SMTP, แนบไฟล์, ส่งอีเมล, และบันทึกลง `subscribers.txt` |
| [`emailContent.php`](file:///Users/artkung/Documents/NIBBLY/php/emailContent.php) | **⭐ เนื้อหาอีเมลตามข้อกำหนด 1 & 2:** แนบรูปโปสเตอร์แนะนำสินค้าด้วย CID และจัดรูปแบบ HTML |
| [`subscribe.html`](file:///Users/artkung/Documents/NIBBLY/php/subscribe.html) | **⭐ ฟอร์มทดสอบ:** หน้าเว็บกรอกอีเมลแล้วส่ง POST ไปยัง `sendMail.php` |
| `images/poster.jpg` | รูปภาพสินค้าแนะนำสำหรับส่งแนบในอีเมล |
| `subscribers.txt` | ไฟล์ข้อความบันทึกอีเมลที่สมัครรับข่าวสารสำเร็จ |
| [`config.php`](file:///Users/artkung/Documents/NIBBLY/php/config.php) | รวมการตั้งค่า Gmail SMTP และฟังก์ชันตัวช่วยของระบบ |
| [`products_data.php`](file:///Users/artkung/Documents/NIBBLY/php/products_data.php) | คลังข้อมูลสินค้า 20 รายการ และฟังก์ชัน PHP ดึงสินค้าแนะนำ |
| [`subscribe_email.php`](file:///Users/artkung/Documents/NIBBLY/php/subscribe_email.php) | สคริปต์ส่ง Email ขอบคุณรับข่าวสาร (งานข้อ 1) พร้อมโหมดพรีวิว |
| [`register_email.php`](file:///Users/artkung/Documents/NIBBLY/php/register_email.php) | สคริปต์ส่ง Email ต้อนรับสมาชิกใหม่ + สินค้าแนะนำ 4 รายการ (งานข้อ 2) |
| [`order_email.php`](file:///Users/artkung/Documents/NIBBLY/php/order_email.php) | สคริปต์ส่ง Email สรุปคำสั่งซื้อและใบเสร็จ (งานข้อ 3) |
| [`index.php`](file:///Users/artkung/Documents/NIBBLY/php/index.php) | หน้าแดชบอร์ดหลักสำหรับทดสอบและตรวจงานอาจารย์ |
| `PHPMailer/src/` | ไลบรารี PHPMailer (Exception.php, PHPMailer.php, SMTP.php) รองรับทั้ง `require 'PHPMailer/src/...'` |

---

## 🚀 วิธีการทดสอบและรันระบบ

### วิธีที่ 1: รันฟอร์มทดสอบผ่านเว็บเซิร์ฟเวอร์ (XAMPP / Apache / PHP CLI)
หากเปิดบน XAMPP หรือรัน:
```bash
php -S localhost:8000 -t php
```
เปิดบราวเซอร์ไปที่:
- หน้าแบบฟอร์มส่งข้อมูล: **`http://localhost:8000/subscribe.html`**
- หน้าแดชบอร์ดสรุปงานทั้งหมด: **`http://localhost:8000/index.php`**

### วิธีที่ 2: ดูหน้า Content รูปภาพผ่านเว็บ Next.js (สำหรับแคปรูปส่งครู)
- เปิดเว็บไซต์ที่: **`http://localhost:3001/email-preview`**
- เลือกระหว่าง:
  - **ข้อ 1: รับข่าวสาร**
  - **ข้อ 2: สมาชิกใหม่**
  - **ข้อ 3: สรุปคำสั่งซื้อ**
- แคปรูปหน้าจอเพื่อส่งอาจารย์ได้ทันที
