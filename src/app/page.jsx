
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
  Waves,
  Wifi,
  Utensils,
  Dumbbell,
} from "lucide-react";

import PopularDestinations from "../components/homepage/PopularDestinations"
import PopularHotels from "../components/homepage/PopularHotels"

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

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");


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





  function handleSearch(event) {
    event.preventDefault();
    setSearchTerm(destination);
  }

  


  return (
    <main className="">
 

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


      <div className="px-5 lg:px-19">
        <PopularDestinations />
        <PopularHotels />
    
      </div>

     
    </main>
  );
}
