"use client";

import "./amenities.css";

import { useEffect, useState } from "react";

import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaSave,
    FaTimes,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function Amenities() {

    const [amenities, setAmenities] = useState([]);

    const [search, setSearch] = useState("");

    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);

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
                type,
            });

        }, 3000);

    };

    useEffect(() => {
        loadAmenities();
    }, []);

    const loadAmenities = async () => {

        const snapshot = await getDocs(
            collection(db, "amenities")
        );

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        setAmenities(data);

    };

    const saveAmenity = async () => {

        if (!name.trim()) {
            showToast("Amenity name is required.", "error");
            return;
        }

        try {

            if (editingId) {

                await updateDoc(
                    doc(db, "amenities", editingId),
                    {
                        name,
                        icon,
                        description,
                    }
                );

                showToast("Amenity updated.");

            } else {

                await addDoc(
                    collection(db, "amenities"),
                    {
                        name,
                        icon,
                        description,
                        status: "Active",
                        createdAt: serverTimestamp(),
                    }
                );

                showToast("Amenity added.");

            }

            clearForm();

            loadAmenities();

        } catch {

            showToast("Something went wrong.", "error");

        }

    };

    const clearForm = () => {

        setEditingId(null);
        setName("");
        setIcon("");
        setDescription("");

    };

    const editAmenity = (item) => {

        setEditingId(item.id);
        setName(item.name);
        setIcon(item.icon || "");
        setDescription(item.description || "");

    };

    const removeAmenity = async (id) => {

        if (!confirm("Delete this amenity?"))
            return;

        await deleteDoc(doc(db, "amenities", id));

        showToast("Amenity deleted.");

        loadAmenities();

    };

    const filtered = amenities.filter(item =>
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="amenity-page content-wrapper">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <h1>Hotel Amenities</h1>

                <p>Manage amenities available for hotels.</p>

            </div>

            <div className="amenity-card">

                <div className="form-grid">

                    <input
                        type="text"
                        placeholder="Amenity Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="React Icon (optional)"
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button
                        className="save-btn"
                        onClick={saveAmenity}
                    >
                        {editingId ? (
                            <>
                                <FaSave />
                                Update
                            </>
                        ) : (
                            <>
                                <FaPlus />
                                Add Amenity
                            </>
                        )}
                    </button>

                    {editingId && (

                        <button
                            className="cancel-btn"
                            onClick={clearForm}
                        >
                            <FaTimes />
                            Cancel
                        </button>

                    )}

                </div>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search amenity..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

            </div>

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Icon</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.length === 0 ? (

                            <tr>

                                <td colSpan="5">

                                    No amenities found.

                                </td>

                            </tr>

                        ) : (

                            filtered.map(item => (

                                <tr key={item.id}>

                                    <td>{item.name}</td>

                                    <td>{item.icon || "-"}</td>

                                    <td>{item.description}</td>

                                    <td>

                                        <span className="active">

                                            {item.status}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="actions">

                                            <button
                                                className="edit"
                                                onClick={() => editAmenity(item)}
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                className="delete"
                                                onClick={() => removeAmenity(item.id)}
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}