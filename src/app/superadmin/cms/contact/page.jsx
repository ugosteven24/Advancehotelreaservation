"use client";

import "./contact.css";

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
    FaPhone,
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaEye,
    FaEnvelope,
    FaMapMarkerAlt,
    FaGlobe,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function ContactCMS() {

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
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
                type: "success",
            });

        }, 3000);

    };

    useEffect(() => {

        loadContacts();

    }, []);

    const loadContacts = async () => {

        try {

            const snapshot = await getDocs(
                collection(db, "contactCMS")
            );

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setContacts(data);

        }

        catch (err) {

            console.log(err);

            showToast(
                "Unable to load contact content.",
                "error"
            );

        }

        finally {

            setLoading(false);

        }

    };

    const deleteContact = async (id) => {

        if (
            !confirm(
                "Delete this contact section?"
            )
        ) return;

        try {

            await deleteDoc(
                doc(
                    db,
                    "contactCMS",
                    id
                )
            );

            setContacts(
                contacts.filter(
                    item => item.id !== id
                )
            );

            showToast(
                "Contact section deleted."
            );

        }

        catch {

            showToast(
                "Unable to delete contact section.",
                "error"
            );

        }

    };

    const filtered = contacts.filter(item =>
        item.title
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <div className="content-wrapper contact-cms-page">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="page-header">

                <div>

                    <h1>
                        Contact CMS
                    </h1>

                    <p>
                        Manage your contact page information.
                    </p>

                </div>

                <Link
                    href="/superadmin/cms/contact/add"
                    className="add-btn"
                >

                    <FaPlus />

                    Add Contact

                </Link>

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="icon blue">

                        <FaPhone />

                    </div>

                    <div>

                        <h4>
                            Total Entries
                        </h4>

                        <h2>
                            {contacts.length}
                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon green">

                        <FaEnvelope />

                    </div>

                    <div>

                        <h4>
                            Email Sections
                        </h4>

                        <h2>
                            {
                                contacts.filter(
                                    c => c.type === "Email"
                                ).length
                            }
                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon orange">

                        <FaMapMarkerAlt />

                    </div>

                    <div>

                        <h4>
                            Addresses
                        </h4>

                        <h2>
                            {
                                contacts.filter(
                                    c => c.type === "Address"
                                ).length
                            }
                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon purple">

                        <FaGlobe />

                    </div>

                    <div>

                        <h4>
                            Published
                        </h4>

                        <h2>
                            {
                                contacts.filter(
                                    c => c.status === "Published"
                                ).length
                            }
                        </h2>

                    </div>

                </div>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search contact..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Title</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Updated</th>
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

                                filtered.length === 0 ?

                                    <tr>

                                        <td colSpan="5">
                                            No contact records found.
                                        </td>

                                    </tr>

                                    :

                                    filtered.map(contact => (

                                        <tr key={contact.id}>

                                            <td>

                                                <div className="section-info">

                                                    <strong>
                                                        {contact.title}
                                                    </strong>

                                                    <small>
                                                        {contact.value}
                                                    </small>

                                                </div>

                                            </td>

                                            <td>

                                                <span className="type-badge">
                                                    {contact.type}
                                                </span>

                                            </td>

                                            <td>

                                                <span
                                                    className={`status ${contact.status?.toLowerCase()}`}
                                                >
                                                    {contact.status}
                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    contact.updatedAt?.toDate

                                                        ?

                                                        contact.updatedAt
                                                            .toDate()
                                                            .toLocaleDateString()

                                                        :

                                                        "-"

                                                }

                                            </td>

                                            <td>

                                                <div className="table-actions">

                                                    <Link
                                                        href={`/superadmin/cms/contact/edit/${contact.id}`}
                                                        className="edit-btn"
                                                    >
                                                        <FaEdit />
                                                    </Link>

                                                    <Link
                                                        href={`/superadmin/cms/contact/preview/${contact.id}`}
                                                        className="view-btn"
                                                    >
                                                        <FaEye />
                                                    </Link>

                                                    <button
                                                        className="delete-btn"
                                                        onClick={() =>
                                                            deleteContact(contact.id)
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