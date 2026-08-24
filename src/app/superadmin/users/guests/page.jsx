"use client";

import "./guest.css";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaSearch,
    FaEye,
    FaTrash,
    FaBan,
    FaCheckCircle,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function Guests() {

    const [guests, setGuests] = useState([]);
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
        loadGuests();
    }, []);

    const loadGuests = async () => {

        const snapshot = await getDocs(collection(db, "users"));

        const data = snapshot.docs
            .map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))
            .filter(user => user.role === "guest");

        setGuests(data);

    };

    const toggleStatus = async (guest) => {

        const status =
            guest.status === "Active"
                ? "Blocked"
                : "Active";

        await updateDoc(
            doc(db, "users", guest.id),
            {
                status,
            }
        );

        showToast(`Guest ${status}`);

        loadGuests();

    };

    const deleteGuest = async (id) => {

        if (!confirm("Delete this guest?"))
            return;

        await deleteDoc(doc(db, "users", id));

        showToast("Guest deleted");

        loadGuests();

    };

    const filtered = guests.filter(item =>
        item.fullName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
        item.email
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <div className="guest-page content-wrapper">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <h1>Guests</h1>

                <p>
                    Manage all registered guests.
                </p>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search guest..."
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

                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.length === 0 ? (

                            <tr>

                                <td colSpan="7">

                                    No guests found.

                                </td>

                            </tr>

                        ) : (

                            filtered.map(guest => (

                                <tr key={guest.id}>

                                    <td>

                                        <img
                                            src={
                                                guest.photo ||
                                                "/images/avatar.png"
                                            }
                                            className="avatar"
                                            alt=""
                                        />

                                    </td>

                                    <td>
                                        {guest.fullName}
                                    </td>

                                    <td>
                                        {guest.email}
                                    </td>

                                    <td>
                                        {guest.phone}
                                    </td>

                                    <td>

                                        {guest.city},{" "}
                                        {guest.state}

                                    </td>

                                    <td>

                                        <span
                                            className={
                                                guest.status === "Active"
                                                    ? "active"
                                                    : "blocked"
                                            }
                                        >

                                            {guest.status}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="actions">

                                            <Link
                                                href={`/superadmin/users/guests/${guest.id}`}
                                                className="view"
                                            >

                                                <FaEye />

                                            </Link>

                                            <button
                                                className="status"
                                                onClick={() =>
                                                    toggleStatus(
                                                        guest
                                                    )
                                                }
                                            >

                                                {guest.status ===
                                                "Active" ? (
                                                    <FaBan />
                                                ) : (
                                                    <FaCheckCircle />
                                                )}

                                            </button>

                                            <button
                                                className="delete"
                                                onClick={() =>
                                                    deleteGuest(
                                                        guest.id
                                                    )
                                                }
                                            >

                                                <FaTrash />

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