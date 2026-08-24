"use client";

import "./pending.css";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaCheck,
    FaTimes,
    FaEye,
    FaEdit,
    FaSearch,
} from "react-icons/fa";

import Toast from "@/components/alert/Toast";

export default function PendingApprovals() {

    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

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
        fetchHotels();
    }, []);

    useEffect(() => {

        const results = hotels.filter((hotel) =>
            hotel.hotelName
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );

        setFilteredHotels(results);

    }, [search, hotels]);

    const fetchHotels = async () => {

        try {

            const q = query(
                collection(db, "hotels"),
                where("status", "==", "Pending")
            );

            const snapshot = await getDocs(q);

            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setHotels(list);
            setFilteredHotels(list);

        } catch (error) {

            showToast("Unable to load hotels.", "error");

        }

        setLoading(false);

    };

    const approveHotel = async (id) => {

        try {

            await updateDoc(doc(db, "hotels", id), {

                status: "Approved",
                approved: true,
                approvedAt: serverTimestamp(),
                updatedAt: serverTimestamp(),

            });

            showToast("Hotel approved successfully.");

            fetchHotels();

        } catch {

            showToast("Approval failed.", "error");

        }

    };

    const rejectHotel = async (id) => {

        try {

            await updateDoc(doc(db, "hotels", id), {

                status: "Rejected",
                approved: false,
                updatedAt: serverTimestamp(),

            });

            showToast("Hotel rejected.", "success");

            fetchHotels();

        } catch {

            showToast("Unable to reject hotel.", "error");

        }

    };

    return (

        <div className="pending-page content-wrapper">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>Pending Hotel Approvals</h1>

                    <p>
                        Review hotels before publishing them.
                    </p>

                </div>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search hotel..."
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

                            <th>Image</th>
                            <th>Hotel</th>
                            <th>Category</th>
                            <th>City</th>
                            <th>Owner</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td colSpan="7">
                                    Loading...
                                </td>

                            </tr>

                        ) : filteredHotels.length === 0 ? (

                            <tr>

                                <td colSpan="7">
                                    No pending hotels found.
                                </td>

                            </tr>

                        ) : (

                            filteredHotels.map((hotel) => (

                                <tr key={hotel.id}>

                                    <td>

                                        <img
                                            src={
                                                hotel.coverImage ||
                                                "/images/no-image.jpg"
                                            }
                                            className="hotel-image"
                                            alt=""
                                        />

                                    </td>

                                    <td>{hotel.hotelName}</td>

                                    <td>{hotel.category}</td>

                                    <td>{hotel.city}</td>

                                    <td>{hotel.ownerName}</td>

                                    <td>

                                        <span className="pending">

                                            Pending

                                        </span>

                                    </td>

                                    <td>

                                        <div className="actions">

                                            <button
                                                className="approve"
                                                onClick={() =>
                                                    approveHotel(hotel.id)
                                                }
                                            >

                                                <FaCheck />

                                            </button>

                                            <button
                                                className="reject"
                                                onClick={() =>
                                                    rejectHotel(hotel.id)
                                                }
                                            >

                                                <FaTimes />

                                            </button>

                                            <Link
                                                href={`/superadmin/hotelmanagements/viewpage/${hotel.id}`}
                                                className="view"
                                            >

                                                <FaEye />

                                            </Link>

                                            <Link
                                                href={`/superadmin/hotelmanagements/editpage/${hotel.id}`}
                                                className="edit"
                                            >

                                                <FaEdit />

                                            </Link>

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