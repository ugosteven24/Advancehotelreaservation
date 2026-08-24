"use client";

import "./general.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    doc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import Link from "next/link";

import {
    FaArrowLeft,
    FaSave,
    FaCog,
    FaGlobe,
    FaLanguage,
    FaClock,
    FaCalendarAlt,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function GeneralSettings() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const [settings, setSettings] = useState({

        websiteName: "HotelBook",

        websiteTagline: "Book Hotels Anywhere",

        defaultLanguage: "English",

        timezone: "Africa/Lagos",

        dateFormat: "DD/MM/YYYY",

        currency: "NGN",

        maintenanceMode: false,

        allowRegistration: true,

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
                    "general"
                ),

                {

                    ...settings,

                    updatedAt: serverTimestamp(),

                }

            );

            showToast(
                "General settings updated."
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

    return (

        <div className="content-wrapper general-settings">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>

                        General Settings

                    </h1>

                    <p>

                        Configure your website preferences.

                    </p>

                </div>

                <Link
                    href="/superadmin/settings/general"
                    className="back-btn"
                >

                    <FaArrowLeft />

                    Back

                </Link>

            </div>

            <form
                className="settings-form"
                onSubmit={saveSettings}
            >

                <div className="settings-card">

                    <h3>

                        <FaCog />

                        Website Information

                    </h3>

                    <div className="form-group">

                        <label>

                            Website Name

                        </label>

                        <input
                            type="text"
                            name="websiteName"
                            value={settings.websiteName}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Website Tagline

                        </label>

                        <input
                            type="text"
                            name="websiteTagline"
                            value={settings.websiteTagline}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="settings-card">

                    <h3>

                        <FaGlobe />

                        Localization

                    </h3>

                    <div className="grid-2">

                        <div className="form-group">

                            <label>

                                Language

                            </label>

                            <select
                                name="defaultLanguage"
                                value={settings.defaultLanguage}
                                onChange={handleChange}
                            >

                                <option>
                                    English
                                </option>

                                <option>
                                    French
                                </option>

                                <option>
                                    Spanish
                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>

                                Currency

                            </label>

                            <select
                                name="currency"
                                value={settings.currency}
                                onChange={handleChange}
                            >

                                <option>
                                    NGN
                                </option>

                                <option>
                                    USD
                                </option>

                                <option>
                                    EUR
                                </option>

                                <option>
                                    GBP
                                </option>

                            </select>

                        </div>

                    </div>

                    <div className="grid-2">

                        <div className="form-group">

                            <label>

                                Timezone

                            </label>

                            <input
                                type="text"
                                name="timezone"
                                value={settings.timezone}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>

                                Date Format

                            </label>

                            <select
                                name="dateFormat"
                                value={settings.dateFormat}
                                onChange={handleChange}
                            >

                                <option>
                                    DD/MM/YYYY
                                </option>

                                <option>
                                    MM/DD/YYYY
                                </option>

                                <option>
                                    YYYY-MM-DD
                                </option>

                            </select>

                        </div>

                    </div>

                </div>

                <div className="settings-card">

                    <h3>

                        <FaClock />

                        System Options

                    </h3>

                    <div className="switch-row">

                        <div>

                            <h4>

                                Maintenance Mode

                            </h4>

                            <p>
                                Temporarily disable public access.
                            </p>

                        </div>

                        <input
                            type="checkbox"
                            name="maintenanceMode"
                            checked={settings.maintenanceMode}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="switch-row">

                        <div>

                            <h4>

                                User Registration

                            </h4>

                            <p>
                                Allow new users to register.
                            </p>

                        </div>

                        <input
                            type="checkbox"
                            name="allowRegistration"
                            checked={settings.allowRegistration}
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