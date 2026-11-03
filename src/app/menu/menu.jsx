'use client';
import React from 'react'
import Link from 'next/link';
import "./resorts.css";
import {
  Search,
  Users,
  Heart,

  Waves,

} from "lucide-react";

export default function menu(){
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
          <Link href="/" >Home</Link>
          <Link href="/pages/resorts">Resorts</Link>
      
           <Link href="/pages/destinations">Destinations</Link>
          <Link href="/pages/contact" className="">Contact</Link>
          <Link href="/pages/about">About</Link>
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
            href="/favorites"
            className="header-icon"
            aria-label="Favorites"
          >
            <Heart size={20} />
         
          </Link>

          <Link href="/login" className="signin-link">
            <Users size={18} />
            <span>Sign In / Register</span>
          </Link>

          <Link href="/my-bookings" className="bookings-button">
            My Bookings
          </Link>
        </div>
      </header>

  )
}
