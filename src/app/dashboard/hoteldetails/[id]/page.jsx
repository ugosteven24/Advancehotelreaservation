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

      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-5 w-36 rounded bg-slate-200" />
          <div className="h-80 rounded-3xl bg-slate-200 md:h-[440px]" />
          <div className="h-8 w-2/3 rounded bg-slate-200" />
          <div className="h-5 w-1/3 rounded bg-slate-200" />
          <div className="h-40 rounded-2xl bg-slate-200" />
        </div>
      </main>
      </>
    );
  }

  if (error || !hotel) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm">
            <HotelIcon size={30} />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Hotel not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {error || "This hotel may have been removed or the link may be incorrect."}
          </p>

          <Link
            href="/hotels"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
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
    <main className="min-h-screen bg-slate-50 pb-16">
      {/* Top navigation */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          >
            <ArrowLeft size={18} />
            Back to hotels
          </Link>

          <span className="text-sm font-bold tracking-tight text-slate-900">
            HotelReserve
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 py-5 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <ChevronRight size={15} />
          <Link href="/hotels" className="hover:text-slate-900">
            Hotels
          </Link>
          <ChevronRight size={15} />
          <span className="max-w-52 truncate font-medium text-slate-900">
            {hotel.hotelName || "Hotel details"}
          </span>
        </div>

        {/* Hotel heading */}
        <section className="mb-6 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {hotel.featured && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                  Featured hotel
                </span>
              )}

              {hotel.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <ShieldCheck size={14} />
                  Verified property
                </span>
              )}
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              {hotel.hotelName || "Unnamed hotel"}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={17} className="shrink-0 text-slate-400" />
                {location || hotel.address || "Location unavailable"}
              </span>

              {hotel.starRating && (
                <span className="inline-flex items-center gap-1.5">
                  <Star
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                  {hotel.starRating}
                </span>
              )}
            </div>

            {hotel.address && (
              <p className="mt-2 text-sm text-slate-500">
                {hotel.address}
                {hotel.zipCode ? `, ${hotel.zipCode}` : ""}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">
              {images.length} {images.length === 1 ? "photo" : "photos"}
            </span>
          </div>
        </section>

        {/* Main photo gallery */}
        <section className="mb-10">
          {images.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
              <button
                type="button"
                onClick={() => setActiveImage(images[0])}
                className="group relative h-72 overflow-hidden rounded-2xl bg-slate-200 text-left sm:h-96 md:h-[430px]"
                aria-label="View main hotel photo"
              >
                <img
                  src={activeImage || images[0]}
                  alt={hotel.hotelName || "Hotel"}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />

                <span className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-2 text-xs font-semibold text-white">
                  Main photo
                </span>
              </button>

              <div className="grid grid-cols-2 gap-3 md:grid-rows-2">
                {[0, 1, 2, 3].map((index) => {
                  const image = images[index + 1];

                  return (
                    <button
                      key={image || `empty-${index}`}
                      type="button"
                      disabled={!image}
                      onClick={() => image && setActiveImage(image)}
                      className="group relative min-h-32 overflow-hidden rounded-2xl bg-slate-200 disabled:cursor-default"
                      aria-label={`View hotel photo ${index + 2}`}
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={`${hotel.hotelName || "Hotel"} photo ${index + 2}`}
                          className="h-full min-h-32 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full min-h-32 items-center justify-center text-slate-400">
                          <HotelIcon size={28} />
                        </div>
                      )}

                      {index === 3 && images.length > 5 && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-bold text-white">
                          +{images.length - 5} more photos
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex h-72 flex-col items-center justify-center gap-3 rounded-2xl bg-slate-200 text-slate-500">
              <HotelIcon size={42} />
              <p className="text-sm font-medium">No hotel photos available</p>
            </div>
          )}

          {/* Thumbnail selector */}
          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  className={`h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                    activeImage === image
                      ? "border-slate-900"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Select photo ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`Hotel thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Details and booking sidebar */}
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_350px]">
          <div className="space-y-6">
            {/* Description */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-950">
                About this hotel
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                {hotel.description ||
                  "No description has been added for this property yet."}
              </p>

              {hotel.category && (
                <div className="mt-5 border-t border-slate-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Property category
                  </p>
                  <p className="mt-2 font-semibold text-slate-800">
                    {hotel.category}
                  </p>
                </div>
              )}
            </section>

            {/* Amenities */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-950">
                Hotel amenities
              </h2>

              {amenities.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {amenities.map((amenity, index) => {
                    const key = String(amenity);
                    const Icon =
                      amenityIcons[key.toLowerCase()] || CheckCircle;

                    return (
                      <div
                        key={`${key}-${index}`}
                        className="flex items-center gap-3 text-sm text-slate-700"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                          <Icon size={19} />
                        </span>
                        <span className="font-medium">{key}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">
                  Amenities have not been listed yet.
                </p>
              )}
            </section>

            {/* Check-in information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-950">
                Check-in and check-out
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays size={17} />
                    Check-in
                  </div>
                  <p className="mt-3 text-lg font-bold text-slate-900">
                    {hotel.checkIn || "Contact hotel"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock size={17} />
                    Check-out
                  </div>
                  <p className="mt-3 text-lg font-bold text-slate-900">
                    {hotel.checkOut || "Contact hotel"}
                  </p>
                </div>
              </div>

              {hotel.cancellationPolicy && (
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <h3 className="font-semibold text-slate-900">
                    Cancellation policy
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {hotel.cancellationPolicy}
                  </p>
                </div>
              )}
            </section>

            {/* Contact */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-950">
                Contact information
              </h2>

              <div className="mt-5 space-y-4">
                {hotel.phone && (
                  <a
                    href={`tel:${hotel.phone}`}
                    className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-950"
                  >
                    <Phone size={18} />
                    {hotel.phone}
                  </a>
                )}

                {hotel.email && (
                  <a
                    href={`mailto:${hotel.email}`}
                    className="flex items-center gap-3 break-all text-sm text-slate-600 hover:text-slate-950"
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
                    className="flex items-center gap-3 break-all text-sm text-slate-600 hover:text-slate-950"
                  >
                    <Globe size={18} />
                    {hotel.website}
                  </a>
                )}

                {!hotel.phone && !hotel.email && !hotel.website && (
                  <p className="text-sm text-slate-500">
                    Contact information is not available.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Booking card */}
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Price per night
              </p>

              {price ? (
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-slate-950">
                    {price}
                  </span>
                  <span className="text-sm text-slate-500">/ night</span>
                </div>
              ) : (
                <p className="mt-2 text-lg font-bold text-slate-900">
                  Contact for price
                </p>
              )}

              <div className="my-6 border-t border-slate-100" />

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-slate-400" />
                  <div>
                    <p className="font-semibold text-slate-800">Location</p>
                    <p className="mt-1 leading-5 text-slate-500">
                      {location || hotel.address || "Not specified"}
                    </p>
                  </div>
                </div>

                {hotel.verified && (
                  <div className="flex items-center gap-3">
                    <ShieldCheck
                      size={18}
                      className="shrink-0 text-emerald-600"
                    />
                    <span className="text-slate-600">
                      Verified property
                    </span>
                  </div>
                )}

                {hotel.starRating && (
                  <div className="flex items-center gap-3">
                    <Star
                      size={18}
                      className="shrink-0 fill-amber-400 text-amber-400"
                    />
                    <span className="text-slate-600">
                      {hotel.starRating}
                    </span>
                  </div>
                )}
              </div>

              <Link
                href={`/hotels/${hotelUrlId}/book`}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-4 text-sm font-bold text-white transition hover:bg-slate-700"
              >
                Check availability
                <ChevronRight size={18} />
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                Confirm your dates and room details before booking.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
