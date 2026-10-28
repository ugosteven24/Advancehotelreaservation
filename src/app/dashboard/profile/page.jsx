
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  Heart,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Waves,
  Wifi,
  Utensils,
  Dumbbell,
  ShieldCheck,
  Headset,
  Star,
  Menu,
  X,
} from "lucide-react";
import ProfileImage from "../component/profileImage";
import "./profile.css";

const resorts = [
  {
    id: 1,
    name: "Maldives Island Resort",
    location: "Maldives",
    country: "Maldives",
    type: "Beach Resort",
    price: 450,
    rating: 4.8,
    reviews: 124,
    badge: "Popular",
    badgeType: "popular",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Beach Access"],
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    name: "Santorini Cliff Resort",
    location: "Santorini, Greece",
    country: "Greece",
    type: "Beach Resort",
    price: 320,
    rating: 4.6,
    reviews: 98,
    badge: "Best Value",
    badgeType: "value",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant"],
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    name: "Bali Beach Resort & Spa",
    location: "Bali, Indonesia",
    country: "Indonesia",
    type: "Beach Resort",
    price: 280,
    rating: 4.9,
    reviews: 176,
    badge: "Luxury",
    badgeType: "luxury",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Beach Access"],
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    name: "Lake Como Resort",
    location: "Lake Como, Italy",
    country: "Italy",
    type: "Mountain Resort",
    price: 390,
    rating: 4.5,
    reviews: 87,
    badge: "Trending",
    badgeType: "trending",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Beach Access"],
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    name: "Phuket Island Resort",
    location: "Phuket, Thailand",
    country: "Thailand",
    type: "Island Resort",
    price: 260,
    rating: 4.7,
    reviews: 112,
    badge: "Family Friendly",
    badgeType: "family",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Fitness Center"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    name: "Seychelles Resort & Spa",
    location: "Seychelles",
    country: "Seychelles",
    type: "Beach Resort",
    price: 520,
    rating: 4.8,
    reviews: 143,
    badge: "Romantic",
    badgeType: "romantic",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Beach Access"],
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=85",
  },
];



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

import { uploadImage } from "@/lib/cloudinary";
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

