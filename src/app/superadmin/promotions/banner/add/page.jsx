"use client";

import "./add-banner.css";

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
    FaUpload,
    FaImage,
    FaSave,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function AddBannerPage() {

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

        subtitle: "",

        destinationUrl: "",

        image: "",

        position: "Hero Slider",

        priority: 1,

        startDate: "",

        endDate: "",

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

            showToast("Banner uploaded successfully.");

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

                collection(db, "banners"),

                {

                    ...form,

                    clicks: 0,

                    views: 0,

                    createdAt: serverTimestamp(),

                    updatedAt: serverTimestamp(),

                }

            );

            showToast("Banner created successfully.");

            setTimeout(() => {

                router.push("/superadmin/banner");

            }, 1200);

        }

        catch (err) {

            console.log(err);

            showToast(

                "Failed to save banner.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="add-banner-page content-wrapper">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Add Homepage Banner

                    </h1>

                    <p>

                        Create a new homepage slider or promotional banner.

                    </p>

                </div>

                <Link

                    href="/superadmin/promotions/banner"

                    className="back-btn"

                >

                    <FaArrowLeft />

                    Back

                </Link>

            </div>

            <form

                className="banner-form"

                onSubmit={handleSubmit}

            >

                <div className="form-grid">

                    <div className="form-group">

                        <label>

                            Banner Title

                        </label>

                        <input

                            type="text"

                            name="title"

                            value={form.title}

                            onChange={handleChange}

                            placeholder="Summer Holiday Sale"

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Banner Position

                        </label>

                        <select

                            name="position"

                            value={form.position}

                            onChange={handleChange}

                        >

                            <option>

                                Hero Slider

                            </option>

                            <option>

                                Homepage Banner

                            </option>

                            <option>

                                Mid Page Banner

                            </option>

                            <option>

                                Footer Banner

                            </option>

                        </select>

                    </div>

                    <div className="form-group full">

                        <label>

                            Subtitle

                        </label>

                        <textarea

                            rows="4"

                            name="subtitle"

                            value={form.subtitle}

                            onChange={handleChange}

                            placeholder="Save up to 40% on selected hotels."

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

                            placeholder="https://yourwebsite.com/summer-sale"

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Priority

                        </label>

                        <input

                            type="number"

                            min="1"

                            name="priority"

                            value={form.priority}

                            onChange={handleChange}

                        />

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

                    <div className="form-group full">

                        <label>

                            Banner Image

                        </label>

                        <label
                            htmlFor="bannerImage"
                            className="upload-box"
                        >

                            {

                                form.image ?

                                    <img
                                        src={form.image}
                                        alt="Banner Preview"
                                        className="preview-image"
                                    />

                                    :

                                    <div className="upload-placeholder">

                                        <FaImage size={45} />

                                        <h3>

                                            Upload Banner Image

                                        </h3>

                                        <p>

                                            Recommended size:
                                            1920 × 700 pixels

                                        </p>

                                        <span>

                                            JPG • PNG • WEBP

                                        </span>

                                    </div>

                            }

                        </label>

                        <input
                            id="bannerImage"
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
                        disabled={loading}
                        onClick={() =>
                            document
                                .getElementById("bannerImage")
                                .click()
                        }
                    >

                        <FaUpload />

                        Upload Banner

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

                                "Saving Banner..."

                                :

                                "Save Banner"

                        }

                    </button>

                </div>

            </form>

        </div>

    );

}