"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
    doc,
    getDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import Toast from "@/components/alert/Toast";

import "./edit-hotel.css";

export default function EditHotel() {
    const { id } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [hotel, setHotel] = useState({
        hotelName: "",
        category: "",
        starRating: "",
        description: "",

        country: "",
        state: "",
        city: "",
        address: "",

        email: "",
        phone: "",
        website: "",

        status: "",

        checkIn: "",
        checkOut: "",

        cancellationPolicy: "",

        amenities: [],
    });

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
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

    useEffect(() => {
        loadHotel();
    }, []);

    const loadHotel = async () => {
        try {
            const ref = doc(db, "hotels", id);

            const snap = await getDoc(ref);

            if (snap.exists()) {
                setHotel(snap.data());
            } else {
                showToast("Hotel not found.", "error");
            }
        } catch (error) {
            showToast("Failed to load hotel.", "error");
        }

        setLoading(false);
    };

    const handleChange = (e) => {
        setHotel({
            ...hotel,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            await updateDoc(
                doc(db, "hotels", id),
                {
                    ...hotel,
                    updatedAt: serverTimestamp(),
                }
            );

            showToast(
                "Hotel updated successfully."
            );

            setTimeout(() => {
                router.push("/superadmin/hotels");
            }, 1200);

        } catch (error) {
            showToast(
                "Unable to update hotel.",
                "error"
            );
        }

        setSaving(false);
    };

    if (loading)
        return <h2>Loading...</h2>;

    return (
        <>
            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="edit-page content-wrapper">

                <div className="page-header">
                    <h1>Edit Hotel</h1>
                </div>

                <form
                    className="hotel-form"
                    onSubmit={handleUpdate}
                >

                    <div className="form-group">
                        <label>Hotel Name</label>

                        <input
                            type="text"
                            name="hotelName"
                            value={hotel.hotelName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>

                        <input
                            type="text"
                            name="category"
                            value={hotel.category}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Star Rating</label>

                        <input
                            type="text"
                            name="starRating"
                            value={hotel.starRating}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            rows={5}
                            name="description"
                            value={hotel.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Country</label>

                        <input
                            type="text"
                            name="country"
                            value={hotel.country}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>State</label>

                        <input
                            type="text"
                            name="state"
                            value={hotel.state}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>City</label>

                        <input
                            type="text"
                            name="city"
                            value={hotel.city}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Address</label>

                        <textarea
                            rows={3}
                            name="address"
                            value={hotel.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={hotel.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>

                        <input
                            type="text"
                            name="phone"
                            value={hotel.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Website</label>

                        <input
                            type="text"
                            name="website"
                            value={hotel.website}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>

                        <select
                            name="status"
                            value={hotel.status}
                            onChange={handleChange}
                        >
                            <option>Pending</option>
                            <option>Approved</option>
                            <option>Inactive</option>
                        </select>
                    </div>

                    <button
                        className="save-btn"
                        disabled={saving}
                    >
                        {saving
                            ? "Updating..."
                            : "Update Hotel"}
                    </button>

                </form>

            </div>
        </>
    );
}