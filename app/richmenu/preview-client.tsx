"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Check, Copy, ExternalLink, Sparkles, HelpCircle, Layers, ArrowRight } from "lucide-react";
import { publicPath } from "@/lib/public-path";

export function RichMenuPreviewClient() {
  const [template, setTemplate] = useState<1 | 2>(1);
  const [showGuide, setShowGuide] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const t1Actions = [
    {
      key: "A",
      title: "เมนูสินค้าทั้งหมด",
      type: "ลิงก์ (URL)",
      value: "https://nibbly.com/shop",
      desc: "เปิดหน้าช้อปปิ้งขนมคลีน กราโนล่า และผลไม้อบแห้งทั้งหมด",
      badge: "Best Seller",
    },
    {
      key: "B",
      title: "แนะนำขนมสุขภาพ (Quiz)",
      type: "ลิงก์ (URL)",
      value: "https://nibbly.com/recommend",
      desc: "เปิดแบบทดสอบ Snack Finder ค้นหาขนมที่ตอบโจทย์ไลฟ์สไตล์สุขภาพ",
      badge: "USP เด่น",
    },
    {
      key: "C",
      title: "คูปอง & โปรโมชั่น",
      type: "ลิงก์ หรือ ข้อความ",
      value: "https://nibbly.com/subscribe",
      altValue: "คูปองลด 10%",
      desc: "แจกโค้ดส่วนลด 10% สำหรับสมาชิกใหม่ หรือพิมพ์รับคูปองอัตโนมัติ",
      badge: "ลด 10%",
    },
    {
      key: "D",
      title: "สมาชิก & สะสมแต้ม",
      type: "ลิงก์ (URL)",
      value: "https://nibbly.com/register",
      desc: "สมัครสมาชิก NIBBLY Club ตรวจสอบคะแนนสะสม และแลกขนมฟรี",
      badge: "Rewards",
    },
    {
      key: "E",
      title: "หน้าร้าน & เรื่องราวแบรนด์",
      type: "ลิงก์ (URL)",
      value: "https://nibbly.com/#about",
      desc: "ดูแผนที่ร้าน เวลาเปิด-ปิด และสตอรี่ขนมสุขภาพ 100% Organic",
      badge: "Store & Story",
    },
    {
      key: "F",
      title: "ติดต่อแอดมิน / สั่งด่วน",
      type: "ข้อความ (Message)",
      value: "สนใจสั่งซื้อขนมสุขภาพ / สอบถามแอดมิน",
      desc: "ส่งข้อความอัตโนมัติเข้าห้องแชท ให้แอดมินเข้ามาดูแลทันที",
      badge: "แชท 24 ชม.",
    },
  ];

  const t2Actions = [
    {
      key: "A",
      title: "แบนเนอร์ใหญ่: โปรลด 10% + โลโก้",
      type: "ลิงก์ (URL)",
      value: "https://nibbly.com/shop?promo=welcome10",
      desc: "เปิดหน้ารวมโปรโมชั่นต้อนรับสมาชิกใหม่ ลด 10% ทุกออเดอร์",
      badge: "แบนเนอร์หลัก",
    },
    {
      key: "B",
      title: "เมนูสินค้าทั้งหมด",
      type: "ลิงก์ (URL)",
      value: "https://nibbly.com/shop",
      desc: "เปิดหน้าช้อปปิ้ง แคตตาล็อกขนมคลีนทั้งหมด",
      badge: "Shop All",
    },
    {
      key: "C",
      title: "แนะนำขนมสุขภาพ",
      type: "ลิงก์ (URL)",
      value: "https://nibbly.com/recommend",
      desc: "ทำแบบทดสอบ Snack Finder ค้นหาขนมที่ตรงกับสุขภาพ",
      badge: "Snack Finder",
    },
    {
      key: "D",
      title: "คูปอง & สิทธิพิเศษ",
      type: "ลิงก์ (URL)",
      value: "https://nibbly.com/register",
      desc: "สมัครสมาชิกรับคูปอง 10% และดูข้อมูลหน้าร้าน",
      badge: "Coupon & Deals",
    },
  ];

  const currentActions = template === 1 ? t1Actions : t2Actions;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#354B2D]/10 px-4 py-1.5 text-sm font-bold text-[#354B2D]">
          <Sparkles size={16} className="text-[#F59E0B]" />
          <span>LINE Official Account Design System</span>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold text-[#24351F] sm:text-4xl">
          LINE Rich Menu สำหรับร้าน NIBBLY Healthy Treats
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-[#6B5A45]">
          ออกแบบถูกต้องตามมาตรฐาน LINE OA ขนาด 2500 × 1686 px (ความจุต่ำกว่า 1MB ตามกฎ LINE) พร้อมคัดสรรฟังก์ชันที่ตรงกับเว็บไซต์ที่สุด
        </p>
      </div>

      {/* Recommendation Banner */}
      <div className="mt-8 rounded-3xl border-2 border-[#C5DDBB] bg-gradient-to-r from-[#F0F8EC] via-[#FFFDF9] to-[#FEF3E8] p-6 shadow-xs">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-[#2E6B34] px-2.5 py-0.5 text-xs font-bold text-white">
              ⭐ คำแนะนำสำหรับเว็บ NIBBLY
            </div>
            <h2 className="text-xl font-bold text-[#243B20]">
              เว็บ NIBBLY ควรใช้แบบไหน? : <span className="text-[#E11D48]">แนะนำ Template 1 (แบบ 6 ช่อง)</span>
            </h2>
            <p className="text-sm text-[#5C4D3A] leading-relaxed">
              เพราะเว็บ NIBBLY มีบริการครบวงจรทั้ง <b>เมนูสินค้า, ควิซแนะนำขนมสุขภาพ (USP เด่น), คูปองลด 10%, ระบบสมาชิกสะสมแต้ม, หน้าร้าน และปุ่มติดต่อแอดมิน</b> ซึ่งแบบ 6 ช่องรองรับได้ครบทุกปุ่มในสัมผัสเดียว! ส่วนแบบ 4 ช่อง แนะนำเก็บไว้ใช้สำหรับช่วงจัดแคมเปญโปรโมชั่นใหญ่
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => setTemplate(1)}
              className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${
                template === 1
                  ? "bg-[#354B2D] text-white shadow-md shadow-[#354B2D]/20"
                  : "bg-white text-[#4A3D2D] hover:bg-[#F2E8D8]"
              }`}
            >
              แบบ 1: 6 ช่อง (แนะนำ)
            </button>
            <button
              onClick={() => setTemplate(2)}
              className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${
                template === 2
                  ? "bg-[#354B2D] text-white shadow-md shadow-[#354B2D]/20"
                  : "bg-white text-[#4A3D2D] hover:bg-[#F2E8D8]"
              }`}
            >
              แบบ 2: 4 ช่อง (แคมเปญ)
            </button>
          </div>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Rich Menu Image Mockup */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl border border-[#E8DCB8] bg-white p-5 shadow-lg shadow-black/5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0E5D0] pb-4">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-[#2F4428]">
                  {template === 1 ? "Template 1: แบบ 6 ช่อง (2 แถว × 3 คอลัมน์)" : "Template 2: แบบ 4 ช่อง (แบนเนอร์บน + 3 ปุ่มล่าง)"}
                </span>
                <span className="rounded-full bg-[#EBF7EA] px-2.5 py-0.5 text-xs font-semibold text-[#1C6026]">
                  2500 × 1686 px (HD)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                    showGuide
                      ? "bg-[#E11D48] text-white"
                      : "bg-[#F3ECE0] text-[#5A4936] hover:bg-[#EAE0D0]"
                  }`}
                >
                  <Layers size={14} />
                  <span>{showGuide ? "ซ่อนเส้นกรอบ" : "แสดงเส้นกรอบพื้นที่ (Grid Guide)"}</span>
                </button>
              </div>
            </div>

            {/* Rich Menu Image */}
            <div className="relative mt-5 overflow-hidden rounded-2xl border-4 border-[#354B2D]/20 bg-[#F7F2EA] shadow-inner">
              <div className="relative aspect-[2500/1686] w-full">
                <Image
                  src={
                    showGuide
                      ? `${publicPath}/richmenu/richmenu-template-${template}-guide-2500x1686.png`
                      : template === 1
                      ? `${publicPath}/richmenu/richmenu-template-1-6blocks-2500x1686.jpg`
                      : `${publicPath}/richmenu/richmenu-template-2-4blocks-2500x1686.jpg`
                  }
                  alt={`NIBBLY LINE Rich Menu Template ${template}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Download Buttons */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 bg-[#FAF5EC] p-4 rounded-2xl">
              <div>
                <p className="text-xs font-bold text-[#354B2D]">ไฟล์ภาพพร้อมนำไปอัปโหลดใน LINE OA Manager:</p>
                <p className="text-xs text-[#7A6953]">ขนาดไฟล์ผ่านเกณฑ์ LINE OA (ไม่เกิน 1MB แน่นอน)</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={
                    template === 1
                      ? `${publicPath}/richmenu/richmenu-template-1-6blocks-2500x1686.jpg`
                      : `${publicPath}/richmenu/richmenu-template-2-4blocks-2500x1686.jpg`
                  }
                  download={`NIBBLY-RichMenu-Template${template}-2500x1686.jpg`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#354B2D] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#25371F] transition"
                >
                  <Download size={14} />
                  <span>ดาวน์โหลด HD 2500×1686 JPG (แนะนำ)</span>
                </a>
                <a
                  href={
                    template === 1
                      ? `${publicPath}/richmenu/richmenu-template-1-6blocks-800x540.png`
                      : `${publicPath}/richmenu/richmenu-template-2-4blocks-800x540.png`
                  }
                  download={`NIBBLY-RichMenu-Template${template}-800x540.png`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white border border-[#D5C4A1] px-4 py-2.5 text-xs font-bold text-[#4B3B28] hover:bg-[#F3EAD7] transition"
                >
                  <Download size={14} />
                  <span>ดาวน์โหลด 800×540 PNG</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions Configuration & Mapping */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-[#E8DCB8] bg-white p-6 shadow-md shadow-black/5">
            <h3 className="text-lg font-bold text-[#2A3F24] flex items-center gap-2">
              <span>ตั้งค่าปุ่มใน LINE OA Manager</span>
            </h3>
            <p className="mt-1 text-xs text-[#79664E]">
              ก๊อปปี้ค่าเหล่านี้ไปใส่ในระบบ LINE Official Account เพื่อผูกแต่ละช่องเข้ากับหน้าเว็บ
            </p>

            <div className="mt-5 space-y-3">
              {currentActions.map((act) => (
                <div
                  key={act.key}
                  className="rounded-2xl border border-[#F0E4D0] bg-[#FFFDF9] p-3.5 hover:border-[#D6BF98] transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#354B2D] text-xs font-black text-white">
                        {act.key}
                      </span>
                      <span className="font-bold text-xs text-[#2A3E23]">{act.title}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#8B6B38] bg-[#F7EEDC] px-2 py-0.5 rounded-full">
                      {act.type}
                    </span>
                  </div>

                  <p className="mt-1.5 text-[11px] text-[#6E5D4A] leading-snug">{act.desc}</p>

                  <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[#F4EDE2] px-2.5 py-1.5 text-[11px]">
                    <span className="truncate font-mono text-[#4A3B29] max-w-[190px]">
                      {act.value}
                    </span>
                    <button
                      onClick={() => copyToClipboard(act.value, act.key)}
                      className="inline-flex items-center gap-1 font-bold text-[#2F6436] hover:text-[#18421E]"
                      title="คัดลอกค่า"
                    >
                      {copiedKey === act.key ? (
                        <>
                          <Check size={12} className="text-[#10B981]" />
                          <span className="text-[#10B981]">คัดลอกแล้ว</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>ก๊อปปี้</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Setup Checklist */}
          <div className="rounded-3xl border border-[#D9E6D3] bg-[#F2F9EE] p-5">
            <h4 className="font-bold text-sm text-[#27532A] flex items-center gap-1.5">
              <span>วิธีตั้งค่าบน LINE OA ใน 3 ขั้นตอน:</span>
            </h4>
            <ol className="mt-3 space-y-2 text-xs text-[#4A6347]">
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#27532A]">1.</span>
                <span>ล็อกอินเข้า <a href="https://manager.line.biz" target="_blank" rel="noreferrer" className="underline font-semibold text-[#1F5426]">manager.line.biz</a> แล้วไปที่เมนู <b>Rich menus</b></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#27532A]">2.</span>
                <span>เลือก <b>Create rich menu</b> &gt; เลือก Template ตามรูป (6 ช่อง หรือ 4 ช่อง)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#27532A]">3.</span>
                <span>อัปโหลดไฟล์รูปภาพ <b>2500×1686 JPG</b> ที่ดาวน์โหลดจากหน้านี้ และใส่ Link ตามตารางด้านบน</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
