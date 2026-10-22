"use client";

import "./admin-management.css";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaUserShield,
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaEye,
    FaUserCheck,
    FaUserTimes,
    FaUserCog,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function AdminManagementPage() {

    const [admins, setAdmins] = useState([]);

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

        loadAdmins();

    }, []);

    const loadAdmins = async () => {

        try {

            const snapshot = await getDocs(

                collection(

                    db,

                    "admins"

                )

            );

            const data = snapshot.docs.map(doc => ({

                id: doc.id,

                ...doc.data(),

            }));

            setAdmins(data);

        }

        catch (err) {

            console.log(err);

            showToast(

                "Unable to load administrators.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    const deleteAdmin = async (id) => {

        if (

            !confirm(

                "Delete this administrator?"

            )

        ) return;

        try {

            await deleteDoc(

                doc(

                    db,

                    "admins",

                    id

                )

            );

            setAdmins(

                admins.filter(

                    admin => admin.id !== id

                )

            );

            showToast(

                "Administrator deleted."

            );

        }

        catch {

            showToast(

                "Unable to delete administrator.",

                "error"

            );

        }

    };

    const filteredAdmins = admins.filter(admin =>

        admin.fullName

            ?.toLowerCase()

            .includes(

                search.toLowerCase()

            ) ||

        admin.email

            ?.toLowerCase()

            .includes(

                search.toLowerCase()

            )

    );

    return (

        <div className="content-wrapper admin-page">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            {/* Header */}

            <div className="page-header">

                <div>

                    <h1>

                        Administrator Management

                    </h1>

                    <p>

                        Create, manage and monitor all administrator accounts.

                    </p>

                </div>

                <Link

                    href="/superadmin/add"

                    className="add-btn"

                >

                    <FaPlus />

                    Add Administrator

                </Link>

            </div>

            {/* Statistics */}

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="icon blue">

                        <FaUserShield />

                    </div>

                    <div>

                        <h4>

                            Total Admins

                        </h4>

                        <h2>

                            {admins.length}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon green">

                        <FaUserCheck />

                    </div>

                    <div>

                        <h4>

                            Active

                        </h4>

                        <h2>

                            {

                                admins.filter(

                                    admin =>

                                        admin.status === "Active"

                                ).length

                            }

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon orange">

                        <FaUserCog />

                    </div>

                    <div>

                        <h4>

                            Super Admins

                        </h4>

                        <h2>

                            {

                                admins.filter(

                                    admin =>

                                        admin.role === "Super Admin"

                                ).length

                            }

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon red">

                        <FaUserTimes />

                    </div>

                    <div>

                        <h4>

                            Suspended

                        </h4>

                        <h2>

                            {

                                admins.filter(

                                    admin =>

                                        admin.status === "Suspended"

                                ).length

                            }

                        </h2>

                    </div>

                </div>

            </div>

            {/* Toolbar */}

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search administrator..."

                        value={search}

                        onChange={(e) =>

                            setSearch(

                                e.target.value

                            )

                        }

                    />

                </div>

            </div>

            {/* Table */}

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Administrator</th>

                            <th>Role</th>

                            <th>Email</th>

                            <th>Status</th>

                            <th>Created</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            loading ?

                                <tr>

                                    <td colSpan="6">

                                        Loading...

                                    </td>

                                </tr>

                                :

                                filteredAdmins.length === 0 ?

                                    <tr>

                                        <td colSpan="6">

                                            No administrators found.

                                        </td>

                                    </tr>

                                    :

                                    filteredAdmins.map(admin => (

                                        <tr key={admin.id}>

                                            <td>

                                                <div className="admin-info">

                                                    <strong>

                                                        {admin.fullName}

                                                    </strong>

                                                    <small>

                                                        {admin.phone}

                                                    </small>

                                                </div>

                                            </td>

                                            <td>

                                                {admin.role}

                                            </td>

                                            <td>

                                                {admin.email}

                                            </td>

                                            <td>

                                                <span

                                                    className={`status ${admin.status?.toLowerCase()}`}

                                                >

                                                    {admin.status}

                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    admin.createdAt?.toDate

                                                        ?

                                                        admin.createdAt

                                                            .toDate()

                                                            .toLocaleDateString()

                                                        :

                                                        "-"

                                                }

                                            </td>

                                            <td>

                                                <div className="table-actions">

                                                    <Link

                                                        href={`/superadmin/adminmanagement/view/${admin.id}`}

                                                        className="view-btn"

                                                    >

                                                        <FaEye />

                                                    </Link>

                                                    <Link

                                                        href={`/superadmin/adminmanagement/edit/${admin.id}`}

                                                        className="edit-btn"

                                                    >

                                                        <FaEdit />

                                                    </Link>

                                                    <button

                                                        className="delete-btn"

                                                        onClick={() =>

                                                            deleteAdmin(

                                                                admin.id

                                                            )

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