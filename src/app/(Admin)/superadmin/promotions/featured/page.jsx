"use client";

import "./featured.css";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    collection,
    getDocs,
    updateDoc,
    doc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaSearch,
    FaHotel,
    FaStar,
    FaEye,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";

const BUTTON_COLOR = "#2563eb";


export default function FeaturedHotelsPage() {

    const [hotels, setHotels] = useState([]);

    const [search, setSearch] = useState("");


    useEffect(() => {

        loadHotels();

    }, []);

    const loadHotels = async () => {

        try {

            const snapshot = await getDocs(
                collection(db, "hotels")
            );

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setHotels(data);

        }

        catch (error) {

            console.log(error);

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to load hotels.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

    };

    const toggleFeatured = async (hotel) => {

        try {

            await updateDoc(

                doc(db, "hotels", hotel.id),

                {
                    featured: !hotel.featured,
                }

            );

            Swal.fire({
              icon: "success",
              title: "Success",
              text: hotel.featured
                    ? "Hotel removed from featured."
                    : "Hotel added to featured.",
              confirmButtonColor: BUTTON_COLOR,
            });

            loadHotels();

        }

        catch {

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to update featured status.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

    };

    const filtered = hotels.filter(item =>

        item.name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.city
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.country
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="featured-page content-wrapper">


            <div className="page-header">

                <div>

                    <h1>

                        Featured Hotels

                    </h1>

                    <p>

                        Manage hotels displayed on the homepage.

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

                            <th>Hotel</th>

                            <th>Location</th>

                            <th>Rating</th>

                            <th>Price</th>

                            <th>Featured</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.length === 0 ?

                                <tr>

                                    <td colSpan="6">

                                        No hotels found.

                                    </td>

                                </tr>

                                :

                                filtered.map(hotel => (
                                    <tr key={hotel.id}>

                                        <td>

                                            <div className="hotel-info">

                                                <img
                                                    src={
                                                        hotel.images?.[0] ||
                                                        hotel.image ||
                                                        "/hotel-placeholder.jpg"
                                                    }
                                                    alt={hotel.name}
                                                    className="hotel-img"
                                                />

                                                <div>

                                                    <strong>

                                                        {hotel.name}

                                                    </strong>

                                                    <small>

                                                        {hotel.category || "Hotel"}

                                                    </small>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            {hotel.city}, {hotel.country}

                                        </td>

                                        <td>

                                            <div className="rating">

                                                <FaStar />

                                                <span>

                                                    {hotel.rating || "0.0"}

                                                </span>

                                            </div>

                                        </td>

                                        <td>

                                            ₦{Number(
                                                hotel.price || 0
                                            ).toLocaleString()}

                                            /night

                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    hotel.featured
                                                        ? "featured"
                                                        : "not-featured"
                                                }
                                            >

                                                {

                                                    hotel.featured
                                                        ? "Featured"
                                                        : "Not Featured"

                                                }

                                            </span>

                                        </td>

                                        <td>

                                            <div className="actions">

                                                <Link
                                                    href={`/superadmin/hotelmanagements/${hotel.id}`}
                                                    className="view"
                                                >

                                                    <FaEye />

                                                </Link>

                                                <button
                                                    className={
                                                        hotel.featured
                                                            ? "remove-feature"
                                                            : "make-feature"
                                                    }
                                                    onClick={() =>
                                                        toggleFeatured(hotel)
                                                    }
                                                >

                                                    {

                                                        hotel.featured

                                                            ?

                                                            <FaTimesCircle />

                                                            :

                                                            <FaCheckCircle />

                                                    }

                                                </button>

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