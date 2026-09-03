import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Music2, Sparkles } from "lucide-react";
import { publicPath } from "@/lib/public-path";

export function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-[#253b27] via-[#365340] to-[#2e5b63] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="relative h-24 w-48">
            <Image
              src={`${publicPath}/nibbly-logo-crop.png`}
              alt="NIBBLY Healthy Treats"
              fill
              sizes="192px"
              className="object-contain object-left"
            />
          </div>
          <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-white/75">
            A little happier, a little healthier, every single day.
          </p>
          <div className="mt-5 flex gap-2">
            <a aria-label="Instagram" href="#" className="rounded-full bg-white/10 p-2 transition hover:bg-[#c65752]">
              <Instagram size={17} />
            </a>
            <a aria-label="Facebook" href="#" className="rounded-full bg-white/10 p-2 transition hover:bg-[#c77725]">
              <Facebook size={17} />
            </a>
            <a aria-label="TikTok" href="#" className="rounded-full bg-white/10 p-2 transition hover:bg-[#8063a3]">
              <Music2 size={17} />
            </a>
          </div>
        </div>

        <FooterCol
          title="Explore"
          links={[
            { label: "Home", href: "/" },
            { label: "Shop All Snacks", href: "/shop" },
            { label: "Snack Finder (แนะนำขนม)", href: "/recommend" },
            { label: "สมัครสมาชิก NIBBLY", href: "/register" },
            { label: "Why NIBBLY", href: "/#why" },
          ]}
        />

        <FooterCol
          title="Customer Care"
          links={[
            { label: "Shipping Policy (ส่งฟรี >฿500)", href: "#" },
            { label: "Member Benefits (-15% Code)", href: "/register" },
            { label: "FAQ & Nutrition Guide", href: "/recommend" },
            { label: "Contact Us", href: "#contact" },
          ]}
        />

        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#FFD95A]">
            <Sparkles size={13} />
            <span>NIBBLY CLUB</span>
          </div>
          <p className="mt-3 text-sm font-bold text-[#d8c66a]">SNACK HAPPY, LIVE HEALTHY.</p>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            Made for bright mornings, busy afternoons and everything in between.
          </p>
          <Link
            href="/register"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#FFD95A] px-4 py-2 text-xs font-bold text-[#354B2D] transition hover:bg-white"
          >
            <span>สมัครสมาชิก</span>
            <span>→</span>
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/55">
        © 2026 NIBBLY Healthy Treats. Made with a little sunshine.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-xl text-[#C8E86B]">{title}</h3>
      <div className="mt-3 space-y-2">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.label}
            className="block text-sm text-white/75 transition hover:text-[#FFD95A]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

