"use client";

import "./roles.css";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaUsersCog,
} from "react-icons/fa";
import Toast from "@/components/Toast";

export default function RolesPage() {

    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState("");

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

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {

        try {

            const snapshot = await getDocs(
                collection(db, "roles")
            );

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setRoles(data);

        } catch (error) {

            console.log(error);

            showToast(
                "Unable to load roles.",
                "error"
            );

        }

    };

    const deleteRole = async (id) => {

        if (
            !confirm(
                "Delete this role?"
            )
        ) return;

        try {

            await deleteDoc(
                doc(db, "roles", id)
            );

            showToast(
                "Role deleted successfully."
            );

            loadRoles();

        } catch (error) {

            console.log(error);

            showToast(
                "Failed to delete role.",
                "error"
            );

        }

    };

    const filtered = roles.filter(role =>

        role.roleName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        role.description
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="content-wrapper roles-page">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>
                        Roles & Permissions
                    </h1>

                    <p>
                        Manage staff roles and system permissions.
                    </p>

                </div>

                <Link
                    href="/superadmin/users/roles-permissions/add"
                    className="add-btn"
                >

                    <FaPlus />

                    Add Role

                </Link>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search role..."
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

                            <th>Role</th>

                            <th>Description</th>

                            <th>Permissions</th>

                            <th>Created</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.length === 0 ? (

                            <tr>

                                <td colSpan="5">

                                    No roles found.

                                </td>

                            </tr>

                        ) : (

                            filtered.map(role => (

                                <tr key={role.id}>

                                    <td>

                                        <div className="role-name">

                                            <FaUsersCog />

                                            <span>

                                                {role.roleName}

                                            </span>

                                        </div>

                                    </td>

                                    <td>

                                        {role.description}

                                    </td>

                                    <td>

                                        {

                                            role.permissions

                                                ? Object.keys(
                                                    role.permissions
                                                ).filter(
                                                    key =>
                                                        role.permissions[key]
                                                ).length

                                                : 0

                                        }

                                        {" "}Permissions

                                    </td>

                                    <td>

                                        {

                                            role.createdAt

                                                ?.toDate()

                                                .toLocaleDateString()

                                        }

                                    </td>

                                    <td>

                                        <div className="actions">

                                            <Link
                                                href={`/superadmin/users/roles/edit/${role.id}`}
                                                className="edit"
                                            >

                                                <FaEdit />

                                            </Link>

                                            <button
                                                className="delete"
                                                onClick={() =>
                                                    deleteRole(role.id)
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