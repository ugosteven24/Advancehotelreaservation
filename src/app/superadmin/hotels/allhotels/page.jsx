"use client";


import "../../../../style/superadmin/hotelmanangement/allhotel.css"
import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../../../../firebase/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";



import {
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import Toast from "../../../../components/alert/Toast";

export default function AllHotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [selectedHotel, setSelectedHotel] = useState(null);

  const [loadingHotel, setLoadingHotel] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "success",
      });
    }, 3000);
  };

  const fetchHotels = async () => {
    try {
      const snapshot = await getDocs(collection(db, "hotels"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHotels(data);
      setFilteredHotels(data);

    } catch (error) {
      showToast("Failed to load hotels.", "error");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    const result = hotels.filter((hotel) =>
      hotel.hotelName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredHotels(result);
  }, [search, hotels]);

  const deleteHotel = async (id) => {
    if (!confirm("Delete this hotel?")) return;

    try {
      await deleteDoc(doc(db, "hotels", id));

      showToast("Hotel deleted successfully.");

      fetchHotels();

    } catch (error) {
      showToast("Unable to delete hotel.", "error");
    }
  };

  const openHotel = async (id) => {
    try {
      setLoadingHotel(true);
      setShowModal(true);

      const hotelRef = doc(db, "hotels");

      const snapshot = await getDoc(hotelRef);

      if (snapshot.exists()) {
        setSelectedHotel({
          id: snapshot.id,
          ...snapshot.data(),
        });
      } else {
        showToast("Hotel not found.", "error");
        setShowModal(false);
      }

    } catch (error) {
      console.log(error);

      showToast("Unable to load hotel.", "error");

      setShowModal(false);

    } finally {
      setLoadingHotel(false);
    }
  };

  return (
    <div className="hotel-list-page content-wrapper">

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
      />

      <div className="page-header">

        <div>
          <h1>Hotels</h1>
          <p>Manage all hotels</p>
        </div>

        <Link
          href="/superadmin/hotels/addhotel"
          className="add-btn"
        >
          <FaPlus />
          Add Hotel
        </Link>

      </div>

      <div className="toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search hotel..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      <div className="table-wrapper">

        <table>

          <thead>

            <tr>
              <th>Image</th>
              <th>Hotel</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan="7">
                  Loading...
                </td>
              </tr>

            ) : filteredHotels.length === 0 ? (

              <tr>
                <td colSpan="7">
                  No hotels found.
                </td>
              </tr>

            ) : (

              filteredHotels.map((hotel) => (

                <tr key={hotel.id}>

                  <td>

                    <img
                      src={
                        hotel.coverImage ||
                        "/images/no-image.png"
                      }
                      alt={hotel.hotelName}
                      className="hotel-image"
                    />

                  </td>

                  <td>{hotel.hotelName}</td>

                  <td>{hotel.category}</td>

                  <td>
                    {hotel.city}, {hotel.state}
                  </td>

                  <td>

                    <span
                      className={`status ${hotel.status.toLowerCase()}`}
                    >
                      {hotel.status}
                    </span>

                  </td>

                  <td>{hotel.starRating}</td>

                  <td>

                    <div className="actions">

                      <button
                        className="view"
                        onClick={() => openHotel(hotel.id)}
                      >
                        <FaEye />
                      </button>

                      <Link
                        href={`/superadmin/hotels/${hotel.id}/edit`}
                        className="edit"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        className="delete"
                        onClick={() =>
                          deleteHotel(hotel.id)
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>
        {showModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowModal(false)}
          >
            <div
              className="hotel-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

              {loadingHotel ? (
                <h3>Loading...</h3>
              ) : selectedHotel && (
                <>
                  <img
                    src={selectedHotel.coverImage}
                    alt={selectedHotel.hotelName}
                    className="modal-image"
                  />

                  <h2>{selectedHotel.hotelName}</h2>

                  <p>
                    <strong>Category:</strong>{" "}
                    {selectedHotel.category}
                  </p>

                  <p>
                    <strong>Rating:</strong>{" "}
                    {selectedHotel.starRating}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {selectedHotel.status}
                  </p>

                  <p>
                    <strong>Country:</strong>{" "}
                    {selectedHotel.country}
                  </p>

                  <p>
                    <strong>State:</strong>{" "}
                    {selectedHotel.state}
                  </p>

                  <p>
                    <strong>City:</strong>{" "}
                    {selectedHotel.city}
                  </p>

                  <p>
                    <strong>Address:</strong>{" "}
                    {selectedHotel.address}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {selectedHotel.email}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {selectedHotel.phone}
                  </p>

                  <p>
                    <strong>Website:</strong>{" "}
                    {selectedHotel.website}
                  </p>

                  <p>
                    <strong>Description:</strong>
                  </p>

                  <p>{selectedHotel.description}</p>

                  <h4>Amenities</h4>

                  <div className="amenities-list">
                    {selectedHotel.amenities?.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  {selectedHotel.galleryImages?.length > 0 && (
                    <>
                      <h4>Gallery</h4>

                      <div className="gallery">
                        {selectedHotel.galleryImages.map(
                          (image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt=""
                            />
                          )
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}