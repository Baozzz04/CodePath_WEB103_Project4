import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCars, deleteCar } from "../services/CarsAPI";
import "../App.css";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carData = await getAllCars();
        setCars(carData);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      setCars(cars.filter((car) => car.id !== id));
      navigate("/");
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  if (loading) {
    return <div>Loading cars...</div>;
  }

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
              <p>
                🛞 <strong>Wheel Type:</strong> {car.wheel_type}
              </p>
            </div>
            <div className="car-right">
              <p>
                🔧 <strong>Usage Type:</strong> {car.usage_type}
              </p>
              <p>
                💵 <strong>Price:</strong> ${car.price}
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
