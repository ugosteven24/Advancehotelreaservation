
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getUserId } from "@/lib/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hotel reservation",
  description: "Book your perfect stay with us",
};

// Pages where signed-in users should be redirected to the dashboard.
const GUEST_ONLY_PATHS = ["/", "/login", "/register"];

export default async function RootLayout({ children }) {
  // Read the pathname supplied by proxy.js.
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "";

  // Redirect signed-in users away from guest-only pages.
  if (GUEST_ONLY_PATHS.includes(pathname) && (await getUserId())) {
    redirect("/dashboard");
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
