"use client";

import "./add.css";

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
    FaSave,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaGlobe,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function AddContactPage() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const [form, setForm] = useState({

        title: "",

        value: "",

        description: "",

        type: "Phone",

        icon: "FaPhone",

        status: "Published",

        displayOrder: 1,

    });

    const showToast = (message, type = "success") => {

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

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });

    };

    const saveContact = async (e) => {

        e.preventDefault();

        if (!form.title.trim()) {

            showToast(
                "Title is required.",
                "error"
            );

            return;

        }

        if (!form.value.trim()) {

            showToast(
                "Value is required.",
                "error"
            );

            return;

        }

        try {

            setLoading(true);

            await addDoc(

                collection(
                    db,
                    "contactCMS"
                ),

                {
                    ...form,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                }

            );

            showToast(
                "Contact added successfully."
            );

            setTimeout(() => {

                router.push(
                    "/superadmin/cms/contact"
                );

            }, 1200);

        }

        catch (err) {

            console.log(err);

            showToast(
                "Unable to save contact.",
                "error"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="content-wrapper add-contact-page">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>Add Contact</h1>

                    <p>
                        Create a new contact information block.
                    </p>

                </div>

                <Link
                    href="/superadmin/cms/contact"
                    className="back-btn"
                >

                    <FaArrowLeft />

                    Back

                </Link>

            </div>

            <form
                className="contact-form"
                onSubmit={saveContact}
            >

                <div className="form-card">

                    <h3>Contact Information</h3>

                    <div className="form-group">

                        <label>Title</label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Customer Support"
                        />

                    </div>

                    <div className="form-group">

                        <label>Value</label>

                        <input
                            type="text"
                            name="value"
                            value={form.value}
                            onChange={handleChange}
                            placeholder="+234 800 123 4567"
                        />

                    </div>

                    <div className="form-group">

                        <label>Description</label>

                        <textarea
                            rows="5"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Optional description"
                        />

                    </div>

                </div>

                <div className="form-card">

                    <h3>Settings</h3>

                    <div className="grid-2">

                        <div className="form-group">

                            <label>Contact Type</label>

                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                            >

                                <option>Phone</option>
                                <option>Email</option>
                                <option>Address</option>
                                <option>Office Hours</option>
                                <option>Website</option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>Icon</label>

                            <select
                                name="icon"
                                value={form.icon}
                                onChange={handleChange}
                            >

                                <option value="FaPhone">Phone</option>
                                <option value="FaEnvelope">Email</option>
                                <option value="FaMapMarkerAlt">Address</option>
                                <option value="FaClock">Office Hours</option>
                                <option value="FaGlobe">Website</option>

                            </select>

                        </div>

                    </div>

                    <div className="grid-2">

                        <div className="form-group">

                            <label>Status</label>

                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >

                                <option>Published</option>
                                <option>Draft</option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>Display Order</label>

                            <input
                                type="number"
                                name="displayOrder"
                                value={form.displayOrder}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>

                <div className="form-actions">

                    <button
                        type="submit"
                        className="save-btn"
                        disabled={loading}
                    >

                        <FaSave />

                        {
                            loading
                                ? "Saving..."
                                : "Save Contact"
                        }

                    </button>

                </div>

            </form>

        </div>

    );

}