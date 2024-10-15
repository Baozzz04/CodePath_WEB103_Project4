import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCar, deleteCar } from "../services/CarsAPI";
import "../App.css";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCar(id);
        setCar(carData);
      } catch (error) {
        console.error("Failed to fetch car:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteCar(id);
      navigate("/customcars");
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
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
      <p>
        <strong>Price:</strong> ${car.price}
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
