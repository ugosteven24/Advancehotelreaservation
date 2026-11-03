
import { Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "./global.css"
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

export const metadata = {
  title: "HotelReserve | Book Your Perfect Stay",
  description: "Discover hotels and resorts, compare stays, and book your perfect getaway.",
};

const GUEST_ONLY_PATHS = ["/", "/login", "/register"];

export default async function RootLayout({ children }) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "";

  if (GUEST_ONLY_PATHS.includes(pathname) && (await getUserId())) {
    redirect("/dashboard");
  }

  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${robotoMono.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>

      <body className="resorts-page">
        {(await getUserId()) ? <ClientMenu/> : <GuestMenu/>}
   
        {children}
        <Footer/>
        </body>
    </html>
  );
}
