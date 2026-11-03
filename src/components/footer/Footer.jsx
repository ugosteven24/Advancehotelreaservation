'use client';
import React from "react";
import Link from "next/link";
import {
  Waves,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

import "./footer.css";

export default function Footer() {
  return (
    <footer className="hotel-footer">

      <div className="footer-container">

        {/* Column 1: Brand */}
        <div className="footer-column footer-brand">
          <Link href="/" className="footer-logo">
            <span className="footer-logo-icon">
              <Waves size={25} />
            </span>

            <span>
              <strong>HotelReserve</strong>
              <small>Stay Better. Travel Further.</small>
            </span>
          </Link>

          <p>
            Discover beautiful destinations and find the perfect
            place to stay. HotelReserve makes your accommodation
            search and reservation experience easier.
          </p>

          <div className="footer-socials">
      
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/pages/resorts">Explore Resorts</Link></li>
            <li><Link href="/pages/destinations">Destinations</Link></li>
            <li><Link href="/pages/about">About Us</Link></li>
            <li><Link href="/pages/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Support */}
        <div className="footer-column">
          <h3>Customer Support</h3>

          <ul>
            <li><Link href="/dashboard/mybooking">My Bookings</Link></li>
            <li><Link href="/dashboard/favorites">My Favorites</Link></li>
            <li><Link href="/pages/contact">Help & Support</Link></li>
            <li><Link href="/pages/faq">FAQs</Link></li>
            <li><Link href="/pages/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Newsletter */}
        <div className="footer-column footer-contact">
          <h3>Get in Touch</h3>

          <div className="footer-contact-item">
            <Mail size={18} />
            <a href="mailto:support@hotelreserve.com">
              support@hotelreserve.com
            </a>
          </div>

          <div className="footer-contact-item">
            <Phone size={18} />
            <a href="tel:+2348000000000">
              +234 800 000 0000
            </a>
          </div>

          <div className="footer-contact-item">
            <MapPin size={18} />
            <span>Nigeria</span>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Get travel inspiration and updates from us.</p>

            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Your email address"
                required
              />

              <button type="submit" aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} HotelReserve. All rights reserved.
        </p>

        <div className="footer-bottom-links">
          <Link href="/pages/privacy">Privacy Policy</Link>
          <Link href="/pages/terms">Terms & Conditions</Link>
        </div>
      </div>

    </footer>
  );
}
