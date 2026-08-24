"use client";

import "../../../style/superadmin/login.css";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";

import Toast from "../../../components/alert/Toast";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Show toast
  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  // Close toast
  const closeToast = () => {
    setToast((prev) => ({
      ...prev,
      show: false,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast(
        "Please enter your email and password.",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      showToast(
        "Login successful.",
        "success"
      );

      setTimeout(() => {
        router.push("/superadmin");
      }, 3000);

    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          showToast(
            "User not found.",
            "error"
          );
          break;

        case "auth/wrong-password":
          showToast(
            "Incorrect password.",
            "error"
          );
          break;

        case "auth/invalid-email":
          showToast(
            "Invalid email address.",
            "error"
          );
          break;

        case "auth/invalid-credential":
          showToast(
            "Invalid email or password.",
            "error"
          );
          break;

        case "auth/too-many-requests":
          showToast(
            "Too many failed attempts. Try again later.",
            "error"
          );
          break;

        default:
          showToast(
            err.message || "Login failed.",
            "error"
          );
      }
    }

    setLoading(false);
  };

  return (
    <div className="login-container">

      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
        duration={5000}
      />

      <div className="login-card">

        <div className="login-header">
          <h1>HotelReserve</h1>
          <p>Sign in to continue</p>
        </div>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <div className="form-options">

            <label className="remember">
              <input type="checkbox" />
              Remember Me
            </label>

            <Link href="/forgot-password">
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}