"use client";

import "./email.css";

import { useState } from "react";

import Link from "next/link";

import {
    doc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaArrowLeft,
    FaSave,
    FaEnvelope,
    FaPaperPlane,
    FaServer,
    FaLock,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function EmailSettings() {

    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const [settings, setSettings] = useState({

        smtpHost: "",

        smtpPort: "587",

        smtpUsername: "",

        smtpPassword: "",

        encryption: "TLS",

        senderName: "HotelBook",

        senderEmail: "",

        replyTo: "",

        testEmail: "",

        emailEnabled: true,

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

        const { name, value, type, checked } = e.target;

        setSettings({

            ...settings,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,

        });

    };

    const saveSettings = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await setDoc(

                doc(
                    db,
                    "settings",
                    "email"
                ),

                {

                    ...settings,

                    updatedAt: serverTimestamp(),

                }

            );

            showToast(
                "Email settings saved successfully."
            );

        }

        catch (err) {

            console.log(err);

            showToast(
                "Unable to save settings.",
                "error"
            );

        }

        finally {

            setLoading(false);

        }

    };

    const sendTestEmail = () => {

        if (!settings.testEmail) {

            showToast(
                "Enter a test email address.",
                "error"
            );

            return;

        }

        showToast(
            "Test email feature will be connected later."
        );

    };

    return (

        <div className="content-wrapper email-page">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>

                        Email Settings

                    </h1>

                    <p>

                        Configure SMTP and outgoing emails.

                    </p>

                </div>

                <Link
                    href="/superadmin/settings"
                    className="back-btn"
                >

                    <FaArrowLeft />

                    Back

                </Link>

            </div>

            <form
                className="email-form"
                onSubmit={saveSettings}
            >

                {/* SMTP */}

                <div className="settings-card">

                    <h3>

                        <FaServer />

                        SMTP Configuration

                    </h3>

                    <div className="form-group">

                        <label>SMTP Host</label>

                        <input
                            type="text"
                            name="smtpHost"
                            value={settings.smtpHost}
                            onChange={handleChange}
                            placeholder="smtp.gmail.com"
                        />

                    </div>

                    <div className="grid-2">

                        <div className="form-group">

                            <label>SMTP Port</label>

                            <input
                                type="text"
                                name="smtpPort"
                                value={settings.smtpPort}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Encryption</label>

                            <select
                                name="encryption"
                                value={settings.encryption}
                                onChange={handleChange}
                            >

                                <option>TLS</option>
                                <option>SSL</option>
                                <option>None</option>

                            </select>

                        </div>

                    </div>

                    <div className="form-group">

                        <label>SMTP Username</label>

                        <input
                            type="text"
                            name="smtpUsername"
                            value={settings.smtpUsername}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>SMTP Password</label>

                        <input
                            type="password"
                            name="smtpPassword"
                            value={settings.smtpPassword}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                {/* Sender */}

                <div className="settings-card">

                    <h3>

                        <FaEnvelope />

                        Sender Information

                    </h3>

                    <div className="grid-2">

                        <div className="form-group">

                            <label>Sender Name</label>

                            <input
                                type="text"
                                name="senderName"
                                value={settings.senderName}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Sender Email</label>

                            <input
                                type="email"
                                name="senderEmail"
                                value={settings.senderEmail}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="form-group">

                        <label>Reply-To Email</label>

                        <input
                            type="email"
                            name="replyTo"
                            value={settings.replyTo}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                {/* Test Email */}

                <div className="settings-card">

                    <h3>

                        <FaPaperPlane />

                        Test Email

                    </h3>

                    <div className="form-group">

                        <label>Email Address</label>

                        <input
                            type="email"
                            name="testEmail"
                            value={settings.testEmail}
                            onChange={handleChange}
                            placeholder="example@email.com"
                        />

                    </div>

                    <button
                        type="button"
                        className="test-btn"
                        onClick={sendTestEmail}
                    >

                        <FaPaperPlane />

                        Send Test Email

                    </button>

                </div>

                {/* General */}

                <div className="settings-card">

                    <h3>

                        <FaLock />

                        General

                    </h3>

                    <div className="switch-row">

                        <div>

                            <h4>

                                Enable Email Service

                            </h4>

                            <p>

                                Disable to stop all outgoing emails.

                            </p>

                        </div>

                        <input
                            type="checkbox"
                            name="emailEnabled"
                            checked={settings.emailEnabled}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="form-actions">

                    <button
                        className="save-btn"
                        disabled={loading}
                    >

                        <FaSave />

                        {

                            loading

                                ? "Saving..."

                                : "Save Settings"

                        }

                    </button>

                </div>

            </form>

        </div>

    );

}