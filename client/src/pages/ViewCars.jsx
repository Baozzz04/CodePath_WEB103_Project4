import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCars, deleteCar } from "../services/CarsAPI"; // Import the API calls
import "../App.css"; // Assuming your styles are in App.css or a similar file

const ViewCars = () => {
  const [cars, setCars] = useState([]); // State to store cars
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // For navigation

  // Fetch the cars when the component is mounted
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carData = await getAllCars(); // Fetch the car data
        setCars(carData); // Set the car data in state
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchCars(); // Call the fetch function
  }, []);

  // Delete a car and redirect to home page
  const handleDelete = async (id) => {
    try {
      await deleteCar(id); // Call delete API
      setCars(cars.filter((car) => car.id !== id)); // Remove the deleted car from state
      navigate("/"); // Redirect to the home page after deletion
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading cars...</div>;
  }

  // If no cars, show a message
  if (cars.length === 0) {
    return <div>No cars available.</div>;
  }

  return (
    <div className="car-list">
      {cars.map((car) => (
        <div key={car.id} className="car-item">
          <div className="car-header">
            <span role="img" aria-label="car-icon" className="car-icon">
              🚗
            </span>
            <h2>{car.name}</h2>
          </div>
          <div className="car-details">
            <div className="car-left">
              <p>
                🎨 <strong>Color:</strong> {car.color}
              </p>
            </div>
            <div className="car-right">
              <p>
                🛞 <strong>Wheel Type:</strong> {car.wheel_type}
              </p>
              <p>
                🔧 <strong>Usage Type:</strong> {car.usage_type}
              </p>
            </div>
          </div>
          <div className="car-actions">
            <button
              className="details-button"
              onClick={() => navigate(`/customcars/${car.id}`)}
            >
              Details
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(car.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewCars;
