"use client";

import "./new-notification.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaArrowLeft,
    FaBell,
    FaPaperPlane,
    FaSave,
} from "react-icons/fa";

import Toast from "@/components/Toast";

export default function NewPushNotificationPage() {

    const router = useRouter();

    const [loading,setLoading]=useState(false);

    const [toast,setToast]=useState({

        show:false,
        message:"",
        type:"success",

    });

    const showToast=(

        message,
        type="success"

    )=>{

        setToast({

            show:true,
            message,
            type,

        });

        setTimeout(()=>{

            setToast({

                show:false,
                message:"",
                type:"success",

            });

        },3000);

    };

    const [form,setForm]=useState({

        title:"",
        message:"",
        audience:"All Users",
        type:"General",
        priority:"Normal",
        actionUrl:"",
        image:"",
        status:"Draft",
        scheduledAt:"",

    });

    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value,

        });

    };

    const saveNotification=async(status)=>{

        if(

            !form.title ||

            !form.message

        ){

            showToast(

                "Please complete all required fields.",

                "error"

            );

            return;

        }

        try{

            setLoading(true);

            await addDoc(

                collection(

                    db,

                    "pushNotifications"

                ),

                {

                    ...form,

                    status,

                    recipients:0,

                    deliveryRate:0,

                    clickRate:0,

                    sentBy:"Super Admin",

                    createdAt:serverTimestamp(),

                }

            );

            showToast(

                status==="Sent"

                ?

                "Push notification sent."

                :

                "Draft saved."

            );

            setTimeout(()=>{

                router.push(

                    "/superadmin/notifications/pushnotifications"

                );

            },1200);

        }

        catch(err){

            console.log(err);

            showToast(

                "Unable to save notification.",

                "error"

            );

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <div className="new-push-page content-wrapper">

            <Toast

                show={toast.show}

                message={toast.message}

                type={toast.type}

            />

            <div className="page-header">

                <div>

                    <h1>

                        New Push Notification

                    </h1>

                    <p>

                        Send push notifications to Android, iOS and Web users.

                    </p>

                </div>

                <Link

                    href="/superadmin/notifications/pushnotifications"

                    className="back-btn"

                >

                    <FaArrowLeft/>

                    Back

                </Link>

            </div>

            <div className="notification-form">

                <div className="form-grid">

                    <div className="form-group full">

                        <label>

                            Notification Title

                        </label>

                        <input

                            type="text"

                            name="title"

                            value={form.title}

                            onChange={handleChange}

                            placeholder="Weekend Hotel Discounts"

                        />

                    </div>

                    <div className="form-group full">

                        <label>

                            Message

                        </label>

                        <textarea

                            rows="6"

                            name="message"

                            value={form.message}

                            onChange={handleChange}

                            placeholder="Write notification message..."

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Audience

                        </label>

                        <select

                            name="audience"

                            value={form.audience}

                            onChange={handleChange}

                        >

                            <option>All Users</option>

                            <option>Guests</option>

                            <option>Hotel Owners</option>

                            <option>Staff</option>

                            <option>Admins</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Notification Type

                        </label>

                        <select

                            name="type"

                            value={form.type}

                            onChange={handleChange}

                        >

                            <option>General</option>

                            <option>Promotion</option>

                            <option>Booking</option>

                            <option>Payment</option>

                            <option>Security</option>

                            <option>System</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Priority

                        </label>

                        <select

                            name="priority"

                            value={form.priority}

                            onChange={handleChange}

                        >

                            <option>Low</option>

                            <option>Normal</option>

                            <option>High</option>

                            <option>Urgent</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Action URL

                        </label>

                        <input

                            type="text"

                            name="actionUrl"

                            value={form.actionUrl}

                            onChange={handleChange}

                            placeholder="/offers"

                        />

                    </div>

                    <div className="form-group full">

                        <label>

                            Notification Image (Optional)

                        </label>

                        <input

                            type="text"

                            name="image"

                            value={form.image}

                            onChange={handleChange}

                            placeholder="https://example.com/banner.jpg"

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Send Option

                        </label>

                        <select

                            name="status"

                            value={form.status}

                            onChange={handleChange}

                        >

                            <option>Draft</option>

                            <option>Sent</option>

                            <option>Scheduled</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Schedule Date (Optional)

                        </label>

                        <input

                            type="datetime-local"

                            name="scheduledAt"

                            value={form.scheduledAt}

                            onChange={handleChange}

                        />

                    </div>
                                        <div className="notification-preview">

                        <h3>

                            Mobile Notification Preview

                        </h3>

                        <div className="phone-preview">

                            <div className="phone-status">

                                9:41

                            </div>

                            <div className="notification-card">

                                <div className="notification-icon">

                                    <FaBell />

                                </div>

                                <div className="notification-content">

                                    <strong>

                                        {

                                            form.title ||

                                            "Notification Title"

                                        }

                                    </strong>

                                    <p>

                                        {

                                            form.message ||

                                            "Your push notification message will appear here..."

                                        }

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="audience-summary">

                        <h3>

                            Audience Summary

                        </h3>

                        <div className="summary-grid">

                            <div className="summary-card">

                                <h4>

                                    Audience

                                </h4>

                                <p>

                                    {form.audience}

                                </p>

                            </div>

                            <div className="summary-card">

                                <h4>

                                    Type

                                </h4>

                                <p>

                                    {form.type}

                                </p>

                            </div>

                            <div className="summary-card">

                                <h4>

                                    Priority

                                </h4>

                                <p>

                                    {form.priority}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="form-actions">

                    <button

                        type="button"

                        className="draft-btn"

                        disabled={loading}

                        onClick={()=>

                            saveNotification(

                                "Draft"

                            )

                        }

                    >

                        <FaSave />

                        {

                            loading

                            ?

                            "Saving..."

                            :

                            "Save Draft"

                        }

                    </button>

                    <button

                        type="button"

                        className="send-btn"

                        disabled={loading}

                        onClick={()=>

                            saveNotification(

                                "Sent"

                            )

                        }

                    >

                        <FaPaperPlane />

                        {

                            loading

                            ?

                            "Sending..."

                            :

                            "Send Notification"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}