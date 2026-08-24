"use client";

import "./blocked-users.css";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    collection,
    getDocs,
    updateDoc,
    doc,
    query,
    orderBy,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaArrowLeft,
    FaSearch,
    FaUserLock,
    FaUnlock,
    FaBan,
    FaCheckCircle,
    FaClock,
    FaShieldAlt,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function BlockedUsersPage() {

    const [users, setUsers] = useState([]);

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

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const q = query(

                collection(db, "users"),

                orderBy("fullName")

            );

            const snapshot = await getDocs(q);

            const data = snapshot.docs.map(doc => ({

                id: doc.id,

                ...doc.data(),

            }));

            setUsers(data);

        }

        catch (err) {

            console.log(err);

            showToast(

                "Unable to load users.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    const unblockUser = async (id) => {

        if (

            !confirm(

                "Unblock this user?"

            )

        ) return;

        try {

            await updateDoc(

                doc(

                    db,

                    "users",

                    id

                ),

                {

                    blocked: false,

                    blockedAt: null,

                }

            );

            setUsers(

                users.map(user =>

                    user.id === id

                        ? {

                            ...user,

                            blocked: false,

                            blockedAt: null,

                        }

                        : user

                )

            );

            showToast(

                "User unblocked successfully."

            );

        }

        catch {

            showToast(

                "Unable to unblock user.",

                "error"

            );

        }

    };

    const filteredUsers = users.filter(user =>

        user.blocked === true && (

            user.fullName

                ?.toLowerCase()

                .includes(

                    search.toLowerCase()

                ) ||

            user.email

                ?.toLowerCase()

                .includes(

                    search.toLowerCase()

                )

        )

    );

    return (

        <div className="content-wrapper blocked-users-page">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Blocked Users

                    </h1>

                    <p>

                        Manage users whose accounts have been suspended or blocked.

                    </p>

                </div>

                <Link

                    href="/superadmin/security"

                    className="back-btn"

                >

                    <FaArrowLeft />

                    Back

                </Link>

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="icon red">

                        <FaBan />

                    </div>

                    <div>

                        <h4>

                            Blocked Users

                        </h4>

                        <h2>

                            {

                                users.filter(

                                    u => u.blocked

                                ).length

                            }

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon green">

                        <FaCheckCircle />

                    </div>

                    <div>

                        <h4>

                            Active Users

                        </h4>

                        <h2>

                            {

                                users.filter(

                                    u => !u.blocked

                                ).length

                            }

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon blue">

                        <FaShieldAlt />

                    </div>

                    <div>

                        <h4>

                            Total Users

                        </h4>

                        <h2>

                            {users.length}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon orange">

                        <FaClock />

                    </div>

                    <div>

                        <h4>

                            Recently Blocked

                        </h4>

                        <h2>

                            {

                                users.filter(

                                    u => u.blocked

                                ).length

                            }

                        </h2>

                    </div>

                </div>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search blocked user..."

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

                            <th>User</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Blocked Date</th>

                            <th>Status</th>

                            <th>Action</th>

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

                            filteredUsers.length === 0 ?

                                <tr>

                                    <td colSpan="6">

                                        No blocked users found.

                                    </td>

                                </tr>

                            :

                            filteredUsers.map(user => (

                                <tr key={user.id}>

                                    <td>

                                        <div className="user-info">

                                            <strong>

                                                {user.fullName}

                                            </strong>

                                            <small>

                                                {user.phone}

                                            </small>

                                        </div>

                                    </td>

                                    <td>

                                        {user.email}

                                    </td>

                                    <td>

                                        {user.role || "Customer"}

                                    </td>

                                    <td>

                                        {

                                            user.blockedAt?.toDate

                                                ?

                                                user.blockedAt

                                                    .toDate()

                                                    .toLocaleString()

                                                :

                                                "-"

                                        }

                                    </td>

                                    <td>

                                        <span className="status blocked">

                                            <FaUserLock />

                                            Blocked

                                        </span>

                                    </td>

                                    <td>

                                        <button

                                            className="unblock-btn"

                                            onClick={() =>

                                                unblockUser(

                                                    user.id

                                                )

                                            }

                                        >

                                            <FaUnlock />

                                            Unblock

                                        </button>

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