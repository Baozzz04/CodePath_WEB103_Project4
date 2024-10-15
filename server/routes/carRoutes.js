import express from "express";
import {
  getAllCars,
  getCar,
  addNewCar,
  editCar,
  deleteCar,
} from "../controllers/carController.js";

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCar);
router.post("/", addNewCar);
router.put("/:id", editCar);
router.delete("/:id", deleteCar);

export default router;
