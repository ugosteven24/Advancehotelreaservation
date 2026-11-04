"use client";

import "./permissions.css";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    collection,
    getDocs,
    updateDoc,
    doc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaShieldAlt,
    FaSearch,
    FaSave,
    FaUserShield,
    FaArrowLeft,
    FaCheckCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";

const BUTTON_COLOR = "#2563eb";


export default function PermissionsPage() {

    const [roles, setRoles] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [search, setSearch] = useState("");


    const permissions = [

        "Dashboard",
        "Hotels",
        "Bookings",
        "Customers",
        "Reviews",
        "Amenities",
        "Payments",
        "Transactions",
        "Reports",
        "Analytics",
        "CMS",
        "Email Settings",
        "SMS Settings",
        "Currency Settings",
        "General Settings",
        "Notifications",
        "Coupons",
        "Promotions",
        "Support Tickets",
        "Newsletter",
        "Testimonials",
        "Security",
        "Login Logs",
        "Activity Logs",
        "Blocked Users",
        "Backup & Restore",
        "Administrator Management",
        "Admin Roles",
        "API Settings",
        "Maintenance Mode",

    ];


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

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to load permissions.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

        finally {

            setLoading(false);

        }

    };

    const togglePermission = (

        roleId,

        permission

    ) => {

        setRoles(

            roles.map(role => {

                if (

                    role.id !== roleId

                ) return role;

                const exists =

                    role.permissions?.includes(permission);

                return {

                    ...role,

                    permissions: exists

                        ?

                        role.permissions.filter(

                            p => p !== permission

                        )

                        :

                        [

                            ...(role.permissions || []),

                            permission,

                        ],

                };

            })

        );

    };

    const saveRole = async (role) => {

        try {

            setSaving(true);

            await updateDoc(

                doc(

                    db,

                    "adminRoles",

                    role.id

                ),

                {

                    permissions:

                        role.permissions,

                }

            );

            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Permissions updated successfully.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

        catch {

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to update permissions.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

        finally {

            setSaving(false);

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

        <div className="content-wrapper permissions-page">


            {/* Header */}

            <div className="page-header">

                <div>

                    <h1>

                        Permissions Management

                    </h1>

                    <p>

                        Configure access permissions for every administrator role.

                    </p>

                </div>

                

            </div>

            {/* Statistics */}

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="icon blue">

                        <FaUserShield />

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

                        <FaShieldAlt />

                    </div>

                    <div>

                        <h4>

                            Permissions

                        </h4>

                        <h2>

                            {permissions.length}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon orange">

                        <FaCheckCircle />

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

            </div>

            {/* Search */}

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

                        {/* Roles & Permissions */}

            {

                loading ?

                (

                    <div className="loading-card">

                        Loading permissions...

                    </div>

                )

                :

                filteredRoles.length === 0 ?

                (

                    <div className="loading-card">

                        No administrator roles found.

                    </div>

                )

                :

                filteredRoles.map((role) => (

                    <div

                        className="permission-card"

                        key={role.id}

                    >

                        <div className="permission-header">

                            <div>

                                <h3>

                                    <FaUserShield />

                                    {role.name}

                                </h3>

                                <p>

                                    {role.description || "Administrator Role"}

                                </p>

                            </div>

                            <span

                                className={`status ${role.status?.toLowerCase()}`}

                            >

                                {role.status}

                            </span>

                        </div>

                        <div className="permission-grid">

                            {

                                permissions.map((permission) => (

                                    <label

                                        key={permission}

                                        className="permission-item"

                                    >

                                        <input

                                            type="checkbox"

                                            checked={

                                                role.permissions?.includes(permission)

                                            }

                                            onChange={() =>

                                                togglePermission(

                                                    role.id,

                                                    permission

                                                )

                                            }

                                        />

                                        <span>

                                            {permission}

                                        </span>

                                    </label>

                                ))

                            }

                        </div>

                        <div className="permission-actions">

                            <button

                                className="save-btn"

                                onClick={() =>

                                    saveRole(role)

                                }

                                disabled={saving}

                            >

                                <FaSave />

                                {

                                    saving

                                        ? "Saving..."

                                        : "Save Permissions"

                                }

                            </button>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}