
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  Heart,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  Waves,
  Wifi,
  Utensils,
  Dumbbell,
  ShieldCheck,
  Headset,
  Star,
  X,
} from "lucide-react";

import "./resorts.css";

const PAGE_SIZE = 12;

const amenityIcons = {
  Pool: Waves,
  Spa: Waves,
  WiFi: Wifi,
  Restaurant: Utensils,
  "Fitness Center": Dumbbell,
  "Beach Access": Waves,
};

function normalizeResort(data, id) {
  const location = [data.city, data.state, data.country]
    .filter(Boolean)
    .join(", ");

  const rawImages = Array.isArray(data.images) ? data.images : [];

  const image =
    rawImages
      .map((item) => (typeof item === "string" ? item : item?.url))
      .find(Boolean) ||
    data.image ||
    data.imageUrl ||
    data.photoURL ||
    data.coverImage
    "";

  return {
    id,
    name: data.name || data.title || "Unnamed resort",
    location: location || data.address || "Location unavailable",
    country: data.country || "",
    type: data.type || data.resortType || "",
    price: Number(
      data.pricePerNight ?? data.price ?? data.nightlyPrice ?? 0
    ),
    rating: Number(data.rating || 0),
    reviews: Number(data.reviews ?? data.reviewCount ?? 0),
    badge: data.badge || "",
    badgeType: data.badgeType || "",
    amenities: Array.isArray(data.amenities) ? data.amenities : [],
    image,
    status: String(data.status || "active").toLowerCase(),
  };
}

