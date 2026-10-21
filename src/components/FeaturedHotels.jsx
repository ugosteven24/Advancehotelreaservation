import "../css/featuredHotels.css";
import { FaHeart } from "react-icons/fa";

const hotels = [
  {
    id: 1,
    image: "/images/hotel1.jpg",
    name: "Luxury Grand Hotel",
    location: "Lagos, Nigeria",
    rating: "9.1",
    review: "Excellent",
    reviews: "2,356 reviews",
    price: "₦120,000"
  },
  {
    id: 2,
    image: "/images/hotel2.jpg",
    name: "Ocean View Resort",
    location: "Calabar, Nigeria",
    rating: "9.5",
    review: "Exceptional",
    reviews: "1,824 reviews",
    price: "₦165,000"
  },
  {
    id: 3,
    image: "/images/hotel3.jpg",
    name: "Royal Suites",
    location: "Abuja, Nigeria",
    rating: "8.9",
    review: "Excellent",
    reviews: "4,120 reviews",
    price: "₦95,000"
  },
  {
    id: 4,
    image: "/images/hotel4.jpg",
    name: "Sunset Apartments",
    location: "Owerri, Nigeria",
    rating: "8.7",
    review: "Very Good",
    reviews: "2,010 reviews",
    price: "₦85,000"
  }
];

export default function FeaturedHotels() {
  return (
    <section className="featured">

      <div className="featuredHeader">

        <h2>Hotels Guests Love</h2>

        <a href="#">View All</a>

      </div>

      <div className="hotelGrid">

        {hotels.map((hotel) => (

          <div className="hotelCard" key={hotel.id}>

            <div className="imageBox">

              <img src={hotel.image} alt={hotel.name} />

              <button className="favorite">
                <FaHeart />
              </button>

            </div>

            <div className="hotelContent">

              <h3>{hotel.name}</h3>

              <p className="location">
                {hotel.location}
              </p>

              <div className="rating">

                <span className="score">
                  {hotel.rating}
                </span>

                <div >

                  <strong>{hotel.review}</strong>

                  <p>{hotel.reviews}</p>

                </div>

              </div>

              <div className="price">

                <span className="price-label">Starting from</span>

                <h4>{hotel.price}</h4>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}