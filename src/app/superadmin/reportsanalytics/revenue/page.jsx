"use client";

import "./revenue.css";

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

import {
    FaMoneyBillWave,
    FaWallet,
    FaHotel,
    FaSearch,
    FaDownload,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function RevenuePage() {

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

        loadRevenue();

    }, []);

    const loadRevenue = async () => {

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
                "Unable to load revenue.",
                "error"
            );

        }

        finally {

            setLoading(false);

        }

    };

    const totalRevenue = useMemo(() => {

        return bookings.reduce(

            (sum, item) =>

                sum + Number(item.totalPrice || 0),

            0

        );

    }, [bookings]);

    const totalCommission = useMemo(() => {

        return bookings.reduce(

            (sum, item) =>

                sum + Number(item.commission || 0),

            0

        );

    }, [bookings]);

    const ownerRevenue = useMemo(() => {

        return totalRevenue - totalCommission;

    }, [totalRevenue, totalCommission]);

    const filtered = bookings.filter(item =>

        item.hotelName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.guestName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.bookingId
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="revenue-page content-wrapper">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Revenue Analytics

                    </h1>

                    <p>

                        Track platform earnings and hotel revenue.

                    </p>

                </div>

                <button className="export-btn">

                    <FaDownload />

                    Export Report

                </button>

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="icon revenue">

                        <FaMoneyBillWave />

                    </div>

                    <div>

                        <h4>

                            Total Revenue

                        </h4>

                        <h2>

                            ₦{totalRevenue.toLocaleString()}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon commission">

                        <FaWallet />

                    </div>

                    <div>

                        <h4>

                            Platform Commission

                        </h4>

                        <h2>

                            ₦{totalCommission.toLocaleString()}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon hotel">

                        <FaHotel />

                    </div>

                    <div>

                        <h4>

                            Hotel Owners Revenue

                        </h4>

                        <h2>

                            ₦{ownerRevenue.toLocaleString()}

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

                            <th>Hotel</th>

                            <th>Guest</th>

                            <th>Total</th>

                            <th>Commission</th>

                            <th>Owner Earnings</th>

                            <th>Date</th>

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

                                            No revenue found.

                                        </td>

                                    </tr>

                                    :

                                    filtered.map(item => (
                                        <tr key={item.id}>

                                            <td>

                                                {item.bookingId || item.id}

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

                                                {item.guestName}

                                            </td>

                                            <td>

                                                <strong>

                                                    ₦{Number(
                                                        item.totalPrice || 0
                                                    ).toLocaleString()}

                                                </strong>

                                            </td>

                                            <td>

                                                <span className="commission">

                                                    ₦{Number(
                                                        item.commission || 0
                                                    ).toLocaleString()}

                                                </span>

                                            </td>

                                            <td>

                                                <span className="owner-revenue">

                                                    ₦{(
                                                        Number(item.totalPrice || 0) -
                                                        Number(item.commission || 0)
                                                    ).toLocaleString()}

                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    item.createdAt?.toDate

                                                        ?

                                                        item.createdAt
                                                            .toDate()
                                                            .toLocaleDateString()

                                                        :

                                                        "-"

                                                }

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