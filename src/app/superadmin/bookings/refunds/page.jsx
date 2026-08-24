"use client";

import "../bookings.css";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
    collection,
    getDocs,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaSearch,
    FaEye,
    FaUndo,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function RefundRequestsPage() {

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
        loadRefunds();
    }, []);

    const loadRefunds = async () => {

        try {

            const snapshot = await getDocs(
                collection(db, "bookings")
            );

            const data = snapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                .filter(item =>
                    item.bookingStatus === "Refund Requested"
                );

            setBookings(data);

        } catch (error) {

            console.log(error);

            showToast(
                "Unable to load refund requests.",
                "error"
            );

        }

    };

    const approveRefund = async (booking) => {

        showToast(
            `Approve refund for ${booking.bookingNumber}`
        );

        // Update Firestore here
        // bookingStatus -> Refunded
        // paymentStatus -> Refunded

    };

    const filtered = bookings.filter(item =>

        item.bookingNumber
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.hotelName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.guestName
            ?.toLowerCase()
            .includes(search.toLowerCase())

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

                    <h1>Refund Requests</h1>

                    <p>
                        Review and process guest refund requests.
                    </p>

                </div>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search refund..."
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
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Request Date</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.length === 0 ? (

                            <tr>

                                <td colSpan="8">

                                    No refund requests found.

                                </td>

                            </tr>

                        ) : (

                            filtered.map(item => (

                                <tr key={item.id}>

                                    <td>
                                        {item.bookingNumber}
                                    </td>

                                    <td>

                                        <div className="hotel-info">

                                            <img
                                                src={item.hotelImage}
                                                alt=""
                                                className="hotel-img"
                                            />

                                            <span>
                                                {item.hotelName}
                                            </span>

                                        </div>

                                    </td>

                                    <td>
                                        {item.guestName}
                                    </td>

                                    <td>
                                        ₦{item.totalAmount}
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                item.paymentStatus
                                                    ?.toLowerCase()
                                            }
                                        >

                                            {item.paymentStatus}

                                        </span>

                                    </td>

                                    <td>

                                        {

                                            item.createdAt?.toDate
                                                ? item.createdAt
                                                      .toDate()
                                                      .toLocaleDateString()
                                                : "-"

                                        }

                                    </td>

                                    <td>

                                        <span className="refund-requested">

                                            Refund Requested

                                        </span>

                                    </td>

                                    <td>

                                        <div className="actions">

                                            <Link
                                                href={`/superadmin/bookings/${item.id}`}
                                                className="view"
                                            >

                                                <FaEye />

                                            </Link>

                                            <button
                                                className="status"
                                                onClick={() =>
                                                    approveRefund(item)
                                                }
                                            >

                                                <FaUndo />

                                            </button>

                                        </div>

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