"use client";

import "./add-admin.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaArrowLeft,
    FaUserShield,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaSave,
    FaUserCog,
} from "react-icons/fa";

import Link from "next/link";
import Toast from "@/components/Toast";

export default function AddAdministrator() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({

        show: false,
        message: "",
        type: "success",

    });

    const [formData, setFormData] = useState({

        fullName: "",

        email: "",

        phone: "",

        password: "",

        confirmPassword: "",

        role: "Administrator",

        status: "Active",

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

    const handleChange = (e) => {

        const {

            name,

            value,

        } = e.target;

        setFormData({

            ...formData,

            [name]: value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (

            formData.password !==

            formData.confirmPassword

        ) {

            return showToast(

                "Passwords do not match.",

                "error"

            );

        }

        try {

            setLoading(true);

            await addDoc(

                collection(

                    db,

                    "admins"

                ),

                {

                    ...formData,

                    createdAt:

                        serverTimestamp(),

                }

            );

            showToast(

                "Administrator added successfully."

            );

            setTimeout(() => {

                router.push(

                    "/superadmin/admin-management/roles"

                );

            }, 1500);

        }

        catch (err) {

            console.log(err);

            showToast(

                "Unable to save administrator.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="content-wrapper add-admin-page">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Add Administrator

                    </h1>

                    <p>

                        Create a new administrator account.

                    </p>

                </div>

                <Link

                    href="/superadmin/admin-management/roles"

                    className="back-btn"

                >

                    <FaArrowLeft />

                    Back

                </Link>

            </div>

            <form

                className="admin-form"

                onSubmit={handleSubmit}

            >

                <div className="card">

                    <h3>

                        <FaUserShield />

                        Administrator Information

                    </h3>

                    <div className="grid">

                        <div className="form-group">

                            <label>

                                Full Name

                            </label>

                            <div className="input-box">

                                <FaUser />

                                <input

                                    type="text"

                                    name="fullName"

                                    value={formData.fullName}

                                    onChange={handleChange}

                                    placeholder="John Doe"

                                    required

                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label>

                                Email Address

                            </label>

                            <div className="input-box">

                                <FaEnvelope />

                                <input

                                    type="email"

                                    name="email"

                                    value={formData.email}

                                    onChange={handleChange}

                                    placeholder="admin@email.com"

                                    required

                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label>

                                Phone Number

                            </label>

                            <div className="input-box">

                                <FaPhone />

                                <input

                                    type="text"

                                    name="phone"

                                    value={formData.phone}

                                    onChange={handleChange}

                                    placeholder="+234..."

                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label>

                                Administrator Role

                            </label>

                            <div className="input-box">

                                <FaUserCog />

                                <select

                                    name="role"

                                    value={formData.role}

                                    onChange={handleChange}

                                >

                                    <option>

                                        Super Admin

                                    </option>

                                    <option>

                                        Administrator

                                    </option>

                                    <option>

                                        Moderator

                                    </option>

                                    <option>

                                        Support Staff

                                    </option>

                                </select>

                            </div>

                        </div>
                                                <div className="form-group">

                            <label>

                                Password

                            </label>

                            <div className="input-box">

                                <FaLock />

                                <input

                                    type="password"

                                    name="password"

                                    value={formData.password}

                                    onChange={handleChange}

                                    placeholder="Enter password"

                                    required

                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label>

                                Confirm Password

                            </label>

                            <div className="input-box">

                                <FaLock />

                                <input

                                    type="password"

                                    name="confirmPassword"

                                    value={formData.confirmPassword}

                                    onChange={handleChange}

                                    placeholder="Confirm password"

                                    required

                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label>

                                Account Status

                            </label>

                            <div className="input-box">

                                <FaUserShield />

                                <select

                                    name="status"

                                    value={formData.status}

                                    onChange={handleChange}

                                >

                                    <option value="Active">

                                        Active

                                    </option>

                                    <option value="Suspended">

                                        Suspended

                                    </option>

                                    <option value="Pending">

                                        Pending

                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Permissions */}

                <div className="card">

                    <h3>

                        <FaUserCog />

                        Administrator Permissions

                    </h3>

                    <div className="permissions-grid">

                        <label className="permission-item">

                            <input type="checkbox" defaultChecked />

                            Dashboard Access

                        </label>

                        <label className="permission-item">

                            <input type="checkbox" defaultChecked />

                            Hotel Management

                        </label>

                        <label className="permission-item">

                            <input type="checkbox" defaultChecked />

                            Booking Management

                        </label>

                        <label className="permission-item">

                            <input type="checkbox" defaultChecked />

                            Customer Management

                        </label>

                        <label className="permission-item">

                            <input type="checkbox" />

                            Payment Management

                        </label>

                        <label className="permission-item">

                            <input type="checkbox" />

                            CMS Management

                        </label>

                        <label className="permission-item">

                            <input type="checkbox" />

                            Reports & Analytics

                        </label>

                        <label className="permission-item">

                            <input type="checkbox" />

                            System Settings

                        </label>

                        <label className="permission-item">

                            <input type="checkbox" />

                            Security & Audit Logs

                        </label>

                        <label className="permission-item">

                            <input type="checkbox" />

                            Administrator Management

                        </label>

                    </div>

                </div>

                <div className="form-actions">

                    <Link

                        href="/superadmin/adminmanagement"

                        className="cancel-btn"

                    >

                        Cancel

                    </Link>

                    <button

                        type="submit"

                        className="save-btn"

                        disabled={loading}

                    >

                        <FaSave />

                        {

                            loading

                                ? "Creating Administrator..."

                                : "Create Administrator"

                        }

                    </button>

                </div>

            </form>

        </div>

    );

}