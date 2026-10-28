
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="hr-footer">
      <div className="hr-footer-top">
        <div>
          <Link href="/" className="hr-footer-logo">
            HotelReserve
          </Link>
          <p>Discover remarkable stays and memorable journeys.</p>
        </div>

        <div>
          <h3>Explore</h3>
          <Link href="/pages/hotels">Hotels</Link>
          <Link href="/pages/flights">Flights</Link>
          <Link href="/pages/resorts">Resorts</Link>
          <Link href="/pages/destinations">Destinations</Link>
        </div>

        <div>
          <h3>Company</h3>
          <Link href="/pages/about">About us</Link>
          <Link href="/pages/contact">Contact</Link>
          <Link href="/pages/faq">FAQs</Link>
        </div>

        <div>
          <h3>Legal</h3>
          <Link href="/pages/privacy">Privacy policy</Link>
          <Link href="/pages/terms">Terms of service</Link>
        </div>
      </div>

      <div className="hr-footer-bottom">
        © {new Date().getFullYear()} HotelReserve. All rights reserved.
      </div>
    </footer>
  );
}
