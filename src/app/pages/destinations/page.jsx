
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
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

import "./destination.css";


export default function ResortsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchDestinations() {
      try {
        setLoading(true);
        setError("");

        const snapshot = await getDocs(collection(db, "hotels"));

        const cities = new Map();

        snapshot.forEach((hotelDoc) => {
          const hotel = hotelDoc.data();
          const city = hotel.city?.trim();

          if (!city) return;

          const key = city.toLowerCase();

          if (!cities.has(key)) {
            cities.set(key, {
              city,
              coverImage: hotel.coverImage || "",
              length: 0,
            });
          }

          const destination = cities.get(key);

          destination.length += 1;

          // Use the first available coverImage for this city.
          if (!destination.coverImage && hotel.coverImage) {
            destination.coverImage = hotel.coverImage;
          }
        });

        const results = Array.from(cities.values())
          .sort((a, b) => b.length - a.length)


        if (!cancelled) {
          setDestinations(results);
        }
      } catch (err) {
        console.error("Failed to fetch destinations:", err);

        if (!cancelled) {
          setError("Unable to load destinations. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchDestinations();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="resorts-page">
    
      <section className="mx-5 px-margin-mobile pb-16 pt-16 pl-0 md:px-margin lg:px-14">
        {/* Section heading */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[18px]">
                explore
              </span>

              <span className="font-label-md text-label-md">
                CURATED GEOGRAPHIES
              </span>
            </div>

            <h2 className="font-headline-lg text-headline-lg-mobile font-bold tracking-tight text-on-surface md:text-headline-lg">
              Explore Popular Destinations
            </h2>

            <p className="mt-2 font-body-md text-body-md text-text-secondary">
              Discover popular places to stay and explore.
            </p>
          </div>

          <Link
            href="/search"
            className="inline-flex items-center gap-1 font-label-md text-primary transition-colors hover:opacity-75"
          >
            <span>Explore all destinations</span>

            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-text-secondary">
              Loading destinations...
            </p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-xl bg-surface-container p-6 text-center">
            <p className="text-text-secondary">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 font-semibold text-primary"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && destinations.length === 0 && (
          <div className="rounded-xl bg-surface-container p-8 text-center">
            <p className="text-text-secondary">
              No destinations found.
            </p>
          </div>
        )}

        {/* Overlapping destination cards */}

        {/* Destination cards */}
        {!loading && !error && destinations.length > 0 && (
          <>
            {/* Mobile: vertical cards */}

            {/* Mobile: 2-column destination grid */}
            <div className="grid grid-cols-2 gap-3 md:hidden">
              {destinations.map((destination) => (
                <Link
                  key={destination.city.toLowerCase()}
                  href={`/search?destination=${encodeURIComponent(
                    destination.city
                  )}`}
                  className="group relative h-52 overflow-hidden rounded-xl shadow-md"
                >
                  {/* Cover image */}
                  {destination.coverImage && (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url("${destination.coverImage}")`,
                      }}
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Hotel count: top-left */}
                  <div className="absolute left-2 top-2 z-10 rounded-full bg-white/95 px-2 py-1 text-[11px] font-semibold text-gray-900 shadow">
                    {destination.length}{" "}
                    {destination.length === 1 ? "Hotel" : "Hotels"}
                  </div>

                  {/* City name */}
                  <div className="absolute bottom-4 left-3 right-2 z-10">
                    <h3 className="text-lg font-bold leading-tight text-white">
                      {destination.city}
                    </h3>

                    <p className="mt-1 text-xs text-white/80">
                      Explore stays
                    </p>
                  </div>
                </Link>
              ))}
            </div>


            {/* Tablet: two-column grid */}
            <div className="hidden grid-cols-2 gap-5 md:grid lg:hidden">
              {destinations.map((destination) => (
                <Link
                  key={destination.city.toLowerCase()}
                  href={`/search?destination=${encodeURIComponent(
                    destination.city
                  )}`}
                  className="group relative h-64 overflow-hidden rounded-2xl shadow-md"
                >
                  {destination.coverImage && (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url("${destination.coverImage}")`,
                      }}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  <div className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-md">
                    {destination.length}{" "}
                    {destination.length === 1 ? "Hotel" : "Hotels"}
                  </div>

                  <div className="absolute bottom-6 left-5 z-10">
                    <h3 className="text-2xl font-bold text-white">
                      {destination.city}
                    </h3>
                    <p className="mt-1 text-sm text-white/80">
                      Explore stays in {destination.city}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop: 4-column destination grid */}
            <div className="hidden w-full grid-cols-4 gap-4 lg:grid">
              {destinations.map((destination) => (
                <Link
                  key={destination.city.toLowerCase()}
                  href={`/pages/destinationdetails?destination=${encodeURIComponent(destination.city)}`}
                  aria-label={`Explore ${destination.city}, ${destination.length} hotels`}
                  className="group relative h-[360px] overflow-hidden rounded-2xl border-2 border-white bg-surface-container shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {destination.coverImage && (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url("${destination.coverImage}")`,
                      }}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Hotel count */}
                  <div className="absolute left-4 top-4 z-10 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-md">
                    <span className="material-symbols-outlined text-base">
                      apartment
                    </span>
                    {destination.length}{" "}
                    {destination.length === 1 ? "Hotel" : "Hotels"}
                  </div>

                  {/* Destination details */}
                  <div className="absolute bottom-7 left-6 right-4 z-10">
                    <h3 className="text-2xl font-bold text-white">
                      {destination.city}
                    </h3>
                    <p className="mt-1 text-sm text-white/80">
                      Explore stays in {destination.city}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

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

