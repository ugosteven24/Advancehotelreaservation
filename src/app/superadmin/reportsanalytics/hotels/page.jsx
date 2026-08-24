"use client";

import "./hotels.css";

import { useEffect, useMemo, useState } from "react";

import {
    collection,
    getDocs,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaHotel,
    FaBed,
    FaMoneyBillWave,
    FaStar,
    FaSearch,
    FaDownload,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function HotelPerformancePage() {

    const [hotels, setHotels] = useState([]);

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

        catch (err) {

            console.log(err);

            showToast(

                "Unable to load hotel statistics.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    const totalHotels = useMemo(() => {

        return hotels.length;

    }, [hotels]);

    const totalRooms = useMemo(() => {

        return hotels.reduce(

            (sum, item) =>

                sum + Number(item.totalRooms || 0),

            0

        );

    }, [hotels]);

    const totalRevenue = useMemo(() => {

        return hotels.reduce(

            (sum, item) =>

                sum + Number(item.totalRevenue || 0),

            0

        );

    }, [hotels]);

    const averageRating = useMemo(() => {

        if (hotels.length === 0) return 0;

        const rating = hotels.reduce(

            (sum, item) =>

                sum + Number(item.rating || 0),

            0

        );

        return (

            rating /

            hotels.length

        ).toFixed(1);

    }, [hotels]);

    const filtered = hotels.filter(hotel =>

        hotel.hotelName

            ?.toLowerCase()

            .includes(search.toLowerCase())

        ||

        hotel.city

            ?.toLowerCase()

            .includes(search.toLowerCase())

        ||

        hotel.ownerName

            ?.toLowerCase()

            .includes(search.toLowerCase())

    );

    return (

        <div className="hotel-performance-page content-wrapper">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Hotel Performance

                    </h1>

                    <p>

                        Analyze hotel performance, occupancy and earnings.

                    </p>

                </div>

                <button className="export-btn">

                    <FaDownload />

                    Export Report

                </button>

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="icon hotels">

                        <FaHotel />

                    </div>

                    <div>

                        <h4>

                            Total Hotels

                        </h4>

                        <h2>

                            {totalHotels}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon rooms">

                        <FaBed />

                    </div>

                    <div>

                        <h4>

                            Total Rooms

                        </h4>

                        <h2>

                            {totalRooms}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon revenue">

                        <FaMoneyBillWave />

                    </div>

                    <div>

                        <h4>

                            Revenue

                        </h4>

                        <h2>

                            ₦{totalRevenue.toLocaleString()}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon rating">

                        <FaStar />

                    </div>

                    <div>

                        <h4>

                            Average Rating

                        </h4>

                        <h2>

                            {averageRating} ⭐

                        </h2>

                    </div>

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

                            setSearch(

                                e.target.value

                            )

                        }

                    />

                </div>

            </div>

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Hotel</th>

                            <th>Owner</th>

                            <th>City</th>

                            <th>Rooms</th>

                            <th>Occupancy</th>

                            <th>Revenue</th>

                            <th>Rating</th>

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
                                                            hotel.coverImage ||
                                                            "/hotel-placeholder.jpg"
                                                        }
                                                        alt={hotel.hotelName}
                                                        className="hotel-image"
                                                    />

                                                    <div>

                                                        <strong>

                                                            {hotel.hotelName}

                                                        </strong>

                                                        <small>

                                                            {hotel.hotelType || "Hotel"}

                                                        </small>

                                                    </div>

                                                </div>

                                            </td>

                                            <td>

                                                {hotel.ownerName || "-"}

                                            </td>

                                            <td>

                                                {hotel.city || "-"}

                                            </td>

                                            <td>

                                                {hotel.totalRooms || 0}

                                            </td>

                                            <td>

                                                <span
                                                    className={`occupancy ${Number(hotel.occupancyRate || 0) >= 80
                                                            ? "high"
                                                            : Number(hotel.occupancyRate || 0) >= 50
                                                                ? "medium"
                                                                : "low"
                                                        }`}
                                                >

                                                    {hotel.occupancyRate || 0}%

                                                </span>

                                            </td>

                                            <td>

                                                <strong className="revenue">

                                                    ₦{Number(
                                                        hotel.totalRevenue || 0
                                                    ).toLocaleString()}

                                                </strong>

                                            </td>

                                            <td>

                                                <div className="rating">

                                                    ⭐ {hotel.rating || "0.0"}

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