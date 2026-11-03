
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import "./profileImage.css"

export default function UserProfileImage({
  size = 40,
  className = "",
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }

      if (!user) {
        setImageUrl("");
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (cancelled) return;

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();

          setImageUrl(
            userData.photoURL ||
            userData.profileImage ||
            userData.image ||
            user.photoURL ||
            ""
          );
        } else {
          // Fall back to the Firebase Auth profile image.
          setImageUrl(user.photoURL || "");
        }
      } catch (error) {
        console.error("Failed to load profile image:", error);

        if (!cancelled) {
          setImageUrl(user.photoURL || "");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    });

    return () => {
      cancelled = true;
      unsubscribeAuth();

      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
      }
    };
  }, []);

  if (loading) {
    return (
      <div
        className={`profile-image-placeholder ${className}`}
        style={{ width: size, height: size }}
        aria-label="Loading profile image"
      />
    );
  }

  if (!imageUrl) {
    return (
      <div
        className={`profile-image-fallback ${className}`}
        style={{ width: size, height: size }}
        aria-label="No profile image"
      >
        <span className="material-symbols-outlined">
          account_circle
        </span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt="User profile"
      width={size}
      height={size}
      className={`user-profile-image ${className}`}
      referrerPolicy="no-referrer"
      onError={() => setImageUrl("")}
    />
  );
}
