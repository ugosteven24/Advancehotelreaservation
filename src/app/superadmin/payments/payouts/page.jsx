"use client";

import "./payout.css";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
    collection,
    getDocs,
    updateDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaMoneyCheckAlt,
    FaSearch,
    FaEye,
    FaCheck,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function PayoutPage() {

    const [payouts, setPayouts] = useState([]);
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
                type: "success",
            });

        }, 3000);

    };

    useEffect(() => {

        loadPayouts();

    }, []);

    const loadPayouts = async () => {

        try {

            const snapshot = await getDocs(
                collection(db, "payouts")
            );

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setPayouts(data);

        } catch (err) {

            console.log(err);

            showToast(
                "Unable to load payouts.",
                "error"
            );

        }

    };

    const markPaid = async (id) => {

        try {

            await updateDoc(
                doc(db, "payouts", id),
                {
                    status: "Paid",
                    paidAt: serverTimestamp(),
                }
            );

            showToast("Payout completed.");

            loadPayouts();

        } catch {

            showToast(
                "Unable to update payout.",
                "error"
            );

        }

    };

    const filtered = payouts.filter(item =>

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

        <div className="payout-page content-wrapper">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>Payouts</h1>

                    <p>

                        Manage hotel owner payouts.

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

                                    <td colSpan="8">

                                        No payouts found.

                                    </td>

                                </tr>

                                :

                                filtered.map(item => (

                                    <tr key={item.id}>

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

                                            ₦{Number(item.totalBooking).toLocaleString()}

                                        </td>

                                        <td>

                                            ₦{Number(item.commission).toLocaleString()}

                                        </td>

                                        <td>

                                            ₦{Number(item.payoutAmount).toLocaleString()}

                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    item.status
                                                        .toLowerCase()
                                                }
                                            >

                                                {item.status}

                                            </span>

                                        </td>

                                        <td>

                                            <div className="actions">

                                                <Link
                                                    href={`/superadmin/payments/payouts/${item.id}`}
                                                    className="view"
                                                >

                                                    <FaEye />

                                                </Link>

                                                {

                                                    item.status !== "Paid" &&

                                                    <button
                                                        className="pay"
                                                        onClick={() =>
                                                            markPaid(item.id)
                                                        }
                                                    >

                                                        <FaCheck />

                                                    </button>

                                                }

                                            </div>

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