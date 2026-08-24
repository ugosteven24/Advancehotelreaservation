"use client";

import "./homepage.css";

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
    FaHome,
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaEye,
    FaImages,
    FaImage,
    FaFont,
    FaGlobe,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function HomepageCMS() {

    const [sections, setSections] = useState([]);

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

        loadSections();

    }, []);

    const loadSections = async () => {

        try {

            const snapshot = await getDocs(

                collection(

                    db,

                    "homepageCMS"

                )

            );

            const data = snapshot.docs.map(doc => ({

                id: doc.id,

                ...doc.data(),

            }));

            setSections(data);

        }

        catch (err) {

            console.log(err);

            showToast(

                "Unable to load homepage content.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    const deleteSection = async (id) => {

        if (

            !confirm(

                "Delete this homepage section?"

            )

        ) return;

        try {

            await deleteDoc(

                doc(

                    db,

                    "homepageCMS",

                    id

                )

            );

            setSections(

                sections.filter(

                    item => item.id !== id

                )

            );

            showToast(

                "Section deleted."

            );

        }

        catch {

            showToast(

                "Unable to delete section.",

                "error"

            );

        }

    };

    const filtered = sections.filter(item =>

        item.title

            ?.toLowerCase()

            .includes(

                search.toLowerCase()

            )

    );

    return (

        <div className="homepage-cms-page content-wrapper">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Homepage CMS

                    </h1>

                    <p>

                        Manage homepage banners, sections and featured content.

                    </p>

                </div>

                <Link

                    href="/superadmin/cms/homepage/add"

                    className="add-btn"

                >

                    <FaPlus />

                    Add Section

                </Link>

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="icon blue">

                        <FaHome />

                    </div>

                    <div>

                        <h4>

                            Total Sections

                        </h4>

                        <h2>

                            {sections.length}

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon green">

                        <FaImages />

                    </div>

                    <div>

                        <h4>

                            Hero Banners

                        </h4>

                        <h2>

                            {

                                sections.filter(

                                    s => s.type === "Hero"

                                ).length

                            }

                        </h2>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="icon orange">

                        <FaImage />

                    </div>

                    <div>

                        <h4>

                            Featured Blocks

                        </h4>

                        <h2>

                            {

                                sections.filter(

                                    s => s.type === "Featured"

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

                                sections.filter(

                                    s => s.status === "Published"

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

                        placeholder="Search section..."

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

                            <th>Section</th>

                            <th>Type</th>

                            <th>Status</th>

                            <th>Last Updated</th>

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

                                            No homepage sections found.

                                        </td>

                                    </tr>

                                    :

                                    filtered.map(section => (
                                        <tr key={section.id}>

                                            <td>

                                                <div className="section-info">

                                                    <strong>

                                                        {section.title}

                                                    </strong>

                                                    <small>

                                                        {section.description || "Homepage Section"}

                                                    </small>

                                                </div>

                                            </td>

                                            <td>

                                                <span className="type-badge">

                                                    <FaFont />

                                                    {section.type}

                                                </span>

                                            </td>

                                            <td>

                                                <span
                                                    className={`status ${section.status?.toLowerCase()}`}
                                                >

                                                    {section.status}

                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    section.updatedAt?.toDate

                                                        ?

                                                        section.updatedAt

                                                            .toDate()

                                                            .toLocaleDateString()

                                                        :

                                                        "-"

                                                }

                                            </td>

                                            <td>

                                                <div className="table-actions">

                                                    <Link

                                                        href={`/superadmin/cms/homepage/edit/${section.id}`}

                                                        className="edit-btn"

                                                    >

                                                        <FaEdit />

                                                    </Link>

                                                    <Link

                                                        href={`/superadmin/cms/homepage/preview/${section.id}`}

                                                        className="view-btn"

                                                    >

                                                        <FaEye />

                                                    </Link>

                                                    <button

                                                        className="delete-btn"

                                                        onClick={() =>

                                                            deleteSection(

                                                                section.id

                                                            )

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