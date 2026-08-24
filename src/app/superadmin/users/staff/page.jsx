"use client";

import "./staff.css";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaSearch,
    FaEye,
    FaTrash,
    FaBan,
    FaCheckCircle,
    FaUserPlus,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function StaffPage() {

    const [staff, setStaff] = useState([]);
    const [search, setSearch] = useState("");

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
        loadStaff();
    }, []);

    const loadStaff = async () => {

        try {

            const q = query(
                collection(db, "users"),
                where("role", "==", "staff")
            );

            const snapshot = await getDocs(q);

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setStaff(data);

        } catch (error) {

            console.log(error);

            showToast("Unable to load staff.", "error");

        }

    };

    const toggleStatus = async (item) => {

        const status =
            item.status === "Active"
                ? "Blocked"
                : "Active";

        await updateDoc(
            doc(db, "users", item.id),
            {
                status,
            }
        );

        showToast(`Staff ${status}`);

        loadStaff();

    };

    const removeStaff = async (id) => {

        if (!confirm("Delete this staff member?"))
            return;

        await deleteDoc(doc(db, "users", id));

        showToast("Staff deleted");

        loadStaff();

    };

    const filtered = staff.filter(item =>
        item.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase()) ||
        item.department?.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="staff-page content-wrapper">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>Staff Management</h1>

                    <p>
                        Manage platform staff members.
                    </p>

                </div>

                <Link
                    href="/superadmin/users/staff/add"
                    className="add-btn"
                >

                    <FaUserPlus />

                    Add Staff

                </Link>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search staff..."
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

                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.length === 0 ? (

                            <tr>

                                <td colSpan="7">

                                    No staff found.

                                </td>

                            </tr>

                        ) : (

                            filtered.map(item => (

                                <tr key={item.id}>

                                    <td>

                                        <img
                                            src={
                                                item.profileImage ||
                                                "/images/avatar.png"
                                            }
                                            alt=""
                                            className="avatar"
                                        />

                                    </td>

                                    <td>{item.fullName}</td>

                                    <td>{item.email}</td>

                                    <td>{item.phone}</td>

                                    <td>{item.department}</td>

                                    <td>

                                        <span
                                            className={
                                                item.status === "Active"
                                                    ? "active"
                                                    : "blocked"
                                            }
                                        >

                                            {item.status}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="actions">

                                            <Link
                                                href={`/superadmin/users/staff/${item.id}`}
                                                className="view"
                                            >

                                                <FaEye />

                                            </Link>

                                            <button
                                                className="status"
                                                onClick={() =>
                                                    toggleStatus(item)
                                                }
                                            >

                                                {item.status === "Active"
                                                    ? <FaBan />
                                                    : <FaCheckCircle />
                                                }

                                            </button>

                                            <button
                                                className="delete"
                                                onClick={() =>
                                                    removeStaff(item.id)
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