"use client";

import "./pushnotifications.css";

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
    FaBell,
    FaPlus,
    FaSearch,
    FaPaperPlane,
    FaClock,
    FaMobileAlt,
    FaUsers,
    FaEye,
    FaTrash,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function PushNotificationsPage() {

    const [notifications, setNotifications] = useState([]);

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

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

        try {

            const snapshot = await getDocs(

                collection(

                    db,

                    "pushNotifications"

                )

            );

            const data = snapshot.docs.map(doc => ({

                id: doc.id,
                ...doc.data(),

            }));

            setNotifications(data);

        }

        catch (err) {

            console.log(err);

            showToast(

                "Unable to load notifications.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    const deleteNotification = async (id) => {

        if (

            !confirm(

                "Delete this notification?"

            )

        ) return;

        try {

            await deleteDoc(

                doc(

                    db,

                    "pushNotifications",

                    id

                )

            );

            setNotifications(

                notifications.filter(

                    item => item.id !== id

                )

            );

            showToast(

                "Notification deleted."

            );

        }

        catch {

            showToast(

                "Unable to delete notification.",

                "error"

            );

        }

    };

    const totalNotifications = useMemo(() => {

        return notifications.length;

    }, [notifications]);

    const sentNotifications = useMemo(() => {

        return notifications.filter(

            item => item.status === "Sent"

        ).length;

    }, [notifications]);

    const scheduledNotifications = useMemo(() => {

        return notifications.filter(

            item => item.status === "Scheduled"

        ).length;

    }, [notifications]);

    const draftNotifications = useMemo(() => {

        return notifications.filter(

            item => item.status === "Draft"

        ).length;

    }, [notifications]);

    const filtered = notifications.filter(item =>

        item.title

            ?.toLowerCase()

            .includes(search.toLowerCase())

        ||

        item.audience

            ?.toLowerCase()

            .includes(search.toLowerCase())

    );

    return (

        <div className="push-page content-wrapper">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Push Notifications

                    </h1>

                    <p>

                        Send mobile and web push notifications to users.

                    </p>

                </div>

                <Link

                    href="/superadmin/notifications/pushnotifications/add"

                    className="add-btn"

                >

                    <FaPlus />

                    New Notification

                </Link>

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="icon total">

                        <FaBell />

                    </div>

                    <div>

                        <h4>

                            Total

                        </h4>

                        <h2>

                            {totalNotifications}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon sent">

                        <FaPaperPlane />

                    </div>

                    <div>

                        <h4>

                            Sent

                        </h4>

                        <h2>

                            {sentNotifications}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon scheduled">

                        <FaClock />

                    </div>

                    <div>

                        <h4>

                            Scheduled

                        </h4>

                        <h2>

                            {scheduledNotifications}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon draft">

                        <FaMobileAlt />

                    </div>

                    <div>

                        <h4>

                            Drafts

                        </h4>

                        <h2>

                            {draftNotifications}

                        </h2>

                    </div>

                </div>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search notification..."

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

                            <th>Title</th>

                            <th>Audience</th>

                            <th>Recipients</th>

                            <th>Status</th>

                            <th>Delivery</th>

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

                                            No notifications found.

                                        </td>

                                    </tr>

                                    :

                                    filtered.map(notification => (
                                        <tr key={notification.id}>

                                            <td>

                                                <div className="notification-info">

                                                    <strong>

                                                        {notification.title}

                                                    </strong>

                                                    <small>

                                                        {notification.type || "General"}

                                                    </small>

                                                </div>

                                            </td>

                                            <td>

                                                <span className="audience">

                                                    <FaUsers />

                                                    {notification.audience}

                                                </span>

                                            </td>

                                            <td>

                                                {Number(

                                                    notification.recipients || 0

                                                ).toLocaleString()}

                                            </td>

                                            <td>

                                                <span
                                                    className={`status ${notification.status?.toLowerCase()}`}
                                                >

                                                    {

                                                        notification.status === "Sent"

                                                            ?

                                                            <FaCheckCircle />

                                                            :

                                                            notification.status === "Scheduled"

                                                                ?

                                                                <FaClock />

                                                                :

                                                                <FaTimesCircle />

                                                    }

                                                    {notification.status}

                                                </span>

                                            </td>

                                            <td>

                                                <strong>

                                                    {notification.deliveryRate || 0}%

                                                </strong>

                                            </td>

                                            <td>

                                                {

                                                    notification.createdAt?.toDate

                                                        ?

                                                        notification.createdAt

                                                            .toDate()

                                                            .toLocaleDateString()

                                                        :

                                                        "-"

                                                }

                                            </td>

                                            <td>

                                                <div className="table-actions">

                                                    <Link

                                                        href={`/superadmin/communications/pushnotifications/${notification.id}`}

                                                        className="view-btn"

                                                    >

                                                        <FaEye />

                                                    </Link>

                                                    <button

                                                        className="delete-btn"

                                                        onClick={() =>

                                                            deleteNotification(

                                                                notification.id

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