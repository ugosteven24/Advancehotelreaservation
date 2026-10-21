
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Noto_Serif } from "next/font/google";


const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel Reservation",
  description: "Book your perfect stay with us",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
   

      <div className="bg-background font-body-md text-on-surface antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
        {children}
      </div>
   
  );
}

