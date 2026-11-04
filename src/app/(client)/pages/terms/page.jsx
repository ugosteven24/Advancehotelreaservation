import "./legal.css";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | HotelReserve",
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <h1>Terms of Service</h1>
      <p className="legal-updated">Last updated: November 2026</p>

      <p>
        By using HotelReserve you agree to these terms. Please read them
        carefully before making a booking.
      </p>

      <h2>Using the service</h2>
      <p>
        You must provide accurate information when creating an account and
        keep your login details secure. You are responsible for activity on
        your account.
      </p>

      <h2>Bookings</h2>
      <ul>
        <li>A booking request is confirmed only after the hotel accepts it.</li>
        <li>Prices are shown per night and may change until a booking is confirmed.</li>
        <li>Each hotel sets its own check-in rules and policies.</li>
      </ul>

      <h2>Cancellations</h2>
      <p>
        You can cancel pending or confirmed bookings from{" "}
        <Link href="/dashboard/mybooking">My Bookings</Link>. Refunds, where
        applicable, follow the hotel&apos;s cancellation policy.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree not to misuse the platform, attempt unauthorised access, or
        submit false or misleading bookings.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about these terms, reach us through the{" "}
        <Link href="/pages/contact">contact page</Link>.
      </p>
    </main>
  );
}
