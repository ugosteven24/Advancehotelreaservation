import "./legal.css";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | HotelReserve",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: November 2026</p>

      <p>
        HotelReserve respects your privacy. This policy explains what
        information we collect, how we use it and the choices you have.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Account details such as your name, email address and phone number.</li>
        <li>Booking details including hotel, dates, guests and special requests.</li>
        <li>Messages you send us through the contact form.</li>
        <li>Basic usage data that helps us keep the service secure and reliable.</li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To create and manage your account and process your bookings.</li>
        <li>To share booking details with the hotel you reserve.</li>
        <li>To send booking updates and notifications you have enabled.</li>
        <li>To respond to support requests and improve our service.</li>
      </ul>

      <h2>Sharing</h2>
      <p>
        We share information only with hotels you book, service providers who
        help us run the platform, and where required by law. We do not sell
        your personal information.
      </p>

      <h2>Your choices</h2>
      <p>
        You can update your profile and notification preferences at any time
        from your <Link href="/dashboard/settings">settings</Link>. To request
        deletion of your data, contact us through our{" "}
        <Link href="/pages/contact">contact page</Link>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href="mailto:support@hotelreserve.com">support@hotelreserve.com</a>.
      </p>
    </main>
  );
}
