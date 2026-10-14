import Image from "next/image";
import Link from "next/link";
import { RichMenuPreviewClient } from "./preview-client";

export const metadata = {
  title: "LINE Rich Menu Design & Guide | NIBBLY Healthy Treats",
  description: "พรีวิวและดาวน์โหลด LINE Rich Menu สำหรับร้าน NIBBLY Healthy Treats พร้อมคู่มือการติดตั้งบน LINE OA",
};

export default function RichMenuPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#2D3748]">
      <RichMenuPreviewClient />
    </div>
  );
}