export default function ResortsPage() {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const [destination, setDestination] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const [maxPrice, setMaxPrice] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [types, setTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [favorites, setFavorites] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const observerRef = useRef(null);
  const loadingRef = useRef(false);
  const lastDocumentRef = useRef(null);
  const hasMoreRef = useRef(true);

  const [hasMore, setHasMore] = useState(true);

  // Fetch the first batch or the next batch from Firestore.
  const fetchResorts = useCallback(async (isInitial = false) => {
    if (loadingRef.current) return;
    if (!isInitial && !hasMoreRef.current) return;

    loadingRef.current = true;
    setError("");

    if (isInitial) {
      setLoading(true);
      lastDocumentRef.current = null;
      hasMoreRef.current = true;
      setHasMore(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const constraints = [limit(PAGE_SIZE)];

      if (!isInitial && lastDocumentRef.current) {
        constraints.unshift(startAfter(lastDocumentRef.current));
      }

      const resortsQuery = query(
        collection(db, "hotels"),
        ...constraints
      );

      const snapshot = await getDocs(resortsQuery);

      const results = snapshot.docs
        .map((document) =>
          normalizeResort(document.data(), document.id)
        )
        .filter((resort) => resort.status !== "inactive");

      setResorts((previous) => {
        if (isInitial) return results;

        // Prevent duplicates if a document appears in two batches.
        const existingIds = new Set(previous.map((item) => item.id));
        return [
          ...previous,
          ...results.filter((item) => !existingIds.has(item.id)),
        ];
      });

      if (snapshot.docs.length > 0) {
        lastDocumentRef.current =
          snapshot.docs[snapshot.docs.length - 1];
      }

      const moreAvailable = snapshot.docs.length === PAGE_SIZE;
      hasMoreRef.current = moreAvailable;
      setHasMore(moreAvailable);
    } catch (err) {
      console.error("Failed to load resorts:", err);
      setError("Unable to load resorts. Please try again.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchResorts(true);
  }, [fetchResorts]);

  // Automatically fetch the next batch when the sentinel enters view.
  useEffect(() => {
    const sentinel = observerRef.current;

    if (
      !sentinel ||
      loading ||
      loadingMore ||
      !hasMore ||
      error
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchResorts(false);
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [fetchResorts, loading, loadingMore, hasMore, error]);

  // Generate filter choices from records already fetched.
  const resortTypes = useMemo(
    () =>
      [...new Set(resorts.map((resort) => resort.type).filter(Boolean))]
        .sort(),
    [resorts]
  );

  const amenityOptions = useMemo(
    () =>
      [...new Set(resorts.flatMap((resort) => resort.amenities))]
        .filter(Boolean)
        .sort()
        .map((value) => ({
          value,
          label: value,
        })),
    [resorts]
  );

  const prices = resorts
    .map((resort) => resort.price)
    .filter((price) => Number.isFinite(price) && price > 0);

  const minPrice = prices.length
    ? Math.floor(Math.min(...prices))
    : 0;

  const highestPrice = prices.length
    ? Math.ceil(Math.max(...prices))
    : 0;

  const filteredResorts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const result = resorts.filter((resort) => {
      const matchesDestination =
        !term ||
        resort.name.toLowerCase().includes(term) ||
        resort.location.toLowerCase().includes(term) ||
        resort.country.toLowerCase().includes(term);

      const matchesPrice =
        maxPrice === null || resort.price <= maxPrice;

      const matchesRating =
        ratings.length === 0 ||
        ratings.some((rating) => resort.rating >= rating);

      const matchesType =
        types.length === 0 || types.includes(resort.type);

      const matchesAmenities = amenities.every((amenity) =>
        resort.amenities.includes(amenity)
      );

      return (
        matchesDestination &&
        matchesPrice &&
        matchesRating &&
        matchesType &&
        matchesAmenities
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [resorts, searchTerm, maxPrice, ratings, types, amenities, sortBy]);

  function toggleValue(value, values, setValues) {
    setValues((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value]
    );
  }

  function handleSearch(event) {
    event.preventDefault();
    setSearchTerm(destination);
  }

  function clearFilters() {
    setMaxPrice(null);
    setRatings([]);
    setTypes([]);
    setAmenities([]);
    setDestination("");
    setSearchTerm("");
  }

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <main className="resorts-page">
      <header className="resorts-header">
        <Link href="/" className="resorts-brand">
          <span className="brand-mark">
            <Waves size={25} />
          </span>
          <span>
            <strong>HotelReserve</strong>
            <small>Stay Better. Travel Further.</small>
          </span>
        </Link>

        <nav className="resorts-nav">
          <Link href="/">Home</Link>
          <Link href="/pages/resorts" className="active">Resorts</Link>
          <Link href="/pages/favorites" >
            Favorites
          </Link>
          <Link href="/pages/flights">Flights</Link>
          <Link href="/pages/destinations">Destinations</Link>
          <Link href="/pages/about">About</Link>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="header-icon"
            aria-label="Open search"
            onClick={() =>
              document
                .getElementById("resort-search")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Search size={20} />
          </button>

          <Link
            href="/favorites"
            className="header-icon"
            aria-label="Favorites"
          >
            <Heart size={20} />
            {favorites.length > 0 && (
              <span className="favorite-count">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link href="/login" className="signin-link">
            <Users size={18} />
            <span>Sign In / Register</span>
          </Link>

          <Link href="/my-bookings" className="bookings-button">
            My Bookings
          </Link>
        </div>
      </header>

      <section className="resort-hero">
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="hero-label">
            <Waves size={15} />
            Explore Resorts
          </span>

          <h1>
            Discover Your
            <br />
            Perfect Resort
          </h1>

          <p>
            Explore resort stays, compare prices, and find
            a destination that suits you.
          </p>
        </div>
      </section>

      <section className="resort-search-wrap" id="resort-search">
        <form className="resort-search" onSubmit={handleSearch}>
          <label className="search-field destination-field">
            <MapPin size={21} />
            <span>
              <strong>Destination</strong>
              <input
                type="text"
                placeholder="Search resort or destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              />
            </span>
          </label>

          <label className="search-field">
            <CalendarDays size={21} />
            <span>
              <strong>Check In</strong>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={checkIn}
                onChange={(event) => {
                  setCheckIn(event.target.value);

                  if (checkOut && event.target.value > checkOut) {
                    setCheckOut("");
                  }
                }}
              />
            </span>
          </label>

          <label className="search-field">
            <CalendarDays size={21} />
            <span>
              <strong>Check Out</strong>
              <input
                type="date"
                min={checkIn || new Date().toISOString().split("T")[0]}
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
              />
            </span>
          </label>

          <label className="search-field guests-field">
            <Users size={21} />
            <span>
              <strong>Guests</strong>
              <select
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
              </select>
            </span>
            <ChevronDown size={15} />
          </label>

          <button className="search-resorts-button" type="submit">
            <Search size={18} />
            Search Resorts
          </button>
        </form>
      </section>

      <section className="resorts-main">
        <button
          className="mobile-filter-toggle"
          type="button"
          onClick={() => setMobileFiltersOpen((previous) => !previous)}
        >
          {mobileFiltersOpen ? (
            <X size={18} />
          ) : (
            <SlidersHorizontal size={18} />
          )}
          {mobileFiltersOpen ? "Close Filters" : "Filters"}
        </button>

        <aside
          className={`resort-filters ${
            mobileFiltersOpen ? "filters-open" : ""
          }`}
        >
          <div className="filter-heading">
            <h2>
              <SlidersHorizontal size={17} />
              Filters
            </h2>
            <button type="button" onClick={clearFilters}>
              Clear all
            </button>
          </div>

          <div className="filter-section">
            <h3>Maximum price per night</h3>

            {prices.length > 0 ? (
              <>
                <input
                  className="price-slider"
                  type="range"
                  min={minPrice}
                  max={Math.max(highestPrice, minPrice + 1)}
                  step={1}
                  value={maxPrice ?? highestPrice}
                  onChange={(event) =>
                    setMaxPrice(Number(event.target.value))
                  }
                  aria-label="Maximum price per night"
                />

                <div className="price-labels">
                  <span>{minPrice.toLocaleString()}</span>
                  <strong>
                    {(maxPrice ?? highestPrice).toLocaleString()} max
                  </strong>
                </div>
              </>
            ) : (
              <p>No prices available</p>
            )}
          </div>

          <div className="filter-section">
            <h3>Minimum Star Rating</h3>

            {[5, 4, 3, 2, 1].map((rating) => (
              <label className="filter-option" key={rating}>
                <input
                  type="checkbox"
                  checked={ratings.includes(rating)}
                  onChange={() =>
                    toggleValue(rating, ratings, setRatings)
                  }
                />
                <span>{rating} Stars and above</span>
                <span className="rating-stars">
                  {"★".repeat(rating)}
                  <span className="empty-stars">
                    {"★".repeat(5 - rating)}
                  </span>
                </span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h3>Resort Type</h3>

            {resortTypes.map((type) => (
              <label className="filter-option" key={type}>
                <input
                  type="checkbox"
                  checked={types.includes(type)}
                  onChange={() => toggleValue(type, types, setTypes)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h3>Amenities</h3>

            {amenityOptions.map((amenity) => (
              <label className="filter-option" key={amenity.value}>
                <input
                  type="checkbox"
                  checked={amenities.includes(amenity.value)}
                  onChange={() =>
                    toggleValue(
                      amenity.value,
                      amenities,
                      setAmenities
                    )
                  }
                />
                <span>{amenity.label}</span>
              </label>
            ))}
          </div>

          <button
            className="apply-filters-button"
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
          >
            Apply Filters
          </button>
        </aside>

        <div className="resorts-results">
          <div className="results-heading">
            <div>
              <h2>Resorts</h2>
              <p>
                Showing {filteredResorts.length} matching resorts from{" "}
                {resorts.length} loaded
              </p>
            </div>

            <label className="sort-control">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="popular">Popularity</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown size={15} />
            </label>
          </div>

          {loading ? (
            <div className="no-resorts">
              <p>Loading resorts from Firestore...</p>
            </div>
          ) : error && resorts.length === 0 ? (
            <div className="no-resorts">
              <h3>Unable to load resorts</h3>
              <p>{error}</p>
              <button
                type="button"
                className="view-details-button"
                onClick={() => fetchResorts(true)}
              >
                Try Again
              </button>
            </div>
          ) : filteredResorts.length > 0 ? (
            <div className="resorts-grid">
              {filteredResorts.map((resort) => (
                <article className="resort-card" key={resort.id}>
                  <div className="resort-image-wrap">
                    {resort.image ? (
                      <img
                        src={resort.image}
                        alt={resort.name}
                        className="resort-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="resort-no-image">
                        <Waves size={34} />
                        <span>No image available</span>
                      </div>
                    )}

                    {resort.badge && (
                      <span
                        className={`resort-badge ${resort.badgeType}`}
                      >
                        {resort.badge}
                      </span>
                    )}

                    <button
                      type="button"
                      className={`favorite-button ${
                        favorites.includes(resort.id)
                          ? "is-favorite"
                          : ""
                      }`}
                      aria-label={
                        favorites.includes(resort.id)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      onClick={() => toggleFavorite(resort.id)}
                    >
                      <Heart
                        size={19}
                        fill={
                          favorites.includes(resort.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    {resort.rating > 0 && (
                      <span className="image-rating">
                        <Star size={13} fill="currentColor" />
                        {resort.rating}
                        <span>({resort.reviews})</span>
                      </span>
                    )}
                  </div>

                  <div className="resort-card-body">
                    <h3>{resort.name}</h3>

                    <p className="resort-location">
                      <MapPin size={14} />
                      {resort.location}
                      {resort.type && (
                        <>
                          <span>·</span>
                          {resort.type}
                        </>
                      )}
                    </p>

                    <div className="resort-amenities">
                      {resort.amenities.slice(0, 4).map((amenity) => {
                        const Icon = amenityIcons[amenity] || Waves;

                        return (
                          <span key={amenity} title={amenity}>
                            <Icon size={14} />
                            {amenity}
                          </span>
                        );
                      })}
                    </div>

                    <div className="resort-card-bottom">
                      <div className="resort-price">
                        {resort.price > 0 ? (
                          <>
                            <strong>
                              {resort.price.toLocaleString()}
                            </strong>
                            <span>/ night</span>
                          </>
                        ) : (
                          <span>Price unavailable</span>
                        )}
                      </div>

                      <Link
                        href={`/pages/resorts/${resort.id}`}
                        className="view-details-button"
                      >
                        View Details
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-resorts">
              <Search size={34} />
              <h3>No resorts found</h3>
              <p>
                {resorts.length === 0
                  ? "No resort records are available in Firestore."
                  : "Try another destination or remove some filters."}
              </p>
              <button
                type="button"
                className="view-details-button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Infinite-scroll trigger */}
          {!loading && !error && hasMore && (
            <div
              ref={observerRef}
              className="infinite-scroll-trigger"
              aria-live="polite"
            >
              {loadingMore && <p>Loading more resorts...</p>}
            </div>
          )}

          {error && resorts.length > 0 && (
            <div className="infinite-scroll-trigger">
              <p>{error}</p>
              <button
                type="button"
                className="view-details-button"
                onClick={() => fetchResorts(false)}
              >
                Retry Loading
              </button>
            </div>
          )}

          {!loading && !error && !hasMore && resorts.length > 0 && (
            <div className="infinite-scroll-trigger">
              <p>You’ve reached the end of the resorts.</p>
            </div>
          )}
        </div>
      </section>

      <section className="resort-promises">
        <div>
          <ShieldCheck size={29} />
          <span>
            <strong>Secure Booking</strong>
            <small>Your data is always protected</small>
          </span>
        </div>

        <div>
          <Headset size={29} />
          <span>
            <strong>Customer Support</strong>
            <small>We're here to help</small>
          </span>
        </div>

        <div>
          <Star size={29} />
          <span>
            <strong>Find Your Stay</strong>
            <small>Explore available resort options</small>
          </span>
        </div>
      </section>

      <footer className="resorts-footer">
        <p>
          © {new Date().getFullYear()} HotelReserve. All rights reserved.
        </p>
        <div>
          <Link href="/pages/about">About</Link>
          <Link href="/pages/contact">Contact</Link>
          <Link href="/pages/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </main>
  );
}
