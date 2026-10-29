"use client";

import { useEffect, useState, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
    doc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";

import { checkUserLocation } from "@/lib/checkUserLocation";
import { auth, db } from "@/firebase/firebase";
import "./location.css";

export default function LocationPage() {
    const [status, setStatus] = useState("checking");
    const [location, setLocation] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [message, setMessage] = useState("");

    // Wait for Firebase to resolve the authentication state.
    const getCurrentUser = useCallback(() => {
        return new Promise((resolve, reject) => {
            let unsubscribe = () => {};

            unsubscribe = onAuthStateChanged(
                auth,
                (user) => {
                    unsubscribe();
                    resolve(user);
                },
                (error) => {
                    unsubscribe();
                    reject(error);
                }
            );
        });
    }, []);

    // Save the location only when a user is signed in.
    const saveLocationIfSignedIn = useCallback(
        async (userLocation) => {
            try {
                const user = await getCurrentUser();

                if (!user) {
                    console.log(
                        "User is signed out. Location was not saved."
                    );
                    return "signed-out";
                }

                const userRef = doc(db, "users", user.uid);

                await setDoc(
                    userRef,
                    {
                        
                            city: userLocation.city ?? null,
                            state: userLocation.state ?? null,
                            country: userLocation.country ?? null,
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                            updatedAt: serverTimestamp(),
                        
                    },
                    { merge: true }
                );

                console.log(
                    "Location saved successfully for:",
                    user.uid
                );

                return "saved";
            } catch (error) {
                console.error(
                    "Failed to save location:",
                    error.code,
                    error.message
                );

                return "error";
            }
        },
        [getCurrentUser]
    );

    // Convert coordinates into city, state and country.
    const getAddress = useCallback(async (latitude, longitude) => {
        try {
            const response = await fetch(
                `/api/reverse-geocode?lat=${latitude}&lon=${longitude}`
            );

            if (!response.ok) {
                throw new Error("Failed to retrieve address details.");
            }

            const address = await response.json();

            return {
                city: address.city ?? null,
                state: address.state ?? null,
                country: address.country ?? null,
            };
        } catch (error) {
            console.error("Reverse geocoding failed:", error);

            return {
                city: null,
                state: null,
                country: null,
            };
        }
    }, []);

    // Get coordinates and address, then save if signed in.
    const processCoordinates = useCallback(
        async (latitude, longitude) => {
            const address = await getAddress(latitude, longitude);

            const userLocation = {
                latitude,
                longitude,
                ...address,
            };

            setLocation(userLocation);

            const result = await saveLocationIfSignedIn(userLocation);

            if (result === "error") {
                setMessage(
                    "Your location was detected, but it could not be saved. Please try again."
                );
            } else {
                setMessage("");
            }

            setStatus("on");
            setShowDialog(false);
        },
        [getAddress, saveLocationIfSignedIn]
    );

    // Check existing location permission when the page loads.
    useEffect(() => {
        let cancelled = false;

        async function checkLocation() {
            try {
                const result = await checkUserLocation();

                if (cancelled) return;

                if (
                    result.status === "on" &&
                    result.location?.latitude != null &&
                    result.location?.longitude != null
                ) {
                    const { latitude, longitude } = result.location;

                    await processCoordinates(latitude, longitude);
                } else {
                    setStatus(result.status);
                    setLocation(result.location ?? null);
                    setShowDialog(true);
                }
            } catch (error) {
                console.error("Location check failed:", error);

                if (!cancelled) {
                    setStatus("unavailable");
                    setMessage(
                        "Unable to check your location. Please try again."
                    );
                    setShowDialog(true);
                }
            }
        }

        checkLocation();

        return () => {
            cancelled = true;
        };
    }, [processCoordinates]);

    // Request the user's location after they click Allow Location.
    function requestLocation() {
        setMessage("");

        if (!navigator.geolocation) {
            setStatus("unsupported");
            setMessage(
                "Your browser does not support location access."
            );
            setShowDialog(true);
            return;
        }

        setStatus("checking");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    await processCoordinates(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                } catch (error) {
                    console.error("Location processing failed:", error);

                    setStatus("unavailable");
                    setMessage(
                        "Your location was detected, but processing failed. Please try again."
                    );
                    setShowDialog(true);
                }
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    setStatus("denied");
                    setMessage(
                        "Location permission was denied. Enable it in your browser settings and try again."
                    );
                } else if (error.code === error.TIMEOUT) {
                    setStatus("timeout");
                    setMessage(
                        "The location request timed out. Please try again."
                    );
                } else {
                    setStatus("unavailable");
                    setMessage(
                        "Your location is unavailable. Check your device location services."
                    );
                }

                setShowDialog(true);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0,
            }
        );
    }

    return (
        <main className="location-page">
            {status === "checking" && (
                <p>Checking your location...</p>
            )}

            {status === "on" && location && (
                <div className="location-success">
                    <p>Location is available.</p>
                    {/* <p>City: {location.city || "Not found"}</p>
                    <p>State: {location.state || "Not found"}</p>
                    <p>Country: {location.country || "Not found"}</p>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p> */}
                </div>
            )}

            {message && !showDialog && (
                <p className="location-error" role="alert">
                    {message}
                </p>
            )}

            {showDialog && (
                <div className="location-overlay">
                    <section
                        className="location-dialog"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="location-title"
                    >
                        <div className="location-icon">📍</div>

                        <h2 id="location-title">
                            Enable Your Location
                        </h2>

                        <p>
                            We need access to your current location to
                            provide location-based services. Please allow
                            location access to continue.
                        </p>

                        {message && (
                            <p
                                className="location-error"
                                role="alert"
                            >
                                {message}
                            </p>
                        )}

                        {status === "denied" && (
                            <p className="location-hint">
                                Enable location permission in your
                                browser's site settings before trying again.
                            </p>
                        )}

                        <div className="location-actions">
                            <button
                                type="button"
                                className="location-cancel-button"
                                onClick={() => setShowDialog(false)}
                                disabled={status === "checking"}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="location-allow-button"
                                onClick={requestLocation}
                                disabled={status === "checking"}
                            >
                                {status === "checking"
                                    ? "Getting location..."
                                    : "Allow Location"}
                            </button>
                        </div>

                        {status === "unsupported" && (
                            <p className="location-hint">
                                Please use a browser that supports
                                geolocation.
                            </p>
                        )}
                    </section>
                </div>
            )}
        </main>
    );
}