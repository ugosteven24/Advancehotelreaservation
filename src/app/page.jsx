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


const destinations = [
  {
    name: "Bali, Indonesia",
    properties: "42 Premium Properties",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzTGSWRi4dziLTQDz7PtdeYileJDNr9e1eWCyj6PsF2QlGThckU57O91lLnTGXBEpoAu8ihbyrCy-H_ZWT2V8cnFNNYKciUEm-DBxA0WcUu8insNnYXIMu7ntSFIdPQwR_oEJ2h7lHQ1GMTGsZwaR8_jMc0UZ2Gd683aW-5n_7d_JVPPK4hXMlvvru7Te66TL2r13uUy0SpiRF0LarB5zIz6oFOt6RSGKGfQ5ypKa8GMLR1fKujZa_tA",
  },
  {
    name: "Paris, France",
    properties: "28 Premium Properties",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvQgl0-FMKgmdTcHkFe_3rK_DBM_9wJydfQKL8Pj6Jhux4cvv3A9lfq_REkhFAufghG-2RLr9hLZwsdkUoBF1wnInkh2a8amNDGijiIwH91Wexw0FIy6Qmv7avACEjY7RBNbOuw0TLwTncYLRHkLOgOidm2-fZ9RfCDXW-9XcJKLlR6abWdkDumUk0udwbxTs4xi2FWgArniXaeE8T7fE1W_uZXW883Bb62WGYsDc9q5OpHbClLXs-fQ",
  },
  {
    name: "New York, USA",
    properties: "35 Premium Properties",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ3VdB-t7txNzuPJ6Il05Z1ve2QeEr9D5zMEM8t1hDppoEmf6FzPAEsf74ZQdbAJETuZmTInVhEtEJpxjTB6gZKqdl0njuH3bQ4KUKv8fYKhlPQIq4lzK4KH1mvj5Z7Qtf71NRjngLrFhAX-gIxcmkGQ6PO3H9C37tR_Rm6HrliC2OfciTm3byWE_-KFVVKQGZUw3iwtjwWxDQoNLbOtA--hfDHbCRYC6hVage1HmjQ4SSPc2LRm1pxw",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfKlwqAi-SYzSlVPqm0_yKx98SfdT5P2Vedk8mtQ8g6NVj8SN2jb8iMEY15IuowVFmxPM9_Cqcvr1jdveXZ4_-UXIP29UOKr8oUDLXV2KFTftg4wMqrQjkZu6V8GLoWR39hh17Mj74waTj88ZUMyL8AvQ_g14DF5Wozli1tWr3ei3LzIjjXpg0tfqAbELDbMZu6KMvh2zlhhIWZu4a5EtDrCpTywBLrKGDs9Zu-eKxW7MrwcWoJoTmfg",
  },
  {
    name: "Coral Reef Retreat",
    price: "$1,200",
    rating: "5.0",
    location: "North Atoll, Maldives • Overwater Villa • Private Pool",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvV5FVfU_Q7LjD_RZrod68MqdMF7JA8KHvyyxZqhhxTJhmOzfknzUrMbEQAM3vvJE0hUnE0bzPyxT2amqsWE1F24AjLbg8vEeH5o5iQz_ALQXCg-v22VVdji7v_F7xINyoeIfUpMFDAEf007vDc00zZNe0DQSYJ7h0HEgG9NTsFsfWXwl3b7zDTpUl60wIjOGRzJ5841JkovvPbumQbAVfkPsyWT5y1eFqGb2ME4gUJ4-nDwQnmU57ZQ",
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
      <nav className="top-navbar">

        <div className="navbar-container">

          <div className="brand">
            LuxeStay
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined">
              {mobileMenu ? "close" : "menu"}
            </span>
          </button>

          <div
            className={`navigation ${
              mobileMenu ? "navigation-open" : ""
            }`}
          >

            <a
              href="#explore"
              className="nav-link active"
              onClick={() => setMobileMenu(false)}
            >
              <FaSearch/>
              Explore
            </a>

            <a
              href="#hotels"
              className="nav-link"
              onClick={() => setMobileMenu(false)}
            >
              Hotels
            </a>

            <a
              href="#resorts"
              className="nav-link"
              onClick={() => setMobileMenu(false)}
            >
              Resorts
            </a>

            <a
              href="#experiences"
              className="nav-link"
              onClick={() => setMobileMenu(false)}
            >
              Experiences
            </a>

            <a
              href="#member"
              className="nav-link"
              onClick={() => setMobileMenu(false)}
            >
              Member Portal
            </a>

          </div>

          <div className="navbar-actions">

            <button className="sign-in-button">
              Sign In
            </button>

            <button className="join-button">
              Join
            </button>

          </div>

        </div>

      </nav>

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

                  <img
                    src={destination.image}
                    alt={destination.name}
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