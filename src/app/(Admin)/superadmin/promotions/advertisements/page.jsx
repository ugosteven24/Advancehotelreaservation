"use client";

import "./advertisements.css";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
    collection,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaSearch,
    FaPlus,
    FaEye,
    FaEdit,
    FaTrash,
    FaCheckCircle,
    FaTimesCircle,
    FaBullhorn,
} from "react-icons/fa";
import Swal from "sweetalert2";

const BUTTON_COLOR = "#2563eb";


export default function AdvertisementsPage() {

    const [ads, setAds] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {

        loadAds();

    }, []);

    const loadAds = async () => {

        try {

            const snapshot = await getDocs(
                collection(db, "advertisements")
            );

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setAds(data);

        }

        catch (error) {

            console.log(error);

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to load advertisements.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

    };

    const toggleStatus = async (ad) => {

        try {

            await updateDoc(

                doc(db, "advertisements", ad.id),

                {

                    status:

                        ad.status === "Active"

                            ? "Inactive"

                            : "Active",

                }

            );

            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Advertisement updated.",
              confirmButtonColor: BUTTON_COLOR,
            });

            loadAds();

        }

        catch {

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to update advertisement.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

    };

    const deleteAd = async (id) => {

        if (!confirm("Delete this advertisement?"))
            return;

        try {

            await deleteDoc(
                doc(db, "advertisements", id)
            );

            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Advertisement deleted.",
              confirmButtonColor: BUTTON_COLOR,
            });

            loadAds();

        }

        catch {

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to delete advertisement.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

    };

    const filtered = ads.filter(item =>

        item.title
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.company
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="advertisements-page content-wrapper">


            <div className="page-header">

                <div>

                    <h1>

                        Advertisements

                    </h1>

                    <p>

                        Manage homepage banners and sponsored advertisements.

                    </p>

                </div>

                <Link
                    href="/superadmin/promotions/advertisements/add"
                    className="add-btn"
                >

                    <FaPlus />

                    New Advertisement

                </Link>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search advertisement..."
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

                            <th>Advertisement</th>

                            <th>Company</th>

                            <th>Position</th>

                            <th>Clicks</th>

                            <th>Views</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.length === 0 ?

                                <tr>

                                    <td colSpan="7">

                                        No advertisements found.

                                    </td>

                                </tr>

                                :

                                filtered.map(ad => (
                                    <tr key={ad.id}>

                                        <td>

                                            <div className="ad-info">

                                                <img
                                                    src={
                                                        ad.image ||
                                                        "/banner-placeholder.jpg"
                                                    }
                                                    alt={ad.title}
                                                    className="ad-image"
                                                />

                                                <div>

                                                    <strong>

                                                        {ad.title}

                                                    </strong>

                                                    <small>

                                                        <FaBullhorn />

                                                        {ad.description}

                                                    </small>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            {ad.company}

                                        </td>

                                        <td>

                                            <span className="position">

                                                {ad.position}

                                            </span>

                                        </td>

                                        <td>

                                            {Number(
                                                ad.clicks || 0
                                            ).toLocaleString()}

                                        </td>

                                        <td>

                                            {Number(
                                                ad.views || 0
                                            ).toLocaleString()}

                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    ad.status
                                                        ?.toLowerCase()
                                                }
                                            >

                                                {ad.status}

                                            </span>

                                        </td>

                                        <td>

                                            <div className="actions">

                                                <Link
                                                    href={`/superadmin/advertisements/${ad.id}`}
                                                    className="view"
                                                >

                                                    <FaEye />

                                                </Link>

                                                <Link
                                                    href={`/superadmin/advertisements/${ad.id}/edit`}
                                                    className="edit"
                                                >

                                                    <FaEdit />

                                                </Link>

                                                <button
                                                    className={
                                                        ad.status === "Active"

                                                            ? "deactivate"

                                                            : "activate"
                                                    }
                                                    onClick={() =>
                                                        toggleStatus(ad)
                                                    }
                                                >

                                                    {

                                                        ad.status === "Active"

                                                            ?

                                                            <FaTimesCircle />

                                                            :

                                                            <FaCheckCircle />

                                                    }

                                                </button>

                                                <button
                                                    className="delete"
                                                    onClick={() =>
                                                        deleteAd(ad.id)
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