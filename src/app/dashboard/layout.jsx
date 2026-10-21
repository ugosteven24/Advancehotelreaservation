"use client";

import "./dashboard.css";
import "./logout-dialog.css";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    FaTachometerAlt,
    FaCalendarCheck,
    FaSearch,
    FaStar,
    FaMoneyBillWave,
    FaTags,
    FaBell,
    FaUsers,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaTimes,
} from "react-icons/fa";

import { logout } from "@/lib/logout";

const MENU_ITEMS = [
    { label: "Dashboard", path: "/dashboard", icon: FaTachometerAlt },
    { label: "My Bookings", path: "/dashboard/mybooking", icon: FaCalendarCheck },
    { label: "Explore", path: "/dashboard/explore", icon: FaSearch },
    { label: "Favorites", path: "/dashboard/favorites", icon: FaStar },
    { label: "My Reviews", path: "/dashboard/reviews", icon: FaStar },
    { label: "Payments", path: "/dashboard/payment", icon: FaMoneyBillWave },
    { label: "Promotions", path: "/dashboard/promotion", icon: FaTags },
    { label: "Notifications", path: "/dashboard/notification", icon: FaBell },
    { label: "Profile", path: "/dashboard/profile", icon: FaUsers },
    { label: "Settings", path: "/dashboard/settings", icon: FaCog },
];

// "/dashboard" must match exactly, otherwise it would be active on every page.
function isActivePath(pathname, path) {
    if (path === "/dashboard") return pathname === "/dashboard";
    return pathname === path || pathname.startsWith(`${path}/`);
}

// The root layout (app/layout.tsx) already provides <html>, <body>, fonts
// and globals.css, so this layout only renders the dashboard shell.
export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const cancelButtonRef = useRef(null);

    const router = useRouter();
    const pathname = usePathname();

    // Prevent body scrolling when the mobile sidebar is open.
    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);

    // Logout confirmation dialog: focus Cancel, close on Escape.
    useEffect(() => {
        if (!showLogoutConfirm) return;

        cancelButtonRef.current?.focus();

        const onKeyDown = (event) => {
            if (event.key === "Escape" && !loggingOut) {
                setShowLogoutConfirm(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [showLogoutConfirm, loggingOut]);

    const openLogoutConfirm = () => {
        setSidebarOpen(false);
        setShowLogoutConfirm(true);
    };

    const closeLogoutConfirm = () => {
        if (!loggingOut) setShowLogoutConfirm(false);
    };

    const handleMenuClick = (path) => {
        setSidebarOpen(false);
        router.push(path);
    };

    const handleLogout = async () => {
        if (loggingOut) return;

        setLoggingOut(true);

        try {
            await logout(); // clears the server cookie, then Firebase
        } catch (error) {
            console.error("Logout failed:", error);
        }

        router.replace("/login");
        router.refresh();
    };

    return (
        <div className="client-dashboard">
            <div
                className={`mobile-sidebar-overlay ${sidebarOpen ? "show" : ""}`}
                onClick={() => setSidebarOpen(false)}
            />

            <aside className={`client-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
                {/* Sidebar header */}
                <div className="client-logo">
                    <span className="clientlogo">LuxeStay</span>

                    <button
                        type="button"
                        className="mobile-sidebar-close"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close menu"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="client-navigation">
                    {MENU_ITEMS.map(({ label, path, icon: Icon }) => (
                        <button
                            key={path}
                            type="button"
                            className={`client-nav-item ${isActivePath(pathname, path) ? "active" : ""
                                }`}
                            aria-current={isActivePath(pathname, path) ? "page" : undefined}
                            onClick={() => handleMenuClick(path)}
                        >
                            <Icon className="iconsize" />
                            <span>{label}</span>
                        </button>
                    ))}
                </nav>

                {/* Logout */}
                <button
                    type="button"
                    className="client-logout"
                    onClick={openLogoutConfirm}
                >
                    <FaSignOutAlt className="iconsize" />
                    <span>Logout</span>
                </button>
            </aside>

            <main className="client-main">
                <div className="mobile-topbar">
                    <button
                        type="button"
                        className="mobile-menu-toggle"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open menu"
                    >
                        <FaBars />
                    </button>

                    <span className="mobile-brand">LuxeStay</span>
                </div>

                {children}
            </main>

            {/* Logout confirmation (top of the page) */}
            {showLogoutConfirm && (
                <div className="logout-dialog-backdrop" onClick={closeLogoutConfirm}>
                    <div
                        className="logout-dialog"
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="logout-dialog-title"
                        aria-describedby="logout-dialog-text"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="logout-dialog__icon">
                            <FaSignOutAlt />
                        </div>

                        <div className="logout-dialog__body">
                            <h2 id="logout-dialog-title">Log out of LuxeStay?</h2>
                            <p id="logout-dialog-text">
                                You will need to sign in again to see your bookings and
                                favorites.
                            </p>
                        </div>

                        <div className="logout-dialog__actions">
                            <button
                                ref={cancelButtonRef}
                                type="button"
                                className="logout-dialog__cancel"
                                onClick={closeLogoutConfirm}
                                disabled={loggingOut}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="logout-dialog__confirm"
                                onClick={handleLogout}
                                disabled={loggingOut}
                            >
                                {loggingOut ? "Signing out..." : "Yes, log out"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}