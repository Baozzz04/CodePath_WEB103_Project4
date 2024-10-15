import { pool } from "./database.js";
import "./dotenv.js";
import carData from "../data/cars.js";

const createTable = async () => {
  const createTableQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            color VARCHAR(255) NOT NULL,
            wheel_type VARCHAR(255) NOT NULL,
            usage_type VARCHAR(255) NOT NULL
        );
    `;

  console.log("Executing SQL:\n", createTableQuery); // Log the SQL

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 Tables created successfully");
  } catch (err) {
    console.error("⚠️ Error creating tables", err);
  }
};

const seedTable = async () => {
  await createTable();

  carData.forEach((car) => {
    const insertQuery = {
      text: "INSERT INTO cars (name, color, wheel_type, usage_type) VALUES ($1, $2, $3, $4)",
    };
    const values = [car.name, car.color, car.wheel_type, car.usage_type];
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ Error inserting location", err);
        return;
      }
      console.log(`✅ ${car.name} added successfully`);
    });
  });
};

seedTable();
