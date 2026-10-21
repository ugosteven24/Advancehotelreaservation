"use client";

import { useState } from "react";
import "./homepage.css";
import {
  FaArrowRight,

  FaSearch,
  FaLocationArrow,
  FaCalendar,

  FaUsers,

  FaHistory,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import PopularHotels from "../components/popularhotel/popularhotels"
import Menu from "./menu"
const destinations = [
  {
    name: "Bali, Indonesia",
    properties: "42 Premium Properties",
    image:"/images/gallery1.jpg",
  },
  {
    name: "Paris, France",
    properties: "28 Premium Properties",
    image:
      "/images/gallery2.jpg",
  },
  {
    name: "New York, USA",
    properties: "35 Premium Properties",
    image:
      "/images/gallery.jpg",
  },
];

const recentSearches = [
  {
    location: "Tokyo, Japan",
    details: "Oct 12 - Oct 18 • 2 Guests",
  },
  {
    location: "Maldives",
    details: "Nov 01 - Nov 10 • 2 Guests",
  },
];

const properties = [
  {
    name: "The Azure Tower",
    price: "$850",
    rating: "4.9",
    location: "Shinjuku, Tokyo • Luxury Suite • City View",
    image:
      "/images/gallery1.jpg",
  },
  {
    name: "Coral Reef Retreat",
    price: "$1,200",
    rating: "5.0",
    location: "North Atoll, Maldives • Overwater Villa • Private Pool",
    image:
      "/images/gallery2.jpg",
  },
];

export default function Home() {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    console.log({
      location,
      dates,
      guests,
    });

    alert(
      `Searching for ${
        location || "all destinations"
      }`
    );
  };

  return (
    <div className="luxestay-page">

      {/* ================= NAVBAR ================= */}
      
       <Menu/>
      {/* ================= MAIN ================= */}
      <main>

        {/* ================= HERO ================= */}
        <section
          className="hero-section"
          id="explore"
        >

          <div className="hero-background" />

          <div className="hero-overlay" />

          <div className="hero-content">

            <h1>
              Discover Extraordinary Stays
            </h1>

            <form
              className="search-box"
              onSubmit={handleSearch}
            >

              {/* LOCATION */}
              <div className="search-field">

                <label>
                  Where to?
                </label>

                <div className="input-wrapper">

                  <FaLocationArrow className="material-symbols-outlined"/>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    placeholder="Search destinations, hotels..."
                  />

                </div>

              </div>

              {/* DATES */}
              <div className="search-field">

                <label>
                  Dates
                </label>

                <div className="input-wrapper">

                  <FaCalendar className="material-symbols-outlined"/>

                  <input
                    type="text"
                    value={dates}
                    onChange={(e) =>
                      setDates(e.target.value)
                    }
                    placeholder="Check in - Check out"
                  />

                </div>

              </div>

              {/* GUESTS */}
              <div className="search-field">

                <label>
                  Guests
                </label>

                <div className="input-wrapper">

                  <FaUsers className="material-symbols-outlined"/>
                   

                  <input
                    type="text"
                    value={guests}
                    onChange={(e) =>
                      setGuests(e.target.value)
                    }
                    placeholder="2 Adults, 0 Children"
                  />

                </div>

              </div>

              {/* SEARCH BUTTON */}
              <div className="search-button-container">

                <button
                  type="submit"
                  className="search-button"
                >
                  Search
                </button>

              </div>

            </form>

          </div>

        </section>


        <PopularHotels/>

        {/* ================= FEATURED DESTINATIONS ================= */}
        <section className="featured-section">

          <div className="content-container">

            <h2>
              Featured Destinations
            </h2>

            <p className="section-description">
              Curated collections for your next journey.
            </p>

            <div className="destinations-grid">

              {destinations.map((destination) => (
                <div
                  className="destination-card"
                  key={destination.name}
                >

                  <Image
                    src={destination.image}
                    alt={destination.name}
                    layout="fill"
                    objectFit="cover"
                  />

                  <div className="destination-gradient" />

                  <div className="destination-content">

                    <h3>
                      {destination.name}
                    </h3>

                    <div className="destination-properties">

                      <span className="material-symbols-outlined">
                        hotel
                      </span>

                      {destination.properties}

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </section>

        {/* ================= PERSONALIZATION ================= */}
        <section className="personalization-section">

          <div className="personalization-container">

            {/* RECENT SEARCHES */}
            <div className="recent-searches">

              <h2>
                Recent Searches
              </h2>

              {recentSearches.map((search) => (
                <div
                  className="recent-search-card"
                  key={search.location}
                >

                  <div className="recent-search-left">

                    <div className="history-icon">

                      <FaHistory className="material-symbols-outlined"/>
                        

                    </div>

                    <div>

                      <h4>
                        {search.location}
                      </h4>

                      <p>
                        {search.details}
                      </p>

                    </div>

                  </div>

                  <FaArrowRight className="material-symbols-outlined arrow-icon"/>
                  

                </div>
              ))}

            </div>

            {/* RECOMMENDED */}
            <div className="recommended">

              <h2>
                Recommended for You
              </h2>

              <div className="properties-grid">

                {properties.map((property) => (
                  <div
                    className="property-card"
                    key={property.name}
                  >

                    <div className="property-image">

                      <img
                        src={property.image}
                        alt={property.name}
                      />

                      <div className="rating">

                        <span className="material-symbols-outlined">
                          star
                        </span>

                        {property.rating}

                      </div>

                    </div>

                    <div className="property-content">

                      <div className="property-heading">

                        <h3>
                          {property.name}
                        </h3>

                        <span className="property-price">
                          {property.price}
                          <small>/nt</small>
                        </span>

                      </div>

                      <p>
                        {property.location}
                      </p>

                      <button className="details-button">
                        View Details
                      </button>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="footer-container">

          <div className="footer-brand">

            <div className="footer-logo">
              LuxeStay
            </div>

            <div className="copyright">
              © 2024 LuxeStay Premium Hospitality Group.
              All rights reserved.
            </div>

          </div>

          <div className="footer-links">

            <a href="#about">
              About Us
            </a>

            <a href="#terms">
              Terms of Service
            </a>

            <a href="#privacy">
              Privacy Policy
            </a>

            <a href="#sustainability">
              Sustainability
            </a>

            <a href="#contact">
              Contact
            </a>

          </div>

        </div>

      </footer>

    </div>
  );
}