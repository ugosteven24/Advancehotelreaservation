"use client";

import "./categories.css";

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

export default function HotelCategories() {

    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");

    const [name, setName] = useState("");
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
                type: "success",
            });

        }, 3000);

    };

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {

        const snapshot = await getDocs(
            collection(db, "hotel_categories")
        );

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        setCategories(data);

    };

    const saveCategory = async () => {

        if (!name.trim()) {
            showToast("Category name required", "error");
            return;
        }

        try {

            if (editingId) {

                await updateDoc(
                    doc(db, "hotel_categories", editingId),
                    {
                        name,
                        description,
                    }
                );

                showToast("Category updated.");

            } else {

                await addDoc(
                    collection(db, "hotel_categories"),
                    {
                        name,
                        description,
                        status: "Active",
                        createdAt: serverTimestamp(),
                    }
                );

                showToast("Category added.");

            }

            setName("");
            setDescription("");
            setEditingId(null);

            loadCategories();

        } catch {

            showToast("Something went wrong", "error");

        }

    };

    const editCategory = (category) => {

        setEditingId(category.id);
        setName(category.name);
        setDescription(category.description);

    };

    const removeCategory = async (id) => {

        if (!confirm("Delete category?"))
            return;

        await deleteDoc(
            doc(db, "hotel_categories", id)
        );

        showToast("Category deleted");

        loadCategories();

    };

    const filtered = categories.filter(item =>
        item.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <div className="category-page content-wrapper">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <h1>Hotel Categories</h1>

            </div>

            <div className="category-card">

                <div className="form-grid">

                    <input
                        type="text"
                        placeholder="Category Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                    <button
                        onClick={saveCategory}
                        className="save-btn"
                    >
                        {editingId ? (
                            <>
                                <FaSave />
                                Update
                            </>
                        ) : (
                            <>
                                <FaPlus />
                                Add Category
                            </>
                        )}
                    </button>

                    {editingId && (

                        <button
                            className="cancel-btn"
                            onClick={() => {

                                setEditingId(null);
                                setName("");
                                setDescription("");

                            }}
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
                        placeholder="Search category..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.length === 0 ? (

                            <tr>

                                <td colSpan="4">

                                    No categories found.

                                </td>

                            </tr>

                        ) : (

                            filtered.map(category => (

                                <tr key={category.id}>

                                    <td>
                                        {category.name}
                                    </td>

                                    <td>
                                        {category.description}
                                    </td>

                                    <td>

                                        <span className="active">

                                            {category.status}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="actions">

                                            <button
                                                className="edit"
                                                onClick={() =>
                                                    editCategory(category)
                                                }
                                            >

                                                <FaEdit />

                                            </button>

                                            <button
                                                className="delete"
                                                onClick={() =>
                                                    removeCategory(category.id)
                                                }
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