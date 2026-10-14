import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { buildOrderSlipEmail } from "@/lib/email-order-slip";

function getGmailCredentials() {
  try {
    const configPath = path.join(process.cwd(), "php/config.php");
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, "utf-8");
      const userMatch = content.match(/define\('GMAIL_USERNAME',.*?['"]([^'"]+)['"]\);/);
      const passMatch = content.match(/define\('GMAIL_APP_PASSWORD',.*?['"]([^'"]+)['"]\);/);

      return {
        user: userMatch ? userMatch[1] : "atetfitqlpseo123@gmail.com",
        pass: passMatch ? passMatch[1].replace(/\s+/g, "") : "yuwthzzxvjxmoxda",
      };
    }
  } catch {
    // fallback
  }
  return {
    user: process.env.GMAIL_USERNAME || "atetfitqlpseo123@gmail.com",
    pass: (process.env.GMAIL_APP_PASSWORD || "yuwthzzxvjxmoxda").replace(/\s+/g, ""),
  };
}

function readJsonFile(filename: string, fallback: any = []) {
  try {
    const filePath = path.join(process.cwd(), "data", filename);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
  }
  return fallback;
}

function writeJsonFile(filename: string, data: any) {
  try {
    const filePath = path.join(process.cwd(), "data", filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

export async function GET() {
  try {
    const orders = readJsonFile("orders.json", []);
    const members = readJsonFile("members.json", []);
    const subscribers = readJsonFile("subscribers.json", []);

    const totalRevenue = orders.reduce((sum: number, o: any) => sum + (o.grandTotal || 0), 0);

    const creds = getGmailCredentials();
    let smtpConnected = false;
    let smtpError = "";

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: creds.user,
          pass: creds.pass,
        },
      });
      await transporter.verify();
      smtpConnected = true;
    } catch (e: any) {
      smtpError = e.message || "Connection failed";
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders: orders.length,
        totalMembers: members.length,
        totalSubscribers: subscribers.length,
      },
      smtp: {
        connected: smtpConnected,
        host: "smtp.gmail.com:587 (TLS)",
        user: creds.user,
        error: smtpError,
      },
      orders,
      members,
      subscribers,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;
    const creds = getGmailCredentials();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: creds.user,
        pass: creds.pass,
      },
    });

    if (action === "test_email") {
      const targetEmail = body.email || creds.user;
      const type = body.type || "register"; // "register" | "subscribe" | "order"

      if (type === "register") {
        await transporter.sendMail({
          from: `"NIBBLY Healthy Treats" <${creds.user}>`,
          to: targetEmail,
          subject: "🍓 [Admin Test] ยินดีต้อนรับสู่ NIBBLY Club! รับสิทธิ์ส่วนลด 15% 🎁",
          html: `
            <div style="font-family:'Prompt',sans-serif; padding:20px; background:#FFF5EC; border-radius:20px;">
              <h2 style="color:#D81159;">🍓 ยินดีต้อนรับสู่ NIBBLY Club!</h2>
              <p>สวัสดีครับคุณ <b>Artkung Rakyouna</b> ขอบคุณที่สมัครสมาชิกกับเรา</p>
              <div style="background:#FFFFFF; border:2px dashed #FF758F; padding:15px; border-radius:15px; text-align:center;">
                <span style="font-size:12px; color:#666;">โค้ดส่วนลดต้อนรับสมาชิกใหม่ 15%:</span><br>
                <b style="font-size:24px; color:#E63946; letter-spacing:2px;">NIBBLYWELCOME15</b>
              </div>
              <p style="font-size:12px; color:#888; margin-top:15px;">ทดสอบส่งตรงจาก NIBBLY Admin Dashboard สู่ ${targetEmail}</p>
            </div>
          `,
        });
      } else if (type === "subscribe") {
        await transporter.sendMail({
          from: `"NIBBLY Healthy Treats" <${creds.user}>`,
          to: targetEmail,
          subject: "💌 [Admin Test] ขอบคุณที่สมัครรับข่าวสารจาก NIBBLY Healthy Treats 🌈✨",
          html: `
            <div style="font-family:'Prompt',sans-serif; padding:20px; background:#F0FFF4; border-radius:20px;">
              <h2 style="color:#1B4332;">🎉 ขอบคุณที่สมัครรับข่าวสาร NIBBLY</h2>
              <p>เราได้เพิ่มอีเมล <b>${targetEmail}</b> เข้าสู่ระบบรับข่าวสารโปรโมชั่นเรียบร้อยแล้ว!</p>
              <div style="background:#FFFFFF; border:2px dashed #52B788; padding:15px; border-radius:15px; text-align:center;">
                <span style="font-size:12px; color:#666;">โค้ดลับช้อปขนมคลีนลด 15%:</span><br>
                <b style="font-size:24px; color:#2D6A4F; letter-spacing:2px;">NIBBLYWELCOME15</b>
              </div>
              <p style="font-size:12px; color:#888; margin-top:15px;">ทดสอบส่งตรงจาก NIBBLY Admin Dashboard สู่ ${targetEmail}</p>
            </div>
          `,
        });
      } else if (type === "order") {
        const orderSlipData = buildOrderSlipEmail({
          orderId: "NIB-2026-889922",
          customerName: "Artkung Rakyouna",
          email: targetEmail,
          phone: "089-987-6543",
          address: "128/9 ซอยสุขุมวิท 23 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110",
          paymentMethod: "พร้อมเพย์ (PromptPay QR)",
          promoCode: "NIBBLYWELCOME15",
          subtotal: 437,
          discount: 66,
          shipping: 0,
          grandTotal: 371,
          status: "PAID",
          isAdminTest: true,
          items: [
            { name: "NIBBLY Berry Granola", price: 149, quantity: 2, emoji: "🍓", art: "berry-granola" },
            { name: "Choco Oat Crunch", price: 139, quantity: 1, emoji: "🍫", art: "choco" },
          ],
        });

        await transporter.sendMail({
          from: `"NIBBLY Healthy Treats" <${creds.user}>`,
          to: targetEmail,
          subject: orderSlipData.subject,
          html: orderSlipData.html,
          attachments: orderSlipData.attachments,
        });
      }

      return NextResponse.json({
        success: true,
        message: `ส่งอีเมลทดสอบประเภท "${type}" ไปยัง ${targetEmail} สำเร็จเรียบร้อยแล้ว!`,
      });
    }

    if (action === "update_order_status") {
      const { orderId, status } = body;
      const orders = readJsonFile("orders.json", []);
      const order = orders.find((o: any) => o.orderId === orderId);
      if (order) {
        order.status = status;
        writeJsonFile("orders.json", orders);
        return NextResponse.json({ success: true, message: `อัปเดตสถานะออเดอร์ #${orderId} เป็น ${status} สำเร็จ!` });
      }
      return NextResponse.json({ success: false, message: "ไม่พบคำสั่งซื้อ" }, { status: 404 });
    }

    if (action === "resend_order_slip") {
      const { orderId, email } = body;
      const orders = readJsonFile("orders.json", []);
      const order = orders.find((o: any) => o.orderId === orderId);
      if (!order) {
        return NextResponse.json({ success: false, message: "ไม่พบคำสั่งซื้อ" }, { status: 404 });
      }

      const targetEmail = email || order.email || creds.user;
      const orderSlipData = buildOrderSlipEmail({
        orderId: order.orderId,
        customerName: order.customerName,
        email: targetEmail,
        phone: order.phone,
        address: order.address,
        paymentMethod: order.paymentMethod,
        promoCode: order.promoCode,
        subtotal: order.subtotal,
        discount: order.discount,
        shipping: order.shipping,
        grandTotal: order.grandTotal,
        status: order.status,
        isResend: true,
        items: order.items || [],
      });

      await transporter.sendMail({
        from: `"NIBBLY Healthy Treats" <${creds.user}>`,
        to: targetEmail,
        subject: orderSlipData.subject,
        html: orderSlipData.html,
        attachments: orderSlipData.attachments,
      });

      return NextResponse.json({
        success: true,
        message: `ส่งสลิปซ้ำสำหรับคำสั่งซื้อ #${orderId} ไปยัง ${targetEmail} เรียบร้อยแล้ว!`,
      });
    }

    return NextResponse.json({ success: false, message: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Failed to process admin action" }, { status: 500 });
  }
}
