
"use client";

import { useEffect, useState } from "react";
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
import "./notifications.css";

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

export default function Notifications() {
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