export default function ResortsPage() {
  const [destination, setDestination] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Adults, 0 Children");

  const [maxPrice, setMaxPrice] = useState(1000);
  const [ratings, setRatings] = useState([5]);
  const [types, setTypes] = useState(["Beach Resort"]);
  const [amenities, setAmenities] = useState([
    "Pool",
    "WiFi",
  ]);

  const [sortBy, setSortBy] = useState("popular");
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const pageSize = 6;

  const filteredResorts = useMemo(() => {
    let result = resorts.filter((resort) => {
      const term = searchTerm.trim().toLowerCase();

      const matchesDestination =
        !term ||
        resort.name.toLowerCase().includes(term) ||
        resort.location.toLowerCase().includes(term) ||
        resort.country.toLowerCase().includes(term);

      const matchesPrice = resort.price <= maxPrice;

      const matchesRating =
        ratings.length === 0 ||
        ratings.some((rating) => resort.rating >= rating - 0.9);

      const matchesType =
        types.length === 0 ||
        types.includes(resort.type);

      const matchesAmenities = amenities.every((amenity) =>
        resort.amenities.includes(amenity)
      );

      return (
        matchesDestination &&
        matchesPrice &&
        matchesRating &&
        matchesType &&
        matchesAmenities
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [searchTerm, maxPrice, ratings, types, amenities, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredResorts.length / pageSize)
  );

  const visibleResorts = filteredResorts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  function toggleValue(value, values, setValues) {
    setValues(
      values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value]
    );
    setPage(1);
  }

  function handleSearch(event) {
    event.preventDefault();
    setSearchTerm(destination);
    setPage(1);
  }

  function clearFilters() {
    setMaxPrice(1000);
    setRatings([]);
    setTypes([]);
    setAmenities([]);
    setDestination("");
    setSearchTerm("");
    setPage(1);
  }

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

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
    <main className="resorts-page">
      <header className="resorts-header">
        <Link href="/" className="resorts-brand">
          <span className="brand-mark">
            <Waves size={25} />
          </span>
          <span>
            <strong>HotelReserve</strong>
            <small>Stay Better. Travel Further.</small>
          </span>
        </Link>

        <nav className="resorts-nav">
          <Link href="/dashboard" >Home</Link>
          <Link href="/dashboard/explore">Explore</Link>

          <Link href="/dashboard/favorites">Favorites</Link>
          <Link href="/dashboard/mybooking">My-booking</Link>
          <Link href="/dashboard/notification">Notification</Link>
          <Link href="/dashboard/profile" className="active">Profile</Link>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="header-icon"
            aria-label="Open search"
            onClick={() =>
              document
                .getElementById("resort-search")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Search size={20} />
          </button>

          <Link
            href="/favorites"
            className="header-icon"
            aria-label="Favorites"
          >
            <Heart size={20} />
            {favorites.length > 0 && (
              <span className="favorite-count">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link href="/login" className="signin-link">
            <ProfileImage />
            <span>Sign Out </span>
          </Link>

          <Link href="/my-bookings" className="bookings-button">
            My Bookings
          </Link>
        </div>
      </header>


      <section className="resort-hero">
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="hero-label">
            <Waves size={15} />
            Exclusive Resorts
          </span>

          <h1>
            Discover the World’s
            <br />
            Most Beautiful Resorts
          </h1>

          <p>
            Luxurious stays. Breathtaking views. Unforgettable
            experiences.
            <br className="desktop-break" />
            Find your perfect resort getaway with HotelReserve.
          </p>
        </div>
      </section>

      <section
        className="resort-search-wrap"
        id="resort-search"
      >
        <form className="resort-search" onSubmit={handleSearch}>
          <label className="search-field destination-field">
            <MapPin size={21} />
            <span>
              <strong>Destination</strong>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={destination}
                onChange={(event) =>
                  setDestination(event.target.value)
                }
              />
            </span>
          </label>

          <label className="search-field">
            <CalendarDays size={21} />
            <span>
              <strong>Check In</strong>
              <input
                type="date"
                value={checkIn}
                onChange={(event) =>
                  setCheckIn(event.target.value)
                }
              />
            </span>
          </label>

          <label className="search-field">
            <CalendarDays size={21} />
            <span>
              <strong>Check Out</strong>
              <input
                type="date"
                min={checkIn || undefined}
                value={checkOut}
                onChange={(event) =>
                  setCheckOut(event.target.value)
                }
              />
            </span>
          </label>

          <label className="search-field guests-field">
            <Users size={21} />
            <span>
              <strong>Guests</strong>
              <select
                value={guests}
                onChange={(event) =>
                  setGuests(event.target.value)
                }
              >
                <option>1 Adult, 0 Children</option>
                <option>2 Adults, 0 Children</option>
                <option>2 Adults, 1 Child</option>
                <option>2 Adults, 2 Children</option>
                <option>4 Adults, 0 Children</option>
              </select>
            </span>
            <ChevronDown size={15} />
          </label>

          <button className="search-resorts-button" type="submit">
            <Search size={18} />
            Search Resorts
          </button>
        </form>
      </section>
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
                      className={`material-symbols-outlined ${user.emailVerified
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
                      className={`material-symbols-outlined ${user.phoneNumber
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


      <section className="resort-promises">
        <div>
          <ShieldCheck size={29} />
          <span>
            <strong>Secure Booking</strong>
            <small>Your data is always protected</small>
          </span>
        </div>

        <div>
          <Headset size={29} />
          <span>
            <strong>24/7 Customer Support</strong>
            <small>We're here to help anytime</small>
          </span>
        </div>

        <div>
          <Star size={29} />
          <span>
            <strong>Best Price Guarantee</strong>
            <small>Find a lower price? Let us know</small>
          </span>
        </div>
      </section>

      <footer className="resorts-footer">
        <p>
          © {new Date().getFullYear()} HotelReserve. All rights reserved.
        </p>
        <div>
          <Link href="/pages/about">About</Link>
          <Link href="/pages/contact">Contact</Link>
          <Link href="/pages/privacy">Privacy Policy</Link>
        </div>
      </footer>
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