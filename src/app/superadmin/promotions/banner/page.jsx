"use client";

import "./banner.css";

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
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaEye,
    FaImage,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function BannerPage() {

    const [banners, setBanners] = useState([]);
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

        loadBanners();

    }, []);

    const loadBanners = async () => {

        try {

            const snapshot = await getDocs(
                collection(db, "banners")
            );

            const data = snapshot.docs.map(doc => ({

                id: doc.id,
                ...doc.data(),

            }));

            setBanners(data);

        }

        catch (err) {

            console.log(err);

            showToast(
                "Unable to load banners.",
                "error"
            );

        }

    };

    const toggleStatus = async (banner) => {

        try {

            await updateDoc(

                doc(db, "banners", banner.id),

                {

                    status:

                        banner.status === "Active"

                            ? "Inactive"

                            : "Active",

                }

            );

            showToast("Banner updated.");

            loadBanners();

        }

        catch {

            showToast(
                "Unable to update banner.",
                "error"
            );

        }

    };

    const deleteBanner = async (id) => {

        if (!confirm("Delete this banner?"))
            return;

        try {

            await deleteDoc(
                doc(db, "banners", id)
            );

            showToast("Banner deleted.");

            loadBanners();

        }

        catch {

            showToast(
                "Unable to delete banner.",
                "error"
            );

        }

    };

    const filtered = banners.filter(item =>

        item.title
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.position
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="banner-page content-wrapper">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>

                        Homepage Banners

                    </h1>

                    <p>

                        Manage homepage hero banners and promotional slides.

                    </p>

                </div>

                <Link
                    href="/superadmin/promotions/banner/add"
                    className="add-btn"
                >

                    <FaPlus />

                    Add Banner

                </Link>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search banner..."
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

                            <th>Banner</th>

                            <th>Position</th>

                            <th>Priority</th>

                            <th>Clicks</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.length === 0 ?

                                <tr>

                                    <td colSpan="6">

                                        No banners found.

                                    </td>

                                </tr>

                                :

                                filtered.map(banner => (
                                    <tr key={banner.id}>

                                        <td>

                                            <div className="banner-info">

                                                <img
                                                    src={
                                                        banner.image ||
                                                        "/banner-placeholder.jpg"
                                                    }
                                                    alt={banner.title}
                                                    className="banner-image"
                                                />

                                                <div>

                                                    <strong>

                                                        {banner.title}

                                                    </strong>

                                                    <small>

                                                        <FaImage />

                                                        {banner.subtitle || "No subtitle"}

                                                    </small>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            <span className="position">

                                                {banner.position}

                                            </span>

                                        </td>

                                        <td>

                                            <span className="priority">

                                                #{banner.priority || 1}

                                            </span>

                                        </td>

                                        <td>

                                            {Number(
                                                banner.clicks || 0
                                            ).toLocaleString()}

                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    banner.status
                                                        ?.toLowerCase()
                                                }
                                            >

                                                {banner.status}

                                            </span>

                                        </td>

                                        <td>

                                            <div className="actions">

                                                <Link
                                                    href={`/superadmin/banner/${banner.id}`}
                                                    className="view"
                                                >

                                                    <FaEye />

                                                </Link>

                                                <Link
                                                    href={`/superadmin/banner/${banner.id}/edit`}
                                                    className="edit"
                                                >

                                                    <FaEdit />

                                                </Link>

                                                <button
                                                    className={
                                                        banner.status === "Active"
                                                            ? "deactivate"
                                                            : "activate"
                                                    }
                                                    onClick={() =>
                                                        toggleStatus(banner)
                                                    }
                                                >

                                                    {
                                                        banner.status === "Active"

                                                            ?

                                                            <FaTimesCircle />

                                                            :

                                                            <FaCheckCircle />

                                                    }

                                                </button>

                                                <button
                                                    className="delete"
                                                    onClick={() =>
                                                        deleteBanner(banner.id)
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