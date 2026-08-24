"use client";

import "./about-us.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import Link from "next/link";

import {
    FaSave,
    FaArrowLeft,
    FaImage,
    FaUpload,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function AddAboutSection() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [preview, setPreview] = useState("");

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const [form, setForm] = useState({

        title: "",

        subtitle: "",

        description: "",

        type: "Hero",

        status: "Published",

        image: "",

        buttonText: "",

        buttonLink: "",

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

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setPreview(URL.createObjectURL(file));

        // Cloudinary upload will be added later
        setForm({
            ...form,
            image: file.name,
        });

    };

    const saveSection = async (e) => {

        e.preventDefault();

        if (!form.title.trim()) {

            showToast(
                "Section title is required.",
                "error"
            );

            return;

        }

        try {

            setLoading(true);

            await addDoc(

                collection(
                    db,
                    "aboutCMS"
                ),

                {

                    ...form,

                    createdAt: serverTimestamp(),

                    updatedAt: serverTimestamp(),

                }

            );

            showToast(
                "Section added successfully."
            );

            setTimeout(() => {

                router.push(
                    "/superadmin/cms/about"
                );

            }, 1200);

        }

        catch (err) {

            console.log(err);

            showToast(
                "Unable to save section.",
                "error"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="content-wrapper add-about-page">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>Add About Section</h1>

                    <p>
                        Create a new section for your About page.
                    </p>

                </div>

                <Link
                    href="/superadmin/cms/aboutus"
                    className="back-btn"
                >

                    <FaArrowLeft />

                    Back

                </Link>

            </div>

            <form
                className="about-form"
                onSubmit={saveSection}
            >

                <div className="form-card">

                    <h3>
                        Basic Information
                    </h3>

                    <div className="form-group">

                        <label>
                            Section Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter title..."
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Subtitle
                        </label>

                        <input
                            type="text"
                            name="subtitle"
                            value={form.subtitle}
                            onChange={handleChange}
                            placeholder="Optional subtitle"
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            rows="6"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Write section description..."
                        />

                    </div>

                </div>

                <div className="form-card">

                    <h3>
                        Section Settings
                    </h3>

                    <div className="grid-2">

                        <div className="form-group">

                            <label>
                                Section Type
                            </label>

                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                            >

                                <option>
                                    Hero
                                </option>

                                <option>
                                    Story
                                </option>

                                <option>
                                    Mission
                                </option>

                                <option>
                                    Vision
                                </option>

                                <option>
                                    Why Choose Us
                                </option>

                                <option>
                                    Team
                                </option>

                                <option>
                                    Statistics
                                </option>

                                <option>
                                    CTA
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
                                    Published
                                </option>

                                <option>
                                    Draft
                                </option>

                            </select>

                        </div>

                    </div>

                    <div className="form-group">

                        <label>
                            Display Order
                        </label>

                        <input
                            type="number"
                            name="displayOrder"
                            value={form.displayOrder}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="form-card">

                    <h3>
                        Call To Action
                    </h3>

                    <div className="grid-2">

                        <div className="form-group">

                            <label>
                                Button Text
                            </label>

                            <input
                                type="text"
                                name="buttonText"
                                value={form.buttonText}
                                onChange={handleChange}
                                placeholder="Book Now"
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Button Link
                            </label>

                            <input
                                type="text"
                                name="buttonLink"
                                value={form.buttonLink}
                                onChange={handleChange}
                                placeholder="/hotels"
                            />

                        </div>

                    </div>

                </div>

                <div className="form-card">

                    <h3>

                        <FaImage />

                        Section Image

                    </h3>

                    <label
                        className="upload-box"
                    >

                        {

                            preview ?

                                <img
                                    src={preview}
                                    alt="Preview"
                                />

                                :

                                <>

                                    <FaUpload />

                                    <span>
                                        Click to upload image
                                    </span>

                                </>

                        }

                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImage}
                        />

                    </label>

                </div>

                <div className="form-actions">

                    <button
                        type="submit"
                        className="save-btn"
                        disabled={loading}
                    >

                        <FaSave />

                        {

                            loading ?

                                "Saving..."

                                :

                                "Save Section"

                        }

                    </button>

                </div>

            </form>

        </div>

    );

}