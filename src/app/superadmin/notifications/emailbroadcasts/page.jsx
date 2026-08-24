"use client";

import "./emailbroadcasts.css";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaEnvelope,
    FaPlus,
    FaSearch,
    FaPaperPlane,
    FaClock,
    FaEye,
    FaTrash,
    FaUsers,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function EmailBroadcastsPage() {

    const [emails, setEmails] = useState([]);

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

        loadBroadcasts();

    }, []);

    const loadBroadcasts = async () => {

        try {

            const snapshot = await getDocs(

                collection(db, "emailBroadcasts")

            );

            const data = snapshot.docs.map(doc => ({

                id: doc.id,
                ...doc.data(),

            }));

            setEmails(data);

        }

        catch (err) {

            console.log(err);

            showToast(

                "Unable to load email broadcasts.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    const deleteBroadcast = async (id) => {

        if (

            !confirm(

                "Delete this email broadcast?"

            )

        ) return;

        try {

            await deleteDoc(

                doc(

                    db,

                    "emailBroadcasts",

                    id

                )

            );

            setEmails(

                emails.filter(

                    item => item.id !== id

                )

            );

            showToast(

                "Broadcast deleted."

            );

        }

        catch {

            showToast(

                "Unable to delete.",

                "error"

            );

        }

    };

    const totalBroadcasts = useMemo(() => {

        return emails.length;

    }, [emails]);

    const sentEmails = useMemo(() => {

        return emails.filter(

            item => item.status === "Sent"

        ).length;

    }, [emails]);

    const scheduledEmails = useMemo(() => {

        return emails.filter(

            item => item.status === "Scheduled"

        ).length;

    }, [emails]);

    const draftEmails = useMemo(() => {

        return emails.filter(

            item => item.status === "Draft"

        ).length;

    }, [emails]);

    const filtered = emails.filter(item =>

        item.subject

            ?.toLowerCase()

            .includes(search.toLowerCase())

        ||

        item.audience

            ?.toLowerCase()

            .includes(search.toLowerCase())

    );

    return (

        <div className="email-broadcast-page content-wrapper">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Email Broadcasts

                    </h1>

                    <p>

                        Send newsletters, announcements and promotional emails.

                    </p>

                </div>

                <Link

                    href="/superadmin/notifications/emailbroadcasts/add"

                    className="add-btn"

                >

                    <FaPlus />

                    New Broadcast

                </Link>

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="icon total">

                        <FaEnvelope />

                    </div>

                    <div>

                        <h4>Total Broadcasts</h4>

                        <h2>{totalBroadcasts}</h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon sent">

                        <FaPaperPlane />

                    </div>

                    <div>

                        <h4>Sent</h4>

                        <h2>{sentEmails}</h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon schedule">

                        <FaClock />

                    </div>

                    <div>

                        <h4>Scheduled</h4>

                        <h2>{scheduledEmails}</h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon draft">

                        <FaEnvelope />

                    </div>

                    <div>

                        <h4>Drafts</h4>

                        <h2>{draftEmails}</h2>

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

                            <th>Subject</th>

                            <th>Audience</th>

                            <th>Recipients</th>

                            <th>Status</th>

                            <th>Open Rate</th>

                            <th>Date</th>

                            <th>Actions</th>

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

                                            No broadcasts found.

                                        </td>

                                    </tr>

                                    :

                                    filtered.map(email => (
                                        <tr key={email.id}>

                                            <td>

                                                <div className="subject-info">

                                                    <strong>

                                                        {email.subject}

                                                    </strong>

                                                    <small>

                                                        {email.type || "General"}

                                                    </small>

                                                </div>

                                            </td>

                                            <td>

                                                <span className="audience">

                                                    <FaUsers />

                                                    {email.audience}

                                                </span>

                                            </td>

                                            <td>

                                                {Number(
                                                    email.recipients || 0
                                                ).toLocaleString()}

                                            </td>

                                            <td>

                                                <span
                                                    className={`status ${email.status?.toLowerCase()}`}
                                                >

                                                    {

                                                        email.status === "Sent" ?

                                                            <FaCheckCircle />

                                                            :

                                                            email.status === "Scheduled" ?

                                                                <FaClock />

                                                                :

                                                                <FaTimesCircle />

                                                    }

                                                    {email.status}

                                                </span>

                                            </td>

                                            <td>

                                                <strong>

                                                    {email.openRate || 0}%

                                                </strong>

                                            </td>

                                            <td>

                                                {

                                                    email.createdAt?.toDate

                                                        ?

                                                        email.createdAt
                                                            .toDate()
                                                            .toLocaleDateString()

                                                        :

                                                        "-"

                                                }

                                            </td>

                                            <td>

                                                <div className="table-actions">

                                                    <Link

                                                        href={`/superadmin/communications/emailbroadcasts/${email.id}`}

                                                        className="view-btn"

                                                    >

                                                        <FaEye />

                                                    </Link>

                                                    <button

                                                        className="delete-btn"

                                                        onClick={() =>

                                                            deleteBroadcast(

                                                                email.id

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