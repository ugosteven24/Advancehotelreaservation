"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./register.css"
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Hotel,
  CheckCircle,
} from "lucide-react";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "@/firebase/firebase";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Create Firebase account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      const fullName = `${form.firstName} ${form.lastName}`;

      // Update Firebase display name
      await updateProfile(user, {
        displayName: fullName,
      });

      // Save additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName: form.firstName,
        lastName: form.lastName,
        fullName,
        email: user.email,
        role: "customer",
        photoURL: "",
        phone: "",
        createdAt: serverTimestamp(),
      });

      // Redirect to customer dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setError("An account already exists with this email.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setError("Password is too weak.");
          break;

        default:
          setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      {/* LEFT SIDE */}
      <section className="register-hero">
        <Image
          src="/images/gallery1.jpg"
          alt="Beautiful hotel"
          fill
          priority
          sizes="50vw"
          className="register-hero__image"
        />

        <div className="register-hero__overlay" />

        <div className="register-hero__content">
          {/* Logo */}
          <div className="register-brand register-brand--light">
            <div className="register-brand__icon register-brand__icon--light">
              <Hotel size={23} />
            </div>

            <div>
              <h1 className="login-brand__name"><Link href={"/"}>FindMyHotel</Link></h1>
              <p className="register-brand__tagline">
                Find your perfect stay
              </p>
            </div>
          </div>

          {/* Main text */}
          <div className="register-hero__intro">
            <p className="register-hero__eyebrow">
              Your journey starts here
            </p>

            <h2 className="register-hero__title">
              Discover places
              <br />
              worth staying in.
            </h2>

            <p className="register-hero__description">
              Create an account and discover beautiful hotels,
              exclusive stays and unforgettable experiences.
            </p>

            {/* Benefits */}
            <div className="register-benefits">
              <div className="register-benefit">
                <CheckCircle size={20} />
                <span>Book hotels with ease</span>
              </div>

              <div className="register-benefit">
                <CheckCircle size={20} />
                <span>Save your favorite hotels</span>
              </div>

              <div className="register-benefit">
                <CheckCircle size={20} />
                <span>Manage all your bookings</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="register-hero__footer">
            © 2026 FindMyHotel. All rights reserved.
          </p>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="register-form-section">
        <div className="register-form-container">
          {/* Mobile logo */}
          <div className="register-brand register-brand--mobile">
            <div className="register-brand__icon register-brand__icon--dark">
              <Hotel size={22} />
            </div>

            <div>
              <h1 className="register-brand__name">FindMyHotel</h1>
              <p className="register-brand__tagline">
                Find your perfect stay
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className="register-heading">
            <h2>Create your account</h2>
            <p>
              Join us and start discovering amazing places to stay.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="register-error" role="alert">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleRegister}
            className="register-form"
          >
            {/* Names */}
            <div className="register-name-grid">
              <div className="register-field">
                <label htmlFor="firstName">First name</label>

                <div className="register-input-wrap">
                  <User
                    size={18}
                    className="register-input-icon"
                    aria-hidden="true"
                  />

                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Stephen"
                    autoComplete="given-name"
                    required
                    className="register-input register-input--icon"
                  />
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="lastName">Last name</label>

                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Arinze"
                  autoComplete="family-name"
                  required
                  className="register-input"
                />
              </div>
            </div>

            {/* Email */}
            <div className="register-field">
              <label htmlFor="email">Email address</label>

              <div className="register-input-wrap">
                <Mail
                  size={18}
                  className="register-input-icon"
                  aria-hidden="true"
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="register-input register-input--icon"
                />
              </div>
            </div>

            {/* Password */}
            <div className="register-field">
              <label htmlFor="password">Password</label>

              <div className="register-input-wrap">
                <Lock
                  size={18}
                  className="register-input-icon"
                  aria-hidden="true"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  className="register-input register-input--icon register-input--password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="register-password-toggle"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <p className="register-field-hint">
                Must be at least 6 characters.
              </p>
            </div>

            {/* Confirm password */}
            <div className="register-field">
              <label htmlFor="confirmPassword">
                Confirm password
              </label>

              <div className="register-input-wrap">
                <Lock
                  size={18}
                  className="register-input-icon"
                  aria-hidden="true"
                />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                  className="register-input register-input--icon register-input--password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="register-password-toggle"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="register-terms">
              <input
                id="acceptTerms"
                type="checkbox"
                required
                className="register-checkbox"
              />

              <label htmlFor="acceptTerms">
                I agree to the{" "}
                <Link href="/terms" className="register-text-link">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="register-text-link">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Register button */}
            <button
              type="submit"
              disabled={loading}
              className="register-submit-button"
            >
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  Create account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Login */}
          <p className="register-login-prompt">
            Already have an account?{" "}
            <Link href="/login" className="register-text-link">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}