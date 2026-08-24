
"use client";

import { useState } from "react";
import "../../../../style/superadmin/add-hotel.css";
import { db } from "../../../../firebase/firebase";
import Toast from "../../../../components/alert/Toast";
import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import {
  uploadImage,
  uploadMultipleImages,
} from "@/lib/cloudinary";




export default function AddHotelPage() {

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Show toast
  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  // Close toast
  const closeToast = () => {
    setToast((prev) => ({
      ...prev,
      show: false,
    }));
  };
    const [hotel, setHotel] = useState({
        hotelName: "",
        category: "",
        starRating: "",
        description: "",

        country: "",
        state: "",
        city: "",
        address: "",
        zipCode: "",

        email: "",
        phone: "",
        website: "",

        checkIn: "",
        checkOut: "",
        cancellationPolicy: "",
        status: "Pending",

        amenities: [],
    });

    const categories = [
        "Hotel",
        "Apartment",
        "Resort",
        "Villa",
        "Guest House",
        "Hostel",
        "Lodge",
        "Motel",
        "Boutique Hotel",
        "Luxury Hotel",
        "Homestay",
        "Vacation Home",
        "Serviced Apartment",
    ];

    const amenities = [
        "Free WiFi",
        "Parking",
        "Swimming Pool",
        "Gym",
        "Restaurant",
        "Spa",
        "Laundry",
        "Airport Shuttle",
        "Breakfast Included",
        "Air Conditioning",
        "Bar",
        "Room Service",
        "Pet Friendly",
        "24/7 Reception",
        "Conference Room",
    ];

    const handleChange = (e) => {
        setHotel({
            ...hotel,
            [e.target.name]: e.target.value,
        });
    };


    const [coverImage, setCoverImage] = useState(null);

    const [galleryImages, setGalleryImages] = useState([]);
    const handleAmenity = (amenity) => {
        if (hotel.amenities.includes(amenity)) {
            setHotel({
                ...hotel,
                amenities: hotel.amenities.filter(
                    (item) => item !== amenity
                ),
            });
        } else {
            setHotel({
                ...hotel,
                amenities: [...hotel.amenities, amenity],
            });
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await addDoc(collection(db, "hotels"), {
            ...hotel,

            coverImage: "",

            galleryImages: [],

            featured: false,

            verified: false,

            status: "Pending",

            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp(),
        });

        showToast("Hotel added successfully.", "success");

        // Optional: Reset form
        setHotel({
            hotelName: "",
            category: "",
            starRating: "",
            description: "",

            country: "",
            state: "",
            city: "",
            address: "",
            zipCode: "",

            email: "",
            phone: "",
            website: "",

            checkIn: "",
            checkOut: "",
            cancellationPolicy: "",
            status: "Pending",

            amenities: [],
        });

        setCoverImage(null);
        setGalleryImages([]);

    } catch (error) {
        console.error(error);

        showToast(error.message, "error");
    }
};

    return (
        <>
            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="hotel-page content-wrapper">

                <div className="page-header">
                    <h1>Add New Hotel</h1>
                    <p>Create a new hotel listing.</p>
                </div>

                <form
                    className="hotel-form"
                    onSubmit={handleSubmit}
                >

                    <div className="card">

                        <h2>Basic Information</h2>

                        <div className="grid">

                            <div className="form-group">
                                <label>Hotel Name</label>

                                <input
                                    type="text"
                                    name="hotelName"
                                    value={hotel.hotelName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Category</label>

                                <select
                                    name="category"
                                    value={hotel.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select Category
                                    </option>

                                    {categories.map((item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Star Rating</label>

                                <select
                                    name="starRating"
                                    value={hotel.starRating}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option>1 Star</option>
                                    <option>2 Stars</option>
                                    <option>3 Stars</option>
                                    <option>4 Stars</option>
                                    <option>5 Stars</option>
                                </select>
                            </div>

                        </div>

                        <div className="form-group">
                            <label>Description</label>

                            <textarea
                                rows="5"
                                name="description"
                                value={hotel.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                    </div>

                    <div className="card">

                        <h2>Location</h2>

                        <div className="grid">

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
                                <label>Zip Code</label>

                                <input
                                    type="text"
                                    name="zipCode"
                                    value={hotel.zipCode}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="form-group">
                            <label>Address</label>

                            <textarea
                                rows="3"
                                name="address"
                                value={hotel.address}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                    </div>

                    <div className="card">

                        <h2>Contact Information</h2>

                        <div className="grid">

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

                        </div>

                    </div>

                    <div className="card">

                        <h2>Amenities</h2>

                        <div className="amenities">

                            {amenities.map((item) => (

                                <label
                                    key={item}
                                    className="checkbox"
                                >

                                    <input
                                        type="checkbox"
                                        checked={hotel.amenities.includes(item)}
                                        onChange={() => handleAmenity(item)}
                                    />

                                    {item}

                                </label>

                            ))}

                        </div>

                    </div>

                    <div className="card">

                        <h2>Policies</h2>

                        <div className="grid">

                            <div className="form-group">
                                <label>Check In</label>

                                <input
                                    type="time"
                                    name="checkIn"
                                    value={hotel.checkIn}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Check Out</label>

                                <input
                                    type="time"
                                    name="checkOut"
                                    value={hotel.checkOut}
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

                        </div>

                        <div className="form-group">
                            <label>Cancellation Policy</label>

                            <textarea
                                rows="4"
                                name="cancellationPolicy"
                                value={hotel.cancellationPolicy}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                    </div>

                    <div className="card">

                        <h2>Hotel Images</h2>

                        <div className="grid">

                            <div className="form-group">
                                <label>Cover Image</label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setCoverImage(e.target.files[0])
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Gallery Images</label>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) =>
                                        setGalleryImages([...e.target.files])
                                    }
                                />
                            </div>

                        </div>

                    </div>

                    <button
                        className="save-btn"
                        type="submit"
                    >
                        Save Hotel
                    </button>

                </form>

            </div>
        </>
    );
}

