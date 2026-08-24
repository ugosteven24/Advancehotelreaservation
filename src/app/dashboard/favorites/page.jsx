"use client";

import { useState } from "react";
import "./favorites.css";



export default function Home() {
  const [favorites, setFavorites] = useState([1, 2, 3]);
  const [filterOpen, setFilterOpen] = useState(false);
  const stays = [
    {
      id: 1,
      name: "Aegean Horizon Villa",
      location: "Santorini, Greece",
      price: "$1,250",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: 2,
      name: "Skyline Summit",
      location: "Tokyo, Japan",
      price: "$890",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: 3,
      name: "Verdant Canopy Lodge",
      location: "Arenal, Costa Rica",
      price: "$650",
      rating: "5.0",
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=85",
    },
  ];
  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="page">
      <header className="header">
        <div>
          <h1>Favorites</h1>
          <p>Your curated collection of premium stays.</p>
        </div>

        <button
          className="filter-button"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
          <span>Filter</span>
        </button>
      </header>

      {filterOpen && (
        <div className="filter-panel">
          <button>All stays</button>
          <button>Under $750</button>
          <button>Top rated</button>
        </div>
      )}

      <section className="cards">
        {stays.map((stay) => {
          const isFavorite = favorites.includes(stay.id);

          return (
            <article className="card" key={stay.id}>
              <div className="image-wrapper">
                <img src={stay.image} alt={stay.name} />

                <button
                  className={`favorite-button ${isFavorite ? "active" : ""
                    }`}
                  onClick={() => toggleFavorite(stay.id)}
                  aria-label={
                    isFavorite
                      ? `Remove ${stay.name} from favorites`
                      : `Add ${stay.name} to favorites`
                  }
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="23"
                    height="23"
                    fill={isFavorite ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                    />
                  </svg>
                </button>

                <span className="price">{stay.price} / night</span>
              </div>

              <div className="card-content">
                <div className="title-row">
                  <h2>{stay.name}</h2>

                  <div className="rating">
                    <span>★</span>
                    {stay.rating}
                  </div>
                </div>

                <div className="location">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>

                  <span>{stay.location}</span>
                </div>

                <button className="book-button">Book Now</button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}