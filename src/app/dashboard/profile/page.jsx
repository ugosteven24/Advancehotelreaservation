"use client";

import { useRef, useState } from "react";
import "./profile.css";

export default function ProfilePage() {
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAcCJmnfx7-J6C-fZeaHSsLWNM3ayigyWFXSaOTz6jMDN-TQehwwbEp8n_IUKZHTEbdUyORVThavjcFldzX1e7HvzWYlCcjjVtCMPNF9CDjVMQxjlNLXDybWV7p89g4UjjBYuTEyZFdUyORVThavjcFldzX1e7HvzWYlCcjjVtCMPNF9CDjVMQxjlNLXDybWV7p89g4UjjBYuTEyZFdUyO73rWeODY9-0A6-fbdbm6Ws4svzafglhnAT6smUUgYbqxRU5HmnLDo9xiceRyD3dLaorZ0TJaLI2w3XEqB4K32V-B5DIewqxccWbVxly8mFQ"
  );

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Mercer",
    email: "alex.mercer@example.com",
    phone: "+1 (555) 123-4567",
    dob: "15 Mar 1988",
    street: "123 Luxury Avenue, Suite 400",
    city: "Metropolis",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    language: "English (US)",
    currency: "USD ($)",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
  };

  const toggleEdit = () => {
    setIsEditing((previous) => !previous);
  };

  const handleSave = () => {
    setIsEditing(false);

    // Replace this with your API request when connecting a backend.
    console.log("Profile data:", formData);
  };

  return (
    <main className="profile-page">
      {/* Header */}
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
        >
          <span className="material-symbols-outlined">
            {isEditing ? "save" : "edit"}
          </span>

          {isEditing ? "Save Profile" : "Edit Profile"}
        </button>
      </header>

      <div className="profile-layout">

        {/* LEFT COLUMN */}
        <aside className="sidebar">

          {/* Profile Card */}
          <section className="card profile-card">

            <div className="profile-image-wrapper">
              <img
                src={profileImage}
                alt="Profile"
                className="profile-image"
              />

              {isEditing && (
                <>
                  <button
                    type="button"
                    className="upload-button"
                    aria-label="Upload new picture"
                    onClick={() => fileInputRef.current?.click()}
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
                  />
                </>
              )}
            </div>

            <h2>
              {formData.firstName} {formData.lastName}
            </h2>

            <p className="profile-email">
              {formData.email}
            </p>

            <div className="member-box">
              <span>Member Since</span>
              <strong>Oct 2021</strong>
            </div>
          </section>

          {/* Verification Card */}
          <section className="card verification-card">
            <h3>Verification Status</h3>

            <ul className="verification-list">

              <li>
                <span className="verification-info">
                  <span className="material-symbols-outlined success-icon">
                    check_circle
                  </span>

                  Email Address
                </span>

                <span className="verified-status">
                  VERIFIED
                </span>
              </li>

              <li>
                <span className="verification-info">
                  <span className="material-symbols-outlined success-icon">
                    check_circle
                  </span>

                  Phone Number
                </span>

                <span className="verified-status">
                  VERIFIED
                </span>
              </li>

              <li>
                <span className="verification-info">
                  <span className="material-symbols-outlined pending-icon">
                    pending
                  </span>

                  Identity Document
                </span>

                <button
                  type="button"
                  className="verify-button"
                  onClick={() => alert("Verification process started")}
                >
                  VERIFY NOW
                </button>
              </li>

            </ul>
          </section>

        </aside>

        {/* RIGHT COLUMN */}
        <section className="content">

          {/* Personal Details */}
          <section className="card form-card">
            <h2 className="section-title">
              Personal Details
            </h2>

            <div className="form-grid">

              <FormField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                disabled={!isEditing}
                onChange={handleChange}
              />

              <FormField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                disabled={!isEditing}
                onChange={handleChange}
              />

              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                disabled={!isEditing}
                onChange={handleChange}
                fullWidth
              />

              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                disabled={!isEditing}
                onChange={handleChange}
              />

              <FormField
                label="Date of Birth"
                name="dob"
                value={formData.dob}
                disabled={!isEditing}
                onChange={handleChange}
              />

            </div>
          </section>

          {/* Residential Address */}
          <section className="card form-card">
            <h2 className="section-title">
              Residential Address
            </h2>

            <div className="form-grid">

              <FormField
                label="Street Address"
                name="street"
                value={formData.street}
                disabled={!isEditing}
                onChange={handleChange}
                fullWidth
              />

              <FormField
                label="City"
                name="city"
                value={formData.city}
                disabled={!isEditing}
                onChange={handleChange}
              />

              <FormField
                label="State / Province"
                name="state"
                value={formData.state}
                disabled={!isEditing}
                onChange={handleChange}
              />

              <FormField
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                disabled={!isEditing}
                onChange={handleChange}
              />

              <FormField
                label="Country"
                name="country"
                value={formData.country}
                disabled={!isEditing}
                onChange={handleChange}
              />

            </div>
          </section>

          {/* Regional Preferences */}
          <section className="card form-card">
            <h2 className="section-title">
              Regional Preferences
            </h2>

            <div className="form-grid">

              <div className="form-group">
                <label htmlFor="language">
                  Language
                </label>

                <div className="select-wrapper">
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    disabled={!isEditing}
                    onChange={handleChange}
                  >
                    <option>English (US)</option>
                    <option>French (FR)</option>
                    <option>Spanish (ES)</option>
                  </select>

                  <span className="material-symbols-outlined select-icon">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="currency">
                  Currency
                </label>

                <div className="select-wrapper">
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    disabled={!isEditing}
                    onChange={handleChange}
                  >
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>

                  <span className="material-symbols-outlined select-icon">
                    expand_more
                  </span>
                </div>
              </div>

            </div>
          </section>

          {/* Mobile Button */}
          <div className="mobile-edit">
            <button
              type="button"
              className="edit-button"
              onClick={isEditing ? handleSave : toggleEdit}
            >
              <span className="material-symbols-outlined">
                {isEditing ? "save" : "edit"}
              </span>

              {isEditing ? "Save Profile" : "Edit Profile"}
            </button>
          </div>

        </section>
      </div>
    </main>
  );
}


/* Reusable Input Component */

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
    <div
      className={`form-group ${
        fullWidth ? "full-width" : ""
      }`}
    >
      <label htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}