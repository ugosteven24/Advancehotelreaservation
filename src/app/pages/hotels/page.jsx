"use client";

import "./nearbyhotels.css";

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
    query,
    startAfter,
    doc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";
import Menu from "./menu"
import { getAuth } from "firebase/auth";

import {
    MapPin,
    Star,
    Heart,
    Hotel,
    LoaderCircle,
    SlidersHorizontal,
    X,
} from "lucide-react";

import Link from "next/link";
import { db } from "@/firebase/firebase";

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


function normalizeFilterValue(value) {
    return String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
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

export default function PopularHotels() {
    const [hotels, setHotels] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All Hotels");
    const [selectedState, setSelectedState] = useState("");

    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedStars, setSelectedStars] = useState([]);
    const [minReviewScore, setMinReviewScore] = useState(0);
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    // Stores the last Firestore document fetched.
    const lastDocRef = useRef(null);

    // Element used by infinite scrolling.
    const loadMoreRef = useRef(null);

    // Prevents overlapping Firestore requests.
    const requestInProgress = useRef(false);

    // =========================================================
    // FETCH HOTELS
    // =========================================================

    const fetchHotels = useCallback(async (nextPage = false) => {
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
            const hotelsRef = collection(db, "hotels");

            const hotelsQuery =
                nextPage && lastDocRef.current
                    ? query(
                        hotelsRef,
                        startAfter(lastDocRef.current),
                        limit(PAGE_SIZE)
                    )
                    : query(
                        hotelsRef,
                        limit(PAGE_SIZE)
                    );

            const snapshot = await getDocs(hotelsQuery);

            const newHotels = snapshot.docs.map((hotelDoc) => ({
                ...hotelDoc.data(),
                documentId: hotelDoc.id,
            }));

            if (snapshot.docs.length > 0) {
                lastDocRef.current =
                    snapshot.docs[snapshot.docs.length - 1];
            }

            setHotels((previous) =>
                nextPage
                    ? [...previous, ...newHotels]
                    : newHotels
            );

            setHasMore(snapshot.docs.length === PAGE_SIZE);
        } catch (err) {
            console.error("Failed to fetch hotels:", err);
            setError("Unable to load hotels. Please try again.");
        } finally {
            requestInProgress.current = false;
            setLoading(false);
            setLoadingMore(false);
        }
    }, [hasMore]);

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
        let result = [...hotels];

        // 1. Category filters
        switch (activeFilter) {
            case "Lagos":
                result = result.filter((hotel) => {
                    return (
                        normalizeLocation(hotel.state) === "lagos" ||
                        normalizeLocation(hotel.city) === "lagos"
                    );
                });
                break;

            case "Abuja":
                result = result.filter((hotel) => {
                    return (
                        FCT_NAMES.includes(normalizeLocation(hotel.state)) ||
                        FCT_NAMES.includes(normalizeLocation(hotel.city))
                    );
                });
                break;

            case "Featured":
                result = result.filter((hotel) => hotel.featured === true);
                break;

            case "Verified":
                result = result.filter((hotel) => hotel.verified === true);
                break;

            default:
                break;
        }

        // 2. Nigerian state filter
        if (selectedState) {
            result = result.filter((hotel) =>
                matchesState(hotel, selectedState)
            );
        }

        // 3. Minimum and maximum price
        const minimum = minPrice.trim() === "" ? null : Number(minPrice);
        const maximum = maxPrice.trim() === "" ? null : Number(maxPrice);

        if (minimum !== null && Number.isFinite(minimum)) {
            result = result.filter((hotel) => {
                const price = Number(hotel.price);
                return (
                    hotel.price !== null &&
                    hotel.price !== undefined &&
                    hotel.price !== "" &&
                    Number.isFinite(price) &&
                    price >= minimum
                );
            });
        }

        if (maximum !== null && Number.isFinite(maximum)) {
            result = result.filter((hotel) => {
                const price = Number(hotel.price);
                return (
                    hotel.price !== null &&
                    hotel.price !== undefined &&
                    hotel.price !== "" &&
                    Number.isFinite(price) &&
                    price <= maximum
                );
            });
        }

        // 4. Star rating
        if (selectedStars.length > 0) {
            result = result.filter((hotel) => {
                const stars = Number(hotel.starRating);

                return (
                    hotel.starRating !== null &&
                    hotel.starRating !== undefined &&
                    hotel.starRating !== "" &&
                    Number.isFinite(stars) &&
                    selectedStars.includes(stars)
                );
            });
        }

        // 5. Guest review score
        // Supports common field names; adjust to your Firestore schema.
        if (minReviewScore > 0) {
            result = result.filter((hotel) => {
                const rawScore =
                    hotel.reviewScore ??
                    hotel.guestReviewScore ??
                    hotel.averageReviewScore;

                const score = Number(rawScore);

                return (
                    rawScore !== null &&
                    rawScore !== undefined &&
                    rawScore !== "" &&
                    Number.isFinite(score) &&
                    score >= minReviewScore
                );
            });
        }

        // 6. Property type
        // Supports propertyType as a string or an array of strings.
        if (selectedPropertyTypes.length > 0) {
            result = result.filter((hotel) => {
                const rawTypes =
                    hotel.propertyType ??
                    hotel.propertyTypes ??
                    hotel.type ??
                    "";

                const types = (
                    Array.isArray(rawTypes) ? rawTypes : [rawTypes]
                ).map(normalizeLocation);

                return selectedPropertyTypes.some((type) =>
                    types.includes(normalizeLocation(type))
                );
            });
        }

        // 7. Amenities
        // All selected amenities must be present on the hotel.
        if (selectedAmenities.length > 0) {
            result = result.filter((hotel) => {
                const amenities = Array.isArray(hotel.amenities)
                    ? hotel.amenities.map(normalizeFilterValue)
                    : [];

                return selectedAmenities.every((amenity) =>
                    amenities.includes(normalizeFilterValue(amenity))
                );
            });
        }

        return result;
    }, [
        hotels,
        activeFilter,
        selectedState,
        minPrice,
        maxPrice,
        selectedStars,
        minReviewScore,
        selectedPropertyTypes,
        selectedAmenities,
    ]);


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

    const handleFavorite = async (hotel) => {
        try {
            const user = getAuth().currentUser;

            if (!user) {
                alert("Please log in to add hotels to your favorites.");
                return;
            }

            const hotelId = hotel.documentId;

            const favoriteRef = doc(
                db,
                "favorites",
                user.uid,
                "hotels",
                hotelId
            );

            await setDoc(favoriteRef, {
                hotelId,
                hotelName: hotel.hotelName || "",
                coverImage: hotel.coverImage || "",
                price: hotel.price ?? null,
                city: hotel.city || "",
                state: hotel.state || "",
                country: hotel.country || "",
                address: hotel.address || "",
                description: hotel.description || "",
                amenities: Array.isArray(hotel.amenities)
                    ? hotel.amenities
                    : [],
                starRating: hotel.starRating ?? null,
                verified: hotel.verified ?? false,
                featured: hotel.featured ?? false,
                savedAt: serverTimestamp(),
            });

            alert("Hotel added to favorites!");
        } catch (err) {
            console.error("Failed to add favorite:", err);
            alert("Unable to add hotel to favorites. Please try again.");
        }
    };



    // =========================================================
    // RENDER
    // =========================================================

    return (
        

       <>
       <Menu/>
        <main className="hotel-search-layout">
            <div className="hotel-search-grid">

                {/* FILTER SIDEBAR */}

                {/* MOBILE FILTER TOGGLE */}
                <div className="hotel-mobile-filter-bar">
                    <button
                        type="button"
                        className="hotel-mobile-filter-toggle"
                        onClick={() => setIsFilterOpen((open) => !open)}
                        aria-expanded={isFilterOpen}
                        aria-controls="hotel-filter-sidebar"
                    >
                        <SlidersHorizontal size={18} />
                        <span>Filters</span>
                        <span className="hotel-mobile-filter-count">
                            {
                                Number(minPrice !== "") +
                                Number(maxPrice !== "") +
                                selectedStars.length +
                                Number(minReviewScore > 0) +
                                selectedPropertyTypes.length +
                                selectedAmenities.length
                            }
                        </span>
                        <span className="hotel-mobile-filter-chevron">
                            {isFilterOpen ? <X size={18} /> : "＋"}
                        </span>
                    </button>
                </div>

                {/* FILTER SIDEBAR */}
                <aside
                    id="hotel-filter-sidebar"
                    className={`hotel-filter-sidebar ${isFilterOpen ? "is-open" : ""
                        }`}
                >
                    <div className="hotel-filter-panel">

                        {/* HEADER */}
                        <div className="hotel-filter-header">
                            <div className="hotel-filter-heading">
                                <h2>Filters</h2>
                                <span className="hotel-filter-badge">Refine</span>
                            </div>

                            <div className="hotel-filter-header-actions">
                                <button
                                    type="button"
                                    className="hotel-filter-clear"
                                    onClick={() => {
                                        setSelectedState("");
                                        setMinPrice("");
                                        setMaxPrice("");
                                        setSelectedStars([]);
                                        setMinReviewScore(0);
                                        setSelectedPropertyTypes([]);
                                        setSelectedAmenities([]);
                                        handleFilterChange("All Hotels");
                                    }}
                                >
                                    Clear all
                                </button>

                                <button
                                    type="button"
                                    className="hotel-filter-close"
                                    aria-label="Close filters"
                                    onClick={() => setIsFilterOpen(false)}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* MAP PREVIEW */}
                        <div className="hotel-filter-map">
                            <img
                                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800"
                                alt="City preview"
                                className="hotel-filter-map-image"
                            />

                            <div className="hotel-filter-map-overlay" />

                            <div className="hotel-filter-map-content">
                                <span>📍 Explore hotels</span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        window.open(
                                            "https://www.google.com/maps",
                                            "_blank",
                                            "noopener,noreferrer"
                                        )
                                    }
                                >
                                    Open Map
                                </button>
                            </div>
                        </div>

                        {/* PRICE FILTER */}
                        <section className="hotel-filter-section">
                            <h3>Price per night</h3>
                            <div className="hotel-filter-price-grid">
                                <label>
                                    <span>Minimum price</span>
                                    <input
                                        type="number"
                                        min="0"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        placeholder="Min price"
                                    />
                                </label>

                                <label>
                                    <span>Maximum price</span>
                                    <input
                                        type="number"
                                        min="0"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        placeholder="Max price"
                                    />
                                </label>
                            </div>
                        </section>

                        {/* STAR RATING */}
                        <section className="hotel-filter-section">
                            <h3>Star rating</h3>
                            {[5, 4, 3, 2, 1].map((stars) => (
                                <label key={stars} className="hotel-filter-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedStars.includes(stars)}
                                        onChange={(e) =>
                                            setSelectedStars((previous) =>
                                                e.target.checked
                                                    ? [...previous, stars]
                                                    : previous.filter((star) => star !== stars)
                                            )
                                        }
                                    />
                                    <span className="hotel-filter-stars">
                                        {"★".repeat(stars)}
                                    </span>
                                    <span>
                                        {stars} star{stars > 1 ? "s" : ""}
                                    </span>
                                </label>
                            ))}
                        </section>

                        {/* GUEST REVIEW SCORE */}
                        <section className="hotel-filter-section">
                            <h3>Guest review score</h3>
                            <div className="hotel-filter-score-grid">
                                {[9.5, 9, 8.5, 8].map((score) => (
                                    <button
                                        key={score}
                                        type="button"
                                        onClick={() =>
                                            setMinReviewScore((previous) =>
                                                previous === score ? 0 : score
                                            )
                                        }
                                        className={
                                            minReviewScore === score
                                                ? "hotel-filter-score is-selected"
                                                : "hotel-filter-score"
                                        }
                                    >
                                        <strong>{score.toFixed(1)}+</strong>
                                        <span>
                                            {score === 9.5
                                                ? "Wonderful"
                                                : score === 9
                                                    ? "Excellent"
                                                    : score === 8.5
                                                        ? "Very good"
                                                        : "Good"}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* PROPERTY TYPE */}
                        <section className="hotel-filter-section">
                            <h3>Property type</h3>
                            {[
                                "Luxury Hotels",
                                "Boutique Resorts",
                                "Serviced Apartments",
                                "Historic Villas",
                            ].map((type) => (
                                <label key={type} className="hotel-filter-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedPropertyTypes.includes(type)}
                                        onChange={(e) =>
                                            setSelectedPropertyTypes((previous) =>
                                                e.target.checked
                                                    ? [...previous, type]
                                                    : previous.filter((item) => item !== type)
                                            )
                                        }
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </section>

                        {/* AMENITIES */}
                        <section className="hotel-filter-section">
                            <h3>Amenities</h3>
                            {[
                                "Wi-Fi",
                                "Swimming Pool",
                                "Parking",
                                "Restaurant",
                                "Spa",
                                "Pet Friendly",
                            ].map((amenity) => (
                                <label key={amenity} className="hotel-filter-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedAmenities.includes(amenity)}
                                        onChange={(e) =>
                                            setSelectedAmenities((previous) =>
                                                e.target.checked
                                                    ? [...previous, amenity]
                                                    : previous.filter((item) => item !== amenity)
                                            )
                                        }
                                    />
                                    <span>{amenity}</span>
                                </label>
                            ))}
                        </section>

                        {/* MOBILE APPLY/CLOSE */}
                        <button
                            type="button"
                            className="hotel-filter-apply"
                            onClick={() => setIsFilterOpen(false)}
                        >
                            Show {filteredHotels.length} hotels
                        </button>
                    </div>
                </aside>


                {/* HOTEL RESULTS */}

                <section className="nearby-hotels">
                    <div className="nearby-hotels__container">

                        {/* HEADER */}
                        <div className="nearby-hotels__header">
                            <div className="nearby-hotels__intro">
                                <div className="nearby-hotels__eyebrow">
                                    <Star size={18} />
                                    <span>DISCOVER YOUR NEXT STAY</span>
                                </div>

                                <h2 className="nearby-hotels__title">Nearby Hotels</h2>

                                <p className="nearby-hotels__subtitle">
                                    Explore accommodations for your next trip.
                                </p>
                            </div>

                            <div className="nearby-hotels__filters">
                                {FILTERS.map((filter) => (
                                    <button
                                        key={filter}
                                        type="button"
                                        onClick={() => handleFilterChange(filter)}
                                        className={`nearby-hotels__filter ${activeFilter === filter ? "is-active" : ""
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}

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

                        {/* LOADING */}
                        {loading && hotels.length === 0 && (
                            <div className="nearby-hotels__loading">
                                <LoaderCircle
                                    size={24}
                                    className="nearby-hotels__spinner"
                                />
                                <span>Loading hotels...</span>
                            </div>
                        )}

                        {/* ERROR */}
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

                        {/* HOTEL GRID */}
                        {(!loading || hotels.length > 0) && (
                            <>
                                {filteredHotels.length === 0 && !error ? (
                                    <div className="nearby-hotels__empty">
                                        <Hotel size={36} />
                                        <h3>No hotels found</h3>
                                        <p>Try changing your filters or selecting another state.</p>
                                    </div>
                                ) : (
                                    <div className="nearby-hotels__grid">
                                        {filteredHotels.map((hotel) => {
                                            const hotelId = hotel.documentId;
                                            const amenities = Array.isArray(hotel.amenities)
                                                ? hotel.amenities
                                                : [];

                                            return (
                                                <article
                                                    key={hotelId}
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

                                                        <button
                                                            type="button"
                                                            aria-label={`Add ${hotel.hotelName || "hotel"} to favorites`}
                                                            onClick={() => handleFavorite(hotel)}
                                                            className="hotel-card__favorite"
                                                        >
                                                            <Heart size={19} />
                                                        </button>

                                                        {hotel.starRating != null && (
                                                            <div className="hotel-card__rating">
                                                                <Star
                                                                    size={13}
                                                                    className="hotel-card__rating-star"
                                                                />
                                                                <span>{hotel.starRating}</span>
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
                                                                        {[hotel.city, hotel.country]
                                                                            .filter(Boolean)
                                                                            .join(", ") || "Location unavailable"}
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

                                                            <Link
                                                                href={`/hoteldetails/${hotelId}`}
                                                                className="hotel-card__link"
                                                            >
                                                                View Hotel
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </article>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}

                        {/* INFINITE SCROLL */}
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

                        {/* RETRY */}
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

                        {/* END */}
                        {!loading && !hasMore && hotels.length > 0 && (
                            <p className="nearby-hotels__end">
                                You've reached the end of the hotels list.
                            </p>
                        )}

                    </div>
                </section>

            </div>
        </main>
       </>

    );
}