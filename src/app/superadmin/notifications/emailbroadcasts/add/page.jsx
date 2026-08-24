"use client";

import "./new-broadcast.css";

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
    FaSave,
    FaEnvelope,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function NewBroadcastPage() {

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

        subject: "",
        audience: "All Users",
        type: "General",
        priority: "Normal",
        senderName: "HotelReserve",
        senderEmail: "noreply@hotelreserve.com",
        status: "Draft",
        message: "",

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const saveBroadcast = async (status) => {

        if (

            !form.subject ||

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

                collection(db, "emailBroadcasts"),

                {

                    ...form,

                    status,

                    recipients: 0,

                    openRate: 0,

                    clickRate: 0,

                    bounceRate: 0,

                    unsubscribeRate: 0,

                    sentBy: "Super Admin",

                    createdAt: serverTimestamp(),

                }

            );

            showToast(

                status === "Sent"

                    ? "Broadcast sent successfully."

                    : "Draft saved successfully."

            );

            setTimeout(() => {

                router.push(

                    "/superadmin/notifications/emailbroadcasts"

                );

            }, 1500);

        }

        catch (err) {

            console.log(err);

            showToast(

                "Unable to save broadcast.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="new-broadcast-page content-wrapper">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        New Email Broadcast

                    </h1>

                    <p>

                        Create and send newsletters, announcements and promotional emails.

                    </p>

                </div>

                <Link

                    href="/superadmin/notifications/emailbroadcasts"

                    className="back-btn"

                >

                    <FaArrowLeft />

                    Back

                </Link>

            </div>

            <div className="broadcast-form">

                <div className="form-grid">

                    <div className="form-group full">

                        <label>

                            Email Subject

                        </label>

                        <input

                            type="text"

                            name="subject"

                            value={form.subject}

                            onChange={handleChange}

                            placeholder="Summer Vacation Deals"

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

                            Email Type

                        </label>

                        <select

                            name="type"

                            value={form.type}

                            onChange={handleChange}

                        >

                            <option>General</option>

                            <option>Promotion</option>

                            <option>Newsletter</option>

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

                            Sender Name

                        </label>

                        <input

                            type="text"

                            name="senderName"

                            value={form.senderName}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="form-group full">

                        <label>

                            Sender Email

                        </label>

                        <input

                            type="email"

                            name="senderEmail"

                            value={form.senderEmail}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="form-group full">

                        <label>

                            Email Content

                        </label>

                        <textarea

                            rows="12"

                            name="message"

                            value={form.message}

                            onChange={handleChange}

                            placeholder="Write your email here..."

                        />

                    </div>
                    <div className="email-preview">

                        <h3>

                            Email Preview

                        </h3>

                        <div className="preview-card">

                            <div className="preview-header">

                                <FaEnvelope />

                                <div>

                                    <h4>

                                        {

                                            form.subject ||

                                            "Email Subject"

                                        }

                                    </h4>

                                    <small>

                                        From: {form.senderName}

                                        {" <"}

                                        {form.senderEmail}

                                        {">"}

                                    </small>

                                </div>

                            </div>

                            <div className="preview-body">

                                {

                                    form.message ||

                                    "Your email content will appear here..."

                                }

                            </div>

                        </div>

                    </div>

                    <div className="audience-summary">

                        <h3>

                            Audience Summary

                        </h3>

                        <div className="summary-grid">

                            <div className="summary-card">

                                <h4>

                                    Audience

                                </h4>

                                <p>

                                    {form.audience}

                                </p>

                            </div>

                            <div className="summary-card">

                                <h4>

                                    Type

                                </h4>

                                <p>

                                    {form.type}

                                </p>

                            </div>

                            <div className="summary-card">

                                <h4>

                                    Priority

                                </h4>

                                <p>

                                    {form.priority}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="form-actions">

                    <button

                        type="button"

                        className="draft-btn"

                        disabled={loading}

                        onClick={() =>

                            saveBroadcast(

                                "Draft"

                            )

                        }

                    >

                        <FaSave />

                        {

                            loading

                                ?

                                "Saving..."

                                :

                                "Save Draft"

                        }

                    </button>

                    <button

                        type="button"

                        className="send-btn"

                        disabled={loading}

                        onClick={() =>

                            saveBroadcast(

                                "Sent"

                            )

                        }

                    >

                        <FaPaperPlane />

                        {

                            loading

                                ?

                                "Sending..."

                                :

                                "Send Broadcast"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}