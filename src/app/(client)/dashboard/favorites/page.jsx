
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "@/firebase/firebase";

import {
  Search,
  MapPin,
  Heart,
  ChevronDown,
  ArrowRight,
  Waves,
  Wifi,
  Utensils,
  Dumbbell,
  Star,
  LoaderCircle,
} from "lucide-react";

const amenityIcons = {
  Pool: Waves,
  Spa: Waves,
  WiFi: Wifi,
  Restaurant: Utensils,
  "Fitness Center": Dumbbell,
  "Beach Access": Waves,
};

function getStarRating(value) {
  if (typeof value === "number") {
    return value;
  }

  const match = String(value || "").match(/\d+/);

  return match ? Number(match[0]) : 0;
}

function normalizeResort(data, id) {
  const location = [
    data.city,
    data.state,
    data.country,
  ]
    .filter(Boolean)
    .join(", ");

  const rawImages = Array.isArray(data.images)
    ? data.images
    : [];

  const image =
    rawImages
      .map((item) =>
        typeof item === "string" ? item : item?.url
      )
      .find(Boolean) ||
    data.image ||
    data.imageUrl ||
    data.photoURL ||
    data.coverImage ||
    "";

  return {
    id,
    name: data.hotelName || "Unnamed hotel",
    location: location || data.address || "Location unavailable",
    country: data.country || "",
    type: data.category || "",
    price: Number(data.price || 0),
    rating: getStarRating(data.starRating),
    reviews: Number(data.reviewCount || 0),
    badge: data.badge || "",
    badgeType: data.badgeType || "",
    amenities: Array.isArray(data.amenities)
      ? data.amenities
      : [],
    image,
    status: String(data.status || "").toLowerCase(),
  };
}

