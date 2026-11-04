"use client";

import "./booking.css";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";

const BUTTON_COLOR = "#0866ed";

const today = () => new Date().toISOString().split("T")[0];

function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut) - new Date(checkIn);
  return diff > 0 ? Math.round(diff / 86400000) : 0;
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function BookingContent() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [hotel, setHotel] = useState(null);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    guests: Number(searchParams.get("guests")) || 2,
    specialRequests: "",
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (current) => {
      if (!current) {
        router.replace("/login");
        return;
      }
      setUser(current);
      setForm((prev) => ({
        ...prev,
        guestName: prev.guestName || current.displayName || "",
        guestEmail: prev.guestEmail || current.email || "",
        guestPhone: prev.guestPhone || current.phoneNumber || "",
      }));
      setAuthReady(true);
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
    const loadHotel = async () => {
      try {
        const snap = await getDoc(doc(db, "hotels", id));
        if (snap.exists()) setHotel({ id: snap.id, ...snap.data() });
      } catch (err) {
        console.error("Failed to load hotel:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadHotel();
  }, [id]);

  const nights = useMemo(
    () => nightsBetween(form.checkIn, form.checkOut),
    [form.checkIn, form.checkOut]
  );
  const pricePerNight = Number(hotel?.price) || 0;
  const total = nights * pricePerNight;

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const warn = (text) =>
    Swal.fire({
      icon: "warning",
      title: "Invalid request",
      text,
      confirmButtonColor: BUTTON_COLOR,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.guestName.trim() || !form.guestEmail.trim() || !form.guestPhone.trim()) {
      return warn("Please enter your name, email and phone number.");
    }
    if (!form.checkIn || !form.checkOut) {
      return warn("Please select your check-in and check-out dates.");
    }
    if (nights < 1) {
      return warn("Check-out must be after check-in.");
    }

    setSubmitting(true);

    try {
      const bookingNumber = `BK-${Date.now().toString(36).toUpperCase()}`;

      await addDoc(collection(db, "bookings"), {
        bookingNumber,
        userId: user.uid,
        guestName: form.guestName.trim(),
        guestEmail: form.guestEmail.trim(),
        guestPhone: form.guestPhone.trim(),
        hotelId: hotel.id,
        hotelName: hotel.hotelName || "",
        hotelImage: hotel.coverImage || "",
        city: hotel.city || "",
        country: hotel.country || "",
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        nights,
        guests: Number(form.guests) || 1,
        pricePerNight,
        totalAmount: total,
        specialRequests: form.specialRequests.trim(),
        status: "pending",
        paymentStatus: "unpaid",
        createdAt: serverTimestamp(),
      });

      await Swal.fire({
        icon: "success",
        title: "Booking received",
        text: `Your booking ${bookingNumber} has been submitted.`,
        confirmButtonColor: BUTTON_COLOR,
      });

      router.push("/dashboard/mybooking");
    } catch (err) {
      console.error("Booking failed:", err);
      Swal.fire({
        icon: "error",
        title: "Booking failed",
        text: "We could not complete your booking. Please try again.",
        confirmButtonColor: BUTTON_COLOR,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !authReady) {
    return <div className="booking-state">Loading booking...</div>;
  }

  if (!hotel) {
    return (
      <div className="booking-state">
        <div>
          <h2>Hotel not found</h2>
          <Link href="/pages/resorts">Browse resorts</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="booking-page">
      <h1>Complete your booking</h1>
      <p className="booking-sub">Review your stay and confirm your details.</p>

      <form className="booking-layout" onSubmit={handleSubmit}>
        <section className="booking-card">
          <h2>Guest and stay details</h2>

          <div className="booking-grid">
            <div className="booking-field full">
              <label htmlFor="guestName">Full name</label>
              <input id="guestName" name="guestName" value={form.guestName} onChange={handleChange} />
            </div>

            <div className="booking-field">
              <label htmlFor="guestEmail">Email</label>
              <input id="guestEmail" name="guestEmail" type="email" value={form.guestEmail} onChange={handleChange} />
            </div>

            <div className="booking-field">
              <label htmlFor="guestPhone">Phone</label>
              <input id="guestPhone" name="guestPhone" type="tel" value={form.guestPhone} onChange={handleChange} />
            </div>

            <div className="booking-field">
              <label htmlFor="checkIn">Check-in</label>
              <input id="checkIn" name="checkIn" type="date" min={today()} value={form.checkIn} onChange={handleChange} />
            </div>

            <div className="booking-field">
              <label htmlFor="checkOut">Check-out</label>
              <input id="checkOut" name="checkOut" type="date" min={form.checkIn || today()} value={form.checkOut} onChange={handleChange} />
            </div>

            <div className="booking-field full">
              <label htmlFor="guests">Guests</label>
              <select id="guests" name="guests" value={form.guests} onChange={handleChange}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </div>

            <div className="booking-field full">
              <label htmlFor="specialRequests">Special requests (optional)</label>
              <textarea id="specialRequests" name="specialRequests" value={form.specialRequests} onChange={handleChange} />
            </div>
          </div>
        </section>

        <aside className="booking-card booking-summary">
          {hotel.coverImage && <img src={hotel.coverImage} alt={hotel.hotelName} />}
          <h3>{hotel.hotelName}</h3>
          <p className="booking-location">
            {[hotel.city, hotel.state, hotel.country].filter(Boolean).join(", ")}
          </p>

          <div className="booking-line">
            <span>{formatMoney(pricePerNight)} x {nights} {nights === 1 ? "night" : "nights"}</span>
            <span>{formatMoney(total)}</span>
          </div>
          <div className="booking-line total">
            <span>Total</span>
            <span>{formatMoney(total)}</span>
          </div>

          <button className="booking-submit" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Confirm Booking"}
          </button>
          <p className="booking-note">
            No payment is taken now. The hotel will confirm your reservation.
          </p>
        </aside>
      </form>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="booking-state">Loading booking...</div>}>
      <BookingContent />
    </Suspense>
  );
}
