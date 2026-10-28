
"use client";

import { useMemo, useState,useEffect } from "react";
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
import ProfileImage from "../component/profileImage";
import "./resorts.css";



import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";


function toDate(value) {
  if (!value) return null;

  if (typeof value?.toDate === "function") {
    return value.toDate();
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatRelativeTime(value) {
  const date = toDate(value);

  if (!date) return "Recently";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== new Date().getFullYear()
      ? "numeric"
      : undefined,
  });
}

function normalizeNotification(id, data) {
  return {
    id,
    category: data.category ?? "account",
    title: data.title ?? "Notification",
    message: data.message ?? "",
    time: formatRelativeTime(data.createdAt ?? data.timestamp),
    createdAt: toDate(data.createdAt ?? data.timestamp),
    icon: data.icon ?? "notifications",
    type: data.type ?? "general",
    unread: !(data.read ?? !data.unread),
    action: data.action ?? null,
    actionUrl: data.actionUrl ?? data.link ?? null,
  };
}

const categoryDefinitions = [
  { id: "all", label: "All Alerts", icon: "inbox" },
  { id: "booking", label: "Booking Updates", icon: "calendar_today" },
  {
    id: "security",
    label: "Account Security",
    icon: "security",
    danger: true,
  },
  { id: "offers", label: "Personalized Offers", icon: "sell" },
  { id: "account", label: "Account", icon: "account_circle" },
];
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
const [activeCategory, setActiveCategory] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    let unsubscribeNotifications = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (unsubscribeNotifications) {
        unsubscribeNotifications();
        unsubscribeNotifications = null;
      }

      setNotifications([]);
      setError("");

      if (!user) {
        setUserId(null);
        setLoading(false);
        setError("Please sign in to view your notifications.");
        return;
      }

      setUserId(user.uid);
      setLoading(true);

      const notificationsQuery = query(
        collection(db, "notifications"),
        where("userId", "==", user.uid)
      );

      unsubscribeNotifications = onSnapshot(
        notificationsQuery,
        (snapshot) => {
          const items = snapshot.docs.map((item) =>
            normalizeNotification(item.id, item.data())
          );

          items.sort((a, b) => {
            const aTime = a.createdAt?.getTime() ?? 0;
            const bTime = b.createdAt?.getTime() ?? 0;
            return bTime - aTime;
          });

          setNotifications(items);
          setLoading(false);
          setError("");
        },
        (err) => {
          console.error("Failed to load notifications:", err);
          setError("Unable to load notifications. Check your connection and permissions.");
          setLoading(false);
        }
      );
    });

    return () => {
      unsubscribeAuth();

      if (unsubscribeNotifications) {
        unsubscribeNotifications();
      }
    };
  }, []);

  const categories = categoryDefinitions.map((category) => {
    const count =
      category.id === "all"
        ? notifications.length
        : notifications.filter(
            (item) => item.category === category.id
          ).length;

    return { ...category, count };
  });

  const filteredNotifications = notifications.filter(
    (notification) =>
      activeCategory === "all" ||
      notification.category === activeCategory
  );

  const todayNotifications = filteredNotifications.filter((item) => {
    if (!item.createdAt) return true;

    const today = new Date();
    return (
      item.createdAt.getFullYear() === today.getFullYear() &&
      item.createdAt.getMonth() === today.getMonth() &&
      item.createdAt.getDate() === today.getDate()
    );
  });

  const yesterdayNotifications = filteredNotifications.filter((item) => {
    if (!item.createdAt) return false;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return (
      item.createdAt.getFullYear() === yesterday.getFullYear() &&
      item.createdAt.getMonth() === yesterday.getMonth() &&
      item.createdAt.getDate() === yesterday.getDate()
    );
  });

  const olderNotifications = filteredNotifications.filter((item) => {
    if (!item.createdAt) return false;

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const date = item.createdAt;

    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    const isYesterday =
      date.getFullYear() === yesterday.getFullYear() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getDate() === yesterday.getDate();

    return !isToday && !isYesterday;
  });

  async function markAsRead(notification) {
    if (!notification.unread || !userId) return;

    try {
      await updateDoc(
        doc(db, "notifications", notification.id),
        { read: true }
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      setError("Unable to update notification status.");
    }
  }

  async function markAllAsRead() {
    if (!userId || markingAll) return;

    const unreadNotifications = notifications.filter(
      (item) => item.unread
    );

    if (unreadNotifications.length === 0) return;

    setMarkingAll(true);
    setError("");

    try {
      // Firestore write batches support at most 500 operations.
      for (let i = 0; i < unreadNotifications.length; i += 500) {
        const batch = writeBatch(db);
        const chunk = unreadNotifications.slice(i, i + 500);

        chunk.forEach((item) => {
          batch.update(doc(db, "notifications", item.id), {
            read: true,
          });
        });

        await batch.commit();
      }
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
      setError("Unable to mark all notifications as read.");
    } finally {
      setMarkingAll(false);
    }
  }

  async function handleNotificationClick(notification) {
    await markAsRead(notification);

    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  }

  async function handleAction(notification, event) {
    event.stopPropagation();

    await markAsRead(notification);

    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  }

  function selectCategory(category) {
    setActiveCategory(category);
    setSidebarOpen(false);
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
          <Link href="/dashboard" >Home</Link>
          <Link href="/dashboard/explore">Explore</Link>

          <Link href="/dashboard/favorites">Favorites</Link>
          <Link href="/dashboard/mybooking">My-booking</Link>
          <Link href="/dashboard/notification" className="active">Notification</Link>
          <Link href="/dashboard/profile" >Profile</Link>
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
            <ProfileImage />
            <span>Sign Out </span>
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

 <main className="notifications-page">
      <header className="mobile-notification-header">
        <span className="mobile-logo">LuxeStay</span>

        <button
          className="mobile-menu-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle notification categories"
        >
          <span className="material-symbols-outlined">
            {sidebarOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {sidebarOpen && (
        <div
          className="notification-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="notifications-content">
        <div className="notifications-heading">
          <div>
            <h1>Notifications</h1>
            <p>
              Stay updated on your reservations, account alerts,
              and exclusive offers.
            </p>
          </div>

          <div className="notification-actions">
            <button
              className="outline-button"
              onClick={markAllAsRead}
              disabled={markingAll}
            >
              {markingAll ? "UPDATING..." : "MARK ALL AS READ"}
            </button>

            <button
              className="outline-button filter-button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="material-symbols-outlined">
                filter_list
              </span>
              FILTER
            </button>
          </div>
        </div>

        {error && <p role="alert">{error}</p>}

        <div className="notification-grid">
          <aside
            className={`notification-categories ${
              sidebarOpen ? "categories-open" : ""
            }`}
          >
            <div className="category-mobile-header">
              <span>Notification Categories</span>

              <button
                onClick={() => setSidebarOpen(false)}
                aria-label="Close categories"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-button ${
                  activeCategory === category.id ? "active" : ""
                } ${
                  category.danger ? "danger-category" : ""
                }`}
                onClick={() => selectCategory(category.id)}
              >
                <span className="material-symbols-outlined category-icon">
                  {category.icon}
                </span>

                <span className="category-label">
                  {category.label}
                </span>

                {category.danger ? (
                  <span className="category-danger-count">
                    <span className="danger-dot" />
                    {category.count}
                  </span>
                ) : (
                  <span className="category-count">
                    {category.count}
                  </span>
                )}
              </button>
            ))}
          </aside>

          <section className="notification-feed">
            {loading ? (
              <p>Loading notifications...</p>
            ) : filteredNotifications.length === 0 ? (
              <div className="empty-notifications">
                <span className="material-symbols-outlined">
                  notifications_off
                </span>

                <h3>No notifications</h3>
                <p>There are no notifications in this category.</p>
              </div>
            ) : (
              <>
                {todayNotifications.length > 0 && (
                  <>
                    <h2 className="notification-day">TODAY</h2>

                    {todayNotifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onClick={handleNotificationClick}
                        onAction={handleAction}
                      />
                    ))}
                  </>
                )}

                {yesterdayNotifications.length > 0 && (
                  <>
                    <h2 className="notification-day yesterday-title">
                      YESTERDAY
                    </h2>

                    {yesterdayNotifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onClick={handleNotificationClick}
                        onAction={handleAction}
                      />
                    ))}
                  </>
                )}

                {olderNotifications.length > 0 && (
                  <>
                    <h2 className="notification-day">EARLIER</h2>

                    {olderNotifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onClick={handleNotificationClick}
                        onAction={handleAction}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>

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

function NotificationCard({ notification, onClick, onAction }) {
  return (
    <article
      className={`notification-card ${notification.type} ${
        notification.unread ? "unread" : "read"
      }`}
      onClick={() => onClick(notification)}
    >
      {notification.unread && (
        <div className="unread-indicator" />
      )}

      <div className="notification-inner">
        <div className="notification-icon">
          <span className="material-symbols-outlined">
            {notification.icon}
          </span>
        </div>

        <div className="notification-content">
          <div className="notification-title-row">
            <h3>{notification.title}</h3>
            <span className="notification-time">
              {notification.time}
            </span>
          </div>

          <p className="notification-message">
            {notification.message}
          </p>

          {notification.action && (
            <div className="notification-action">
              <button
                className={
                  notification.type === "error"
                    ? "review-button"
                    : "view-itinerary-button"
                }
                onClick={(event) => onAction(notification, event)}
              >
                {notification.action}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
