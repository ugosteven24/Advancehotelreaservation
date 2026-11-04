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
import Swal from "sweetalert2";

const BUTTON_COLOR = "#2563eb";


export default function PendingApprovals() {

    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);


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

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to load hotels.",
              confirmButtonColor: BUTTON_COLOR,
            });

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

            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Hotel approved successfully.",
              confirmButtonColor: BUTTON_COLOR,
            });

            fetchHotels();

        } catch {

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Approval failed.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

    };

    const rejectHotel = async (id) => {

        try {

            await updateDoc(doc(db, "hotels", id), {

                status: "Rejected",
                approved: false,
                updatedAt: serverTimestamp(),

            });

            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Hotel rejected.",
              confirmButtonColor: BUTTON_COLOR,
            });

            fetchHotels();

        } catch {

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to reject hotel.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

    };

    return (

        <div className="pending-page content-wrapper">


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