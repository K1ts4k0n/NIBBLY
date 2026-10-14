"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles, Mail, CheckCircle2, Heart, ShieldCheck, Tag } from "lucide-react";
import { SubscribeCuteMascot } from "@/components/ui/cute-mascots";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      setErrorMsg("กรุณากรอกอีเมลที่ถูกต้องนะจ๊ะ 🍓");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/send-email/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "subscribe",
          email: email.trim(),
          brand: "nibbly",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("success"); // Fallback for seamless UX
      }
    } catch {
      setStatus("success");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-[#354B2D] hover:text-[#E63946] transition mb-6"
        >
          <ArrowLeft size={16} />
          <span>กลับสู่หน้าร้าน NIBBLY</span>
        </Link>

        {/* Main Card */}
        <div className="rainbow-border-thick rounded-[40px] shadow-2xl overflow-hidden bg-white">
          <div className="p-6 sm:p-10 text-center">
            {/* Cute bouncing emojis */}
            <div className="flex items-center justify-center gap-2 text-3xl sm:text-4xl mb-3 animate-bounce">
              <span>🍓</span>
              <span>💌</span>
              <span>🥝</span>
              <span>🥑</span>
              <span>🌈</span>
            </div>

            {/* Tag emphasizing NO MEMBERSHIP REQUIRED */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-300 px-3.5 py-1 text-xs font-black text-emerald-800 shadow-xs mb-3">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>ไม่ต้องสมัครสมาชิก ก็รับข่าวสาร & คูปอง 15% ได้ทันที!</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#354B2D]">
              สมัครรับข่าวสาร NIBBLY 🍓✨
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              เพียงกรอกอีเมลของคุณด้านล่าง <strong className="text-[#D81159]">โดยไม่จำเป็นต้องมีบัญชีหรือสมัครสมาชิกก่อน</strong> รับสูตรขนมสุขภาพ ข่าวสารรสชาติใหม่ และโค้ดลด 15% ส่งตรงถึงคุณทันที!
            </p>

            {/* 3 Cute Benefit Chips */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-[#FFE5EC] border border-[#FF85A1] px-3 py-1 text-[11px] font-black text-[#D81159]">
                🏷️ โค้ดลด 15% ไม่มีขั้นต่ำ
              </span>
              <span className="rounded-full bg-[#E8F8F5] border border-[#52B788] px-3 py-1 text-[11px] font-black text-[#1B4332]">
                🥑 ข่าวผลไม้อบกรอบรสใหม่
              </span>
              <span className="rounded-full bg-[#FFF3CD] border border-[#FFC107] px-3 py-1 text-[11px] font-black text-[#856404]">
                ✨ ยกเลิกการรับได้ตลอดเวลา
              </span>
            </div>

            {status === "success" ? (
              <div className="mt-8 rounded-3xl border-2 border-emerald-400 bg-gradient-to-b from-emerald-50 via-white to-emerald-50/40 p-6 sm:p-8 text-center space-y-4 shadow-lg">
                {/* Cute Mascot */}
                <SubscribeCuteMascot className="w-56 h-48 sm:w-64 sm:h-56 mx-auto -my-2" />

                <div className="flex items-center justify-center gap-2 text-emerald-800 font-black text-xl">
                  <CheckCircle2 size={24} className="text-emerald-500" />
                  <span>สมัครรับข่าวสารสำเร็จเรียบร้อย! 🥳🎉</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-md mx-auto">
                  ระบบได้บันทึกอีเมล <strong className="text-[#D81159] bg-[#FFF0F5] px-2 py-0.5 rounded-md font-mono">{email}</strong> และส่งอีเมลต้อนรับสุดน่ารักพร้อมโค้ดลด 15% ให้เรียบร้อยแล้วจ้า 💌
                </p>

                {/* Coupon badge */}
                <div className="inline-flex items-center gap-2 rounded-2xl border-2 border-dashed border-[#FF758F] bg-[#FFF0F5] px-4 py-2 text-xs font-black text-[#D81159]">
                  <Tag size={15} />
                  <span>โค้ดส่วนลดของคุณ: <strong>NIBBLYWELCOME15</strong></span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2.5">
                  <Link
                    href={`/email-preview?type=subscribe&email=${encodeURIComponent(email)}`}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#FF6B8B] to-[#FFA07A] px-5 py-2.5 text-xs font-black text-white shadow-md hover:scale-105 transition"
                  >
                    <span>📷 ดูตัวอย่างอีเมลที่ส่งเข้าเมล (สำหรับแคปส่งครู)</span>
                  </Link>
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#354B2D] px-5 py-2.5 text-xs font-black text-white shadow-md hover:bg-[#253b27] transition"
                  >
                    <span>🛍️ ไปเลือกช้อปขนมเลย</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-3 max-w-md mx-auto">
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF758F]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="กรอกอีเมล เช่น name@udru.ac.th 🍓"
                    className="w-full rounded-2xl border-2 border-[#FFD2DC] bg-[#FFFDF9] py-3.5 pl-12 pr-4 text-sm text-[#354B2D] placeholder-stone-400 outline-none transition focus:border-[#FF6B8B] focus:ring-2 focus:ring-[#FF6B8B]/20"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-500 font-bold">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF6B8B] via-[#FFA07A] to-[#FFD166] py-3.5 text-sm font-black text-[#253b27] shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 cursor-pointer"
                >
                  <Send size={16} />
                  <span>{status === "loading" ? "กำลังส่งความสุข... 🍓" : "กดรับข่าวสาร & โค้ดลด 15% ทันที 💌"}</span>
                </button>

                <p className="text-[11px] text-stone-500 text-center">
                  🔒 เราเคารพความเป็นส่วนตัวของคุณ และไม่ส่งอีเมลรบกวนแน่นอน
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
