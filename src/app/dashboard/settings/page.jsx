"use client";

import { useState } from "react";
import "./settings.css";

export default function AccountSettings() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    marketing: false,
    dataSharing: false,
  });

  const [saved, setSaved] = useState(false);

  const toggleSetting = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleDownload = () => {
    alert("Your data download has been requested.");
  };

  const handlePassword = () => {
    alert("Password change flow opened.");
  };

  const handle2FA = () => {
    alert("Two-factor authentication setup opened.");
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account?"
    );

    if (confirmed) {
      alert("Account deletion requested.");
    }
  };

  return (
    <main className={darkMode ? "app dark" : "app"}>
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="mobile-left">
          <button
            className="icon-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>

          <span className="mobile-logo">LuxeStay</span>
        </div>

        <div className="mobile-actions">
          <button
            className="icon-button"
            aria-label="Language"
            onClick={() => alert("Language selector")}
          >
            <span className="material-symbols-outlined">language</span>
          </button>

          <button
            className="icon-button"
            aria-label="Toggle dark mode"
            onClick={() => setDarkMode(!darkMode)}
          >
            <span className="material-symbols-outlined">
              {darkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>

          <div className="avatar">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyzuON5F66Ewyb2s8Xn6HPPBZhv4F_hYdmUjdwTbj-t5lAxiEyKybCTfPfNG-NrKW-3B_K6P1B9FDE5BYyrT1rh0UsYtbfe0jpJpOM_H1LJyCdpbgQcj66m_mbvwVdirmYMrXU1JFfSbaF5G7thi17veCXqCAfYmMjytyaSiVBYjZK7jXAEmuJg_eUCBIbFeocHCP6LGTfLw1HdUp2UWEBXIYoua_9J1nvKFpk8rd-EvvDHFN5BW8o_g"
              alt="Guest User Avatar"
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button>Dashboard</button>
          <button>Bookings</button>
          <button>Profile</button>
          <button className="active">Account Settings</button>
        </div>
      )}

      {/* Main Content */}
      <div className="content-wrapper">
        <div className="page-heading">
          <h1>Account Settings</h1>
          <p>
            Manage your preferences, security, and data privacy.
          </p>
        </div>

        <div className="settings-grid">
          {/* LEFT COLUMN */}
          <div className="left-column">
            {/* Communication Preferences */}
            <section className="settings-card">
              <div className="card-heading">
                <span className="material-symbols-outlined">
                  notifications_active
                </span>

                <h2>Communication Preferences</h2>
              </div>

              <div className="settings-list">
                <SettingToggle
                  title="Email Notifications"
                  description="Receive updates about your bookings and account activity via email."
                  checked={settings.email}
                  onChange={() => toggleSetting("email")}
                />

                <SettingToggle
                  title="SMS Alerts"
                  description="Get critical updates and urgent notifications sent directly to your phone."
                  checked={settings.sms}
                  onChange={() => toggleSetting("sms")}
                />

                <SettingToggle
                  title="Marketing & Promotions"
                  description="Receive exclusive offers, personalized promotions, and news from LuxeStay."
                  checked={settings.marketing}
                  onChange={() => toggleSetting("marketing")}
                />
              </div>
            </section>

            {/* Privacy */}
            <section className="settings-card">
              <div className="card-heading">
                <span className="material-symbols-outlined">
                  visibility_off
                </span>

                <h2>Privacy & Data</h2>
              </div>

              <div className="settings-list">
                <SettingToggle
                  title="Data Sharing with Partners"
                  description="Allow LuxeStay to share basic usage data with trusted partners to improve services."
                  checked={settings.dataSharing}
                  onChange={() => toggleSetting("dataSharing")}
                />
              </div>

              <div className="card-footer">
                <button
                  className="text-button"
                  onClick={handleDownload}
                >
                  Download My Data
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            {/* Security */}
            <section className="settings-card">
              <div className="card-heading">
                <span className="material-symbols-outlined">
                  security
                </span>

                <h2>Security</h2>
              </div>

              <div className="security-content">
                <div className="security-section">
                  <div className="setting-title">
                    Password
                  </div>

                  <p className="setting-description">
                    Last changed 45 days ago.
                  </p>

                  <button
                    className="outline-button"
                    onClick={handlePassword}
                  >
                    Change Password
                  </button>
                </div>

                <div className="security-section bordered">
                  <div className="security-title-row">
                    <div className="setting-title">
                      Two-Factor Auth (2FA)
                    </div>

                    <span className="status-badge">
                      Disabled
                    </span>
                  </div>

                  <p className="setting-description">
                    Add an extra layer of security to your account.
                  </p>

                  <button
                    className="primary-button full"
                    onClick={handle2FA}
                  >
                    Enable 2FA
                  </button>
                </div>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="danger-card">
              <div className="danger-heading">
                <span className="material-symbols-outlined">
                  warning
                </span>

                <h2>Danger Zone</h2>
              </div>

              <p>
                Permanently delete your account and all associated
                data. This action cannot be undone.
              </p>

              <button
                className="danger-button"
                onClick={handleDelete}
              >
                Delete Account
              </button>
            </section>
          </div>
        </div>

        {/* Save */}
        <div className="save-container">
          {saved && (
            <span className="saved-message">
              Changes saved successfully
            </span>
          )}

          <button
            className="primary-button save-button"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}

/* Toggle Component */
function SettingToggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="toggle-row">
      <div className="toggle-info">
        <div className="setting-title">{title}</div>

        <p className="setting-description">
          {description}
        </p>
      </div>

      <button
        type="button"
        className={`switch ${checked ? "active" : ""}`}
        onClick={onChange}
        aria-pressed={checked}
        aria-label={`Toggle ${title}`}
      >
        <span className="switch-knob" />
      </button>
    </div>
  );
}