"use client";

import "./backup-restore.css";

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
    FaDatabase,
    FaDownload,
    FaUpload,
    FaHistory,
    FaCloudUploadAlt,
    FaSave,
    FaTrashRestore,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function BackupRestorePage() {

    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({

        show: false,

        message: "",

        type: "success",

    });

    const [settings, setSettings] = useState({

        autoBackup: true,

        backupFrequency: "Daily",

        backupLocation: "Firebase Storage",

        keepBackups: 30,

        lastBackup: new Date().toLocaleString(),

    });

    const [backupHistory, setBackupHistory] = useState([

        {

            id: 1,

            file: "backup_2026_07_30.zip",

            size: "18.6 MB",

            date: "30 Jul 2026 10:30 AM",

            status: "Completed",

        },

        {

            id: 2,

            file: "backup_2026_07_29.zip",

            size: "18.2 MB",

            date: "29 Jul 2026 10:30 AM",

            status: "Completed",

        },

        {

            id: 3,

            file: "backup_2026_07_28.zip",

            size: "17.8 MB",

            date: "28 Jul 2026 10:30 AM",

            status: "Completed",

        },

    ]);

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

            type,

            checked,

        } = e.target;

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

                    "backup"

                ),

                {

                    ...settings,

                    updatedAt:

                        serverTimestamp(),

                }

            );

            showToast(

                "Backup settings saved successfully."

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

    const createBackup = () => {

        showToast(

            "Backup process started."

        );

    };

    const restoreBackup = () => {

        if (

            !confirm(

                "Restore the latest backup? This may overwrite existing data."

            )

        ) return;

        showToast(

            "Restore process started."

        );

    };

    return (

        <div className="content-wrapper backup-page">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Backup & Restore

                    </h1>

                    <p>

                        Protect your HotelBook data with automatic backups and restore options.

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

                className="backup-form"

                onSubmit={saveSettings}

            >

                {/* Backup Settings */}

                <div className="settings-card">

                    <h3>

                        <FaDatabase />

                        Backup Settings

                    </h3>

                    <div className="switch-row">

                        <div>

                            <h4>

                                Automatic Backup

                            </h4>

                            <p>

                                Automatically back up your database.

                            </p>

                        </div>

                        <input

                            type="checkbox"

                            name="autoBackup"

                            checked={settings.autoBackup}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="grid-2">

                        <div className="form-group">

                            <label>

                                Backup Frequency

                            </label>

                            <select

                                name="backupFrequency"

                                value={settings.backupFrequency}

                                onChange={handleChange}

                            >

                                <option>

                                    Daily

                                </option>

                                <option>

                                    Weekly

                                </option>

                                <option>

                                    Monthly

                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>

                                Keep Backups

                            </label>

                            <input

                                type="number"

                                name="keepBackups"

                                value={settings.keepBackups}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                    <div className="form-group">

                        <label>

                            Backup Location

                        </label>

                        <select

                            name="backupLocation"

                            value={settings.backupLocation}

                            onChange={handleChange}

                        >

                            <option>

                                Firebase Storage

                            </option>

                            <option>

                                Google Cloud Storage

                            </option>

                            <option>

                                Amazon S3

                            </option>

                            <option>

                                Local Server

                            </option>

                        </select>

                    </div>

                </div>

                {/* Manual Backup */}

                <div className="settings-card">

                    <h3>

                        <FaCloudUploadAlt />

                        Manual Backup

                    </h3>

                    <p className="section-description">

                        Last Backup:

                        <strong>

                            {" "}

                            {settings.lastBackup}

                        </strong>

                    </p>

                    <div className="action-buttons">

                        <button

                            type="button"

                            className="backup-btn"

                            onClick={createBackup}

                        >

                            <FaDownload />

                            Create Backup

                        </button>

                        <button

                            type="button"

                            className="restore-btn"

                            onClick={restoreBackup}

                        >

                            <FaTrashRestore />

                            Restore Backup

                        </button>

                    </div>

                </div>
                                {/* Upload Backup */}

                <div className="settings-card">

                    <h3>

                        <FaUpload />

                        Upload Backup File

                    </h3>

                    <div className="upload-box">

                        <input
                            type="file"
                            accept=".zip,.sql,.json"
                        />

                        <p>

                            Upload a backup file (.zip, .sql or .json) to restore your system.

                        </p>

                    </div>

                </div>

                {/* Backup History */}

                <div className="settings-card">

                    <h3>

                        <FaHistory />

                        Backup History

                    </h3>

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>Backup File</th>

                                    <th>Size</th>

                                    <th>Date</th>

                                    <th>Status</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    backupHistory.map(item => (

                                        <tr key={item.id}>

                                            <td>

                                                {item.file}

                                            </td>

                                            <td>

                                                {item.size}

                                            </td>

                                            <td>

                                                {item.date}

                                            </td>

                                            <td>

                                                <span className="status success">

                                                    {item.status}

                                                </span>

                                            </td>

                                            <td>

                                                <div className="table-actions">

                                                    <button
                                                        type="button"
                                                        className="download-btn"
                                                    >

                                                        <FaDownload />

                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="delete-btn"
                                                    >

                                                        <FaTrashRestore />

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