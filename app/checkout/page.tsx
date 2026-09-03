"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  Gift,
  HelpCircle,
  MapPin,
  Minus,
  Package,
  Plus,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Truck,
  User,
  Wallet,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/providers/cart-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { ProductArt } from "@/components/ui/product-art";

interface PromoCodeDef {
  code: string;
  type: "percent" | "fixed" | "freeship";
  value: number;
  labelTh: string;
  labelEn: string;
}

const AVAILABLE_PROMOS: PromoCodeDef[] = [
  {
    code: "NIBBLYWELCOME15",
    type: "percent",
    value: 15,
    labelTh: "ลด 15% สมาชิกใหม่ NIBBLY",
    labelEn: "15% Off New Member Welcome",
  },
  {
    code: "NIBBLY50",
    type: "fixed",
    value: 50,
    labelTh: "ลดทันที ฿50",
    labelEn: "฿50 Instant Discount",
  },
  {
    code: "FREESHIP",
    type: "freeship",
    value: 40,
    labelTh: "ส่งฟรี ไม่มีขั้นต่ำ",
    labelEn: "Free Shipping No Minimum",
  },
  {
    code: "HEALTHY20",
    type: "percent",
    value: 20,
    labelTh: "ลด 20% สแน็กสุขภาพดี",
    labelEn: "20% Off Healthy Snack Lover",
  },
];

