"use client";

import "./dashboard.css"
import { useRouter } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { useEffect, useState } from "react";
import {
    FaTachometerAlt,
    FaHotel,
    FaUsers,
    FaCalendarCheck,
    FaMoneyBillWave,
    FaStar,
    FaBullhorn,
    FaChartLine,
    FaBell,
    FaFileAlt,
    FaCog,
    FaShieldAlt,
    FaUserShield,
    FaSignOutAlt,
    FaGlobe,
    FaSearch,
    FaTags,
    FaMapMarkerAlt,
    FaTicketAlt,
    FaClipboardList,
    FaUserTie,
    FaHistory,
} from "react-icons/fa";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});



export default function RootLayout({ children }) {
    const [activeMenu, setActiveMenu] = useState("Dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    // Prevent body scrolling when mobile sidebar is open
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);


    const handleMenuClick = (menu, path) => {
        setActiveMenu(menu);
        setSidebarOpen(false);
        router.push(path);
    };


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

    return (
        <div className="client-dashboard"  >




            <div
                className={`mobile-sidebar-overlay ${sidebarOpen ? "show" : ""
                    }`}
                onClick={() => setSidebarOpen(false)}
            />




            <aside
                className={`client-sidebar ${sidebarOpen ? "sidebar-open" : ""
                    }`}
            >

                {/* Sidebar header */}
                <div className="client-logo">

                    <span className="clientlogo">LuxeStay</span>

                    <button
                        className="mobile-sidebar-close"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close menu"
                    >
                        <i className="fas fa-times"></i>
                    </button>

                </div>


                {/* Navigation */}
                <nav className="client-navigation">

                    {/* Dashboard */}
                    <button
                        className={`client-nav-item ${activeMenu === "Dashboard" ? "active" : ""
                            }`}
                        onClick={() =>
                            handleMenuClick(
                                "Dashboard",
                                "/dashboard"
                            )
                        }
                    >
                        <FaTachometerAlt className="iconsize" />
                        <span >Dashboard</span>
                    </button>


                    {/* My Bookings */}
                    <button
                        className={`client-nav-item ${activeMenu === "My Bookings" ? "active" : ""
                            }`}
                        onClick={() =>
                            handleMenuClick(
                                "My Bookings",
                                "/dashboard/mybooking"
                            )
                        }
                    >
                        <FaCalendarCheck className="iconsize" />
                        <span>My Bookings</span>
                    </button>


                    <button
                        className={`client-nav-item ${activeMenu === "Explore" ? "active" : ""
                            }`}
                        onClick={() =>
                            handleMenuClick(
                                "Explore",
                                "/dashboard/explore"
                            )
                        }
                    >
                        <FaSearch className="iconsize" />
                        <span>Explore</span>
                    </button>
                    {/* Favorites */}
                    <button
                        className={`client-nav-item ${activeMenu === "Favorites" ? "active" : ""
                            }`}
                        onClick={() =>
                            handleMenuClick(
                                "Favorites",
                                "/dashboard/favorites"
                            )
                        }
                    >
                        <FaStar className="iconsize" />
                        <span>Favorites</span>
                    </button>


                    {/* My Reviews */}
                    <button
                        className={`client-nav-item ${activeMenu === "My Reviews" ? "active" : ""
                            }`}
                        onClick={() =>
                            handleMenuClick(
                                "My Reviews",
                                "/dashboard/reviews"
                            )
                        }
                    >
                        <FaStar className="iconsize" />
                        <span>My Reviews</span>
                    </button>


                    {/* Payments */}
                    <button
                        className={`client-nav-item ${activeMenu === "Payments" ? "active" : ""
                            }`}
                        onClick={() =>
                            handleMenuClick(
                                "Payments",
                                "/dashboard/payment"
                            )
                        }
                    >
                        <FaMoneyBillWave className="iconsize" />
                        <span>Payments</span>
                    </button>


                    {/* Promotions */}
                    <button
                        className={`client-nav-item ${activeMenu === "Promotions" ? "active" : ""
                            }`}
                        onClick={() =>
                            handleMenuClick(
                                "Promotions",
                                "/dashboard/promotion"
                            )
                        }
                    >
                        <FaTags className="iconsize" />
                        <span>Promotions</span>
                    </button>


                    {/* Notifications */}
                    <button
                        className={`client-nav-item ${activeMenu === "Notifications" ? "active" : ""
                            }`}
                        onClick={() =>
                            handleMenuClick(
                                "Notifications",
                                "/dashboard/notification"
                            )
                        }
                    >
                        <FaBell className="iconsize" />
                        <span>Notifications</span>
                    </button>


                    {/* Profile */}
                    <button
                        className={`client-nav-item ${activeMenu === "Profile" ? "active" : ""
                            }`}
                        onClick={() =>
                            handleMenuClick(
                                "Profile",
                                "/dashboard/profile"
                            )
                        }
                    >
                        <FaUsers className="iconsize" />
                        <span>Profile</span>
                    </button>


                    {/* Settings */}
                    <button
                        className={`client-nav-item ${activeMenu === "Settings" ? "active" : ""
                            }`}
                        onClick={() =>
                            handleMenuClick(
                                "Settings",
                                "/dashboard/settings"
                            )
                        }
                    >
                        <FaCog className="iconsize" />
                        <span>Settings</span>
                    </button>

                </nav>


                {/* Logout */}
                <button
                    className="client-logout"
                    onClick={() => {
                        setSidebarOpen(false);

                        // Firebase logout
                        // signOut(auth);

                        router.push("/login");
                    }}
                >
                    <FaSignOutAlt className="iconsize" />
                    <span>Logout</span>
                </button>

            </aside>




            <main className="client-main">



                <div className="mobile-topbar">

                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open menu"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    <span className="mobile-brand">
                        LuxeStay
                    </span>

                </div>



                {children}

            </main>




        </div>
    );
}