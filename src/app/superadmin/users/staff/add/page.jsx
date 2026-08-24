"use client";

import "./add-staff.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    createUserWithEmailAndPassword,
} from "firebase/auth";

import {
    doc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import Toast from "@/components/Toast";

export default function AddStaff() {

    const router = useRouter();

    const [image, setImage] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("staff");
    const [status, setStatus] = useState("Active");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            showToast("Passwords do not match.", "error");
            return;
        }

        setLoading(true);

        try {

            let profileImage = "";

            if (image) {

                const formData = new FormData();

                formData.append("file", image);
                formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data = await response.json();

                profileImage = data.secure_url;

            }

            const credential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            await setDoc(
                doc(db, "users", credential.user.uid),
                {
                    fullName,
                    email,
                    phone,
                    department,
                    role,
                    status,
                    profileImage,
                    createdAt: serverTimestamp(),
                }
            );

            showToast("Staff added successfully.");

            setTimeout(() => {
                router.push("/superadmin/users/staff");
            }, 1500);

        } catch (error) {

            showToast(error.message, "error");

        }

        setLoading(false);

    };

    return (

        <div className="add-staff-page content-wrapper">

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
            />

            <div className="form-card">

                <h1>Add Staff</h1>

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Profile Image</label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setImage(e.target.files[0])
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) =>
                                    setFullName(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) =>
                                    setPhone(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Department</label>

                            <select
                                value={department}
                                onChange={(e) =>
                                    setDepartment(e.target.value)
                                }
                            >
                                <option value="">Select</option>
                                <option>Customer Support</option>
                                <option>Finance</option>
                                <option>Marketing</option>
                                <option>Operations</option>
                                <option>Technical Support</option>
                                <option>Security</option>
                            </select>

                        </div>

                        <div className="form-group">
                            <label>Role</label>

                            <select
                                value={role}
                                onChange={(e) =>
                                    setRole(e.target.value)
                                }
                            >
                                <option value="staff">
                                    Staff
                                </option>

                                <option value="admin">
                                    Admin
                                </option>

                            </select>

                        </div>

                        <div className="form-group">
                            <label>Password</label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="form-group">
                            <label>Status</label>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >
                                <option>Active</option>
                                <option>Blocked</option>
                            </select>

                        </div>

                    </div>

                    <button
                        className="save-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : "Add Staff"}
                    </button>

                </form>

            </div>

        </div>

    );

}