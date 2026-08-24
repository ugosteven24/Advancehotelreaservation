"use client";

import "./promotions.css";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaEye,
    FaTicketAlt,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function PromotionsPage() {

    const [coupons, setCoupons] = useState([]);

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

        loadCoupons();

    }, []);

    const loadCoupons = async () => {

        try {

            const snapshot = await getDocs(

                collection(db, "coupons")

            );

            const data = snapshot.docs.map(doc => ({

                id: doc.id,

                ...doc.data(),

            }));

            setCoupons(data);

        }

        catch (error) {

            console.log(error);

            showToast(

                "Unable to load coupons.",

                "error"

            );

        }

    };

    const toggleStatus = async (coupon) => {

        try {

            await updateDoc(

                doc(db, "coupons", coupon.id),

                {

                    status:

                        coupon.status === "Active"

                            ? "Inactive"

                            : "Active",

                }

            );

            showToast("Status updated.");

            loadCoupons();

        }

        catch {

            showToast(

                "Unable to update status.",

                "error"

            );

        }

    };

    const deleteCoupon = async (id) => {

        if (!confirm("Delete this coupon?"))

            return;

        try {

            await deleteDoc(

                doc(db, "coupons", id)

            );

            showToast("Coupon deleted.");

            loadCoupons();

        }

        catch {

            showToast(

                "Unable to delete coupon.",

                "error"

            );

        }

    };

    const filtered = coupons.filter(item =>

        item.code

            ?.toLowerCase()

            .includes(search.toLowerCase()) ||

        item.title

            ?.toLowerCase()

            .includes(search.toLowerCase())

    );

    return (

        <div className="promotion-page content-wrapper">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        Coupons & Promotions

                    </h1>

                    <p>

                        Manage promotional offers and discount coupons.

                    </p>

                </div>

                <Link

                    href="/superadmin/promotions/add"

                    className="add-btn"

                >

                    <FaPlus />

                    Add Coupon

                </Link>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search coupon..."

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

                            <th>Coupon</th>

                            <th>Code</th>

                            <th>Discount</th>

                            <th>Usage</th>

                            <th>Expiry</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.length === 0 ?

                                <tr>

                                    <td colSpan="7">

                                        No coupons available.

                                    </td>

                                </tr>

                                :

                                filtered.map(coupon => (
                                    <tr key={coupon.id}>

                                        <td>

                                            <div className="coupon-info">

                                                <div className="coupon-icon">

                                                    <FaTicketAlt />

                                                </div>

                                                <div>

                                                    <strong>

                                                        {coupon.title}

                                                    </strong>

                                                    <small>

                                                        {coupon.description}

                                                    </small>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            <span className="coupon-code">

                                                {coupon.code}

                                            </span>

                                        </td>

                                        <td>

                                            {

                                                coupon.discountType === "Percentage"

                                                    ? `${coupon.discountValue}%`

                                                    : `₦${Number(
                                                        coupon.discountValue || 0
                                                    ).toLocaleString()}`

                                            }

                                        </td>

                                        <td>

                                            {coupon.usedCount || 0}

                                            {" / "}

                                            {coupon.maxUsage || "Unlimited"}

                                        </td>

                                        <td>

                                            {

                                                coupon.expiryDate
                                                    ? new Date(
                                                        coupon.expiryDate
                                                    ).toLocaleDateString()

                                                    : "-"

                                            }

                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    coupon.status
                                                        ?.toLowerCase()
                                                }
                                            >

                                                {coupon.status}

                                            </span>

                                        </td>

                                        <td>

                                            <div className="actions">

                                                <Link
                                                    href={`/superadmin/promotions/${coupon.id}`}
                                                    className="view"
                                                >

                                                    <FaEye />

                                                </Link>

                                                <Link
                                                    href={`/superadmin/promotions/${coupon.id}/edit`}
                                                    className="edit"
                                                >

                                                    <FaEdit />

                                                </Link>

                                                <button
                                                    className={
                                                        coupon.status === "Active"

                                                            ? "deactivate"

                                                            : "activate"
                                                    }
                                                    onClick={() =>
                                                        toggleStatus(coupon)
                                                    }
                                                >

                                                    {

                                                        coupon.status === "Active"

                                                            ?

                                                            <FaTimesCircle />

                                                            :

                                                            <FaCheckCircle />

                                                    }

                                                </button>

                                                <button
                                                    className="delete"
                                                    onClick={() =>
                                                        deleteCoupon(coupon.id)
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