import "../css/search.css";
import {
  FaBed,
  FaCalendarAlt,
  FaUser,
  FaChevronDown
} from "react-icons/fa";

export default function SearchBar(){

    return(

     <div className="searchWrapper">

    <form className="searchBar">

        {/* Destination */}

        <div className="searchItem">

            <FaBed className="icon"/>

            <div>

                <small>Enter destination</small>

                <input
                    type="text"
                    placeholder="Where are you going?"
                />

            </div>

        </div>

        {/* Dates */}

        <div className="searchItem">

            <FaCalendarAlt className="icon"/>

            <div>

                <small>Select dates</small>

                <input
                    type="text"
                    placeholder="Check-in date  —  Check-out date"
                    readOnly
                />

            </div>

        </div>

        {/* Guests */}

        <div className="searchItem">

            <FaUser className="icon"/>

            <div>

                <small>Select occupancy</small>

                <input
                    type="text"
                    placeholder="2 adults · 0 children · 1 room"
                    readOnly
                />

            </div>

            <FaChevronDown className="arrow"/>

        </div>

        <button type="submit">
            Search
        </button>

    </form>

</div>

    )

}