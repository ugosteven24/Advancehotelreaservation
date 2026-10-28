"use client";

import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import "./reviews.css";

function toDate(value) {
  if (!value) return null;

  if (typeof value.toDate === "function") {
    return value.toDate();
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value) {
  const date = toDate(value);

  if (!date) return "Date unavailable";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function getStayDate(booking) {
  const start =
    booking.checkIn ??
    booking.checkInDate ??
    booking.startDate;

  const end =
    booking.checkOut ??
    booking.checkOutDate ??
    booking.endDate;

  if (!start && !end) return "Stay dates unavailable";

  return `Stayed ${formatDate(start)} - ${formatDate(end)}`;
}

function normalizeReview(id, data) {
  return {
    id,
    bookingId: data.bookingId ?? data.booking_id ?? null,
    name:
      data.hotelName ??
      data.propertyName ??
      data.hotelTitle ??
      data.name ??
      "Untitled Property",
    date: data.stayDate ?? data.bookingDate ?? "",
    rating: Math.min(
      5,
      Math.max(0, Number(data.rating) || 0)
    ),
    image:
      data.hotelImage ??
      data.propertyImage ??
      data.imageUrl ??
      data.image ??
      "",
    review: data.review ?? data.comment ?? data.text ?? "",
    reviewedDate: formatDate(
      data.createdAt ?? data.reviewedAt ?? data.date
    ),
    rawDate: data.createdAt ?? data.reviewedAt ?? null,
  };
}

function normalizeBooking(id, data) {
  return {
    id,
    hotelId: data.hotelId ?? data.propertyId ?? null,
    name:
      data.hotelName ??
      data.propertyName ??
      data.hotelTitle ??
      data.title ??
      "Untitled Property",
    image:
      data.hotelImage ??
      data.propertyImage ??
      data.imageUrl ??
      data.image ??
      "",
    checkIn:
      data.checkIn ?? data.checkInDate ?? data.startDate,
    checkOut:
      data.checkOut ?? data.checkOutDate ?? data.endDate,
    status: String(data.status ?? "").toLowerCase(),
  };
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (cancelled) return;

      if (!user) {
        setReviews([]);
        setPendingReviews([]);
        setError("Please sign in to view your reviews.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        // These queries assume both collections use userId.
        const reviewsQuery = query(
          collection(db, "reviews"),
          where("userId", "==", user.uid)
        );

        const bookingsQuery = query(
          collection(db, "booking"),
          where("userId", "==", user.uid)
        );

        const [reviewSnapshot, bookingSnapshot] =
          await Promise.all([
            getDocs(reviewsQuery),
            getDocs(bookingsQuery),
          ]);

        const fetchedReviews = reviewSnapshot.docs.map((item) =>
          normalizeReview(item.id, item.data())
        );

        const fetchedBookings = bookingSnapshot.docs.map((item) =>
          normalizeBooking(item.id, item.data())
        );

        // Match reviews to bookings using the booking document ID.
        const reviewedBookingIds = new Set(
          fetchedReviews
            .map((review) => review.bookingId)
            .filter(Boolean)
        );

        const now = new Date();

        const pending = fetchedBookings.filter((booking) => {
          const checkout = toDate(booking.checkOut);

          const isCancelled = [
            "cancelled",
            "canceled",
          ].includes(booking.status);

          const isCompleted =
            ["completed", "checked_out", "checked-out"].includes(
              booking.status
            ) ||
            (checkout && checkout < now);

          const alreadyReviewed =
            reviewedBookingIds.has(booking.id);

          return (
            isCompleted &&
            !isCancelled &&
            !alreadyReviewed
          );
        });

        if (!cancelled) {
          setReviews(fetchedReviews);
          setPendingReviews(pending);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);

        if (!cancelled) {
          setError(
            "Unable to load your reviews. Check your connection and Firestore permissions."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  async function handleDelete(reviewId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "reviews", reviewId));

      setReviews((current) =>
        current.filter((review) => review.id !== reviewId)
      );
    } catch (err) {
      console.error("Failed to delete review:", err);
      window.alert("Unable to delete this review.");
    }
  }

  const displayedReviews = reviews.filter((review) => {
    if (filter === "all") return true;

    if (filter === "positive") return review.rating >= 4;

    if (filter === "negative") return review.rating < 4;

    return true;
  });

  return (
    <main className="reviews-page">
      <section className="reviews-header">
        <div>
          <h1>My Reviews</h1>
          <p>
            Manage your feedback and share experiences from your past stays.
          </p>
        </div>

        <div className="header-actions">
          <select
            className="filter-button"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter reviews"
          >
            <option value="all">All Reviews</option>
            <option value="positive">4–5 Stars</option>
            <option value="negative">Below 4 Stars</option>
          </select>

          <button
            className="pending-button"
            onClick={() =>
              document
                .getElementById("pending-reviews")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Pending Reviews ({pendingReviews.length})
          </button>
        </div>
      </section>

      {loading ? (
        <p>Loading your reviews...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <>
          <section
            id="pending-reviews"
            className="pending-reviews-section"
          >
            <h2>Pending Reviews</h2>

            {pendingReviews.length === 0 ? (
              <p>You have no pending reviews.</p>
            ) : (
              pendingReviews.map((booking) => (
                <article
                  className="pending-review-card"
                  key={booking.id}
                >
                  <div className="pending-hotel">
                    {booking.image && (
                      <img
                        src={booking.image}
                        alt={booking.name}
                      />
                    )}

                    <div className="pending-info">
                      <span className="awaiting-badge">
                        Awaiting Review
                      </span>

                      <h2>{booking.name}</h2>
                      <p>{getStayDate(booking)}</p>

                      <div className="empty-stars" aria-label="Not rated">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span key={index}>☆</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    className="write-review-button"
                    onClick={() => {
                      window.location.href =
                        `/reviews/write?bookingId=${encodeURIComponent(
                          booking.id
                        )}`;
                    }}
                  >
                    Write a Review
                  </button>
                </article>
              ))
            )}
          </section>

          <section className="reviews-grid">
            {displayedReviews.length === 0 ? (
              <p>No reviews found.</p>
            ) : (
              displayedReviews.map((review) => (
                <article
                  className="review-card review-card-large"
                  key={review.id}
                >
                  {review.image && (
                    <img
                      className="oasis-image"
                      src={review.image}
                      alt={review.name}
                    />
                  )}

                  <div className="review-content">
                    <div className="review-top">
                      <div>
                        <h2>{review.name}</h2>

                        <p className="review-stay">
                          {review.date}
                        </p>
                      </div>

                      <div
                        className="rating-stars"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {Array.from({ length: review.rating }).map(
                          (_, index) => (
                            <span key={index}>★</span>
                          )
                        )}
                      </div>
                    </div>

                    <p className="review-text">
                      {review.review
                        ? `"${review.review}"`
                        : "No written feedback provided."}
                    </p>

                    <div className="review-footer">
                      <span>
                        Reviewed on {review.reviewedDate}
                      </span>

                      <div className="review-actions">
                        <button
                          onClick={() => {
                            window.location.href =
                              `/reviews/edit/${encodeURIComponent(
                                review.id
                              )}`;
                          }}
                        >
                          <EditIcon />
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(review.id)}
                        >
                          <TrashIcon />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </>
      )}
    </main>
  );
}

function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 20H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 3.5C17.3284 2.67157 18.6716 2.67157 19.5 3.5C20.3284 4.32843 20.3284 5.67157 19.5 6.5L8 18L3 19L4 14L16.5 3.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 11V17M14 11V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 7L7 20H17L18 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 7V4H15V7"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}