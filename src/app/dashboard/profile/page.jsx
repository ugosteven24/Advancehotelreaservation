
"use client";

import { useEffect, useRef, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { auth, db } from "@/firebase/firebase";

import  {uploadImage}  from "@/lib/cloudinary";
import "./profile.css";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  language: "English (US)",
  currency: "NGN (₦)",
};

function formatMemberSince(value) {
  if (!value) return "N/A";

  const date =
    typeof value.toDate === "function"
      ? value.toDate()
      : new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function getDateInputValue(value) {
  if (!value) return "";

  if (typeof value.toDate === "function") {
    value = value.toDate();
  }

  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return value;
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function ProfilePage() {
  const fileInputRef = useRef(null);
  const previewUrlRef = useRef("");

  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [memberSince, setMemberSince] = useState("N/A");

  const [formData, setFormData] = useState(initialFormData);

  // Load the signed-in user's profile from Firestore.
  useEffect(() => {
    let cancelled = false;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (cancelled) return;

      setUser(currentUser);
      setError("");
      setSuccess("");

      if (!currentUser) {
        setFormData(initialFormData);
        setProfileImage("");
        setMemberSince("N/A");
        setLoading(false);
        setError("Please sign in to view your profile.");
        return;
      }

      setLoading(true);

      try {
        const profileRef = doc(db, "users", currentUser.uid);
        const snapshot = await getDoc(profileRef);
        const profile = snapshot.exists() ? snapshot.data() : {};

        const nameParts = (currentUser.displayName || "")
          .trim()
          .split(/\s+/)
          .filter(Boolean);

        const firstName =
          profile.firstName ?? nameParts[0] ?? "";

        const lastName =
          profile.lastName ?? nameParts.slice(1).join(" ");

        if (cancelled) return;

        setFormData({
          ...initialFormData,
          ...profile,
          firstName,
          lastName,
          email: currentUser.email ?? profile.email ?? "",
          dob: getDateInputValue(profile.dob),
        });

        setProfileImage(
          profile.profileImage || currentUser.photoURL || ""
        );

        setMemberSince(
          formatMemberSince(
            profile.createdAt ||
              (currentUser.metadata.creationTime
                ? new Date(currentUser.metadata.creationTime)
                : null)
          )
        );
      } catch (err) {
        console.error("Failed to load profile:", err);

        if (!cancelled) {
          setError("Unable to load your profile. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Preview the selected image before uploading it.
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("The profile image must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const previewUrl = URL.createObjectURL(file);
    previewUrlRef.current = previewUrl;

    setSelectedImage(file);
    setProfileImage(previewUrl);
    setError("");
    setSuccess("");
  };

  const toggleEdit = () => {
    setError("");
    setSuccess("");

    if (isEditing) {
      // Cancel editing and restore the saved profile.
      setIsEditing(false);
      setSelectedImage(null);

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = "";
      }

      if (user) {
        getDoc(doc(db, "users", user.uid))
          .then((snapshot) => {
            const profile = snapshot.exists()
              ? snapshot.data()
              : {};

            setProfileImage(
              profile.profileImage || user.photoURL || ""
            );

            setFormData((previous) => ({
              ...previous,
              ...profile,
              email: user.email ?? "",
              dob: getDateInputValue(profile.dob),
            }));
          })
          .catch((err) => {
            console.error("Failed to restore profile:", err);
            setError("Unable to restore your saved profile.");
          });
      }

      return;
    }

    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user) {
      setError("Please sign in before saving your profile.");
      return;
    }

    if (!formData.firstName.trim()) {
      setError("First name is required.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      let imageURL = profileImage;

      // Upload the selected image to Cloudinary.
      if (selectedImage) {
        imageURL = await uploadImage(selectedImage);
      }

      const profileData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        dob: formData.dob,
        street: formData.street.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        postalCode: formData.postalCode.trim(),
        country: formData.country.trim(),
        language: formData.language,
        currency: formData.currency,
        profileImage: imageURL || "",
        updatedAt: serverTimestamp(),
      };

      const displayName = [
        profileData.firstName,
        profileData.lastName,
      ]
        .filter(Boolean)
        .join(" ");

      // Save profile information in Firestore.
      await setDoc(
        doc(db, "users", user.uid),
        profileData,
        { merge: true }
      );

      // Update the Firebase Auth display name and photo.
      await updateProfile(user, {
        displayName,
        ...(imageURL ? { photoURL: imageURL } : {}),
      });

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = "";
      }

      setSelectedImage(null);
      setProfileImage(imageURL || "");
      setFormData((previous) => ({
        ...previous,
        ...profileData,
        email: user.email ?? "",
      }));

      setIsEditing(false);
      setSuccess("Your profile has been saved successfully.");
    } catch (err) {
      console.error("Failed to save profile:", err);
      setError(
        err?.message ||
          "Unable to save your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="profile-page">
        <p>Loading your profile...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="profile-page">
        <p role="alert">
          {error || "Please sign in to continue."}
        </p>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <header className="page-header">
        <div>
          <h1>Profile Settings</h1>
          <p>
            Manage your personal information and preferences.
          </p>
        </div>

        <button
          type="button"
          className="edit-button desktop-edit"
          onClick={isEditing ? handleSave : toggleEdit}
          disabled={saving}
        >
          <span className="material-symbols-outlined">
            {saving
              ? "hourglass_top"
              : isEditing
                ? "save"
                : "edit"}
          </span>

          {saving
            ? "Saving..."
            : isEditing
              ? "Save Profile"
              : "Edit Profile"}
        </button>
      </header>

      {error && <p role="alert">{error}</p>}
      {success && <p role="status">{success}</p>}

      <div className="profile-layout">
        <aside className="sidebar">
          <section className="card profile-card">
            <div className="profile-image-wrapper">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <div className="profile-image profile-image-placeholder">
                  <span className="material-symbols-outlined">
                    person
                  </span>
                </div>
              )}

              {isEditing && (
                <>
                  <button
                    type="button"
                    className="upload-button"
                    aria-label="Upload new picture"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={saving}
                  >
                    <span className="material-symbols-outlined">
                      photo_camera
                    </span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                    disabled={saving}
                  />
                </>
              )}
            </div>

            <h2>
              {formData.firstName} {formData.lastName}
            </h2>

            <p className="profile-email">{formData.email}</p>

            <div className="member-box">
              <span>Member Since</span>
              <strong>{memberSince}</strong>
            </div>
          </section>

          <section className="card verification-card">
            <h3>Verification Status</h3>

            <ul className="verification-list">
              <li>
                <span className="verification-info">
                  <span
                    className={`material-symbols-outlined ${
                      user.emailVerified
                        ? "success-icon"
                        : "pending-icon"
                    }`}
                  >
                    {user.emailVerified
                      ? "check_circle"
                      : "pending"}
                  </span>
                  Email Address
                </span>

                <span
                  className={
                    user.emailVerified
                      ? "verified-status"
                      : "pending-status"
                  }
                >
                  {user.emailVerified
                    ? "VERIFIED"
                    : "NOT VERIFIED"}
                </span>
              </li>

              <li>
                <span className="verification-info">
                  <span
                    className={`material-symbols-outlined ${
                      user.phoneNumber
                        ? "success-icon"
                        : "pending-icon"
                    }`}
                  >
                    {user.phoneNumber
                      ? "check_circle"
                      : "pending"}
                  </span>
                  Phone Number
                </span>

                <span
                  className={
                    user.phoneNumber
                      ? "verified-status"
                      : "pending-status"
                  }
                >
                  {user.phoneNumber
                    ? "HAS PHONE"
                    : "NOT VERIFIED"}
                </span>
              </li>

              <li>
                <span className="verification-info">
                  <span className="material-symbols-outlined pending-icon">
                    pending
                  </span>
                  Identity Document
                </span>

                <span className="pending-status">
                  NOT VERIFIED
                </span>
              </li>
            </ul>
          </section>
        </aside>

        <section className="content">
          <section className="card form-card">
            <h2 className="section-title">Personal Details</h2>

            <div className="form-grid">
              <FormField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                disabled={!isEditing || saving}
                onChange={handleChange}
              />

              <FormField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                disabled={!isEditing || saving}
                onChange={handleChange}
              />

              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                disabled
                onChange={handleChange}
                fullWidth
              />

              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                disabled={!isEditing || saving}
                onChange={handleChange}
              />

              <FormField
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                disabled={!isEditing || saving}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className="card form-card">
            <h2 className="section-title">Residential Address</h2>

            <div className="form-grid">
              <FormField
                label="Street Address"
                name="street"
                value={formData.street}
                disabled={!isEditing || saving}
                onChange={handleChange}
                fullWidth
              />

              <FormField
                label="City"
                name="city"
                value={formData.city}
                disabled={!isEditing || saving}
                onChange={handleChange}
              />

              <FormField
                label="State / Province"
                name="state"
                value={formData.state}
                disabled={!isEditing || saving}
                onChange={handleChange}
              />

              <FormField
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                disabled={!isEditing || saving}
                onChange={handleChange}
              />

              <FormField
                label="Country"
                name="country"
                value={formData.country}
                disabled={!isEditing || saving}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className="card form-card">
            <h2 className="section-title">Regional Preferences</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="language">Language</label>

                <div className="select-wrapper">
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    disabled={!isEditing || saving}
                    onChange={handleChange}
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="French (FR)">French (FR)</option>
                    <option value="Spanish (ES)">Spanish (ES)</option>
                  </select>

                  <span className="material-symbols-outlined select-icon">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="currency">Currency</label>

                <div className="select-wrapper">
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    disabled={!isEditing || saving}
                    onChange={handleChange}
                  >
                    <option value="NGN (₦)">NGN (₦)</option>
                    <option value="USD ($)">USD ($)</option>
                    <option value="EUR (€)">EUR (€)</option>
                    <option value="GBP (£)">GBP (£)</option>
                  </select>

                  <span className="material-symbols-outlined select-icon">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="mobile-edit">
            <button
              type="button"
              className="edit-button"
              onClick={isEditing ? handleSave : toggleEdit}
              disabled={saving}
            >
              <span className="material-symbols-outlined">
                {saving
                  ? "hourglass_top"
                  : isEditing
                    ? "save"
                    : "edit"}
              </span>

              {saving
                ? "Saving..."
                : isEditing
                  ? "Save Profile"
                  : "Edit Profile"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function FormField({
  label,
  name,
  type = "text",
  value,
  disabled,
  onChange,
  fullWidth = false,
}) {
  return (
    <div className={`form-group ${fullWidth ? "full-width" : ""}`}>
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ""}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}
