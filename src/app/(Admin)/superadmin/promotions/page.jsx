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
import Swal from "sweetalert2";

const BUTTON_COLOR = "#2563eb";


export default function PromotionsPage() {

    const [coupons, setCoupons] = useState([]);

    const [search, setSearch] = useState("");


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

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to load coupons.",
              confirmButtonColor: BUTTON_COLOR,
            });

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

            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Status updated.",
              confirmButtonColor: BUTTON_COLOR,
            });

            loadCoupons();

        }

        catch {

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to update status.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

    };

    const deleteCoupon = async (id) => {

        if (!confirm("Delete this coupon?"))

            return;

        try {

            await deleteDoc(

                doc(db, "coupons", id)

            );

            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Coupon deleted.",
              confirmButtonColor: BUTTON_COLOR,
            });

            loadCoupons();

        }

        catch {

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to delete coupon.",
              confirmButtonColor: BUTTON_COLOR,
            });

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