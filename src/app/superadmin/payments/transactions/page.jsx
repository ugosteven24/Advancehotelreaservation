"use client";

import "./transactions.css";

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
    FaMoneyBillWave,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function TransactionsPage() {

    const [transactions, setTransactions] = useState([]);
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

        loadTransactions();

    }, []);

    const loadTransactions = async () => {

        try {

            const snapshot = await getDocs(
                collection(db, "transactions")
            );

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setTransactions(data);

        } catch (error) {

            console.log(error);

            showToast(
                "Unable to load transactions.",
                "error"
            );

        }

    };

    const filtered = transactions.filter(item =>

        item.transactionId
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

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

        <div className="transactions-page content-wrapper">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>Transactions</h1>

                    <p>

                        Manage all hotel payment transactions.

                    </p>

                </div>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search transaction..."
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

                            <th>ID</th>

                            <th>Booking</th>

                            <th>Hotel</th>

                            <th>Guest</th>

                            <th>Method</th>

                            <th>Amount</th>

                            <th>Status</th>

                            <th>Date</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.length === 0 ? (

                            <tr>

                                <td colSpan="9">

                                    No transactions found.

                                </td>

                            </tr>

                        ) : (

                            filtered.map(item => (
                                <tr key={item.id}>

                                    <td>

                                        <div className="transaction-id">

                                            <FaMoneyBillWave />

                                            <span>

                                                {item.transactionId}

                                            </span>

                                        </div>

                                    </td>

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

                                        {item.paymentMethod}

                                    </td>

                                    <td>

                                        ₦{Number(item.amount || 0).toLocaleString()}

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

                                        <Link
                                            href={`/superadmin/payments/transactions/${item.id}`}
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