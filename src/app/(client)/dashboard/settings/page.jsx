"use client";

import "./settings.css";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";

const BUTTON_COLOR = "#0866ed";

const DEFAULT_PREFERENCES = {
  emailNotifications: true,
  bookingUpdates: true,
  promotions: false,
  currency: "USD",
};

export default function SettingsPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [savingPrefs, setSavingPrefs] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (current) => {
      if (!current) {
        router.replace("/login");
        return;
      }

      setUser(current);

      try {
        const snap = await getDoc(doc(db, "users", current.uid));
        if (snap.exists() && snap.data().preferences) {
          setPreferences({ ...DEFAULT_PREFERENCES, ...snap.data().preferences });
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [router]);

  const togglePref = (key) =>
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));

  const savePreferences = async () => {
    setSavingPrefs(true);

    try {
      await setDoc(
        doc(db, "users", user.uid),
        { preferences },
        { merge: true }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your preferences have been saved.",
        confirmButtonColor: BUTTON_COLOR,
      });
    } catch (err) {
      console.error("Failed to save preferences:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to save your preferences.",
        confirmButtonColor: BUTTON_COLOR,
      });
    } finally {
      setSavingPrefs(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (!passwords.current || !passwords.next) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid request",
        text: "Please fill in all password fields.",
        confirmButtonColor: BUTTON_COLOR,
      });
    }

    if (passwords.next.length < 6) {
      return Swal.fire({
        icon: "warning",
        title: "Weak password",
        text: "Password must be at least 6 characters.",
        confirmButtonColor: BUTTON_COLOR,
      });
    }

    if (passwords.next !== passwords.confirm) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid request",
        text: "Passwords do not match.",
        confirmButtonColor: BUTTON_COLOR,
      });
    }

    setSavingPassword(true);

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        passwords.current
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passwords.next);

      setPasswords({ current: "", next: "", confirm: "" });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your password has been updated.",
        confirmButtonColor: BUTTON_COLOR,
      });
    } catch (err) {
      const wrong =
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: wrong
          ? "Your current password is incorrect."
          : "Unable to update your password. Please try again.",
        confirmButtonColor: BUTTON_COLOR,
      });
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <main className="settings-page">
        <p className="settings-sub">Loading settings...</p>
      </main>
    );
  }

  return (
    <main className="settings-page">
      <h1>Settings</h1>
      <p className="settings-sub">Manage your preferences and account security.</p>

      <section className="settings-card">
        <h2>Notifications</h2>
        <p>Choose what you would like to hear about.</p>

        {[
          ["emailNotifications", "Email notifications", "Receive updates by email."],
          ["bookingUpdates", "Booking updates", "Status changes on your reservations."],
          ["promotions", "Offers and promotions", "Deals and travel inspiration."],
        ].map(([key, title, hint]) => (
          <label className="settings-toggle" key={key}>
            <div>
              <strong>{title}</strong>
              <span>{hint}</span>
            </div>
            <input
              type="checkbox"
              checked={preferences[key]}
              onChange={() => togglePref(key)}
            />
          </label>
        ))}

        <div className="settings-field" style={{ marginTop: 16 }}>
          <label htmlFor="currency">Preferred currency</label>
          <select
            id="currency"
            value={preferences.currency}
            onChange={(e) =>
              setPreferences((prev) => ({ ...prev, currency: e.target.value }))
            }
          >
            <option value="USD">US Dollar (USD)</option>
            <option value="NGN">Nigerian Naira (NGN)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">British Pound (GBP)</option>
          </select>
        </div>

        <button
          type="button"
          className="settings-button"
          onClick={savePreferences}
          disabled={savingPrefs}
        >
          {savingPrefs ? "Saving..." : "Save preferences"}
        </button>
      </section>

      <section className="settings-card">
        <h2>Change password</h2>
        <p>Use at least 6 characters.</p>

        <form onSubmit={changePassword}>
          <div className="settings-field">
            <label htmlFor="current">Current password</label>
            <input
              id="current"
              type="password"
              autoComplete="current-password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, current: e.target.value }))
              }
            />
          </div>

          <div className="settings-field">
            <label htmlFor="next">New password</label>
            <input
              id="next"
              type="password"
              autoComplete="new-password"
              value={passwords.next}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, next: e.target.value }))
              }
            />
          </div>

          <div className="settings-field">
            <label htmlFor="confirm">Confirm new password</label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, confirm: e.target.value }))
              }
            />
          </div>

          <button type="submit" className="settings-button" disabled={savingPassword}>
            {savingPassword ? "Updating..." : "Update password"}
          </button>
        </form>
      </section>

      <p className="settings-links">
        <Link href="/dashboard/profile">Edit profile</Link> ·{" "}
        <Link href="/pages/privacy">Privacy Policy</Link> ·{" "}
        <Link href="/pages/terms">Terms of Service</Link>
      </p>
    </main>
  );
}
