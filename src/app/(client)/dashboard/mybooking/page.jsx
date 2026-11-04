"use client";

import "./mybooking.css";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";

const BUTTON_COLOR = "#0866ed";

const TABS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
};

const createdMillis = (booking) =>
  booking.createdAt?.toMillis ? booking.createdAt.toMillis() : 0;

export default function MyBookingPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        const snap = await getDocs(
          query(collection(db, "bookings"), where("userId", "==", user.uid))
        );

        const list = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => createdMillis(b) - createdMillis(a));

        setBookings(list);
      } catch (err) {
        console.error("Failed to load bookings:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Unable to load your bookings.",
          confirmButtonColor: BUTTON_COLOR,
        });
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [router]);

  const filtered = useMemo(
    () => (tab === "all" ? bookings : bookings.filter((b) => b.status === tab)),
    [bookings, tab]
  );

  const handleCancel = async (booking) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Cancel booking?",
      text: `Booking ${booking.bookingNumber} will be cancelled.`,
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "Keep booking",
      confirmButtonColor: BUTTON_COLOR,
    });

    if (!result.isConfirmed) return;

    try {
      await updateDoc(doc(db, "bookings", booking.id), {
        status: "cancelled",
      });

      setBookings((prev) =>
        prev.map((b) => (b.id === booking.id ? { ...b, status: "cancelled" } : b))
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your booking has been cancelled.",
        confirmButtonColor: BUTTON_COLOR,
      });
    } catch (err) {
      console.error("Cancel failed:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to cancel this booking.",
        confirmButtonColor: BUTTON_COLOR,
      });
    }
  };

  return (
    <main className="mybookings-page">
      <h1>My Bookings</h1>
      <p className="mybookings-sub">Track and manage your reservations.</p>

      <div className="mybookings-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`mybookings-tab ${tab === t.key ? "active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mybookings-empty">Loading your bookings...</div>
      ) : filtered.length === 0 ? (
        <div className="mybookings-empty">
          <p>No bookings found.</p>
          <Link href="/dashboard/explore">Explore hotels</Link>
        </div>
      ) : (
        <div className="mybookings-list">
          {filtered.map((b) => (
            <article className="mybooking-card" key={b.id}>
              {b.hotelImage ? (
                <img src={b.hotelImage} alt={b.hotelName} />
              ) : (
                <div style={{ height: 130, borderRadius: 12, background: "#eef3fb" }} />
              )}

              <div className="mybooking-info">
                <p className="mybooking-number">{b.bookingNumber}</p>
                <h3>{b.hotelName}</h3>
                <p>{[b.city, b.country].filter(Boolean).join(", ")}</p>
                <p>
                  {formatDate(b.checkIn)} - {formatDate(b.checkOut)} ({b.nights}{" "}
                  {b.nights === 1 ? "night" : "nights"}, {b.guests}{" "}
                  {b.guests === 1 ? "guest" : "guests"})
                </p>
              </div>

              <div className="mybooking-side">
                <span className={`mybooking-badge ${b.status}`}>{b.status}</span>
                <span className="mybooking-total">{formatMoney(b.totalAmount)}</span>

                <div className="mybooking-actions">
                  {b.hotelId && (
                    <Link
                      className="mybooking-btn"
                      href={`/dashboard/hoteldetails/${b.hotelId}`}
                    >
                      View hotel
                    </Link>
                  )}
                  {(b.status === "pending" || b.status === "confirmed") && (
                    <button
                      type="button"
                      className="mybooking-btn danger"
                      onClick={() => handleCancel(b)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
