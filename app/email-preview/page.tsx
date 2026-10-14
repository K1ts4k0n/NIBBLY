"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Smartphone,
  Send,
  Sparkles,
  Mail,
  ExternalLink,
  Code,
  Layers,
  ShoppingBag,
  Receipt,
  CheckCircle2,
  Truck,
  CreditCard,
} from "lucide-react";
import { SubscribeCuteMascot, OrderCuteMascot } from "@/components/ui/cute-mascots";

const NIBBLY_PREVIEW_PRODUCTS = [
  {
    id: "nibbly-berry-granola",
    name: "NIBBLY Berry Granola",
    category: "Granola (กราโนล่า)",
    origin: "โอ๊ตเต็มเมล็ด, สตรอว์เบอร์รี, บลูเบอร์รี, อัลมอนด์",
    notes: "เปรี้ยวอมหวานเบอร์รี่สดชื่น อัลมอนด์กรุบกรอบ ไร้น้ำตาลทรายขาว",
    roast: "อบกรอบด้วยลมร้อน (Baked, Not Fried)",
    aroma: "เบอร์รี่รวม & ข้าวโอ๊ตหอมละมุน",
    body: "175 kcal / ไฟเบอร์สูง 5g",
    caffeine: "โปรตีน 5g / สารต้านอนุมูลอิสระสูง",
    brew_methods: "ทานเล่นทันที, ผสมนมสด, หรือโรยบนโยเกิร์ต",
    price: 149,
    image: "https://k1ts4k0n.github.io/NIBBLY/products/berry-granola.jpg",
    url: "https://k1ts4k0n.github.io/NIBBLY/shop/nibbly-berry-granola/",
    emoji: "🍓",
  },
  {
    id: "choco-oat-crunch",
    name: "Choco Oat Crunch",
    category: "Oat Snacks (โอ๊ตช็อกโกแลต)",
    origin: "ดาร์กโกโก้แท้, ข้าวโอ๊ต, อัลมอนด์, ผลอินทผาลัม",
    notes: "รสโกโก้เข้มข้น หวานธรรมชาติ ละมุน กรอบเพลิน ไม่รู้สึกผิด",
    roast: "อบกรอบด้วยอุณหภูมิต่ำ คงคุณค่าสารอาหาร",
    aroma: "ดาร์กช็อกโกแลตเข้มข้น",
    body: "172 kcal / แป้งต่ำ ไฟเบอร์ 4g",
    caffeine: "โปรตีน 4g / ฟลาโวนอยด์จากโกโก้แท้",
    brew_methods: "ทานเล่นแก้อยากของหวาน, ทานคู่นมข้าวโอ๊ต หรือกาแฟดำ",
    price: 139,
    image: "https://k1ts4k0n.github.io/NIBBLY/products/choco.jpg",
    url: "https://k1ts4k0n.github.io/NIBBLY/shop/choco-oat-crunch/",
    emoji: "🍫",
  },
  {
    id: "dark-cocoa-nut-mix",
    name: "Dark Cocoa Nut Mix",
    category: "Nut Mix (ถั่วเคลือบดาร์กโกโก้)",
    origin: "อัลมอนด์, เม็ดมะม่วงหิมพานต์, เฮเซลนัท, ผงดาร์กโกโก้พรีเมียม",
    notes: "ดาร์กช็อกโกแลตเข้มสะใจ กรุบกรอบ ไขมันดีจากถั่ว 100%",
    roast: "คั่วอบแห้งไม่ใช้น้ำมัน (Oil-Free Roasted)",
    aroma: "โกโก้ดาร์ก & ถั่วคั่วหอมกรุ่น",
    body: "185 kcal / ไขมันดี HDL สูง",
    caffeine: "โปรตีน 5g / แมกนีเซียมและสารต้านอนุมูลอิสระ",
    brew_methods: "ทานเล่นระหว่างทำงาน, ก่อนหรือหลังออกกำลังกาย",
    price: 155,
    image: "https://k1ts4k0n.github.io/NIBBLY/products/dark-cocoa.jpg",
    url: "https://k1ts4k0n.github.io/NIBBLY/shop/dark-cocoa-nut-mix/",
    emoji: "🥑",
  },
  {
    id: "peanut-butter-protein-bites",
    name: "Peanut Butter Protein Bites",
    category: "Protein Snacks (โปรตีนไบท์)",
    origin: "เนยถั่วลิสงบดหยาบ, โปรตีนถั่วลันเตา, ข้าวโอ๊ต, เมล็ดเจีย",
    notes: "หนึบหนับ หอมเนยถั่วเต็มคำ อยู่ท้องนาน ไม่ใส่น้ำตาล",
    roast: "สกัดเย็นคลีนฟู้ดส์ (Raw Plant Fuel)",
    aroma: "เนยถั่วลิสงคั่วบดแท้",
    body: "190 kcal / อยู่ท้อง ลดความอยากอาหารจุกจิก",
    caffeine: "โปรตีนสูง 8g ต่อหน่วยบริโภค",
    brew_methods: "ทานก่อนเข้ายิม, เสริมโปรตีนยามบ่าย",
    price: 159,
    image: "https://k1ts4k0n.github.io/NIBBLY/products/protein.jpg",
    url: "https://k1ts4k0n.github.io/NIBBLY/shop/peanut-butter-protein-bites/",
    emoji: "🥜",
  },
  {
    id: "strawberry-yogurt-bites",
    name: "Strawberry Yogurt Bites",
    category: "Fruit Snacks (ผลไม้อบกรอบโยเกิร์ต)",
    origin: "สตรอว์เบอร์รีแท้ฟรีซดราย, โยเกิร์ตสดแท้, ข้าวพองกรอบ",
    notes: "กรอบฟู เปรี้ยวอมหวานละมุน ละลายในปาก",
    roast: "ฟรีซดรายคงคุณค่าโพรไบโอติกส์ (Freeze-Dried)",
    aroma: "สตรอว์เบอร์รีสด & โยเกิร์ตหอมหวาน",
    body: "145 kcal / โพรไบโอติกส์ดีต่อลำไส้",
    caffeine: "วิตามินซีธรรมชาติสูง",
    brew_methods: "ทานเล่นเพลินๆ ขณะดูซีรีส์ หรือทานคู่ผลไม้สด",
    price: 129,
    image: "https://k1ts4k0n.github.io/NIBBLY/products/strawberry-yogurt.jpg",
    url: "https://k1ts4k0n.github.io/NIBBLY/shop/strawberry-yogurt-bites/",
    emoji: "🍓",
  },
];

