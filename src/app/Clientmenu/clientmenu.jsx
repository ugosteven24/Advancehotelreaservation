"use client";

import React from "react";
import Link from "next/link";
import ProfileImage from "@/components/component/profileImage";
import { usePathname } from "next/navigation";
import {
  Search,
  Users,
  Heart,
  Waves,
} from "lucide-react";

export default function Menu() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/dashboard" },
    { name: "Explore", href: "/dashboard/explore" },
    { name: "Favorites", href: "/dashboard/favorites" },
    { name: "My-booking", href: "/dashboard/mybooking" },
    { name: "Notification", href: "/dashboard/notification" },
    { name: "Profile", href: "/dashboard/profile" },
  ];

  return (
    <header className="resorts-header">
      <Link href="/" className="resorts-brand">
        <span className="brand-mark">
          <Waves size={25} />
        </span>

        <span>
          <strong>HotelReserve</strong>
          <small>Stay Better. Travel Further.</small>
        </span>
      </Link>

      <nav className="resorts-nav">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              pathname === link.href ? "active" : ""
            }
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <button
          type="button"
          className="header-icon"
          aria-label="Open search"
          onClick={() =>
            document
              .getElementById("resort-search")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <Search size={20} />
        </button>

   

        <Link href="/login" className="signin-link">
          <ProfileImage />
          <span>Sign Out </span>
        </Link>

        <Link href="/my-bookings" className="bookings-button">
          My Bookings
        </Link>
      </div>
    </header>
  );
}