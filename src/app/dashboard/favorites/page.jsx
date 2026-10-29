
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  Heart,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Waves,
  Wifi,
  Utensils,
  Dumbbell,
  ShieldCheck,
  Headset,
  Star,
  Menu,
  X,
} from "lucide-react";

import "./resorts.css";

const resorts = [
  {
    id: 1,
    name: "Maldives Island Resort",
    location: "Maldives",
    country: "Maldives",
    type: "Beach Resort",
    price: 450,
    rating: 4.8,
    reviews: 124,
    badge: "Popular",
    badgeType: "popular",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Beach Access"],
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    name: "Santorini Cliff Resort",
    location: "Santorini, Greece",
    country: "Greece",
    type: "Beach Resort",
    price: 320,
    rating: 4.6,
    reviews: 98,
    badge: "Best Value",
    badgeType: "value",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant"],
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    name: "Bali Beach Resort & Spa",
    location: "Bali, Indonesia",
    country: "Indonesia",
    type: "Beach Resort",
    price: 280,
    rating: 4.9,
    reviews: 176,
    badge: "Luxury",
    badgeType: "luxury",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Beach Access"],
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    name: "Lake Como Resort",
    location: "Lake Como, Italy",
    country: "Italy",
    type: "Mountain Resort",
    price: 390,
    rating: 4.5,
    reviews: 87,
    badge: "Trending",
    badgeType: "trending",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Beach Access"],
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    name: "Phuket Island Resort",
    location: "Phuket, Thailand",
    country: "Thailand",
    type: "Island Resort",
    price: 260,
    rating: 4.7,
    reviews: 112,
    badge: "Family Friendly",
    badgeType: "family",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Fitness Center"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    name: "Seychelles Resort & Spa",
    location: "Seychelles",
    country: "Seychelles",
    type: "Beach Resort",
    price: 520,
    rating: 4.8,
    reviews: 143,
    badge: "Romantic",
    badgeType: "romantic",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Beach Access"],
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=85",
  },
];

const resortTypes = [
  "Beach Resort",
  "Mountain Resort",
  "Island Resort",
  "All-Inclusive",
  "Wellness Resort",
  "Family Resort",
];

const amenityOptions = [
  { label: "Swimming Pool", value: "Pool" },
  { label: "Spa & Wellness", value: "Spa" },
  { label: "Free WiFi", value: "WiFi" },
  { label: "Restaurant", value: "Restaurant" },
  { label: "Fitness Center", value: "Fitness Center" },
  { label: "Beach Access", value: "Beach Access" },
];

const amenityIcons = {
  Pool: Waves,
  Spa: Waves,
  WiFi: Wifi,
  Restaurant: Utensils,
  "Fitness Center": Dumbbell,
  "Beach Access": Waves,
};

