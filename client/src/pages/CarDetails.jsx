// import React from 'react'
// import '../App.css'

// const CarDetails = () => {

//     return (
//         <div>

//         </div>
//     )
// }

// export default CarDetails

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCar, deleteCar } from "../services/CarsAPI"; // Import the API functions
import "../App.css";

const CarDetails = () => {
  const { id } = useParams(); // Get the car id from the URL
  const [car, setCar] = useState(null); // State to store car details
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch the car details on component mount
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCar(id); // Fetch car data using the id
        setCar(carData); // Set the fetched car data
      } catch (error) {
        console.error("Failed to fetch car:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchCar();
  }, [id]);

  // Handle car deletion
  const handleDelete = async () => {
    try {
      await deleteCar(id); // Call the delete API
      navigate("/customcars"); // Redirect to custom cars page after deletion
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  // Handle edit button click
  const handleEdit = () => {
    navigate(`/edit/${id}`); // Navigate to the edit page
  };

  if (loading) {
    return <div>Loading car details...</div>;
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="car-details-container">
      <h1>{car.name}</h1>
      <p>
        <strong>Color:</strong> {car.color}
      </p>
      <p>
        <strong>Wheel Type:</strong> {car.wheel_type}
      </p>
      <p>
        <strong>Usage Type:</strong> {car.usage_type}
      </p>

      <div className="car-actions">
        <button className="edit-button" onClick={handleEdit}>
          Edit
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
