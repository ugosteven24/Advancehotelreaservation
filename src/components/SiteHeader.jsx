
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Waves, Heart, UserRound } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/pages/hotels" },
  { label: "Flights", href: "/pages/flights" },
  { label: "Destinations", href: "/pages/destinations" },
  { label: "About", href: "/pages/about" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="hr-header">
      <Link href="/" className="hr-brand">
        <span className="hr-brand-icon"><Waves size={24} /></span>
        <span>
          <strong>HotelReserve</strong>
          <small>Stay better. Travel further.</small>
        </span>
      </Link>

      <button
        className="hr-mobile-menu"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? <X /> : <Menu />}
      </button>

      <nav className={`hr-nav ${open ? "is-open" : ""}`}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="hr-header-actions">
        <Link href="/favorites" aria-label="Favorites">
          <Heart size={19} />
        </Link>
        <Link href="/login" className="hr-signin">
          <UserRound size={17} /> Sign in
        </Link>
        <Link href="/my-bookings" className="hr-button hr-button-small">
          My bookings
        </Link>
      </div>
    </header>
  );
}
