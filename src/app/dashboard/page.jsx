"use client";

import { useEffect, useState } from "react";
import "./dashboard.css";
import PopularHotels from "./component/popularhotels"
import { getUserId  } from "@/lib/session";
export default function ClientDashboard() {
    const [favorites, setFavorites] = useState([1, 2, 3, 4, 5]);
    const [activeMenu, setActiveMenu] = useState("Dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [userId, setUserId] = useState(null);
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
        {
            id: 4,
            name: "Verdant Canopy Lodge",
            location: "Arenal, Costa Rica",
            price: "$650",
            rating: "5.0",
            image:
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=85",
        },
        {
            id: 5,
            name: "Verdant Canopy Lodge",
            location: "Arenal, Costa Rica",
            price: "$650",
            rating: "5.0",
            image:
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=85",
        },
    ];
    const upcomingBooking = {
        hotel: "Grand Plaza Resort & Spa",
        location: "Bora Bora, French Polynesia",
        checkIn: "Oct 12, 3:00 PM",
        checkOut: "Oct 19, 11:00 AM",
        guests: "2 Adults",
        roomType: "Ocean Villa",
        confirmation: "#LXP-8924-M",
        image: "/images/gallery.jpg",
        daysUntil: "In 14 Days",
    };


    const pastStays = [
        {
            hotel: "The Metropolitan Hotel",
            location: "New York, USA",
            dates: "Sep 01 - Sep 05, 2023",
            reference: "#LXP-7102-K",
            total: "$1,250.00",
        },
        {
            hotel: "Alpine Retreat Lodge",
            location: "Zermatt, Switzerland",
            dates: "Feb 14 - Feb 20, 2023",
            reference: "#LXP-6551-A",
            total: "$3,400.00",
        },
        {
            hotel: "Oasis Desert Resort",
            location: "Dubai, UAE",
            dates: "Nov 10 - Nov 15, 2022",
            reference: "#LXP-5022-D",
            total: "$2,800.00",
        },
    ];


    const offers = [
        {
            title: "Spa Package Upgrade",
            description: "Available for next trip",
            image: "/images/gallery1.jpg",
        },
        {
            title: "Complimentary Dinner",
            description: "Redeem 10k points",
            image: "/images/gallery1.jpg",
        },
    ];

  useEffect(() => {
    getUserId().then(setUserId);
  }, []);
    return (
        <>
            <header className="client-header">



                <div>

                    <h1>
                        Welcome back, Sarah
                    </h1>

                    <p>
                        Here is an overview of your stays.
                    </p>

                </div>


                <button className="new-booking-btn">

                    <i className="fas fa-plus"></i>

                    New Booking

                </button>

            </header>


            {/* ===================================================
            TOP CONTENT
        =================================================== */}

            <section className="dashboard-top">



                {/* UPCOMING BOOKING */}

                <div className="upcoming-card">

                    <div className="booking-image">

                        <img
                            src={upcomingBooking.image}
                            alt={upcomingBooking.hotel}
                        />


                        <div className="booking-countdown">

                            <i className="far fa-clock"></i>

                            {upcomingBooking.daysUntil}

                        </div>


                        <div className="image-booking-info">

                            <span>
                                UPCOMING STAY
                            </span>

                            <strong>
                                Bungalow 124
                            </strong>

                            <small>
                                Arrival: Oct 15
                            </small>

                            <small>
                                Departure: Oct 22
                            </small>

                            <button>
                                Manage Reservation
                            </button>

                        </div>

                    </div>


                    <div className="booking-content">

                        <div className="booking-heading">

                            <div>

                                <span className="section-label">
                                    Upcoming Trip
                                </span>

                                <h2>
                                    {upcomingBooking.hotel}
                                </h2>

                                <p className="booking-location">

                                    <i className="fas fa-map-marker-alt"></i>

                                    {upcomingBooking.location}

                                </p>

                            </div>


                            <div className="confirmation-box">

                                <span>
                                    Confirmation
                                </span>

                                <strong>
                                    {upcomingBooking.confirmation}
                                </strong>

                            </div>

                        </div>


                        {/* <div className="booking-details">
                            <div>
                                <span>Check-in</span>
                                <input
                                    type="date"
                                    value={upcomingBooking.checkIn}
                                    name="checkIn"
                                   
                                />
                            </div>

                            <div>
                                <span>Check-out</span>
                                <input
                                    type="date"
                                    value={upcomingBooking.checkOut}
                                    name="checkOut"
                                />
                            </div>

                            <div>
                                <span>Guests</span>
                                <input
                                    type="number"
                                    value={upcomingBooking.guests}
                                    
                                />
                            </div>

                            <div>
                                <span>Room Type</span>
                                <input
                                    type="text"
                                    value={upcomingBooking.roomType}
                                    readOnly
                                />
                            </div>
                        </div> */}


                        <div className="booking-actions">

                            <button className="primary-btn">
                                View Details
                            </button>

                            <button className="secondary-btn">
                                Modify
                            </button>

                        </div>

                    </div>

                </div>


                {/* RIGHT COLUMN */}

                <div className="dashboard-right">


                    {/* LOYALTY */}

                    <div className="loyalty-card">

                        <div className="loyalty-watermark">
                            T
                        </div>

                        <span className="loyalty-label">
                            Luxe Club Status
                        </span>

                        <h2>
                            Platinum
                        </h2>

                        <strong>
                            45,200 Points
                        </strong>

                        <div className="progress-container">

                            <div className="progress-bar"></div>

                        </div>

                        <span className="points-next">
                            4,800 to Diamond
                        </span>

                    </div>


                    {/* OFFERS */}

                    <div className="offers-card">

                        <h2>
                            Recent Offers
                        </h2>


                        {offers.map((offer, index) => (

                            <div
                                className="offer-item"
                                key={index}
                            >

                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                />

                                <div className="offer-content">

                                    <strong>
                                        {offer.title}
                                    </strong>

                                    <span>
                                        {offer.description}
                                    </span>

                                </div>

                                <i className="fas fa-chevron-right"></i>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* ===================================================
            PAST STAYS
        =================================================== */}


            <h2 className="nearbyhotels">Nearby hotels</h2>


            <PopularHotels />
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
            <section className="past-stays-card">

                <div className="past-stays-header">

                    <h2>
                        Past Stays
                    </h2>

                    <button>
                        View All
                    </button>

                </div>


                <div className="past-stays-table">

                    <div className="table-row table-heading">

                        <span>Property</span>
                        <span>Dates</span>
                        <span>Booking Ref</span>
                        <span>Total</span>
                        <span>Action</span>

                    </div>


                    {pastStays.map((stay, index) => (

                        <div
                            className="table-row"
                            key={index}
                        >

                            <div className="property-column">

                                <strong>
                                    {stay.hotel}
                                </strong>

                                <span>
                                    {stay.location}
                                </span>

                            </div>


                            <span>
                                {stay.dates}
                            </span>


                            <span>
                                {stay.reference}
                            </span>


                            <strong>
                                {stay.total}
                            </strong>


                            <button className="receipt-btn">
                                Receipt
                            </button>

                        </div>

                    ))}

                </div>

            </section>





        </>
    );
}