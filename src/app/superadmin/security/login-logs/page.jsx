"use client";

import "./login-logs.css";

import { useEffect, useState } from "react";

import Link from "next/link";

import {

    collection,

    getDocs,

    deleteDoc,

    doc,

    orderBy,

    query,

} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {

    FaArrowLeft,

    FaSearch,

    FaTrash,

    FaUserShield,

    FaDesktop,

    FaMapMarkerAlt,

    FaClock,

} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function LoginLogs() {

    const [logs, setLogs] = useState([]);

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

        loadLogs();

    }, []);

    const loadLogs = async () => {

        try {

            const q = query(

                collection(db, "loginLogs"),

                orderBy("createdAt", "desc")

            );

            const snapshot = await getDocs(q);

            const data = snapshot.docs.map(doc => ({

                id: doc.id,

                ...doc.data(),

            }));

            setLogs(data);

        }

        catch (err) {

            console.log(err);

            showToast(

                "Unable to load login logs.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    const deleteLog = async (id) => {

        if (

            !confirm(

                "Delete this login log?"

            )

        ) return;

        try {

            await deleteDoc(

                doc(

                    db,

                    "loginLogs",

                    id

                )

            );

            setLogs(

                logs.filter(

                    item => item.id !== id

                )

            );

            showToast(

                "Login log deleted."

            );

        }

        catch {

            showToast(

                "Unable to delete log.",

                "error"

            );

        }

    };

    const filtered = logs.filter(item =>

        item.email

            ?.toLowerCase()

            .includes(search.toLowerCase())

    );

    return (

        <div className="content-wrapper login-logs-page">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Login Logs

                    </h1>

                    <p>

                        Monitor user login activity and failed login attempts.

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

                    <div className="icon blue">

                        <FaUserShield />

                    </div>

                    <div>

                        <h4>Total Logs</h4>

                        <h2>

                            {logs.length}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon green">

                        <FaDesktop />

                    </div>

                    <div>

                        <h4>Successful</h4>

                        <h2>

                            {

                                logs.filter(

                                    l => l.status === "Success"

                                ).length

                            }

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon red">

                        <FaUserShield />

                    </div>

                    <div>

                        <h4>Failed</h4>

                        <h2>

                            {

                                logs.filter(

                                    l => l.status === "Failed"

                                ).length

                            }

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon orange">

                        <FaClock />

                    </div>

                    <div>

                        <h4>Today</h4>

                        <h2>

                            {

                                logs.filter(

                                    l =>

                                        l.createdAt?.toDate?.()

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

                        placeholder="Search email..."

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

                            <th>IP Address</th>

                            <th>Device</th>

                            <th>Location</th>

                            <th>Status</th>

                            <th>Login Time</th>

                            <th>Action</th>

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

                                        No login logs found.

                                    </td>

                                </tr>

                            :

                            filtered.map(log => (

                                <tr key={log.id}>

                                    <td>

                                        <div className="user-info">

                                            <strong>

                                                {

                                                    log.email

                                                }

                                            </strong>

                                            <small>

                                                {

                                                    log.name ||

                                                    "Unknown User"

                                                }

                                            </small>

                                        </div>

                                    </td>

                                    <td>

                                        {

                                            log.ip ||

                                            "-"

                                        }

                                    </td>

                                    <td>

                                        {

                                            log.device ||

                                            "-"

                                        }

                                    </td>

                                    <td>

                                        <span className="location">

                                            <FaMapMarkerAlt />

                                            {

                                                log.location ||

                                                "Unknown"

                                            }

                                        </span>

                                    </td>

                                    <td>

                                        <span

                                            className={`status ${log.status?.toLowerCase()}`}

                                        >

                                            {

                                                log.status

                                            }

                                        </span>

                                    </td>

                                    <td>

                                        {

                                            log.createdAt?.toDate

                                                ?

                                                log.createdAt

                                                .toDate()

                                                .toLocaleString()

                                                :

                                                "-"

                                        }

                                    </td>

                                    <td>

                                        <button

                                            className="delete-btn"

                                            onClick={() =>

                                                deleteLog(

                                                    log.id

                                                )

                                            }

                                        >

                                            <FaTrash />

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