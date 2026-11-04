
import { Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/session";

import GuestMenu from "./Guestmenu/guestmenu";
import ClientMenu from "./Clientmenu/clientmenu";
import Footer from "@/components/footer/Footer";

import "./resorts.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export default async function ClientLayout({ children }) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "";

  const userId = await getUserId();

  const GUEST_ONLY_PATHS = ["/", "/login", "/register"];

  if (GUEST_ONLY_PATHS.includes(pathname) && userId) {
    redirect("/dashboard");
  }

  return (
    <div
      className={`${jakartaSans.variable} ${robotoMono.variable} resorts-page`}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      />

      {userId ? <ClientMenu /> : <GuestMenu />}

      <main>{children}</main>

      <Footer />
    </div>
  );
}
