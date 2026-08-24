"use client";

import "./admin-roles.css";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaUserShield,
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaUsersCog,
    FaUserCheck,
    FaLock,
    FaEye,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function AdminRolesPage() {

    const [roles, setRoles] = useState([]);

    const [loading, setLoading] = useState(true);

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

                collection(

                    db,

                    "adminRoles"

                )

            );

            const data = snapshot.docs.map(doc => ({

                id: doc.id,

                ...doc.data(),

            }));

            setRoles(data);

        }

        catch (err) {

            console.log(err);

            showToast(

                "Unable to load roles.",

                "error"

            );

        }

        finally {

            setLoading(false);

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

                doc(

                    db,

                    "adminRoles",

                    id

                )

            );

            setRoles(

                roles.filter(

                    role => role.id !== id

                )

            );

            showToast(

                "Role deleted."

            );

        }

        catch {

            showToast(

                "Unable to delete role.",

                "error"

            );

        }

    };

    const filteredRoles = roles.filter(role =>

        role.name

            ?.toLowerCase()

            .includes(

                search.toLowerCase()

            )

    );

    return (

        <div className="content-wrapper roles-page">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            {/* Header */}

            <div className="page-header">

                <div>

                    <h1>

                        Administrator Roles

                    </h1>

                    <p>

                        Create and manage administrator permissions and access levels.

                    </p>

                </div>

                <Link

                    href="/superadmin/admin-management/roles/add"

                    className="add-btn"

                >

                    <FaPlus />

                    Add Role

                </Link>

            </div>

            {/* Statistics */}

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="icon blue">

                        <FaUsersCog />

                    </div>

                    <div>

                        <h4>

                            Total Roles

                        </h4>

                        <h2>

                            {roles.length}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon green">

                        <FaUserCheck />

                    </div>

                    <div>

                        <h4>

                            Active Roles

                        </h4>

                        <h2>

                            {

                                roles.filter(

                                    r => r.status === "Active"

                                ).length

                            }

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon orange">

                        <FaUserShield />

                    </div>

                    <div>

                        <h4>

                            Super Roles

                        </h4>

                        <h2>

                            {

                                roles.filter(

                                    r => r.level === "Super"

                                ).length

                            }

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon red">

                        <FaLock />

                    </div>

                    <div>

                        <h4>

                            Restricted

                        </h4>

                        <h2>

                            {

                                roles.filter(

                                    r => r.level === "Restricted"

                                ).length

                            }

                        </h2>

                    </div>

                </div>

            </div>

            {/* Toolbar */}

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search role..."

                        value={search}

                        onChange={(e) =>

                            setSearch(

                                e.target.value

                            )

                        }

                    />

                </div>

            </div>

            {/* Table */}

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Role</th>

                            <th>Access Level</th>

                            <th>Permissions</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            loading ?

                                <tr>

                                    <td colSpan="5">

                                        Loading...

                                    </td>

                                </tr>

                            :

                            filteredRoles.length === 0 ?

                                <tr>

                                    <td colSpan="5">

                                        No roles found.

                                    </td>

                                </tr>

                            :

                            filteredRoles.map(role => (

                                <tr key={role.id}>

                                    <td>

                                        <div className="role-info">

                                            <strong>

                                                {role.name}

                                            </strong>

                                            <small>

                                                {

                                                    role.description ||

                                                    "Administrator Role"

                                                }

                                            </small>

                                        </div>

                                    </td>

                                    <td>

                                        {role.level}

                                    </td>

                                    <td>

                                        {

                                            role.permissions?.length || 0

                                        } Permissions

                                    </td>

                                    <td>

                                        <span

                                            className={`status ${role.status?.toLowerCase()}`}

                                        >

                                            {role.status}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="table-actions">

                                            <Link

                                                href={`/superadmin/adminmanagement/roles/view/${role.id}`}

                                                className="view-btn"

                                            >

                                                <FaEye />

                                            </Link>

                                            <Link

                                                href={`/superadmin/adminmanagement/roles/edit/${role.id}`}

                                                className="edit-btn"

                                            >

                                                <FaEdit />

                                            </Link>

                                            <button

                                                className="delete-btn"

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

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}