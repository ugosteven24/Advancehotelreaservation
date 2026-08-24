"use client";

import { useState } from "react";
import "./notifications.css";

export default function Notifications() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      category: "booking",
      title: "Booking Confirmed: The Grand Azure",
      time: "2m ago",
      message:
        "Your suite for Oct 12 - Oct 15 is confirmed. Confirmation #AZ9824. Tap here to view details or manage your reservation.",
      icon: "check_circle",
      type: "success",
      unread: true,
      action: "VIEW ITINERARY",
    },
    {
      id: 2,
      category: "security",
      title: "New Login Detected",
      time: "1h ago",
      message:
        "We noticed a new login to your account from a Mac device in Paris, France. If this was you, you can ignore this alert.",
      icon: "lock_open",
      type: "error",
      unread: true,
      action: "REVIEW ACTIVITY",
    },
    {
      id: 3,
      category: "offers",
      title: "Exclusive Spa Offer at The Grand Azure",
      time: "Yesterday",
      message:
        "As a Premium Guest Member, enjoy a complimentary 30-minute massage upgrade when you book any 60-minute treatment during your upcoming stay.",
      icon: "spa",
      type: "secondary",
      unread: false,
      action: null,
    },
    {
      id: 4,
      category: "account",
      title: "Payment Method Expiring Soon",
      time: "Yesterday",
      message:
        "The Visa card ending in 4242 linked to your profile will expire at the end of the month. Please update your payment details to ensure seamless booking.",
      icon: "credit_card",
      type: "general",
      unread: false,
      action: null,
    },
  ]);

  const categories = [
    {
      id: "all",
      label: "All Alerts",
      icon: "inbox",
      count: 12,
    },
    {
      id: "booking",
      label: "Booking Updates",
      icon: "calendar_today",
      count: 3,
    },
    {
      id: "security",
      label: "Account Security",
      icon: "security",
      count: 1,
      danger: true,
    },
    {
      id: "offers",
      label: "Personalized Offers",
      icon: "sell",
      count: 8,
    },
  ];

  const getFilteredNotifications = () => {
    if (activeCategory === "all") {
      return notifications;
    }

    return notifications.filter(
      (notification) => notification.category === activeCategory
    );
  };

  const filteredNotifications = getFilteredNotifications();

  const todayNotifications = filteredNotifications.filter(
    (notification) =>
      notification.time !== "Yesterday"
  );

  const yesterdayNotifications = filteredNotifications.filter(
    (notification) =>
      notification.time === "Yesterday"
  );

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const handleNotificationClick = (notification) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id
          ? { ...item, unread: false }
          : item
      )
    );

    alert(`Opening: ${notification.title}`);
  };

  const handleAction = (notification, event) => {
    event.stopPropagation();

    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id
          ? { ...item, unread: false }
          : item
      )
    );

    alert(notification.action);
  };

  const selectCategory = (category) => {
    setActiveCategory(category);
    setSidebarOpen(false);
  };

  return (
    <main className="notifications-page">

      {/* Mobile Header */}
      <header className="mobile-notification-header">

        <span className="mobile-logo">
          LuxeStay
        </span>

        <button
          className="mobile-menu-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined">
            {sidebarOpen ? "close" : "menu"}
          </span>
        </button>

      </header>


      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="notification-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      {/* Main Content */}
      <div className="notifications-content">

        {/* Page Header */}
        <div className="notifications-heading">

          <div>
            <h1>
              Notifications
            </h1>

            <p>
              Stay updated on your reservations, account alerts,
              and exclusive offers.
            </p>
          </div>


          {/* Desktop Actions */}
          <div className="notification-actions">

            <button
              className="outline-button"
              onClick={markAllAsRead}
            >
              MARK ALL AS READ
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


        {/* Notification Grid */}
        <div className="notification-grid">


          {/* Categories */}
          <aside
            className={`notification-categories ${
              sidebarOpen ? "categories-open" : ""
            }`}
          >

            <div className="category-mobile-header">
              <span>
                Notification Categories
              </span>

              <button
                onClick={() => setSidebarOpen(false)}
              >
                <span className="material-symbols-outlined">
                  close
                </span>
              </button>
            </div>


            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-button ${
                  activeCategory === category.id
                    ? "active"
                    : ""
                } ${
                  category.danger
                    ? "danger-category"
                    : ""
                }`}
                onClick={() =>
                  selectCategory(category.id)
                }
              >

                <span className="material-symbols-outlined category-icon">
                  {category.icon}
                </span>

                <span className="category-label">
                  {category.label}
                </span>

                {category.danger ? (
                  <span className="category-danger-count">
                    <span className="danger-dot"></span>
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


          {/* Notification Feed */}
          <section className="notification-feed">

            {/* TODAY */}
            {todayNotifications.length > 0 && (
              <>
                <h2 className="notification-day">
                  TODAY
                </h2>

                {todayNotifications.map(
                  (notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onClick={handleNotificationClick}
                      onAction={handleAction}
                    />
                  )
                )}
              </>
            )}


            {/* YESTERDAY */}
            {yesterdayNotifications.length > 0 && (
              <>
                <h2 className="notification-day yesterday-title">
                  YESTERDAY
                </h2>

                {yesterdayNotifications.map(
                  (notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onClick={handleNotificationClick}
                      onAction={handleAction}
                    />
                  )
                )}
              </>
            )}


            {/* Empty State */}
            {filteredNotifications.length === 0 && (
              <div className="empty-notifications">

                <span className="material-symbols-outlined">
                  notifications_off
                </span>

                <h3>
                  No notifications
                </h3>

                <p>
                  There are no notifications in this category.
                </p>

              </div>
            )}

          </section>

        </div>

      </div>

    </main>
  );
}


/* =================================
   NOTIFICATION CARD
================================= */

function NotificationCard({
  notification,
  onClick,
  onAction,
}) {
  return (
    <article
      className={`notification-card ${
        notification.type
      } ${
        notification.unread
          ? "unread"
          : "read"
      }`}
      onClick={() => onClick(notification)}
    >

      {/* Unread Indicator */}
      {notification.unread && (
        <div className="unread-indicator" />
      )}


      <div className="notification-inner">

        {/* Icon */}
        <div className="notification-icon">
          <span className="material-symbols-outlined">
            {notification.icon}
          </span>
        </div>


        {/* Content */}
        <div className="notification-content">

          <div className="notification-title-row">

            <h3>
              {notification.title}
            </h3>

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
                onClick={(event) =>
                  onAction(notification, event)
                }
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