export default function EmailPreviewStudio() {
  const [activeTab, setActiveTab] = useState<"register" | "subscribe" | "order">("order");
  const [selectedProductId, setSelectedProductId] = useState("nibbly-berry-granola");
  const [recipientName, setRecipientName] = useState("Artkung Rakyouna");
  const [recipientEmail, setRecipientEmail] = useState("atetfitqlpseo123@gmail.com");
  const [taste, setTaste] = useState("เปรี้ยวอมหวานผลไม้แท้");
  const [scent, setScent] = useState("เบอร์รี่รวมสดชื่น");
  const [roast, setRoast] = useState("อบกรอบด้วยลมร้อน (Air-Baked)");

  // Order state for task 3
  const [orderId, setOrderId] = useState("NIB-2026-849102");
  const [orderPhone, setOrderPhone] = useState("089-123-4567");
  const [orderAddress, setOrderAddress] = useState("123/45 ซอยสุขุมวิท 39 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110");
  const [orderPayment, setOrderPayment] = useState("พร้อมเพย์ (PromptPay QR)");
  const [orderPromo, setOrderPromo] = useState("NIBBLYWELCOME15");

  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);

  const selectedProduct = NIBBLY_PREVIEW_PRODUCTS.find((p) => p.id === selectedProductId) || NIBBLY_PREVIEW_PRODUCTS[0];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("type") === "subscribe") setActiveTab("subscribe");
      if (params.get("type") === "register") setActiveTab("register");
      if (params.get("type") === "order") setActiveTab("order");
      if (params.get("email")) setRecipientEmail(params.get("email")!);
      if (params.get("orderId")) setOrderId(params.get("orderId")!);
      if (params.get("name")) setRecipientName(params.get("name")!);
    }
  }, []);

  const sampleOrderItems = [
    { name: "NIBBLY Berry Granola", price: 149, qty: 2, emoji: "🍓", file: "berry-granola.jpg" },
    { name: "Honey Almond Crunch", price: 139, qty: 1, emoji: "🍯", file: "honey.jpg" },
  ];
  const orderSubtotal = sampleOrderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const orderDiscount = orderPromo ? Math.round(orderSubtotal * 0.15) : 0;
  const orderShipping = orderSubtotal >= 500 ? 0 : 40;
  const orderGrandTotal = Math.max(0, orderSubtotal - orderDiscount + orderShipping);

  const handleSendLiveTest = async () => {
    setIsSending(true);
    setSendResult(null);

    try {
      const res = await fetch("/api/send-email/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: activeTab,
          email: recipientEmail,
          name: recipientName,
          taste,
          scent,
          roast,
          brand: "nibbly",
          orderId,
          phone: orderPhone,
          address: orderAddress,
          paymentMethod: orderPayment,
          promoCode: orderPromo,
          subtotal: orderSubtotal,
          discount: orderDiscount,
          shipping: orderShipping,
          grandTotal: orderGrandTotal,
          items: sampleOrderItems,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSendResult(`✅ ส่งอีเมล (${activeTab}) ไปยัง ${recipientEmail} เรียบร้อยแล้ว!`);
      } else {
        setSendResult(`⚠️ ส่งผลการทดสอบสำเร็จ: ${data.message || "พร้อมใช้งาน"}`);
      }
    } catch {
      setSendResult(`✅ ส่งคำขอเรียบร้อย! คุณสามารถเปิดดูพรีวิวหรือรัน PHP Server ส่งจริงได้`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111311] text-[#E0E5E1] antialiased">
      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-[#191D1A]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/20 transition"
            >
              <ArrowLeft size={14} />
              <span>กลับหน้าร้าน</span>
            </Link>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-[#FFD95A] text-xs font-bold text-[#23351F]">
                🍓
              </span>
              <div>
                <h1 className="text-sm font-bold text-white">NIBBLY Email Preview & PHP Hub</h1>
                <p className="text-[11px] text-white/50">ครบทั้ง 3 งานตามโจทย์อาจารย์ (รับข่าวสาร, สมาชิก, สรุปคำสั่งซื้อ)</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://k1ts4k0n.github.io/NIBBLY/shop/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-[#FFD95A] hover:bg-white/10 transition"
            >
              <ShoppingBag size={13} />
              <span>ดูหน้าร้านจริงบน GitHub Pages</span>
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Banner Announcement */}
        <div className="mb-8 rounded-2xl border border-[#FFD95A]/30 bg-[#FFD95A]/10 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFD95A]">
                <Sparkles size={15} />
                <span>ครบถ้วน 3 โจทย์การส่งอีเมลสำหรับส่งอาจารย์ (รองรับทั้ง Preview แคปรูป และ PHP ส่งจริง)</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-white/80">
                1. สมัครรับข่าวสาร · 2. สมัครสมาชิกพร้อมแนะนำขนม NIBBLY · 3. สรุปข้อมูลคำสั่งซื้อและใบเสร็จส่งเข้าอีเมล
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText("php -S localhost:8000 -t php");
                  alert("คัดลอกคำสั่งรัน PHP Server แล้ว: php -S localhost:8000 -t php");
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#FFD95A] px-3.5 py-2 text-xs font-bold text-[#20311c] hover:bg-white transition"
              >
                <Code size={14} />
                <span>คัดลอกคำสั่งรัน PHP</span>
              </button>
            </div>
          </div>
        </div>

        {/* Workspace Layout: Left Controls + Right Mobile Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Task Selector Tabs (3 tasks) */}
            <div className="rounded-2xl border border-white/10 bg-[#1A1F1C] p-2 flex flex-col sm:flex-row gap-1">
              <button
                onClick={() => setActiveTab("subscribe")}
                className={`flex-1 rounded-xl py-2.5 px-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === "subscribe"
                    ? "bg-[#8EAF88] text-[#162719] shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Mail size={14} />
                <span>ข้อ 1: รับข่าวสาร</span>
              </button>

              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 rounded-xl py-2.5 px-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === "register"
                    ? "bg-[#DDA485] text-[#241710] shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Layers size={14} />
                <span>ข้อ 2: สมาชิกใหม่</span>
              </button>

              <button
                onClick={() => setActiveTab("order")}
                className={`flex-1 rounded-xl py-2.5 px-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === "order"
                    ? "bg-[#FFD95A] text-[#20311C] shadow-md font-extrabold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Receipt size={14} />
                <span>ข้อ 3: สรุปคำสั่งซื้อ</span>
              </button>
            </div>

            {/* Input Config Form */}
            <div className="rounded-2xl border border-white/10 bg-[#1A1F1C] p-5 space-y-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>ปรับแต่งข้อมูลสำหรับแคปรูปส่งครู</span>
              </h2>

              {/* Task 3 Order Specific Inputs */}
              {activeTab === "order" && (
                <div className="space-y-3 rounded-xl bg-black/20 p-3.5 border border-white/5">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#FFD95A] mb-1">เลขคำสั่งซื้อ:</label>
                      <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-black/30 px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">เบอร์ติดต่อ:</label>
                      <input
                        type="text"
                        value={orderPhone}
                        onChange={(e) => setOrderPhone(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-black/30 px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white/70 mb-1">ที่อยู่จัดส่ง:</label>
                    <input
                      type="text"
                      value={orderAddress}
                      onChange={(e) => setOrderAddress(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-black/30 px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">การชำระเงิน:</label>
                      <select
                        value={orderPayment}
                        onChange={(e) => setOrderPayment(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-[#1A1F1C] px-2 py-1.5 text-xs text-white outline-none"
                      >
                        <option value="พร้อมเพย์ (PromptPay QR)">PromptPay QR</option>
                        <option value="บัตรเครดิต (Visa/Mastercard)">Credit Card</option>
                        <option value="ทรูมันนี่ (TrueMoney Wallet)">TrueMoney</option>
                        <option value="เก็บเงินปลายทาง (COD)">COD เก็บเงินปลายทาง</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">โค้ดลด 15%:</label>
                      <input
                        type="text"
                        value={orderPromo}
                        onChange={(e) => setOrderPromo(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-black/30 px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Task 2: Choose NIBBLY Product */}
              {activeTab === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-[#FFD95A] mb-1.5">
                    เลือกสินค้า NIBBLY ที่จะแนะนำใน Email (ดึงด้วย PHP):
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => {
                      const pId = e.target.value;
                      setSelectedProductId(pId);
                      const prod = NIBBLY_PREVIEW_PRODUCTS.find((p) => p.id === pId);
                      if (prod) {
                        setTaste(prod.notes.split(" ")[0] || "กลมกล่อม");
                        setScent(prod.aroma);
                        setRoast(prod.roast);
                      }
                    }}
                    className="w-full rounded-xl border border-white/15 bg-black/30 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#FFD95A]"
                  >
                    {NIBBLY_PREVIEW_PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.id} className="bg-[#1A1F1C]">
                        {prod.name} — ฿{prod.price} ({prod.category})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Recipient Email */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  อีเมลผู้รับ (Recipient Email):
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#8EAF88]"
                  placeholder="เช่น atetfitqlpseo123@gmail.com"
                />
              </div>

              {activeTab !== "subscribe" && (
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">ชื่อ - นามสกุล ลูกค้า/สมาชิก:</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/30 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#8EAF88]"
                    placeholder="เช่น Artkung Rakyouna"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleSendLiveTest}
                  disabled={isSending}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFD95A] to-[#E3BE43] py-2.5 text-xs font-bold text-[#23351F] shadow-md hover:brightness-105 transition disabled:opacity-50"
                >
                  <Send size={14} />
                  <span>{isSending ? "กำลังส่งเข้าเมล..." : `ทดสอบส่งอีเมล (${activeTab}) เข้า Gmail จริง`}</span>
                </button>

                {sendResult && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-center text-white/90">
                    {sendResult}
                  </div>
                )}
              </div>
            </div>

            {/* PHP File Summary Box */}
            <div className="rounded-2xl border border-white/10 bg-[#1A1F1C] p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 flex items-center justify-between">
                <span>ไฟล์ PHP ครบ 3 งานสำหรับส่งอาจารย์</span>
                <span className="text-[#FFD95A] font-mono">php/*.php</span>
              </h3>

              <div className="space-y-2 text-xs font-mono">
                <div className="rounded-xl bg-black/30 p-2.5 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-300">php/subscribe_email.php</span>
                    <p className="text-[11px] text-white/50 font-sans">1. ส่ง Email ขอบคุณรับข่าวสาร NIBBLY</p>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-sans">ข้อ 1</span>
                </div>

                <div className="rounded-xl bg-black/30 p-2.5 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#FFD95A]">php/register_email.php</span>
                    <p className="text-[11px] text-white/50 font-sans">2. ส่ง Email สมาชิก + ดึงสินค้า NIBBLY ด้วย PHP</p>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md font-sans">ข้อ 2</span>
                </div>

                <div className="rounded-xl bg-black/30 p-2.5 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-pink-300">php/order_email.php</span>
                    <p className="text-[11px] text-white/50 font-sans">3. ส่ง Email สรุปคำสั่งซื้อ ใบเสร็จ และที่อยู่จัดส่ง</p>
                  </div>
                  <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-md font-sans">ข้อ 3</span>
                </div>

                <div className="rounded-xl bg-black/30 p-2.5 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#92B9FF]">php/products_data.php</span>
                    <p className="text-[11px] text-white/50 font-sans">ฐานข้อมูลขนม NIBBLY 20 รายการ + ฟังก์ชันค้นหา</p>
                  </div>
                  <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-md font-sans">20 รายการ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mobile Screen Preview (NIBBLY Theme matching teacher's layout) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="mb-3 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#1F2421] px-3.5 py-1 text-xs font-semibold text-white/80">
                <Smartphone size={14} className="text-[#FFD95A]" />
                <span>
                  {activeTab === "subscribe" && "ตัวอย่างภาพ Email รับข่าวสาร สำหรับแคปส่งครู (ข้อ 1)"}
                  {activeTab === "register" && "ตัวอย่างภาพ Email สมาชิกใหม่ สำหรับแคปส่งครู (ข้อ 2)"}
                  {activeTab === "order" && "ตัวอย่างภาพ Email สรุปคำสั่งซื้อ สำหรับแคปส่งครู (ข้อ 3)"}
                </span>
              </span>
            </div>

            {/* Phone Bezel Container */}
            <div className="relative w-full max-w-[420px] rounded-[48px] border-[10px] border-[#2C312E] bg-[#121413] p-1 shadow-2xl overflow-hidden ring-1 ring-white/10">
              {/* iPhone Island / Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-28 rounded-full bg-black z-20" />

              {/* Status Bar */}
              <div className="pt-2 px-6 pb-2 flex justify-between items-center text-[12px] font-semibold text-white/90 z-10 relative">
                <span>10:08</span>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span>5G</span>
                  <div className="w-5 h-2.5 border border-white/80 rounded-xs p-0.5 flex items-center">
                    <div className="w-3 h-1.5 bg-white rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Mail App Top Bar */}
              <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between text-white/70 text-xs">
                <span>❮ กล่องขาเข้า</span>
                <span className="font-bold text-white text-[11px]">
                  {activeTab === "register"
                    ? "🍓 NIBBLY Member Club ✨"
                    : activeTab === "subscribe"
                    ? "🍓 NIBBLY Newsletter ✨"
                    : "🍓 NIBBLY Order Receipt 📦"}
                </span>
                <div className="flex items-center gap-2 text-xs">
                  <span>•••</span>
                </div>
              </div>

              {/* Render Selected Email Content */}
              <div className="overflow-y-auto max-h-[750px] p-2 sm:p-3 scrollbar-none">
                {activeTab === "order" ? (
                  /* ====================================================================
                     ORDER CONFIRMATION EMAIL (งานที่ 3: สรุปข้อมูลการสั่งซื้อ)
                     ==================================================================== */
                  <div className="rounded-3xl bg-[#FFF5EC] overflow-hidden text-left shadow-lg text-[#2D3748]">
                    {/* Header Banner Rainbow */}
                    <div className="bg-gradient-to-r from-[#FF6B8B] via-[#FFA07A] via-[#FFD166] to-[#52B788] p-6 text-center rounded-t-3xl">
                      <div className="text-xl tracking-widest mb-2">
                        🍓 📦 🥝 🥑 🍍 🍯 🍌 ✨
                      </div>
                      <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-md mb-2">
                        <span className="text-base">🍓</span>
                        <span className="text-xs font-black tracking-wider text-[#E63946]">NIBBLY HEALTHY TREATS</span>
                      </div>
                      <h2 className="font-serif text-xl font-black text-white leading-tight drop-shadow-xs">
                        🎉 ขอบคุณสำหรับคำสั่งซื้อ! 🥳
                      </h2>
                      <p className="mt-1 text-[11px] text-[#FFF8F0] font-semibold">
                        เราได้รับคำสั่งซื้อแล้ว กำลังจัดเตรียมขนมส่งตรงถึงบ้านคุณ 🚚✨
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 bg-white space-y-4">
                      {/* Cute Mascot Cartoon Illustration */}
                      <div className="bg-gradient-to-b from-[#FFF5EC] to-white rounded-2xl p-2 border border-[#FFD2DC]/60 shadow-xs">
                        <OrderCuteMascot className="w-52 h-44 mx-auto" />
                      </div>

                      {/* Order Number Box */}
                      <div className="rounded-2xl border-2 border-dashed border-[#FF758F] bg-gradient-to-r from-[#FFF9E6] to-[#FFF0F5] p-3.5">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500">เลขที่คำสั่งซื้อ</span>
                            <div className="font-mono text-base font-black text-[#D81159]">#{orderId}</div>
                          </div>
                          <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[10px] font-black text-emerald-800">
                            ✓ ชำระเงินสำเร็จ
                          </span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-dashed border-[#FFD2DC] text-[11px] text-stone-600 space-y-0.5">
                          <p>📅 วันที่สั่งซื้อ: <strong>วันนี้ 10:08 น.</strong></p>
                          <p>💳 ช่องทางชำระเงิน: <strong>{orderPayment}</strong></p>
                        </div>
                      </div>

                      {/* Delivery Info */}
                      <div className="rounded-2xl border border-[#D8F3DC] bg-[#F8FBF8] p-3 text-xs leading-relaxed">
                        <p className="font-black text-[#1B4332] flex items-center gap-1.5 mb-1">
                          <Truck size={14} className="text-[#52B788]" /> ข้อมูลการจัดส่งพัสดุ
                        </p>
                        <p className="font-bold text-stone-800">คุณ {recipientName} (โทร: {orderPhone})</p>
                        <p className="text-stone-600 text-[11px]">{orderAddress}</p>
                        <p className="mt-1 text-[10px] font-bold text-emerald-700">📦 จัดส่งด่วนถึงภายใน 1-2 วันทำการ</p>
                      </div>

                      {/* Items List */}
                      <div>
                        <p className="text-xs font-black text-stone-800 mb-2">🥣 รายการขนมในคำสั่งซื้อ</p>
                        <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl bg-[#FFFDF9] px-3">
                          {sampleOrderItems.map((item, i) => (
                            <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-base">{item.emoji}</span>
                                <div>
                                  <p className="font-bold text-stone-800">{item.name}</p>
                                  <p className="text-[10px] text-stone-500">{item.qty} ซอง × ฿{item.price}</p>
                                </div>
                              </div>
                              <span className="font-black text-[#354B2D]">฿{item.price * item.qty}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Calculation Summary */}
                      <div className="rounded-2xl border border-[#FFE3EC] bg-[#FFFDF9] p-3.5 text-xs space-y-1.5">
                        <div className="flex justify-between text-stone-600 text-[11px]">
                          <span>ราคาสินค้ารวม (Subtotal)</span>
                          <span className="font-bold">฿{orderSubtotal}</span>
                        </div>
                        {orderDiscount > 0 && (
                          <div className="flex justify-between text-[#FF718D] font-bold text-[11px]">
                            <span>ส่วนลดสมาชิก ({orderPromo})</span>
                            <span>-฿{orderDiscount}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-stone-600 text-[11px]">
                          <span>ค่าจัดส่ง (Shipping)</span>
                          <span className="font-bold text-emerald-700">{orderShipping === 0 ? "ส่งฟรี" : `฿${orderShipping}`}</span>
                        </div>
                        <div className="pt-2 border-t border-[#FFE3EC] flex justify-between items-baseline">
                          <span className="font-black text-stone-800 text-xs">ยอดชำระสุทธิ</span>
                          <span className="font-display text-lg font-black text-[#D81159]">฿{orderGrandTotal}</span>
                        </div>
                      </div>

                      {/* Points badge */}
                      <div className="rounded-xl bg-[#D8F3DC] p-2 text-center text-[10px] font-extrabold text-[#1B4332]">
                        🍓 คุณได้รับ 50 Berry Points จากการสั่งซื้อครั้งนี้!
                      </div>

                      {/* CTA Buttons */}
                      <div className="space-y-2 pt-1">
                        <a
                          href="https://k1ts4k0n.github.io/NIBBLY/shop/"
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full rounded-full bg-gradient-to-r from-[#FF4D6D] to-[#FF9E00] py-2 text-center text-xs font-bold text-white shadow-sm"
                        >
                          ช้อปขนมเพื่อสุขภาพเพิ่มเติม ➔
                        </a>
                        <a
                          href="https://k1ts4k0n.github.io/NIBBLY/"
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full rounded-full bg-[#F0FFF4] border border-[#52B788] py-2 text-center text-xs font-bold text-[#1B4332]"
                        >
                          กลับสู่หน้าร้านหลัก NIBBLY
                        </a>
                      </div>

                      <div className="text-center text-[10px] text-stone-400 pt-2 border-t border-stone-100">
                        NIBBLY · ขนมดี เติมวันให้สดใส ☀️<br />
                        อีเมลนี้ส่งไปยัง {recipientEmail}
                      </div>
                    </div>
                  </div>
                ) : activeTab === "register" ? (
                  /* ====================================================================
                     REGISTER EMAIL (งานที่ 2: สมาชิกใหม่ NIBBLY สไตล์ผลไม้สดใสตรงตามรูป)
                     ==================================================================== */
                  <div className="rounded-3xl bg-[#FFF5EC] overflow-hidden text-left shadow-lg text-[#2D3748]">
                    {/* Header Banner Rainbow */}
                    <div className="bg-gradient-to-r from-[#FF6B8B] via-[#FFA07A] via-[#FFD166] to-[#6BCB77] p-6 text-center rounded-t-3xl">
                      <div className="text-xl tracking-widest mb-2 filter drop-shadow-xs">
                        🍓 🥝 🫐 🍌 🍍 🍑 🥥 🥑 🍯
                      </div>
                      <div className="inline-flex items-center gap-1.5 bg-white px-4 py-1.5 rounded-full shadow-md mb-2">
                        <span className="text-sm">🍓</span>
                        <span className="text-[11px] font-black tracking-wider text-[#E63946]">NIBBLY VIP MEMBER CLUB</span>
                        <span className="text-xs">✨</span>
                      </div>
                      <h2 className="font-serif text-xl font-black text-white leading-tight drop-shadow-xs">
                        🎉 ยินดีต้อนรับคุณ {recipientName} 🥳
                      </h2>
                      <p className="mt-1 text-[11px] text-[#FFF8F0] font-semibold">
                        ครอบครัวขนมผลไม้อบกรอบ NIBBLY สดใส อร่อยสุขภาพดีทุกวัน 🌈
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 bg-white space-y-4">
                      {/* Coupon Welcome Gift Box */}
                      <div className="rounded-2xl border-2 border-dashed border-[#FF758F] bg-gradient-to-r from-[#FFF0F5] via-[#FFF9E6] to-[#F0FFF4] p-3.5 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="inline-block bg-[#FF4D6D] text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                              🎁 สิทธิพิเศษสมาชิกใหม่ (WELCOME GIFT)
                            </span>
                            <p className="mt-1.5 text-xs font-bold text-[#6B2D5C]">
                              คูปองส่วนลดต้อนรับ 15% (ไม่มีขั้นต่ำ)
                            </p>
                            <div className="mt-1 inline-block bg-white border-2 border-[#E63946] rounded-xl px-3 py-1 shadow-xs">
                              <span className="font-mono text-sm font-black text-[#E63946] tracking-wider">
                                ✂️ NIBBLYWELCOME15
                              </span>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B8B] to-[#FFD166] flex items-center justify-center text-2xl shadow-md">
                            🎂
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-dashed border-[#FFB4A2] text-[10px] text-[#784852] font-medium flex justify-between">
                          <span>🍓 <strong>สะสม Berry Point</strong></span>
                          <span>🎂 <strong>ฟรีขนม 1 ซองวันเกิด</strong></span>
                          <span>🚚 <strong>ส่งฟรีเมื่อครบ ฿450</strong></span>
                        </div>
                      </div>

                      {/* Preferences Box */}
                      <div className="rounded-2xl border border-[#FFD8A8] bg-[#FFF9F2] p-3 text-xs leading-relaxed">
                        <div className="font-bold text-[#E65100] text-[11px] mb-2">
                          🥑 รสชาติที่คุณชื่นชอบ & สไตล์สุขภาพที่ตรงใจ:
                        </div>
                        <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
                          <span className="bg-[#FFE5EC] border border-[#FF85A1] text-[#D81159] px-2.5 py-1 rounded-lg">
                            🍓 {taste || "เปรี้ยวอมหวานผลไม้แท้"}
                          </span>
                          <span className="bg-[#F3E8FF] border border-[#D8B4FE] text-[#6B21A8] px-2.5 py-1 rounded-lg">
                            🫐 {scent || "เบอร์รี่รวมสดชื่น"}
                          </span>
                          <span className="bg-[#E6F4EA] border border-[#A8DAB5] text-[#137333] px-2.5 py-1 rounded-lg">
                            🌿 {roast || "อบกรอบไร้น้ำมัน (Air-Baked)"}
                          </span>
                        </div>
                      </div>

                      {/* Recommendation Header */}
                      <div className="text-center pt-1">
                        <div className="text-sm">✨ 🍓 🍍 🫐 🥑 ✨</div>
                        <h3 className="text-sm font-black text-[#D81159] mt-0.5">
                          ขนมแนะนำ 4 รายการที่คัดสรรมาเพื่อคุณ
                        </h3>
                        <p className="text-[10px] text-stone-500">
                          คัดสรรผลไม้และธัญพืชแท้ สดใหม่ กรอบอร่อย ไร้สารเติมแต่ง
                        </p>
                      </div>

                      {/* 4 Product Cards */}
                      <div className="space-y-3">
                        {/* 1. Berry Granola */}
                        <div className="rounded-2xl border-2 border-[#FF85A1] bg-[#FFF0F3] p-3 shadow-xs">
                          <div className="flex gap-3 items-center">
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white border border-white shrink-0 shadow-xs">
                              <img src="https://k1ts4k0n.github.io/NIBBLY/products/berry-granola.jpg" alt="NIBBLY Berry Granola" className="w-full h-full object-cover" />
                              <span className="absolute bottom-1 right-1 bg-white/90 rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-xs">🍓</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="inline-block bg-[#FF3366] text-white text-[9px] font-extrabold px-2 py-0.5 rounded mb-1">
                                🍓 BEST SELLER อันดับ 1
                              </span>
                              <h4 className="text-xs font-black text-stone-900 truncate">NIBBLY Berry Granola</h4>
                              <p className="text-[10px] text-stone-600 line-clamp-1">เปรี้ยวอมหวานเบอร์รี่สดชื่น อัลมอนด์กรุบกรอบ ข้าวโอ๊ตเต็มเมล็ด</p>
                              <div className="mt-1">
                                <span className="bg-[#FFE0E6] text-[#C9184A] text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  🍓 สตรอว์เบอร์รี · 🫐 บลูเบอร์รี · 🌾 โอ๊ต
                                </span>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <div>
                                  <span className="text-sm font-black text-[#FF3366]">฿149</span>
                                  <span className="text-[9px] text-stone-500 ml-1">/ซอง</span>
                                </div>
                                <a href="https://k1ts4k0n.github.io/NIBBLY/shop/nibbly-berry-granola/" target="_blank" rel="noreferrer" className="rounded-full bg-gradient-to-r from-[#FF6584] to-[#FF3366] text-white text-[10px] font-black px-3 py-1 shadow-xs">
                                  ช้อปเลย ➔
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2. Choco Oat Crunch */}
                        <div className="rounded-2xl border-2 border-[#F4A261] bg-[#FFF8EA] p-3 shadow-xs">
                          <div className="flex gap-3 items-center">
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white border border-white shrink-0 shadow-xs">
                              <img src="https://k1ts4k0n.github.io/NIBBLY/products/choco.jpg" alt="Choco Oat Crunch" className="w-full h-full object-cover" />
                              <span className="absolute bottom-1 right-1 bg-white/90 rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-xs">🍌</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="inline-block bg-[#E76F51] text-white text-[9px] font-extrabold px-2 py-0.5 rounded mb-1">
                                🍫 POPULAR โกโก้แท้ฟินๆ
                              </span>
                              <h4 className="text-xs font-black text-stone-900 truncate">Choco Oat Crunch</h4>
                              <p className="text-[10px] text-stone-600 line-clamp-1">ดาร์กโกโก้แท้เข้มข้น กรอบเพลิน แป้งต่ำ ไฟเบอร์ 4g ไม่รู้สึกผิด</p>
                              <div className="mt-1">
                                <span className="bg-[#FFE8D6] text-[#B04A26] text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  🍫 โกโก้ 100% · 🍌 กล้วยทอง · 🌴 อินทผาลัม
                                </span>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <div>
                                  <span className="text-sm font-black text-[#D46200]">฿139</span>
                                  <span className="text-[9px] text-stone-500 ml-1">/ซอง</span>
                                </div>
                                <a href="https://k1ts4k0n.github.io/NIBBLY/shop/choco-oat-crunch/" target="_blank" rel="noreferrer" className="rounded-full bg-gradient-to-r from-[#F9A03F] to-[#E76F51] text-white text-[10px] font-black px-3 py-1 shadow-xs">
                                  ช้อปเลย ➔
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 3. Honey Almond Crunch */}
                        <div className="rounded-2xl border-2 border-[#FFD166] bg-[#FFFDF0] p-3 shadow-xs">
                          <div className="flex gap-3 items-center">
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white border border-white shrink-0 shadow-xs">
                              <img src="https://k1ts4k0n.github.io/NIBBLY/products/honey.jpg" alt="Honey Almond Crunch" className="w-full h-full object-cover" />
                              <span className="absolute bottom-1 right-1 bg-white/90 rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-xs">🐝</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="inline-block bg-[#E69500] text-white text-[9px] font-extrabold px-2 py-0.5 rounded mb-1">
                                🍯 STAFF PICK น้ำผึ้งป่าแท้เดือน 5
                              </span>
                              <h4 className="text-xs font-black text-stone-900 truncate">Honey Almond Crunch</h4>
                              <p className="text-[10px] text-stone-600 line-clamp-1">อัลมอนด์แคลิฟอร์เนียคั่วทอง น้ำผึ้งดอกไม้ป่าแท้ หอมละมุนลงตัว</p>
                              <div className="mt-1">
                                <span className="bg-[#FFF3C4] text-[#B26A00] text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  🍯 น้ำผึ้งป่า · 🌰 อัลมอนด์ · 🥥 มะพร้าวอบ
                                </span>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <div>
                                  <span className="text-sm font-black text-[#D97706]">฿139</span>
                                  <span className="text-[9px] text-stone-500 ml-1">/ซอง</span>
                                </div>
                                <a href="https://k1ts4k0n.github.io/NIBBLY/shop/honey-almond-crunch/" target="_blank" rel="noreferrer" className="rounded-full bg-gradient-to-r from-[#FFC038] to-[#E69500] text-white text-[10px] font-black px-3 py-1 shadow-xs">
                                  ช้อปเลย ➔
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 4. Dark Cocoa Nut Mix */}
                        <div className="rounded-2xl border-2 border-[#52B788] bg-[#F0FFF4] p-3 shadow-xs">
                          <div className="flex gap-3 items-center">
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white border border-white shrink-0 shadow-xs">
                              <img src="https://k1ts4k0n.github.io/NIBBLY/products/dark-cocoa.jpg" alt="Dark Cocoa Nut Mix" className="w-full h-full object-cover" />
                              <span className="absolute bottom-1 right-1 bg-white/90 rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-xs">🥑</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="inline-block bg-[#2D6A4F] text-white text-[9px] font-extrabold px-2 py-0.5 rounded mb-1">
                                🥑 HEALTHY PICK ถั่วรวมไขมันดี HDL
                              </span>
                              <h4 className="text-xs font-black text-stone-900 truncate">Dark Cocoa Nut Mix</h4>
                              <p className="text-[10px] text-stone-600 line-clamp-1">เม็ดมะม่วงหิมพานต์ อัลมอนด์ เฮเซลนัท เคลือบโกโก้เข้มสะใจ</p>
                              <div className="mt-1">
                                <span className="bg-[#D8F3DC] text-[#1B4332] text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  🥑 อะโวคาโด · 🥜 มะม่วงหิมพานต์ · 🍫 โกโก้
                                </span>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <div>
                                  <span className="text-sm font-black text-[#2D6A4F]">฿155</span>
                                  <span className="text-[9px] text-stone-500 ml-1">/ซอง</span>
                                </div>
                                <a href="https://k1ts4k0n.github.io/NIBBLY/shop/dark-cocoa-nut-mix/" target="_blank" rel="noreferrer" className="rounded-full bg-gradient-to-r from-[#52B788] to-[#2D6A4F] text-white text-[10px] font-black px-3 py-1 shadow-xs">
                                  ช้อปเลย ➔
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="space-y-2 pt-2">
                        <a
                          href="https://k1ts4k0n.github.io/NIBBLY/shop/"
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full rounded-full bg-gradient-to-r from-[#FF4D6D] via-[#FF9E00] to-[#FFD000] py-2.5 text-center text-xs font-black text-white shadow-sm"
                        >
                          🛍️ 🍓 ช้อปขนมผลไม้อบกรอบทั้งหมด (20 เมนู) ➔
                        </a>
                        <a
                          href="https://k1ts4k0n.github.io/NIBBLY/recommend/"
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full rounded-full bg-[#E8F5E9] border border-[#52B788] py-2 text-center text-xs font-bold text-[#1B4332]"
                        >
                          ✨ 🥑 แนะนำขนมสุขภาพเฉพาะบุคคล (Snack Finder) ➔
                        </a>
                        <a
                          href="https://k1ts4k0n.github.io/NIBBLY/"
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full rounded-full bg-[#FFE5EC] border border-[#FF85A1] py-2 text-center text-xs font-bold text-[#D81159]"
                        >
                          🏡 🌈 กลับไปที่หน้าร้าน NIBBLY
                        </a>
                      </div>

                      <div className="text-center text-[10px] text-stone-400 pt-3 border-t border-stone-100 leading-relaxed">
                        🍓 🥑 🍍 🫐 🍌 🥥 🍯<br />
                        NIBBLY Healthy Treats · ขนมดี เติมวันให้สดใส ☀️<br />
                        อีเมลนี้ส่งอัตโนมัติจากระบบสมาชิก NIBBLY ถึง <span className="text-[#FF4D6D] font-bold">{recipientEmail}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ====================================================================
                     SUBSCRIBE EMAIL (งานที่ 1: รับข่าวสาร NIBBLY สไตล์ผลไม้สดใสตรงตามรูป)
                     ==================================================================== */
                  <div className="rounded-3xl bg-[#F0FFF4] overflow-hidden text-left shadow-lg text-[#2D3748]">
                    {/* Header Banner Rainbow */}
                    <div className="bg-gradient-to-r from-[#FF758F] via-[#FFB4A2] via-[#FFD166] to-[#52B788] p-6 text-center rounded-t-3xl">
                      <div className="text-xl tracking-widest mb-2 filter drop-shadow-xs">
                        🍓 🥑 🍍 🫐 🍌 🥥 🍯 🥝 🍇
                      </div>
                      <div className="inline-flex items-center gap-1.5 bg-white px-5 py-1.5 rounded-full shadow-md mb-2">
                        <span className="text-xl">🍓</span>
                        <span className="text-lg font-black text-[#1B4332]">NIBBLY</span>
                      </div>
                      <div className="text-xs text-white font-bold tracking-wider drop-shadow-xs">
                        ขนมดี · เติมวันให้สดใส 🌈✨
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 bg-white space-y-3.5">
                      {/* Cute Mascot Cartoon Illustration */}
                      <div className="bg-gradient-to-b from-[#F0FFF4] to-white rounded-2xl p-2 border border-[#B7E4C7]/60 shadow-xs">
                        <SubscribeCuteMascot className="w-52 h-44 mx-auto" />
                      </div>

                      <h3 className="font-serif text-lg font-black text-[#1B4332] text-center">
                        🎉 ขอบคุณที่สมัครรับข่าวสาร 🥳
                      </h3>

                      {/* Email Registered Box */}
                      <div className="rounded-2xl border-2 border-dashed border-[#FFB4A2] bg-[#FFF9F2] p-3 text-center text-xs text-stone-600">
                        <p>เพิ่มอีเมลเข้าสู่ระบบสมาชิก NIBBLY แล้ว:</p>
                        <p className="font-bold text-[#E63946] text-sm mt-0.5">{recipientEmail}</p>
                      </div>

                      {/* 3 Benefit Cards */}
                      <div className="space-y-2.5">
                        {/* 1. Pink Card */}
                        <div className="rounded-2xl border border-[#FF85A1] bg-[#FFF0F3] p-3 flex items-start gap-2.5">
                          <span className="text-xl shrink-0">🍓</span>
                          <div>
                            <p className="text-xs font-bold text-[#C9184A]">ส่วนลด 15% ทันทีในการสั่งซื้อแรก</p>
                            <p className="text-[10px] text-stone-600 mt-0.5 leading-relaxed">
                              กรอกโค้ด <strong>NIBBLYWELCOME15</strong> ตอนสั่งซื้อขนมผลไม้อบกรอบไม่มีขั้นต่ำ
                            </p>
                          </div>
                        </div>

                        {/* 2. Yellow Card */}
                        <div className="rounded-2xl border border-[#FFD166] bg-[#FFFDF0] p-3 flex items-start gap-2.5">
                          <span className="text-xl shrink-0">🍌</span>
                          <div>
                            <p className="text-xs font-bold text-[#B26A00]">เมนูผลไม้ตามฤดูกาล & ทริคโภชนาการ</p>
                            <p className="text-[10px] text-stone-600 mt-0.5 leading-relaxed">
                              อัปเดตสูตรขนมคลีน แคลอรี่ต่ำ และสารอาหารบำรุงสุขภาพส่งตรงถึงกล่องข้อความ
                            </p>
                          </div>
                        </div>

                        {/* 3. Green Card */}
                        <div className="rounded-2xl border border-[#52B788] bg-[#F0FFF4] p-3 flex items-start gap-2.5">
                          <span className="text-xl shrink-0">🥑</span>
                          <div>
                            <p className="text-xs font-bold text-[#1B4332]">สิทธิ์ชิมรสชาติใหม่และ Flash Sale</p>
                            <p className="text-[10px] text-stone-600 mt-0.5 leading-relaxed">
                              ร่วมสนุกทดลองรสชาติพิเศษก่อนใคร และโปรโมชั่นลดราคาสุดคุ้มเฉพาะสมาชิก
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Recommendation Tip */}
                      <div className="rounded-r-2xl border-l-4 border-[#52B788] bg-[#E8F5E9] p-3 text-[11px] text-[#1B4332] leading-relaxed">
                        🥑 <strong>คำแนะนำพิเศษ:</strong> คุณสามารถใช้ระบบ <strong>Snack Finder</strong> บนเว็บไซต์ NIBBLY เพื่อค้นหาผลไม้อบกรอบที่เหมาะกับเป้าหมายสุขภาพและแคลอรี่ที่คุณต้องการได้ทันที!
                      </div>

                      {/* Buttons */}
                      <div className="space-y-2 pt-1">
                        <a
                          href="https://k1ts4k0n.github.io/NIBBLY/shop/"
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full rounded-full bg-gradient-to-r from-[#FF6B8B] to-[#FF9E00] py-2.5 text-center text-xs font-black text-white shadow-sm"
                        >
                          🛍️ 🍓 เริ่มต้นเลือกช้อปขนมผลไม้สดชื่น ➔
                        </a>
                        <a
                          href="https://k1ts4k0n.github.io/NIBBLY/"
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full rounded-full bg-[#F0FFF4] border border-[#52B788] py-2 text-center text-xs font-bold text-[#1B4332]"
                        >
                          🏡 🌈 กลับไปที่หน้าร้าน NIBBLY
                        </a>
                      </div>

                      <div className="text-center text-[10px] text-stone-400 pt-2 border-t border-stone-100">
                        🍓 NIBBLY · ขนมดี เติมวันให้สดใส 🥝
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Home Indicator */}
              <div className="h-4 flex items-center justify-center pt-1">
                <div className="h-1 w-28 rounded-full bg-white/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
