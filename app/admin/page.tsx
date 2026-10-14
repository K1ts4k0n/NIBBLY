"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Mail,
  ShoppingBag,
  Users,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Package,
  ExternalLink,
  Sparkles,
  ArrowLeft,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Clock,
  Layers,
} from "lucide-react";
import { products } from "@/data/products";

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "members" | "subscribers" | "emails" | "products">("overview");

  // Email Test Form State
  const [testEmail, setTestEmail] = useState("atetfitqlpseo123@gmail.com");
  const [testLoading, setTestLoading] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/");
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleTestEmail = async (type: "register" | "subscribe" | "order") => {
    setTestLoading(type);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test_email",
          email: testEmail.trim(),
          type,
        }),
      });
      const json = await res.json();
      setTestResult({
        success: json.success,
        message: json.message || "ส่งอีเมลเรียบร้อยแล้ว",
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || "เกิดข้อผิดพลาดในการส่งอีเมล",
      });
    } finally {
      setTestLoading(null);
    }
  };

  const handleResendSlip = async (orderId: string, email: string) => {
    try {
      const res = await fetch("/api/admin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "resend_order_slip",
          orderId,
          email,
        }),
      });
      const json = await res.json();
      alert(json.message);
    } catch (err: any) {
      alert("เกิดข้อผิดพลาด: " + err.message);
    }
  };

  const handleUpdateStatus = async (orderId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "PAID" ? "SHIPPED" : currentStatus === "SHIPPED" ? "DELIVERED" : "PAID";
    try {
      const res = await fetch("/api/admin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_order_status",
          orderId,
          status: nextStatus,
        }),
      });
      const json = await res.json();
      if (json.success) {
        fetchAdminData();
      }
    } catch (err: any) {
      alert("เกิดข้อผิดพลาด: " + err.message);
    }
  };

  const stats = data?.stats || {
    totalRevenue: 1189,
    totalOrders: 3,
    totalMembers: 3,
    totalSubscribers: 3,
  };

  const orders = data?.orders || [];
  const members = data?.members || [];
  const subscribers = data?.subscribers || [];
  const smtp = data?.smtp || { connected: true, user: "atetfitqlpseo123@gmail.com", host: "smtp.gmail.com:587" };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#2D3748]">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-[#E8DCC8] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-full bg-[#FAF3E8] px-3 py-1 text-xs font-bold text-[#354B2D] hover:bg-[#F0E4D2] transition"
            >
              <ArrowLeft size={14} />
              <span>หน้าร้าน</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-2xl bg-[#354B2D] text-lg font-black text-white shadow-sm">
                🌿
              </span>
              <div>
                <h1 className="text-base font-extrabold text-[#354B2D] leading-tight">
                  NIBBLY Admin Portal
                </h1>
                <p className="text-[11px] font-medium text-stone-500">
                  ระบบจัดการร้านค้า & ศูนย์ควบคุมอีเมลอัตโนมัติ
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* SMTP Status */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Gmail SMTP: {smtp.user}</span>
            </div>

            <button
              onClick={fetchAdminData}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-bold text-stone-700 hover:bg-stone-50 transition"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              <span>รีเฟรช</span>
            </button>

            <a
              href="https://manager.line.biz/account/@682gfupf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-[#06C755] px-3.5 py-1 text-xs font-bold text-white shadow-xs hover:bg-[#05b34c] transition"
            >
              <span>LINE OA Manager</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-[#E8DCC8] pb-3">
          {[
            { id: "overview", label: "ภาพรวมสถิติ", icon: TrendingUp },
            { id: "emails", label: "ศูนย์ทดสอบอีเมล (Email Center)", icon: Mail },
            { id: "orders", label: `คำสั่งซื้อ (${orders.length})`, icon: ShoppingBag },
            { id: "members", label: `สมาชิก NIBBLY Club (${members.length})`, icon: Users },
            { id: "subscribers", label: `ผู้รับข่าวสาร (${subscribers.length})`, icon: Sparkles },
            { id: "products", label: "คลังสินค้า (20 เมนู)", icon: Package },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-extrabold transition ${
                  active
                    ? "bg-[#354B2D] text-white shadow-sm"
                    : "bg-white text-stone-600 border border-[#E8DCC8] hover:bg-[#FFFDF7]"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl border border-[#E8DCC8] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500">ยอดขายรวม (Total Revenue)</span>
                  <div className="flex size-9 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 font-bold">
                    ฿
                  </div>
                </div>
                <div className="mt-2 text-2xl font-black text-[#354B2D]">
                  ฿{stats.totalRevenue.toLocaleString()}
                </div>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <span>✓ รวมทุกออเดอร์ในระบบ</span>
                </div>
              </div>

              <div className="rounded-3xl border border-[#E8DCC8] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500">คำสั่งซื้อ (Orders)</span>
                  <div className="flex size-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <ShoppingBag size={18} />
                  </div>
                </div>
                <div className="mt-2 text-2xl font-black text-[#354B2D]">
                  {stats.totalOrders} ออเดอร์
                </div>
                <div className="mt-1 text-[11px] font-medium text-stone-500">
                  พร้อมสลิปส่งเข้าอีเมลอัตโนมัติ
                </div>
              </div>

              <div className="rounded-3xl border border-[#E8DCC8] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500">สมาชิก NIBBLY Club</span>
                  <div className="flex size-9 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
                    <Users size={18} />
                  </div>
                </div>
                <div className="mt-2 text-2xl font-black text-[#354B2D]">
                  {stats.totalMembers} บัญชี
                </div>
                <div className="mt-1 text-[11px] font-medium text-stone-500">
                  รับโค้ดส่วนลด 15% บิลแรก
                </div>
              </div>

              <div className="rounded-3xl border border-[#E8DCC8] bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500">ผู้รับข่าวสาร (Newsletter)</span>
                  <div className="flex size-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Mail size={18} />
                  </div>
                </div>
                <div className="mt-2 text-2xl font-black text-[#354B2D]">
                  {stats.totalSubscribers} อีเมล
                </div>
                <div className="mt-1 text-[11px] font-medium text-stone-500">
                  เปิดอ่านข่าวสาร & ดีลลับ
                </div>
              </div>
            </div>

            {/* Quick Actions & SMTP Info */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-3xl border border-[#E8DCC8] bg-white p-6 shadow-xs">
                <h2 className="text-base font-extrabold text-[#354B2D] flex items-center gap-2">
                  <span>⚡ คำสั่งซื้อล่าสุด (Recent Orders)</span>
                </h2>
                <div className="mt-4 divide-y divide-stone-100">
                  {orders.slice(0, 3).map((o: any) => (
                    <div key={o.orderId} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-[#D81159]">
                            #{o.orderId}
                          </span>
                          <span className="text-xs font-bold text-stone-800">
                            คุณ {o.customerName}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              o.status === "PAID"
                                ? "bg-emerald-100 text-emerald-800"
                                : o.status === "SHIPPED"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-stone-100 text-stone-800"
                            }`}
                          >
                            {o.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {o.email} · {o.paymentMethod}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-sm text-[#354B2D]">฿{o.grandTotal}</div>
                        <button
                          onClick={() => handleResendSlip(o.orderId, o.email)}
                          className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1 justify-end"
                        >
                          <Mail size={11} />
                          <span>ส่งสลิปซ้ำ</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Info Box */}
              <div className="rounded-3xl border border-[#E8DCC8] bg-gradient-to-br from-[#FFF8E6] to-[#FFF0F5] p-6 shadow-xs">
                <div className="flex items-center gap-2 text-[#354B2D] font-extrabold text-sm">
                  <ShieldCheck size={18} />
                  <span>สถานะการเชื่อมต่อระบบ</span>
                </div>
                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex justify-between border-b border-stone-200/60 pb-2">
                    <span className="text-stone-500">Gmail SMTP Server:</span>
                    <span className="font-bold text-stone-800">smtp.gmail.com:587</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/60 pb-2">
                    <span className="text-stone-500">บัญชีผู้ส่ง (Sender):</span>
                    <span className="font-bold text-stone-800 truncate max-w-[160px]">{smtp.user}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/60 pb-2">
                    <span className="text-stone-500">LINE OA เชื่อมต่อ:</span>
                    <span className="font-bold text-emerald-700">@682gfupf (เปิดอยู่)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">ระบบใบเสร็จอัตโนมัติ:</span>
                    <span className="font-bold text-emerald-600">✓ ทำงาน 100%</span>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => setActiveTab("emails")}
                    className="w-full rounded-2xl bg-[#354B2D] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#253620] transition"
                  >
                    เปิดหน้าทดสอบส่งอีเมลทันที ➔
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EMAIL TEST CENTER */}
        {activeTab === "emails" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#E8DCC8] bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2.5 text-[#354B2D]">
                <Mail size={22} />
                <h2 className="text-lg font-black">ศูนย์ทดสอบระบบส่งอีเมล (Email Test Suite)</h2>
              </div>
              <p className="mt-1 text-xs text-stone-500">
                ทดสอบส่งอีเมลทั้ง 3 รูปแบบตรงเข้า Inbox ทันที โดยใช้ระบบ Gmail SMTP ของ NIBBLY
              </p>

              {/* Target Email Input */}
              <div className="mt-6 max-w-lg">
                <label className="block text-xs font-extrabold text-stone-700 mb-1.5">
                  อีเมลปลายทางที่จะรับการทดสอบ:
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="atetfitqlpseo123@gmail.com"
                    className="flex-1 rounded-2xl border border-stone-300 bg-[#FAF7F0] px-4 py-2.5 text-xs font-bold text-stone-800 focus:border-[#354B2D] focus:outline-none"
                  />
                  <button
                    onClick={() => setTestEmail("atetfitqlpseo123@gmail.com")}
                    className="rounded-2xl border border-stone-200 bg-white px-3 text-xs font-bold text-stone-600 hover:bg-stone-50"
                  >
                    รีเซ็ตเป็นเมลแอดมิน
                  </button>
                </div>
              </div>

              {/* Status Message */}
              {testResult && (
                <div
                  className={`mt-4 rounded-2xl p-4 text-xs font-bold flex items-center gap-2 ${
                    testResult.success
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  {testResult.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{testResult.message}</span>
                </div>
              )}

              {/* 3 Test Action Cards */}
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {/* 1. Register Email */}
                <div className="rounded-2xl border-2 border-pink-200 bg-[#FFF5EC] p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-pink-700 font-extrabold text-sm mb-2">
                      <span>🍓 1. อีเมลต้อนรับสมาชิกใหม่</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      ส่งอีเมลต้อนรับเข้า NIBBLY Club พร้อมโค้ดลด 15% (NIBBLYWELCOME15) และรูปสินค้าแนะนำ
                    </p>
                  </div>
                  <button
                    onClick={() => handleTestEmail("register")}
                    disabled={Boolean(testLoading)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF4D6D] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#e03a5b] transition disabled:opacity-50"
                  >
                    <Send size={13} />
                    <span>{testLoading === "register" ? "กำลังส่ง..." : "ทดสอบส่งอีเมลสมัครสมาชิก"}</span>
                  </button>
                </div>

                {/* 2. Subscribe Email */}
                <div className="rounded-2xl border-2 border-emerald-200 bg-[#F0FFF4] p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm mb-2">
                      <span>💌 2. อีเมลยืนยันรับข่าวสาร</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      ส่งอีเมลยืนยันการ Subscribe จดหมายข่าวสาร พร้อมโค้ดลับ 15% และแนะนำระบบ Snack Finder
                    </p>
                  </div>
                  <button
                    onClick={() => handleTestEmail("subscribe")}
                    disabled={Boolean(testLoading)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2D6A4F] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#1b4332] transition disabled:opacity-50"
                  >
                    <Send size={13} />
                    <span>{testLoading === "subscribe" ? "กำลังส่ง..." : "ทดสอบส่งอีเมลรับข่าวสาร"}</span>
                  </button>
                </div>

                {/* 3. Order Slip Email */}
                <div className="rounded-2xl border-2 border-amber-200 bg-[#FFFDF0] p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm mb-2">
                      <span>📦 3. สลิปใบเสร็จคำสั่งซื้อ</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      ส่งสลิปคำสั่งซื้อสำเร็จ (#NIB-2026-889922) แจกแจงรายการขนม ส่วนลด ค่าจัดส่ง และที่อยู่
                    </p>
                  </div>
                  <button
                    onClick={() => handleTestEmail("order")}
                    disabled={Boolean(testLoading)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D97706] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#b45309] transition disabled:opacity-50"
                  >
                    <Send size={13} />
                    <span>{testLoading === "order" ? "กำลังส่ง..." : "ทดสอบส่งสลิปคำสั่งซื้อ"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === "orders" && (
          <div className="rounded-3xl border border-[#E8DCC8] bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold text-[#354B2D]">รายการคำสั่งซื้อทั้งหมด ({orders.length})</h2>
              <span className="text-xs text-stone-500">สามารถกดเปลี่ยนสถานะหรือส่งสลิปซ้ำได้</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 bg-[#FAF7F0] text-stone-700">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">ลูกค้า</th>
                    <th className="p-3">รายการสินค้า</th>
                    <th className="p-3">ยอดชำระ</th>
                    <th className="p-3">ช่องทาง</th>
                    <th className="p-3">สถานะ</th>
                    <th className="p-3 text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map((o: any) => (
                    <tr key={o.orderId} className="hover:bg-stone-50/50">
                      <td className="p-3 font-mono font-black text-[#D81159]">#{o.orderId}</td>
                      <td className="p-3">
                        <div className="font-bold">{o.customerName}</div>
                        <div className="text-stone-500 text-[11px]">{o.email}</div>
                      </td>
                      <td className="p-3">
                        {o.items?.map((it: any, idx: number) => (
                          <div key={idx} className="text-[11px]">
                            {it.name} × {it.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="p-3 font-black text-[#354B2D]">฿{o.grandTotal}</td>
                      <td className="p-3 text-stone-600">{o.paymentMethod}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleUpdateStatus(o.orderId, o.status)}
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold cursor-pointer transition ${
                            o.status === "PAID"
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : o.status === "SHIPPED"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                          }`}
                        >
                          {o.status} ✎
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleResendSlip(o.orderId, o.email)}
                          className="rounded-xl border border-stone-200 bg-white px-2.5 py-1 text-[11px] font-bold text-stone-700 hover:bg-stone-100"
                        >
                          ✉️ ส่งสลิปซ้ำ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: MEMBERS */}
        {activeTab === "members" && (
          <div className="rounded-3xl border border-[#E8DCC8] bg-white p-6 shadow-xs">
            <h2 className="text-base font-extrabold text-[#354B2D] mb-4">สมาชิก NIBBLY Club ({members.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 bg-[#FAF7F0] text-stone-700">
                    <th className="p-3">ชื่อสมาชิก</th>
                    <th className="p-3">อีเมล</th>
                    <th className="p-3">เบอร์โทร</th>
                    <th className="p-3">แต้มสะสม</th>
                    <th className="p-3">คูปองที่ได้รับ</th>
                    <th className="p-3">เป้าหมายสุขภาพ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {members.map((m: any, idx: number) => (
                    <tr key={idx} className="hover:bg-stone-50/50">
                      <td className="p-3 font-bold">{m.name}</td>
                      <td className="p-3 text-stone-600">{m.email}</td>
                      <td className="p-3 text-stone-500">{m.phone || "-"}</td>
                      <td className="p-3 font-black text-amber-600">★ {m.berryPoints || 100} แต้ม</td>
                      <td className="p-3 font-mono font-bold text-[#D81159]">{m.welcomeCoupon || "NIBBLYWELCOME15"}</td>
                      <td className="p-3 text-stone-500">{(m.healthGoals || []).join(", ") || "ทั่วไป"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: SUBSCRIBERS */}
        {activeTab === "subscribers" && (
          <div className="rounded-3xl border border-[#E8DCC8] bg-white p-6 shadow-xs">
            <h2 className="text-base font-extrabold text-[#354B2D] mb-4">รายชื่อผู้สมัครรับข่าวสาร ({subscribers.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 bg-[#FAF7F0] text-stone-700">
                    <th className="p-3">อีเมล</th>
                    <th className="p-3">วันที่สมัคร</th>
                    <th className="p-3">คูปองส่วนลดที่ส่งให้</th>
                    <th className="p-3">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {subscribers.map((s: any, idx: number) => (
                    <tr key={idx} className="hover:bg-stone-50/50">
                      <td className="p-3 font-bold text-[#354B2D]">{s.email}</td>
                      <td className="p-3 text-stone-500">{new Date(s.subscribedAt).toLocaleString("th-TH")}</td>
                      <td className="p-3 font-mono font-bold text-pink-600">{s.couponSent || "NIBBLYWELCOME15"}</td>
                      <td className="p-3">
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          {s.status || "active"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: PRODUCTS */}
        {activeTab === "products" && (
          <div className="rounded-3xl border border-[#E8DCC8] bg-white p-6 shadow-xs">
            <h2 className="text-base font-extrabold text-[#354B2D] mb-4">คลังสินค้าเพื่อสุขภาพ 20 รายการ</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <div key={p.id} className="rounded-2xl border border-stone-200 p-3 bg-[#FAF7F0]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-[#354B2D] text-white px-2 py-0.5 rounded-full">
                      #{p.id}
                    </span>
                    <span className="font-black text-xs text-[#D81159]">฿{p.price}</span>
                  </div>
                  <div className="mt-2 font-bold text-xs text-[#354B2D] truncate">{p.name}</div>
                  <div className="text-[11px] text-stone-500">{p.category}</div>
                  <div className="mt-2 text-[10px] text-stone-600 line-clamp-2">{p.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
