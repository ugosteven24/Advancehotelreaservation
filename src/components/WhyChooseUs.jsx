import "../css/WhyChooseus.css";
import {
  FaMoneyBillWave,
  FaStar,
  FaGlobeAfrica,
  FaHeadset,
} from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <section className="why">

      <h2>Why Choose Us?</h2>

      <div className="whyGrid">

        <div className="card">
          <FaMoneyBillWave className="icon" />

          <h3>Book Now, Pay at the Hotel</h3>

          <p>
            Flexible booking with free cancellation on selected hotels.
          </p>
        </div>

        <div className="card">
          <FaStar className="icon" />

          <h3>Verified Guest Reviews</h3>

          <p>
            Read genuine reviews from travelers before making your booking.
          </p>
        </div>

        <div className="card">
          <FaGlobeAfrica className="icon" />

          <h3>Thousands of Hotels</h3>

          <p>
            Discover hotels, apartments, resorts and guest houses nationwide.
          </p>
        </div>

        <div className="card">
          <FaHeadset className="icon" />

          <h3>24/7 Customer Support</h3>

          <p>
            Our support team is always available whenever you need help.
          </p>
        </div>

      </div>

    </section>
  );
}