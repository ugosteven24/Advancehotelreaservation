
"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import "./mybooking.css";

// Convert Firestore Timestamps, Dates, or date strings to Date objects.
function toDate(value) {
  if (!value) return null;

  if (typeof value?.toDate === "function") {
    return value.toDate();
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value) {
  const date = toDate(value);

  if (!date) return "N/A";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function normalizeBooking(id, data) {
  const checkIn =
    data.checkIn ??
    data.checkInDate ??
    data.startDate ??
    data.check_in;

  const checkOut =
    data.checkOut ??
    data.checkOutDate ??
    data.endDate ??
    data.check_out;

  const rawStatus = String(data.status ?? "upcoming")
    .toLowerCase()
    .trim();

  const cancelledStatuses = [
    "cancelled",
    "canceled",
  ];

  let status;

  if (cancelledStatuses.includes(rawStatus)) {
    status = "cancelled";
  } else {
    const checkoutDate = toDate(checkOut);

    status =
      checkoutDate && checkoutDate < new Date()
        ? "past"
        : "upcoming";
  }

  return {
    id,

    // Adjust these field names to match your Firestore documents.
    title:
      data.hotelName ??
      data.propertyName ??
      data.hotelTitle ??
      data.title ??
      "Untitled Property",

    location:
      data.location ??
      data.address ??
      data.city ??
      data.hotelLocation ??
      "Location unavailable",

    startDate: formatDate(checkIn),
    endDate: formatDate(checkOut),

    guests:
      data.guests ??
      data.numberOfGuests ??
      data.guestCount ??
      data.adults ??
      1,

    status,

    paymentStatus: String(
      data.paymentStatus ??
      data.payment_status ??
      "pending"
    ).toLowerCase(),

    image:
      data.hotelImage ??
      data.propertyImage ??
      data.imageUrl ??
      data.image ??
      data.thumbnail ??
      "",
  };
}

export default function MyBooking() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchBookings() {
      try {
        setLoading(true);
        setError("");

        const snapshot = await getDocs(
          collection(db, "booking")
        );

        const bookingData = snapshot.docs.map((doc) =>
          normalizeBooking(doc.id, doc.data())
        );

        if (!cancelled) {
          setBookings(bookingData);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);

        if (!cancelled) {
          setError("Unable to load bookings. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchBookings();

    return () => {
      cancelled = true;
    };
  }, []);

  const tabs = [
    {
      id: "upcoming",
      label: `Upcoming (${bookings.filter(
        (b) => b.status === "upcoming"
      ).length})`,
    },
    {
      id: "past",
      label: `Past (${bookings.filter(
        (b) => b.status === "past"
      ).length})`,
    },
    {
      id: "cancelled",
      label: `Cancelled (${bookings.filter(
        (b) => b.status === "cancelled"
      ).length})`,
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = booking.status === activeTab;

    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      !query ||
      booking.title.toLowerCase().includes(query) ||
      booking.location.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <header className="client-header">
        <div>
          <h1>My Bookings</h1>
          <p>Manage your upcoming and past reservations.</p>
        </div>

        <button
          className="new-booking-btn"
          onClick={() => {
            window.location.href = "/hotels";
          }}
        >
          <i className="fas fa-plus"></i>
          New Booking
        </button>
      </header>

      <section className="dashboard-top">
        {/* Add your booking summary widgets here. */}
      </section>

      <section className="bookings-section">
        <div className="search-bar-wrapper">
          <div className="search-bar">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
              />
            </svg>

            <input
              type="text"
              className="search-input"
              placeholder="Search by property name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="bookings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`bookings-tab ${
                activeTab === tab.id
                  ? "bookings-tab-active"
                  : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bookings-list">
          {loading ? (
            <div className="empty-state">
              <p className="empty-state-text">
                Loading your bookings...
              </p>
            </div>
          ) : error ? (
            <div className="empty-state">
              <p className="empty-state-text">{error}</p>

              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-card-inner">
                  <div className="booking-image-wrapper">
                    {booking.image ? (
                      <img
                        src={booking.image}
                        alt={booking.title}
                        className="booking-image"
                      />
                    ) : (
                      <div
                        className="booking-image"
                        role="img"
                        aria-label="No property image available"
                      >
                        No image available
                      </div>
                    )}
                  </div>

                  <div className="booking-content">
                    <div className="booking-info">
                      <h2 className="booking-title">
                        {booking.title}
                      </h2>

                      <p className="booking-location">
                        {booking.location}
                      </p>

                      <div className="booking-meta">
                        <div className="booking-meta-item">
                          <svg
                            className="meta-icon"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>

                          <span>
                            {booking.startDate} - {booking.endDate}
                          </span>
                        </div>

                        <div className="booking-meta-item">
                          <svg
                            className="meta-icon"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>

                          <span>{booking.guests} Guests</span>
                        </div>
                      </div>
                    </div>

                    <div className="booking-actions">
                      {booking.paymentStatus === "pending" ? (
                        <button className="btn btn-primary">
                          Complete Payment
                        </button>
                      ) : (
                        <button className="btn btn-secondary">
                          Check-in Online
                        </button>
                      )}

                      <button className="btn btn-secondary">
                        View Details
                      </button>

                      {booking.paymentStatus === "paid" ? (
                        <button className="btn btn-secondary">
                          Modify
                        </button>
                      ) : (
                        <button className="btn btn-danger">
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p className="empty-state-text">
                {searchQuery
                  ? `No results found for "${searchQuery}"`
                  : `No ${activeTab} bookings found.`}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}