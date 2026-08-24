"use client";

import "./add-advertisement.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { db } from "@/firebase/firebase";

import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

import {
    FaUpload,
    FaImage,
    FaSave,
    FaArrowLeft,
} from "react-icons/fa";

import Link from "next/link";
import Toast from "@/components/Toast";

export default function AddAdvertisementPage() {

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
                type,
            });

        }, 3000);

    };

    const [form, setForm] = useState({

        title: "",

        description: "",

        company: "",

        destinationUrl: "",

        position: "Homepage Hero",

        startDate: "",

        endDate: "",

        budget: "",

        costPerClick: "",

        image: "",

        status: "Active",

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    /* Cloudinary Upload */

    const uploadImage = async (file) => {

        if (!file) return;

        try {

            setLoading(true);

            const data = new FormData();

            data.append("file", file);

            data.append(
                "upload_preset",
                "YOUR_UPLOAD_PRESET"
            );

            data.append(
                "cloud_name",
                "YOUR_CLOUD_NAME"
            );

            const res = await fetch(

                "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",

                {

                    method: "POST",

                    body: data,

                }

            );

            const uploaded = await res.json();

            setForm(prev => ({

                ...prev,

                image: uploaded.secure_url,

            }));

            showToast(
                "Image uploaded successfully."
            );

        }

        catch (err) {

            console.log(err);

            showToast(
                "Image upload failed.",
                "error"
            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !form.title ||
            !form.company ||
            !form.image
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
                collection(db, "advertisements"),
                {

                    ...form,

                    clicks: 0,

                    views: 0,

                    createdAt: serverTimestamp(),

                    updatedAt: serverTimestamp(),

                }
            );

            showToast(
                "Advertisement created successfully."
            );

            setTimeout(() => {

                router.push(
                    "/superadmin/advertisements"
                );

            }, 1200);

        }

        catch (err) {

            console.log(err);

            showToast(
                "Failed to create advertisement.",
                "error"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="add-ad-page content-wrapper">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>

                        Add Advertisement

                    </h1>

                    <p>

                        Create a new banner advertisement.

                    </p>

                </div>

                <Link
                    href="/superadmin/promotions/advertisements"
                    className="back-btn"
                >

                    <FaArrowLeft />

                    Back

                </Link>

            </div>

            <form
                className="advertisement-form"
                onSubmit={handleSubmit}
            >

                <div className="form-grid">

                    <div className="form-group">

                        <label>

                            Advertisement Title

                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Summer Sale"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Company

                        </label>

                        <input
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Travel Africa"
                            required
                        />

                    </div>

                    <div className="form-group full">

                        <label>

                            Description

                        </label>

                        <textarea
                            rows="4"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Short advertisement description..."
                        />

                    </div>

                    <div className="form-group full">

                        <label>

                            Destination URL

                        </label>

                        <input
                            type="url"
                            name="destinationUrl"
                            value={form.destinationUrl}
                            onChange={handleChange}
                            placeholder="https://yourwebsite.com"
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Advertisement Position

                        </label>

                        <select
                            name="position"
                            value={form.position}
                            onChange={handleChange}
                        >

                            <option>
                                Homepage Hero
                            </option>

                            <option>
                                Homepage Banner
                            </option>

                            <option>
                                Sidebar
                            </option>

                            <option>
                                Featured Hotels
                            </option>

                            <option>
                                Search Results
                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Status

                        </label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                        >

                            <option>
                                Active
                            </option>

                            <option>
                                Inactive
                            </option>

                            <option>
                                Scheduled
                            </option>

                        </select>

                    </div>
                    <div className="form-group">

                        <label>

                            Start Date

                        </label>

                        <input
                            type="date"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            End Date

                        </label>

                        <input
                            type="date"
                            name="endDate"
                            value={form.endDate}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Budget (₦)

                        </label>

                        <input
                            type="number"
                            name="budget"
                            value={form.budget}
                            onChange={handleChange}
                            placeholder="500000"
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Cost Per Click (₦)

                        </label>

                        <input
                            type="number"
                            name="costPerClick"
                            value={form.costPerClick}
                            onChange={handleChange}
                            placeholder="100"
                        />

                    </div>

                    <div className="form-group full">

                        <label>

                            Advertisement Image

                        </label>

                        <label
                            htmlFor="imageUpload"
                            className="upload-box"
                        >

                            {

                                form.image ?

                                    <img
                                        src={form.image}
                                        alt="Advertisement"
                                        className="preview-image"
                                    />

                                    :

                                    <div className="upload-placeholder">

                                        <FaImage size={40} />

                                        <p>

                                            Click to upload banner

                                        </p>

                                        <span>

                                            JPG, PNG or WEBP

                                        </span>

                                    </div>

                            }

                        </label>

                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) =>
                                uploadImage(
                                    e.target.files[0]
                                )
                            }
                        />

                    </div>

                </div>

                <div className="form-actions">

                    <button
                        type="button"
                        className="upload-btn"
                        onClick={() =>
                            document
                                .getElementById("imageUpload")
                                .click()
                        }
                        disabled={loading}
                    >

                        <FaUpload />

                        Upload Image

                    </button>

                    <button
                        type="submit"
                        className="save-btn"
                        disabled={loading}
                    >

                        <FaSave />

                        {

                            loading

                                ?

                                "Saving..."

                                :

                                "Save Advertisement"

                        }

                    </button>

                </div>

            </form>

        </div>

    );

}