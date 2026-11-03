
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Headset,
  Star,
  Send,
  MessageCircle,
  Headphones,
  ArrowRight,
} from "lucide-react";

import "./contact.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Connect your contact API or server action here.
      console.log("Contact form:", form);

      alert("Your message has been submitted.");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Unable to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-eyebrow">
            WE ARE HERE FOR YOU
          </span>

          <h1>
            Let's make your next
            <span> stay unforgettable.</span>
          </h1>

          <p>
            Have a question about a booking, need help finding
            the perfect resort, or simply want to talk to us?
            We'd love to hear from you.
          </p>

          <div className="contact-hero-links">
            <a href="#contact-form" className="contact-primary-btn">
              Send us a message <ArrowRight size={18} />
            </a>

            <a href="mailto:support@hotelreserve.com" className="contact-secondary-btn">
              Email support
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section">
        <div className="contact-section-heading">
          <span>GET IN TOUCH</span>
          <h2>We're always happy to help.</h2>
          <p>
            Choose the most convenient way to reach our team.
          </p>
        </div>

        <div className="contact-info-grid">
          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Mail size={23} />
            </div>
            <h3>Email Us</h3>
            <p>Send us your questions anytime.</p>
            <a href="mailto:support@hotelreserve.com">
              support@hotelreserve.com
            </a>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Phone size={23} />
            </div>
            <h3>Call Us</h3>
            <p>Speak directly with our support team.</p>
            <a href="tel:+2348000000000">
              +234 800 000 0000
            </a>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <MessageCircle size={23} />
            </div>
            <h3>Live Support</h3>
            <p>Get assistance with your reservations.</p>
            <Link href="/dashboard/notification">
              Contact support
            </Link>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Clock size={23} />
            </div>
            <h3>Working Hours</h3>
            <p>Our team is available to assist you.</p>
            <strong>Monday – Saturday, 9am – 6pm</strong>
          </div>
        </div>
      </section>

      {/* Form and Support */}
      <section className="contact-main-section" id="contact-form">
        <div className="contact-main-grid">

          <div className="contact-form-container">
            <span className="contact-form-eyebrow">
              SEND AN ENQUIRY
            </span>

            <h2>How can we help you?</h2>

            <p>
              Fill out the form below and our team will get
              back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-field">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What is your enquiry about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label>Your Message</label>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell us how we can help..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="contact-submit-btn"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
                <Send size={17} />
              </button>
            </form>
          </div>

          <div className="contact-support-panel">
            <div className="support-panel-content">
              <div className="support-panel-icon">
                <Headphones size={28} />
              </div>

              <span>HERE TO HELP</span>

              <h2>
                Your journey matters to us.
              </h2>

              <p>
                From finding the right accommodation to managing
                your reservations, we're committed to making
                every step of your experience easier.
              </p>

              <ul>
                <li>Booking and reservation assistance</li>
                <li>Hotel and resort enquiries</li>
                <li>Payment and refund support</li>
                <li>Account and profile assistance</li>
              </ul>

              <Link href="/pages/resorts">
                Explore resorts <ArrowRight size={17} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="contact-bottom-cta">
        <div>
          <h2>Ready for your next getaway?</h2>
          <p>Discover beautiful places and find a stay worth remembering.</p>
        </div>

        <Link href="/pages/resorts">
          Explore Resorts <ArrowRight size={18} />
        </Link>
      </section>
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
            <strong>Customer Support</strong>
            <small>We're here to help</small>
          </span>
        </div>

        <div>
          <Star size={29} />
          <span>
            <strong>Find Your Stay</strong>
            <small>Explore available resort options</small>
          </span>
        </div>
      </section>
    </main>
  );
}