export default function ExplorePage() {
  const [resorts, setResorts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const [removingId, setRemovingId] = useState(null);

  // Fetch the authenticated user's favorite hotels.
  const fetchFavorites = useCallback(async (userId) => {
    setLoading(true);
    setError("");

    try {
      const favoritesRef = collection(
        db,
        "favorites",
        userId,
        "hotels"
      );

      const favoritesSnapshot = await getDocs(favoritesRef);

      if (favoritesSnapshot.empty) {
        setFavorites([]);
        setResorts([]);
        return;
      }

      // Get saved hotel IDs from the favorites subcollection.
      const favoriteIds = favoritesSnapshot.docs.map(
        (favoriteDoc) => favoriteDoc.id
      );

      setFavorites(favoriteIds);

      // Retrieve actual hotel documents.
      const hotelPromises = favoriteIds.map(async (hotelId) => {
        const hotelRef = doc(db, "hotels", hotelId);
        const hotelSnapshot = await getDoc(hotelRef);

        if (!hotelSnapshot.exists()) {
          return null;
        }

        return normalizeResort(
          hotelSnapshot.data(),
          hotelSnapshot.id
        );
      });

      const hotels = await Promise.all(hotelPromises);

      const validHotels = hotels.filter(
        (hotel) => hotel && hotel.status !== "inactive"
      );

      setResorts(validHotels);
    } catch (err) {
      console.error("Failed to fetch favorite hotels:", err);
      setError("Unable to load your favorite hotels. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Listen for Firebase authentication changes.
  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!active) return;

      setUser(currentUser);

      if (!currentUser) {
        setFavorites([]);
        setResorts([]);
        setLoading(false);
        return;
      }

      await fetchFavorites(currentUser.uid);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [fetchFavorites]);

  // Search and sort favorite hotels.
  const filteredResorts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const results = resorts.filter((resort) => {
      return (
        !term ||
        resort.name.toLowerCase().includes(term) ||
        resort.location.toLowerCase().includes(term) ||
        resort.country.toLowerCase().includes(term)
      );
    });

    if (sortBy === "price-low") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else {
      results.sort((a, b) => b.reviews - a.reviews);
    }

    return results;
  }, [resorts, searchTerm, sortBy]);

  // Remove a hotel from the user's favorites.
  async function removeFavorite(hotelId) {
    if (!user || removingId) return;

    setRemovingId(hotelId);
    setError("");

    try {
      const favoriteRef = doc(
        db,
        "favorites",
        user.uid,
        "hotels",
        hotelId
      );

      await deleteDoc(favoriteRef);

      setFavorites((previous) =>
        previous.filter((id) => id !== hotelId)
      );

      setResorts((previous) =>
        previous.filter((hotel) => hotel.id !== hotelId)
      );
    } catch (err) {
      console.error("Failed to remove favorite:", err);
      setError("Unable to remove this hotel from favorites.");
    } finally {
      setRemovingId(null);
    }
  }

  // Loading state.
  if (loading) {
    return (
      <main className="px-4 lg:px-14 py-11">
        <div className="no-resorts">
          <LoaderCircle className="animate-spin" size={30} />
          <p>Loading your favorite hotels...</p>
        </div>
      </main>
    );
  }

  // Authentication state.
  if (!user) {
    return (
      <main className="px-4 lg:px-14 py-11">
        <div className="no-resorts">
          <Heart size={36} />

          <h3>Sign in to view your favorites</h3>

          <p>
            Sign in to your account to see the hotels
            you have saved.
          </p>

          <Link
            href="/login"
            className="view-details-button"
          >
            Sign In
            <ArrowRight size={15} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 lg:px-14 py-11">
      <div className="resorts-results">

        {/* Page heading */}
        <div className="results-heading">
          <div>
            <h2>My Favorites</h2>

            <p>
              {filteredResorts.length} favorite hotels
              {searchTerm ? " found" : " saved"}
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

        {/* Search */}
        {resorts.length > 0 && (
          <div className="favorite-search">
            <Search size={18} />

            <input
              type="search"
              placeholder="Search your favorite hotels..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="favorite-error" role="alert">
            <p>{error}</p>

            <button
              type="button"
              onClick={() => fetchFavorites(user.uid)}
            >
              Retry
            </button>
          </div>
        )}

        {/* Hotel cards */}
        {filteredResorts.length > 0 ? (
          <div className="resorts-grid">
            {filteredResorts.map((resort) => (
              <article
                className="resort-card"
                key={resort.id}
              >
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

                  {/* Remove favorite */}
                  <button
                    type="button"
                    className="favorite-button is-favorite"
                    aria-label={`Remove ${resort.name} from favorites`}
                    disabled={removingId === resort.id}
                    onClick={() => removeFavorite(resort.id)}
                  >
                    {removingId === resort.id ? (
                      <LoaderCircle
                        size={19}
                        className="animate-spin"
                      />
                    ) : (
                      <Heart
                        size={19}
                        fill="currentColor"
                      />
                    )}
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
                            {resort.price.toLocaleString("en-NG", {
                              style: "currency",
                              currency: "NGN",
                              maximumFractionDigits: 0,
                            })}
                          </strong>

                          <span>/ night</span>
                        </>
                      ) : (
                        <span>Price unavailable</span>
                      )}
                    </div>

                    <Link
                      href={`/dashboard/hoteldetails/${encodeURIComponent(resort.id)}`}
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
            {resorts.length === 0 ? (
              <>
                <Heart size={38} />

                <h3>No favorite hotels yet</h3>

                <p>
                  Hotels you save will appear here.
                  Explore hotels and tap the heart icon
                  to add them to your favorites.
                </p>

                <Link
                  href="/explore"
                  className="view-details-button"
                >
                  Explore Hotels
                  <ArrowRight size={15} />
                </Link>
              </>
            ) : (
              <>
                <Search size={34} />

                <h3>No hotels found</h3>

                <p>
                  No favorite hotels match your search.
                </p>

                <button
                  type="button"
                  className="view-details-button"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
