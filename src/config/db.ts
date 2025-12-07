import { Pool } from "pg";
import { config } from ".";

export const pool = new Pool({ connectionString: config.connection_string });

export const initDB = async () => {
  // create users table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email TEXT UNIQUE NOT NULL CHECK(email = LOWER(email)),
    password TEXT NOT NULL CHECK(LENGTH(password) >= 6),
    phone TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN('admin', 'customer'))
    )
    `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles(
      id SERIAL PRIMARY KEY,
      vehicle_name TEXT NOT NULL,
      type TEXT CHECK(type IN('car','bike','van','SUV')),
      registration_number TEXT UNIQUE,
      daily_rent_price NUMERIC CHECK(daily_rent_price > 0),
      availability_status TEXT CHECK( availability_status IN('available', 'booked'))
      )
      `);

  await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL CHECK(rent_end_date > rent_start_date),
        total_price NUMERIC CHECK(total_price > 0),
        status TEXT CHECK(status IN('active', 'cancelled', 'returned'))
        )
        `);
};
