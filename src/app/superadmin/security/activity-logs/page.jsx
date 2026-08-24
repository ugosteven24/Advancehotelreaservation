"use client";

import "./activity-logs.css";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaArrowLeft,
    FaSearch,
    FaTrash,
    FaHistory,
    FaUserShield,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaFilter,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function ActivityLogsPage() {

    const [logs, setLogs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");

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

                collection(

                    db,

                    "activityLogs"

                ),

                orderBy(

                    "createdAt",

                    "desc"

                )

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

                "Unable to load activity logs.",

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

                "Delete this activity log?"

            )

        ) return;

        try {

            await deleteDoc(

                doc(

                    db,

                    "activityLogs",

                    id

                )

            );

            setLogs(

                logs.filter(

                    item => item.id !== id

                )

            );

            showToast(

                "Activity log deleted."

            );

        }

        catch {

            showToast(

                "Unable to delete log.",

                "error"

            );

        }

    };

    const filteredLogs = logs.filter(log => {

        const matchSearch =

            log.user

                ?.toLowerCase()

                .includes(

                    search.toLowerCase()

                ) ||

            log.action

                ?.toLowerCase()

                .includes(

                    search.toLowerCase()

                );

        const matchFilter =

            filter === "All"

                ? true

                : log.status === filter;

        return (

            matchSearch &&

            matchFilter

        );

    });

    return (

        <div className="content-wrapper activity-page">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Activity Logs

                    </h1>

                    <p>

                        Monitor every action performed by administrators and staff.

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

                        <FaHistory />

                    </div>

                    <div>

                        <h4>Total Activities</h4>

                        <h2>

                            {logs.length}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon green">

                        <FaCheckCircle />

                    </div>

                    <div>

                        <h4>Successful</h4>

                        <h2>

                            {

                                logs.filter(

                                    l =>

                                        l.status === "Success"

                                ).length

                            }

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon red">

                        <FaTimesCircle />

                    </div>

                    <div>

                        <h4>Failed</h4>

                        <h2>

                            {

                                logs.filter(

                                    l =>

                                        l.status === "Failed"

                                ).length

                            }

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon orange">

                        <FaUserShield />

                    </div>

                    <div>

                        <h4>Admins</h4>

                        <h2>

                            {

                                new Set(

                                    logs.map(

                                        l =>

                                            l.user

                                    )

                                ).size

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

                        placeholder="Search activity..."

                        value={search}

                        onChange={(e) =>

                            setSearch(

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="filter-box">

                    <FaFilter />

                    <select

                        value={filter}

                        onChange={(e) =>

                            setFilter(

                                e.target.value

                            )

                        }

                    >

                        <option>

                            All

                        </option>

                        <option>

                            Success

                        </option>

                        <option>

                            Failed

                        </option>

                    </select>

                </div>

            </div>

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>User</th>

                            <th>Action</th>

                            <th>Module</th>

                            <th>Status</th>

                            <th>Date</th>

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

                            filteredLogs.length === 0 ?

                                <tr>

                                    <td colSpan="6">

                                        No activity logs found.

                                    </td>

                                </tr>

                            :

                            filteredLogs.map(log => (

                                <tr

                                    key={log.id}

                                >

                                    <td>

                                        <div className="user-info">

                                            <strong>

                                                {

                                                    log.user

                                                }

                                            </strong>

                                            <small>

                                                {

                                                    log.email

                                                }

                                            </small>

                                        </div>

                                    </td>

                                    <td>

                                        {

                                            log.action

                                        }

                                    </td>

                                    <td>

                                        {

                                            log.module

                                        }

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