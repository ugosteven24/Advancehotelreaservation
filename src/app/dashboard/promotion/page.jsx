"use client";

import { useEffect, useState } from "react";
import "./promotion.css";

const offers = [
  {
    id: 1,
    category: "URBAN RETREAT",
    categoryClass: "green",
    title: "20% Off City Center Suites",
    description:
      "Experience the vibrant heart of the city with our premium suites. Includes access to the executive lounge.",
    validity: "Valid till Oct 31",
    action: "Claim Deal",
    image: "/images/gallery.jpg",
    badge: "New",
    badgeType: "new",
  },
  {
    id: 2,
    category: "WELLNESS",
    categoryClass: "blue",
    title: "Complimentary Spa Day",
    description:
      "Book a 3-night stay and receive a full day pass to our award-winning serene spa facilities.",
    validity: "Ends in 48h",
    action: "Book with Offer",
    image: "/images/gallery1.jpg",
    badge: "Expiring Soon",
    badgeType: "expiring",
  },
  {
    id: 3,
    category: "CULINARY",
    categoryClass: "orange",
    title: "Gastronomy Weekend",
    description:
      "Savor an exclusive 5-course tasting menu curated by our Michelin-starred resident chef.",
    validity: "Valid Weekends Only",
    action: "Claim Deal",
    image: "/images/gallery2.jpg",
    badge: null,
  },
];

export default function PromotionsPage() {
  const [daysLeft, setDaysLeft] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);

  /*
   * Hero countdown
   */
  useEffect(() => {
    const targetDate = new Date();

    targetDate.setDate(targetDate.getDate() + 5);

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const days = Math.max(
        0,
        Math.ceil(difference / (1000 * 60 * 60 * 24))
      );

      setDaysLeft(days);
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, []);

  /*
   * Carousel
   */
  const nextOffer = () => {
    setCurrentIndex((previous) => {
      if (previous >= offers.length - 1) {
        return 0;
      }

      return previous + 1;
    });
  };

  const previousOffer = () => {
    setCurrentIndex((previous) => {
      if (previous <= 0) {
        return offers.length - 1;
      }

      return previous - 1;
    });
  };

  const handleCollectionClick = () => {
    console.log("Opening Summer Escape Collection...");
  };

  const handleOfferClick = (offer) => {
    console.log(`Selected offer: ${offer.title}`);
  };

  return (
    <main className="promotions-page">

      {/* =====================================================
          SUMMER ESCAPE HERO
      ====================================================== */}
 <div><h1 className="promotionOffer">Promotions & Offers</h1></div>
      <section className="promotion-hero">
       
        <div className="hero-background" />
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="member-label">
            Member Exclusive
          </span>

          <h1>Summer Escape Collection</h1>

          <p>
            Unlock up to 30% off premium suites and villas across
            our coastal resorts. Includes complimentary breakfast
            and spa credits.
          </p>

          <div className="hero-actions">
            <button
              className="collection-button"
              onClick={handleCollectionClick}
            >
              View Collection
            </button>

            <div className="hero-countdown">
              <span className="clock-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>

              <span className="dasysleft">
                Ends in {daysLeft}{" "}
                {daysLeft === 1 ? "day" : "days"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EXCLUSIVE OFFERS
      ====================================================== */}

      <section className="exclusive-section">

        <div className="exclusive-header">
          <div>
            <h2>Exclusive Offers</h2>

            <p>
              Curated deals tailored to your luxury preferences.
            </p>
          </div>

          <div className="carousel-controls">
            <button
              className="carousel-button"
              onClick={previousOffer}
              aria-label="Previous offers"
            >
              <span>‹</span>
            </button>

            <button
              className="carousel-button"
              onClick={nextOffer}
              aria-label="Next offers"
            >
              <span>›</span>
            </button>
          </div>
        </div>

        <div className="offers-wrapper">
          <div
            className="offers-track"
            style={{
              transform: `translateX(calc(-${currentIndex} * (33.333333% + 18px)))`,
            }}
          >
            {offers.map((offer) => (
              <article
                className="offer-card"
                key={offer.id}
              >
                {/* Image */}
                <div className="offer-image-wrapper">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="offer-image"
                  />

                  {offer.badge && (
                    <span
                      className={`offer-badge ${offer.badgeType}`}
                    >
                      {offer.badgeType === "new" && (
                        <span className="star">☆</span>
                      )}

                      {offer.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="offer-content">

                  <div
                    className={`offer-category ${offer.categoryClass}`}
                  >
                    {offer.category}
                  </div>

                  <h3>{offer.title}</h3>

                  <p>{offer.description}</p>

                  <div className="offer-divider" />

                  <div className="offer-footer">

                    <span
                      className={
                        offer.badgeType === "expiring"
                          ? "offer-validity expiring-text"
                          : "offer-validity"
                      }
                    >
                      {offer.validity}
                    </span>

                    <button
                      className="offer-action"
                      onClick={() =>
                        handleOfferClick(offer)
                      }
                    >
                      {offer.action}

                      <span className="action-arrow">
                        →
                      </span>
                    </button>

                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile dots */}
        <div className="carousel-dots">
          {offers.map((offer, index) => (
            <button
              key={offer.id}
              className={
                index === currentIndex
                  ? "carousel-dot active"
                  : "carousel-dot"
              }
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to offer ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}