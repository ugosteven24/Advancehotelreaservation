"use client";

import "./users.css";

import { useEffect, useMemo, useState } from "react";

import {
    collection,
    getDocs,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaUsers,
    FaUserCheck,
    FaUserClock,
    FaHotel,
    FaUserTie,
    FaSearch,
    FaDownload,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function UserStatisticsPage() {

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

            const snapshot = await getDocs(

                collection(db, "users")

            );

            const data = snapshot.docs.map(doc => ({

                id: doc.id,
                ...doc.data(),

            }));

            setUsers(data);

        }

        catch (err) {

            console.log(err);

            showToast(

                "Unable to load user statistics.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    const totalUsers = useMemo(() => {

        return users.length;

    }, [users]);

    const guests = useMemo(() => {

        return users.filter(

            user => user.role === "guest"

        ).length;

    }, [users]);

    const hotelOwners = useMemo(() => {

        return users.filter(

            user => user.role === "owner"

        ).length;

    }, [users]);

    const staff = useMemo(() => {

        return users.filter(

            user => user.role === "staff"

        ).length;

    }, [users]);

    const activeUsers = useMemo(() => {

        return users.filter(

            user => user.status === "Active"

        ).length;

    }, [users]);

    const filtered = users.filter(user =>

        user.fullName
            ?.toLowerCase()
            .includes(search.toLowerCase())

        ||

        user.email
            ?.toLowerCase()
            .includes(search.toLowerCase())

        ||

        user.role
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="user-statistics-page content-wrapper">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        User Statistics

                    </h1>

                    <p>

                        View user growth and platform engagement.

                    </p>

                </div>

                <button className="export-btn">

                    <FaDownload />

                    Export Report

                </button>

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="icon users">

                        <FaUsers />

                    </div>

                    <div>

                        <h4>

                            Total Users

                        </h4>

                        <h2>

                            {totalUsers}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon guests">

                        <FaUserCheck />

                    </div>

                    <div>

                        <h4>

                            Guests

                        </h4>

                        <h2>

                            {guests}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon owners">

                        <FaHotel />

                    </div>

                    <div>

                        <h4>

                            Hotel Owners

                        </h4>

                        <h2>

                            {hotelOwners}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon staff">

                        <FaUserTie />

                    </div>

                    <div>

                        <h4>

                            Staff

                        </h4>

                        <h2>

                            {staff}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon active">

                        <FaUserClock />

                    </div>

                    <div>

                        <h4>

                            Active Users

                        </h4>

                        <h2>

                            {activeUsers}

                        </h2>

                    </div>

                </div>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search user..."

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

                            <th>User</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Status</th>

                            <th>Joined</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            loading ?

                                <tr>

                                    <td colSpan="5">

                                        Loading...

                                    </td>

                                </tr>

                                :

                                filtered.length === 0 ?

                                    <tr>

                                        <td colSpan="5">

                                            No users found.

                                        </td>

                                    </tr>

                                    :

                                    filtered.map(user => (
                                        <tr key={user.id}>

                                            <td>

                                                <div className="user-info">

                                                    <img
                                                        src={
                                                            user.profileImage ||
                                                            "/avatar.png"
                                                        }
                                                        alt={user.fullName}
                                                        className="avatar"
                                                    />

                                                    <div>

                                                        <strong>

                                                            {user.fullName || "Unknown User"}

                                                        </strong>

                                                        <small>

                                                            ID: {user.id.substring(0, 8)}

                                                        </small>

                                                    </div>

                                                </div>

                                            </td>

                                            <td>

                                                {user.email}

                                            </td>

                                            <td>

                                                <span
                                                    className={`role ${user.role?.toLowerCase()}`}
                                                >

                                                    {user.role}

                                                </span>

                                            </td>

                                            <td>

                                                <span
                                                    className={`status ${user.status?.toLowerCase()}`}
                                                >

                                                    {user.status || "Active"}

                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    user.createdAt?.toDate

                                                        ?

                                                        user.createdAt
                                                            .toDate()
                                                            .toLocaleDateString()

                                                        :

                                                        "-"

                                                }

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