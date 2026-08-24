"use client";

import "./sms.css";

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
    FaSms,
    FaKey,
    FaServer,
    FaPaperPlane,
    FaMobileAlt,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function SmsSettings() {

    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const [settings, setSettings] = useState({

        smsEnabled: true,

        provider: "Termii",

        apiKey: "",

        senderId: "HotelBook",

        apiUrl: "",

        username: "",

        password: "",

        testNumber: "",

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
                    "sms"
                ),

                {

                    ...settings,

                    updatedAt: serverTimestamp(),

                }

            );

            showToast(
                "SMS settings saved successfully."
            );

        }

        catch (err) {

            console.log(err);

            showToast(
                "Unable to save SMS settings.",
                "error"
            );

        }

        finally {

            setLoading(false);

        }

    };

    const sendTestSMS = () => {

        if (!settings.testNumber) {

            showToast(
                "Enter a phone number first.",
                "error"
            );

            return;

        }

        showToast(
            "Test SMS integration will be connected later."
        );

    };

    return (

        <div className="content-wrapper sms-page">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>

                        SMS Settings

                    </h1>

                    <p>

                        Configure your SMS gateway provider.

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
                className="sms-form"
                onSubmit={saveSettings}
            >

                {/* Provider */}

                <div className="settings-card">

                    <h3>

                        <FaServer />

                        SMS Provider

                    </h3>

                    <div className="form-group">

                        <label>

                            Provider

                        </label>

                        <select
                            name="provider"
                            value={settings.provider}
                            onChange={handleChange}
                        >

                            <option>Termii</option>

                            <option>Twilio</option>

                            <option>Africa's Talking</option>

                            <option>Vonage</option>

                            <option>Custom API</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            API URL

                        </label>

                        <input
                            type="text"
                            name="apiUrl"
                            value={settings.apiUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                        />

                    </div>

                </div>

                {/* Credentials */}

                <div className="settings-card">

                    <h3>

                        <FaKey />

                        API Credentials

                    </h3>

                    <div className="form-group">

                        <label>

                            API Key

                        </label>

                        <input
                            type="text"
                            name="apiKey"
                            value={settings.apiKey}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="grid-2">

                        <div className="form-group">

                            <label>

                                Username

                            </label>

                            <input
                                type="text"
                                name="username"
                                value={settings.username}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Password / Secret

                            </label>

                            <input
                                type="password"
                                name="password"
                                value={settings.password}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="form-group">

                        <label>

                            Sender ID

                        </label>

                        <input
                            type="text"
                            name="senderId"
                            value={settings.senderId}
                            onChange={handleChange}
                            placeholder="HotelBook"
                        />

                    </div>

                </div>

                {/* Test SMS */}

                <div className="settings-card">

                    <h3>

                        <FaPaperPlane />

                        Send Test SMS

                    </h3>

                    <div className="form-group">

                        <label>

                            Phone Number

                        </label>

                        <input
                            type="text"
                            name="testNumber"
                            value={settings.testNumber}
                            onChange={handleChange}
                            placeholder="+2348012345678"
                        />

                    </div>

                    <button
                        type="button"
                        className="test-btn"
                        onClick={sendTestSMS}
                    >

                        <FaMobileAlt />

                        Send Test SMS

                    </button>

                </div>

                {/* General */}

                <div className="settings-card">

                    <h3>

                        <FaSms />

                        General

                    </h3>

                    <div className="switch-row">

                        <div>

                            <h4>

                                Enable SMS Service

                            </h4>

                            <p>

                                Disable to stop all outgoing SMS.

                            </p>

                        </div>

                        <input
                            type="checkbox"
                            name="smsEnabled"
                            checked={settings.smsEnabled}
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