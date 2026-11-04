"use client";

import "./refunds.css";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    collection,
    getDocs,
    updateDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaSearch,
    FaEye,
    FaCheck,
    FaTimes,
    FaUndoAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";

const BUTTON_COLOR = "#2563eb";


export default function RefundsPage() {

    const [refunds, setRefunds] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {

        loadRefunds();

    }, []);

    const loadRefunds = async () => {

        try {

            const snapshot = await getDocs(
                collection(db, "refunds")
            );

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setRefunds(data);

        } catch (err) {

            console.log(err);

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to load refunds.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

    };

    const approveRefund = async (id) => {

        try {

            await updateDoc(
                doc(db, "refunds", id),
                {
                    status: "Approved",
                    approvedAt: serverTimestamp(),
                }
            );

            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Refund approved.",
              confirmButtonColor: BUTTON_COLOR,
            });

            loadRefunds();

        } catch {

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to approve refund.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

    };

    const rejectRefund = async (id) => {

        try {

            await updateDoc(
                doc(db, "refunds", id),
                {
                    status: "Rejected",
                    rejectedAt: serverTimestamp(),
                }
            );

            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Refund rejected.",
              confirmButtonColor: BUTTON_COLOR,
            });

            loadRefunds();

        } catch {

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to reject refund.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

    };

    const filtered = refunds.filter(item =>

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

        <div className="refund-page content-wrapper">


            <div className="page-header">

                <div>

                    <h1>Refunds</h1>

                    <p>

                        Manage customer refund requests.

                    </p>

                </div>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search refunds..."
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

                            <th>Guest</th>

                            <th>Amount</th>

                            <th>Reason</th>

                            <th>Status</th>

                            <th>Request Date</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.length === 0 ?

                                <tr>

                                    <td colSpan="8">

                                        No refund requests found.

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

                                            {item.guestName}

                                        </td>

                                        <td>

                                            ₦{Number(item.refundAmount || 0).toLocaleString()}

                                        </td>

                                        <td>

                                            {item.refundReason}

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

                                            {

                                                item.createdAt?.toDate
                                                    ? item.createdAt
                                                        .toDate()
                                                        .toLocaleDateString()

                                                    : "-"

                                            }

                                        </td>

                                        <td>

                                            <div className="actions">

                                                <Link
                                                    href={`/superadmin/payments/refunds/${item.id}`}
                                                    className="view"
                                                >

                                                    <FaEye />

                                                </Link>

                                                {

                                                    item.status === "Pending" &&

                                                    <>

                                                        <button
                                                            className="approve"
                                                            onClick={() =>
                                                                approveRefund(item.id)
                                                            }
                                                        >

                                                            <FaCheck />

                                                        </button>

                                                        <button
                                                            className="reject"
                                                            onClick={() =>
                                                                rejectRefund(item.id)
                                                            }
                                                        >

                                                            <FaTimes />

                                                        </button>

                                                    </>

                                                }

                                                {

                                                    item.status === "Approved" &&

                                                    <button
                                                        className="refund-btn"
                                                        disabled
                                                    >

                                                        <FaUndoAlt />

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