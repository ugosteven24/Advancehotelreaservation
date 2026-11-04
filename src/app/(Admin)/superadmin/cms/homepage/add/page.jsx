"use client";

import "./add-homepage.css";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaArrowLeft,
    FaSave,
    FaEye,
    FaHome,
} from "react-icons/fa";
import Swal from "sweetalert2";

const BUTTON_COLOR = "#2563eb";


export default function AddHomepageSection() {

    const router = useRouter();

    const [loading,setLoading] = useState(false);


    const [form,setForm] = useState({

        title:"",
        description:"",
        type:"Hero",
        content:"",
        image:"",
        buttonText:"",
        buttonLink:"",
        order:1,
        status:"Published",

    });


    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:

            e.target.name==="order"

            ?

            Number(e.target.value)

            :

            e.target.value,

        });

    };

    const saveSection=async()=>{

        if(

            !form.title ||

            !form.content

        ){

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Please complete all required fields.",
              confirmButtonColor: BUTTON_COLOR,
            });

            return;

        }

        try{

            setLoading(true);

            await addDoc(

                collection(

                    db,

                    "homepageCMS"

                ),

                {

                    ...form,

                    createdAt:serverTimestamp(),

                    updatedAt:serverTimestamp(),

                }

            );

            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Homepage section created.",
              confirmButtonColor: BUTTON_COLOR,
            });

            setTimeout(()=>{

                router.push(

                    "/superadmin/cms/homepage"

                );

            },1500);

        }

        catch(err){

            console.log(err);

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to save section.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <div className="add-homepage-page content-wrapper">


            <div className="page-header">

                <div>

                    <h1>

                        Add Homepage Section

                    </h1>

                    <p>

                        Create a new homepage block for your website.

                    </p>

                </div>

                <Link

                    href="/superadmin/cms/homepage"

                    className="back-btn"

                >

                    <FaArrowLeft/>

                    Back

                </Link>

            </div>

            <div className="homepage-form">

                <div className="form-grid">

                    <div className="form-group full">

                        <label>

                            Section Title

                        </label>

                        <input

                            type="text"

                            name="title"

                            value={form.title}

                            onChange={handleChange}

                            placeholder="Luxury Hotels"

                        />

                    </div>

                    <div className="form-group full">

                        <label>

                            Description

                        </label>

                        <input

                            type="text"

                            name="description"

                            value={form.description}

                            onChange={handleChange}

                            placeholder="Short description..."

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Section Type

                        </label>

                        <select

                            name="type"

                            value={form.type}

                            onChange={handleChange}

                        >

                            <option>Hero</option>

                            <option>Featured</option>

                            <option>Banner</option>

                            <option>Testimonials</option>

                            <option>Popular Hotels</option>

                            <option>Newsletter</option>

                            <option>Why Choose Us</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Display Order

                        </label>

                        <input

                            type="number"

                            name="order"

                            value={form.order}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="form-group full">

                        <label>

                            Content

                        </label>

                        <textarea

                            rows="8"

                            name="content"

                            value={form.content}

                            onChange={handleChange}

                            placeholder="Write the homepage content..."

                        />

                    </div>

                    <div className="form-group full">

                        <label>

                            Banner Image URL

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

                            Button Text

                        </label>

                        <input

                            type="text"

                            name="buttonText"

                            value={form.buttonText}

                            onChange={handleChange}

                            placeholder="Book Now"

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Button Link

                        </label>

                        <input

                            type="text"

                            name="buttonLink"

                            value={form.buttonLink}

                            onChange={handleChange}

                            placeholder="/hotels"

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Status

                        </label>

                        <select

                            name="status"

                            value={form.status}

                            onChange={handleChange}

                        >

                            <option>Published</option>

                            <option>Draft</option>

                        </select>

                    </div>                    <div className="homepage-preview">

                        <h3>

                            Homepage Preview

                        </h3>

                        <div className="preview-card">

                            {

                                form.image ?

                                <img

                                    src={form.image}

                                    alt="Preview"

                                    className="preview-image"

                                />

                                :

                                <div className="image-placeholder">

                                    <FaHome/>

                                </div>

                            }

                            <div className="preview-content">

                                <h2>

                                    {

                                        form.title ||

                                        "Section Title"

                                    }

                                </h2>

                                <p>

                                    {

                                        form.content ||

                                        "Homepage content preview will appear here..."

                                    }

                                </p>

                                {

                                    form.buttonText &&

                                    <button

                                        className="preview-btn"

                                    >

                                        {

                                            form.buttonText

                                        }

                                    </button>

                                }

                            </div>

                        </div>

                    </div>

                    <div className="section-summary">

                        <h3>

                            Section Summary

                        </h3>

                        <div className="summary-grid">

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

                                    Display Order

                                </h4>

                                <p>

                                    {form.order}

                                </p>

                            </div>

                            <div className="summary-card">

                                <h4>

                                    Status

                                </h4>

                                <p>

                                    {form.status}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="form-actions">

                    <button

                        type="button"

                        className="preview-button"

                    >

                        <FaEye/>

                        Preview

                    </button>

                    <button

                        type="button"

                        className="save-button"

                        disabled={loading}

                        onClick={saveSection}

                    >

                        <FaSave/>

                        {

                            loading

                            ?

                            "Saving..."

                            :

                            "Save Section"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}