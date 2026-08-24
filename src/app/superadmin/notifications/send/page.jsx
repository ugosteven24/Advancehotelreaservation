"use client";

import "./send-notification.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaArrowLeft,
    FaPaperPlane,
    FaBell,
    FaUsers,
    FaUserTie,
    FaHotel,
    FaUser,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function SendNotificationPage() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

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

    const [form, setForm] = useState({

        title: "",
        message: "",
        audience: "All Users",
        type: "General",
        priority: "Normal",
        actionUrl: "",
        status: "Send Now",

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const sendNotification = async (e) => {

        e.preventDefault();

        if (

            !form.title ||

            !form.message

        ) {

            showToast(

                "Please complete all required fields.",

                "error"

            );

            return;

        }

        try {

            setLoading(true);

            await addDoc(

                collection(db, "notifications"),

                {

                    ...form,

                    sentBy: "Super Admin",

                    readCount: 0,

                    deliveredCount: 0,

                    createdAt: serverTimestamp(),

                }

            );

            showToast(

                "Notification sent successfully."

            );

            setTimeout(() => {

                router.push(

                    "/superadmin/notifications"

                );

            }, 1200);

        }

        catch (err) {

            console.log(err);

            showToast(

                "Unable to send notification.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="send-notification-page content-wrapper">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Send Notification

                    </h1>

                    <p>

                        Send announcements and alerts to platform users.

                    </p>

                </div>

                <Link

                    href="/superadmin/notifications"

                    className="back-btn"

                >

                    <FaArrowLeft />

                    Back

                </Link>

            </div>

            <form

                className="notification-form"

                onSubmit={sendNotification}

            >

                <div className="form-grid">

                    <div className="form-group full">

                        <label>

                            Notification Title

                        </label>

                        <input

                            type="text"

                            name="title"

                            value={form.title}

                            onChange={handleChange}

                            placeholder="Platform Maintenance"

                            required

                        />

                    </div>

                    <div className="form-group full">

                        <label>

                            Message

                        </label>

                        <textarea

                            rows="6"

                            name="message"

                            value={form.message}

                            onChange={handleChange}

                            placeholder="Enter notification message..."

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Audience

                        </label>

                        <select

                            name="audience"

                            value={form.audience}

                            onChange={handleChange}

                        >

                            <option>All Users</option>

                            <option>Guests</option>

                            <option>Hotel Owners</option>

                            <option>Staff</option>

                            <option>Admins</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Notification Type

                        </label>

                        <select

                            name="type"

                            value={form.type}

                            onChange={handleChange}

                        >

                            <option>General</option>

                            <option>Promotion</option>

                            <option>System</option>

                            <option>Security</option>

                            <option>Booking</option>

                            <option>Payment</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Priority

                        </label>

                        <select

                            name="priority"

                            value={form.priority}

                            onChange={handleChange}

                        >

                            <option>Low</option>

                            <option>Normal</option>

                            <option>High</option>

                            <option>Urgent</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Action URL (Optional)

                        </label>

                        <input

                            type="text"

                            name="actionUrl"

                            value={form.actionUrl}

                            onChange={handleChange}

                            placeholder="/dashboard/bookings"

                        />

                    </div>
                    <div className="form-group">

                        <label>

                            Send Option

                        </label>

                        <select

                            name="status"

                            value={form.status}

                            onChange={handleChange}

                        >

                            <option>Send Now</option>

                            <option>Schedule</option>

                            <option>Draft</option>

                        </select>

                    </div>

                </div>

                <div className="audience-preview">

                    <h3>

                        Target Audience

                    </h3>

                    <div className="audience-grid">

                        <div className="audience-card">

                            <FaUsers />

                            <h4>All Users</h4>

                            <span>Guests, Owners & Staff</span>

                        </div>

                        <div className="audience-card">

                            <FaUser />

                            <h4>Guests</h4>

                            <span>Registered customers</span>

                        </div>

                        <div className="audience-card">

                            <FaHotel />

                            <h4>Hotel Owners</h4>

                            <span>Property managers</span>

                        </div>

                        <div className="audience-card">

                            <FaUserTie />

                            <h4>Staff</h4>

                            <span>Platform employees</span>

                        </div>

                    </div>

                </div>

                <div className="notification-preview">

                    <h3>

                        Notification Preview

                    </h3>

                    <div className="preview-card">

                        <div className="preview-icon">

                            <FaBell />

                        </div>

                        <div className="preview-content">

                            <h4>

                                {

                                    form.title ||

                                    "Notification Title"

                                }

                            </h4>

                            <p>

                                {

                                    form.message ||

                                    "Your notification message will appear here..."

                                }

                            </p>

                            <small>

                                Audience: <strong>{form.audience}</strong>

                                {" • "}

                                Type: <strong>{form.type}</strong>

                                {" • "}

                                Priority: <strong>{form.priority}</strong>

                            </small>

                        </div>

                    </div>

                </div>

                <div className="form-actions">

                    <button

                        type="submit"

                        className="send-btn"

                        disabled={loading}

                    >

                        <FaPaperPlane />

                        {

                            loading

                                ?

                                "Sending Notification..."

                                :

                                "Send Notification"

                        }

                    </button>

                </div>

            </form>

        </div>

    );

}