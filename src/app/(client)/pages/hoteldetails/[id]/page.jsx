
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
  MapPin,
  Star,
  ShieldCheck,
  Heart,
  Share2,
  Wifi,
  Waves,
  Car,
  Utensils,
  Wind,
  Dumbbell,
  Tv,
  Coffee,
  ChevronRight,
  ChevronLeft,
  Check,
  CalendarDays,
  Users,
  Minus,
  Plus,
  Clock,
} from "lucide-react";

import "./hotel-details.css";


const BUTTON_COLOR = "#0866ed";
const amenityIcons = {
  wifi: Wifi,
  "free wi-fi": Wifi,
  pool: Waves,
  "swimming pool": Waves,
  parking: Car,
  "free parking": Car,
  restaurant: Utensils,
  "air conditioning": Wind,
  gym: Dumbbell,
  "fitness centre": Dumbbell,
  "fitness center": Dumbbell,
  tv: Tv,
  "smart tv": Tv,
  coffee: Coffee,
};

const formatPrice = (price) => {
  const amount = Number(price);

  if (!Number.isFinite(amount)) return "Price unavailable";

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function HotelDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const hotelId = params.id;

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    if (!hotelId) return;

    let active = true;

    const fetchHotel = async () => {
      try {
        setLoading(true);
        setError("");

        const hotelRef = doc(db, "hotels", hotelId);
        const snapshot = await getDoc(hotelRef);

        if (!snapshot.exists()) {
          if (active) {
            setError("Hotel not found.");
            setHotel(null);
          }
          return;
        }

        if (active) {
          setHotel({
            ...snapshot.data(),
            id: snapshot.id,
          });

          setActiveImage(0);
        }
      } catch (err) {
        console.error("Error fetching hotel:", err);

        if (active) {
          setError("Unable to load this hotel.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchHotel();

    return () => {
      active = false;
    };
  }, [hotelId]);

  // Loading state
  if (loading) {
    return (
      <main className="hotel-details-page">
        <div className="hotel-details-container">
          <div className="hotel-loading">
            <div className="hotel-spinner" />
            <p>Loading hotel details...</p>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !hotel) {
    return (
      <main className="hotel-details-page">
        <div className="hotel-details-container">
          <div className="hotel-error">
            <h2>{error || "Hotel not found."}</h2>
            <p>The hotel may have been removed or the link is incorrect.</p>

            <button onClick={() => router.push("/pages/resorts")}>
              Explore hotels
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Build image gallery from Firestore fields
  const images = [
    hotel.coverImage,
    ...(Array.isArray(hotel.galleryImages)
      ? hotel.galleryImages
      : []),
  ].filter(
    (image, index, array) =>
      typeof image === "string" &&
      image.trim() !== "" &&
      array.indexOf(image) === index
  );

  // Build location from actual hotel fields
  const location = [
    hotel.city,
    hotel.state,
    hotel.country,
  ]
    .filter(Boolean)
    .join(", ");

  // Normalize amenities
  const amenities = Array.isArray(hotel.amenities)
    ? hotel.amenities
    : [];

  const changeImage = (direction) => {
    if (!images.length) return;

    setActiveImage((current) =>
      (current + direction + images.length) % images.length
    );
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: hotel.hotelName,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        Swal.fire({
          icon: "success",
          title: "Link copied",
          text: "Hotel link copied.",
          confirmButtonColor: BUTTON_COLOR,
        });
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Share failed:", err);
      }
    }
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      Swal.fire({
      icon: "warning",
      title: "Dates required",
      text: "Please select your check-in and check-out dates.",
      confirmButtonColor: BUTTON_COLOR,
    });
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      Swal.fire({
      icon: "warning",
      title: "Invalid dates",
      text: "Check-out must be after check-in.",
      confirmButtonColor: BUTTON_COLOR,
    });
      return;
    }

    const query = new URLSearchParams({
      checkIn,
      checkOut,
      guests: String(guests),
    });

    router.push(`/pages/booking/${hotel.id}?${query.toString()}`);
  };

  return (
    <main className="hotel-details-page">
      <div className="hotel-details-container">

        {/* Breadcrumb */}
        <div className="hotel-breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={15} />

          <Link href="/pages/resorts">Hotels</Link>
          <ChevronRight size={15} />

          <span>{hotel.hotelName}</span>
        </div>

        {/* Hotel heading */}
        <section className="hotel-heading">
          <div>
            {hotel.category && (
              <div className="hotel-category">
                {hotel.category}
              </div>
            )}

            <h1>{hotel.hotelName}</h1>

            <div className="hotel-heading-meta">
              {location && (
                <span>
                  <MapPin size={16} />
                  {location}
                </span>
              )}

              {hotel.starRating && (
                <span className="hotel-rating">
                  <Star size={16} fill="currentColor" />
                  {hotel.starRating}
                </span>
              )}

              {hotel.reviewCount > 0 && (
                <span>
                  {hotel.reviewCount} reviews
                </span>
              )}

              {hotel.verified && (
                <span className="hotel-verified">
                  <ShieldCheck size={16} />
                  Verified property
                </span>
              )}
            </div>
          </div>

          <div className="hotel-heading-actions">
            <button
              className={liked ? "hotel-action liked" : "hotel-action"}
              onClick={() => setLiked(!liked)}
              aria-label="Save hotel"
            >
              <Heart
                size={18}
                fill={liked ? "currentColor" : "none"}
              />
              <span>Save</span>
            </button>

            <button className="hotel-action" onClick={handleShare}>
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </section>

        {/* Gallery */}
        <section className="hotel-gallery">
          <div className="hotel-gallery-main">
            {images.length > 0 ? (
              <img
                src={images[activeImage]}
                alt={hotel.hotelName}
              />
            ) : (
              <div className="hotel-no-image">
                <span>No hotel image available</span>
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  className="gallery-arrow gallery-prev"
                  onClick={() => changeImage(-1)}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>

                <button
                  className="gallery-arrow gallery-next"
                  onClick={() => changeImage(1)}
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>

                <span className="gallery-counter">
                  {activeImage + 1} / {images.length}
                </span>
              </>
            )}
          </div>

          <div className="hotel-gallery-thumbnails">
            {images.slice(1, 5).map((image, index) => (
              <button
                key={image}
                className={
                  activeImage === index + 1
                    ? "hotel-thumbnail active"
                    : "hotel-thumbnail"
                }
                onClick={() => setActiveImage(index + 1)}
              >
                <img src={image} alt={`${hotel.hotelName} view`} />
              </button>
            ))}
          </div>
        </section>

        {/* Main layout */}
        <div className="hotel-details-layout">

          <div className="hotel-details-main">

            {/* Overview */}
            <section className="hotel-section hotel-overview">
              <div className="hotel-section-heading">
                <h2>About this property</h2>
              </div>

              <p>
                {hotel.description || "No description available for this property."}
              </p>

              <div className="hotel-highlights">
                {hotel.address && (
                  <div>
                    <MapPin size={17} />
                    <span>{hotel.address}</span>
                  </div>
                )}

                {hotel.website && (
                  <div>
                    <Check size={17} />
                    <a href={hotel.website} target="_blank" rel="noreferrer">
                      Visit hotel website
                    </a>
                  </div>
                )}

                {hotel.email && (
                  <div>
                    <Check size={17} />
                    <span>{hotel.email}</span>
                  </div>
                )}

                {hotel.phone && (
                  <div>
                    <Check size={17} />
                    <span>{hotel.phone}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Amenities */}
            {amenities.length > 0 && (
              <section className="hotel-section">
                <div className="hotel-section-heading">
                  <h2>What this hotel offers</h2>
                </div>

                <div className="hotel-amenities-grid">
                  {amenities.map((amenity, index) => {
                    const name =
                      typeof amenity === "string"
                        ? amenity
                        : amenity.name || amenity.title;

                    if (!name) return null;

                    const Icon =
                      amenityIcons[name.toLowerCase()] || Check;

                    return (
                      <div className="hotel-amenity" key={`${name}-${index}`}>
                        <Icon size={21} />
                        <span>{name}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Check-in information */}
            {(hotel.checkIn || hotel.checkOut) && (
              <section className="hotel-section">
                <div className="hotel-section-heading">
                  <h2>Check-in and check-out</h2>
                </div>

                <div className="hotel-rules-grid">
                  {hotel.checkIn && (
                    <div>
                      <Clock size={20} />
                      <section>
                        <strong>Check-in</strong>
                        <p>{hotel.checkIn}</p>
                      </section>
                    </div>
                  )}

                  {hotel.checkOut && (
                    <div>
                      <Clock size={20} />
                      <section>
                        <strong>Check-out</strong>
                        <p>{hotel.checkOut}</p>
                      </section>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Location */}
            <section className="hotel-section">
              <div className="hotel-section-heading">
                <h2>Location</h2>
              </div>

              <div className="hotel-location">
                <div className="hotel-location-icon">
                  <MapPin size={22} />
                </div>

                <div>
                  <strong>{location || "Location not provided"}</strong>
                  <p>{hotel.address || "No address provided."}</p>
                </div>
              </div>

              {hotel.latitude && hotel.longitude && (
                <div className="hotel-map-placeholder">
                  <MapPin size={30} />
                  <a
                    href={`https://www.google.com/maps?q=${hotel.latitude},${hotel.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View location on Google Maps
                  </a>
                </div>
              )}
            </section>

          </div>

          {/* Booking card */}
          <aside className="hotel-booking-sidebar">
            <div className="hotel-booking-card">

              <div className="booking-price">
                <div>
                  <strong>{formatPrice(hotel.price)}</strong>
                  <span>/ night</span>
                </div>

                {hotel.starRating && (
                  <span className="booking-rating">
                    <Star size={14} fill="currentColor" />
                    {hotel.starRating}
                  </span>
                )}
              </div>

              <div className="booking-inputs">

                <div className="booking-date-input">
                  <label htmlFor="checkin">Check-in</label>

                  <div>
                    <CalendarDays size={17} />

                    <input
                      id="checkin"
                      type="date"
                      value={checkIn}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => {
                        setCheckIn(e.target.value);

                        if (
                          checkOut &&
                          e.target.value >= checkOut
                        ) {
                          setCheckOut("");
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="booking-date-input">
                  <label htmlFor="checkout">Check-out</label>

                  <div>
                    <CalendarDays size={17} />

                    <input
                      id="checkout"
                      type="date"
                      value={checkOut}
                      min={checkIn || new Date().toISOString().split("T")[0]}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>

                <div className="booking-guests">
                  <div>
                    <Users size={18} />
                    <span>Guests</span>
                  </div>

                  <div className="guest-counter">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                      aria-label="Remove guest"
                    >
                      <Minus size={15} />
                    </button>

                    <strong>{guests}</strong>

                    <button
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      disabled={guests >= 10}
                      aria-label="Add guest"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

              </div>

              <button
                className="hotel-book-now-button"
                onClick={handleBooking}
                disabled={!hotel.price}
              >
                Reserve this hotel
              </button>

              <p className="booking-note">
                You won't be charged yet.
              </p>

              <div className="booking-benefits">
                {hotel.verified && (
                  <div>
                    <ShieldCheck size={17} />
                    <span>Verified property</span>
                  </div>
                )}

                <div>
                  <Check size={17} />
                  <span>Secure reservation process</span>
                </div>
              </div>

              <div className="booking-help">
                <strong>Need help booking?</strong>
                <p>Our support team is available to assist you.</p>
                <Link href="/pages/contact">Contact support</Link>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
