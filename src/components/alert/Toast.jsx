"use client";

import { useEffect } from "react";
import "../../style/alert/toast.css"


export default function Toast({
  message,
  type = "success",
  show = false,
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className={`toast toast-${type}`}>

      <div className="toast-icon">
        {type === "success" && (
          <i className="fas fa-check-circle"></i>
        )}

        {type === "error" && (
          <i className="fas fa-times-circle"></i>
        )}

        {type === "warning" && (
          <i className="fas fa-exclamation-triangle"></i>
        )}

        {type === "info" && (
          <i className="fas fa-info-circle"></i>
        )}
      </div>

      <div className="toast-content">
        {message}
      </div>

      <button
        type="button"
        className="toast-close"
        onClick={onClose}
      >
        <i className="fas fa-times"></i>
      </button>

    </div>
  );
}