
import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Heart,
  Compass,
  Headphones,
  Search,
  Hotel,
  Users,

  Headset,
  Star,
  ArrowRight,
  CheckCircle2,
  Globe,
} from "lucide-react";

import "./about.css";

export default function AboutPage() {
  const values = [
    {
      icon: <Heart size={25} />,
      title: "Customer First",
      description:
        "Every decision we make starts with our customers. We want every traveller to have a smooth and enjoyable booking experience.",
    },
    {
      icon: <ShieldCheck size={25} />,
      title: "Trust & Transparency",
      description:
        "We believe booking accommodation should be straightforward, with clear information to help guests make informed decisions.",
    },
    {
      icon: <Compass size={25} />,
      title: "Explore More",
      description:
        "We want to make discovering new destinations and finding memorable places to stay easier.",
    },
    {
      icon: <Headphones size={25} />,
      title: "Reliable Support",
      description:
        "We are committed to helping our customers throughout their accommodation search and booking journey.",
    },
  ];

  const benefits = [
    "Discover hotels and resorts in different destinations",
    "Compare accommodation options",
    "Explore hotel facilities and amenities",
    "Manage your reservations in one place",
    "Get assistance when you need it",
  ];

  return (
    <main className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-eyebrow">
            ABOUT HOTELRESERVE
          </span>

          <h1>
            Making every stay
            <span> worth remembering.</span>
          </h1>

          <p>
            We believe finding the right place to stay should be
            simple, convenient, and enjoyable. HotelReserve helps
            travellers discover accommodation and plan their next
            getaway with confidence.
          </p>

          <div className="about-hero-actions">
            <Link href="/pages/resorts" className="about-primary-btn">
              Explore Resorts <ArrowRight size={18} />
            </Link>

            <Link href="/pages/contact" className="about-outline-btn">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-intro">
        <div className="about-intro-image">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d"
            alt="Beautiful resort swimming pool"
          />
          <div className="about-image-caption">
            <Globe size={22} />
            <span>Discover places. Create memories.</span>
          </div>
        </div>

        <div className="about-intro-content">
          <span className="about-section-label">OUR STORY</span>

          <h2>
            Travel begins with finding the right place to stay.
          </h2>

          <p>
            Planning a trip should be exciting, not stressful.
            Finding suitable accommodation, comparing options,
            and managing reservations can sometimes feel
            overwhelming.
          </p>

          <p>
            HotelReserve was created to make that experience
            easier. We bring accommodation discovery and
            reservation management together in one convenient
            platform.
          </p>

          <p>
            Whether you are planning a weekend escape, a business
            trip, or a longer holiday, our goal is to help you
            find a place that fits your needs.
          </p>

          <Link href="/pages/destinations" className="about-text-link">
            Discover destinations <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="about-mission-content">
          <span className="about-section-label">
            OUR MISSION
          </span>

          <h2>
            Making accommodation discovery easier for everyone.
          </h2>

          <p>
            Our mission is to connect travellers with accommodation
            options through a convenient and accessible platform.
            We aim to simplify the process of discovering places,
            comparing stays, and managing reservations.
          </p>
        </div>

        <div className="about-mission-icon">
          <Hotel size={75} strokeWidth={1.2} />
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-section-heading">
          <span className="about-section-label">
            WHAT GUIDES US
          </span>

          <h2>Our core values</h2>

          <p>
            The principles that shape the experience we want
            to deliver to every traveller.
          </p>
        </div>

        <div className="about-values-grid">
          {values.map((value, index) => (
            <div className="about-value-card" key={index}>
              <div className="about-value-icon">
                {value.icon}
              </div>

              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why HotelReserve */}
      <section className="about-benefits">
        <div className="about-benefits-content">
          <span className="about-section-label">
            WHY HOTELRESERVE
          </span>

          <h2>
            Everything you need to plan your next stay.
          </h2>

          <p>
            We bring useful accommodation discovery and
            reservation tools together to make planning
            your next trip more convenient.
          </p>

          <ul>
            {benefits.map((benefit, index) => (
              <li key={index}>
                <CheckCircle2 size={19} />
                {benefit}
              </li>
            ))}
          </ul>

          <Link href="/pages/resorts" className="about-primary-btn">
            Find Your Stay <ArrowRight size={18} />
          </Link>
        </div>

        <div className="about-benefits-image">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
            alt="Luxury hotel exterior"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta-icon">
          <Users size={30} />
        </div>

        <h2>Your next memorable stay starts here.</h2>

        <p>
          Explore destinations, discover beautiful accommodation,
          and start planning your next getaway with HotelReserve.
        </p>

        <div className="about-cta-actions">
          <Link href="/pages/resorts">
            Explore Resorts <ArrowRight size={18} />
          </Link>

          <Link href="/pages/contact">
            Talk to Us
          </Link>
        </div>
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
