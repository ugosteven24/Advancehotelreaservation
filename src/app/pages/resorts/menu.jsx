"use client";

import { useState } from "react";
import "./menu.css";
import {
  FaArrowRight,
  FaSearch,
  FaLocationArrow,
  FaCalendar,
  FaUsers,
  FaHistory,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    name: "Bali, Indonesia",
    properties: "42 Premium Properties",
    image: "/images/gallery1.jpg",
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
      `Searching for ${location || "all destinations"
      }`
    );
  };

  return (
    <>

      {/* ================= NAVBAR ================= */}
      <nav className="top-navbar">

        <div className="navbar-container">

         <div className="brand">
           <Link href={"/"}>
            Hotelreservation
           </Link>
          </div>


          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMobileMenu((prev) => !prev)}
            aria-label={mobileMenu ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenu}
            aria-controls="main-navigation"
          >
            {mobileMenu ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>

          <div
            className={`navigation ${mobileMenu ? "navigation-open" : ""
              }`}
          >

            

            <Link
              href={"/pages/hotels"}
              className="nav-link active"
              onClick={() => setMobileMenu(false)}
            >
              Hotels
            </Link>

            <a
              href="resorts"
              className="nav-link"
              onClick={() => setMobileMenu(false)}
            >
              Resorts
            </a>

            <a
              href="experiences"
              className="nav-link"
              onClick={() => setMobileMenu(false)}
            >
              Experiences
            </a>

            <a
              href="/pages/contact"
              className="nav-link"
              onClick={() => setMobileMenu(false)}
            >
              Contact
            </a>

          </div>

          <div className="navbar-actions">

            <Link className="sign-in-button" href={"/login"}>
              Sign In
            </Link>

            <Link className="join-button" href={"/register"}>
              Join
            </Link>

          </div>

        </div>

      </nav>


    </>
  );
}