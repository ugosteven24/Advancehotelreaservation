
"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { db } from "@/firebase/firebase";
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
  MapPin,
  Star,
  Heart,
  Search,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Globe,
  Clock,
  Compass,
  Plane,
  ShieldCheck,
} from "lucide-react";

import "./destination.css";

const HOTEL_LIMIT = 60;

function getRating(value) {
  if (typeof value === "number") return value;

  const match = String(value || "").match(/\d+(\.\d+)?/);

  return match ? Number(match[0]) : 0;
}

function formatPrice(value) {
  const price = Number(value);

  if (!Number.isFinite(price) || price <= 0) {
    return "Price unavailable";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeHotel(document) {
  const data = document.data();

  const galleryImages = safeArray(data.galleryImages);

  return {
    id: document.id,

    name: data.hotelName || "Unnamed hotel",

    image:
      data.coverImage ||
      galleryImages.find(
        (image) => typeof image === "string" && image.trim()
      ) ||
      "",

    location: [
      data.city,
      data.state,
      data.country,
    ]
      .filter(Boolean)
      .join(", "),

    city: data.city || "",
    state: data.state || "",
    country: data.country || "",

    price: Number(data.price) || 0,

    rating: getRating(data.starRating),

    reviews: Number(data.reviewCount) || 0,

    category: data.category || "",

    amenities: safeArray(data.amenities),

    verified: data.verified === true,

    featured: data.featured === true,

    status: String(data.status || "").toLowerCase(),
  };
}

function normalizeDestination(data, id) {
  return {
    id,

    name: data.name || data.city || data.state || "Destination",

    slug: data.slug || id,

    country: data.country || "",
    state: data.state || "",
    city: data.city || "",

    description: data.description || "",
    overview: data.overview || "",

    coverImage: data.coverImage || "",

    galleryImages: safeArray(data.galleryImages),

    bestTimeToVisit: data.bestTimeToVisit || "",

    currency: data.currency || "",

    language: safeArray(data.language),

    timezone: data.timezone || "",

    popularAreas: safeArray(data.popularAreas),

    attractions: safeArray(data.attractions),

    travelTips: safeArray(data.travelTips),

    faqs: safeArray(data.faqs),

    featured: data.featured === true,
  };
}

// Destination document is identified by its slug.
function normalizeSlug(value) {
  return String(value || "").trim().toLowerCase();
}

function DestinationDetailsContent() {
  const searchParams = useSearchParams();

  const destinationSlug = normalizeSlug(
    searchParams.get("destination")
  );

  const [destination, setDestination] = useState(null);

  const [hotels, setHotels] = useState([]);

  const [loading, setLoading] = useState(true);

  const [hotelLoading, setHotelLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [maxPrice, setMaxPrice] = useState("all");

  const [minRating, setMinRating] = useState("all");

  const [sortBy, setSortBy] = useState("recommended");

  const [favorites, setFavorites] = useState([]);

  const [openFaq, setOpenFaq] = useState(0);

  // ----------------------------------------
  // LOAD DESTINATION
  // ----------------------------------------

const loadDestination = useCallback(async () => {
  if (!destinationSlug) {
    setDestination(null);
    setError("No destination was specified.");
    setLoading(false);
    return null;
  }

  setLoading(true);
  setError("");

  try {
    const destinationRef = doc(
      db,
      "destinations",
      destinationSlug
    );

    const snapshot = await getDoc(destinationRef);

    if (!snapshot.exists()) {
      setDestination(null);
      setError("This destination could not be found.");
      return null;
    }

    const destinationData = normalizeDestination(
      snapshot.data(),
      snapshot.id
    );

    setDestination(destinationData);

    return destinationData;

  } catch (err) {
    console.error("Destination fetch error:", err);

    setDestination(null);
    setError("Unable to load destination information.");

    return null;

  } finally {
    setLoading(false);
  }
}, [destinationSlug]);

  // ----------------------------------------
  // LOAD HOTELS
  // ----------------------------------------

  const loadHotels = useCallback(async (destinationData) => {
    setHotelLoading(true);

    try {
      const hotelsRef = collection(db, "hotels");

      let hotelQuery;

      // Search by city first.
      if (destinationData.city) {
        hotelQuery = query(
          hotelsRef,
          where("city", "==", destinationData.city),
          limit(HOTEL_LIMIT)
        );
      }

      // If no city exists, search by state.
      else if (destinationData.state) {
        hotelQuery = query(
          hotelsRef,
          where("state", "==", destinationData.state),
          limit(HOTEL_LIMIT)
        );
      }

      // Fallback to destination name.
      else if (destinationData.name) {
        hotelQuery = query(
          hotelsRef,
          where("city", "==", destinationData.name),
          limit(HOTEL_LIMIT)
        );
      }

      if (!hotelQuery) {
        setHotels([]);
        return;
      }

      const snapshot = await getDocs(hotelQuery);

      const hotelResults = snapshot.docs
        .map(normalizeHotel)
        .filter((hotel) => hotel.status !== "inactive");

      setHotels(hotelResults);

    } catch (err) {
      console.error("Hotel fetch error:", err);

      setHotels([]);
    } finally {
      setHotelLoading(false);
    }
  }, []);

  // ----------------------------------------
  // INITIALIZE PAGE
  // ----------------------------------------

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      setHotels([]);
      setDestination(null);
      setHotelLoading(true);

      const destinationData = await loadDestination();

      if (cancelled) return;

      if (destinationData) {
        await loadHotels(destinationData);
      } else {
        setHotelLoading(false);
      }
    }

    initialize();

    return () => {
      cancelled = true;
    };
  }, [loadDestination, loadHotels]);

  // ----------------------------------------
  // RESTORE FAVORITES
  // ----------------------------------------

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        "hotel-resort-favorites"
      );

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((previous) => {
      const updated = previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id];

      try {
        localStorage.setItem(
          "hotel-resort-favorites",
          JSON.stringify(updated)
        );
      } catch (err) {
        console.error("Unable to save favorites:", err);
      }

      return updated;
    });
  };

  // ----------------------------------------
  // FILTER, SEARCH AND SORT HOTELS
  // ----------------------------------------

  const filteredHotels = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    let result = hotels.filter((hotel) => {
      const matchesSearch =
        !searchValue ||
        hotel.name.toLowerCase().includes(searchValue) ||
        hotel.location.toLowerCase().includes(searchValue) ||
        hotel.category.toLowerCase().includes(searchValue);

      const matchesPrice =
        maxPrice === "all" ||
        (hotel.price > 0 &&
          hotel.price <= Number(maxPrice));

      const matchesRating =
        minRating === "all" ||
        hotel.rating >= Number(minRating);

      return (
        matchesSearch &&
        matchesPrice &&
        matchesRating
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "featured") {
      result.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured)
      );
    }

    return result;
  }, [hotels, search, maxPrice, minRating, sortBy]);

  const heroImage =
    destination?.coverImage ||
    destination?.galleryImages?.[0] ||
    "";

  // ----------------------------------------
  // LOADING
  // ----------------------------------------

  if (loading) {
    return (
      <main className="destination-state">
        <div className="destination-spinner" />
        <p>Loading destination...</p>
      </main>
    );
  }

  // ----------------------------------------
  // ERROR
  // ----------------------------------------

  if (error || !destination) {
    return (
      <main className="destination-state">
        <h2>Destination unavailable</h2>

        <p>
          {error || "We could not find this destination."}
        </p>

        <Link href="/pages/destinations">
          Browse destinations <ArrowRight size={17} />
        </Link>
      </main>
    );
  }

  // ----------------------------------------
  // PAGE
  // ----------------------------------------

  return (
    <main className="destination-page">

      {/* HERO */}

      <section
        className="destination-hero"
        style={
          heroImage
            ? { backgroundImage: `url("${heroImage}")` }
            : undefined
        }
      >
        <div className="destination-hero__overlay" />

        <div className="destination-hero__content">

          <div className="destination-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/pages/destinations">Destinations</Link>
            <span>/</span>
            <span>{destination.name}</span>
          </div>

          <span className="destination-eyebrow">
            <MapPin size={15} />
            DESTINATION GUIDE
          </span>

          <h1>{destination.name}</h1>

          <p>
            {destination.description ||
              `Discover accommodation, attractions and experiences in ${destination.name}.`}
          </p>

          <div className="destination-hero__meta">

            {destination.state && (
              <span>
                <MapPin size={17} />
                {destination.state}
              </span>
            )}

            {destination.country && (
              <span>
                <Globe size={17} />
                {destination.country}
              </span>
            )}

          </div>

          <a
            href="#destination-hotels"
            className="destination-primary-btn"
          >
            Explore hotels <ArrowRight size={18} />
          </a>

        </div>

        <div className="destination-hero__bottom">

          <div>
            <strong>{hotels.length}</strong>
            <span>Hotels found</span>
          </div>

          <div>
            <strong>{destination.popularAreas.length}</strong>
            <span>Popular areas</span>
          </div>

          <div>
            <strong>{destination.attractions.length}</strong>
            <span>Attractions</span>
          </div>

        </div>
      </section>

      {/* OVERVIEW */}

      {(destination.overview || destination.description) && (
        <section className="destination-section destination-overview">

          <div className="destination-overview__text">

            <span className="section-eyebrow">
              GET TO KNOW THE DESTINATION
            </span>

            <h2>Discover {destination.name}</h2>

            <p>
              {destination.overview || destination.description}
            </p>

            <a href="#destination-hotels" className="text-link">
              Find a place to stay <ArrowRight size={17} />
            </a>

          </div>

          {heroImage && (
            <div className="destination-overview__image">

              <img src={heroImage} alt={destination.name} />

              <div className="overview-image-caption">
                <MapPin size={17} />

                <span>
                  {[destination.name, destination.country]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>

            </div>
          )}

        </section>
      )}

      {/* GALLERY */}

      {destination.galleryImages.length > 0 && (
        <section className="destination-section destination-gallery">

          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                PHOTO GALLERY
              </span>

              <h2>Explore {destination.name}</h2>
            </div>
          </div>

          <div className="destination-gallery-grid">

            {destination.galleryImages.map((image, index) => (
              typeof image === "string" && image.trim() ? (
                <div key={`${image}-${index}`}>
                  <img
                    src={image}
                    alt={`${destination.name} ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ) : null
            ))}

          </div>

        </section>
      )}

      {/* HOTELS */}

      <section
        className="destination-section destination-hotels"
        id="destination-hotels"
      >

        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              FIND YOUR STAY
            </span>

            <h2>Hotels in {destination.name}</h2>

            <p>
              Compare accommodation options for your visit.
            </p>
          </div>
        </div>

        <div className="hotel-search-panel">

          <div className="hotel-search-input">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search hotel or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hotel-filter-control">
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            >
              <option value="all">Any price</option>
              <option value="50000">Up to ₦50,000</option>
              <option value="80000">Up to ₦80,000</option>
              <option value="100000">Up to ₦100,000</option>
              <option value="150000">Up to ₦150,000</option>
            </select>
          </div>

          <div className="hotel-filter-control">
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            >
              <option value="all">Any rating</option>
              <option value="3">3 stars and above</option>
              <option value="4">4 stars and above</option>
              <option value="5">5 stars</option>
            </select>
          </div>

          <div className="hotel-filter-control">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>

        </div>

        {hotelLoading ? (
          <div className="destination-loading-inline">
            <div className="destination-spinner" />
            <p>Loading hotels...</p>
          </div>
        ) : (
          <>

            <div className="destination-hotel-count">
              Showing {filteredHotels.length} of {hotels.length} hotels
            </div>

            <div className="destination-hotel-grid">

              {filteredHotels.map((hotel) => (
                <article
                  className="destination-hotel-card"
                  key={hotel.id}
                >

                  <div className="destination-hotel-card__image">

                    {hotel.image ? (
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="destination-image-placeholder">
                        No image available
                      </div>
                    )}

                    {hotel.featured && (
                      <span className="hotel-card-badge">
                        Featured
                      </span>
                    )}

                    <button
                      type="button"
                      className={`hotel-favorite ${
                        favorites.includes(hotel.id)
                          ? "is-favorite"
                          : ""
                      }`}
                      onClick={() => toggleFavorite(hotel.id)}
                      aria-label={
                        favorites.includes(hotel.id)
                          ? "Remove from favourites"
                          : "Add to favourites"
                      }
                    >
                      <Heart
                        size={19}
                        fill={
                          favorites.includes(hotel.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                  </div>

                  <div className="destination-hotel-card__body">

                    <div className="hotel-card-title">

                      <h3>{hotel.name}</h3>

                      {hotel.rating > 0 && (
                        <span className="hotel-rating">
                          <Star size={14} fill="currentColor" />
                          {hotel.rating}
                        </span>
                      )}

                    </div>

                    <p className="hotel-location">
                      <MapPin size={15} />
                      {hotel.location || "Location unavailable"}
                    </p>

                    {hotel.verified && (
                      <span className="hotel-verified">
                        <ShieldCheck size={14} />
                        Verified property
                      </span>
                    )}

                    <div className="hotel-amenities">
                      {hotel.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={`${amenity}-${index}`}>
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="hotel-card-footer">

                      <div className="hotel-price">
                        <strong>{formatPrice(hotel.price)}</strong>
                        <span>per night</span>
                      </div>

                      <Link
                        href={`/pages/hoteldetails/${encodeURIComponent(hotel.id)}`}
                      >
                        View hotel <ArrowUpRight size={16} />
                      </Link>

                    </div>

                  </div>

                </article>
              ))}

            </div>

            {filteredHotels.length === 0 && (
              <div className="destination-no-hotels">

                <Search size={28} />

                <h3>No hotels found</h3>

                <p>
                  There are no matching hotels for this destination.
                  Try changing your filters.
                </p>

              </div>
            )}

          </>
        )}

      </section>

      {/* POPULAR AREAS */}

      {destination.popularAreas.length > 0 && (
        <section className="destination-section">

          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                EXPLORE THE AREA
              </span>

              <h2>Popular areas in {destination.name}</h2>

              <p>
                Discover neighbourhoods around this destination.
              </p>
            </div>
          </div>

          <div className="destination-area-grid">

            {destination.popularAreas.map((area, index) => {
              const name =
                typeof area === "string" ? area : area.name;

              const image =
                typeof area === "object" && area
                  ? area.image
                  : "";

              const description =
                typeof area === "object" && area
                  ? area.description
                  : "";

              return (
                <Link
                  href={`/pages/search?destination=${encodeURIComponent(
                    destination.name
                  )}&area=${encodeURIComponent(name || "")}`}
                  className="destination-area-card"
                  key={`${name}-${index}`}
                >

                  {image ? (
                    <img src={image} alt={name} loading="lazy" />
                  ) : (
                    <div className="destination-image-placeholder">
                      {name}
                    </div>
                  )}

                  <div className="destination-area-card__overlay">
                    <div>
                      <h3>{name}</h3>
                      <p>{description}</p>
                    </div>

                    <ArrowUpRight size={22} />
                  </div>

                </Link>
              );
            })}

          </div>

        </section>
      )}

      {/* ATTRACTIONS */}

      {destination.attractions.length > 0 && (
        <section className="destination-section destination-attractions">

          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                THINGS TO DO
              </span>

              <h2>Places to explore</h2>

              <p>
                Discover attractions in {destination.name}.
              </p>
            </div>
          </div>

          <div className="destination-attraction-grid">

            {destination.attractions.map((attraction, index) => {
              const name =
                typeof attraction === "string"
                  ? attraction
                  : attraction.name;

              const image =
                typeof attraction === "object" && attraction
                  ? attraction.image
                  : "";

              const description =
                typeof attraction === "object" && attraction
                  ? attraction.description
                  : "";

              const category =
                typeof attraction === "object" && attraction
                  ? attraction.category
                  : "";

              const address =
                typeof attraction === "object" && attraction
                  ? attraction.address
                  : "";

              return (
                <article
                  className="destination-attraction-card"
                  key={`${name}-${index}`}
                >

                  <div className="attraction-image">
                    {image ? (
                      <img src={image} alt={name} loading="lazy" />
                    ) : (
                      <div className="destination-image-placeholder">
                        {name}
                      </div>
                    )}
                  </div>

                  <div className="attraction-content">

                    {category && <span>{category}</span>}

                    <h3>{name}</h3>

                    <p>{description}</p>

                    {address && (
                      <small className="attraction-address">
                        <MapPin size={14} />
                        {address}
                      </small>
                    )}

                    {name && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${name}, ${destination.name}, ${destination.country}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Explore location <ArrowUpRight size={16} />
                      </a>
                    )}

                  </div>

                </article>
              );
            })}

          </div>

        </section>
      )}

      {/* TRAVEL INFORMATION */}

      <section className="destination-section destination-travel">

        <div className="destination-travel__intro">
          <span className="section-eyebrow">
            PLAN YOUR VISIT
          </span>

          <h2>Travel information</h2>

          <p>
            Useful information before visiting {destination.name}.
          </p>
        </div>

        <div className="destination-travel-grid">

          {destination.country && (
            <div className="travel-info-card">
              <div className="travel-icon">
                <Globe />
              </div>

              <div>
                <span>Country</span>
                <strong>{destination.country}</strong>
              </div>
            </div>
          )}

          {destination.timezone && (
            <div className="travel-info-card">
              <div className="travel-icon">
                <Clock />
              </div>

              <div>
                <span>Time zone</span>
                <strong>{destination.timezone}</strong>
              </div>
            </div>
          )}

          {destination.currency && (
            <div className="travel-info-card">
              <div className="travel-icon">
                <Compass />
              </div>

              <div>
                <span>Currency</span>
                <strong>{destination.currency}</strong>
              </div>
            </div>
          )}

          {destination.language.length > 0 && (
            <div className="travel-info-card">
              <div className="travel-icon">
                <Globe />
              </div>

              <div>
                <span>Language</span>
                <strong>
                  {destination.language.join(", ")}
                </strong>
              </div>
            </div>
          )}

          {destination.bestTimeToVisit && (
            <div className="travel-info-card">
              <div className="travel-icon">
                <Plane />
              </div>

              <div>
                <span>Best time to visit</span>
                <strong>{destination.bestTimeToVisit}</strong>
              </div>
            </div>
          )}

        </div>

      </section>

      {/* TRAVEL TIPS */}

      {destination.travelTips.length > 0 && (
        <section className="destination-section destination-tips">

          <div>
            <span className="section-eyebrow">
              TRAVEL SMARTER
            </span>

            <h2>Travel tips</h2>
          </div>

          <div className="destination-tips-grid">

            {destination.travelTips.map((tip, index) => {
              const title =
                typeof tip === "string"
                  ? `Tip ${index + 1}`
                  : tip.title;

              const description =
                typeof tip === "string"
                  ? tip
                  : tip.description;

              return (
                <div key={index}>
                  <ShieldCheck size={22} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              );
            })}

          </div>

        </section>
      )}

      {/* FAQ */}

      {destination.faqs.length > 0 && (
        <section className="destination-section destination-faq">

          <div className="destination-faq__intro">
            <span className="section-eyebrow">
              NEED TO KNOW?
            </span>

            <h2>Frequently asked questions</h2>

            <p>
              Answers to common questions about this destination.
            </p>
          </div>

          <div className="faq-list">

            {destination.faqs.map((faq, index) => {
              const question =
                typeof faq === "string"
                  ? faq
                  : faq.question;

              const answer =
                typeof faq === "string"
                  ? ""
                  : faq.answer;

              return (
                <div
                  className="faq-item"
                  key={`${question}-${index}`}
                >

                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(openFaq === index ? -1 : index)
                    }
                  >
                    <span>{question}</span>

                    {openFaq === index ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>

                  {openFaq === index && answer && (
                    <p className="faq-answer">
                      {answer}
                    </p>
                  )}

                </div>
              );
            })}

          </div>

        </section>
      )}

      {/* CTA */}

      <section className="destination-cta">

        <div>
          <span>YOUR NEXT TRIP STARTS HERE</span>

          <h2>
            Ready to discover {destination.name}?
          </h2>

          <p>
            Find accommodation for your next visit.
          </p>
        </div>

        <a href="#destination-hotels">
          Find your hotel <ArrowRight size={18} />
        </a>

      </section>

    </main>
  );
}

// useSearchParams should be wrapped in Suspense for production builds.
export default function DestinationDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="destination-state">
          <div className="destination-spinner" />
          <p>Loading destination...</p>
        </main>
      }
    >
      <DestinationDetailsContent />
    </Suspense>
  );
}
