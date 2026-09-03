import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { Navbar } from "@/components/layout/navbar";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { Footer } from "@/components/layout/footer";
import { FloatingSnacks } from "@/components/animations/floating-snacks";
export const metadata: Metadata = { title: "NIBBLY — Snack Happy, Live Healthy", description: "NIBBLY brings delicious healthy snacks made with carefully selected ingredients for happier everyday moments.", openGraph: { title: "NIBBLY — Snack Happy, Live Healthy", description: "Good ingredients. Great taste. Happy moments.", type: "website" }, twitter: { card: "summary_large_image", title: "NIBBLY — Snack Happy, Live Healthy" } };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="th"><body><LanguageProvider><AuthProvider><CartProvider><Navbar/><FloatingSnacks/>{children}<Footer/><CartDrawer/></CartProvider></AuthProvider></LanguageProvider></body></html>; }

