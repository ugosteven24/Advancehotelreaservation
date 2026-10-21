import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "./globals.css";
import { getUserId } from "@/lib/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel reservation",
  description: "Book your perfect stay with us",
};

// Pages where a signed-in user should be sent to the dashboard.
const GUEST_ONLY_PATHS = ["/", "/login", "/register"];

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // proxy.js adds this header; the layout can't see the URL on its own.
  const pathname = (await headers()).get("x-pathname") ?? "";

  if (GUEST_ONLY_PATHS.includes(pathname) && (await getUserId())) {
    redirect("/dashboard"); // already signed in
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}