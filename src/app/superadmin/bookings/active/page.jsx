"use client";

import "../bookings.css";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaSearch,
    FaEye,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function ActiveBookingsPage() {

    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState("");

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const showToast = (message, type = "success") => {

        setToast({
            show: true,
            message,
            type,
        });

        setTimeout(() => {

            setToast({
                show: false,
                message: "",
                type,
            });

        }, 3000);

    };

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            const q = query(
                collection(db, "bookings"),
                where("bookingStatus", "==", "Confirmed")
            );

            const snapshot = await getDocs(q);

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setBookings(data);

        } catch (error) {

            console.log(error);

            showToast(
                "Unable to load active bookings.",
                "error"
            );

        }

    };

    const filtered = bookings.filter(item =>

        item.bookingNumber?.toLowerCase().includes(search.toLowerCase()) ||

        item.hotelName?.toLowerCase().includes(search.toLowerCase()) ||

        item.guestName?.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div className="bookings-page content-wrapper">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>Active Bookings</h1>

                    <p>
                        View all active hotel bookings.
                    </p>

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

                            <th>Booking #</th>
                            <th>Hotel</th>
                            <th>Guest</th>
                            <th>Room</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.length === 0 ? (

                            <tr>

                                <td colSpan="10">
                                    No active bookings found.
                                </td>

                            </tr>

                        ) : (

                            filtered.map(item => (

                                <tr key={item.id}>

                                    <td>{item.bookingNumber}</td>

                                    <td>

                                        <div className="hotel-info">

                                            <img
                                                src={item.hotelImage}
                                                alt={item.hotelName}
                                                className="hotel-img"
                                            />

                                            <span>
                                                {item.hotelName}
                                            </span>

                                        </div>

                                    </td>

                                    <td>{item.guestName}</td>

                                    <td>{item.roomType}</td>

                                    <td>{item.checkIn}</td>

                                    <td>{item.checkOut}</td>

                                    <td>
                                        ₦{item.totalAmount}
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                item.paymentStatus.toLowerCase()
                                            }
                                        >
                                            {item.paymentStatus}
                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={
                                                item.bookingStatus
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-")
                                            }
                                        >
                                            {item.bookingStatus}
                                        </span>

                                    </td>

                                    <td>

                                        <Link
                                            href={`/superadmin/bookings/${item.id}`}
                                            className="view"
                                        >
                                            <FaEye />
                                        </Link>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}