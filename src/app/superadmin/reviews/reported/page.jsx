"use client";

import "./reported.css";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaSearch,
    FaEye,
    FaTrash,
    FaFlag,
    FaCheck,
    FaEyeSlash,
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function ReportedReviewsPage() {

    const [reviews, setReviews] = useState([]);
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

        loadReviews();

    }, []);

    const loadReviews = async () => {

        try {

            const snapshot = await getDocs(
                collection(db, "reported_reviews")
            );

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setReviews(data);

        }

        catch (error) {

            console.log(error);

            showToast(
                "Unable to load reported reviews.",
                "error"
            );

        }

    };

    const approveReview = async (id) => {

        try {

            await updateDoc(
                doc(db, "reported_reviews", id),
                {
                    status: "Approved",
                }
            );

            showToast("Review approved.");

            loadReviews();

        }

        catch {

            showToast(
                "Unable to approve review.",
                "error"
            );

        }

    };

    const hideReview = async (id) => {

        try {

            await updateDoc(
                doc(db, "reported_reviews", id),
                {
                    status: "Hidden",
                }
            );

            showToast("Review hidden.");

            loadReviews();

        }

        catch {

            showToast(
                "Unable to hide review.",
                "error"
            );

        }

    };

    const deleteReview = async (id) => {

        if (!confirm("Delete this review?"))
            return;

        try {

            await deleteDoc(
                doc(db, "reported_reviews", id)
            );

            showToast("Review deleted.");

            loadReviews();

        }

        catch {

            showToast(
                "Unable to delete review.",
                "error"
            );

        }

    };

    const renderStars = (rating) => {

        const stars = [];

        for (let i = 1; i <= 5; i++) {

            if (rating >= i) {

                stars.push(
                    <FaStar key={i} />
                );

            }

            else if (rating >= i - 0.5) {

                stars.push(
                    <FaStarHalfAlt key={i} />
                );

            }

            else {

                stars.push(
                    <FaRegStar key={i} />
                );

            }

        }

        return stars;

    };

    const filtered = reviews.filter(item =>

        item.hotelName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.userName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.review
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.reportReason
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="reported-page content-wrapper">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>

                        Reported Reviews

                    </h1>

                    <p>

                        Review and moderate reports submitted by users.

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

                            <th>Hotel</th>

                            <th>Guest</th>

                            <th>Rating</th>

                            <th>Review</th>

                            <th>Report Reason</th>

                            <th>Reports</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.length === 0 ?

                                <tr>

                                    <td colSpan="8">

                                        No reported reviews found.

                                    </td>

                                </tr>

                                :

                                filtered.map(item => (
                                    <tr key={item.id}>

                                        <td>

                                            <div className="hotel-info">

                                                <img
                                                    src={item.hotelImage || "/hotel-placeholder.jpg"}
                                                    alt={item.hotelName}
                                                    className="hotel-img"
                                                />

                                                <div>

                                                    <strong>

                                                        {item.hotelName}

                                                    </strong>

                                                    <small>

                                                        {item.location}

                                                    </small>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            <div className="guest-info">

                                                <img
                                                    src={item.userImage || "/avatar.png"}
                                                    alt={item.userName}
                                                    className="guest-img"
                                                />

                                                <div>

                                                    <strong>

                                                        {item.userName}

                                                    </strong>

                                                    <small>

                                                        {item.userEmail}

                                                    </small>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            <div className="stars">

                                                {renderStars(item.rating)}

                                            </div>

                                        </td>

                                        <td className="review-text">

                                            {item.review}

                                        </td>

                                        <td>

                                            <span className="reason">

                                                {item.reportReason}

                                            </span>

                                        </td>

                                        <td>

                                            <span className="reports-count">

                                                <FaFlag />

                                                {item.reportedCount || 1}

                                            </span>

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

                                            <div className="actions">

                                                <Link
                                                    href={`/superadmin/reviews/reported/${item.id}`}
                                                    className="view"
                                                >

                                                    <FaEye />

                                                </Link>

                                                {

                                                    item.status !== "Approved" &&

                                                    <button
                                                        className="approve"
                                                        onClick={() =>
                                                            approveReview(item.id)
                                                        }
                                                    >

                                                        <FaCheck />

                                                    </button>

                                                }

                                                {

                                                    item.status !== "Hidden" &&

                                                    <button
                                                        className="hide"
                                                        onClick={() =>
                                                            hideReview(item.id)
                                                        }
                                                    >

                                                        <FaEyeSlash />

                                                    </button>

                                                }

                                                <button
                                                    className="delete"
                                                    onClick={() =>
                                                        deleteReview(item.id)
                                                    }
                                                >

                                                    <FaTrash />

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