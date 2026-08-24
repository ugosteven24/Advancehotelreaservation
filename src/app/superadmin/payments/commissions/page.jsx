"use client";

import "./commissions.css";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    collection,
    getDocs,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaSearch,
    FaPercentage,
    FaEye,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function CommissionsPage() {

    const [commissions, setCommissions] = useState([]);
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

        loadCommissions();

    }, []);

    const loadCommissions = async () => {

        try {

            const snapshot = await getDocs(
                collection(db, "commissions")
            );

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setCommissions(data);

        } catch (err) {

            console.log(err);

            showToast(
                "Unable to load commissions.",
                "error"
            );

        }

    };

    const filtered = commissions.filter(item =>

        item.hotelName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.ownerName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.bookingNumber
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="commission-page content-wrapper">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>Commissions</h1>

                    <p>

                        Track commissions earned from hotel bookings.

                    </p>

                </div>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search..."
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

                            <th>Booking</th>

                            <th>Hotel</th>

                            <th>Owner</th>

                            <th>Total</th>

                            <th>Commission %</th>

                            <th>Commission</th>

                            <th>Payout</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.length === 0 ?

                                <tr>

                                    <td colSpan="9">

                                        No commission records found.

                                    </td>

                                </tr>

                                :

                                filtered.map(item => (<tr key={item.id}>

                                    <td>

                                        {item.bookingNumber}

                                    </td>

                                    <td>

                                        {item.hotelName}

                                    </td>

                                    <td>

                                        {item.ownerName}

                                    </td>

                                    <td>

                                        ₦{Number(item.totalBooking || 0).toLocaleString()}

                                    </td>

                                    <td>

                                        <div className="percent">

                                            <FaPercentage />

                                            <span>

                                                {item.commissionRate || 0}%

                                            </span>

                                        </div>

                                    </td>

                                    <td>

                                        ₦{Number(item.commission || 0).toLocaleString()}

                                    </td>

                                    <td>

                                        ₦{Number(item.payoutAmount || 0).toLocaleString()}

                                    </td>

                                    <td>

                                        <span
                                            className={
                                                item.status
                                                    ?.toLowerCase()
                                                    .replace(/\s+/g, "-")
                                            }
                                        >

                                            {item.status}

                                        </span>

                                    </td>

                                    <td>

                                        <Link
                                            href={`/superadmin/payments/commissions/${item.id}`}
                                            className="view"
                                        >

                                            <FaEye />

                                        </Link>

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