export default function CheckoutPage() {
  const { items, change, remove, total, clear } = useCart();
  const { user, isLoggedIn } = useAuth();
  const { lang } = useLanguage();

  // Customer Form State
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("กรุงเทพมหานคร");
  const [postalCode, setPostalCode] = useState("10110");
  const [notes, setNotes] = useState("");

  // Shipping & Payment Options
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"promptpay" | "card" | "cod" | "truemoney">("promptpay");

  // Promo Code State
  const [promoInput, setPromoInput] = useState(user?.welcomeCoupon || "NIBBLYWELCOME15");
  const [appliedPromo, setAppliedPromo] = useState<PromoCodeDef | null>(
    user?.welcomeCoupon ? AVAILABLE_PROMOS[0] : null
  );
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState(
    user?.welcomeCoupon ? "ใช้โค้ดส่วนลด 15% เรียบร้อยแล้ว!" : ""
  );

  // Order Placement State
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState<{
    orderId: string;
    items: typeof items;
    subtotal: number;
    discountAmount: number;
    shippingFee: number;
    grandTotal: number;
    promoCode?: string;
    customer: {
      name: string;
      phone: string;
      email: string;
      address: string;
      province: string;
      postalCode: string;
    };
    paymentMethod: string;
    date: string;
  } | null>(null);

  // Quick Demo Autofill Address
  const handleAutofillDemo = () => {
    setName(user?.name || "น้องแฮปปี้ สแน็กเกอร์");
    setPhone(user?.phone || "089-123-4567");
    setEmail(user?.email || "happy.snacker@nibbly.com");
    setAddress("123/45 อาคารสุขุมวิทการ์เดนท์ ซอยสุขุมวิท 39 แขวงคลองตันเหนือ เขตวัฒนา");
    setProvince("กรุงเทพมหานคร");
    setPostalCode("10110");
    setNotes("ฝากไว้ที่ล็อบบี้คอนโดได้เลยครับ/ค่ะ");
  };

  // Promo Code Apply Logic
  const handleApplyPromo = (codeToApply?: string) => {
    const code = (codeToApply || promoInput).trim().toUpperCase();
    setPromoError("");
    setPromoSuccess("");

    if (!code) {
      setPromoError(lang === "th" ? "กรุณากรอกโค้ดส่วนลด" : "Please enter a promo code");
      return;
    }

    const found = AVAILABLE_PROMOS.find((p) => p.code.toUpperCase() === code);
    if (found) {
      setAppliedPromo(found);
      setPromoInput(found.code);
      setPromoSuccess(
        lang === "th"
          ? `ใช้โค้ด ${found.code} สำเร็จ! (${found.labelTh})`
          : `Promo code ${found.code} applied! (${found.labelEn})`
      );
    } else {
      setPromoError(
        lang === "th"
          ? "ไม่พบโค้ดส่วนลดนี้ หรือโค้ดหมดอายุแล้ว"
          : "Invalid or expired promo code"
      );
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoSuccess("");
    setPromoError("");
  };

  // Calculations
  const subtotal = total;

  // Base Shipping calculation: Free if subtotal >= 500, else 40
  let baseShippingFee = subtotal >= 500 ? 0 : 40;
  if (shippingMethod === "express") {
    baseShippingFee += 35; // Express add-on
  }

  // Discount Calculation
  let discountAmount = 0;
  let shippingFee = baseShippingFee;

  if (appliedPromo) {
    if (appliedPromo.type === "percent") {
      discountAmount = Math.round((subtotal * appliedPromo.value) / 100);
    } else if (appliedPromo.type === "fixed") {
      discountAmount = Math.min(appliedPromo.value, subtotal);
    } else if (appliedPromo.type === "freeship") {
      shippingFee = 0;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  // Submit Order (Simulated Instant Payment)
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert(
        lang === "th"
          ? "กรุณากรอกข้อมูลชื่อ เบอร์โทรศัพท์ และที่อยู่จัดส่งให้ครบถ้วน"
          : "Please fill in your name, phone number, and delivery address"
      );
      return;
    }

    setIsProcessing(true);

    // Simulate instant secure payment processing
    setTimeout(() => {
      const orderId = "NIB-" + new Date().getFullYear() + "-" + Math.floor(100000 + Math.random() * 900000);
      const orderData = {
        orderId,
        items: [...items],
        subtotal,
        discountAmount,
        shippingFee,
        grandTotal,
        promoCode: appliedPromo?.code,
        customer: {
          name,
          phone,
          email,
          address,
          province,
          postalCode,
        },
        paymentMethod,
        date: new Date().toLocaleDateString(lang === "th" ? "th-TH" : "en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setCompletedOrderData(orderData);
      setIsProcessing(false);
      setOrderCompleted(true);
      clear(); // Clear the cart
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);
  };

  // If order is completed, show the Success Screen
  if (orderCompleted && completedOrderData) {
    return (
      <main className="min-h-screen bg-[#F1E5CD] px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="overflow-hidden rounded-[38px] border-2 border-emerald-400/80 bg-[#FFFDF8] p-6 shadow-2xl sm:p-10"
          >
            {/* Top Success Celebration Badge */}
            <div className="text-center">
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                <Check size={40} strokeWidth={3} />
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1 text-xs font-bold text-emerald-800">
                <Sparkles size={14} />
                <span>{lang === "th" ? "ชำระเงินและสั่งซื้อสำเร็จ!" : "Payment & Order Successful!"}</span>
              </div>

              <h1 className="mt-3 font-display text-3xl font-extrabold text-[#354B2D] sm:text-4xl">
                {lang === "th" ? "ขอบคุณสำหรับคำสั่งซื้อแสนอร่อย!" : "Thank You For Your Order!"}
              </h1>

              <p className="mx-auto mt-2 max-w-md text-sm text-stone-600">
                {lang === "th"
                  ? "เราได้รับคำสั่งซื้อของคุณเรียบร้อยแล้ว กำลังจัดเตรียมกล่องขนมสดใหม่ส่งตรงถึงบ้านคุณ"
                  : "We have received your order and are packing your wholesome healthy snacks with love."}
              </p>
            </div>

            {/* Order Reference Pill */}
            <div className="mt-8 flex flex-wrap items-center justify-between rounded-2xl border border-[#d8c79e] bg-[#FFF9E9] p-4 text-xs">
              <div>
                <span className="text-stone-500">{lang === "th" ? "เลขที่คำสั่งซื้อ:" : "Order ID:"}</span>
                <span className="ml-2 font-mono font-bold text-[#354B2D]">{completedOrderData.orderId}</span>
              </div>
              <div>
                <span className="text-stone-500">{lang === "th" ? "วันที่:" : "Date:"}</span>
                <span className="ml-2 font-semibold text-stone-700">{completedOrderData.date}</span>
              </div>
              <div className="mt-2 w-full border-t border-stone-200/60 pt-2 sm:mt-0 sm:w-auto sm:border-0 sm:pt-0">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-bold text-emerald-700">
                  <CheckCircle2 size={13} /> {lang === "th" ? "ชำระเงินเรียบร้อย" : "Paid"}
                </span>
              </div>
            </div>

            {/* Order Items List */}
            <div className="mt-6 space-y-3">
              <h3 className="font-display text-lg font-bold text-[#354B2D]">
                {lang === "th" ? "รายการขนมที่สั่งซื้อ" : "Ordered Items"}
              </h3>
              <div className="divide-y divide-stone-100 rounded-2xl border border-stone-200 bg-white p-4">
                {completedOrderData.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <ProductArt variant={item.art} image={item.image} alt={item.name} className="size-12 rounded-xl" />
                      <div>
                        <p className="text-xs font-bold text-[#354B2D] sm:text-sm">{item.name}</p>
                        <p className="text-[11px] text-stone-500">
                          {item.quantity} x ฿{item.price}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#354B2D]">฿{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50/80 p-4 text-xs space-y-2">
              <div className="flex justify-between text-stone-600">
                <span>{lang === "th" ? "ราคาสินค้ารวม (Subtotal)" : "Subtotal"}</span>
                <span>฿{completedOrderData.subtotal}</span>
              </div>

              {completedOrderData.discountAmount > 0 && (
                <div className="flex justify-between font-bold text-[#FF718D]">
                  <span>
                    {lang === "th" ? "ส่วนลดโปรโมชั่น" : "Discount"} ({completedOrderData.promoCode})
                  </span>
                  <span>-฿{completedOrderData.discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>{lang === "th" ? "ค่าจัดส่งด่วน" : "Shipping Fee"}</span>
                <span>
                  {completedOrderData.shippingFee === 0 ? (
                    <span className="font-bold text-emerald-600">{lang === "th" ? "ส่งฟรี" : "FREE"}</span>
                  ) : (
                    `฿${completedOrderData.shippingFee}`
                  )}
                </span>
              </div>

              <div className="border-t border-stone-200 pt-2 flex justify-between items-baseline text-sm font-bold text-[#354B2D]">
                <span className="font-display text-base">{lang === "th" ? "ยอดชำระสุทธิ (Total Paid)" : "Total Paid"}</span>
                <span className="font-display text-2xl text-[#354B2D]">฿{completedOrderData.grandTotal}</span>
              </div>
            </div>

            {/* Delivery Address Box */}
            <div className="mt-6 rounded-2xl border border-[#d8c79e]/60 bg-[#FFF9E9] p-4 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#354B2D]">
                <Truck size={16} className="text-[#FF718D]" />
                <span>{lang === "th" ? "ที่อยู่สำหรับการจัดส่ง" : "Delivery Details"}</span>
              </div>
              <p className="mt-2 font-semibold text-stone-800">
                {completedOrderData.customer.name} ({completedOrderData.customer.phone})
              </p>
              <p className="text-stone-600 mt-0.5">
                {completedOrderData.customer.address}, {completedOrderData.customer.province}{" "}
                {completedOrderData.customer.postalCode}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-emerald-700 font-bold">
                <Package size={14} />
                <span>{lang === "th" ? "คาดว่าจะได้รับสินค้าภายใน 1-2 วันทำการ" : "Estimated delivery in 1-2 business days"}</span>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#354B2D] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#244A1A]"
              >
                <ShoppingBag size={16} />
                <span>{lang === "th" ? "เลือกซื้อขนมต่อ" : "Continue Shopping"}</span>
              </Link>

              <Link
                href="/recommend"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#354B2D] bg-white py-3.5 text-sm font-bold text-[#354B2D] shadow-xs transition hover:bg-[#FFF9E9]"
              >
                <Sparkles size={16} className="text-[#FF718D]" />
                <span>{lang === "th" ? "ดูเมนูแนะนำสุขภาพ" : "Explore Recommendations"}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  // If cart is completely empty, show empty state
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F1E5CD] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md rounded-[36px] border border-white/80 bg-[#FFFDF8] p-8 text-center shadow-lg">
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#FFF2B4] text-4xl text-[#FF9F43]">
            🥣
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold text-[#354B2D]">
            {lang === "th" ? "ยังไม่มีขนมในตะกร้าของคุณ" : "Your cart is empty"}
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-stone-500 sm:text-sm">
            {lang === "th"
              ? "ลองเลือกดูขนมสุขภาพแสนอร่อยของเรา หรือทำแบบทดสอบเพื่อค้นหาขนมที่เหมาะกับคุณ"
              : "Explore our delicious healthy snack menu or take the quiz to find your match."}
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF718D] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#FF859F]"
            >
              <ShoppingBag size={16} />
              <span>{lang === "th" ? "ไปเลือกดูขนมทั้งหมด" : "Browse All Snacks"}</span>
            </Link>
            <Link
              href="/recommend"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#354B2D] py-3 text-sm font-bold text-[#354B2D] transition hover:bg-[#FFF9E9]"
            >
              <Sparkles size={16} className="text-[#FF9F43]" />
              <span>{lang === "th" ? "ทำแบบทดสอบแนะนำขนม" : "Snack Matcher Quiz"}</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F1E5CD] px-4 py-10 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 size-96 rounded-full bg-[#FFD95A]/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 size-96 rounded-full bg-[#FF718D]/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Breadcrumb / Top Title */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#d8c79e] bg-[#FFF9E9] px-3.5 py-1.5 text-xs font-bold text-[#354B2D] transition hover:bg-white"
          >
            <ArrowLeft size={14} />
            <span>{lang === "th" ? "เลือกซื้อขนมต่อ" : "Back to Shop"}</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800">
            <ShieldCheck size={14} />
            <span>{lang === "th" ? "ชำระเงินปลอดภัย 100%" : "100% Secure Checkout"}</span>
          </div>
        </div>

        <h1 className="font-display text-3xl font-extrabold text-[#354B2D] sm:text-4xl">
          {lang === "th" ? "ชำระเงิน & สรุปรายการสั่งซื้อ" : "Checkout & Order Summary"}
        </h1>
        <p className="mt-1 text-xs text-[#8B5E3C] sm:text-sm">
          {lang === "th"
            ? "กรอกข้อมูลจัดส่ง ใส่โค้ดส่วนลด และกดยืนยันชำระเงินได้ทันที"
            : "Enter your delivery address, apply promo code, and confirm your order."}
        </p>

        {/* Form & Summary Grid */}
        <form onSubmit={handlePlaceOrder} className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Left Column: Delivery & Payment Details */}
          <div className="space-y-6 lg:col-span-7">
            {/* Step 1: Customer Info & Address */}
            <div className="overflow-hidden rounded-[32px] border border-white/80 bg-[#FFFDF8] p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 place-items-center rounded-xl bg-[#354B2D] text-sm font-bold text-white">
                    1
                  </span>
                  <h2 className="font-display text-xl font-bold text-[#354B2D]">
                    {lang === "th" ? "ข้อมูลผู้รับและที่อยู่จัดส่ง" : "Delivery Address"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleAutofillDemo}
                  className="inline-flex items-center gap-1 rounded-full border border-[#d8c79e] bg-[#FFF9E9] px-2.5 py-1 text-[11px] font-bold text-[#354B2D] transition hover:bg-[#FFD95A]"
                >
                  <Sparkles size={12} className="text-[#FF718D]" />
                  <span>{lang === "th" ? "กรอกที่อยู่ตัวอย่าง" : "Autofill Demo"}</span>
                </button>
              </div>

              <div className="mt-5 space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-stone-600">
                      {lang === "th" ? "ชื่อ - นามสกุล ผู้รับ *" : "Recipient Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === "th" ? "เช่น นภัสสร สุขภาพดี" : "Full Name"}
                      className="mt-1 w-full rounded-2xl border border-[#d8c79e] bg-white px-4 py-2.5 text-sm text-[#354B2D] shadow-xs outline-none focus:border-[#354B2D] focus:ring-2 focus:ring-[#354B2D]/10"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-600">
                      {lang === "th" ? "เบอร์โทรศัพท์สำหรับติดต่อ *" : "Phone Number *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="08X-XXX-XXXX"
                      className="mt-1 w-full rounded-2xl border border-[#d8c79e] bg-white px-4 py-2.5 text-sm text-[#354B2D] shadow-xs outline-none focus:border-[#354B2D] focus:ring-2 focus:ring-[#354B2D]/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-600">
                    {lang === "th" ? "อีเมล (สำหรับรับใบเสร็จและสถานะพัสดุ)" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="mt-1 w-full rounded-2xl border border-[#d8c79e] bg-white px-4 py-2.5 text-sm text-[#354B2D] shadow-xs outline-none focus:border-[#354B2D] focus:ring-2 focus:ring-[#354B2D]/10"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-600">
                    {lang === "th" ? "ที่อยู่จัดส่ง (บ้านเลขที่ / ซอย / ถนน / อาคาร) *" : "Delivery Address *"}
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={lang === "th" ? "เช่น 123/45 ซอยสุขุมวิท 39..." : "Street Address, Building, Floor..."}
                    className="mt-1 w-full rounded-2xl border border-[#d8c79e] bg-white px-4 py-2.5 text-sm text-[#354B2D] shadow-xs outline-none focus:border-[#354B2D] focus:ring-2 focus:ring-[#354B2D]/10"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-stone-600">
                      {lang === "th" ? "จังหวัด" : "Province"}
                    </label>
                    <input
                      type="text"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-[#d8c79e] bg-white px-4 py-2.5 text-sm text-[#354B2D] shadow-xs outline-none focus:border-[#354B2D]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-600">
                      {lang === "th" ? "รหัสไปรษณีย์" : "Postal Code"}
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-[#d8c79e] bg-white px-4 py-2.5 text-sm text-[#354B2D] shadow-xs outline-none focus:border-[#354B2D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-600">
                    {lang === "th" ? "หมายเหตุถึงผู้จัดส่ง (ถ้ามี)" : "Delivery Note (Optional)"}
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={lang === "th" ? "เช่น วางไว้หน้าบ้าน / โทรแจ้งก่อนส่ง" : "e.g. Leave at front door"}
                    className="mt-1 w-full rounded-2xl border border-[#d8c79e] bg-white px-4 py-2 text-xs text-[#354B2D] shadow-xs outline-none focus:border-[#354B2D]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Method */}
            <div className="overflow-hidden rounded-[32px] border border-white/80 bg-[#FFFDF8] p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2.5 border-b border-stone-200/80 pb-4">
                <span className="grid size-8 place-items-center rounded-xl bg-[#354B2D] text-sm font-bold text-white">
                  2
                </span>
                <h2 className="font-display text-xl font-bold text-[#354B2D]">
                  {lang === "th" ? "เลือกรูปแบบการจัดส่ง" : "Shipping Method"}
                </h2>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setShippingMethod("standard")}
                  className={`flex flex-col rounded-2xl border-2 p-4 text-left transition ${
                    shippingMethod === "standard"
                      ? "border-[#354B2D] bg-[#FFF8E6] shadow-xs"
                      : "border-stone-200 bg-white hover:bg-[#FFFCF3]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#354B2D]">
                      {lang === "th" ? "จัดส่งด่วนมาตรฐาน" : "Standard Express"}
                    </span>
                    <span className="font-bold text-emerald-700">
                      {subtotal >= 500 || (appliedPromo?.type === "freeship") ? (
                        lang === "th" ? "ส่งฟรี" : "FREE"
                      ) : (
                        "฿40"
                      )}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-stone-500">
                    {lang === "th" ? "จัดส่งถึงภายใน 1-2 วันทำการ (ฟรีเมื่อสั่งครบ ฿500)" : "Delivered within 1-2 business days"}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingMethod("express")}
                  className={`flex flex-col rounded-2xl border-2 p-4 text-left transition ${
                    shippingMethod === "express"
                      ? "border-[#354B2D] bg-[#FFF8E6] shadow-xs"
                      : "border-stone-200 bg-white hover:bg-[#FFFCF3]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#354B2D]">
                      {lang === "th" ? "ส่งด่วนพิเศษ Priority" : "Priority Same/Next Day"}
                    </span>
                    <span className="font-bold text-[#FF718D]">฿75</span>
                  </div>
                  <p className="mt-1 text-xs text-stone-500">
                    {lang === "th" ? "แพ็คด่วนพิเศษ ส่งถึงไวสุดใน 24 ชม." : "Fast priority packing and dispatch"}
                  </p>
                </button>
              </div>
            </div>

            {/* Step 3: Payment Method (Simulated) */}
            <div className="overflow-hidden rounded-[32px] border border-white/80 bg-[#FFFDF8] p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2.5 border-b border-stone-200/80 pb-4">
                <span className="grid size-8 place-items-center rounded-xl bg-[#354B2D] text-sm font-bold text-white">
                  3
                </span>
                <h2 className="font-display text-xl font-bold text-[#354B2D]">
                  {lang === "th" ? "เลือกช่องทางชำระเงิน" : "Payment Method"}
                </h2>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("promptpay")}
                  className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3.5 text-center transition ${
                    paymentMethod === "promptpay"
                      ? "border-[#354B2D] bg-[#354B2D] text-white shadow-xs"
                      : "border-stone-200 bg-white text-[#354B2D] hover:bg-[#FFF9E9]"
                  }`}
                >
                  <QrCode size={22} />
                  <span className="mt-1 text-xs font-bold">PromptPay</span>
                  <span className="text-[10px] opacity-80">{lang === "th" ? "พร้อมเพย์" : "QR Scan"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3.5 text-center transition ${
                    paymentMethod === "card"
                      ? "border-[#354B2D] bg-[#354B2D] text-white shadow-xs"
                      : "border-stone-200 bg-white text-[#354B2D] hover:bg-[#FFF9E9]"
                  }`}
                >
                  <CreditCard size={22} />
                  <span className="mt-1 text-xs font-bold">Credit Card</span>
                  <span className="text-[10px] opacity-80">{lang === "th" ? "บัตรเครดิต" : "Visa/Master"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("truemoney")}
                  className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3.5 text-center transition ${
                    paymentMethod === "truemoney"
                      ? "border-[#354B2D] bg-[#354B2D] text-white shadow-xs"
                      : "border-stone-200 bg-white text-[#354B2D] hover:bg-[#FFF9E9]"
                  }`}
                >
                  <Wallet size={22} />
                  <span className="mt-1 text-xs font-bold">TrueMoney</span>
                  <span className="text-[10px] opacity-80">{lang === "th" ? "ทรูมันนี่" : "E-Wallet"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3.5 text-center transition ${
                    paymentMethod === "cod"
                      ? "border-[#354B2D] bg-[#354B2D] text-white shadow-xs"
                      : "border-stone-200 bg-white text-[#354B2D] hover:bg-[#FFF9E9]"
                  }`}
                >
                  <Package size={22} />
                  <span className="mt-1 text-xs font-bold">COD</span>
                  <span className="text-[10px] opacity-80">{lang === "th" ? "เก็บปลายทาง" : "Cash on Del"}</span>
                </button>
              </div>

              <div className="mt-4 rounded-2xl border border-stone-200 bg-[#FAF7F0] p-3 text-xs text-stone-600">
                <span className="font-bold text-[#354B2D]">ℹ️ ระบบจำลองการชำระเงิน:</span> เมื่อกดปุ่มชำระเงิน ระบบจะอนุมัติคำสั่งซื้อและแสดงใบเสร็จสำเร็จทันที
              </div>
            </div>
          </div>

          {/* Right Column: Order Items & Promo Code Box */}
          <div className="space-y-6 lg:col-span-5">
            <div className="sticky top-24 overflow-hidden rounded-[32px] border border-white/80 bg-[#FFFDF8] p-6 shadow-md sm:p-8">
              <h2 className="font-display text-xl font-bold text-[#354B2D]">
                {lang === "th" ? "สรุปรายการสั่งซื้อ" : "Order Summary"}
              </h2>

              {/* Items List */}
              <div className="mt-4 max-h-64 divide-y divide-stone-100 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3">
                    <ProductArt variant={item.art} image={item.image} alt={item.name} className="size-14 shrink-0 rounded-2xl" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-[#354B2D] sm:text-sm">{item.name}</p>
                      <p className="text-xs font-bold text-[#FF718D]">฿{item.price}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex items-center rounded-full border border-stone-200 bg-white px-2 py-0.5">
                          <button
                            type="button"
                            onClick={() => change(item.id, item.quantity - 1)}
                            className="p-1 text-stone-500 hover:text-black"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => change(item.id, item.quantity + 1)}
                            className="p-1 text-stone-500 hover:text-black"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          className="p-1 text-stone-400 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#354B2D]">฿{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Promo Code Input Section */}
              <div className="mt-5 border-t border-stone-200/80 pt-5">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#354B2D]">
                  <Tag size={14} className="text-[#FF718D]" />
                  <span>{lang === "th" ? "โค้ดส่วนลด / โปรโมชั่น" : "Promo Code"}</span>
                </label>

                {/* Promo Input Box */}
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError("");
                    }}
                    placeholder={lang === "th" ? "เช่น NIBBLYWELCOME15" : "e.g. NIBBLYWELCOME15"}
                    className="flex-1 rounded-2xl border border-[#d8c79e] bg-white px-4 py-2.5 text-xs font-mono font-bold uppercase text-[#354B2D] shadow-xs outline-none focus:border-[#354B2D] focus:ring-2 focus:ring-[#354B2D]/10"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyPromo()}
                    className="rounded-2xl bg-[#354B2D] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#244A1A]"
                  >
                    {lang === "th" ? "ใช้โค้ด" : "Apply"}
                  </button>
                </div>

                {/* Promo Validation Messages */}
                {promoError && (
                  <p className="mt-2 text-xs font-medium text-red-600">⚠️ {promoError}</p>
                )}

                {appliedPromo && (
                  <div className="mt-2.5 flex items-center justify-between rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={15} />
                      <span>
                        {appliedPromo.code} ({lang === "th" ? appliedPromo.labelTh : appliedPromo.labelEn})
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-emerald-700 hover:text-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* Quick Coupon Chips */}
                <div className="mt-3">
                  <p className="text-[11px] font-bold text-stone-500">
                    {lang === "th" ? "โค้ดแนะนำที่สามารถใช้ได้:" : "Available Promo Codes:"}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {AVAILABLE_PROMOS.map((p) => (
                      <button
                        key={p.code}
                        type="button"
                        onClick={() => handleApplyPromo(p.code)}
                        className={`rounded-lg border px-2.5 py-1 text-[10px] font-bold transition ${
                          appliedPromo?.code === p.code
                            ? "border-emerald-500 bg-emerald-100 text-emerald-900 font-extrabold"
                            : "border-stone-200 bg-white text-stone-700 hover:bg-[#FFF9E9]"
                        }`}
                      >
                        🏷️ {p.code} ({p.labelTh})
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculation Breakdown */}
              <div className="mt-5 space-y-2.5 border-t border-stone-200/80 pt-4 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>{lang === "th" ? "ราคาสินค้ารวม (Subtotal)" : "Subtotal"}</span>
                  <span className="font-semibold text-stone-800">฿{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between font-bold text-[#FF718D]">
                    <span>
                      {lang === "th" ? "ส่วนลดโปรโมชั่น" : "Discount"} ({appliedPromo?.code})
                    </span>
                    <span>-฿{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600">
                  <span>{lang === "th" ? "ค่าจัดส่ง" : "Shipping Fee"}</span>
                  <span className="font-semibold text-stone-800">
                    {shippingFee === 0 ? (
                      <span className="font-bold text-emerald-600">{lang === "th" ? "ส่งฟรี (Free)" : "FREE"}</span>
                    ) : (
                      `฿${shippingFee}`
                    )}
                  </span>
                </div>

                {subtotal < 500 && shippingFee > 0 && (
                  <p className="text-[10px] text-amber-700">
                    💡 {lang === "th" ? `ซื้อเพิ่มอีก ฿${500 - subtotal} เพื่อรับสิทธิ์ส่งฟรี!` : `Add ฿${500 - subtotal} more for free delivery!`}
                  </p>
                )}

                <div className="flex items-baseline justify-between border-t border-stone-200 pt-3 text-[#354B2D]">
                  <span className="font-display text-base font-bold">
                    {lang === "th" ? "ยอดชำระสุทธิ" : "Grand Total"}
                  </span>
                  <div className="text-right">
                    <span className="font-display text-3xl font-extrabold text-[#354B2D]">
                      ฿{grandTotal}
                    </span>
                    {discountAmount > 0 && (
                      <p className="text-[11px] font-bold text-emerald-600">
                        {lang === "th" ? `ประหยัดไปได้ ฿${discountAmount}` : `You saved ฿${discountAmount}`}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF718D] py-4 text-base font-extrabold text-white shadow-lg shadow-[#FF718D]/30 transition hover:scale-[1.02] hover:bg-[#FF859F] disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>{lang === "th" ? "กำลังดำเนินการชำระเงิน..." : "Processing Payment..."}</span>
                  </span>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    <span>
                      {lang === "th"
                        ? `ชำระเงิน (฿${grandTotal})`
                        : `Pay Now (฿${grandTotal})`}
                    </span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-[11px] text-stone-400">
                🔒 {lang === "th" ? "ข้อมูลของคุณถูกเข้ารหัสอย่างปลอดภัย 256-bit SSL" : "Encrypted 256-bit SSL checkout"}
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
