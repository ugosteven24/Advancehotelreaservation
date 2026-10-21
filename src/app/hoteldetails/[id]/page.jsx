"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import {
  ArrowLeft,
  MapPin,
  Star,
  ShieldCheck,
  Wifi,
  Coffee,
  Waves,
  Utensils,
  Dumbbell,
  Wind,
  Clock,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  LoaderCircle,
  CalendarDays,
  ChevronRight,
  Hotel as HotelIcon,
} from "lucide-react";
import { db } from "@/firebase/firebase";
import Menu from "./menu";
const amenityIcons = {
  wifi: Wifi,
  "free breakfast": Coffee,
  breakfast: Coffee,
  restaurant: Utensils,
  "swimming pool": Waves,
  pool: Waves,
  gym: Dumbbell,
  "air conditioning": Wind,
  spa: Waves,
};
import "./hotels.css";
function formatPrice(price) {
  if (
    price === undefined ||
    price === null ||
    price === "" ||
    !Number.isFinite(Number(price))
  ) {
    return null;
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

export default function HotelDetailsPage({ params }) {
  const { id } = use(params);

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchHotel() {
      setLoading(true);
      setError("");
      setHotel(null);

      try {
        let hotelData = null;

        // First, try the Firestore document ID.
        const hotelRef = doc(db, "hotels", id);
        const hotelSnapshot = await getDoc(hotelRef);

        if (hotelSnapshot.exists()) {
          hotelData = {
            ...hotelSnapshot.data(),
            documentId: hotelSnapshot.id,
          };
        } else if (id.trim() !== "" && Number.isFinite(Number(id))) {
          // If the URL uses the custom numeric hotel ID, search by it.
          const hotelsQuery = query(
            collection(db, "hotels"),
            where("id", "==", Number(id)),
            limit(1)
          );

          const result = await getDocs(hotelsQuery);

          if (!result.empty) {
            const hotelDoc = result.docs[0];

            hotelData = {
              ...hotelDoc.data(),
              documentId: hotelDoc.id,
            };
          }
        }

        if (!cancelled) {
          if (!hotelData) {
            setError("We couldn't find this hotel.");
          } else {
            setHotel(hotelData);
            setActiveImage(hotelData.coverImage || "");
          }
        }
      } catch (err) {
        console.error("Failed to load hotel details:", err);

        if (!cancelled) {
          setError("Unable to load this hotel. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchHotel();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (



      <>
       
        <main className="hotel-loading">
          <div className="hotel-loading__content">
            <div className="skeleton skeleton--breadcrumb"></div>
            <div className="skeleton skeleton--image"></div>
            <div className="skeleton skeleton--title"></div>
            <div className="skeleton skeleton--subtitle"></div>
            <div className="skeleton skeleton--details"></div>
          </div>
        </main>
      </>

    );
  }

  if (error || !hotel) {
    return (
      <main className="hotel-not-found">
        <div className="hotel-not-found__content">
          <div className="hotel-not-found__icon">
            <HotelIcon size={30} />
          </div>

          <h1 className="hotel-not-found__title">
            Hotel not found
          </h1>

          <p className="hotel-not-found__message">
            {error ||
              "This hotel may have been removed or the link may be incorrect."}
          </p>

          <Link href="/hotels" className="hotel-not-found__button">
            <ArrowLeft size={17} />
            Browse hotels
          </Link>
        </div>
      </main>
    );
  }

  const gallery = Array.isArray(hotel.galleryImages)
    ? hotel.galleryImages.filter(Boolean)
    : [];

  const images = [
    ...new Set([hotel.coverImage, ...gallery].filter(Boolean)),
  ];

  const amenities = Array.isArray(hotel.amenities)
    ? hotel.amenities
    : [];

  const price = formatPrice(hotel.price);

  const location = [
    hotel.city,
    hotel.state,
    hotel.country,
  ]
    .filter(Boolean)
    .filter((value, index, array) => array.indexOf(value) === index)
    .join(", ");

  const hotelUrlId = hotel.id ?? hotel.documentId;

  return (

    <>
     <Menu />
      <main className="hotel-details-page">
        {/* Top navigation */}
 
        <div className="hotel-details-container">
          {/* Breadcrumb */}
          <div className="hotel-breadcrumb">
            <Link href="/" className="hotel-breadcrumb__link">Home</Link>
            <ChevronRight size={15} />
            <Link href="/hotels" className="hotel-breadcrumb__link">Hotels</Link>
            <ChevronRight size={15} />
            <span className="hotel-breadcrumb__current">
              {hotel.hotelName || "Hotel details"}
            </span>
          </div>

          {/* Hotel heading */}
          <section className="hotel-heading">
            <div className="hotel-heading__info">
              <div className="hotel-badges">
                {hotel.featured && (
                  <span className="hotel-badge hotel-badge--featured">
                    Featured hotel
                  </span>
                )}

                {hotel.verified && (
                  <span className="hotel-badge hotel-badge--verified">
                    <ShieldCheck size={14} />
                    Verified property
                  </span>
                )}
              </div>

              <h1 className="hotel-heading__title">
                {hotel.hotelName || "Unnamed hotel"}
              </h1>

              <div className="hotel-heading__meta">
                <span className="hotel-meta-item">
                  <MapPin size={17} className="hotel-muted-icon" />
                  {location || hotel.address || "Location unavailable"}
                </span>

                {hotel.starRating && (
                  <span className="hotel-meta-item">
                    <Star size={16} className="hotel-star-icon" />
                    {hotel.starRating}
                  </span>
                )}
              </div>

              {hotel.address && (
                <p className="hotel-address">
                  {hotel.address}
                  {hotel.zipCode ? `, ${hotel.zipCode}` : ""}
                </p>
              )}
            </div>

            <div className="hotel-photo-count">
              <span>
                {images.length} {images.length === 1 ? "photo" : "photos"}
              </span>
            </div>
          </section>

          {/* Main photo gallery */}
          <section className="hotel-gallery-section">
            {images.length > 0 ? (
              <div className="hotel-gallery">
                <button
                  type="button"
                  onClick={() => setActiveImage(images[0])}
                  className="hotel-gallery__main"
                  aria-label="View main hotel photo"
                >
                  <img
                    src={activeImage || images[0]}
                    alt={hotel.hotelName || "Hotel"}
                    className="hotel-gallery__main-image"
                  />

                  <span className="hotel-gallery__label">Main photo</span>
                </button>

                <div className="hotel-gallery__side">
                  {[0, 1, 2, 3].map((index) => {
                    const image = images[index + 1];

                    return (
                      <button
                        key={image || `empty-${index}`}
                        type="button"
                        disabled={!image}
                        onClick={() => image && setActiveImage(image)}
                        className="hotel-gallery__tile"
                        aria-label={`View hotel photo ${index + 2}`}
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={`${hotel.hotelName || "Hotel"} photo ${index + 2}`}
                            className="hotel-gallery__tile-image"
                          />
                        ) : (
                          <div className="hotel-gallery__empty">
                            <HotelIcon size={28} />
                          </div>
                        )}

                        {index === 3 && images.length > 5 && (
                          <span className="hotel-gallery__more">
                            +{images.length - 5} more photos
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="hotel-gallery-empty">
                <HotelIcon size={42} />
                <p>No hotel photos available</p>
              </div>
            )}

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="hotel-thumbnails">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={`hotel-thumbnail ${activeImage === image ? "hotel-thumbnail--active" : ""
                      }`}
                    aria-label={`Select photo ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`Hotel thumbnail ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Details and booking sidebar */}
          <div className="hotel-details-layout">
            <div className="hotel-details-main">
              {/* Description */}
              <section className="hotel-card">
                <h2 className="hotel-card__title">About this hotel</h2>

                <p className="hotel-description">
                  {hotel.description ||
                    "No description has been added for this property yet."}
                </p>

                {hotel.category && (
                  <div className="hotel-category">
                    <p className="hotel-category__label">Property category</p>
                    <p className="hotel-category__value">{hotel.category}</p>
                  </div>
                )}
              </section>

              {/* Amenities */}
              <section className="hotel-card">
                <h2 className="hotel-card__title">Hotel amenities</h2>

                {amenities.length > 0 ? (
                  <div className="hotel-amenities">
                    {amenities.map((amenity, index) => {
                      const key = String(amenity);
                      const Icon =
                        amenityIcons[key.toLowerCase()] || CheckCircle;

                      return (
                        <div
                          key={`${key}-${index}`}
                          className="hotel-amenity"
                        >
                          <span className="hotel-amenity__icon">
                            <Icon size={19} />
                          </span>
                          <span className="hotel-amenity__name">{key}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="hotel-empty-message">
                    Amenities have not been listed yet.
                  </p>
                )}
              </section>

              {/* Check-in information */}
              <section className="hotel-card">
                <h2 className="hotel-card__title">
                  Check-in and check-out
                </h2>

                <div className="hotel-check-times">
                  <div className="hotel-check-time">
                    <div className="hotel-check-time__label">
                      <CalendarDays size={17} />
                      Check-in
                    </div>
                    <p className="hotel-check-time__value">
                      {hotel.checkIn || "Contact hotel"}
                    </p>
                  </div>

                  <div className="hotel-check-time">
                    <div className="hotel-check-time__label">
                      <Clock size={17} />
                      Check-out
                    </div>
                    <p className="hotel-check-time__value">
                      {hotel.checkOut || "Contact hotel"}
                    </p>
                  </div>
                </div>

                {hotel.cancellationPolicy && (
                  <div className="hotel-cancellation">
                    <h3>Cancellation policy</h3>
                    <p>{hotel.cancellationPolicy}</p>
                  </div>
                )}
              </section>

              {/* Contact */}
              <section className="hotel-card">
                <h2 className="hotel-card__title">Contact information</h2>

                <div className="hotel-contact-list">
                  {hotel.phone && (
                    <a
                      href={`tel:${hotel.phone}`}
                      className="hotel-contact-link"
                    >
                      <Phone size={18} />
                      {hotel.phone}
                    </a>
                  )}

                  {hotel.email && (
                    <a
                      href={`mailto:${hotel.email}`}
                      className="hotel-contact-link hotel-contact-link--break"
                    >
                      <Mail size={18} />
                      {hotel.email}
                    </a>
                  )}

                  {hotel.website && (
                    <a
                      href={
                        /^https?:\/\//i.test(hotel.website)
                          ? hotel.website
                          : `https://${hotel.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hotel-contact-link hotel-contact-link--break"
                    >
                      <Globe size={18} />
                      {hotel.website}
                    </a>
                  )}

                  {!hotel.phone && !hotel.email && !hotel.website && (
                    <p className="hotel-empty-message">
                      Contact information is not available.
                    </p>
                  )}
                </div>
              </section>
            </div>

            {/* Booking card */}
            <aside className="hotel-booking-sidebar">
              <div className="hotel-booking-card">
                <p className="hotel-booking-card__label">Price per night</p>

                {price ? (
                  <div className="hotel-booking-price">
                    <span className="hotel-booking-price__amount">{price}</span>
                    <span className="hotel-booking-price__period">/ night</span>
                  </div>
                ) : (
                  <p className="hotel-booking-card__no-price">
                    Contact for price
                  </p>
                )}

                <div className="hotel-booking-divider" />

                <div className="hotel-booking-facts">
                  <div className="hotel-booking-fact">
                    <MapPin size={18} className="hotel-booking-fact__icon" />
                    <div>
                      <p className="hotel-booking-fact__title">Location</p>
                      <p className="hotel-booking-fact__description">
                        {location || hotel.address || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {hotel.verified && (
                    <div className="hotel-booking-fact hotel-booking-fact--inline">
                      <ShieldCheck
                        size={18}
                        className="hotel-verified-icon"
                      />
                      <span>Verified property</span>
                    </div>
                  )}

                  {hotel.starRating && (
                    <div className="hotel-booking-fact hotel-booking-fact--inline">
                      <Star size={18} className="hotel-star-icon" />
                      <span>{hotel.starRating}</span>
                    </div>
                  )}
                </div>

                <Link
                  href={`/hotels/${hotelUrlId}/book`}
                  className="hotel-booking-button"
                >
                  Check availability
                  <ChevronRight size={18} />
                </Link>

                <p className="hotel-booking-note">
                  Confirm your dates and room details before booking.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>

  );
}