export default function ResortsPage() {
  const [destination, setDestination] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Adults, 0 Children");

  const [maxPrice, setMaxPrice] = useState(1000);
  const [ratings, setRatings] = useState([5]);
  const [types, setTypes] = useState(["Beach Resort"]);
  const [amenities, setAmenities] = useState([
    "Pool",
    "WiFi",
  ]);

  const [sortBy, setSortBy] = useState("popular");
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const pageSize = 6;

  const filteredResorts = useMemo(() => {
    let result = resorts.filter((resort) => {
      const term = searchTerm.trim().toLowerCase();

      const matchesDestination =
        !term ||
        resort.name.toLowerCase().includes(term) ||
        resort.location.toLowerCase().includes(term) ||
        resort.country.toLowerCase().includes(term);

      const matchesPrice = resort.price <= maxPrice;

      const matchesRating =
        ratings.length === 0 ||
        ratings.some((rating) => resort.rating >= rating - 0.9);

      const matchesType =
        types.length === 0 ||
        types.includes(resort.type);

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
  }, [searchTerm, maxPrice, ratings, types, amenities, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredResorts.length / pageSize)
  );

  const visibleResorts = filteredResorts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  function toggleValue(value, values, setValues) {
    setValues(
      values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value]
    );
    setPage(1);
  }

  function handleSearch(event) {
    event.preventDefault();
    setSearchTerm(destination);
    setPage(1);
  }

  function clearFilters() {
    setMaxPrice(1000);
    setRatings([]);
    setTypes([]);
    setAmenities([]);
    setDestination("");
    setSearchTerm("");
    setPage(1);
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
          <Link href="/" >Home</Link>
          <Link href="/pages/hotels">Hotels</Link>
          <Link href="/pages/favorites" className="active">
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
            Exclusive Resorts
          </span>

          <h1>
            Discover the World’s
            <br />
            Most Beautiful Resorts
          </h1>

          <p>
            Luxurious stays. Breathtaking views. Unforgettable
            experiences.
            <br className="desktop-break" />
            Find your perfect resort getaway with HotelReserve.
          </p>
        </div>
      </section>

      <section
        className="resort-search-wrap"
        id="resort-search"
      >
        <form className="resort-search" onSubmit={handleSearch}>
          <label className="search-field destination-field">
            <MapPin size={21} />
            <span>
              <strong>Destination</strong>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={destination}
                onChange={(event) =>
                  setDestination(event.target.value)
                }
              />
            </span>
          </label>

          <label className="search-field">
            <CalendarDays size={21} />
            <span>
              <strong>Check In</strong>
              <input
                type="date"
                value={checkIn}
                onChange={(event) =>
                  setCheckIn(event.target.value)
                }
              />
            </span>
          </label>

          <label className="search-field">
            <CalendarDays size={21} />
            <span>
              <strong>Check Out</strong>
              <input
                type="date"
                min={checkIn || undefined}
                value={checkOut}
                onChange={(event) =>
                  setCheckOut(event.target.value)
                }
              />
            </span>
          </label>

          <label className="search-field guests-field">
            <Users size={21} />
            <span>
              <strong>Guests</strong>
              <select
                value={guests}
                onChange={(event) =>
                  setGuests(event.target.value)
                }
              >
                <option>1 Adult, 0 Children</option>
                <option>2 Adults, 0 Children</option>
                <option>2 Adults, 1 Child</option>
                <option>2 Adults, 2 Children</option>
                <option>4 Adults, 0 Children</option>
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
          onClick={() =>
            setMobileFiltersOpen((previous) => !previous)
          }
        >
          {mobileFiltersOpen ? <X size={18} /> : <SlidersHorizontal size={18} />}
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
            <h3>Price per night</h3>

            <input
              className="price-slider"
              type="range"
              min="50"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={(event) => {
                setMaxPrice(Number(event.target.value));
                setPage(1);
              }}
              aria-label="Maximum price per night"
            />

            <div className="price-labels">
              <span>$50</span>
              <strong>${maxPrice.toLocaleString()} max</strong>
            </div>
          </div>

          <div className="filter-section">
            <h3>Star Rating</h3>

            {[5, 4, 3, 2, 1].map((rating) => (
              <label className="filter-option" key={rating}>
                <input
                  type="checkbox"
                  checked={ratings.includes(rating)}
                  onChange={() =>
                    toggleValue(rating, ratings, setRatings)
                  }
                />
                <span>{rating} Star</span>
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
                  onChange={() =>
                    toggleValue(type, types, setTypes)
                  }
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h3>Amenities</h3>

            {amenityOptions.map((amenity) => (
              <label
                className="filter-option"
                key={amenity.value}
              >
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
              <h2>Best Resorts</h2>
              <p>
                Showing {visibleResorts.length} of{" "}
                {filteredResorts.length} resorts
              </p>
            </div>

            <label className="sort-control">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value);
                  setPage(1);
                }}
              >
                <option value="popular">Popularity</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown size={15} />
            </label>
          </div>

          {visibleResorts.length > 0 ? (
            <div className="resorts-grid">
              {visibleResorts.map((resort) => (
                <article className="resort-card" key={resort.id}>
                  <div className="resort-image-wrap">
                    <img
                      src={resort.image}
                      alt={resort.name}
                      className="resort-image"
                      loading="lazy"
                    />

                    <span
                      className={`resort-badge ${resort.badgeType}`}
                    >
                      {resort.badge}
                    </span>

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

                    <span className="image-rating">
                      <Star size={13} fill="currentColor" />
                      {resort.rating}
                      <span>({resort.reviews})</span>
                    </span>
                  </div>

                  <div className="resort-card-body">
                    <h3>{resort.name}</h3>

                    <p className="resort-location">
                      <MapPin size={14} />
                      {resort.location}
                      <span>·</span>
                      {resort.type}
                    </p>

                    <div className="resort-amenities">
                      {resort.amenities.slice(0, 4).map((amenity) => {
                        const Icon = amenityIcons[amenity] || Waves;

                        return (
                          <span key={amenity} title={amenity}>
                            <Icon size={14} />
                            {amenity === "Fitness Center"
                              ? "Fitness"
                              : amenity}
                          </span>
                        );
                      })}
                    </div>

                    <div className="resort-card-bottom">
                      <div className="resort-price">
                        <strong>
                          ${resort.price.toLocaleString()}
                        </strong>
                        <span>/ night</span>
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
                Try another destination or remove some filters.
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

          {filteredResorts.length > pageSize && (
            <nav className="resort-pagination" aria-label="Pagination">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((previous) => previous - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <button
                  type="button"
                  key={pageNumber}
                  className={page === pageNumber ? "current-page" : ""}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((previous) => previous + 1)}
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </nav>
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
            <strong>24/7 Customer Support</strong>
            <small>We're here to help anytime</small>
          </span>
        </div>

        <div>
          <Star size={29} />
          <span>
            <strong>Best Price Guarantee</strong>
            <small>Find a lower price? Let us know</small>
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

