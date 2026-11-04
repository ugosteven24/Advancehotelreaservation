"use client";

import "./locations.css";

import { useEffect, useState } from "react";

import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaSave,
    FaTimes,
    FaMapMarkerAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";

const BUTTON_COLOR = "#2563eb";


export default function Locations() {

    const [locations, setLocations] = useState([]);

    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const [search, setSearch] = useState("");

    const [editingId, setEditingId] = useState(null);


    useEffect(() => {
        loadLocations();
    }, []);

    const loadLocations = async () => {

        const snapshot = await getDocs(
            collection(db, "locations")
        );

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        setLocations(data);

    };

    const saveLocation = async () => {

        if (!country || !state || !city) {

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Please complete all fields.",
              confirmButtonColor: BUTTON_COLOR,
            });

            return;
        }

        try {

            if (editingId) {

                await updateDoc(
                    doc(db, "locations", editingId),
                    {
                        country,
                        state,
                        city,
                    }
                );

                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Location updated.",
                  confirmButtonColor: BUTTON_COLOR,
                });

            } else {

                await addDoc(
                    collection(db, "locations"),
                    {
                        country,
                        state,
                        city,
                        status: "Active",
                        createdAt: serverTimestamp(),
                    }
                );

                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Location added.",
                  confirmButtonColor: BUTTON_COLOR,
                });

            }

            clearForm();

            loadLocations();

        } catch {

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Unable to save location.",
              confirmButtonColor: BUTTON_COLOR,
            });

        }

    };

    const editLocation = (location) => {

        setEditingId(location.id);

        setCountry(location.country);
        setState(location.state);
        setCity(location.city);

    };

    const deleteLocation = async (id) => {

        if (!confirm("Delete this location?"))
            return;

        await deleteDoc(doc(db, "locations", id));

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Location deleted.",
          confirmButtonColor: BUTTON_COLOR,
        });

        loadLocations();

    };

    const clearForm = () => {

        setEditingId(null);

        setCountry("");
        setState("");
        setCity("");

    };

    const filtered = locations.filter(item =>

        `${item.country} ${item.state} ${item.city}`
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="location-page content-wrapper">


            <div className="page-header">

                <h1>
                    <FaMapMarkerAlt />
                    Hotel Locations
                </h1>

                <p>
                    Manage hotel locations.
                </p>

            </div>

            <div className="location-card">

                <div className="form-grid">

                    <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) =>
                            setCountry(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(e) =>
                            setState(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) =>
                            setCity(e.target.value)
                        }
                    />

                    <button
                        className="save-btn"
                        onClick={saveLocation}
                    >

                        {editingId ? (
                            <>
                                <FaSave />
                                Update
                            </>
                        ) : (
                            <>
                                <FaPlus />
                                Add
                            </>
                        )}

                    </button>

                    {editingId && (

                        <button
                            className="cancel-btn"
                            onClick={clearForm}
                        >
                            <FaTimes />
                            Cancel
                        </button>

                    )}

                </div>

            </div>

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search..."
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

                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.length === 0 ? (

                            <tr>

                                <td colSpan="5">
                                    No locations found.
                                </td>

                            </tr>

                        ) : (

                            filtered.map(location => (

                                <tr key={location.id}>

                                    <td>
                                        {location.country}
                                    </td>

                                    <td>
                                        {location.state}
                                    </td>

                                    <td>
                                        {location.city}
                                    </td>

                                    <td>

                                        <span className="active">

                                            {location.status}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="actions">

                                            <button
                                                className="edit"
                                                onClick={() =>
                                                    editLocation(location)
                                                }
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                className="delete"
                                                onClick={() =>
                                                    deleteLocation(location.id)
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