'use client';
import React from 'react'
import Link from 'next/link';
import ProfileImage from "@/components/component/profileImage";
import {
  Search,
  Users,
  Heart,

  Waves,

} from "lucide-react";
import "./resorts.css"
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
          <Link href="/dashboard" className="active">Home</Link>
          <Link href="/dashboard/explore">Explore</Link>
    
          <Link href="/dashboard/favorites">Favorites</Link>
          <Link href="/dashboard/mybooking">My-booking</Link>
          <Link href="/dashboard/notification">Notification</Link>
          <Link href="/dashboard/profile">Profile</Link>
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
            <ProfileImage/>
            <span>Sign Out </span>
          </Link>

          <Link href="/my-bookings" className="bookings-button">
            My Bookings
          </Link>
        </div>
      </header>
  )
}
