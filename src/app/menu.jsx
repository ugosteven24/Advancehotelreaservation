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

import Location from "./location/location"

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
           <Location/>
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
              className="nav-link"
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