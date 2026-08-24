"use client";

import "./reviews.css";

export default function ReviewsPage() {
  const pendingReview = {
    name: "The Azure Resort & Spa",
    date: "Stayed Oct 12 - Oct 16, 2023",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80",
  };

  const reviews = [
    {
      name: "Grand Plaza Hotel",
      date: "Stayed Sep 01 - Sep 05, 2023",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
      review:
        "An absolutely flawless experience from check-in to departure. The concierge team anticipated every need, and the room offered breathtaking views of the city skyline. The attention to detail in the suite's amenities truly sets the Grand Plaza apart. Will definitely be returning for my next business trip.",
      reviewedDate: "Reviewed on Sep 07, 2023",
    },
    {
      name: "Oasis Retreat",
      date: "",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=900&q=80",
      review:
        "Beautiful grounds and excellent spa facilities. The dining options were somewhat limited, but the overall relaxation value was incredible.",
      reviewedDate: "Reviewed Jul 22, 2023",
    },
  ];

  return (
    <main className="reviews-page">
      {/* ================= HEADER ================= */}

      <section className="reviews-header">
        <div>
          <h1>My Reviews</h1>

          <p>
            Manage your feedback and share experiences from your past stays.
          </p>
        </div>

        <div className="header-actions">
          <button className="filter-button">
            Filter
          </button>

          <button className="pending-button">
            Pending Reviews (2)
          </button>
        </div>
      </section>

      {/* ================= PENDING REVIEW ================= */}

      <section className="pending-review-card">
        <div className="pending-hotel">
          <img
            src={pendingReview.image}
            alt={pendingReview.name}
          />

          <div className="pending-info">
            <span className="awaiting-badge">
              Awaiting Review
            </span>

            <h2>{pendingReview.name}</h2>

            <p>{pendingReview.date}</p>

            <div className="empty-stars">
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
            </div>
          </div>
        </div>

        <button className="write-review-button">
          Write a Review
        </button>
      </section>

      {/* ================= REVIEWS ================= */}

      <section className="reviews-grid">
        {/* GRAND PLAZA */}

        <article className="review-card review-card-large">
          <div className="review-content">
            <div className="review-top">
              <div>
                <h2>{reviews[0].name}</h2>

                <p className="review-stay">
                  {reviews[0].date}
                </p>
              </div>

              <div className="rating-stars">
                {Array.from({ length: reviews[0].rating }).map(
                  (_, index) => (
                    <span key={index}>★</span>
                  )
                )}
              </div>
            </div>

            <p className="review-text">
              "{reviews[0].review}"
            </p>

            <div className="review-footer">
              <span>{reviews[0].reviewedDate}</span>

              <div className="review-actions">
                <button>
                  <EditIcon />
                  Edit
                </button>

                <button>
                  <TrashIcon />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* OASIS RETREAT */}

        <article className="review-card review-card-small">
          <img
            className="oasis-image"
            src={reviews[1].image}
            alt={reviews[1].name}
          />

          <div className="oasis-content">
            <div className="oasis-title-row">
              <h2>{reviews[1].name}</h2>

              <div className="small-rating">
                <span>★</span>
                <span>{reviews[1].rating}.0</span>
              </div>
            </div>

            <p className="oasis-review">
              "{reviews[1].review}"
            </p>

            <p className="oasis-date">
              {reviews[1].reviewedDate}
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}


/* ================= ICONS ================= */

function EditIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
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
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M10 11V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M14 11V17"
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