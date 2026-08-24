"use client";

import { useState } from "react";
import "./explore.css";

export default function Home() {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("2 Guests, 1 Room");

  const categories = [
    {
      name: "Beachfront",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M4 20L20 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 7C11.5 7 16 11.5 16 16"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M4 4C10 4 20 10 20 20"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M3 21C5 18 7 17 10 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "Mountain Retreats",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M3 20L9.5 11L13 15L16 10L21 20H3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 11L11 8L13 11"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      name: "Urban Luxury",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M4 21V8H10V21"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M10 21V4H16V21"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M16 21V11H21V21"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path d="M7 11H8" stroke="currentColor" strokeWidth="2" />
          <path d="M7 15H8" stroke="currentColor" strokeWidth="2" />

          <path d="M13 8H14" stroke="currentColor" strokeWidth="2" />
          <path d="M13 12H14" stroke="currentColor" strokeWidth="2" />
          <path d="M13 16H14" stroke="currentColor" strokeWidth="2" />

          <path d="M18 15H19" stroke="currentColor" strokeWidth="2" />
          <path d="M18 18H19" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "Spa & Wellness",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21C12 15 12 10 12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 13C7 13 4 10 4 6C9 6 12 9 12 13Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M12 15C17 15 20 12 20 8C15 8 12 11 12 15Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M12 9C9 8 7 5 8 2"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      name: "Golf Resorts",
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M8 21V4L17 8L8 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M5 21H13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="18"
            cy="20"
            r="2"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
  ];

  const handleSearch = () => {
    console.log({
      location,
      dates,
      guests,
    });
  };

  return (
    <main className="explore-page">
      <section className="hero-section">
        <h1>Find Your Next Luxury Stay</h1>

        <p className="hero-subtitle">
          Where would you like to escape to next, guest?
        </p>

        <div className="search-box">
          {/* LOCATION */}
          <div className="search-field-wrapper">
            <label>LOCATION</label>

            <div className="search-field">
              <svg
                className="field-icon"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 10C20 15 12 21 12 21S4 15 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <circle
                  cx="12"
                  cy="10"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>

              <input
                type="text"
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="vertical-divider"></div>

          {/* DATES */}
          <div className="search-field-wrapper">
            <label>DATES</label>

            <div className="search-field">
              <svg
                className="field-icon"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="16"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M3 9H21"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M8 3V7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M16 3V7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <input
                type="text"
                placeholder="Check in - Check out"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
              />
            </div>
          </div>

          <div className="vertical-divider"></div>

          {/* GUESTS */}
          <div className="search-field-wrapper">
            <label>GUESTS</label>

            <div className="search-field">
              <svg
                className="field-icon"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="9"
                  cy="8"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M3 20C3 16.69 5.69 14 9 14C12.31 14 15 16.69 15 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M15 11C17.21 11 19 12.79 19 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M18 14C20.21 14 22 15.79 22 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <input
                type="text"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <button
            className="search-button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <h2>Explore by Category</h2>

        <div className="categories-container">
          {categories.map((category) => (
            <button
              className="category-button"
              key={category.name}
              onClick={() => console.log(category.name)}
            >
              <span className="category-icon">
                {category.icon}
              </span>

              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}