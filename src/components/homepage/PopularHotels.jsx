import React from 'react'
import { useMemo, useState } from "react";
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
import Link from "next/link";
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


const amenityIcons = {
    Pool: Waves,
    Spa: Waves,
    WiFi: Wifi,
    Restaurant: Utensils,
    "Fitness Center": Dumbbell,
    "Beach Access": Waves,
};
export default function PopularHotels() {
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
    const pageSize = 6;
    const [sortBy, setSortBy] = useState("popular");
    const [favorites, setFavorites] = useState([]);
    const [page, setPage] = useState(1);
    const [mobileFiltersOpen, setMobileFiltersOpen] =
        useState(false);
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


    return (
        <>

            <main className="">






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
                                                className={`favorite-button ${favorites.includes(resort.id)
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

          
            </main>

        </>
    )
}
