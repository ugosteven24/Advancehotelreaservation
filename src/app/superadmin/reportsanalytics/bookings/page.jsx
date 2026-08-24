"use client";

import "./bookings.css";

import { useEffect, useMemo, useState } from "react";

import {
    collection,
    getDocs,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaCalendarCheck,
    FaCalendarTimes,
    FaSpinner,
    FaMoneyBillWave,
    FaSearch,
    FaDownload,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function BookingAnalyticsPage() {

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [toast, setToast] = useState({

        show: false,
        message: "",
        type: "success",

    });

    const showToast = (

        message,
        type = "success"

    ) => {

        setToast({

            show: true,
            message,
            type,

        });

        setTimeout(() => {

            setToast({

                show: false,
                message: "",
                type: "success",

            });

        }, 3000);

    };

    useEffect(() => {

        loadBookings();

    }, []);

    const loadBookings = async () => {

        try {

            const snapshot = await getDocs(

                collection(db, "bookings")

            );

            const data = snapshot.docs.map(doc => ({

                id: doc.id,
                ...doc.data(),

            }));

            setBookings(data);

        }

        catch (err) {

            console.log(err);

            showToast(

                "Unable to load booking analytics.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    const totalBookings = useMemo(() => {

        return bookings.length;

    }, [bookings]);

    const completedBookings = useMemo(() => {

        return bookings.filter(

            item => item.bookingStatus === "Completed"

        ).length;

    }, [bookings]);

    const cancelledBookings = useMemo(() => {

        return bookings.filter(

            item => item.bookingStatus === "Cancelled"

        ).length;

    }, [bookings]);

    const activeBookings = useMemo(() => {

        return bookings.filter(

            item =>

                item.bookingStatus === "Confirmed" ||

                item.bookingStatus === "Active"

        ).length;

    }, [bookings]);

    const totalRevenue = useMemo(() => {

        return bookings.reduce(

            (sum, item) =>

                sum + Number(item.totalPrice || 0),

            0

        );

    }, [bookings]);

    const filtered = bookings.filter(item =>

        item.hotelName

            ?.toLowerCase()

            .includes(search.toLowerCase())

        ||

        item.guestName

            ?.toLowerCase()

            .includes(search.toLowerCase())

        ||

        item.bookingId

            ?.toLowerCase()

            .includes(search.toLowerCase())

    );

    return (

        <div className="booking-analytics-page content-wrapper">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Booking Analytics

                    </h1>

                    <p>

                        Analyze booking performance across your platform.

                    </p>

                </div>

                <button className="export-btn">

                    <FaDownload />

                    Export Report

                </button>

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="icon total">

                        <FaCalendarCheck />

                    </div>

                    <div>

                        <h4>

                            Total Bookings

                        </h4>

                        <h2>

                            {totalBookings}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon completed">

                        <FaCalendarCheck />

                    </div>

                    <div>

                        <h4>

                            Completed

                        </h4>

                        <h2>

                            {completedBookings}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon active">

                        <FaSpinner />

                    </div>

                    <div>

                        <h4>

                            Active

                        </h4>

                        <h2>

                            {activeBookings}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon cancelled">

                        <FaCalendarTimes />

                    </div>

                    <div>

                        <h4>

                            Cancelled

                        </h4>

                        <h2>

                            {cancelledBookings}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon revenue">

                        <FaMoneyBillWave />

                    </div>

                    <div>

                        <h4>

                            Revenue

                        </h4>

                        <h2>

                            ₦{totalRevenue.toLocaleString()}

                        </h2>

                    </div>

                </div>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search booking..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />

                </div>

            </div>

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Booking ID</th>

                            <th>Guest</th>

                            <th>Hotel</th>

                            <th>Check In</th>

                            <th>Check Out</th>

                            <th>Status</th>

                            <th>Revenue</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            loading ?

                                <tr>

                                    <td colSpan="7">

                                        Loading...

                                    </td>

                                </tr>

                                :

                                filtered.length === 0 ?

                                    <tr>

                                        <td colSpan="7">

                                            No bookings found.

                                        </td>

                                    </tr>

                                    :

                                    filtered.map(item => (
                                        <tr key={item.id}>

                                            <td>

                                                {item.bookingId || item.id}

                                            </td>

                                            <td>

                                                <div className="guest-info">

                                                    <strong>

                                                        {item.guestName || "Guest"}

                                                    </strong>

                                                    <small>

                                                        {item.guests || 1} Guest(s)

                                                    </small>

                                                </div>

                                            </td>

                                            <td>

                                                <div className="hotel-info">

                                                    <strong>

                                                        {item.hotelName}

                                                    </strong>

                                                    <small>

                                                        {item.roomType || "Standard Room"}

                                                    </small>

                                                </div>

                                            </td>

                                            <td>

                                                {

                                                    item.checkIn

                                                        ?

                                                        item.checkIn

                                                        :

                                                        "-"

                                                }

                                            </td>

                                            <td>

                                                {

                                                    item.checkOut

                                                        ?

                                                        item.checkOut

                                                        :

                                                        "-"

                                                }

                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        item.bookingStatus
                                                            ?.toLowerCase()
                                                    }
                                                >

                                                    {item.bookingStatus}

                                                </span>

                                            </td>

                                            <td>

                                                <strong className="revenue">

                                                    ₦{Number(
                                                        item.totalPrice || 0
                                                    ).toLocaleString()}

                                                </strong>

                                            </td>

                                        </tr>

                                    ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}