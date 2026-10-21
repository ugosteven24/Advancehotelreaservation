"use client";

import "./favorite.css";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  documentId,
  query,
  startAfter,
  getDoc,
  deleteDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";

import {
  MapPin,
  Star,
  Heart,
  Hotel,
  LoaderCircle,
} from "lucide-react";

import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
const PAGE_SIZE = 9;

const FILTERS = [
  "All Hotels",
  "Lagos",
  "Abuja",
  "Featured",
  "Verified",
];

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT",
];

const FCT_NAMES = [
  "fct",
  "abuja",
  "federal capital territory",
];

function normalizeLocation(value) {
  return String(value ?? "").trim().toLowerCase();
}

function formatPrice(price) {
  const amount = Number(price);

  if (
    price === undefined ||
    price === null ||
    price === "" ||
    !Number.isFinite(amount)
  ) {
    return "Price unavailable";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function matchesState(hotel, selectedState) {
  if (!selectedState) return true;

  const state = normalizeLocation(hotel.state);
  const city = normalizeLocation(hotel.city);
  const selected = normalizeLocation(selectedState);

  // Abuja may be stored as Abuja, FCT, or Federal Capital Territory.
  if (selected === "fct") {
    return (
      FCT_NAMES.includes(state) ||
      FCT_NAMES.includes(city)
    );
  }

  // Prefer the state field. Use city as a fallback when
  // the document does not have a state value.
  if (state) {
    return state === selected;
  }

  return city === selected;
}

export default function favoritePage() {
  const [hotels, setHotels] = useState([]);

  const [activeFilter, setActiveFilter] = useState("All Hotels");
  const [selectedState, setSelectedState] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  // Stores the last Firestore document fetched.
  const lastDocRef = useRef(null);

  // Element used by infinite scrolling.
  const loadMoreRef = useRef(null);

  // Prevents overlapping Firestore requests.
  const requestInProgress = useRef(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  
    return () => unsubscribe();
  }, []);
  // =========================================================
  // FETCH HOTELS
  // =========================================================
  const fetchHotels = useCallback(async (nextPage = false) => {
    if (!user?.uid) {
      setHotels([]);
      setLoading(false);
      return;
    }
  
    if (requestInProgress.current) return;
    if (nextPage && !hasMore) return;
  
    requestInProgress.current = true;
  
    if (nextPage) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
  
    setError("");
  
    try {
      // Fetch the current user's favorite hotels
      const hotelsRef = collection(
        db,
        "favorites",
        user.uid,
        "hotels"
      );
  
      const hotelsQuery =
        nextPage && lastDocRef.current
          ? query(
              hotelsRef,
              orderBy(documentId()),
              startAfter(lastDocRef.current),
              limit(PAGE_SIZE)
            )
          : query(
              hotelsRef,
              orderBy(documentId()),
              limit(PAGE_SIZE)
            );
  
      const snapshot = await getDocs(hotelsQuery);
  
      const newHotels = await Promise.all(
        snapshot.docs.map(async (favoriteDoc) => {
          const hotelRef = doc(db, "hotels", favoriteDoc.id);
          const hotelSnapshot = await getDoc(hotelRef);
  
          if (!hotelSnapshot.exists()) return null;
  
          return {
            ...hotelSnapshot.data(),
            documentId: hotelSnapshot.id,
          };
        })
      );
  
      const validHotels = newHotels.filter(Boolean);
  
      if (snapshot.docs.length > 0) {
        lastDocRef.current =
          snapshot.docs[snapshot.docs.length - 1];
      }
  
      setHotels((previous) =>
        nextPage
          ? [...previous, ...validHotels]
          : validHotels
      );
  
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } catch (err) {
      console.error("Failed to fetch favorite hotels:", err);
      setError("Unable to load favorite hotels. Please try again.");
    } finally {
      requestInProgress.current = false;
      setLoading(false);
      setLoadingMore(false);
    }
  }, [user?.uid, hasMore]);

  // =========================================================
  // INITIAL FETCH
  // =========================================================

  useEffect(() => {
    fetchHotels(false);
  }, [fetchHotels]);

  // =========================================================
  // INFINITE SCROLL
  // =========================================================

  useEffect(() => {
    const target = loadMoreRef.current;

    if (
      !target ||
      !hasMore ||
      loading ||
      loadingMore ||
      error
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchHotels(true);
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [
    fetchHotels,
    hasMore,
    loading,
    loadingMore,
    error,
  ]);

  // =========================================================
  // FILTER HOTELS
  // =========================================================

  const filteredHotels = useMemo(() => {
    let result = hotels;

    switch (activeFilter) {
      case "Lagos":
        result = result.filter((hotel) => {
          const city = normalizeLocation(hotel.city);
          const state = normalizeLocation(hotel.state);

          return city === "lagos" || state === "lagos";
        });
        break;

      case "Abuja":
        result = result.filter((hotel) => {
          const city = normalizeLocation(hotel.city);
          const state = normalizeLocation(hotel.state);

          return (
            FCT_NAMES.includes(city) ||
            FCT_NAMES.includes(state)
          );
        });
        break;

      case "Featured":
        result = result.filter(
          (hotel) => hotel.featured === true
        );
        break;

      case "Verified":
        result = result.filter(
          (hotel) => hotel.verified === true
        );
        break;

      default:
        break;
    }

    // Apply the selected Nigerian state.
    if (selectedState) {
      result = result.filter((hotel) =>
        matchesState(hotel, selectedState)
      );
    }

    return result;
  }, [hotels, activeFilter, selectedState]);

  // =========================================================
  // HANDLE BUTTON FILTER
  // =========================================================

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);

    // Clear the state selection when a category button
    // is selected, so the filters do not conflict.
    setSelectedState("");
  };

  // =========================================================
  // HANDLE STATE DROPDOWN
  // =========================================================

  const handleStateChange = (event) => {
    const state = event.target.value;

    setSelectedState(state);

    // State selection takes priority over category filters.
    setActiveFilter("All Hotels");
  };

  // =========================================================
  // ADD HOTEL TO FAVORITES
  // =========================================================

  const deleteFavorite = async (hotel) => {
    try {
      const user = getAuth().currentUser;
  
      if (!user) {
        alert("Please log in to manage your favorites.");
        return;
      }
  
      const hotelId = hotel.documentId;
  
      if (!hotelId) {
        alert("Hotel ID is missing.");
        return;
      }
  
      const favoriteRef = doc(
        db,
        "favorites",
        user.uid,
        "hotels",
        hotelId
      );
  
      await deleteDoc(favoriteRef);
  
      setHotels((previous) =>
        previous.filter((item) => item.documentId !== hotelId)
      );
  
      alert("Hotel removed from favorites!");
    } catch (err) {
      console.error("Failed to remove favorite:", err);
      alert("Unable to remove hotel from favorites. Please try again.");
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section className="nearby-hotels">
      <div className="nearby-hotels__container">

        {/* HEADER */}
        <div className="nearby-hotels__header">
          <div className="nearby-hotels__intro">
            <div className="nearby-hotels__eyebrow">
              <Star size={18} />
              <span>DISCOVER YOUR NEXT STAY</span>
            </div>

            <h2 className="nearby-hotels__title">
              Favorites Hotels
            </h2>

            <p className="nearby-hotels__subtitle">
              Explore accommodations for your next trip.
            </p>
          </div>

          {/* FILTERS */}
          <div className="nearby-hotels__filters">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilterChange(filter)}
                className={`nearby-hotels__filter ${
                  activeFilter === filter ? "is-active" : ""
                }`}
              >
                {filter}
              </button>
            ))}

            {/* NIGERIAN STATE DROPDOWN */}
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="nearby-hotels__state-select"
              aria-label="Filter hotels by Nigerian state"
            >
              <option value="">All States</option>

              {NIGERIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state === "FCT" ? "Abuja (FCT)" : state}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* INITIAL LOADING */}
        {loading && hotels.length === 0 && (
          <div className="nearby-hotels__loading">
            <LoaderCircle
              size={24}
              className="nearby-hotels__spinner"
            />
            <span>Loading hotels...</span>
          </div>
        )}

        {/* INITIAL LOAD ERROR */}
        {!loading && error && hotels.length === 0 && (
          <div className="nearby-hotels__error">
            <p>{error}</p>

            <button
              type="button"
              onClick={() => fetchHotels(false)}
              className="nearby-hotels__button"
            >
              Try again
            </button>
          </div>
        )}

        {/* EMPTY FILTER RESULTS */}
        {!loading &&
          !error &&
          filteredHotels.length === 0 && (
            <div className="nearby-hotels__empty">
              <Hotel size={36} />

              <h3>No hotels found</h3>

              <p>
                No hotels match this filter in the hotels
                currently loaded. Try another state or filter.
              </p>
            </div>
          )}

        {/* HOTEL CARDS */}
        <div className="nearby-hotels__grid">
          {filteredHotels.map((hotel) => {
            const hotelId = hotel.documentId;

            const amenities = Array.isArray(hotel.amenities)
              ? hotel.amenities
              : [];

            return (
              <article
                key={hotel.documentId}
                className="hotel-card"
              >
                {/* IMAGE */}
                <div className="hotel-card__image">
                  {hotel.coverImage ? (
                    <img
                      src={hotel.coverImage}
                      alt={hotel.hotelName || "Hotel"}
                      loading="lazy"
                    />
                  ) : (
                    <div className="hotel-card__image-placeholder">
                      <Hotel size={48} />
                    </div>
                  )}

                  {hotel.featured === true && (
                    <span className="hotel-card__featured">
                      Featured
                    </span>
                  )}

                  {/* <button
                    type="button"
                    aria-label={`Add ${
                      hotel.hotelName || "hotel"
                    } to favorites`}
                    onClick={() => deleteFavorite(hotel)}
                    className="hotel-card__favorite"
                  >
                    <Heart size={19} />
                  </button> */}

                  {hotel.starRating && (
                    <div className="hotel-card__rating">
                      <Star
                        size={13}
                        className="hotel-card__rating-star"
                      />
                      <span className="text-amber-50">{hotel.starRating}</span>
                    </div>
                  )}
                </div>

                {/* DETAILS */}
                <div className="hotel-card__body">
                  <div className="hotel-card__details">
                    <div className="hotel-card__meta">
                      <span className="hotel-card__location">
                        <MapPin size={15} />

                        <span>
                          {[
                            hotel.city,
                            hotel.country,
                          ]
                            .filter(Boolean)
                            .join(", ") ||
                            "Location unavailable"}
                        </span>
                      </span>

                      {hotel.verified === true && (
                        <span className="hotel-card__verified">
                          Verified
                        </span>
                      )}
                    </div>

                    <h3 className="hotel-card__title">
                      {hotel.hotelName || "Unnamed Hotel"}
                    </h3>

                    {hotel.address && (
                      <p className="hotel-card__address">
                        {hotel.address}
                      </p>
                    )}

                    {hotel.description && (
                      <p className="hotel-card__description">
                        {hotel.description}
                      </p>
                    )}

                    <div className="hotel-card__amenities">
                      {amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="hotel-card__amenity"
                        >
                          {amenity}
                        </span>
                      ))}

                      {amenities.length > 3 && (
                        <span className="hotel-card__amenity">
                          +{amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="hotel-card__footer">
                    <div className="hotel-card__price-block">
                      <span className="hotel-card__price-label">
                        Starting from
                      </span>

                      <div className="hotel-card__price-row">
                        <span className="hotel-card__price">
                          {formatPrice(hotel.price)}
                        </span>

                        <span className="hotel-card__per-night">
                          / night
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteFavorite(hotel)}
                      className="hotel-card__link"
                    >
                      Remove Hotel
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* INFINITE SCROLL TRIGGER */}
        {!error && hasMore && (
          <div
            ref={loadMoreRef}
            className="nearby-hotels__load-more"
          >
            {loadingMore && (
              <>
                <LoaderCircle
                  size={20}
                  className="nearby-hotels__spinner"
                />
                <span>Loading more hotels...</span>
              </>
            )}
          </div>
        )}

        {/* LOAD-MORE ERROR */}
        {error && hotels.length > 0 && (
          <div className="nearby-hotels__retry">
            <p>{error}</p>

            <button
              type="button"
              onClick={() => fetchHotels(true)}
              className="nearby-hotels__button"
            >
              Retry loading
            </button>
          </div>
        )}

        {/* END OF COLLECTION */}
        {!loading && !hasMore && hotels.length > 0 && (
          <p className="nearby-hotels__end">
            You've reached the end of the hotels list.
          </p>
        )}
      </div>
    </section>
  );
}