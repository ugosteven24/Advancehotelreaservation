"use client";

import React from "react";
import Link from "next/link";
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
    { name: "Home", href: "/" },
    { name: "Resorts", href: "/pages/resorts" },
    { name: "Destinations", href: "/pages/destinations" },
    { name: "Contact", href: "/pages/contact" },
    { name: "About", href: "/pages/about" },
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

        <Link
          href="/dashboard/favorites"
          className="header-icon"
          aria-label="Favorites"
        >
          <Heart size={20} />
        </Link>

        <Link href="/login" className="signin-link">
          <Users size={18} />
          <span>Sign In / Register</span>
        </Link>

        <Link href="/dashboard/mybooking" className="bookings-button">
          My Bookings
        </Link>
      </div>
    </header>
  );
}